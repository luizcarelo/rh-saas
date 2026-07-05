import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { apiRequest } from "../lib/api";

export function TimeTrackingPage() {

  async function downloadAfd() {

    const token =
      localStorage.getItem(
        "rh_access_token"
      );

    const response = await fetch(
      "/v1/time-records/afd",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    const blob =
      await response.blob();

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "AFD_MTE.txt";

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);
  }

  const [in1,setIn1] = useState("08:00");
  const [out1,setOut1] = useState("12:00");
  const [in2,setIn2] = useState("13:00");
  const [out2,setOut2] = useState("18:00");

  const [expectedMinutes,setExpectedMinutes] =
    useState(480);

  const [simulationResult,setSimulationResult] =
    useState<any>(null);

  async function simulateMath() {

    const result = await apiRequest(
      "/v1/time-records/simulate-math",
      {
        method: "POST",
        body: JSON.stringify({
          in1,
          out1,
          in2,
          out2,
          expectedMinutes,
        }),
      }
    );

    setSimulationResult(result);
  }
  const [selectedMonth, setSelectedMonth] = useState("2026-07");
  const [selectedEmployee, setSelectedEmployee] = useState("joao-silva");

  // Dados simulados baseados na CLT (Jornada 08:00 às 17:00 com 1h de almoço)
  const timeRecords = [
    { date: "01/07/2026", in1: "07:55", out1: "12:00", in2: "13:00", out2: "17:05", balance: "+00:10", status: "ok" },
    { date: "02/07/2026", in1: "08:15", out1: "12:00", in2: "13:00", out2: "17:00", balance: "-00:15", status: "atraso" },
    { date: "03/07/2026", in1: "07:50", out1: "12:00", in2: "13:00", out2: "19:00", balance: "+02:10", status: "extra" },
    { date: "04/07/2026", in1: "-", out1: "-", in2: "-", out2: "-", balance: "00:00", status: "folga" },
    { date: "05/07/2026", in1: "-", out1: "-", in2: "-", out2: "-", balance: "00:00", status: "folga" },
    { date: "06/07/2026", in1: "-", out1: "-", in2: "-", out2: "-", balance: "-08:00", status: "falta" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok": return <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">Regular</span>;
      case "atraso": return <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold">Atraso</span>;
      case "extra": return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Hora Extra</span>;
      case "folga": return <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">Folga/DSR</span>;
      case "falta": return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">Falta</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Espelho de Ponto</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            className="border border-slate-300 rounded-md p-2 bg-white text-sm w-full md:w-48"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="joao-silva">João Silva (TI)</option>
            <option value="maria-souza">Maria Souza (Op)</option>
          </select>
          <input 
            type="month" 
            className="border border-slate-300 rounded-md p-2 bg-white text-sm"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={downloadAfd}
          >
            <Download className="mr-2 h-4 w-4" />
            Baixar AFD
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>
            Simulador de Jornada
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div className="grid grid-cols-2 gap-3">

            <input
              type="time"
              value={in1}
              onChange={(e)=>setIn1(e.target.value)}
              className="border rounded p-2"
            />

            <input
              type="time"
              value={out1}
              onChange={(e)=>setOut1(e.target.value)}
              className="border rounded p-2"
            />

            <input
              type="time"
              value={in2}
              onChange={(e)=>setIn2(e.target.value)}
              className="border rounded p-2"
            />

            <input
              type="time"
              value={out2}
              onChange={(e)=>setOut2(e.target.value)}
              className="border rounded p-2"
            />

          </div>

          <input
            type="number"
            value={expectedMinutes}
            onChange={(e)=>
              setExpectedMinutes(
                Number(e.target.value)
              )
            }
            className="mt-3 w-full border rounded p-2"
            placeholder="Minutos esperados"
          />

          <Button
            className="mt-3"
            onClick={simulateMath}
          >
            Calcular
          </Button>

          {simulationResult && (

            <pre className="mt-3 text-xs overflow-auto">
              {JSON.stringify(
                simulationResult,
                null,
                2
              )}
            </pre>

          )}

        </CardContent>
      </Card>

      {/* Cards de Resumo do Mês */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">Saldo Atual (Banco)</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-emerald-600">+14h 30m</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">Horas Extras Realizadas</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-blue-600">08h 15m</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">Atrasos / Faltas</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">09h 45m</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-slate-500">Dias Trabalhados</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-slate-700">18 / 22</div></CardContent></Card>
      </div>

      {/* Tabela de Registros Diários */}
      <Card>
        <CardHeader>
          <CardTitle>Registros Detalhados - {selectedMonth}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="p-4 font-medium text-slate-500">Data</th>
                  <th className="p-4 font-medium text-slate-500">Entrada 1</th>
                  <th className="p-4 font-medium text-slate-500">Saída 1</th>
                  <th className="p-4 font-medium text-slate-500">Entrada 2</th>
                  <th className="p-4 font-medium text-slate-500">Saída 2</th>
                  <th className="p-4 font-medium text-slate-500">Saldo Dia</th>
                  <th className="p-4 font-medium text-slate-500">Ocorrência</th>
                </tr>
              </thead>
              <tbody>
                {timeRecords.map((record, idx) => (
                  <tr key={idx} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium">{record.date}</td>
                    <td className="p-4">{record.in1}</td>
                    <td className="p-4">{record.out1}</td>
                    <td className="p-4">{record.in2}</td>
                    <td className="p-4">{record.out2}</td>
                    <td className={`p-4 font-bold ${record.balance.includes('-') ? 'text-red-600' : record.balance.includes('+') ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {record.balance}
                    </td>
                    <td className="p-4">{getStatusBadge(record.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

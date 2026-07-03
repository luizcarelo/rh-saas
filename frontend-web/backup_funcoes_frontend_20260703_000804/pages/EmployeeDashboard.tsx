import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock as ClockIcon, CheckCircle2, AlertCircle } from "lucide-react";

export function EmployeeDashboard() {
  const [time, setTime] = useState(new Date());
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [locationMsg, setLocationMsg] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    setStatus("loading");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocationMsg(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
          
          try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/time-records/clock-in`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify({ employeeId: "uuid-joao", latitude, longitude })
            });

            if (response.ok) setStatus("success");
            else throw new Error("API Error");
          } catch (err) {
            setStatus("error");
            setLocationMsg("Erro ao salvar. Verifique a conexão.");
          } finally {
            setTimeout(() => setStatus("idle"), 4000);
          }
        },
        () => {
          setLocationMsg("Permita o GPS para bater ponto.");
          setStatus("error");
          setTimeout(() => setStatus("idle"), 4000);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setStatus("error");
    }
  };

  const recentRecords = [
    { date: "Hoje", time: "07:55", type: "Entrada", status: "Registrado" },
    { date: "Ontem", time: "17:05", type: "Saída", status: "Registrado" },
    { date: "Ontem", time: "13:00", type: "Entrada", status: "Registrado" },
    { date: "Ontem", time: "12:00", type: "Saída", status: "Registrado" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Bom dia, João!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card de Bater Ponto */}
        <Card className="shadow-md border-emerald-100">
          <CardHeader className="bg-slate-50 border-b pb-4">
            <CardTitle className="text-lg font-bold text-slate-800">Registrar Agora</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6 text-center">
            <div className="flex flex-col items-center">
              <ClockIcon className="h-6 w-6 text-emerald-600 mb-2" />
              <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>

            <Button 
              onClick={handleClockIn} 
              disabled={status === "loading" || status === "success"}
              className={`w-full h-16 text-lg font-bold rounded-xl transition-all ${
                status === "success" ? "bg-emerald-500 hover:bg-emerald-600" : 
                status === "error" ? "bg-red-500 hover:bg-red-600" : 
                "bg-primary hover:bg-emerald-700 shadow-md"
              }`}
            >
              {status === "loading" ? "Salvando..." : 
               status === "success" ? <><CheckCircle2 className="mr-2 h-5 w-5" /> Registrado!</> : 
               status === "error" ? <><AlertCircle className="mr-2 h-5 w-5" /> Erro</> :
               "BATER PONTO"}
            </Button>

            <div className="flex items-center justify-center text-xs text-slate-500">
              <MapPin className="h-3 w-3 mr-1 text-emerald-600" />
              {locationMsg || "Localização capturada via GPS."}
            </div>
          </CardContent>
        </Card>

        {/* Card de Informações e Histórico */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Saldo Atual de Horas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">+14h 30m</div>
              <p className="text-xs text-slate-400 mt-1">Atualizado até ontem</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-slate-800">Últimos Registros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentRecords.map((rec, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0">
                    <div>
                      <p className="font-bold text-slate-700">{rec.date} às {rec.time}</p>
                      <p className="text-xs text-slate-500">{rec.type}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                      {rec.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

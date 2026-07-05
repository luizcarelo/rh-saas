import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export function SuperAdminDashboard() {

  const [dashboard,setDashboard] = useState<any>({});
  const [health,setHealth] = useState<any>({});
  const [database,setDatabase] = useState<any>({});
  const [storage,setStorage] = useState<any>({});
  const [metrics,setMetrics] = useState<any>({});
  const [services,setServices] = useState<any>({});

  useEffect(() => {

    Promise.all([
      apiRequest("/v1/super-admin/dashboard"),
      apiRequest("/v1/super-admin/system/health"),
      apiRequest("/v1/super-admin/system/database"),
      apiRequest("/v1/super-admin/system/storage"),
      apiRequest("/v1/super-admin/system/metrics"),
      apiRequest("/v1/super-admin/system/services"),
    ])
    .then(
      ([d,h,db,st,mt,sv]) => {

        setDashboard(d);
        setHealth(h);
        setDatabase(db);
        setStorage(st);
        setMetrics(mt);
        setServices(sv);

      }
    )
    .catch(console.error);

  }, []);

  const cards = [
    {
      titulo: "Clientes",
      valor: dashboard?.clients?.total ?? 0,
    },
    {
      titulo: "Clientes Ativos",
      valor: dashboard?.clients?.active ?? 0,
    },
    {
      titulo: "Clientes Inativos",
      valor: dashboard?.clients?.inactive ?? 0,
    },
    {
      titulo: "Planos",
      valor: dashboard?.plans?.total ?? 0,
    },
    {
      titulo: "Usuários",
      valor: dashboard?.users?.total ?? 0,
    },
    {
      titulo: "Funcionários",
      valor: dashboard?.employees?.total ?? 0,
    },
    {
      titulo: "Documentos",
      valor: dashboard?.documents?.documents ?? 0,
    },
    {
      titulo: "Holerites",
      valor: dashboard?.documents?.payslips ?? 0,
    },
    {
      titulo: "Módulos Ativos",
      valor: dashboard?.modules?.enabled ?? 0,
    },
  ];

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Dashboard SUPER ADMIN
      </h1>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">

        {cards.map((card) => (
          <Card key={card.titulo}>
            <CardHeader>
              <CardTitle>
                {card.titulo}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">
                {card.valor}
              </div>
            </CardContent>
          </Card>
        ))}

      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Observabilidade
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div>API: {health?.api}</div>

          <div>Banco: {health?.database}</div>

          <div>Conexões: {database?.connections}</div>

          <div>Disco: {storage?.usedPercent}%</div>

          <div>Memória: {metrics?.memoryPercent}%</div>

          <div>Uptime: {metrics?.uptimeSeconds}</div>

          <div>
            Serviços:
            {" "}
            {JSON.stringify(services)}
          </div>

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Auditoria Recente
          </CardTitle>
        </CardHeader>

        <CardContent>

          {(dashboard?.audit || []).map(
            (item:any,index:number) => (

              <div
                key={index}
                className="border-b py-2"
              >
                <strong>
                  {item.module_code}
                </strong>

                <div>
                  {String(item.old_enabled)}
                  {" → "}
                  {String(item.new_enabled)}
                </div>

                <div>
                  {item.changed_by_email}
                </div>

              </div>
            )
          )}

        </CardContent>
      </Card>

    </div>
  );
}

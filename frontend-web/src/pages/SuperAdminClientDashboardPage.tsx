import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export function SuperAdminClientDashboardPage() {

  const { id } = useParams();

  const [data,setData] = useState<any>(null);

  useEffect(() => {

    if (!id) return;

    apiRequest(
      `/v1/super-admin/clients/${id}/dashboard`
    )
      .then(setData)
      .catch(console.error);

  }, [id]);

  if (!data) {
    return <div>Carregando...</div>;
  }

  const cards = [
    {
      titulo: "Usuários",
      valor: data.users?.total ?? 0,
    },
    {
      titulo: "Funcionários",
      valor: data.employees?.total ?? 0,
    },
    {
      titulo: "Documentos",
      valor: data.documents?.documents ?? 0,
    },
    {
      titulo: "Holerites",
      valor: data.documents?.payslips ?? 0,
    },
    {
      titulo: "Módulos Ativos",
      valor: data.modules?.enabled ?? 0,
    },
    {
      titulo: "Módulos Inativos",
      valor: data.modules?.disabled ?? 0,
    },
  ];

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Dashboard do Cliente
      </h1>

      <div className="grid gap-4 md:grid-cols-3">

        {cards.map(card => (
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

    </div>
  );
}

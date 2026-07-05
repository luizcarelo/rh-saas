
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

type Plan = {
  id: string;
  code: string;
  name: string;
  description: string;
  is_active: boolean;
};

export function SuperAdminPlansPage() {

  const [plans,setPlans] = useState<Plan[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {

    apiRequest<Plan[]>(
      "/v1/super-admin/plans"
    )
      .then(setPlans)
      .finally(() => setLoading(false));

  }, []);

  return (
    <div className="space-y-6">

      
<div className="flex justify-between items-center">

  <h1 className="text-3xl font-bold text-white">
    Planos SaaS
  </h1>

  <Link
    to="/super-admin/planos/novo"
    className="rounded bg-green-600 px-4 py-2 text-white"
  >
    Novo Plano
  </Link>

</div>

      <Card>

        <CardHeader>
          <CardTitle>
            Planos Cadastrados
          </CardTitle>
        </CardHeader>

        <CardContent>

          {loading ? (
            <p>Carregando...</p>
          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b">

                    <th className="p-3 text-left">
                      Código
                    </th>

                    <th className="p-3 text-left">
                      Nome
                    </th>

                    <th className="p-3 text-left">
                      Status
                    </th>

                    <th className="p-3 text-left">
                      Descrição
                    </th>

                    <th className="p-3 text-left">
  Ações
</th>

                  </tr>
                </thead>

                <tbody>

                  {plans.map(plan => (

                    <tr
                      key={plan.id}
                      className="border-b"
                    >

                      <td className="p-3">
                        {plan.code}
                      </td>

                      <td className="p-3">
                        {plan.name}
                      </td>

                      <td className="p-3">
                        {plan.is_active
                          ? "Ativo"
                          : "Inativo"}
                      </td>

                      <td className="p-3">
                        {plan.description}
                      </td>
                      <td className="p-3">
  <Link
    to={`/super-admin/planos/${plan.id}`}
    className="text-cyan-400 hover:text-cyan-300"
  >
    Editar
  </Link>
</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </CardContent>

      </Card>

    </div>
  );
}
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

type ClientDetailsResponse = {
  client: {
    slug: string;
    status: string;
    timezone: string;
    default_locale: string;
  };

  plan: {
    code: string;
    name: string;
    description: string;
  };

  company: {
    legal_name: string;
    trade_name: string;
    document_number: string;
  };

  statistics: {
    employees: number;
    documents: number;
    payslips: number;
  };

  modules: Array<{
    module_code: string;
    enabled: boolean;
  }>;
};

export function SuperAdminClientDetailsPage() {
  const { id } = useParams();

  const [data, setData] =
    useState<ClientDetailsResponse | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    apiRequest<ClientDetailsResponse>(
      `/v1/super-admin/clients/${id}`
    )
      .then(setData)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        
<div className="flex gap-4">

<Link
  to={`/super-admin/clientes/${id}/dashboard`}
  className="rounded bg-cyan-600 px-4 py-2 text-white"
>
  Dashboard Cliente
</Link>

</div>

<h1 className="text-3xl font-bold text-white">

          Carregando cliente...
        </h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-4">
        
<div className="flex gap-4">

<Link
  to={`/super-admin/clientes/${id}/dashboard`}
  className="rounded bg-cyan-600 px-4 py-2 text-white"
>
  Dashboard Cliente
</Link>

</div>

<h1 className="text-3xl font-bold text-white">

          Cliente não encontrado
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      
<div className="flex gap-4">

<Link
  to={`/super-admin/clientes/${id}/dashboard`}
  className="rounded bg-cyan-600 px-4 py-2 text-white"
>
  Dashboard Cliente
</Link>

</div>

<h1 className="text-3xl font-bold text-white">

        Detalhes do Cliente
      </h1>

      <div className="grid gap-4 md:grid-cols-2">

        <Card>
          <CardHeader>
            <CardTitle>Cliente</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <div>
              <strong>Slug:</strong> {data.client.slug}
            </div>

            <div>
              <strong>Status:</strong> {data.client.status}
            </div>

            <div>
              <strong>Timezone:</strong> {data.client.timezone}
            </div>

            <div>
              <strong>Idioma:</strong>{" "}
              {data.client.default_locale}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plano</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <div>
              <strong>Código:</strong> {data.plan.code}
            </div>

            <div>
              <strong>Nome:</strong> {data.plan.name}
            </div>

            <div>
              <strong>Descrição:</strong>
            </div>

            <div>{data.plan.description}</div>
          </CardContent>
        </Card>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <Card>
          <CardHeader>
            <CardTitle>Empresa</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <div>
              <strong>Razão Social:</strong>
              {" "}
              {data.company.legal_name}
            </div>

            <div>
              <strong>Nome Fantasia:</strong>
              {" "}
              {data.company.trade_name}
            </div>

            <div>
              <strong>CNPJ:</strong>
              {" "}
              {data.company.document_number}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <div>
              Funcionários:
              {" "}
              {data.statistics.employees}
            </div>

            <div>
              Documentos:
              {" "}
              {data.statistics.documents}
            </div>

            <div>
              Holerites:
              {" "}
              {data.statistics.payslips}
            </div>
          </CardContent>
        </Card>

      </div>

      <Card>
        <CardHeader>
          <CardTitle>Módulos Habilitados</CardTitle>
        </CardHeader>

        <CardContent>

          <div className="grid gap-2 md:grid-cols-3">

            {data.modules.map((module) => (
              <div
                key={module.module_code}
                className="rounded border p-2"
              >
                {module.module_code}
              </div>
            ))}

          </div>

        </CardContent>
      </Card>

    </div>
  );
}
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../lib/api";

type ModuleItem = {
  module_code: string;
  enabled: boolean;
};

export function SuperAdminClientModulesPage() {

  const { id } = useParams();

  const [items,setItems] =
    useState<ModuleItem[]>([]);

  const [loading,setLoading] =
    useState(true);

  useEffect(() => {

    if (!id) return;

    apiRequest<ModuleItem[]>(
      `/v1/super-admin/clients/${id}/modules`
    )
      .then(setItems)
      .finally(() =>
        setLoading(false)
      );

  }, [id]);

  async function atualizarModulo(
    moduleCode: string,
    enabled: boolean,
  ) {

    if (!id) return;

    await apiRequest(
      `/v1/super-admin/clients/${id}/modules/${moduleCode}`,
      {
        method: "PUT",
        body: JSON.stringify({
          enabled,
        }),
      }
    );

    setItems(current =>
      current.map(item =>
        item.module_code === moduleCode
          ? {
              ...item,
              enabled,
            }
          : item
      )
    );
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">

      
<div className="flex justify-between items-center">

  <h1 className="text-3xl font-bold text-white">
    Módulos do Cliente
  </h1>

  <Link
    to={`/super-admin/clientes/${id}/modules/audit`}
    className="rounded bg-orange-600 px-4 py-2 text-white"
  >
    Auditoria
  </Link>

</div>

<h1 className="hidden">

        Módulos do Cliente
      </h1>

      <table className="w-full">

        <thead>
          <tr>
            <th>Módulo</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>

          {items.map(item => (

            <tr key={item.module_code}>

              <td>
                {item.module_code}
              </td>

              <td>
                {item.enabled
                  ? "Ativo"
                  : "Inativo"}
              </td>

              <td>

                <button
                  onClick={() =>
                    atualizarModulo(
                      item.module_code,
                      !item.enabled
                    )
                  }
                  className="rounded bg-cyan-600 px-3 py-1 text-white"
                >
                  {item.enabled
                    ? "Desativar"
                    : "Ativar"}
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../lib/api";

export function SuperAdminClientModulesAuditPage() {

  const { id } = useParams();

  const [items,setItems] = useState<any[]>([]);

  useEffect(() => {

    if (!id) return;

    apiRequest<any[]>(
      `/v1/super-admin/clients/${id}/modules/audit`
    )
      .then(setItems)
      .catch(console.error);

  }, [id]);

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Auditoria de Módulos
      </h1>

      <table className="w-full">

        <thead>
          <tr>
            <th>Data</th>
            <th>Módulo</th>
            <th>Detalhes</th>
          </tr>
        </thead>

        <tbody>

          {items.length === 0 ? (
            <tr>
              <td colSpan={3}>
                Nenhuma auditoria encontrada.
              </td>
            </tr>
          ) : (
            items.map((item,index) => (
              <tr key={index}>
                <td>{item.created_at || "-"}</td>
                <td>{item.module_code || "-"}</td>
                <td>
                  {JSON.stringify(item)}
                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

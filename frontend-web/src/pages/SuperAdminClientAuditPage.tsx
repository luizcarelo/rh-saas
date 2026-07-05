import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export function SuperAdminClientAuditPage() {

  const { id } = useParams();

  const [audit,setAudit] = useState<any[]>([]);

  useEffect(() => {

    if (!id) return;

    apiRequest<any[]>(
      `/v1/super-admin/clients/${id}/audit`
    )
      .then(setAudit)
      .catch(console.error);

  }, [id]);

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Auditoria do Cliente
      </h1>

      <Card>

        <CardHeader>
          <CardTitle>
            Histórico de Alterações
          </CardTitle>
        </CardHeader>

        <CardContent>

          {audit.length === 0 ? (
            <p>Nenhuma auditoria encontrada.</p>
          ) : (
            <pre>
              {JSON.stringify(audit,null,2)}
            </pre>
          )}

        </CardContent>

      </Card>

    </div>
  );
}

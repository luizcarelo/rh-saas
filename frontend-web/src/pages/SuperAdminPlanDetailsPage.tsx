import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../lib/api";

type Plan = {
  id: string;
  code: string;
  name: string;
  description: string;
  is_active: boolean;
};

export function SuperAdminPlanDetailsPage() {

  const { id } = useParams();

  const [loading,setLoading] = useState(true);

  const [plan,setPlan] = useState<Plan | null>(null);

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [isActive,setIsActive] = useState(true);

  useEffect(() => {

    apiRequest<Plan[]>(
      "/v1/super-admin/plans"
    )
      .then(plans => {

        const current =
          plans.find(p => p.id === id);

        if (!current) {
          return;
        }

        setPlan(current);
        setName(current.name);
        setDescription(
          current.description || ""
        );
        setIsActive(
          current.is_active
        );
      })
      .finally(() =>
        setLoading(false)
      );

  }, [id]);

  async function salvar() {

    if (!plan) {
      return;
    }

    await apiRequest(
      `/v1/super-admin/plans/${plan.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name,
          description,
          is_active: isActive,
        }),
      }
    );

    alert("Plano atualizado com sucesso");
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!plan) {
    return <div>Plano não encontrado</div>;
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Editar Plano
      </h1>

      <div className="rounded-lg border border-white/10 p-6 space-y-4">

        <div>
          <label>Código</label>
          <input
            value={plan.code}
            disabled
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label>Nome</label>
          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label>Descrição</label>
          <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e)=>
                setIsActive(
                  e.target.checked
                )
              }
            />
            Ativo
          </label>
        </div>

        <button
          onClick={salvar}
          className="rounded bg-cyan-600 px-4 py-2 text-white"
        >
          Salvar
        </button>

      </div>

    </div>
  );
}

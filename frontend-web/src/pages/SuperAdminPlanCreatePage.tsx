import { useState } from "react";
import { apiRequest } from "../lib/api";

export function SuperAdminPlanCreatePage() {

  const [code,setCode] = useState("");
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");

  async function salvar() {

    await apiRequest(
      "/v1/super-admin/plans",
      {
        method: "POST",
        body: JSON.stringify({
          code,
          name,
          description,
        }),
      }
    );

    alert("Plano criado com sucesso");

    setCode("");
    setName("");
    setDescription("");
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Novo Plano SaaS
      </h1>

      <div className="rounded-lg border border-white/10 p-6 space-y-4">

        <div>
          <label>Código</label>
          <input
            value={code}
            onChange={(e)=>setCode(e.target.value)}
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

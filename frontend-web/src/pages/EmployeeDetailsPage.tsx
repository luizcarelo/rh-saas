import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../lib/api";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  department?: string | null;
  jobTitle?: string | null;
  admissionDate: string;
  isActive: boolean;
  userId?: string | null;
};

type User = {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
};

export function EmployeeDetailsPage() {
  const { id } = useParams();

  const [employee, setEmployee] =
    useState<Employee | null>(null);

  const [users, setUsers] =
    useState<User[]>([]);

  const [selectedUser, setSelectedUser] =
    useState("");

  async function loadEmployee() {
    if (!id) return;

    const data = await apiRequest<Employee>(
      `/v1/employees/${id}`
    );

    setEmployee(data);
  }

  useEffect(() => {
    loadEmployee();

    apiRequest<User[]>("/v1/users")
      .then(setUsers)
      .catch(console.error);
  }, [id]);

  async function desvincularUsuario() {
    if (!id) {
      return;
    }

    const confirmar = window.confirm(
      "Deseja remover o vínculo do usuário?"
    );

    if (!confirmar) {
      return;
    }

    await apiRequest(
      `/v1/employees/${id}/link-user`,
      {
        method: "DELETE",
      }
    );

    alert("Usuário desvinculado com sucesso");

    await loadEmployee();
  }

  async function vincularUsuario() {
    if (!id || !selectedUser) {
      return;
    }

    await apiRequest(
      `/v1/employees/${id}/link-user`,
      {
        method: "PUT",
        body: JSON.stringify({
          userId: selectedUser,
        }),
      }
    );

    alert("Usuário vinculado com sucesso");

    await loadEmployee();
  }

  if (!employee) {
    return (
      <div>
        Carregando colaborador...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Detalhes do Colaborador
      </h1>

      <div className="rounded-lg border border-white/10 p-6 space-y-3">

        <div>
          <strong>Nome:</strong>{" "}
          {employee.firstName} {employee.lastName}
        </div>

        <div>
          <strong>CPF:</strong>{" "}
          {employee.cpf}
        </div>

        <div>
          <strong>Email:</strong>{" "}
          {employee.email}
        </div>

        <div>
          <strong>Departamento:</strong>{" "}
          {employee.department || "-"}
        </div>

        <div>
          <strong>Cargo:</strong>{" "}
          {employee.jobTitle || "-"}
        </div>

        <div>
          <strong>Data de Admissão:</strong>{" "}
          {employee.admissionDate}
        </div>

        <div>
          <strong>Usuário Vinculado:</strong>{" "}
          {employee.userId || "Nenhum"}
        </div>

        <hr />

        <div className="space-y-3">

          <label>
            Selecionar usuário
          </label>

          <select
            value={selectedUser}
            onChange={(e) =>
              setSelectedUser(e.target.value)
            }
            className="w-full rounded border p-2"
          >
            <option value="">
              Selecione
            </option>

            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.email} ({user.role})
              </option>
            ))}
          </select>

          <div className="flex gap-3">

            <button
              onClick={vincularUsuario}
              className="rounded bg-cyan-600 px-4 py-2 text-white"
            >
              Vincular Usuário
            </button>

            {employee.userId && (
              <button
                onClick={desvincularUsuario}
                className="rounded bg-red-600 px-4 py-2 text-white"
              >
                Desvincular
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
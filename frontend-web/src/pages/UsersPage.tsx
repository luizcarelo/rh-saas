import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

type User = {
  id: string;
  email: string;
  role?: string;
  isActive?: boolean;
};

export function UsersPage() {

  const [users,setUsers] =
    useState<User[]>([]);

  const [employeeId,setEmployeeId] =
    useState("");

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  async function loadUsers() {

    const data =
      await apiRequest<User[]>(
        "/v1/users"
      );

    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function createUser() {

    await apiRequest(
      "/v1/users",
      {
        method: "POST",
        body: JSON.stringify({
          employeeId,
          email,
          password,
        }),
      }
    );

    setEmployeeId("");
    setEmail("");
    setPassword("");

    await loadUsers();

    alert("Usuário criado com sucesso");
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Usuários
      </h1>

      <div className="rounded-lg border border-white/10 p-6 space-y-3">

        <input
          value={employeeId}
          onChange={(e)=>
            setEmployeeId(e.target.value)
          }
          placeholder="Employee ID"
          className="w-full rounded border p-2"
        />

        <input
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
          placeholder="Email"
          className="w-full rounded border p-2"
        />

        <input
          type="password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
          placeholder="Senha"
          className="w-full rounded border p-2"
        />

        <button
          onClick={createUser}
          className="rounded bg-cyan-600 px-4 py-2 text-white"
        >
          Criar Usuário
        </button>

      </div>

      <table className="w-full">

        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Perfil</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role || "-"}</td>
              <td>
                {user.isActive
                  ? "Ativo"
                  : "Inativo"}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

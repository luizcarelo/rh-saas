import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Plus,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";
import { apiRequest } from "../lib/api";
import { EmployeeForm, EmployeePayload } from "../components/EmployeeForm";

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
  user?: {
    id: string;
    email: string;
    role?: string;
  } | null;
};

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadEmployees() {
    setLoadingList(true);
    setError("");

    try {
      const data = await apiRequest<Employee[]>("/v1/employees");
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar os colaboradores.",
      );
    } finally {
      setLoadingList(false);
    }
  }

  async function createEmployee(payload: EmployeePayload) {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await apiRequest<Employee>("/v1/employees", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setSuccess("Colaborador cadastrado com sucesso.");
      setShowForm(false);

      await loadEmployees();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível cadastrar o colaborador.",
      );
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return employees;
    }

    return employees.filter((employee) => {
      const fullText = [
        employee.firstName,
        employee.lastName,
        employee.email,
        employee.cpf,
        employee.department,
        employee.jobTitle,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return fullText.includes(term);
    });
  }, [employees, search]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="relative p-6 lg:p-8">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[4rem] bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-orange-400/20 blur-2xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-medium text-cyan-100">
                <Users className="h-4 w-4" />
                Gestão de pessoas
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white">
                Colaboradores
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Cadastre, consulte e acompanhe os colaboradores da empresa.
                O acesso respeita o tenant do usuário autenticado.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={loadEmployees}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <RefreshCw
                  className={[
                    "h-4 w-4",
                    loadingList ? "animate-spin" : "",
                  ].join(" ")}
                />
                Atualizar
              </button>

              <button
                type="button"
                onClick={() => setShowForm((current) => !current)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01]"
              >
                <Plus className="h-4 w-4" />
                Novo colaborador
              </button>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          <CheckCircle2 className="h-5 w-5" />
          {success}
        </div>
      )}

      {showForm && (
        <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-white">
              Novo colaborador
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Preencha os dados básicos para criar o cadastro.
            </p>
          </div>

          <EmployeeForm
            loading={saving}
            onSubmit={createEmployee}
          />
        </section>
      )}

      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              Lista de colaboradores
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {filteredEmployees.length} registro(s) encontrado(s)
            </p>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              placeholder="Buscar por nome, e-mail, CPF..."
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="bg-slate-900/90 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-4">Nome</th>
                  <th className="px-4 py-4">CPF</th>
                  <th className="px-4 py-4">E-mail</th>
                  <th className="px-4 py-4">Departamento</th>
                  <th className="px-4 py-4">Cargo</th>
                  <th className="px-4 py-4">Usuário</th>
                  <th className="px-4 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {loadingList && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-slate-400"
                    >
                      Carregando colaboradores...
                    </td>
                  </tr>
                )}

                {!loadingList && filteredEmployees.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-slate-400"
                    >
                      Nenhum colaborador encontrado.
                    </td>
                  </tr>
                )}

                {!loadingList &&
                  filteredEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                    >
                      <td className="px-4 py-4">
                        <p className="font-semibold text-white">
                          {employee.firstName} {employee.lastName}
                        </p>
                        <p className="text-xs text-slate-500">
                          ID: {employee.id}
                        </p>
                      </td>

                      <td className="px-4 py-4 text-slate-300">
                        {employee.cpf}
                      </td>

                      <td className="px-4 py-4 text-slate-300">
                        {employee.email}
                      </td>

                      <td className="px-4 py-4 text-slate-300">
                        {employee.department || "-"}
                      </td>

                      <td className="px-4 py-4 text-slate-300">
                        {employee.jobTitle || "-"}
                      </td>

                      <td className="px-4 py-4">
                        {employee.userId ? (
                          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                            Vinculado
                          </span>
                        ) : (
                          <span className="rounded-full bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-200">
                            Sem usuário
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        {employee.isActive ? (
                          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                            Ativo
                          </span>
                        ) : (
                          <span className="rounded-full bg-red-400/10 px-3 py-1 text-xs font-semibold text-red-200">
                            Inativo
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

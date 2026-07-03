import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  FileSearch,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { apiRequest } from "../lib/api";

type AuditLog = {
  id?: string;
  action?: string;
  entity?: string;
  entityId?: string;
  userId?: string;
  userEmail?: string;
  ip?: string;
  createdAt?: string;
  timestamp?: string;
  metadata?: unknown;
  details?: unknown;
};

const auditEndpoints = [
  "/v1/audit",
  "/v1/audit-logs",
  "/v1/audit/logs",
];

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("pt-BR");
}

function stringifyDetails(value: unknown) {
  if (!value) {
    return "-";
  }

  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(value);
  } catch {
    return "-";
  }
}

export function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");
  const [endpointUsed, setEndpointUsed] = useState("");

  async function loadAuditLogs() {
    setLoading(true);
    setError("");
    setWarning("");

    try {
      let found = false;
      let lastError = "";

      for (const endpoint of auditEndpoints) {
        try {
          const response = await apiRequest<unknown>(endpoint);

          if (Array.isArray(response)) {
            setLogs(response as AuditLog[]);
            setEndpointUsed(endpoint);
            found = true;
            break;
          }

          if (
            response &&
            typeof response === "object" &&
            Array.isArray((response as { data?: unknown }).data)
          ) {
            setLogs((response as { data: AuditLog[] }).data);
            setEndpointUsed(endpoint);
            found = true;
            break;
          }

          lastError = `A rota ${endpoint} respondeu, mas não retornou uma lista.`;
        } catch (err) {
          lastError =
            err instanceof Error
              ? err.message
              : `Falha ao carregar ${endpoint}.`;
        }
      }

      if (!found) {
        setLogs([]);
        setEndpointUsed("");
        setWarning(
          lastError ||
            "Nenhuma rota de auditoria disponível no backend no momento.",
        );
      }
    } catch (err) {
      setLogs([]);
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar os logs de auditoria.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return logs;
    }

    return logs.filter((log) => {
      const fullText = [
        log.id,
        log.action,
        log.entity,
        log.entityId,
        log.userId,
        log.userEmail,
        log.ip,
        log.createdAt,
        log.timestamp,
        stringifyDetails(log.metadata),
        stringifyDetails(log.details),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return fullText.includes(term);
    });
  }, [logs, search]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="relative p-6 lg:p-8">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[4rem] bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-orange-400/20 blur-2xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-medium text-cyan-100">
                <ShieldCheck className="h-4 w-4" />
                Segurança e rastreabilidade
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white">
                Auditoria
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Consulte eventos registrados pelo sistema. Se o backend ainda
                não possuir rota de auditoria, esta tela exibirá uma mensagem
                sem quebrar a aplicação.
              </p>

              {endpointUsed && (
                <p className="mt-2 text-xs text-cyan-200">
                  Endpoint usado: {endpointUsed}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={loadAuditLogs}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <RefreshCw
                className={[
                  "h-4 w-4",
                  loading ? "animate-spin" : "",
                ].join(" ")}
              />
              Atualizar
            </button>
          </div>
        </div>
      </section>

      {warning && (
        <div className="flex items-start gap-3 rounded-2xl border border-orange-400/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-100">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">Auditoria indisponível</p>
            <p className="mt-1">{warning}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">Erro ao carregar auditoria</p>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      )}

      <section className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              Eventos de auditoria
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {filteredLogs.length} registro(s) encontrado(s)
            </p>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              placeholder="Buscar por ação, usuário, entidade..."
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="bg-slate-900/90 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-4">Data</th>
                  <th className="px-4 py-4">Ação</th>
                  <th className="px-4 py-4">Entidade</th>
                  <th className="px-4 py-4">Usuário</th>
                  <th className="px-4 py-4">IP</th>
                  <th className="px-4 py-4">Detalhes</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-slate-400"
                    >
                      Carregando auditoria...
                    </td>
                  </tr>
                )}

                {!loading && filteredLogs.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-slate-400"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <FileSearch className="h-10 w-10 text-slate-500" />
                        <p>Nenhum evento de auditoria encontrado.</p>
                      </div>
                    </td>
                  </tr>
                )}

                {!loading &&
                  filteredLogs.map((log, index) => (
                    <tr
                      key={log.id || `${log.action}-${index}`}
                      className="bg-white/[0.02] transition hover:bg-white/[0.06]"
                    >
                      <td className="px-4 py-4 text-slate-300">
                        {formatDate(log.createdAt || log.timestamp)}
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                          {log.action || "-"}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-slate-300">
                        <p>{log.entity || "-"}</p>
                        {log.entityId && (
                          <p className="mt-1 text-xs text-slate-500">
                            {log.entityId}
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-4 text-slate-300">
                        {log.userEmail || log.userId || "-"}
                      </td>

                      <td className="px-4 py-4 text-slate-300">
                        {log.ip || "-"}
                      </td>

                      <td className="max-w-md truncate px-4 py-4 text-slate-400">
                        {stringifyDetails(log.details || log.metadata)}
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

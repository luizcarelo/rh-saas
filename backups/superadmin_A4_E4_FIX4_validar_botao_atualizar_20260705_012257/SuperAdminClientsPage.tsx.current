import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  type SuperAdminClient,
  listSuperAdminClients,
} from '../services/superAdminClientsService';

function getClientName(client: SuperAdminClient) {
  return client.name || client.slug || client.email || client.id;
}

function getClientTenantId(client: SuperAdminClient) {
  return client.tenantId || client.tenant_id || client.id;
}

function getClientStatusLabel(client: SuperAdminClient) {
  if (client.status) {
    return client.status;
  }

  if (typeof client.isActive === 'boolean') {
    return client.isActive ? 'ACTIVE' : 'INACTIVE';
  }

  return 'INDEFINIDO';
}

function getClientPlanName(client: SuperAdminClient) {
  return (
    client.plan?.name ||
    client.plan?.code ||
    client.planId ||
    client.plan_id ||
    'Não informado'
  );
}

function getClientCreatedAt(client: SuperAdminClient) {
  return client.createdAt || client.created_at || 'Não informado';
}

export function SuperAdminClientsPage() {
  const [clients, setClients] = useState<SuperAdminClient[]>([]);
  const [endpoint, setEndpoint] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadClients() {
    setLoading(true);
    setError('');

    try {
      const result = await listSuperAdminClients();

      setClients(Array.isArray(result.clients) ? result.clients : []);
      setEndpoint(result.endpoint);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Não foi possível carregar os Clientes SaaS.';

      setError(message);
      setClients([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadClients();
  }, []);

  const filteredClients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return clients.filter((client) => {
      const status = getClientStatusLabel(client);
      const matchesStatus = statusFilter === 'TODOS' || status === statusFilter;

      const searchable = [
        client.id,
        client.name,
        client.slug,
        client.email,
        client.tenantId,
        client.tenant_id,
        client.plan?.name,
        client.plan?.code,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch || searchable.includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [clients, search, statusFilter]);

  const statusOptions = useMemo(() => {
    const statuses = new Set<string>();

    clients.forEach((client) => {
      statuses.add(getClientStatusLabel(client));
    });

    return ['TODOS', ...Array.from(statuses).sort()];
  }, [clients]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Super Admin
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              Clientes SaaS
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Listagem real de clientes/tenants carregada pela API. Esta fase
              ainda não cria, edita ou inativa clientes.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => void loadClients()}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Atualizar
            </button>

            <Link
              to="/super-admin/clientes/novo"
              className="rounded-2xl bg-sky-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              Novo Cliente
            </Link>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total carregado
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {clients.length}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Exibindo
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {filteredClients.length}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Endpoint usado
            </p>
            <p className="mt-1 break-all text-sm font-semibold text-slate-800">
              {endpoint || 'Aguardando carregamento'}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Pesquisar por nome, e-mail, slug, tenant ou plano"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status === 'TODOS' ? 'Todos os status' : status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
          Carregando clientes SaaS...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
          <p className="font-semibold">Erro ao carregar clientes</p>
          <p className="mt-2">{error}</p>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">
            Nenhum cliente encontrado
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Ajuste os filtros ou cadastre um novo cliente quando o fluxo de
            criação estiver habilitado.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Cliente</th>
                  <th className="px-5 py-4">Tenant</th>
                  <th className="px-5 py-4">Plano</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Criado em</th>
                  <th className="px-5 py-4 text-right">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {getClientName(client)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {client.email ||
                          client.slug ||
                          'Sem e-mail/slug informado'}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="max-w-[220px] truncate font-mono text-xs text-slate-600">
                        {getClientTenantId(client)}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {getClientPlanName(client)}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                        {getClientStatusLabel(client)}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {getClientCreatedAt(client)}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        to={`/super-admin/clientes/${client.id}`}
                        className="text-sm font-semibold text-sky-700 hover:text-sky-900"
                      >
                        Ver detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <p className="font-semibold">Limite desta fase</p>
        <p className="mt-2">
          Esta tela implementa apenas a listagem real. Cadastro, edição,
          ativação/inativação e vínculo de plano/módulos serão tratados nas
          próximas fases.
        </p>
      </div>
    </div>
  );
}

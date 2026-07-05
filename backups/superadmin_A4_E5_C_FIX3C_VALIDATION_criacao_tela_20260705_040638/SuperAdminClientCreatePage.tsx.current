import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  createSuperAdminClient,
  listSuperAdminClientPlans,
  type CreateSuperAdminClientPayload,
  type SuperAdminClientPlanOption,
} from '../services/superAdminClientsService';

type FormState = {
  tradeName: string;
  legalName: string;
  slug: string;
  documentNumber: string;
  planId: string;
};

const initialFormState: FormState = {
  tradeName: '',
  legalName: '',
  slug: '',
  documentNumber: '',
  planId: '',
};

function onlyDigits(value: string) {
  return value.replace(/\D/g, '');
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function isPlanActive(plan: SuperAdminClientPlanOption) {
  if (typeof plan.is_active === 'boolean') {
    return plan.is_active;
  }

  if (typeof plan.isActive === 'boolean') {
    return plan.isActive;
  }

  return true;
}

function getPlanLabel(plan: SuperAdminClientPlanOption) {
  const code = plan.code ? ` (${plan.code})` : '';
  return `${plan.name || plan.code || plan.id}${code}`;
}

function chooseDefaultPlan(plans: SuperAdminClientPlanOption[]) {
  const activePlans = plans.filter(isPlanActive);

  return (
    activePlans.find((plan) => plan.code === 'ENTERPRISE_TEST') ||
    activePlans.find((plan) => plan.code === 'TRIAL') ||
    activePlans[0] ||
    plans[0]
  );
}

export function SuperAdminClientCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(initialFormState);
  const [plans, setPlans] = useState<SuperAdminClientPlanOption[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [plansError, setPlansError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const selectedPlan = useMemo(() => {
    return plans.find((plan) => plan.id === form.planId);
  }, [form.planId, plans]);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateTradeName(value: string) {
    setForm((current) => ({
      ...current,
      tradeName: value,
      slug: current.slug || slugify(value),
    }));
  }

  async function loadPlans() {
    setLoadingPlans(true);
    setPlansError('');

    try {
      const loadedPlans = await listSuperAdminClientPlans();
      setPlans(loadedPlans);

      const defaultPlan = chooseDefaultPlan(loadedPlans);

      if (defaultPlan) {
        setForm((current) => ({
          ...current,
          planId: current.planId || defaultPlan.id,
        }));
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Não foi possível carregar planos.';

      setPlansError(message);
    } finally {
      setLoadingPlans(false);
    }
  }

  useEffect(() => {
    void loadPlans();
  }, []);

  function buildPayload(): CreateSuperAdminClientPayload {
    return {
      tradeName: form.tradeName.trim(),
      legalName: form.legalName.trim(),
      slug: form.slug.trim(),
      documentNumber: onlyDigits(form.documentNumber),
      planId: form.planId,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setSuccessMessage('');

    const payload = buildPayload();

    if (!payload.tradeName) {
      setError('Informe o nome fantasia do cliente SaaS.');
      return;
    }

    if (!payload.legalName) {
      setError('Informe a razão social do cliente SaaS.');
      return;
    }

    if (!payload.slug) {
      setError('Informe o slug do cliente SaaS.');
      return;
    }

    if (!payload.documentNumber) {
      setError('Informe o CNPJ/documento do cliente SaaS.');
      return;
    }

    if (!payload.planId) {
      setError('Selecione um plano válido.');
      return;
    }

    setSubmitting(true);

    try {
      const createdClient = await createSuperAdminClient(payload);

      setSuccessMessage('Cliente SaaS criado com sucesso.');

      if (createdClient?.id) {
        navigate(`/super-admin/clientes/${createdClient.id}`);
        return;
      }

      navigate('/super-admin/clientes');
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Não foi possível criar o Cliente SaaS.';

      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Super Admin
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              Novo Cliente SaaS
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Formulário ajustado ao DTO real do backend. O cadastro será
              enviado para POST /v1/super-admin/clients somente ao confirmar.
            </p>
          </div>

          <Link
            to="/super-admin/clientes"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Voltar para Clientes
          </Link>
        </div>
      </div>

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <h2 className="text-lg font-bold text-slate-900">Dados do cliente</h2>
          <p className="mt-1 text-sm text-slate-600">
            Informe os campos aceitos pelo backend: nome fantasia, razão social,
            slug, documento e plano.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Nome fantasia *
            </span>
            <input
              value={form.tradeName}
              onChange={(event) => updateTradeName(event.target.value)}
              placeholder="Ex.: Cliente Homologação RH SaaS"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Razão social *
            </span>
            <input
              value={form.legalName}
              onChange={(event) => updateField('legalName', event.target.value)}
              placeholder="Ex.: Cliente Homologação RH SaaS LTDA"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Slug *
            </span>
            <input
              value={form.slug}
              onChange={(event) =>
                updateField('slug', slugify(event.target.value))
              }
              placeholder="cliente-homologacao-rh-saas"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            <span className="text-xs text-slate-500">
              Usado como identificador único do cliente.
            </span>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              CNPJ/documento *
            </span>
            <input
              value={form.documentNumber}
              onChange={(event) =>
                updateField('documentNumber', onlyDigits(event.target.value))
              }
              placeholder="Somente números"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="space-y-2 lg:col-span-2">
            <span className="text-sm font-semibold text-slate-700">
              Plano *
            </span>
            <div className="flex flex-col gap-3 lg:flex-row">
              <select
                value={form.planId}
                onChange={(event) => updateField('planId', event.target.value)}
                disabled={loadingPlans}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="">
                  {loadingPlans ? 'Carregando planos...' : 'Selecione um plano'}
                </option>

                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {getPlanLabel(plan)}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => void loadPlans()}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Atualizar planos
              </button>
            </div>

            {selectedPlan ? (
              <span className="text-xs text-slate-500">
                Plano selecionado: {getPlanLabel(selectedPlan)}
              </span>
            ) : null}

            {plansError ? (
              <span className="block text-xs text-red-700">{plansError}</span>
            ) : null}
          </label>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        {successMessage ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            {successMessage}
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
          <Link
            to="/super-admin/clientes"
            className="rounded-2xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={submitting || loadingPlans}
            className="rounded-2xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Criando cliente...' : 'Criar Cliente SaaS'}
          </button>
        </div>
      </form>

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <p className="font-semibold">Atenção</p>
        <p className="mt-2">
          Esta tela já usa o DTO real confirmado no teste controlado: tradeName,
          legalName, slug, documentNumber e planId.
        </p>
      </div>
    </div>
  );
}

type SuperAdminPlaceholderPageProps = {
  title: string;
  description: string;
  status?: string;
  priority?: string;
  items?: string[];
  nextSteps?: string[];
};

export function SuperAdminPlaceholderPage({
  title,
  description,
  status = 'Placeholder profissional',
  priority = 'Média',
  items = [],
  nextSteps = [],
}: SuperAdminPlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Super Admin
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">{title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>

          <div className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm">
            <p className="font-semibold text-sky-900">Status</p>
            <p className="text-sky-700">{status}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Prioridade
          </p>
          <p className="mt-2 text-lg font-bold text-slate-900">{priority}</p>
          <p className="mt-2 text-sm text-slate-600">
            Esta tela prepara a navegação e o contexto visual antes da implementação
            do CRUD real.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Escopo previsto
          </p>

          {items.length > 0 ? (
            <ul className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              Escopo será detalhado nas próximas fases.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
          Próximos passos
        </p>

        {nextSteps.length > 0 ? (
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-amber-900">
            {nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        ) : (
          <p className="mt-3 text-sm text-amber-900">
            Definir endpoints, regras de negócio e telas finais antes do CRUD real.
          </p>
        )}
      </div>
    </div>
  );
}

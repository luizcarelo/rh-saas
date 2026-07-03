import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, setSession } from "../lib/api";

type LoginResponse = {
  access_token: string;
  user_info: {
    sub: string;
    email: string;
    tenantId: string;
    role: string;
  };
};

function AppIcon() {
  return (
    <div
      className="h-24 w-24 rounded-3xl bg-white bg-contain bg-center bg-no-repeat shadow-xl"
      style={{
        backgroundImage: "url('/assets/icone-app.png')",
      }}
      aria-label="Ícone LH Solução RH"
    />
  );
}

function BrandLogo() {
  return (
    <div
      className="mx-auto mb-6 h-24 max-w-sm bg-contain bg-center bg-no-repeat lg:mx-0"
      style={{
        backgroundImage: "url('/assets/logo_rh.png')",
      }}
      aria-label="Logo LH Solução RH"
    />
  );
}

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@empresa.com");
  const [password, setPassword] = useState("Admin@123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await apiRequest<LoginResponse>("/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      setSession(response.access_token, response.user_info);

      navigate("/", {
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível entrar no sistema.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.35),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.20),_transparent_30%)]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-cyan-400 via-blue-600 to-slate-950 p-10 lg:block">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-8">
                <AppIcon />
              </div>

              <h1 className="text-4xl font-black tracking-tight">
                RH moderno, seguro e conectado.
              </h1>

              <p className="mt-4 max-w-md text-base text-cyan-50">
                Controle colaboradores, ponto, documentos e auditoria em uma
                plataforma com identidade visual renovada.
              </p>
            </div>

            <div className="rounded-3xl bg-white/15 p-5">
              <p className="text-sm text-cyan-50">
                Acesso administrativo protegido por JWT e perfis de usuário.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 lg:p-12">
          <div className="mb-8 text-center lg:text-left">
            <BrandLogo />

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
              Acesso seguro
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">
              Entrar no sistema
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              Informe seu e-mail e senha para acessar o painel.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">
                E-mail
              </span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                placeholder="admin@empresa.com"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">
                Senha
              </span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10"
                placeholder="Sua senha"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500 px-5 py-3 font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

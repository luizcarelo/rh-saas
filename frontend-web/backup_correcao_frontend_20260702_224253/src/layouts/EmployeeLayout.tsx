import { Outlet, useNavigate } from "react-router-dom";
import { clearSession, getUserInfo } from "../lib/api";

export function EmployeeLayout() {
  const navigate = useNavigate();
  const user = getUserInfo();

  function logout() {
    clearSession();
    navigate("/login", {
      replace: true,
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-900 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white">
              /assets/icone-app.png => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div>
              <p className="text-sm text-cyan-200">Portal do colaborador</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        <Outlet />
      </main>
    </div>
  );
}

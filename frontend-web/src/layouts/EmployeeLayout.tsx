import { Outlet, Link } from "react-router-dom";
import { Clock, LogOut, User, FileText } from "lucide-react";

export function EmployeeLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Mobile & Desktop */}
      <aside className="w-full md:w-64 bg-white border-b md:border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-slate-100">
          <span className="text-xl font-bold text-emerald-600">Meu RH</span>
        </div>
        
        <div className="p-4 flex flex-col gap-4 flex-grow">
          <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="bg-emerald-100 p-2 rounded-full"><User className="h-5 w-5 text-emerald-700" /></div>
            <div>
              <p className="text-sm font-bold text-slate-800">João Silva</p>
              <p className="text-xs text-slate-500">Engenheiro de Software</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <Link to="/meu-painel" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-emerald-50 text-emerald-700">
              <Clock className="h-4 w-4" /> Meu Ponto
            <Link to="/meus-documentos" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"><FileText className="h-4 w-4" /> Documentos</Link>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100">
          <Link to="/login" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-4 w-4" /> Sair do Sistema
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

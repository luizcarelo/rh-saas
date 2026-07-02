import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Clock, FileText, Settings, LogOut, Menu, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Colaboradores", path: "/colaboradores", icon: Users },
    { name: "Auditoria", path: "/audit", icon: FileText },
    { name: "Espelho de Ponto", path: "/ponto", icon: Clock },
    { name: "Bater Ponto", path: "/registrar-ponto", icon: MapPin },
    { name: "Documentos", path: "/documentos", icon: FileText },
    { name: "Configurações", path: "/configuracoes", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 flex-col border-r bg-white dark:bg-slate-900 md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <span className="text-lg font-bold text-primary">SaaS RH Pro</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.name} to={item.path}>
                <span className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${isActive ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"}`}>
                  <Icon className="h-5 w-5" />
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-4">
          <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-red-600">
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header Mobile / Topbar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-slate-900 md:justify-end">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            <span className="ml-4 text-lg font-bold text-primary">SaaS RH Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              RH
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

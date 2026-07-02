import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AdminLayout } from "./layouts/AdminLayout";
import { EmployeeLayout } from "./layouts/EmployeeLayout";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { EmployeesPage } from "./pages/EmployeesPage";
import { AuditLogsPage } from "./pages/AuditLogsPage";
import { TimeTrackingPage } from "./pages/TimeTrackingPage";
import { ClockInPage } from "./pages/ClockInPage";
import { EmployeeDashboard } from "./pages/EmployeeDashboard";
import { EmployeeDocumentsPage } from "./pages/EmployeeDocumentsPage";
import { ProtectedRoute } from "./components/ProtectedRoute";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Rotas do RH (Admin) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/colaboradores" element={<EmployeesPage />} />
            <Route path="/audit" element={<AuditLogsPage />} />
            <Route path="/ponto" element={<TimeTrackingPage />} />
            <Route path="/registrar-ponto" element={<ClockInPage />} />
          </Route>
        </Route>

        {/* Rotas do Colaborador */}
        <Route element={<ProtectedRoute />}>
          <Route element={<EmployeeLayout />}>
            <Route path="/meu-painel" element={<EmployeeDashboard />} />
          </Route>
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

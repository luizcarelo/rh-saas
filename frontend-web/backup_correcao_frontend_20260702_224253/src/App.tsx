import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AdminLayout } from "./layouts/AdminLayout";
import { EmployeeLayout } from "./layouts/EmployeeLayout";

import { ProtectedRoute } from "./components/ProtectedRoute";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { EmployeesPage } from "./pages/EmployeesPage";
import { AuditLogsPage } from "./pages/AuditLogsPage";
import { TimeTrackingPage } from "./pages/TimeTrackingPage";
import { ClockInPage } from "./pages/ClockInPage";
import { EmployeeDashboard } from "./pages/EmployeeDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/colaboradores" element={<EmployeesPage />} />
            <Route path="/audit" element={<AuditLogsPage />} />
            <Route path="/ponto" element={<TimeTrackingPage />} />
            <Route path="/registrar-ponto" element={<ClockInPage />} />
          </Route>
        </Route>

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

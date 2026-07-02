import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EmployeeForm } from "@/components/EmployeeForm";

export function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchEmployees = () => {
    fetch("${import.meta.env.VITE_API_URL}/v1/employees", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => res.json())
    .then(data => setEmployees(data));
  };

  useEffect(fetchEmployees, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Colaboradores</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Novo Colaborador</Button>
          </DialogTrigger>
          <DialogContent>
            <h2 className="text-xl font-bold mb-4">Novo Colaborador</h2>
            <EmployeeForm onSuccess={() => { setIsOpen(false); fetchEmployees(); }} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-slate-50"><th className="p-4 text-left">Nome</th><th className="p-4 text-left">Cargo</th><th className="p-4 text-left">E-mail</th></tr></thead>
            <tbody>
              {employees.map((emp: any) => (
                <tr key={emp.id} className="border-b">
                  <td className="p-4">{emp.firstName} {emp.lastName}</td>
                  <td className="p-4">{emp.jobTitle}</td>
                  <td className="p-4">{emp.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

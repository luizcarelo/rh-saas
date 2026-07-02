import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema, EmployeeFormValues } from "@/lib/validations/employee";
import { Button } from "@/components/ui/button";

export function EmployeeForm({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema)
  });

  const onSubmit = async (data: EmployeeFormValues) => {
    try {
      const response = await fetch("${import.meta.env.VITE_API_URL}/v1/employees", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify(data),
      });
      if (response.ok) onSuccess();
    } catch (err) { console.error(err); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input {...register("firstName")} placeholder="Nome" className="border p-2 rounded" />
        <input {...register("lastName")} placeholder="Sobrenome" className="border p-2 rounded" />
      </div>
      <input {...register("cpf")} placeholder="CPF" className="w-full border p-2 rounded" />
      <input {...register("email")} placeholder="E-mail" className="w-full border p-2 rounded" />
      <input {...register("department")} placeholder="Departamento" className="w-full border p-2 rounded" />
      <input {...register("jobTitle")} placeholder="Cargo" className="w-full border p-2 rounded" />
      <input type="date" {...register("admissionDate")} className="w-full border p-2 rounded" />
      
      <Button type="submit" className="w-full">Salvar Colaborador</Button>
    </form>
  );
}

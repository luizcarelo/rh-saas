import * as z from "zod";

export const employeeSchema = z.object({
  firstName: z.string().min(2, "Nome obrigatório"),
  lastName: z.string().min(2, "Sobrenome obrigatório"),
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  email: z.string().email("E-mail inválido"),
  department: z.string().min(1, "Departamento obrigatório"),
  jobTitle: z.string().min(1, "Cargo obrigatório"),
  admissionDate: z.string().min(1, "Data de admissão obrigatória"),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;

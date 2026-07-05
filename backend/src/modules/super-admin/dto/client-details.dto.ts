export class ClientDetailsDto {
  client: any;
  plan: any;
  company: any;
  modules: any[];
  statistics: {
    employees: number;
    documents: number;
    payslips: number;
  };
}

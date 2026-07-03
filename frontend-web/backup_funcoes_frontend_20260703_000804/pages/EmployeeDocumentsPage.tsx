import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, CheckCircle } from "lucide-react";

export function EmployeeDocumentsPage() {
  const documents = [
    { id: 1, name: "Holerite_Julho_2026.pdf", date: "01/07/2026", signed: true },
    { id: 2, name: "Comunicado_Ferias.pdf", date: "15/06/2026", signed: false },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Meus Documentos</h1>
      
      <div className="grid gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="flex items-center justify-between p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-lg">
                <FileText className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">{doc.name}</p>
                <p className="text-sm text-slate-500">Enviado em {doc.date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Baixar</Button>
              {doc.signed ? (
                <span className="flex items-center text-emerald-600 text-sm font-bold bg-emerald-50 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4 mr-1" /> Assinado
                </span>
              ) : (
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Assinar Digitalmente</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

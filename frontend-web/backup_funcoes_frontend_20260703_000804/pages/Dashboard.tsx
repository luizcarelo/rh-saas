import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, AlertCircle, FileSignature } from "lucide-react";
import { MapComponent } from "@/components/MapComponent";

export function Dashboard() {
  const equipe = [
    { id: '1', nome: 'João Silva', lat: -22.9068, lng: -43.1729, status: 'Em campo' },
  ];

  return (
    <div className="w-full space-y-8 p-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Visão Geral</h1>
      
      {/* Grid forçado para garantir alinhamento */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Colaboradores</CardTitle><Users className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">128</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Em Campo</CardTitle><Clock className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">14</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Atrasos</CardTitle><AlertCircle className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold text-emerald-600">3</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Documentos</CardTitle><FileSignature className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">5</div></CardContent></Card>
      </div>

      <div className="w-full">
        <h2 className="mb-4 text-2xl font-semibold">Localização das Equipes</h2>
        <MapComponent colaboradores={equipe} />
      </div>
    </div>
  );
}

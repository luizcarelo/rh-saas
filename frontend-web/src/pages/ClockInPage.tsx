import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiRequest } from "../lib/api";
import { MapPin, Clock as ClockIcon, CheckCircle2, AlertCircle } from "lucide-react";

export function ClockInPage() {
  const [time, setTime] = useState(new Date());
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [locationMsg, setLocationMsg] = useState("");

  // Atualiza o relógio na tela a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    setStatus("loading");
    
    // API nativa do HTML5 para capturar o GPS
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocationMsg(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
          
          try {

            await apiRequest(
              "/v1/time-records/clock-in",
              {
                method: "POST",
                body: JSON.stringify({
                  employeeId: "",
                  latitude,
                  longitude,
                }),
              }
            );

            setStatus("success");

            setTimeout(
              () => setStatus("idle"),
              3000
            );

          } catch (error) {

            console.error(error);

            setStatus("error");

            setTimeout(
              () => setStatus("idle"),
              4000
            );

          }
        },
        (error) => {
          console.error("Erro de GPS:", error);
          setLocationMsg("Por favor, permita o acesso à localização no navegador.");
          setStatus("error");
          setTimeout(() => setStatus("idle"), 4000);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLocationMsg("Geolocalização não suportada neste dispositivo.");
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg border-emerald-100">
        <CardHeader className="bg-slate-50 border-b pb-6">
          <CardTitle className="text-2xl font-bold text-slate-800">Registro de Jornada</CardTitle>
          <p className="text-slate-500 text-sm mt-1">Colaborador: João Silva</p>
        </CardHeader>
        <CardContent className="pt-8 pb-8 space-y-8">
          
          {/* Relógio Digital */}
          <div className="flex flex-col items-center justify-center">
            <ClockIcon className="h-8 w-8 text-emerald-600 mb-2" />
            <div className="text-5xl font-extrabold text-slate-900 tracking-tight">
              {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-slate-500 font-medium mt-2">
              {time.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {/* Botão de Bater Ponto */}
          <Button 
            onClick={handleClockIn} 
            disabled={status === "loading" || status === "success"}
            className={`w-full h-20 text-xl font-bold rounded-2xl transition-all ${
              status === "success" ? "bg-emerald-500 hover:bg-emerald-600" : 
              status === "error" ? "bg-red-500 hover:bg-red-600" : 
              "bg-primary hover:bg-emerald-700 shadow-md hover:shadow-lg"
            }`}
          >
            {status === "loading" ? "Obtendo Localização..." : 
             status === "success" ? <><CheckCircle2 className="mr-2 h-6 w-6" /> Ponto Registrado!</> : 
             status === "error" ? <><AlertCircle className="mr-2 h-6 w-6" /> Erro de GPS</> :
             "REGISTRAR PONTO"}
          </Button>

          {/* Feedback de Localização */}
          <div className="flex items-center justify-center text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
            <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
            {locationMsg || "A localização será capturada no registro."}
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

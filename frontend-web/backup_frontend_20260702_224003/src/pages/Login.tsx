import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Agora o compilador sabe que 'email' e 'password' estão sendo usados aqui
    console.log("Tentando autenticação para:", email);
    
    if (email && password) {
        localStorage.setItem("token", "fake-jwt-token");
        navigate("/");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">Acesso SaaS RH</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" placeholder="E-mail" className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)} required 
            />
            <input 
              type="password" placeholder="Senha" className="w-full border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)} required 
            />
            <Button className="w-full">Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

💻 Guia de Desenvolvimento e Padrões de Código

Este documento reúne lições essenciais para qualquer programador que for dar manutenção ou adicionar funcionalidades ao SaaS RH.

1. Backend (NestJS + TypeORM)

Registro de Entidades e Módulos (app.module.ts)

Para evitar erros fatais do TypeORM (Entity metadata for X was not found), observe o padrão no arquivo central:

Módulos: Todos os módulos (ex: EmployeesModule, AuthModule) DEVEM ser importados no array imports. Sem eles, a injeção de dependência falha.

Entidades Soltas: Entidades que não possuem um Módulo próprio (ex: Tenant, ClockEvent, User) devem ser importadas no topo do arquivo e listadas explicitamente no array entities: [Tenant, ClockEvent, User].

AutoLoad: Sempre mantenha autoLoadEntities: true ativado nas opções do TypeORM. Isso fará o sistema mesclar suas entidades soltas com as entidades importadas via Módulos.

2. Frontend (React + Vite)

Tratamento de Falhas e Tipagem

Ao realizar chamadas HTTP (fetch), existem duas regras inquebráveis para evitar que a tela branca (Crashes de Renderização) ocorra:

Tratamento do Erro 401 (Auth Guard no Frontend):
Sempre inspecione o .status da resposta HTTP ANTES de converter para .json().

if (res.status === 401) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
    throw new Error('Sessão expirada.');
}


Segurança de Arrays antes do .map():
Nunca alimente uma variável de estado que renderiza listas de forma cega. Verifique o tipo do dado que voltou da API:

const [items, setItems] = useState<any[]>([]); // Tipagem correta no TS

.then(data => {
    if (Array.isArray(data)) {
        setItems(data);
    } else {
        console.error("API retornou formato inválido", data);
        setItems([]); // Fallback seguro
    }
})


Deploy de Novas Versões de Front

Sempre que um arquivo .tsx for alterado na pasta src/, é obrigatório re-compilar a pasta dist e reiniciar o servidor Nginx do Docker:

npm run build
docker compose -f docker-compose.prod.yml restart web

🏛 Arquitetura e Fluxo de Dados

O SaaS RH Pro utiliza uma topologia de "Duplo Proxy Reverso" para garantir a segurança da API e permitir que o Frontend React e o Backend NestJS coexistam harmoniosamente em um único domínio.

🔄 Fluxo de Requisição (Request Flow)

A arquitetura física está dividida entre o Servidor de Borda (Nginx Principal) e o Servidor de Aplicação (Debian/Docker).

Exemplo de fluxo ao acessar /v1/employees:

Navegador do Usuário: Faz uma requisição GET para https://rh.lhsolucao.com.br/v1/employees.

Servidor Externo (Nginx Principal):

Recebe a requisição criptografada (HTTPS na porta 443).

Resolve o certificado SSL.

Encaminha TODO o tráfego do domínio para a porta 4001 do Servidor de Aplicação (Debian).

Servidor Debian (Docker - rh_saas_web):

O Nginx do Docker recebe a requisição na porta 4001 (mapeada para a 80 internamente).

Identifica a rota /v1/.

Encaminha para o container rh_saas_api na porta 3000.

Backend (NestJS):

O AuthGuard verifica o JWT.

O Controller encaminha para o Service.

O TypeORM consulta o PostgreSQL (rh_saas_postgres).

Retorna o JSON ao Nginx.

🔒 Fluxo de Autenticação e Tratamento de Erros

O backend exige cabeçalhos Authorization: Bearer <token> nas rotas /v1/.

Se o token for inválido, expirado ou não enviado, a API retorna HTTP 401 Unauthorized.

Proteção Frontend: A camada de conexão do Frontend intercepta códigos 401. Se detectado, ele realiza limpeza automática (localStorage.clear()) e redireciona forçadamente para a rota de /login, evitando o colapso da interface (Crashes).

📂 Estrutura de Containers (docker-compose.prod.yml)

api: Container Node.js rodando o NestJS.

web: Container Nginx servindo a pasta dist do React e roteando /v1/ para a api.

postgres_db: Container de Banco de Dados.

redis_cache: Container para cache de alta velocidade.

pgadmin: Interface gráfica opcional para gerenciamento do banco na porta 5050.
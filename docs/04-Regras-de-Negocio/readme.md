🏢 SaaS RH Pro - Plataforma de Gestão de Recursos Humanos

📋 Sobre o Projeto

O SaaS RH Pro é uma plataforma web completa para gestão de recursos humanos, controle de ponto, auditoria e gestão de documentos. Desenvolvida para operar em um modelo Multi-Tenant (múltiplas empresas), a aplicação garante segurança, isolamento de dados e alta performance.

🛠 Ficha Técnica (Tech Stack)

Frontend (Aplicação Web)

Framework: React 18

Build Tool: Vite

Linguagem: TypeScript

Estilização: Tailwind CSS + Shadcn UI (componentes de UI)

Roteamento: React Router (Proteção de Rotas com JWT)

Estado e Fetch: React Hooks (useState, useEffect) com chamadas nativas de Fetch/Axios.

Backend (API REST)

Framework: NestJS (Node.js)

Linguagem: TypeScript

Banco de Dados: PostgreSQL (Relacional) com extensão PostGIS.

ORM: TypeORM (Mapeamento de Entidades, autoLoadEntities).

Autenticação: JWT (JSON Web Tokens) com Passport.js.

Cache: Redis (Para filas e controle de sessões otimizadas).

Infraestrutura & DevOps

Containers: Docker & Docker Compose.

Servidor Web Interno: Nginx (Alpine) - Roteamento de estáticos e Proxy Reverso para a API.

Servidor Web Externo: Nginx - Proxy Reverso com SSL (Certbot) atuando no domínio principal.

Sistema Operacional Base: Debian (Linux).

🧩 Principais Módulos do Sistema

Auth & Users: Gerenciamento de login, tokens JWT e níveis de acesso.

Tenant: Estrutura base para separar dados de diferentes clientes/empresas no mesmo banco.

Employees: Cadastro e gestão completa do quadro de colaboradores.

Time Records & Clock Events: Controle de ponto, espelho de ponto, cálculo de horas trabalhadas e banco de horas.

Documents: Upload, listagem e gestão de documentos empresariais.

Analytics: Geração de relatórios e painel visual de métricas do RH.

Audit: Registro (logs) de quem alterou o que e quando (Segurança).
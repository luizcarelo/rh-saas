🚀 Guia de Instalação e Deploy

Siga os passos abaixo para recriar o ambiente de produção do SaaS RH do zero.

1. Pré-requisitos

Servidor Linux (Debian/Ubuntu recomendado).

Docker e Docker Compose instalados.

Node.js v18 ou superior (para compilar o frontend localmente, se necessário).

2. Configurando o Ambiente

Clone ou extraia os arquivos do projeto na pasta principal (ex: /opt/rh-saas).

Crie o arquivo .env na raiz do /backend com as credenciais do Postgres e JWT.

Crie o arquivo .env na pasta /frontend-web informando a URL da API:

VITE_API_URL=https://rh.lhsolucao.com.br


3. Compilando o Frontend (React/Vite)

O Nginx do Docker precisa da pasta dist compilada para funcionar.

cd /opt/rh-saas/frontend-web
npm install
npm run build


4. Subindo os Containers (Backend e Infra)

Na pasta raiz do projeto, execute o build e levante os containers em segundo plano:

cd /opt/rh-saas
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d


Verifique se tudo subiu corretamente com: docker ps.

5. Configuração do Servidor Externo (Proxy Reverso / SSL)

Se você utiliza um servidor Nginx principal para gerenciar o domínio, a configuração (/etc/nginx/sites-enabled/rh_lhsolucao.conf) deve apontar todo o tráfego apenas para a porta exposta do Web Container (ex: 4001), deixando o Docker gerenciar as rotas.

Arquivo de configuração padrão Nginx Externo:

server {
    server_name rh.lhsolucao.com.br;
    listen 443 ssl;
    
    # Certificados SSL gerenciados pelo Certbot...
    
    location / {
        proxy_pass http://<IP_DO_DEBIAN>:4001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # AVISO: NÃO crie uma rota /v1/ aqui apontando direto para a porta 3000 do Debian.
    # O Nginx do Docker na porta 4001 já faz esse direcionamento internamente.
}


Reinicie o Nginx externo após as alterações: sudo systemctl reload nginx.
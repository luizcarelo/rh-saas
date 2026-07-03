# Arquitetura

## Componentes

- Backend NestJS.
- Frontend-web React.
- Mobile app Expo/React Native.
- PostgreSQL/PostGIS.
- Redis.
- Nginx web container.
- Nginx principal externo.

## Princípios

- Multitenant por `tenantId`.
- Permissões por perfil.
- Auditoria em ações críticas.
- Dados brutos de ponto imutáveis.
- Alterações por eventos de ajuste/justificativa.
- Mobile offline-first.
- Sincronização posterior com controle de duplicidade.

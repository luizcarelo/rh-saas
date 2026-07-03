# Multitenant

Cada cliente SaaS deve ser isolado por `tenantId`.

## Regras

- Um usuário comum só acessa dados do próprio tenant.
- Super Admin pode listar e administrar clientes.
- Logs de auditoria devem conter `tenantId`.
- Configurações de módulos, ponto, documentos e mobile são por tenant.

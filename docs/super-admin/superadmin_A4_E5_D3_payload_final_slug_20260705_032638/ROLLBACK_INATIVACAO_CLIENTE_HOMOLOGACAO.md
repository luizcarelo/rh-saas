# Plano de rollback/inativação — Cliente de homologação

Data: 20260705_032638

## Cliente de homologação

```text
Trade name: Cliente Homologação RH SaaS 20260705_032638
Legal name: Cliente Homologação RH SaaS LTDA 20260705_032638
Slug: cliente-homologacao-rh-saas-20260705-032638
Document number: 00000000000100
Plan ID: de2acf21-fad0-4c57-9533-0258343dfb60
Plan name: Enterprise Teste
Plan code: ENTERPRISE_TEST
ID retornado: 53fd426c-d9e5-4b2a-b433-d042dec71ffb
Endpoint usado: /v1/super-admin/clients
Status HTTP: 201
Criado com sucesso: SIM
```

## Recomendação

Se o cliente foi criado, prefira rollback controlado em fase separada:

1. Inativar via endpoint PATCH/PUT oficial.
2. Marcar status como INACTIVE/SUSPENDED, se suportado.
3. Manter como registro de homologação identificável.
4. Evitar remoção direta em banco sem backup e diagnóstico específico.

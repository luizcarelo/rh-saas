# Plano de rollback/inativação — Cliente criado via tela

Data: 20260705_035540

## Cliente criado via tela

```text
Nome fantasia: Cliente Tela Homologação RH SaaS 20260705_035540
Razão social: Cliente Tela Homologação RH SaaS LTDA 20260705_035540
Slug: cliente-tela-homologacao-rh-saas-20260705-035540
Documento: 00000000000200
Plano: Enterprise Teste (ENTERPRISE_TEST)
PlanId: de2acf21-fad0-4c57-9533-0258343dfb60
Criado via tela: NAO
ID retornado por GET: nao localizado
```

## Recomendação

Se o cliente foi criado, prefira rollback controlado em fase separada:

1. Inativar via endpoint PATCH/PUT oficial.
2. Marcar status como INACTIVE/SUSPENDED, se suportado.
3. Manter como cliente de homologação identificável.
4. Evitar remoção direta em banco sem backup e diagnóstico específico.

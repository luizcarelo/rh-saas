# Plano de rollback/inativação — Cliente criado via tela após FIX3C

Data: 20260705_040638

## Cliente criado via tela

```text
Nome fantasia: Cliente Tela Homologação RH SaaS FIX3C 20260705_040638
Razão social: Cliente Tela Homologação RH SaaS FIX3C LTDA 20260705_040638
Slug: cliente-tela-homologacao-rh-saas-fix3c-20260705-040638
Documento: 00000000000300
Plano: Enterprise Teste (ENTERPRISE_TEST)
PlanId: de2acf21-fad0-4c57-9533-0258343dfb60
Criado via tela: SIM
ID retornado por GET: e6a890d0-b453-4334-ba53-8a31bf2acd36
```

## Recomendação

Se o cliente foi criado, prefira rollback controlado em fase separada:

1. Inativar via endpoint PATCH/PUT oficial.
2. Marcar status como INACTIVE/SUSPENDED, se suportado.
3. Manter como cliente de homologação identificável.
4. Evitar remoção direta em banco sem backup e diagnóstico específico.

# Plano de rollback/inativação — Cliente de homologação

Data: 20260705_031947

## Cliente de homologação

```text
Nome: Cliente Homologação RH SaaS 20260705_031947
Slug: cliente-homologacao-rh-saas-20260705_031947
Email: homologacao+20260705_031947@rh-saas.local
ID retornado: nao localizado
Endpoint usado: 
Status HTTP: 
Criado com sucesso: NAO
```

## Recomendação

Se o cliente foi criado, prefira rollback controlado em fase separada:

1. Inativar via endpoint PATCH/PUT oficial.
2. Marcar status como INACTIVE/SUSPENDED.
3. Manter como registro de homologação identificável.
4. Evitar remoção direta em banco sem backup e diagnóstico específico.

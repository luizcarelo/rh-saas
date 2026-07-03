# Offline Sync

## Fluxo

1. Usuário registra batida.
2. App valida GPS e política.
3. App cria registro local.
4. Se online, envia imediatamente.
5. Se offline, mantém pendente.
6. Ao recuperar conexão, sincroniza.
7. Backend valida duplicidade por hash/localId.

## Status

- PENDENTE
- SINCRONIZANDO
- SINCRONIZADO
- FALHA
- REJEITADO

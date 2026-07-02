# Módulo de Documentos e Assinaturas

## Objetivo
Gerenciar o upload de arquivos (atestados médicos, contratos, advertências e holerites) e garantir a validade jurídica das assinaturas eletrônicas.

## Regras de Negócio
1. **Uploads:** Documentos enviados pelo App (Atestados) devem ser vinculados ao `tenantId` e `employeeId`. O armazenamento físico deve ser feito em Cloud Storage (ex: AWS S3) e o banco guarda a URL (`fileUrl`).
2. **Assinatura Eletrônica:**
   - Apenas documentos marcados com `requiresSignature = true` podem ser assinados.
   - A assinatura gera um **Hash SHA-256** irrevogável que usa o ID do documento, o ID do colaborador e a data/hora exata UTC.
   - Uma vez assinado (`isSigned = true`), o documento não pode ter sua assinatura alterada.

# Módulo Funcionário — Módulos funcionais da ficha

## Regra principal

A ficha do funcionário deverá ser organizada em módulos funcionais.

Cada módulo deverá ter sua própria finalidade, permissões, campos, validações e evolução técnica.

## Módulos funcionais previstos

### 1. Resumo

Objetivo:

- apresentar visão geral do funcionário;
- exibir status;
- exibir pendências;
- exibir alertas;
- exibir checklist de completude.

### 2. Dados pessoais

Objetivo:

- armazenar dados de identificação pessoal;
- manter informações básicas do colaborador;
- apoiar admissão, documentos, benefícios e folha.

Exemplos de campos:

- nome completo;
- nome social;
- CPF;
- RG;
- data de nascimento;
- e-mail;
- telefone;
- nacionalidade;
- estado civil.

### 3. Endereço

Objetivo:

- registrar endereço residencial;
- permitir integração futura com consulta de CEP;
- apoiar admissão, benefícios, documentos e folha.

Exemplos de campos:

- CEP;
- logradouro;
- número;
- complemento;
- bairro;
- cidade;
- UF;
- país.

### 4. Contrato

Objetivo:

- registrar informações da relação de trabalho;
- apoiar admissão, folha, gestão e relatórios.

Exemplos de campos:

- matrícula;
- data de admissão;
- tipo de contrato;
- cargo;
- função;
- departamento;
- centro de custo;
- gestor;
- filial/unidade;
- regime de trabalho.

### 5. Jornada e ponto

Objetivo:

- preparar o funcionário para módulos de ponto, jornada, banco de horas e escalas.

Exemplos de campos:

- jornada;
- escala;
- carga horária;
- tolerância;
- local de trabalho;
- regime presencial, híbrido ou remoto.

### 6. Documentos

Objetivo:

- armazenar documentos físicos/digitais do funcionário;
- permitir upload;
- controlar validade;
- controlar aprovação;
- gerar pendências;
- preparar avisos futuros no app mobile.

Exemplos de documentos:

- RG;
- CPF;
- CNH;
- certidões;
- comprovante de residência;
- contrato;
- ASO;
- certificados;
- termos assinados.

### 7. Dependentes

Objetivo:

- registrar dependentes e familiares quando necessário;
- apoiar benefícios, folha, imposto e plano de saúde.

Exemplos de campos:

- nome;
- CPF;
- data de nascimento;
- grau de parentesco;
- vínculo com benefício.

### 8. Benefícios

Objetivo:

- registrar benefícios concedidos ao funcionário;
- permitir controle de início, fim, custo e status.

Exemplos:

- vale transporte;
- vale refeição;
- vale alimentação;
- plano de saúde;
- plano odontológico;
- seguro de vida;
- auxílio home office;
- auxílio combustível.

### 9. Financeiro e bancário

Objetivo:

- registrar dados bancários e informações financeiras de RH;
- manter acesso restrito por permissão.

Exemplos:

- banco;
- agência;
- conta;
- tipo de conta;
- PIX;
- salário;
- histórico salarial;
- reajustes.

### 10. Saúde e segurança

Objetivo:

- controlar dados de SST e saúde ocupacional com acesso restrito.

Exemplos:

- ASO;
- exames ocupacionais;
- restrições médicas;
- EPI;
- treinamentos obrigatórios;
- CAT;
- PCMSO.

### 11. Usuário vinculado

Objetivo:

- controlar vínculo entre funcionário e usuário do sistema;
- permitir acesso futuro ao portal/app.

Fluxo previsto:

- funcionário pode existir sem usuário;
- usuário pode ser criado separadamente;
- vínculo é realizado depois;
- vínculo pode ser removido.

### 12. Auditoria

Objetivo:

- registrar eventos relevantes da ficha do funcionário;
- manter histórico de alterações;
- apoiar LGPD, segurança e rastreabilidade.

Eventos sugeridos:

- funcionário criado;
- dados alterados;
- documento enviado;
- documento aprovado;
- documento rejeitado;
- usuário vinculado;
- usuário desvinculado;
- funcionário inativado.

### 13. Pendências e notificações

Objetivo:

- registrar pendências operacionais do funcionário;
- preparar notificações futuras para app mobile.

Exemplos:

- documento pendente;
- documento vencido;
- documento a vencer;
- documento rejeitado;
- completar dados cadastrais;
- completar endereço;
- configurar jornada;
- vincular usuário.

## Regra de interface

A tela de detalhes do funcionário deverá ser organizada em abas ou seções, evitando formulário único gigante.

## Regra de permissão

Nem todos os módulos devem ficar disponíveis para todos os perfis.

Exemplos de áreas restritas:

- financeiro;
- bancário;
- saúde e segurança;
- documentos sensíveis;
- auditoria.

## Fora de escopo nesta parte

Esta parte não implementa:

- tabelas;
- endpoints;
- telas;
- upload;
- notificações;
- validação operacional.

Esta parte registra apenas os módulos funcionais previstos para a ficha do funcionário.

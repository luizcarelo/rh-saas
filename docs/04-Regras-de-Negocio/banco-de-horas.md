# Módulo de Banco de Horas e Compensação

## Regras de Negócio e Cálculos
Este módulo é responsável por cruzar as marcações brutas de ponto (`ClockEvents`) com as jornadas de trabalho estipuladas.

### 1. Cálculo Base (em Minutos)
Para garantir precisão e evitar erros de arredondamento fracionário (ex: 1.5 horas = 1h e 30m), todo o processamento de tempo do sistema é feito usando a grandeza de **minutos**.
- `Saldo (minutos) = Trabalhado (minutos) - Previsto (minutos)`

### 2. Fluxo de Pareamento (Matching)
O sistema lê o dia de forma cronológica, pareando eventos complementares:
- `ENTRADA` faz par com `SAIDA_INTERVALO`
- `RETORNO_INTERVALO` faz par com `SAIDA`

Se faltar uma batida (ex: o funcionário esqueceu de bater o retorno do almoço), o pareamento é quebrado. A empresa será notificada via dashboard para que o RH realize um ajuste manual no ponto (gerando um novo `ClockEvent` de correção, conforme exigência do MTE).

### 3. Fechamento de Folha
O campo `status` no Banco de Horas indica se aquele dia já foi fechado e enviado para a folha de pagamento (`CLOSED`). Dias fechados não sofrem recálculo automático se houver um ajuste de ponto retroativo, exigindo aprovação superior.

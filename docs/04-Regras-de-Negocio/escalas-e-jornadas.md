# Módulo de Escalas e Jornadas de Trabalho

## Objetivo
Este módulo define os horários esperados de trabalho para cada funcionário, permitindo que o sistema automatize o cálculo de horas extras e faltas, cumprindo as regras da CLT.

## Regras Implementadas
1. **Jornadas Fixas (FIXED):**
   - Baseia-se nos dias da semana. Exemplo: Segunda a Sexta. O sistema verifica a função `getUTCDay()` para determinar se o dia atual é um dia útil para aquele colaborador.
2. **Jornada de Revezamento (12x36):**
   - O cálculo é feito matematicamente medindo a diferença de dias entre a data de início da escala (`startDate`) e o dia atual. Se a diferença for par, o funcionário tem plantão. Se for ímpar, está de folga. Isso garante o funcionamento infinito da escala sem precisar cadastrar dia a dia.
3. **Tolerância (Art. 58 da CLT):**
   - O sistema embute a `dailyToleranceMinutes` (padrão 10). O módulo de Banco de Horas deve usar esse valor para ignorar variações ínfimas (ex: saldo de -7 minutos será zerado, mas um saldo de -12 minutos será registrado integralmente).

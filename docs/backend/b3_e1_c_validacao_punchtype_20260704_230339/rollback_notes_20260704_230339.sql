-- Rollback notes Backend-B3-E1-C
-- Gerado em: 20260704_230339
-- ATENCAO: confirme a tabela correta antes de executar qualquer DELETE.

-- IDs detectados nas respostas:
-- A_payload_antigo_sem_punchType => id=e61c832b-12f0-482f-89cb-a3050831719e, response=/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/response_A_payload_antigo_sem_punchType.json
-- B_punchType_ENTRADA => id=2ff834f2-cdbc-4ffc-a090-a73d622528db, response=/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/response_B_punchType_ENTRADA.json
-- C_punchType_INICIO_INTERVALO => id=835f6c0a-fd17-4bb1-a817-c7565c3bfcff, response=/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/response_C_punchType_INICIO_INTERVALO.json
-- D_punchType_FIM_INTERVALO => id=962a81ed-d3e0-49b4-a0ae-e673a7cb23d0, response=/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/response_D_punchType_FIM_INTERVALO.json
-- E_punchType_SAIDA => id=4ac44739-d1eb-4c27-9ba5-8a4186a15e49, response=/opt/rh-saas/docs/backend/b3_e1_c_validacao_punchtype_20260704_230339/response_E_punchType_SAIDA.json

-- Sugestao: localizar IDs no banco antes de remover:
-- SELECT * FROM time_records WHERE id IN (...);
-- DELETE FROM time_records WHERE id IN (...);

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg110+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin_rh_saas
--

INSERT INTO public.users (id, tenant_id, email, "passwordHash", "isActive", last_login_at, created_at, updated_at, role) VALUES ('5ee2bff9-27d9-42bc-aef5-d82147ced930', '11446a8f-ed2c-468e-9be1-3409beb12d3c', 'admin@empresa.com', '$2b$10$hhwGJ/qZ8lDR3S3Jr4rNJuXEPETeVD8ibHGHfYfw8.kHyL97ddy6y', true, NULL, '2026-07-02 22:14:42.8704', '2026-07-02 22:14:42.8704', 'ADMIN');
INSERT INTO public.users (id, tenant_id, email, "passwordHash", "isActive", last_login_at, created_at, updated_at, role) VALUES ('6e8821c9-53ea-4787-87d7-36bf6e11db82', '11446a8f-ed2c-468e-9be1-3409beb12d3c', 'superadmin@rh-saas.local', '$2a$06$3gBFmUs6GgSO9Badxb/fQeg5wx0s4/jEi.eqm/MEyTnHgR/jxm7le', true, NULL, '2026-07-03 02:22:26.918424', '2026-07-03 02:22:26.918424', 'SUPER_ADMIN');


--
-- PostgreSQL database dump complete
--


--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text,
    "userId" integer,
    "createdAt" date DEFAULT CURRENT_DATE NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer,
    url text,
    "shortUrl" text,
    "visitCount" integer,
    "createdAt" date DEFAULT CURRENT_DATE NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text,
    password text,
    "visitCount" integer NOT NULL,
    "linksCount" integer NOT NULL,
    "createdAt" date DEFAULT CURRENT_DATE NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, '2394d644-7158-4e88-9f28-370520b42477', 6, '2022-12-23');
INSERT INTO public.sessions VALUES (2, '760eaf5a-d111-419b-8b74-76d6c19186ca', 5, '2022-12-23');
INSERT INTO public.sessions VALUES (3, 'af5e991a-2340-4064-a870-69a291608c49', 7, '2022-12-23');
INSERT INTO public.sessions VALUES (4, '8ba4acdd-ef4f-48b8-b9c4-0737c0da4a46', 8, '2022-12-23');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (105, 6, 'http://www.globo.com', 'RGfIDx', 0, '2022-12-23');
INSERT INTO public.urls VALUES (106, 6, 'http://www.globo.com', '2p7L20', 0, '2022-12-23');
INSERT INTO public.urls VALUES (107, 6, 'http://www.globo.com', 'dJBLmg', 0, '2022-12-23');
INSERT INTO public.urls VALUES (110, 6, 'http://www.globo.com', '9TXfsr', 0, '2022-12-23');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (7, 'João', 'joa@driven.com.br', '$2b$10$ntkEofdjiG1qozUZewntxuy9DyjkB3Xu2tE.R5aUj4HVULEfYjTXm', 0, 0, '2022-12-23');
INSERT INTO public.users VALUES (8, 'João', 'ja@driven.com.br', '$2b$10$HuKfnxJ/I2zDwq.iqbxIH.T4Ovd6ZnwSJzeaHOwktvHn5ujU2ln2W', 0, 0, '2022-12-23');
INSERT INTO public.users VALUES (6, 'Decca', 'joao@driven.com.br', '$2b$10$l.goRjwbxQK0DI1Izsl3ru3sncJ2AsCpmbG4l26U4rAZm/zM3NTxm', 0, 4, '2022-12-23');
INSERT INTO public.users VALUES (5, 'Decca', 'deca@driven.com.br', '$2b$10$Jsc5gME5Mg9tLUQteORK.uYPc.GKgv5y0CEfP3q/XqJsV0Kl7ePxi', 0, 0, '2022-12-23');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 4, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 110, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--


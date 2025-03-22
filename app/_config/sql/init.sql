CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: public.companies

-- DROP TABLE IF EXISTS public.companies;

CREATE TABLE IF NOT EXISTS public.companies
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    domain text NOT NULL,
    root_email text NOT NULL,
    cognito_id text NOT NULL,
    confirmed boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT companies_pkey PRIMARY KEY (uuid)
);


-- Table: public.company_structures

-- DROP TABLE IF EXISTS public.company_structures;

CREATE TABLE IF NOT EXISTS public.company_structures
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    company_uuid uuid NOT NULL,
    layers json NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT company_structures_pkey PRIMARY KEY (uuid),
    CONSTRAINT company_structures_company_uuid_fkey FOREIGN KEY (company_uuid)
        REFERENCES public.companies (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);


-- Table: public.workers

-- DROP TABLE IF EXISTS public.workers;

CREATE TABLE IF NOT EXISTS public.workers
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    company_uuid uuid NOT NULL,
    cognito_id text NOT NULL,
    email text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT workers_pkey PRIMARY KEY (uuid)
);


-- Table: public.personal

-- DROP TABLE IF EXISTS public.personal;

CREATE TABLE IF NOT EXISTS public.personal
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    worker_uuid uuid NOT NULL,
    name text NOT NULL,
    date_of_birth date NOT NULL,
    country_of_birth text NOT NULL,
    city_of_birth text NOT NULL,
    citizenship text[] NOT NULL,
    nationality text NOT NULL,
    gender text,
    marital_status text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT personal_info_pkey PRIMARY KEY (uuid)
);


-- Table: public.documents

-- DROP TABLE IF EXISTS public.documents;

CREATE TABLE IF NOT EXISTS public.documents
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    worker_uuid uuid NOT NULL,
    type text NOT NULL,
    id text NOT NULL,
    s3_arn text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT documents_pkey PRIMARY KEY (uuid)
);

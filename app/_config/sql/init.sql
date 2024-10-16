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


-- Table: public.company_hierarchy

-- DROP TABLE IF EXISTS public.company_hierarchy;

CREATE TABLE IF NOT EXISTS public.company_hierarchy
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    company_uuid uuid NOT NULL,
    layers json NOT NULL,
    CONSTRAINT company_hierarchy_pkey PRIMARY KEY (uuid),
    CONSTRAINT company_hierarchy_company_uuid_fkey FOREIGN KEY (company_uuid)
        REFERENCES public.companies (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

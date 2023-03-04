-- create the tables
-- default is the public schema 
-- 
-- psql -d <url from elephantSQL> -f user_create.sql
-- psql -d postgres://ipvthdrz:k2nITovGsfy1jDFVFiVZRQEiFmLJOFDV@mahmud.db.elephantsql.com/ipvthdrz -f user_create.sql
-- CREATE TABLE products ( ... ); === CREATE TABLE public.products ( ... );

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

-- query for public.user so not to grab current user from SQL
CREATE TABLE public.user (
	"_id" serial NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.users_itineraries (
	"_id" serial NOT NULL,
	"user_id" bigint NOT NULL,
	"mongo_id" bigint NOT NULL,
	CONSTRAINT "users_itineraries_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

-- to add the foreign keys at the end of the table creation
-- add foreign key to users_itineraries called "users_itineraries_fk"
ALTER TABLE public.users_itineraries ADD CONSTRAINT "users_itineraries_fk0" FOREIGN KEY ("user_id") REFERENCES  public.user("_id");
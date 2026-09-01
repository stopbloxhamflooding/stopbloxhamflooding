-- Stop Bloxham Flooding V2 schema / security reference
-- Production changes should be applied as Supabase migrations.

create extension if not exists pgcrypto;

-- Administrators are explicitly allow-listed here.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

-- SECURITY DEFINER allows policies to check membership without exposing admin_users.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists(select 1 from public.admin_users where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Public content tables already exist in production: site_content, projects,
-- documents and questions. RLS must be enabled on all four.

-- IMPORTANT privacy rule: the browser public site selects only
-- id,name,type,body,answer,created_at from published questions. Email is never rendered.

-- Admin policies must use public.is_admin(), never merely authenticated status.
-- Residents can insert unpublished questions, but cannot read unpublished submissions.

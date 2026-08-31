create extension if not exists pgcrypto;

create table if not exists public.site_content (
  id integer primary key default 1,
  status text not null default '🟠 Works and investigations ongoing',
  updated text not null default 'August 2026',
  focus text not null default 'The Slade / Courtington Lane / Workhouse Lane',
  intro text not null default 'A clear, independent public record of flood alleviation works, decisions, progress, evidence and residents’ questions.',
  latest text not null default 'Project information will be updated here.'
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text,
  description text not null,
  sort_order integer not null default 1,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  type text not null,
  body text not null,
  answer text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
alter table public.projects enable row level security;
alter table public.documents enable row level security;
alter table public.questions enable row level security;

-- Public read access to published material.
create policy "public can read site content" on public.site_content for select using (true);
create policy "public can read published projects" on public.projects for select using (published = true);
create policy "public can read published documents" on public.documents for select using (published = true);
create policy "public can read published questions" on public.questions for select using (published = true);

-- Residents may submit questions. They cannot read unpublished questions.
create policy "public can submit questions" on public.questions for insert with check (
  length(name) between 1 and 100 and
  length(email) between 3 and 200 and
  length(body) between 1 and 5000 and
  published = false
);

-- Authenticated users can administer content.
create policy "authenticated admins manage site content" on public.site_content for all to authenticated using (true) with check (true);
create policy "authenticated admins manage projects" on public.projects for all to authenticated using (true) with check (true);
create policy "authenticated admins manage documents" on public.documents for all to authenticated using (true) with check (true);
create policy "authenticated admins manage questions" on public.questions for all to authenticated using (true) with check (true);

insert into public.site_content(id) values (1) on conflict (id) do nothing;
insert into public.projects(title,icon,description,sort_order,published) values
('The Slade','🌿','Natural Flood Management measures are planned to help slow and hold back water during major rainfall events.',1,true),
('Courtington Lane / Workhouse Lane','🚧','Drain-line proposals are being reviewed while alternative solutions are investigated.',2,true)
on conflict do nothing;

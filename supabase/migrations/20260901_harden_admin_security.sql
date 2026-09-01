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

-- Replace broad authenticated-user administration policies.
drop policy if exists "authenticated admins manage site content" on public.site_content;
drop policy if exists "authenticated admins manage projects" on public.projects;
drop policy if exists "authenticated admins manage documents" on public.documents;
drop policy if exists "authenticated admins manage questions" on public.questions;

create policy "allowlisted admins manage site content" on public.site_content
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "allowlisted admins manage projects" on public.projects
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "allowlisted admins manage documents" on public.documents
for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "allowlisted admins manage questions" on public.questions
for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- The admin allow-list itself is not directly readable from browser roles.
revoke all on table public.admin_users from anon, authenticated;

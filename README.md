# Stop Bloxham Flooding — Production Starter

This package is the production architecture for **www.stopbloxhamflooding.co.uk**:

- GitHub Pages for free static hosting
- Supabase for Postgres database + authentication
- Row Level Security (RLS) for public/admin separation
- Resident submissions held for moderation
- Admin editing for site content, projects, questions and documents
- GitHub Actions deployment
- Custom-domain CNAME included

## 1. Create the GitHub repository

Create a new GitHub repository, for example `stopbloxhamflooding`, and upload the contents of this folder to the `main` branch.

GitHub Pages supports custom domains including `www` subdomains. Configure Pages in repository Settings > Pages and set the custom domain to `www.stopbloxhamflooding.co.uk`.

## 2. Create the Supabase project

Create a free Supabase project.

In Supabase SQL Editor, run:

`supabase/schema.sql`

Then create an administrator user in Supabase Authentication > Users. Use your own email and a strong password.

The browser must use only the Supabase project URL and public anon key. NEVER put a service-role key in the website.

## 3. Configure the frontend

Copy `config.example.js` to `config.js` and enter:

- Supabase project URL
- Supabase anon/public key

Then add this line before `app.js` on `index.html`:

`<script src="config.js"></script>`

and before `admin.js` on `admin.html`:

`<script src="config.js"></script>`

For an even cleaner deployment, these values can instead be injected during the GitHub Actions build.

## 4. GitHub Pages

In GitHub:

Settings → Pages → Build and deployment → Source: GitHub Actions.

The included workflow deploys the repository.

## 5. DNS

At the domain registrar/DNS provider, configure the `www` CNAME to the GitHub Pages default domain for the repository/account.

GitHub recommends using a `www` subdomain and supports HTTPS for correctly configured custom domains.

DNS changes can take time to propagate.

## 6. Production hardening

Before public launch I recommend adding:

- CAPTCHA/anti-spam on resident submissions
- email notification to the administrator
- privacy notice and retention policy
- document/file uploads via Supabase Storage
- an editable map
- image gallery for works
- audit history for administrative changes
- a second administrator account
- database backups
- moderation rules and a simple complaints/contact route

The supplied RLS policies provide the core public/admin separation, but the project should still be tested carefully before opening submissions to the public.

# consultutah.com

Static site for Consult Utah.

## Purpose

- Position Consult Utah as an AI/software consultancy for engineering and worker enablement.
- Host app pages, support pages, privacy policies, and terms for apps such as PeptideTrax.
- Deploy cleanly on GitHub Pages with the custom domain `consultutah.com`.

## Structure

- `/` — consultancy homepage
- `/services/` — consulting offers
- `/apps/` — app directory
- `/apps/peptidetrax/` — PeptideTrax product page
- `/apps/peptidetrax/privacy/` — PeptideTrax privacy policy
- `/apps/peptidetrax/support/` — PeptideTrax support page
- `/privacy/` — Consult Utah website/privacy policy
- `/terms/` — terms of use
- `/support/` — general support/contact

## Local preview

```bash
npm run serve
# open http://localhost:4173
```

## Checks

```bash
npm run check
```

## GitHub Pages setup

1. Push this repo to GitHub.
2. Enable GitHub Pages from the repository root on the default branch.
3. Keep the `CNAME` file set to `consultutah.com`.
4. Configure DNS:
   - Root/apex `consultutah.com`: GitHub Pages A/AAAA records.
   - `www.consultutah.com`: CNAME to `<github-username>.github.io` or redirect to apex.
5. In GitHub Pages settings, wait for DNS verification and enable HTTPS.

## DNS note

At project creation, `consultutah.com` did not resolve and `www.consultutah.com` had an SSL hostname mismatch/404. DNS and GitHub Pages custom-domain setup still need to be completed after the repo is pushed.

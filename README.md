# Bedford Youth Soccer Club — Website

A modern, mobile-friendly static website for BYSC built with [Hugo](https://gohugo.io/) and [Sveltia CMS](https://github.com/sveltia/sveltia-cms). Non-technical staff can edit all content through a web-based admin panel — no coding required.

---

## Architecture

| Layer | Tool | Cost |
|-------|------|------|
| Site generator | [Hugo](https://gohugo.io/) | Free |
| CMS (editor UI) | [Sveltia CMS](https://github.com/sveltia/sveltia-cms) | Free / open source |
| Content storage | GitHub repository | Free |
| CI / Build | GitHub Actions | Free (public repo) |
| Hosting | TigerTech.net | Your existing plan |

**How it works:** Editors log into `/admin`, write content, and click Save. Sveltia CMS commits the changes to GitHub as Markdown files. GitHub Actions automatically builds the Hugo site and deploys it to TigerTech via FTP — the live site updates within ~2 minutes.

---

## One-Time Setup (site admin)

### 1. Configure `hugo.toml`
Edit `hugo.toml` and update `baseURL` to your actual domain:
```toml
baseURL = "https://yourdomain.tigertech.net/"
```

### 2. Create a GitHub OAuth App (needed for the CMS login)
1. Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**
2. Fill in:
   - **Application name:** BYSC Website CMS
   - **Homepage URL:** `https://yourdomain.tigertech.net`
   - **Authorization callback URL:** `https://yourdomain.tigertech.net/admin/`
3. Click **Register application**
4. Copy the **Client ID** shown on the next page
5. Open `static/admin/config.yml` and replace `YOUR_GITHUB_OAUTH_CLIENT_ID` with it
6. Commit and push

### 3. Add GitHub Actions Secrets (for FTP deploy)
In your GitHub repo go to **Settings → Secrets and variables → Actions** and add:

| Secret | Value |
|--------|-------|
| `FTP_SERVER` | Your TigerTech FTP hostname (e.g. `ftp.yourdomain.com`) |
| `FTP_USERNAME` | Your TigerTech FTP username |
| `FTP_PASSWORD` | Your TigerTech FTP password |

These are stored encrypted — never visible after saving.

### 4. Push to `main`
Any push to `main` triggers a build and deploy. After the first successful deploy, the site is live.

### 5. Connect Google Calendar (optional)
1. Open your Google Calendar → **Settings** → click your BYSC calendar
2. Scroll to **Integrate calendar** → copy the **Embed code** `src` URL
3. Log into `/admin` → **Pages → Schedule Page** → paste the URL into "Google Calendar Embed URL" → Save

---

## Content Editing (for non-technical staff)

1. Go to `https://yourdomain.tigertech.net/admin/`
2. Click **Login with GitHub** and authorize the app (one-time)
3. You'll see the content manager:

| Section | What you can edit |
|---------|------------------|
| **News & Announcements** | Create, edit, delete news posts. Set a category and toggle Draft to hide posts. |
| **Programs & Teams** | Add/edit age-group descriptions, icons, and program type. |
| **Pages → Home Page** | Update the hero headline, subtitle, and stat numbers. |
| **Pages → Schedule Page** | Paste your Google Calendar embed URL. |
| **Pages → Registration Page** | Toggle registration open/closed, add registration link, edit FAQ. |
| **Pages → About Page** | Edit mission, history, values text. |
| **Site Settings → Club Info** | Update contact email, phone, social media links, address. |

---

## Local Development

Install [Hugo](https://gohugo.io/installation/) (v0.120+), then:

```bash
git clone https://github.com/furleyman-hub/bysc-site.git
cd bysc-site
hugo server
```

Open `http://localhost:1313` in your browser. The site hot-reloads on file changes.

To build for production:
```bash
hugo --minify
# Output is in ./public/
```

---

## Project Structure

```
bysc-site/
├── hugo.toml               # Site configuration
├── assets/
│   ├── css/main.css        # All styles
│   └── js/main.js          # Navbar, FAQ, mobile menu
├── content/
│   ├── _index.md           # Home page data
│   ├── about.md            # About page
│   ├── schedule.md         # Schedule page
│   ├── registration.md     # Registration page
│   ├── news/               # News posts (Markdown)
│   └── programs/           # Program pages (Markdown)
├── data/
│   └── settings.yaml       # Club contact info, social links
├── layouts/                # Hugo HTML templates
├── static/
│   ├── admin/              # Sveltia CMS files (do not edit)
│   ├── images/uploads/     # Images uploaded via CMS
│   └── favicon.svg
└── .github/workflows/
    └── deploy.yml          # Auto build + FTP deploy on push to main
```

---

## Adding a New Coach or Board Member

Edit `content/about.md` in the admin panel under **Pages → About Page** and add their name to the relevant section.

## Weather Cancellations

Post a news item under **News & Announcements** with category "Announcement". It will immediately appear on the home page and news listing once saved (draft toggle must be off).

---

## Support

For technical issues with the site itself, open an issue in the GitHub repository.  
For CMS questions, see the [Sveltia CMS documentation](https://github.com/sveltia/sveltia-cms).

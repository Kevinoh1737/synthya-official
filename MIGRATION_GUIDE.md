# Synthya Website — Migration Guide (Replit → Antigravity)

This document contains everything needed to migrate the Synthya marketing site from Replit to Google Antigravity (or any standard Node.js hosting environment).

---

## 1. Project Overview

**Synthya (신티아)** — Korean-language marketing & lead generation site for an AI workforce solutions company.

- 7-page Korean SPA (Home, About, Methodology, Experience, Pricing, POC, Contact)
- Captures POC inquiry submissions to a PostgreSQL database
- Sends inquiry email notifications via EmailJS (client-side)
- GA4 analytics + Naver site verification configured

---

## 2. Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React 19 + TypeScript + Vite 7 |
| Routing | Wouter |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix UI) |
| Animations | Framer Motion |
| State / Data | TanStack React Query |
| Backend | Node.js 20 + Express 5 (TypeScript / ESM) |
| Database | PostgreSQL 16 |
| ORM | Drizzle ORM + drizzle-zod |
| Email | EmailJS (`@emailjs/browser`) — client side |
| Build | esbuild (server) + Vite (client) |

---

## 3. Project Structure

```
├── client/                    # React frontend
│   ├── index.html             # Entry HTML (GA4, meta tags, Naver verify)
│   ├── public/                # Static assets (favicon, og image)
│   └── src/
│       ├── components/        # Reusable UI components (Navbar, Footer, shadcn/ui)
│       ├── pages/             # Page components (Home, About, Methodology,
│       │                      # Experience, Pricing, POC, Contact)
│       ├── hooks/             # Custom React hooks
│       ├── lib/               # Utilities + queryClient
│       ├── App.tsx            # Route registration (wouter)
│       └── main.tsx           # React entry
├── server/                    # Express backend
│   ├── index.ts               # Server entry (port 5000 default)
│   ├── routes.ts              # API routes (/api/poc-inquiries)
│   ├── storage.ts             # DB access layer (IStorage interface)
│   ├── static.ts              # Static file serving (production)
│   └── vite.ts                # Vite dev middleware (development)
├── shared/
│   └── schema.ts              # Drizzle schema + Zod types (users, pocInquiries)
├── db/
│   └── index.ts               # PG connection pool + drizzle init
├── attached_assets/           # User-uploaded reference images
├── script/
│   └── build.ts               # Build script (esbuild + vite build)
├── vite.config.ts             # Vite config (with Replit plugins)
├── vite-plugin-meta-images.ts # Custom OG image plugin (Replit-specific)
├── drizzle.config.ts          # Drizzle Kit config
├── tsconfig.json
├── package.json
└── replit.md                  # Project notes
```

---

## 4. Environment Variables

Create a `.env` file (or set in Antigravity environment) with:

```bash
# Required
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME

# Optional (defaults to 5000)
PORT=5000

# Production
NODE_ENV=production
```

**Note:** EmailJS credentials are currently hardcoded in `client/src/pages/POC.tsx`:
- Service ID: `service_lv3mftg`
- Template ID: `template_isnyh0w`
- Public Key: `2x2ACVrADaiqiDYSN`

These are public keys safe to expose in client-side code. Consider moving to `import.meta.env.VITE_EMAILJS_*` if you want them configurable per environment.

---

## 5. Database Schema

Two tables defined in `shared/schema.ts`:

### `users`
- `id` (uuid, PK)
- `username` (text, unique)
- `password` (text)

### `poc_inquiries`
- `id` (serial, PK)
- `company` (text)
- `name` (text)
- `email` (text)
- `phone` (text)
- `task` (text)
- `created_at` (timestamp, default now)

**To create tables on the new DB:**
```bash
npm run db:push
```

---

## 6. API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/poc-inquiries` | Create new POC inquiry (validated via `insertPocInquirySchema`) |

All routes are defined in `server/routes.ts`.

---

## 7. Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables (see section 4)
export DATABASE_URL="postgresql://..."

# 3. Push schema to database
npm run db:push

# 4. Start dev server (HMR via Vite middleware on port 5000)
npm run dev

# Open http://localhost:5000
```

---

## 8. Production Build & Deploy

```bash
# Build (esbuild bundles server → dist/index.cjs, vite builds client → dist/public)
npm run build

# Start
npm start
# Equivalent to: NODE_ENV=production node ./dist/index.cjs
```

The Express server serves the built React app from `dist/public` in production.

---

## 9. Replit-Specific Code to Remove or Replace

These files/dependencies are Replit-specific and can be removed when migrating:

### `vite.config.ts`
Remove these plugins and the conditional Replit imports:
- `@replit/vite-plugin-runtime-error-modal`
- `@replit/vite-plugin-cartographer`
- `@replit/vite-plugin-dev-banner`
- The `metaImagesPlugin()` from `vite-plugin-meta-images.ts` (only needed for Replit's OG image URL handling)

### `package.json` devDependencies to remove:
```
@replit/vite-plugin-cartographer
@replit/vite-plugin-dev-banner
@replit/vite-plugin-runtime-error-modal
```

### Files safe to delete:
- `vite-plugin-meta-images.ts` (Replit-specific OG image rewriter)
- `.replit` (Replit config)
- `.upm/`, `.cache/`, `.agents/`, `.local/` directories
- `replit.md` (or keep as project notes)

### Cleaned `vite.config.ts` example:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
  },
});
```

---

## 10. Third-Party Service Configuration

### EmailJS (https://www.emailjs.com)
- Service: Gmail API connection
- Template fields used: `{{name}}`, `{{company}}`, `{{email}}`, `{{phone}}`, `{{message}}`
- **Allowed Origins**: Add your new production domain in Account → Security
- **Important**: If "Use Private Key" is checked, you must either uncheck it or update the EmailJS call in `client/src/pages/POC.tsx` to use the private key
- **Gmail re-auth**: If you see "Invalid grant" errors, reconnect the Gmail account in EmailJS dashboard → Email Services

### Google Analytics 4
- Tracking ID: `G-ZK8FRN2E1M`
- Located in `client/index.html` (gtag.js script)

### Naver Search Advisor
- Site verification meta tag in `client/index.html`:
  `<meta name="naver-site-verification" content="6c8aac19a6aeb90cd92a448c389fb8cd826930f3" />`
- Re-verify after deploying to new domain

---

## 11. Brand / Design Reference

- **Aesthetic**: "Calm SaaS" — Notion / Stripe / Linear inspired
- **Colors**: Deep Navy (primary), Warm Gray (secondary), Soft Blue (accent)
- **Typography**: Inter + Noto Sans KR (loaded via Google Fonts CDN)
- **Korean text**: All text uses `word-break: keep-all` for proper line breaking

---

## 12. Key Business Terminology

- "AI 에이전트" — used in SEO meta tags / keywords
- "AI 직원" — used in user-facing UI copy
- "POC" → labeled as "무료 체험" in body text, with "POC(Proof of Concept)란..." explanation on first mention in detail modals
- All consultation CTAs use: **"우리 업무에 적용 상담하기"**
- Navbar/Footer CTA: **"적용 상담"**
- All POC/상담 buttons link to `/poc#poc-form` with direct scroll to form

---

## 13. Migration Checklist

- [ ] Extract zip file to new location
- [ ] Run `npm install`
- [ ] Provision PostgreSQL 16 database
- [ ] Set `DATABASE_URL` env var
- [ ] Run `npm run db:push` to create tables
- [ ] (Optional) Remove Replit-specific plugins from `vite.config.ts` and `package.json`
- [ ] Test locally: `npm run dev` → open `http://localhost:5000`
- [ ] Build: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Deploy to hosting platform
- [ ] Add new production domain to EmailJS allowed origins
- [ ] Verify EmailJS Gmail connection is active
- [ ] Re-verify site in Naver Search Advisor on new domain
- [ ] Update GA4 if domain changes
- [ ] Test POC inquiry submission end-to-end (DB save + email delivery)

---

## 14. Known Issues & Notes

1. **EmailJS Gmail OAuth**: Tokens expire periodically. If submission emails fail, reconnect Gmail in EmailJS dashboard.
2. **Form submission UX**: Currently `Promise.all([dbSave, emailSend])` — if either fails, user sees error. Consider decoupling so DB save success is reported even if email fails (then alerted via separate channel).
3. **Database backup**: Export current production data from Replit before switching domains:
   ```bash
   pg_dump $DATABASE_URL > synthya_backup.sql
   ```

---

## 15. Contact Form Email Template (EmailJS)

Template variables expected in your EmailJS template:
- `{{name}}` — Contact name
- `{{company}}` — Company name
- `{{email}}` — Reply email
- `{{phone}}` — Phone number
- `{{message}}` — Task / inquiry description

---

End of migration guide.

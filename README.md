# TommyOS

A cyberpunk-themed personal portfolio for **Tommy**, styled as a terminal-driven
operating system — with a live, real-auth simulated shell called **Owl-OS**, and a
root-only **Admin** tab that only appears once you've authenticated.

- **Frontend:** Next.js 14 (App Router, TypeScript), Tailwind CSS
- **Backend:** Express.js (TypeScript), `express-session`, `bcryptjs`, `helmet`
- **Deployment:** Docker Compose (self-hosted)
- **Palette:** monochrome graphite gray + a single purple accent — no pink/magenta,
  no cyan
- **Branding:** the owl artwork is used as the nav logo, the Home hero badge, and the
  site favicon (`frontend/public/owl-logo.jpg`, `frontend/app/icon.jpg`)

---

## Project structure

```
tommyos/
├── frontend/                 Next.js 14 app (App Router, TypeScript, Tailwind)
│   ├── app/
│   │   ├── layout.tsx        Root layout — loads fonts at runtime, wraps pages in <AppChrome>
│   │   ├── page.tsx          / (Home)
│   │   ├── about/page.tsx    /about
│   │   ├── projects/page.tsx /projects
│   │   ├── contact/page.tsx  /contact
│   │   ├── terminal/page.tsx /terminal — Owl-OS shell
│   │   ├── admin/page.tsx    /admin — root-only
│   │   ├── icon.jpg          Owl artwork, auto-detected by Next.js as the favicon
│   │   └── globals.css       Design tokens, scanline/glitch/terminal utility classes
│   ├── public/
│   │   └── owl-logo.jpg      Owl artwork used in the nav logo and Home hero badge
│   ├── components/
│   │   ├── AppChrome.tsx     Persistent boot sequence + effects + nav across every route
│   │   ├── AuthContext.tsx   React context tracking the Owl-OS session (isAdmin)
│   │   ├── Nav.tsx           Real <Link>-based nav; shows Admin only when isAdmin
│   │   ├── BootSequence.tsx  Boot animation shown once on load
│   │   ├── ScreenEffects.tsx Scanlines / scan bar / vignette overlay
│   │   ├── GlitchText.tsx    Reusable heading with occasional glitch effect
│   │   ├── sections/         Home, About, Projects, Contact
│   │   ├── terminal/         OwlTerminal.tsx — the guest→root auth shell
│   │   └── admin/            AdminSection.tsx — the root-only page content
│   ├── lib/api.ts            Fetch client for the backend auth/admin API
│   └── types/index.ts
├── backend/                  Express API (TypeScript)
│   └── src/
│       ├── index.ts          App entrypoint — helmet, cors, session, routes
│       ├── config.ts         Env var loading/validation
│       ├── middleware/requireAuth.ts
│       ├── routes/auth.ts    POST /api/auth/owl, GET /status, POST /logout
│       ├── routes/admin.ts   GET /api/admin/status — protected by requireAuth
│       └── scripts/generate-hash.ts   CLI to hash the admin password
└── docker-compose.yml
```

---

## Navigation

Every tab is a real Next.js route with its own URL, navigated via `next/link`
(`/`, `/about`, `/projects`, `/contact`, `/terminal`, and `/admin` once
authenticated) — not client-side tab state. `AppChrome` (mounted once in the root
layout) keeps the boot sequence, scanline/vignette effects, and nav bar persistent
across every page so they don't replay or flicker on navigation. Because these are
real route changes, Next.js's built-in scroll restoration resets the page to the
top on every navigation — no manual scroll handling needed.

The **Enter Portfolio** button on the hero goes to **About** (not Projects) — the
intended order is: Home → **Enter Portfolio → About** → *View My Projects* →
Projects → *Get In Touch* → Contact.

`/admin` is protected on the **server**, not just the client: `app/admin/page.tsx`
is a server component that reads the incoming session cookie, forwards it to the
backend's `GET /api/auth/status`, and calls Next.js's `notFound()` if there's no
valid session — so a signed-out visitor going straight to `/admin` gets a real,
themed `404` (`app/not-found.tsx`), not a flash of admin content followed by a
redirect. This makes the route `force-dynamic` (server-rendered per request
instead of static) since it has to check auth on every request. Once inside,
`AdminSection` still does its own client-side status check as a second layer, in
case the session expires while the tab is already open — that case still redirects
back to `/` rather than 404ing on an already-loaded page.

`/admin` is also excluded from search engines: the page sets
`robots: { index: false, follow: false, nocache: true }` and `app/robots.ts`
disallows `/admin` in `robots.txt`.

---

## How Owl-OS authentication works

1. Clicking the **Terminal** tab drops the user straight into a live shell — there is
   no landing page or "Enter Terminal" button.
2. The shell starts in a restricted **guest** session; most commands return
   `permission denied`.
3. Typing `sudo owl` starts the auth flow: the shell asks for a password (masked
   input).
4. On submit, the frontend calls `POST /api/auth/owl` on the Express backend.
5. The backend compares the submitted password against a **bcrypt hash** stored in
   the backend's environment (`ADMIN_PASSWORD_HASH`) using `bcryptjs.compare`.
6. On success, the backend sets `req.session.isAdmin = true`, which is persisted via
   an **HttpOnly** session cookie (`owlos.sid`) — the frontend never sees or stores
   the password or a token, only the cookie set by the browser.
7. The frontend then reveals a new **Admin** tab in the nav. It wasn't hidden CSS —
   it simply doesn't exist in the nav's link list until `isAdmin` is true. Clicking
   it shows:
   - a **SITE_STATUS** panel pulled live from `GET /api/admin/status` (also
     protected by `requireAuth`) — real backend uptime, server time, environment,
     and Node.js version, not placeholder numbers
   - a small authenticated shell with the same command set as the Owl-OS terminal
     (`help`, `whoami`, `clear`, `sudo owl` — which now just replies "already
     authenticated as root")
   - a **Logout** button
8. Reloading the page keeps both the session and the Admin tab (checked via
   `GET /api/auth/status` on load) until the cookie expires or the user logs out.
   Logging out immediately removes the Admin tab from the nav and returns to Home.
9. A wrong password increments a simple attempt counter and returns
   `permission denied`; after 5 failed attempts the endpoint responds `429` for a
   while.

This mirrors the production design decisions already in use for this project:
HttpOnly cookie-based sessions (not JWT) for simplicity and security, and
`bcryptjs` (not `bcrypt`) to avoid native compilation failures on Alpine Linux
inside Docker.

---

## Local development (without Docker)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Generate a bcrypt hash for your chosen Owl-OS password:

```bash
npm run hash -- "your-password-here"
```

The script prints two versions — **use the right one for how you're running the
app**:
- **Local dev (`npm run dev`, no Docker):** use the **raw bcrypt hash**. Node's
  `dotenv` does not touch `$` characters, so the hash needs to stay exactly as
  bcrypt produced it.
- **Docker Compose:** use the **`$$`-escaped version**. Compose's `env_file:`
  mechanism treats a lone `$` as the start of a shell-style variable and silently
  corrupts the hash, so it needs the doubled `$$` to survive that substitution.

Mixing these up is a real, easy-to-hit bug — pasting the escaped hash into a local
`.env` (or vice versa for Docker) makes every login attempt fail with "incorrect
password" even when you're typing the right one.

Fill in the rest of `backend/.env`:

```
PORT=4000
NODE_ENV=development
SESSION_SECRET=some-long-random-string
FRONTEND_ORIGIN=http://localhost:3000
ADMIN_PASSWORD_HASH=<paste the escaped hash here>
```

Start the API:

```bash
npm run dev
```

The backend runs at `http://localhost:4000`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

`frontend/.env`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Start the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000`. Go to the **Terminal** tab, type `sudo owl`, enter the
password you hashed above, and you should see the Admin Panel unlock.

---

## Running with Docker Compose

Make sure `backend/.env` and `frontend/.env` exist and are filled in (see above —
this is required, they're not committed to version control).

From the project root:

```bash
docker compose up --build
```

- Frontend → `http://localhost:3000`
- Backend → `http://localhost:4000`

To run in the background:

```bash
docker compose up --build -d
```

To stop:

```bash
docker compose down
```

### Known Docker gotchas (already accounted for in this setup)

- **`bcryptjs` over `bcrypt`** — avoids native compilation failures on Alpine Linux
  base images.
- **Fonts loaded via `<link>` tags at runtime** (in `app/layout.tsx`), not
  `next/font/google` — `next/font/google` needs network access at *build* time,
  which fails in an offline/restricted Docker build step.
- **`$` in the bcrypt hash** — Docker Compose's `env_file` treats a lone `$` as the
  start of a shell-style variable reference and silently corrupts the hash. Use the
  `$$`-escaped value the `npm run hash` script prints when the hash is going into a
  Compose `env_file`; use the raw hash for local (non-Docker) `.env` files, since
  `dotenv` doesn't unescape `$$` back to `$`.
- **Docker socket permissions** — if `docker compose` commands fail with a
  permissions error on Linux, add your user to the `docker` group
  (`sudo usermod -aG docker $USER`, then log out/in) or prefix commands with `sudo`.
- **Next.js version** — pinned to `14.2.35` in `frontend/package.json` (not
  `14.2.5`, which has a known security vulnerability).

---

## Environment variables reference

**`backend/.env`**

| Variable | Description |
|---|---|
| `PORT` | Port the Express server listens on (default `4000`) |
| `NODE_ENV` | `development` or `production` — affects the `secure` cookie flag |
| `SESSION_SECRET` | Long random string used to sign the session cookie |
| `FRONTEND_ORIGIN` | Exact origin of the frontend, for CORS + cookies |
| `ADMIN_PASSWORD_HASH` | bcrypt hash from `npm run hash` — **raw** for local dev, **`$$`-escaped** for Docker Compose |

**`frontend/.env`**

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL the **browser** uses to reach the backend API |
| `INTERNAL_API_URL` | Base URL the **Next.js server** uses to reach the backend when gating `/admin` — Docker Compose sets this automatically to `http://backend:4000`; not needed for local dev |

---

## What's been tested

- `backend`: `tsc --noEmit` and `tsc` build both pass clean.
- `backend`: full auth flow exercised over HTTP — health check, guest status,
  wrong password → `401`, correct password → session cookie set, status reflects
  `authenticated: true`, logout clears the session.
- `backend`: `GET /api/admin/status` confirmed protected — `401` without a
  session, real data (`process.uptime()`, server time, Node version, environment)
  once authenticated, `401` again after logout.
- `backend`: CORS preflight from `http://localhost:3000` confirmed to return
  `Access-Control-Allow-Credentials: true`.
- `frontend`: `tsc --noEmit` passes clean.
- `frontend`: `next build` succeeds and generates a real static route for every
  page — `/`, `/about`, `/projects`, `/contact`, `/terminal`, `/admin` — confirmed
  in the build output and by curling each route for a `200`.
- `frontend`: confirmed the actual `href` chain in the rendered HTML —
  Home's Enter Portfolio → `/about`, About's View My Projects → `/projects`,
  Projects' Get In Touch → `/contact`.
- `frontend`: verified the owl logo image is present (nav + hero badge), the
  favicon route responds `200`, and there's no leftover pink/cyan anywhere in the
  shipped CSS/markup.
- Found and fixed along the way: a responsive nav layout bug (missing
  `md:flex-row`), a raw-vs-`$$`-escaped bcrypt hash mix-up between local and
  Docker `.env` files, and a scroll-position bug from the old single-page
  tab-switching design — resolved by moving to real routes, which get Next.js's
  built-in scroll-to-top on navigation for free.
- `frontend`: verified the `/admin` server-side gate end-to-end — no cookie →
  `404`, log in via the backend → valid cookie → `/admin` → `200` and actually
  renders `SITE_STATUS`; a random unknown route also correctly `404`s with the
  themed not-found page.
- Not run in this environment: an actual browser/DOM click-through (no headless
  browser available here) and `docker compose up` itself (no Docker daemon here).
  Worth a quick manual pass on your machine after `npm install`.

## Notes

- All animations respect `prefers-reduced-motion`.
- Layout is responsive down to mobile, with a collapsible nav menu.
- The failed-attempt counter in `backend/src/routes/auth.ts` is in-memory and
  per-process — good enough for a single small deployment, but not a substitute for
  real rate limiting/IP throttling if this is ever exposed more broadly.
- To change the Owl-OS trigger phrase (currently `sudo owl`), edit the
  `AUTH_COMMAND` constant in `frontend/components/terminal/OwlTerminal.tsx`. The
  password itself is never hardcoded anywhere in the frontend — only its bcrypt hash
  lives on the backend.
- The Admin tab's mini shell (`frontend/components/admin/AdminSection.tsx`)
  intentionally mirrors the Owl-OS terminal's command set (`help`, `whoami`,
  `clear`, `sudo owl`) minus the top-level site tabs, since it's a separate,
  already-authenticated shell rather than a way to navigate the site.
- Color palette lives in `frontend/tailwind.config.ts` (`bg`, `panel`, `steel`,
  `purple`, `ink`) and is mirrored in raw hex in `frontend/app/globals.css` for the
  handful of effects that need plain CSS (scanlines, glitch, grid floor). To retheme,
  update both.
- To swap the owl artwork, replace `frontend/public/owl-logo.jpg` (nav + hero badge)
  and `frontend/app/icon.jpg` (favicon) with a new image of the same name.

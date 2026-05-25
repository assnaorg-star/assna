# ASSNA Website — Next.js + Supabase + Prisma

This is the official ASSNA website converted to a Next.js 14 App Router project,
with Supabase as the database and Prisma as the ORM.

Events added in Supabase automatically appear on the website.

---

## 🚀 Quick Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create your Supabase project

1. Go to https://supabase.com and create a new project
2. Wait for the database to be ready

### 3. Get your connection strings

In your Supabase dashboard:
- Go to **Settings → Database → Connection string**
- Copy the **URI** (Transaction mode, port 6543) → this is `DATABASE_URL`
- Copy the **URI** (Session mode, port 5432) → this is `DIRECT_URL`

### 4. Configure environment variables

Edit `.env.local` and fill in your actual values:

```
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

### 5. Push the database schema

```bash
npm run db:push
```

This creates the `events` table in your Supabase database.

### 6. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

---

## 📅 Managing Events via Supabase

Once the schema is pushed, you can manage events directly in Supabase:

1. Go to your Supabase dashboard → **Table Editor → events**
2. Click **Insert row** and fill in the fields:

| Field         | Description                                       | Example                        |
|---------------|---------------------------------------------------|--------------------------------|
| `date`        | Date/time of the event                            | `2026-09-15 14:00:00`          |
| `speaker`     | Speaker's full name                               | `Dr. John Smith`               |
| `affiliation` | Institution/affiliation                           | `Harvard University`           |
| `talkTitle`   | Title of the talk                                 | `Bayesian Methods in Practice` |
| `type`        | Type of event                                     | `Seminar` / `Workshop`         |
| `recordingUrl`| Optional link to recording or registration       | `https://youtube.com/...`      |
| `isUpcoming`  | `true` = shown as upcoming card, `false` = past table | `true`                    |

**Changes appear on the website within 60 seconds** (ISR revalidation).

---

## 🗃️ Database Schema

```prisma
model Event {
  id           String   @id @default(cuid())
  date         DateTime
  speaker      String
  affiliation  String
  talkTitle    String
  type         String
  recordingUrl String?
  isUpcoming   Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import into Vercel
3. Add `DATABASE_URL` and `DIRECT_URL` as environment variables in Vercel dashboard
4. Deploy

The site uses **Incremental Static Regeneration (ISR)** — pages rebuild in the background
every 60 seconds, so new events added in Supabase appear quickly without a redeploy.

---

## 🛠️ Useful Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run db:push      # Sync Prisma schema → Supabase
npm run db:generate  # Regenerate Prisma client
npm run db:studio    # Open Prisma Studio (visual DB editor)
```

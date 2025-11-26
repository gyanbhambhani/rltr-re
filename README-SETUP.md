# RLTR Setup Guide

## Database Setup

You have two options for setting up the database:

### Option 1: Local Development with Supabase CLI (Recommended)

The Supabase CLI uses Docker to run a local Supabase instance.

**Prerequisites:**
- Docker Desktop installed and running (see Docker Setup section below)
- Supabase CLI installed (script will auto-install via Homebrew on macOS)

**Quick Setup (Automated):**
```bash
# Make sure Docker Desktop is running first!
./scripts/setup-db.sh
```

**Manual Setup:**

1. **Install Supabase CLI:**
   
   **macOS (Homebrew):**
   ```bash
   brew install supabase/tap/supabase
   ```
   
   **Other platforms:**
   - Visit https://github.com/supabase/cli#install-the-cli
   - Or use: `npm install -g supabase` (if supported on your platform)

2. **Start local Supabase (uses Docker):**
   ```bash
   npm run supabase:start
   # or: supabase start
   ```
   
   This will:
   - Start Docker containers for Postgres, Auth, Storage, etc.
   - Create a local Supabase instance
   - Run all migrations automatically

3. **Get your local credentials:**
   ```bash
   npm run supabase:status
   # or: supabase status
   ```
   
   Copy the `API URL` and `anon key` to your `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
   ```

### Option 2: Use Remote Supabase Project

If you're using a remote Supabase project (supabase.com):

1. **Go to your Supabase Dashboard:**
   - Navigate to https://supabase.com/dashboard
   - Select your project
   - Go to SQL Editor

2. **Run the migration:**
   - Copy the contents of `supabase/migrations/001_initial_schema.sql`
   - Paste into SQL Editor
   - Click "Run"

3. **Or use Supabase CLI to link and push:**
   ```bash
   # Install Supabase CLI if not already installed
   # macOS: brew install supabase/tap/supabase
   # See: https://github.com/supabase/cli#install-the-cli
   
   # Link to your remote project
   supabase link --project-ref <your-project-ref>
   
   # Push migrations
   supabase db push
   ```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Running the App

```bash
# 1. Install dependencies
npm install

# 2. Set up database (choose one):
#    Option A: Local with Docker
npm run supabase:start
#    Option B: Use remote Supabase (run SQL migration in dashboard)

# 3. Create .env.local with your Supabase credentials
#    (Get them from `npm run supabase:status` if using local)

# 4. Start the dev server
npm run dev
```

## Available Scripts

- `npm run dev` - Start Next.js dev server
- `npm run supabase:start` - Start local Supabase (Docker)
- `npm run supabase:stop` - Stop local Supabase
- `npm run supabase:status` - Show Supabase connection info
- `npm run supabase:reset` - Reset local database
- `npm run db:migrate` - Run pending migrations
- `npm run db:reset` - Reset database and re-run migrations

## Docker Setup

**Docker is required for local Supabase development.**

### Installing Docker Desktop

If you don't have Docker installed:

1. **macOS:**
   - Download from https://www.docker.com/products/docker-desktop/
   - Or install via Homebrew: `brew install --cask docker`
   - Open Docker Desktop and complete the setup

2. **Verify Docker is running:**
   ```bash
   docker --version
   docker ps
   ```
   
   If these commands work, Docker is ready!

### Starting Docker Desktop

- **macOS:** Open Docker Desktop from Applications
- Make sure the Docker icon in your menu bar shows it's running
- Wait for it to fully start (whale icon should be steady, not animating)

## Troubleshooting

### "Could not find the table" error

This means migrations haven't been run. Make sure you've:
1. Started Supabase locally (`supabase start`) OR
2. Run the SQL migration in your Supabase dashboard

### Docker not running

**Symptoms:**
- `docker: Cannot connect to the Docker daemon`
- `Error response from daemon`

**Solution:**
1. Open Docker Desktop application
2. Wait for it to fully start (check menu bar icon)
3. Try `docker ps` to verify it's working
4. Then run `supabase start` again

### Docker Desktop not installed

If you get "command not found: docker":
1. Install Docker Desktop (see Docker Setup section above)
2. Open Docker Desktop
3. Try again

### Reset local database

```bash
supabase db reset
```


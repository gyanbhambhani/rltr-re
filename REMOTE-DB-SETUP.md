# Remote Database Setup - Files You Don't Need

When using a **remote Supabase database** (instead of local), you can remove or ignore these files:

## Files You Can Delete (Local-Only)

### 1. Supabase Local Config
- `supabase/config.toml` - Only needed for local Supabase setup

### 2. Setup Scripts (Optional)
- `scripts/setup-db.sh` - Only for local Docker setup
- `scripts/apply-remote-migration.md` - Just documentation, can delete if you've already applied migration

## Files You Should KEEP

### ✅ Keep These (Still Useful)
- `supabase/migrations/001_initial_schema.sql` - **KEEP!** You'll need this to apply migrations to remote
- All app code in `src/` - Obviously needed
- `package.json` - Needed for dependencies

### ✅ Optional (Can Keep for Future Use)
- NPM scripts in `package.json` (supabase:start, etc.) - Won't hurt to keep, just won't use them
- Supabase CLI - Can keep installed, useful for `supabase db push` to remote

## What You Still Need

1. **Migrations folder** - Keep `supabase/migrations/` because:
   - You can apply them to remote via CLI: `supabase db push`
   - Or copy/paste into Supabase Dashboard SQL Editor
   - Useful for version control of your schema

2. **Environment variables** - Your `.env.local` with remote credentials (already set up)

## Summary

**Minimal cleanup:**
```bash
# Optional: Remove local-only config
rm supabase/config.toml

# Optional: Remove setup script (if you don't need it)
rm scripts/setup-db.sh
```

**Everything else stays** - migrations are still useful for remote database management!


# Apply Migration to Remote Supabase

To apply the database migration to your remote Supabase project:

## Option 1: Via Supabase Dashboard (Easiest)

1. Go to https://supabase.com/dashboard
2. Select your project (mntubsmugflmygolyklh)
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
6. Paste it into the SQL Editor
7. Click **Run** (or press Cmd+Enter)

## Option 2: Via Supabase CLI

If you want to link your local project to remote and push migrations:

```bash
# Link to your remote project
supabase link --project-ref mntubsmugflmygolyklh

# Push migrations
supabase db push
```

## Verify Tables Were Created

After running the migration, you can verify in the Supabase Dashboard:
- Go to **Table Editor**
- You should see: contacts, properties, transactions, transaction_tasks, transaction_documents, integration_connections


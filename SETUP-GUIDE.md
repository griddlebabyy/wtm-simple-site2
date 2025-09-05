# Quick Setup Guide

## Step 1: Set up your .env file
Create a `.env` file in the root directory with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Step 2: Set up the database
1. Go to your Supabase dashboard
2. Open the SQL Editor
3. Copy and paste the contents of `database-setup.sql`
4. Run the SQL script

## Step 3: Run the migration
**Option A: Use the batch file (Windows)**
```bash
run-migration.bat
```

**Option B: Manual steps**
```bash
# Copy the migration package.json
copy migrate-package.json package.json

# Install dependencies
npm install

# Run migration
node migrate-data.js

# Restore original package.json
git checkout package.json
```

## Step 4: Install React dependencies and run
```bash
npm install
npm run dev
```

## What the migration does:
- Creates one row per bar in the `bar_info` table
- Creates one row per bar in the `deals` table
- Each day's deals are stored in separate columns (monday, tuesday, etc.)
- Uses PostgreSQL arrays to store lists of deals for each day

The migration script reads your `bars.json` and `deals.json` files and populates the Supabase database with the correct structure.

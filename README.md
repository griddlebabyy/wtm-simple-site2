# WTM Bars - Where to Meet

A clean, modern website for listing bars in Tuscaloosa by location (Strip, Downtown, Niche) with daily deals information.

## Features

- **Location-based organization**: Bars grouped by Strip, Downtown, and Niche areas
- **Daily deals preview**: Shows today's deals on the home page
- **Detailed bar pages**: Full information including weekly deals, address, and social media
- **Responsive design**: Works on desktop and mobile devices
- **Crimson theme**: University of Alabama inspired color scheme

## Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Backend**: Supabase
- **Styling**: CSS with custom properties
- **Deployment**: Vercel + GitHub

## Setup Instructions

### 1. Environment Setup

1. Copy your Supabase credentials to a `.env` file:
```bash
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Database Setup

1. Run the SQL script in your Supabase SQL editor:
   - Copy the contents of `database-setup.sql`
   - Paste and run in Supabase Dashboard > SQL Editor

### 3. Data Migration

1. Install migration dependencies:
```bash
cp migrate-package.json package.json
npm install
```

2. Run the migration script:
```bash
npm run migrate
```

This will populate your database with the bar and deals data from the JSON files.

### 4. Install Project Dependencies

```bash
# Restore the main package.json
git checkout package.json
npm install
```

### 5. Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── HomePage.jsx          # Main page with location sections
│   ├── BarCard.jsx           # Individual bar preview card
│   └── BarDetail.jsx         # Detailed bar page
├── lib/
│   └── supabase.js           # Supabase client configuration
├── App.jsx                   # Main app with routing
├── App.css                   # Main styles
├── index.css                 # Global styles and CSS variables
└── main.jsx                  # React entry point
```

## Database Schema

### bar_info table
- `id` (SERIAL PRIMARY KEY)
- `full_name` (TEXT) - Display name of the bar
- `slug` (TEXT UNIQUE) - URL-friendly identifier
- `location` (TEXT) - Strip, Downtown, or Niche
- `address` (TEXT) - Physical address (optional)
- `instagram` (TEXT) - Instagram handle (optional)
- `img_url` (TEXT) - Logo/image URL (optional)
- `created_at`, `updated_at` (TIMESTAMP)

### deals table
- `id` (SERIAL PRIMARY KEY)
- `full_name` (TEXT) - Bar name
- `slug` (TEXT UNIQUE) - Matches bar_info.slug
- `monday` through `sunday` (TEXT[]) - Arrays of deals for each day
- `everyday` (TEXT[]) - Deals that apply every day
- `created_at`, `updated_at` (TIMESTAMP)

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

The app will automatically deploy on every push to your main branch.

## Customization

### Adding New Bars

1. Add to `bars.json` in the appropriate location section
2. Add corresponding deals to `deals.json`
3. Run the migration script to update the database

### Styling

The app uses CSS custom properties defined in `src/index.css`. Main colors:
- `--crimson`: #990000 (primary red)
- `--crimson-dark`: #7a0000 (darker red)
- `--crimson-light`: #cc0000 (lighter red)
- `--crimson-ultra-light`: #fff5f5 (very light red background)

## Support

For issues or questions, please check the Supabase documentation or create an issue in the repository.

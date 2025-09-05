# 🚀 Complete Vercel Deployment Guide

## Prerequisites ✅
- [x] GitHub account
- [x] Vercel account connected to GitHub
- [x] Domain name ready to connect
- [x] Supabase project set up

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - WTM Bars app ready for deployment"
```

### 1.2 Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it: `wtm-bars` (or your preferred name)
4. Make it **Public** (required for free Vercel)
5. Don't initialize with README (you already have files)
6. Click "Create repository"

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/wtm-bars.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### 2.1 Import Project
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Find your `wtm-bars` repository
4. Click "Import"

### 2.2 Configure Build Settings
Vercel should auto-detect these settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2.3 Set Environment Variables
In the Vercel dashboard, go to your project → Settings → Environment Variables:

Add these variables:
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Important**: Make sure to add these for all environments (Production, Preview, Development)

### 2.4 Deploy
1. Click "Deploy"
2. Wait for build to complete (usually 2-3 minutes)
3. You'll get a Vercel URL like: `https://wtm-bars-abc123.vercel.app`

## Step 3: Connect Your Domain

### 3.1 Add Domain in Vercel
1. Go to your project dashboard
2. Click "Domains" tab
3. Click "Add Domain"
4. Enter your domain: `yourdomain.com`
5. Click "Add"

### 3.2 Configure DNS
Vercel will give you DNS records to add. You'll need to add these to your domain registrar:

**For Root Domain (yourdomain.com):**
- Type: A
- Name: @
- Value: 76.76.19.61

**For www subdomain (www.yourdomain.com):**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

### 3.3 Verify Domain
1. Wait 5-10 minutes for DNS propagation
2. Check "Domains" tab in Vercel
3. Status should show "Valid Configuration"

## Step 4: Test Your Deployment

### 4.1 Test All Pages
- [ ] Homepage loads correctly
- [ ] Navigation works (desktop and mobile)
- [ ] Bar detail pages load
- [ ] About page loads
- [ ] All Supabase data loads

### 4.2 Test Mobile Responsiveness
- [ ] Mobile navigation works
- [ ] Bar grid displays correctly on mobile
- [ ] All buttons are clickable

## Step 5: Final Configuration

### 5.1 Update Supabase Settings
1. Go to your Supabase dashboard
2. Go to Settings → API
3. Add your domain to "Site URL": `https://yourdomain.com`
4. Add to "Additional Redirect URLs": `https://yourdomain.com`

### 5.2 Enable HTTPS
Vercel automatically provides HTTPS certificates, so your site will be secure.

## Troubleshooting

### Common Issues:

**Build Fails:**
- Check that all dependencies are in `package.json`
- Ensure all imports are correct
- Check for any TypeScript errors

**Environment Variables Not Working:**
- Make sure variables start with `VITE_`
- Redeploy after adding variables
- Check variable names match exactly

**Domain Not Working:**
- Wait longer for DNS propagation (up to 24 hours)
- Check DNS records are correct
- Try accessing via Vercel URL first

**Supabase Connection Issues:**
- Verify environment variables are set
- Check Supabase project is active
- Ensure RLS policies allow public access

## Next Steps After Deployment

1. **Monitor Performance**: Check Vercel analytics
2. **Set up Custom Domain**: Follow Step 3
3. **Add Analytics**: Consider Google Analytics
4. **Backup**: Keep your code in GitHub
5. **Updates**: Push changes to GitHub for auto-deployment

## Support

If you run into issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Test locally with `npm run build && npm run preview`

Your app should now be live at your custom domain! 🎉

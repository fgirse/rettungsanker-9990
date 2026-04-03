# Deployment Guide - Vercel + Custom Domain

## Prerequisites
- GitHub account with your repository pushed
- Vercel account (sign up at https://vercel.com)
- Access to your domain DNS settings at your registrar

## Step 1: Deploy to Vercel

### Option A: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
bun add -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from your project directory:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No
   - Project name? rettungsanker (or your preferred name)
   - In which directory is your code? ./
   - Override settings? No

5. For production deployment:
```bash
vercel --prod
```

### Option B: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `bun run build`
   - Install Command: `bun install`
4. Click "Deploy"

## Step 2: Configure Environment Variables

In your Vercel project dashboard:

1. Go to Settings → Environment Variables
2. Add these variables (update with production values):

```
BETTER_AUTH_SECRET=<your-production-secret>
BETTER_AUTH_URL=https://rettungsanker-freiburg.de
DATABASE_URL=<your-mongodb-connection-string>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_REDIRECT_URI=https://rettungsanker-freiburg.de/api/auth/google/callback
PAYLOAD_SECRET=<your-payload-secret>
NEXT_PUBLIC_SERVER_URL=https://rettungsanker-freiburg.de
CRON_SECRET=<your-cron-secret>
PREVIEW_SECRET=<your-preview-secret>
NEXT_PUBLIC_BETTER_AUTH_URL=https://rettungsanker-freiburg.de
RESEND_API_KEY=<your-resend-api-key>
TRUSTED_ORIGINS=https://rettungsanker-freiburg.de,https://www.rettungsanker-freiburg.de
RESEND_FROM_EMAIL=noreply@rettungsanker-freiburg.de
SHADCNBLOCKS_API_KEY=<your-shadcn-blocks-api-key>
```

3. Redeploy after adding environment variables

## Step 3: Connect Custom Domain

### In Vercel Dashboard:

1. Go to your project → Settings → Domains
2. Add domain: `rettungsanker-freiburg.de`
3. Also add: `www.rettungsanker-freiburg.de` (optional)
4. Vercel will show you the DNS records to configure

### In Your Domain Registrar DNS Settings:

Add these DNS records:

**For root domain (rettungsanker-freiburg.de):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Alternative (if A record doesn't work):**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### DNS Propagation
- DNS changes can take 24-48 hours to propagate globally
- Usually happens within 1-4 hours
- Check status: https://www.whatsmydns.net/

## Step 4: Update Google OAuth

In Google Cloud Console:

1. Go to APIs & Services → Credentials
2. Edit your OAuth 2.0 Client ID
3. Add authorized redirect URIs:
   - `https://rettungsanker-freiburg.de/api/auth/google/callback`
   - `https://www.rettungsanker-freiburg.de/api/auth/google/callback`
4. Add authorized JavaScript origins:
   - `https://rettungsanker-freiburg.de`
   - `https://www.rettungsanker-freiburg.de`

## Step 5: Configure Resend Email

If using Resend for transactional emails:

1. Go to https://resend.com/domains
2. Add and verify your domain `rettungsanker-freiburg.de`
3. Add the required DNS records (SPF, DKIM, DMARC)
4. Wait for verification

## Step 6: Test Deployment

1. Visit https://rettungsanker-freiburg.de
2. Test key functionality:
   - Homepage loads
   - Authentication works
   - Admin panel accessible at `/admin`
   - Media uploads work
   - Email notifications work

## Troubleshooting

### Build fails:
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

### Domain not connecting:
- Verify DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Try using A record instead of CNAME or vice versa

### Authentication issues:
- Check BETTER_AUTH_URL points to production domain
- Verify Google OAuth redirect URIs include production URLs
- Ensure TRUSTED_ORIGINS includes your domain

### Database connection issues:
- Whitelist Vercel IP addresses in MongoDB Atlas
- Or use `0.0.0.0/0` for all IPs (less secure)
- Check connection string is correct

## Monitoring

- View logs: Vercel Dashboard → Your Project → Logs
- Analytics: Vercel Dashboard → Your Project → Analytics
- Errors: Use Sentry or similar service for production error tracking

## Rollback

If issues occur:
```bash
vercel rollback
```

Or in dashboard: Deployments → Select previous deployment → Promote to Production

# North Hand Institute — Deployment Guide

## Step 1: Run the Database Setup
1. Go to supabase.com → your project → SQL Editor
2. Paste the entire contents of `supabase-setup.sql` and click Run

## Step 2: Deploy to Vercel
1. Go to github.com and create a new repository called `north-hand-institute`
2. Push this project to that repo
3. Go to vercel.com → New Project → import your GitHub repo
4. Add these Environment Variables in Vercel:
   - NEXT_PUBLIC_SUPABASE_URL = https://gfzganxksrnosvsuhctp.supabase.co
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = (your anon key)
   - ADMIN_PASSWORD = NorthHand2025!
5. Click Deploy

## Step 3: Connect your domain
1. In Vercel → your project → Settings → Domains
2. Add: northhandinstitute.org
3. Follow Vercel's instructions to update your DNS

## Admin Panel
Visit: https://northhandinstitute.org/admin
Password: NorthHand2025! (change this in .env.local before deploying!)

## What you can edit in the admin:
- Upcoming Events (add/edit/delete with location, date, price, spots)
- Courses (add/edit/delete)
- Bio text, hero tagline, pull quote

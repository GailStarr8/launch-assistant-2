# Launch Assistant - 7-Week AI-Powered Launch Program

A complete launch planning dashboard for students to manage their launch timelines with week-by-week task tracking.

## Features

- 3 Complete Launch Types: Webinar, Challenge, Video Series
- 9-week structured program with goals and tasks
- Week-by-week progress tracking
- Current Week Focus vs Full Timeline views
- Catch-up list for overdue tasks
- Automatic date calculations
- Export functionality
- Browser-based storage (no login required)

## Deployment Instructions

### Option 1: Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   - Go to https://github.com/new
   - Create a new repository called "launch-assistant"
   - Don't initialize with README (we have files already)
   - Follow the instructions to push existing code

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "Add New" → "Project"
   - Import your "launch-assistant" repository
   - Framework Preset: **Vite**
   - Click "Deploy"

3. **Done!** Your app will be live at a URL like: `https://launch-assistant-xxx.vercel.app`

### Updating Your Live App

Once connected to Vercel, every time you push changes to GitHub, Vercel automatically deploys the update within 60 seconds!

**To update:**
1. Edit files on GitHub (click the pencil icon)
2. Commit changes
3. Wait 60 seconds
4. Refresh your live URL - changes are live!

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173 to view in browser.

## Built With

- React 18.2.0
- Vite 4.4.5
- Tailwind CSS 3.3.3
- Lucide React (icons)

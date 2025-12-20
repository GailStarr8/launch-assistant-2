# Launch Assistant

Your personalized launch roadmap with progress tracking and daily motivation.

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Click "Import Git Repository" OR use the Import button
4. Upload this entire folder (you can drag & drop or use the file picker)
5. Vercel will auto-detect the settings
6. Click "Deploy"
7. Done! You'll get your live URL in about 30 seconds

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and your app will be live!

## Local Development

If you want to run this locally first:

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Features

- ✅ Personalized launch roadmaps based on launch type and date
- ✅ Week-by-week task breakdown
- ✅ Progress tracking with checkboxes
- ✅ Phase progress visualization
- ✅ Daily motivational messages
- ✅ Automatic progress saving
- ✅ Export functionality
- ✅ Mobile responsive

## Customization

To customize the launch frameworks, edit the task lists in `src/App.jsx` in the `generateSamplePlan` function.

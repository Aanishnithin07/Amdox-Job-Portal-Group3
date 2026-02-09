# Quick Backend Deployment to Vercel

## Prerequisites
- MongoDB Atlas account with cluster created
- Vercel account

## Steps

### 1. Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy Backend
```bash
cd server
vercel
```

Follow prompts:
- Project name: `job-portal-backend`
- Directory: `./`
- Override settings: No

### 4. Set Environment Variables
```bash
# MongoDB URI (from MongoDB Atlas)
vercel env add MONGO_URI production
# Enter: mongodb+srv://username:password@cluster.mongodb.net/JobPortalDB

# JWT Secret (generate secure random string)
vercel env add JWT_SECRET production
# Enter: (run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Port
vercel env add PORT production
# Enter: 5001

# Node Environment
vercel env add NODE_ENV production
# Enter: production
```

### 5. Deploy to Production
```bash
vercel --prod
```

### 6. Copy Backend URL
Save the URL, it looks like: `https://job-portal-backend-xxxxx.vercel.app`

### 7. Update Frontend
In `client/.env.production`:
```
VITE_API_URL=https://job-portal-backend-xxxxx.vercel.app/api
```

### 8. Update Backend CORS
```bash
vercel env add FRONTEND_URL production
# Enter your frontend URL when deployed
```

Redeploy:
```bash
vercel --prod
```

## Test Deployment
```bash
curl https://your-backend-url.vercel.app
# Should return: {"message":"🚀 Job Listing Portal API is running!"}
```

## View Logs
```bash
vercel logs --prod
```

## Done! ✅
Your backend is now deployed and accessible worldwide!

# 🚀 Deployment Guide - Amdox Job Portal

This guide will help you deploy your Job Portal application to production using Vercel.

---

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas Account**: Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
3. **Vercel CLI**: Install globally
   ```bash
   npm install -g vercel
   ```

---

## 🗄️ Step 1: Setup MongoDB Atlas (Production Database)

1. **Create a Cluster**
   - Go to MongoDB Atlas Dashboard
   - Click "Build a Database"
   - Choose "M0 Free" tier
   - Select a region close to your users
   - Click "Create Cluster"

2. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `jobportal_admin`
   - Generate a secure password (save it!)
   - Set privilege to "Read and write to any database"
   - Click "Add User"

3. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

4. **Get Connection String**
   - Go to "Database" → "Connect"
   - Click "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `JobPortalDB`
   - Example: `mongodb+srv://jobportal_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/JobPortalDB?retryWrites=true&w=majority`

---

## 🔧 Step 2: Deploy Backend to Vercel

### 2.1 Login to Vercel CLI
```bash
cd server
vercel login
```

### 2.2 Deploy Backend
```bash
# First deployment (will ask configuration questions)
vercel

# Answer the questions:
# ? Set up and deploy "~/path/to/server"? [Y/n] Y
# ? Which scope do you want to deploy to? Your Account
# ? Link to existing project? [y/N] n
# ? What's your project's name? job-portal-backend
# ? In which directory is your code located? ./
# ? Want to override the settings? [y/N] n
```

### 2.3 Set Environment Variables
```bash
# Set MongoDB URI
vercel env add MONGO_URI production
# Paste your MongoDB Atlas connection string when prompted

# Set JWT Secret
vercel env add JWT_SECRET production
# Paste a secure random string (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Set PORT
vercel env add PORT production
# Enter: 5001

# Set NODE_ENV
vercel env add NODE_ENV production
# Enter: production
```

### 2.4 Deploy to Production
```bash
vercel --prod
```

**Save your backend URL!** It will look like: `https://job-portal-backend-xxxxx.vercel.app`

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Update Frontend API URL
```bash
cd ../client
```

Create `.env.production` file:
```bash
echo "VITE_API_URL=https://job-portal-backend-xxxxx.vercel.app/api" > .env.production
```
*(Replace with your actual backend URL from Step 2.4)*

### 3.2 Deploy Frontend
```bash
vercel login  # If not already logged in

# First deployment
vercel

# Answer the questions:
# ? Set up and deploy "~/path/to/client"? [Y/n] Y
# ? Which scope do you want to deploy to? Your Account
# ? Link to existing project? [y/N] n
# ? What's your project's name? job-portal-frontend
# ? In which directory is your code located? ./
# ? Want to override the settings? [y/N] n
```

### 3.3 Deploy to Production
```bash
vercel --prod
```

**Your frontend is now live!** URL: `https://job-portal-frontend-xxxxx.vercel.app`

---

## 🔐 Step 4: Update Backend CORS (IMPORTANT!)

Update your backend environment variable to allow frontend access:

```bash
cd ../server
vercel env add FRONTEND_URL production
# Enter your frontend URL: https://job-portal-frontend-xxxxx.vercel.app
```

Then update `server.js` to use dynamic CORS:

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

Redeploy backend:
```bash
vercel --prod
```

---

## ✅ Step 5: Verification

1. **Test Backend API**
   ```bash
   curl https://your-backend-url.vercel.app
   # Should return: {"message":"🚀 Job Listing Portal API is running!"}
   ```

2. **Test Frontend**
   - Visit your frontend URL
   - Try registering a new user
   - Try logging in
   - Check if profile page works

3. **Check Logs** (if errors occur)
   ```bash
   # Backend logs
   cd server
   vercel logs --prod

   # Frontend logs
   cd ../client
   vercel logs --prod
   ```

---

## 🔄 Step 6: Future Updates

### Update Backend
```bash
cd server
git add .
git commit -m "Update backend"
vercel --prod
```

### Update Frontend
```bash
cd client
git add .
git commit -m "Update frontend"
vercel --prod
```

---

## 🌐 Custom Domain (Optional)

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Settings" → "Domains"
4. Click "Add"
5. Enter your domain (e.g., `jobportal.com`)
6. Follow DNS configuration instructions

---

## 📊 Environment Variables Summary

### Backend (server/.env)
```
NODE_ENV=production
PORT=5001
MONGO_URI=mongodb+srv://jobportal_admin:PASSWORD@cluster.mongodb.net/JobPortalDB
JWT_SECRET=your-256-bit-random-string
FRONTEND_URL=https://job-portal-frontend.vercel.app
```

### Frontend (client/.env.production)
```
VITE_API_URL=https://job-portal-backend.vercel.app/api
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** API returns 500 errors
- **Solution:** Check MongoDB connection string is correct
- **Check:** `vercel logs --prod` in server directory

**Problem:** CORS errors in browser
- **Solution:** Make sure `FRONTEND_URL` is set correctly
- **Check:** Backend should have CORS configured for your frontend domain

### Frontend Issues

**Problem:** API requests fail
- **Solution:** Check if `VITE_API_URL` is set correctly in .env.production
- **Verify:** Backend URL is accessible

**Problem:** Build fails
- **Solution:** Run `npm run build` locally to check for errors
- **Fix:** Resolve any TypeScript/ESLint errors before deploying

---

## 📝 Quick Deployment Commands

```bash
# Backend deployment
cd server
vercel --prod

# Frontend deployment
cd client
vercel --prod

# View logs
vercel logs --prod

# List deployments
vercel list

# Remove deployment
vercel remove [deployment-url]
```

---

## 🎉 Success!

Your Job Portal is now live and accessible worldwide! 

**Backend:** `https://job-portal-backend-xxxxx.vercel.app`
**Frontend:** `https://job-portal-frontend-xxxxx.vercel.app`

Share your application and start helping people find jobs! 🚀

---

## 📞 Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas Docs:** [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com/)
- **Issues:** Create an issue in your GitHub repository

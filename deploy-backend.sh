#!/bin/bash

# 🚀 Amdox Job Portal - Backend Deployment Script
# This script helps you deploy your backend to Vercel

echo "🎯 Amdox Job Portal - Backend Deployment"
echo "=========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found!"
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    echo "✅ Vercel CLI installed!"
    echo ""
fi

# Check if user is logged in to Vercel
echo "🔐 Please login to Vercel..."
vercel login

echo ""
echo "📋 IMPORTANT: You will need these values"
echo "=========================================="
echo ""
echo "1️⃣  MongoDB Atlas Connection String"
echo "   Format: mongodb+srv://username:password@cluster.mongodb.net/JobPortalDB"
echo "   Get it from: https://cloud.mongodb.com/"
echo ""
echo "2️⃣  JWT Secret (Generated for you):"
echo "   $(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")"
echo ""
echo "3️⃣  Port: 5001"
echo ""
echo "4️⃣  Node Environment: production"
echo ""
echo "Press ENTER to continue..."
read

# Navigate to server directory
cd server || { echo "❌ Server directory not found!"; exit 1; }

echo ""
echo "🚀 Starting deployment..."
echo ""

# First deployment
echo "📦 Deploying to Vercel (you'll answer some questions)..."
vercel

echo ""
echo "✅ Initial deployment complete!"
echo ""
echo "Now, let's set environment variables..."
echo ""

# Set environment variables
echo "📝 Setting MongoDB URI..."
vercel env add MONGO_URI production

echo ""
echo "📝 Setting JWT Secret..."
vercel env add JWT_SECRET production

echo ""
echo "📝 Setting Port..."
vercel env add PORT production

echo ""
echo "📝 Setting Node Environment..."
vercel env add NODE_ENV production

echo ""
echo "🎉 Environment variables set!"
echo ""

# Deploy to production
echo "🚀 Deploying to production with environment variables..."
vercel --prod

echo ""
echo "✅ BACKEND DEPLOYMENT COMPLETE! ✅"
echo "===================================="
echo ""
echo "📝 Next Steps:"
echo "1. Save your backend URL (shown above)"
echo "2. Update client/.env.production with:"
echo "   VITE_API_URL=https://your-backend-url.vercel.app/api"
echo "3. Deploy frontend with: cd ../client && vercel --prod"
echo ""
echo "🎊 Your backend is now live and accessible worldwide!"

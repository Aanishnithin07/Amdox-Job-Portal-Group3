#!/bin/bash

# Job Listing Portal - Project Structure Setup Script
# MERN Stack Architecture for Team of 6 Developers

echo "🚀 Creating Job Listing Portal project structure..."

# Create Server directories
echo "📁 Setting up Server (Backend)..."
mkdir -p server/config
mkdir -p server/controllers
mkdir -p server/models
mkdir -p server/routes
mkdir -p server/middleware

# Create Server files
touch server/config/db.js
touch server/controllers/authController.js
touch server/controllers/profileController.js
touch server/controllers/jobController.js
touch server/models/User.js
touch server/models/Job.js
touch server/models/Application.js
touch server/routes/authRoutes.js
touch server/routes/profileRoutes.js
touch server/routes/jobRoutes.js
touch server/middleware/authMiddleware.js
touch server/server.js
touch server/.env

# Create Client directories
echo "📁 Setting up Client (Frontend)..."
mkdir -p client/src/pages
mkdir -p client/src/components
mkdir -p client/src/context
mkdir -p client/src/services

# Create Client page files
touch client/src/pages/Home.jsx
touch client/src/pages/Login.jsx
touch client/src/pages/Register.jsx
touch client/src/pages/Dashboard.jsx
touch client/src/pages/JobDetails.jsx

# Create Client component files
touch client/src/components/Navbar.jsx
touch client/src/components/Footer.jsx
touch client/src/components/JobCard.jsx

# Create Client context files
touch client/src/context/AuthContext.jsx

# Create Client service files
touch client/src/services/api.js

echo "✅ Project structure created successfully!"
echo ""
echo "📂 Structure Overview:"
echo "├── server/"
echo "│   ├── config/"
echo "│   ├── controllers/"
echo "│   ├── models/"
echo "│   ├── routes/"
echo "│   ├── middleware/"
echo "│   ├── server.js"
echo "│   └── .env"
echo "└── client/"
echo "    └── src/"
echo "        ├── pages/"
echo "        ├── components/"
echo "        ├── context/"
echo "        └── services/"
echo ""
echo "🎯 Next Steps:"
echo "1. cd server && npm init -y"
echo "2. cd ../client && npm create vite@latest . -- --template react"
echo "3. Start developing! 🚀"

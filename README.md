# Amdox Job Listing Portal - Group 3

A modern, scalable **MERN Stack** application designed to connect job seekers with employers through an intuitive platform for posting, browsing, and applying to job listings.

---

## 🎯 Project Overview

The **Amdox Job Listing Portal** is a full-stack web application that serves two primary user groups:
- **Job Seekers**: Browse available positions, create profiles, and submit applications
- **Employers**: Post job openings, manage listings, and review applicant profiles

Built with industry-standard technologies, this project emphasizes modularity, scalability, and team collaboration.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB + Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) |
| **Styling** | CSS3 / TailwindCSS (optional) |
| **Dev Tools** | Nodemon, ESLint, Git |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ installed
- MongoDB running locally or MongoDB Atlas account
- Git installed

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aanishnithin07/Amdox-Job-Portal-Group3.git
   cd Amdox-Job-Portal-Group3
   ```

2. **Setup Backend (Server)**
   ```bash
   cd server
   npm install
   ```
   - Update the `.env` file with your MongoDB connection string
   - Start the development server:
     ```bash
     npm run dev
     ```
   - Server will run on `http://localhost:5000`

3. **Setup Frontend (Client)**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
   - Client will run on `http://localhost:5173` (Vite default)

---

## 📁 Folder Structure

```
Amdox-Job-Portal-Group3/
│
├── server/                    # Backend (Node.js + Express)
│   ├── config/               # Database configuration files
│   │   └── db.js            # MongoDB connection logic
│   ├── controllers/          # Business logic handlers
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   └── jobController.js
│   ├── models/               # Database Schemas (Mongoose Models)
│   │   ├── User.js          # User schema (job seekers & employers)
│   │   ├── Job.js           # Job posting schema
│   │   └── Application.js   # Job application schema
│   ├── routes/               # API route definitions
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   └── jobRoutes.js
│   ├── middleware/           # Custom middleware (auth, validation)
│   │   └── authMiddleware.js
│   ├── server.js            # Express app entry point
│   └── .env                 # Environment variables (DO NOT COMMIT!)
│
└── client/                   # Frontend (React + Vite)
    └── src/
        ├── pages/            # Frontend views (page components)
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   └── JobDetails.jsx
        ├── components/       # Reusable UI components
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   └── JobCard.jsx
        ├── context/          # React Context API (state management)
        │   └── AuthContext.jsx
        └── services/         # API service layer
            └── api.js        # Axios/Fetch configuration
```

### Key Directory Explanations:
- **`server/models/`**: Contains Mongoose schemas that define the structure of your MongoDB collections
- **`server/controllers/`**: Houses the business logic that processes requests and interacts with models
- **`client/src/pages/`**: React components representing full-page views in the application
- **`client/src/components/`**: Reusable UI elements that can be used across multiple pages

---

## 👥 Contribution Rules

To maintain code quality and minimize merge conflicts, all team members **must** follow these guidelines:

### 🔴 Critical Rules:
1. **Always pull the latest changes before starting work**
   ```bash
   git pull origin main
   ```

2. **Work on your specific feature branch** (never directly on `main`)
   ```bash
   git checkout -b feature/your-module-name
   # Example: feature/auth, feature/job-listing, feature/profile-page
   ```

3. **Do NOT touch files outside your assigned module**
   - If you're assigned to authentication, only modify files in `authController.js`, `authRoutes.js`, and related auth components
   - This prevents merge conflicts and maintains clear ownership

### 📋 Best Practices:
- Write clear commit messages: `git commit -m "feat: add user registration endpoint"`
- Test your code locally before pushing
- Create Pull Requests (PRs) for code review before merging to `main`
- Keep your `.env` file private (never commit it!)
- Document your API endpoints and component props

### 🌿 Branch Naming Convention:
- `feature/module-name` → New features
- `bugfix/issue-description` → Bug fixes
- `docs/update-readme` → Documentation updates

---

## 🧑‍💻 Team Member Assignments

| Developer | Module | Files to Focus On |
|-----------|--------|-------------------|
| **Dev 1** | Authentication | `authController.js`, `authRoutes.js`, `Login.jsx`, `Register.jsx` |
| **Dev 2** | User Profiles | `profileController.js`, `profileRoutes.js`, `Dashboard.jsx` |
| **Dev 3** | Job Listings | `jobController.js`, `jobRoutes.js`, `JobCard.jsx` |
| **Dev 4** | Job Details | `JobDetails.jsx`, API integration |
| **Dev 5** | UI Components | `Navbar.jsx`, `Footer.jsx`, Styling |
| **Dev 6** | Database Models | `User.js`, `Job.js`, `Application.js` |

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB + Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [JWT Authentication Tutorial](https://jwt.io/introduction)

---

## 📝 License

This project is developed as part of the **Amdox Training Program** and is intended for educational purposes.

---

## 🤝 Support

For questions or issues, reach out to the team lead or create an issue in this repository.

**Built with ❤️ by Group 3 | Amdox 2025**

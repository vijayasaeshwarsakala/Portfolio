# SAKALA Vijaya Saeshwar — Production Full-Stack Personal Portfolio

> **"THE PERSON BEHIND THE MASK"**  
> A premium, dark cinematic Spider-Man inspired full-stack portfolio & content management system for **SAKALA Vijaya Saeshwar** (B.Tech CSE — AI & ML, Pragati Engineering College).

---

## 🕷️ FEATURES OVERVIEW

- **Dark Cinematic Visual Language**: Custom Spider-Man aesthetic featuring `#050505` black base, vibrant glowing red `#E50914` accents, and subtle `#147BFF` blue highlights.
- **Spider-Web Canvas & Particles**: HTML5 Canvas particle system drawing dynamic web lines connecting adjacent nodes and cursor positions.
- **Interactive Skills Spider-Web**: Radial/Interactive web graph showcasing skill categories and proficiency meters.
- **Spider-Sense Easter Egg Mode**: Toggleable via keyboard shortcut `[S]` or tapping the brand logo 4 times. Triggers red glitch pulses, heightened web line opacity, and glowing borders.
- **Zero Fake Data Enforcement**: Built with real verified information. Empty states displayed cleanly for pending data ("NO MISSIONS LOGGED YET", "SKILL DATABASE INITIALIZING", "RESUME WILL BE AVAILABLE SOON"). Dynamic hiding of unavailable social icons.
- **Full-Stack REST Backend & MongoDB**: Node.js/Express REST API backed by MongoDB Mongoose schemas, JWT authentication, helmet security headers, rate limiting, and CORS.
- **Admin Control Dashboard (`/admin`)**: Full CRUD management interface allowing updates to Profile, Projects, Certificates, Skills, Experience, Education, Achievements, Resume, and Social links without editing source code.
- **Static Dataset Fallback**: Uses `frontend/src/data/*.js` for seamless offline/static fallback and MongoDB initial database seeding.

---

## 🛠️ TECH STACK

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, HTML5 Canvas.
- **Backend**: Node.js, Express.js, Mongoose, JWT, BcryptJS, Helmet, CORS, Express-Rate-Limit, Multer.
- **Database**: MongoDB (Local or MongoDB Atlas).
- **Storage**: Local `public/user-data/` storage + Cloudinary integration support.

---

## 📂 REPOSITORY STRUCTURE

```
Portfolio/
├── backend/
│   ├── config/ (db.js)
│   ├── controllers/ (authController.js, portfolioController.js)
│   ├── middleware/ (authMiddleware.js, uploadMiddleware.js)
│   ├── models/ (Admin, Profile, Education, Skill, Project, Certificate, Experience, Achievement, Resume, Contact, Social)
│   ├── routes/ (authRoutes.js, apiRoutes.js)
│   ├── scripts/ (seed.js)
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── user-data/
│   │       ├── profile-photo/ (profile.jpg)
│   │       ├── certificates/ (*.pdf)
│   │       └── resume/ (resume.pdf)
│   ├── src/
│   │   ├── components/ (canvas, common, sections, admin)
│   │   ├── context/ (AuthContext, PortfolioDataContext, SpiderSenseContext)
│   │   ├── data/ (profile.js, education.js, skills.js, projects.js, certificates.js, experience.js, achievements.js, socials.js)
│   │   ├── pages/ (HomePage, AdminLoginPage, AdminDashboardPage)
│   │   ├── services/ (api.js)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── DATA_GUIDE.md
├── USER_FILES_GUIDE.md
└── README.md
```

---

## 🚀 LOCAL SETUP INSTRUCTIONS

### 1. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 2. Install Backend Dependencies
```bash
cd ../backend
npm install
```

### 3. Database Seeding (Optional)
Ensure MongoDB is running locally, then seed the database:
```bash
cd backend
npm run seed
```

### 4. Run Development Servers

- **Start Backend API (Port 5000)**:
  ```bash
  cd backend
  npm run dev
  ```

- **Start Frontend Vite App (Port 5173)**:
  ```bash
  cd frontend
  npm run dev
  ```

- Open `http://localhost:5173` in your browser.

---

## 🔑 ADMIN DASHBOARD LOGIN

1. Navigate to `/admin` or click the **Lock Icon** in the top navigation.
2. Log in using your configured administrator credentials.
3. Admin credentials can be updated at any time in the **Security & Password** tab within the Admin Dashboard.

---

## 🌐 PRODUCTION DEPLOYMENT

### Frontend (Vercel)
1. Push your repository to GitHub.
2. Import project into Vercel and set Root Directory to `frontend`.
3. Build Command: `npm run build`, Output Directory: `dist`.

### Backend (Render / Railway)
1. Set Root Directory to `backend`.
2. Environment Variables:
   - `PORT`: `5000`
   - `MONGO_URI`: `mongodb+srv://<user>:<pass>@cluster0.mongodb.net/sakala_portfolio`
   - `JWT_SECRET`: `your_secure_jwt_secret`
   - `ADMIN_USERNAME`: `your_admin_username`
   - `ADMIN_PASSWORD`: `your_admin_password`
   - `CLIENT_URL`: `https://your-vercel-domain.vercel.app`

# PORTFOLIO DATA UPDATE GUIDE
**SAKALA Vijaya Saeshwar — Personal Developer Portfolio**

This document explains exactly how and where you can update all information on your personal portfolio website.

---

## 🌟 TWO WAYS TO UPDATE YOUR PORTFOLIO

### METHOD 1: Through the Admin Dashboard (Recommended for Production)
1. Open your portfolio in a web browser.
2. Click the **Lock Icon** (or "Admin Portal") in the header navigation or footer.
3. Login using your admin credentials:
   - **Default Dev Username**: `admin`
   - **Default Dev Password**: `adminpassword123`
4. Use the dashboard tabs to add, update, or remove:
   - **Profile & Bio**
   - **Projects (Missions)**
   - **Certificates (Upload PDFs)**
   - **Skills (Powers)**
   - **Resume (Upload PDF)**
   - **Field Experience**
   - **Education**
   - **Achievements**
   - **Social Links (GitHub, LinkedIn, Instagram, Email)**

---

### METHOD 2: Through Source Data Files (Initial / Offline Seed Data)
If you prefer updating source code directly or want to update the initial default data before seeding into MongoDB:

| Content Area | File Location | What to Update |
| :--- | :--- | :--- |
| **Personal Profile & Bio** | `frontend/src/data/profile.js` | Name, Bio, Tagline, College, Degree |
| **Education Details** | `frontend/src/data/education.js` | College, Specialization, CGPA (when available) |
| **Field Experience** | `frontend/src/data/experience.js` | Internship roles, HoloGrad offer details, Responsibilities |
| **Certificates Metadata** | `frontend/src/data/certificates.js` | Certificate titles, organizations, issue dates |
| **Achievements** | `frontend/src/data/achievements.js` | Event participations, quiz certificates, pitch events |
| **Projects (Missions)** | `frontend/src/data/projects.js` | Project title, description, technologies, GitHub, Live demo |
| **Skills (Powers)** | `frontend/src/data/skills.js` | Skill names, categories, proficiency percentages |
| **Social Links & Email** | `frontend/src/data/socials.js` | Email, GitHub URL, LinkedIn URL, Instagram URL |

---

## 📸 WHERE TO PLACE YOUR ASSET FILES

- **Profile Photo**: Place your photo as `profile.jpg` inside:
  ```
  frontend/public/user-data/profile-photo/profile.jpg
  ```
- **Certificate PDFs / Images**: Place your PDF files inside:
  ```
  frontend/public/user-data/certificates/
  ```
- **Resume PDF**: Place your resume PDF inside:
  ```
  frontend/public/user-data/resume/resume.pdf
  ```

---

## 🔒 SECURITY & NO FAKE DATA GUARANTEE
- If a social link (like GitHub or LinkedIn) is left empty (`""`), the corresponding icon is **automatically hidden** on the public website.
- If no projects exist, the website displays **"NO MISSIONS LOGGED YET"**.
- If no skills are entered, the website displays **"SKILL DATABASE INITIALIZING"**.
- If no active resume is uploaded, the download button shows **"RESUME WILL BE AVAILABLE SOON"**.

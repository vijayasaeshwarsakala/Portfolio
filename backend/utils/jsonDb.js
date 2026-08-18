const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, '../data');
const dbFilePath = path.join(dbDir, 'db.json');

// Initial seed fallbacks
const initialProfile = {
  fullName: "SAKALA Vijaya Saeshwar",
  brandingName: "SAKALA",
  subtitleName: "Vijaya Saeshwar",
  heroLabel: "YOUR FRIENDLY NEIGHBORHOOD DEVELOPER",
  title: "AI & ML ENTHUSIAST",
  tagline: "Building intelligent systems & futuristic digital experiences",
  bio: "B.Tech Computer Science student specializing in Artificial Intelligence & Machine Learning at Pragati Engineering College. Passionate about exploring machine learning algorithms, modern web development, and innovative tech solutions.",
  college: "Pragati Engineering College",
  degree: "B.Tech",
  branch: "Computer Science Engineering",
  specialization: "Artificial Intelligence & Machine Learning",
  displayDegree: "B.Tech — CSE (AI & ML)",
  email: "vijayasaeshwarsakala@gmail.com",
  profilePhoto: "/user-data/profile-photo/profile.jpg",
  location: "Kakinada, Andhra Pradesh, India",
  status: "Open to AI/ML & Web Development Opportunities"
};

const initialEducation = [
  {
    _id: "edu-01",
    id: "edu-01",
    institution: "Pragati Engineering College",
    degree: "B.Tech",
    branch: "Computer Science Engineering",
    specialization: "Artificial Intelligence & Machine Learning",
    displayTitle: "B.Tech — CSE (AI & ML)",
    description: "Specialized undergraduate program focusing on Artificial Intelligence, Machine Learning algorithms, Data Structures, Database Systems, and Modern Software Engineering.",
    isCurrent: true
  }
];

const initialCertificates = [
  { _id: "cert-01", id: "cert-01", title: "AI for Beginners", organization: "HP LIFE / HP Foundation", issueDate: "July 26, 2025", category: "AI & Machine Learning", description: "Foundational course on Artificial Intelligence principles, neural network concepts, and real-world AI applications.", credentialUrl: "", filePath: "/user-data/certificates/ai-for-beginners.pdf", verified: true },
  { _id: "cert-02", id: "cert-02", title: "AI for Business Professionals", organization: "HP LIFE / HP Foundation", issueDate: "August 14, 2025", category: "AI & Machine Learning", description: "Strategic applications of Artificial Intelligence in business operations, automation, and decision-making.", credentialUrl: "", filePath: "/user-data/certificates/ai-for-business-professionals.pdf", verified: true },
  { _id: "cert-03", id: "cert-03", title: "Data Science & Analytics", organization: "HP LIFE / HP Foundation", issueDate: "July 26, 2025", category: "Data Science", description: "Core analytics techniques, data processing pipelines, data visualization, and statistical modeling fundamentals.", credentialUrl: "", filePath: "/user-data/certificates/data-science-analytics.pdf", verified: true },
  { _id: "cert-04", id: "cert-04", title: "Introduction to Cybersecurity Awareness", organization: "HP LIFE / HP Foundation", issueDate: "August 12, 2025", category: "Cybersecurity", description: "Essential threat awareness, network security hygiene, data protection protocols, and security best practices.", credentialUrl: "", filePath: "/user-data/certificates/cybersecurity.pdf", verified: true },
  { _id: "cert-05", id: "cert-05", title: "Effective Leadership", organization: "HP LIFE / HP Foundation", issueDate: "September 5, 2025", category: "Professional Development", description: "Team management strategies, decision making under pressure, vision execution, and collaborative leadership.", credentialUrl: "", filePath: "/user-data/certificates/leadership.pdf", verified: true },
  { _id: "cert-06", id: "cert-06", title: "Business Email", organization: "HP LIFE / HP Foundation", issueDate: "September 6, 2025", category: "Communication", description: "Professional workplace communication, clear email etiquette, formal reporting, and business correspondence.", credentialUrl: "", filePath: "/user-data/certificates/business-email.pdf", verified: true },
  { _id: "cert-07", id: "cert-07", title: "Social Media Marketing", organization: "HP LIFE / HP Foundation", issueDate: "September 7, 2025", category: "Digital Marketing", description: "Campaign design, audience targeting, performance analytics, and social engagement strategy.", credentialUrl: "", filePath: "/user-data/certificates/social-media-marketing.pdf", verified: true },
  { _id: "cert-08", id: "cert-08", title: "Resume Writing and Job Interviewing", organization: "HP LIFE / HP Foundation", issueDate: "September 8, 2025", category: "Career Skills", description: "Professional resume structuring, personal branding, technical interview preparation, and communication.", credentialUrl: "", filePath: "/user-data/certificates/resume-writing.pdf", verified: true },
  { _id: "cert-09", id: "cert-09", title: "Success Mindset", organization: "HP LIFE / HP Foundation", issueDate: "September 9, 2025", category: "Personal Growth", description: "Goal alignment, continuous learning habits, resilience in problem solving, and growth mindset.", credentialUrl: "", filePath: "/user-data/certificates/success-mindset.pdf", verified: true },
  { _id: "cert-10", id: "cert-10", title: "Customer Experience (CX) for Business Success", organization: "HP LIFE / HP Foundation", issueDate: "August 18, 2026", category: "Business Strategy", description: "User-centric design thinking, customer journey mapping, service quality, and feedback analysis.", credentialUrl: "", filePath: "/user-data/certificates/customer-experience.pdf", verified: true },
  { _id: "cert-11", id: "cert-11", title: "Assessment for Opportunity of Predictive Modelling", organization: "Pragati Engineering College", issueDate: "Participation", category: "AI & Data Science", description: "Certificate of Participation for predictive modeling assessment and statistical analysis event.", credentialUrl: "", filePath: "/user-data/certificates/predictive-modelling.pdf", verified: true },
  { _id: "cert-12", id: "cert-12", title: "CampusCrew: 100K Special Certificate — Google Gemini QuizOff 2026", organization: "CampusCrew", issueDate: "2026", category: "AI & Innovation", description: "Certificate of Participation in the national Google Gemini QuizOff 2026 AI knowledge competition.", credentialUrl: "", filePath: "/user-data/certificates/google-gemini-quizoff.pdf", verified: true },
  { _id: "cert-13", id: "cert-13", title: "Start-up Pitch — Team Fictional Thinkers", organization: "Pragati Engineering College", issueDate: "Participation", category: "Entrepreneurship & Pitching", description: "Certificate of Participation in Start-up Pitch competition as part of Team Fictional Thinkers.", credentialUrl: "", filePath: "/user-data/certificates/startup-pitch.pdf", verified: true },
  { _id: "cert-14", id: "cert-14", title: "Nasha Mukti Sankalp / Nasha Mukt Bharat Abhiyaan", organization: "Government Initiative", issueDate: "Pledge Certificate", category: "Social Responsibility", description: "Certificate of Pledge for the Nasha Mukt Bharat Abhiyaan social awareness campaign.", credentialUrl: "", filePath: "/user-data/certificates/nasha-mukti-sankalp.pdf", verified: true }
];

const initialExperience = [
  {
    _id: "exp-01",
    id: "exp-01",
    company: "HoloGrad LLP",
    role: "Digital Marketing Intern",
    duration: "60 Working Days",
    offerDate: "18 June 2026",
    status: "INTERNSHIP / OFFER",
    type: "Internship",
    location: "Remote / On-site",
    responsibilities: [
      "Executing targeted digital marketing & growth campaigns",
      "Managing lead generation & structured lead nurturing pipelines",
      "Handling strategic social media outreach & audience engagement",
      "Analyzing campaign metrics, user reach, and brand conversion optimization",
      "Enhancing brand visibility and supporting growth strategies"
    ],
    verified: true,
    certificatePath: "/user-data/certificates/leadership.pdf"
  }
];

const initialAchievements = [
  { _id: "ach-01", id: "ach-01", title: "Google Gemini QuizOff 2026 Participant", organization: "CampusCrew", date: "2026", category: "AI Competition", description: "Participated in the CampusCrew 100K Special Google Gemini QuizOff focused on Generative AI and LLM technologies.", highlight: "100K Special Event", certificatePath: "/user-data/certificates/google-gemini-quizoff.pdf" },
  { _id: "ach-02", id: "ach-02", title: "Start-up Pitch Presenter — Team Fictional Thinkers", organization: "Pragati Engineering College", date: "Academic Competition", category: "Entrepreneurship", description: "Pitched innovative technical start-up concepts alongside Team Fictional Thinkers at Pragati Engineering College.", highlight: "Team Fictional Thinkers", certificatePath: "/user-data/certificates/startup-pitch.pdf" },
  { _id: "ach-03", id: "ach-03", title: "Predictive Modelling Assessment Participant", organization: "Pragati Engineering College", date: "Academic Workshop", category: "Data Science", description: "Demonstrated skills in statistical data evaluation and predictive modeling opportunities.", highlight: "Pragati Engineering College", certificatePath: "/user-data/certificates/predictive-modelling.pdf" },
  { _id: "ach-04", id: "ach-04", title: "HP LIFE Professional Learning Milestone", organization: "HP LIFE / HP Foundation", date: "2025 - 2026", category: "Certification", description: "Successfully completed 10 HP LIFE certification modules spanning AI, Data Science, Leadership, Cybersecurity, and Business strategy.", highlight: "10 Certified Modules", certificatePath: "/user-data/certificates/ai-for-beginners.pdf" },
  { _id: "ach-05", id: "ach-05", title: "Nasha Mukti Sankalp Social Awareness Pledge", organization: "Nasha Mukt Bharat Abhiyaan", date: "Social Initiative", category: "Community Leadership", description: "Committed to community health and substance-free awareness as part of the Nasha Mukt Bharat Abhiyaan campaign.", highlight: "National Campaign Pledge", certificatePath: "/user-data/certificates/nasha-mukti-sankalp.pdf" }
];

const initialSocials = {
  email: "vijayasaeshwarsakala@gmail.com",
  githubUrl: "",
  linkedinUrl: "",
  instagramUrl: "",
  portfolioUrl: "https://sakala-portfolio.vercel.app"
};

function initDb() {
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  if (!fs.existsSync(dbFilePath)) {
    const defaultData = {
      profile: initialProfile,
      education: initialEducation,
      certificates: initialCertificates,
      experience: initialExperience,
      achievements: initialAchievements,
      projects: [],
      skills: [],
      socials: initialSocials,
      resume: null,
      contacts: [],
      admin: {
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'adminpassword123',
        role: 'admin'
      }
    };
    fs.writeFileSync(dbFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

function readDb() {
  initDb();
  try {
    const data = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('[jsonDb Read Error]:', err);
    return {};
  }
}

function writeDb(data) {
  initDb();
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[jsonDb Write Error]:', err);
    return false;
  }
}

// Data Access Object Helpers
const jsonDb = {
  getProfile: () => readDb().profile || initialProfile,
  updateProfile: (updates) => {
    const db = readDb();
    db.profile = { ...(db.profile || initialProfile), ...updates };
    writeDb(db);
    return db.profile;
  },

  getEducation: () => readDb().education || [],
  createEducation: (item) => {
    const db = readDb();
    const _id = 'edu-' + Date.now();
    const newItem = { _id, id: _id, ...item };
    db.education = [newItem, ...(db.education || [])];
    writeDb(db);
    return newItem;
  },
  updateEducation: (id, updates) => {
    const db = readDb();
    db.education = (db.education || []).map(item =>
      (item._id === id || item.id === id) ? { ...item, ...updates } : item
    );
    writeDb(db);
    return db.education.find(item => item._id === id || item.id === id);
  },
  deleteEducation: (id) => {
    const db = readDb();
    db.education = (db.education || []).filter(item => item._id !== id && item.id !== id);
    writeDb(db);
    return true;
  },

  getSkills: () => readDb().skills || [],
  createSkill: (item) => {
    const db = readDb();
    const _id = 'skill-' + Date.now();
    const newItem = { _id, id: _id, ...item };
    db.skills = [newItem, ...(db.skills || [])];
    writeDb(db);
    return newItem;
  },
  updateSkill: (id, updates) => {
    const db = readDb();
    db.skills = (db.skills || []).map(item =>
      (item._id === id || item.id === id) ? { ...item, ...updates } : item
    );
    writeDb(db);
    return db.skills.find(item => item._id === id || item.id === id);
  },
  deleteSkill: (id) => {
    const db = readDb();
    db.skills = (db.skills || []).filter(item => item._id !== id && item.id !== id);
    writeDb(db);
    return true;
  },

  getProjects: () => readDb().projects || [],
  createProject: (item) => {
    const db = readDb();
    const _id = 'proj-' + Date.now();
    const newItem = { _id, id: _id, createdAt: new Date().toISOString(), ...item };
    db.projects = [newItem, ...(db.projects || [])];
    writeDb(db);
    return newItem;
  },
  updateProject: (id, updates) => {
    const db = readDb();
    db.projects = (db.projects || []).map(item =>
      (item._id === id || item.id === id) ? { ...item, ...updates } : item
    );
    writeDb(db);
    return db.projects.find(item => item._id === id || item.id === id);
  },
  deleteProject: (id) => {
    const db = readDb();
    db.projects = (db.projects || []).filter(item => item._id !== id && item.id !== id);
    writeDb(db);
    return true;
  },

  getCertificates: () => readDb().certificates || [],
  createCertificate: (item) => {
    const db = readDb();
    const _id = 'cert-' + Date.now();
    const newItem = { _id, id: _id, verified: true, ...item };
    db.certificates = [newItem, ...(db.certificates || [])];
    writeDb(db);
    return newItem;
  },
  updateCertificate: (id, updates) => {
    const db = readDb();
    db.certificates = (db.certificates || []).map(item =>
      (item._id === id || item.id === id) ? { ...item, ...updates } : item
    );
    writeDb(db);
    return db.certificates.find(item => item._id === id || item.id === id);
  },
  deleteCertificate: (id) => {
    const db = readDb();
    db.certificates = (db.certificates || []).filter(item => item._id !== id && item.id !== id);
    writeDb(db);
    return true;
  },

  getExperience: () => readDb().experience || [],
  createExperience: (item) => {
    const db = readDb();
    const _id = 'exp-' + Date.now();
    const newItem = { _id, id: _id, ...item };
    db.experience = [newItem, ...(db.experience || [])];
    writeDb(db);
    return newItem;
  },
  updateExperience: (id, updates) => {
    const db = readDb();
    db.experience = (db.experience || []).map(item =>
      (item._id === id || item.id === id) ? { ...item, ...updates } : item
    );
    writeDb(db);
    return db.experience.find(item => item._id === id || item.id === id);
  },
  deleteExperience: (id) => {
    const db = readDb();
    db.experience = (db.experience || []).filter(item => item._id !== id && item.id !== id);
    writeDb(db);
    return true;
  },

  getAchievements: () => readDb().achievements || [],
  createAchievement: (item) => {
    const db = readDb();
    const _id = 'ach-' + Date.now();
    const newItem = { _id, id: _id, ...item };
    db.achievements = [newItem, ...(db.achievements || [])];
    writeDb(db);
    return newItem;
  },
  updateAchievement: (id, updates) => {
    const db = readDb();
    db.achievements = (db.achievements || []).map(item =>
      (item._id === id || item.id === id) ? { ...item, ...updates } : item
    );
    writeDb(db);
    return db.achievements.find(item => item._id === id || item.id === id);
  },
  deleteAchievement: (id) => {
    const db = readDb();
    db.achievements = (db.achievements || []).filter(item => item._id !== id && item.id !== id);
    writeDb(db);
    return true;
  },

  getSocials: () => readDb().socials || initialSocials,
  updateSocials: (updates) => {
    const db = readDb();
    db.socials = { ...(db.socials || initialSocials), ...updates };
    writeDb(db);
    return db.socials;
  },

  getResume: () => readDb().resume || null,
  setResume: (resumeData) => {
    const db = readDb();
    const _id = 'res-' + Date.now();
    const newResume = { _id, id: _id, uploadedAt: new Date().toISOString(), isActive: true, ...resumeData };
    db.resume = newResume;
    writeDb(db);
    return newResume;
  },
  deleteResume: () => {
    const db = readDb();
    db.resume = null;
    writeDb(db);
    return true;
  },

  getContacts: () => readDb().contacts || [],
  createContact: (item) => {
    const db = readDb();
    const _id = 'msg-' + Date.now();
    const newItem = { _id, id: _id, createdAt: new Date().toISOString(), status: 'unread', ...item };
    db.contacts = [newItem, ...(db.contacts || [])];
    writeDb(db);
    return newItem;
  },
  updateContactStatus: (id, status) => {
    const db = readDb();
    db.contacts = (db.contacts || []).map(item =>
      (item._id === id || item.id === id) ? { ...item, status } : item
    );
    writeDb(db);
    return db.contacts.find(item => item._id === id || item.id === id);
  },

  getAdmin: () => readDb().admin || {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'adminpassword123',
    role: 'admin'
  },
  updateAdmin: ({ username, password }) => {
    const db = readDb();
    const current = db.admin || { role: 'admin' };
    if (username) current.username = username;
    if (password) current.password = password;
    db.admin = current;
    writeDb(db);
    return current;
  }
};

module.exports = jsonDb;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middlewares & Security
app.use(helmet({
  contentSecurityPolicy: false, // Allowed for loading inline assets/PDFs
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 200, // Limit each IP to 200 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Serve static user uploaded assets (profile photo, certificates, resumes)
app.use('/user-data', express.static(path.join(__dirname, '../frontend/public/user-data')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/apiRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    system: 'SAKALA Vijaya Saeshwar Portfolio Backend API',
    branding: 'THE PERSON BEHIND THE MASK'
  });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Backend Server running on port ${PORT}]`);
  });
}

module.exports = app;

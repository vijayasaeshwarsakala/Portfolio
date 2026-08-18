const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');

const Profile = require('../models/Profile');
const Education = require('../models/Education');
const Certificate = require('../models/Certificate');
const Experience = require('../models/Experience');
const Achievement = require('../models/Achievement');
const Social = require('../models/Social');
const Admin = require('../models/Admin');

const { profileData } = require('../../frontend/src/data/profile');
const { educationData } = require('../../frontend/src/data/education');
const { certificatesData } = require('../../frontend/src/data/certificates');
const { experienceData } = require('../../frontend/src/data/experience');
const { achievementsData } = require('../../frontend/src/data/achievements');
const { socialsData } = require('../../frontend/src/data/socials');

const seedDB = async () => {
  try {
    await connectDB();
    console.log('[Seed Script] Clearing existing collections...');

    await Promise.all([
      Profile.deleteMany({}),
      Education.deleteMany({}),
      Certificate.deleteMany({}),
      Experience.deleteMany({}),
      Achievement.deleteMany({}),
      Social.deleteMany({}),
    ]);

    console.log('[Seed Script] Seeding Profile data...');
    await Profile.create(profileData);

    console.log('[Seed Script] Seeding Education data...');
    await Education.insertMany(educationData);

    console.log('[Seed Script] Seeding Certificates data (14 verified certificates)...');
    await Certificate.insertMany(certificatesData);

    console.log('[Seed Script] Seeding Experience data (HoloGrad LLP)...');
    await Experience.insertMany(experienceData);

    console.log('[Seed Script] Seeding Achievements data...');
    await Achievement.insertMany(achievementsData);

    console.log('[Seed Script] Seeding Social Links data...');
    await Social.create(socialsData);

    // Create default admin user if not exists
    const adminExists = await Admin.findOne({ username: process.env.ADMIN_USERNAME || 'admin' });
    if (!adminExists) {
      console.log('[Seed Script] Creating Default Admin User...');
      await Admin.create({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'adminpassword123',
        role: 'admin'
      });
    }

    console.log('[Seed Script] Database successfully seeded with verified SAKALA Vijaya Saeshwar data!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Script Error]:', error);
    process.exit(1);
  }
};

seedDB();

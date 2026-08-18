import axios from 'axios';
import { profileData } from '../data/profile';
import { educationData } from '../data/education';
import { certificatesData } from '../data/certificates';
import { experienceData } from '../data/experience';
import { achievementsData } from '../data/achievements';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import { socialsData } from '../data/socials';

const API = axios.create({
  baseURL: '/api',
  timeout: 4000,
});

// Interceptor for attaching JWT auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('sakala_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const fetchProfile = async () => {
  try {
    const res = await API.get('/profile');
    if (res.data?.data) return res.data.data;
    return profileData;
  } catch (err) {
    console.log('[API Offline]: Using static profile fallback data');
    return profileData;
  }
};

export const fetchEducation = async () => {
  try {
    const res = await API.get('/education');
    if (res.data?.data && res.data.data.length > 0) return res.data.data;
    return educationData;
  } catch (err) {
    return educationData;
  }
};

export const fetchSkills = async () => {
  try {
    const res = await API.get('/skills');
    if (res.data?.data && res.data.data.length > 0) return res.data.data;
    return skillsData;
  } catch (err) {
    return skillsData;
  }
};

export const fetchProjects = async () => {
  try {
    const res = await API.get('/projects');
    if (res.data?.data) return res.data.data;
    return projectsData;
  } catch (err) {
    return projectsData;
  }
};

export const fetchCertificates = async () => {
  try {
    const res = await API.get('/certificates');
    if (res.data?.data && res.data.data.length > 0) return res.data.data;
    return certificatesData;
  } catch (err) {
    return certificatesData;
  }
};

export const fetchExperience = async () => {
  try {
    const res = await API.get('/experience');
    if (res.data?.data && res.data.data.length > 0) return res.data.data;
    return experienceData;
  } catch (err) {
    return experienceData;
  }
};

export const fetchAchievements = async () => {
  try {
    const res = await API.get('/achievements');
    if (res.data?.data && res.data.data.length > 0) return res.data.data;
    return achievementsData;
  } catch (err) {
    return achievementsData;
  }
};

export const fetchSocials = async () => {
  try {
    const res = await API.get('/socials');
    if (res.data?.data) return res.data.data;
    return socialsData;
  } catch (err) {
    return socialsData;
  }
};

export const fetchActiveResume = async () => {
  try {
    const res = await API.get('/resume');
    if (res.data?.data) return res.data.data;
    return null;
  } catch (err) {
    return null;
  }
};

export const sendContactMessage = async (formData) => {
  try {
    const res = await API.post('/contact', formData);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Transmission failed. Server unreachable.');
  }
};

export const loginAdminApi = async (credentials) => {
  try {
    const res = await API.post('/auth/login', credentials);
    return res.data;
  } catch (err) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error('Authentication failed. Please check your network or server status.');
  }
};

export default API;

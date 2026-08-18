import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchProfile, fetchEducation, fetchSkills, fetchProjects,
  fetchCertificates, fetchExperience, fetchAchievements, fetchSocials, fetchActiveResume
} from '../services/api';

const PortfolioDataContext = createContext();

export const PortfolioDataProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [experience, setExperience] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [socials, setSocials] = useState(null);
  const [activeResume, setActiveResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [profData, eduData, skillData, projData, certData, expData, achData, socData, resData] = await Promise.all([
        fetchProfile(),
        fetchEducation(),
        fetchSkills(),
        fetchProjects(),
        fetchCertificates(),
        fetchExperience(),
        fetchAchievements(),
        fetchSocials(),
        fetchActiveResume()
      ]);

      setProfile(profData);
      setEducation(eduData);
      setSkills(skillData);
      setProjects(projData);
      setCertificates(certData);
      setExperience(expData);
      setAchievements(achData);
      setSocials(socData);
      setActiveResume(resData);
    } catch (err) {
      console.error('[PortfolioDataContext Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <PortfolioDataContext.Provider value={{
      profile, education, skills, projects, certificates,
      experience, achievements, socials, activeResume, loading,
      refreshData: loadAllData
    }}>
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => useContext(PortfolioDataContext);

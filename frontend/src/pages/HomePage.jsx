import React from 'react';
import { SpiderWebCanvas } from '../components/canvas/SpiderWebCanvas';
import { Navbar } from '../components/common/Navbar';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { CertificatesSection } from '../components/sections/CertificatesSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { EducationSection } from '../components/sections/EducationSection';
import { AchievementsSection } from '../components/sections/AchievementsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { Footer } from '../components/common/Footer';

export const HomePage = ({ onOpenAdmin }) => {
  return (
    <div className="relative min-h-screen bg-spider-darkBg text-spider-textLight overflow-hidden web-overlay">
      {/* Background Interactive Web particle Canvas */}
      <SpiderWebCanvas />

      {/* Navbar */}
      <Navbar onOpenAdmin={onOpenAdmin} />

      {/* Main Sections */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <ExperienceSection />
        <EducationSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={onOpenAdmin} />
    </div>
  );
};

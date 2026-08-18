import React, { useState } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { ProfileEditor } from '../components/admin/ProfileEditor';
import { ProjectsManager } from '../components/admin/ProjectsManager';
import { CertificatesManager } from '../components/admin/CertificatesManager';
import { SkillsManager } from '../components/admin/SkillsManager';
import { ResumeManager } from '../components/admin/ResumeManager';
import { ExperienceManager } from '../components/admin/ExperienceManager';
import { EducationManager } from '../components/admin/EducationManager';
import { AchievementsManager } from '../components/admin/AchievementsManager';
import { SocialsManager } from '../components/admin/SocialsManager';
import { MessagesViewer } from '../components/admin/MessagesViewer';
import { SecuritySettings } from '../components/admin/SecuritySettings';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const AdminDashboardPage = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const { refreshData, loading } = usePortfolioData();

  return (
    <div className="min-h-screen bg-spider-darkBg text-spider-textLight flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onBackToHome={onBackToHome} />

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        
        {/* Top Action Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-spider-darkBorder">
          <button
            onClick={onBackToHome}
            className="text-xs font-mono text-spider-textMuted hover:text-spider-redPrimary flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Public Portfolio
          </button>

          <button
            onClick={refreshData}
            disabled={loading}
            className="px-3.5 py-1.5 bg-spider-darkCard border border-spider-darkBorder text-xs font-mono text-white rounded-lg flex items-center gap-1.5 hover:border-spider-redPrimary transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh State
          </button>
        </div>

        {/* Tab Content Router */}
        {activeTab === 'profile' && <ProfileEditor />}
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'certificates' && <CertificatesManager />}
        {activeTab === 'skills' && <SkillsManager />}
        {activeTab === 'resume' && <ResumeManager />}
        {activeTab === 'experience' && <ExperienceManager />}
        {activeTab === 'education' && <EducationManager />}
        {activeTab === 'achievements' && <AchievementsManager />}
        {activeTab === 'socials' && <SocialsManager />}
        {activeTab === 'messages' && <MessagesViewer />}
        {activeTab === 'security' && <SecuritySettings />}
      </div>
    </div>
  );
};

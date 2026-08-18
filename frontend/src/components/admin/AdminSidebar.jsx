import React from 'react';
import {
  User, BookOpen, Cpu, FolderGit2, Award, Briefcase, GraduationCap,
  Trophy, FileText, Share2, MessageSquare, LogOut, Shield, KeyRound
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar = ({ activeTab, setActiveTab, onBackToHome }) => {
  const { logout } = useAuth();

  const handleExitAdmin = () => {
    logout();
    if (onBackToHome) onBackToHome();
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'projects', label: 'Projects (Missions)', icon: FolderGit2 },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'skills', label: 'Skills (Powers)', icon: Cpu },
    { id: 'resume', label: 'Resume Manager', icon: FileText },
    { id: 'experience', label: 'Field Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'socials', label: 'Social Links', icon: Share2 },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'security', label: 'Security & Password', icon: KeyRound },
  ];

  return (
    <aside className="w-64 bg-spider-darkCard border-r border-spider-darkBorder flex flex-col justify-between p-4 shrink-0 min-h-screen">
      <div className="space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 p-3 bg-spider-darkBg border border-spider-darkBorder rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-spider-redDark/20 border border-spider-redPrimary/40 flex items-center justify-center">
            <Shield className="w-4 h-4 text-spider-redPrimary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-xs tracking-wider">
              ADMIN CONTROL
            </h3>
            <p className="text-[10px] font-mono text-spider-redPrimary">
              SAKALA PORTFOLIO
            </p>
          </div>
        </div>

        {/* Menu Tabs */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all text-left ${
                  isActive
                    ? 'bg-spider-redPrimary text-white shadow-spider-glow font-bold'
                    : 'text-spider-textMuted hover:text-white hover:bg-spider-darkBg border border-transparent hover:border-spider-darkBorder'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-spider-redPrimary'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-spider-darkBorder">
        <button
          onClick={handleExitAdmin}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-mono text-spider-textMuted hover:text-white hover:bg-spider-redDark/30 border border-spider-darkBorder hover:border-spider-redPrimary/50 transition-all"
        >
          <LogOut className="w-4 h-4 text-spider-redPrimary" />
          <span>Exit Admin</span>
        </button>
      </div>
    </aside>
  );
};

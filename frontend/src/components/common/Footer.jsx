import React from 'react';
import { Shield, ArrowUp, Lock } from 'lucide-react';

export const Footer = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-spider-darkCard border-t border-spider-darkBorder py-12 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-spider-redDark/20 border border-spider-redPrimary/40 flex items-center justify-center">
            <Shield className="w-5 h-5 text-spider-redPrimary" />
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-base tracking-wider">
              SAKALA VIJAYA SAESHWAR
            </h4>
            <p className="text-xs text-spider-textMuted font-mono">
              THE PERSON BEHIND THE MASK
            </p>
          </div>
        </div>

        {/* Center Credits */}
        <div className="text-center text-xs text-spider-textMuted font-mono space-y-1">
          <p>© {new Date().getFullYear()} SAKALA Vijaya Saeshwar. All Rights Reserved.</p>
          <p className="text-[11px] text-spider-redPrimary/80">
            Pragati Engineering College — B.Tech CSE (AI & ML)
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenAdmin}
            className="text-xs font-mono text-spider-textMuted hover:text-spider-redPrimary flex items-center gap-1.5 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            Admin Dashboard
          </button>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-spider-darkBg border border-spider-darkBorder text-spider-textMuted hover:text-spider-redPrimary hover:border-spider-redPrimary/50 transition-all"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

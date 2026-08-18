import React from 'react';
import { InteractiveSkillsWeb } from '../canvas/InteractiveSkillsWeb';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export const SkillsSection = () => {
  const { skills } = usePortfolioData();

  return (
    <section id="skills" className="relative py-24 z-10 bg-spider-darkBg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <span className="text-xs font-mono text-spider-redPrimary tracking-widest uppercase mb-2">
            02 / SKILLS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            MY POWERS
          </h2>
          <div className="w-20 h-1 bg-spider-redPrimary mt-3 rounded-full" />
          <p className="text-xs font-mono text-spider-textMuted mt-3">
            Interactive Spider-Web skill node visualizer linked to real technical capabilities.
          </p>
        </div>

        {/* Interactive Skills Web Component */}
        <InteractiveSkillsWeb skills={skills} />

      </div>
    </section>
  );
};

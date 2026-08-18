import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Cpu, Code2, Globe, Database, Terminal, Wrench, UserCheck } from 'lucide-react';
import { useSpiderSense } from '../../context/SpiderSenseContext';

const categoryIcons = {
  "AI / ML": Cpu,
  "Programming": Code2,
  "Web Development": Globe,
  "Data Science": Database,
  "Databases": Terminal,
  "Tools": Wrench,
  "Soft Skills": UserCheck,
};

export const InteractiveSkillsWeb = ({ skills = [] }) => {
  const { spiderSenseActive } = useSpiderSense();
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    "AI / ML",
    "PROGRAMMING",
    "WEB DEVELOPMENT",
    "DATA SCIENCE",
    "DATABASES",
    "TOOLS",
    "SOFT SKILLS"
  ];

  const isEmpty = !skills || skills.length === 0;

  return (
    <div className="relative w-full min-h-[420px] bg-spider-darkCard/80 border border-spider-darkBorder rounded-2xl p-6 md:p-8 overflow-hidden backdrop-blur-md">
      {/* Background Web Visual Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-spider-redPrimary/20 via-transparent to-transparent" />
      
      {/* Center SAKALA Node Visualizer */}
      <div className="flex flex-col items-center justify-center text-center my-4">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={`w-20 h-20 rounded-full flex items-center justify-center border-2 font-display font-bold text-xl tracking-wider ${
            spiderSenseActive 
              ? 'border-spider-redGlow bg-spider-redPrimary/20 shadow-spider-glow-strong text-white' 
              : 'border-spider-redPrimary bg-spider-redDark/20 shadow-spider-glow text-spider-textLight'
          }`}
        >
          SAKALA
        </motion.div>
        <span className="text-xs uppercase tracking-widest text-spider-textMuted mt-2 font-mono">
          Core Web Node
        </span>
      </div>

      {isEmpty ? (
        /* Empty State */
        <div className="mt-8 p-8 border border-dashed border-spider-redPrimary/30 rounded-xl bg-spider-darkBg/60 text-center flex flex-col items-center justify-center">
          <ShieldAlert className="w-12 h-12 text-spider-redPrimary mb-3 animate-pulse" />
          <h4 className="text-lg font-bold font-display uppercase tracking-wider text-spider-textLight">
            SKILL DATABASE INITIALIZING
          </h4>
          <p className="text-xs text-spider-textMuted max-w-md mt-2 leading-relaxed">
            No technical powers logged yet. The user can add real skills and proficiency metrics through the Admin Dashboard or seed datasets.
          </p>

          {/* Interactive Category Nodes Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 w-full max-w-2xl">
            {categories.map((cat, idx) => (
              <div 
                key={idx}
                className="p-3 bg-spider-darkCard border border-spider-darkBorder rounded-lg text-xs font-mono font-medium text-spider-textMuted flex items-center justify-center gap-2 hover:border-spider-redPrimary/50 transition-all cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-spider-redPrimary/50" />
                {cat}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Render Populated Skills */
        <div className="mt-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeCategory === null 
                  ? 'bg-spider-redPrimary text-white shadow-spider-glow'
                  : 'bg-spider-darkBg text-spider-textMuted border border-spider-darkBorder hover:border-spider-redPrimary/40'
              }`}
            >
              All Powers
            </button>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  activeCategory === cat 
                    ? 'bg-spider-redPrimary text-white shadow-spider-glow'
                    : 'bg-spider-darkBg text-spider-textMuted border border-spider-darkBorder hover:border-spider-redPrimary/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skill Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills
              .filter(s => !activeCategory || s.category.toUpperCase() === activeCategory)
              .map((skill, index) => (
                <motion.div
                  key={skill._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-spider-darkBg/90 border border-spider-darkBorder rounded-xl hover:border-spider-redPrimary/50 transition-all group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm text-spider-textLight group-hover:text-spider-redPrimary transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-xs font-mono text-spider-redPrimary">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-spider-darkBorder h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1 }}
                      className="bg-gradient-to-r from-spider-redDark to-spider-redPrimary h-full rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

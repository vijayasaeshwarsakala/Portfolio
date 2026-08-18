import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Target, Sparkles } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export const AboutSection = () => {
  const { profile } = usePortfolioData();

  const fullName = profile?.fullName || "SAKALA Vijaya Saeshwar";
  const college = profile?.college || "Pragati Engineering College";
  const displayDegree = profile?.displayDegree || "B.Tech — CSE (AI & ML)";
  const bio = profile?.bio || "B.Tech Computer Science student specializing in Artificial Intelligence & Machine Learning at Pragati Engineering College. Dedicated to exploring machine learning architectures, web software development, and innovative technology solutions.";

  return (
    <section id="about" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <span className="text-xs font-mono text-spider-redPrimary tracking-widest uppercase mb-2">
            01 / ABOUT
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            THE PERSON BEHIND THE MASK
          </h2>
          <div className="w-20 h-1 bg-spider-redPrimary mt-3 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-spider-darkCard/80 border border-spider-darkBorder rounded-2xl p-8 backdrop-blur-md relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-spider-redPrimary/5 rounded-bl-full pointer-events-none" />
            
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-spider-darkBg border border-spider-darkBorder rounded-md text-xs font-mono text-spider-redPrimary font-bold uppercase tracking-wider">
                ORIGIN DETAILS
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white uppercase">
                {fullName}
              </h3>
              
              <p className="text-spider-redPrimary font-mono font-semibold text-sm">
                {displayDegree} — {college}
              </p>

              <p className="text-spider-textLight/90 text-base leading-relaxed pt-2">
                {bio}
              </p>

              {/* Core Interests Pills */}
              <div className="pt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-spider-darkBg border border-spider-darkBorder rounded-full text-xs font-mono text-spider-textMuted flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-spider-redPrimary" /> Artificial Intelligence
                </span>
                <span className="px-3 py-1 bg-spider-darkBg border border-spider-darkBorder rounded-full text-xs font-mono text-spider-textMuted flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-spider-blueSubtle" /> Machine Learning
                </span>
                <span className="px-3 py-1 bg-spider-darkBg border border-spider-darkBorder rounded-full text-xs font-mono text-spider-textMuted flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-spider-redPrimary" /> Web Systems
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats / Info Cards */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="p-6 bg-spider-darkCard/80 border border-spider-darkBorder rounded-xl backdrop-blur-md">
              <span className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
                INSTITUTION
              </span>
              <h4 className="font-display font-bold text-white text-lg">
                {college}
              </h4>
              <p className="text-xs font-mono text-spider-redPrimary mt-1">
                B.Tech Computer Science Engineering
              </p>
            </div>

            <div className="p-6 bg-spider-darkCard/80 border border-spider-darkBorder rounded-xl backdrop-blur-md">
              <span className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
                SPECIALIZATION
              </span>
              <h4 className="font-display font-bold text-white text-lg">
                Artificial Intelligence & Machine Learning
              </h4>
              <p className="text-xs font-mono text-spider-blueSubtle mt-1">
                AI/ML Focused Curriculum
              </p>
            </div>

            <div className="p-6 bg-spider-darkCard/80 border border-spider-darkBorder rounded-xl backdrop-blur-md">
              <span className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
                LOCATION
              </span>
              <h4 className="font-display font-bold text-white text-lg">
                Andhra Pradesh, India
              </h4>
              <p className="text-xs font-mono text-spider-textMuted mt-1">
                Ready for Remote & Hybrid Roles
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

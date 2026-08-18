import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, CheckCircle } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export const EducationSection = () => {
  const { education } = usePortfolioData();

  return (
    <section id="education" className="relative py-24 z-10 bg-spider-darkBg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <span className="text-xs font-mono text-spider-redPrimary tracking-widest uppercase mb-2">
            06 / EDUCATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            ORIGIN STORY
          </h2>
          <div className="w-20 h-1 bg-spider-redPrimary mt-3 rounded-full" />
        </div>

        {/* Education List */}
        <div className="max-w-4xl space-y-6">
          {education.map((edu, idx) => (
            <motion.div
              key={edu._id || edu.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-spider-darkCard border border-spider-darkBorder hover:border-spider-redPrimary/60 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden transition-all shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-spider-redDark/20 border border-spider-redPrimary/40 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-spider-redPrimary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white uppercase">
                        {edu.institution}
                      </h3>
                      <p className="text-sm font-mono text-spider-redPrimary font-semibold">
                        {edu.displayTitle || `${edu.degree} — ${edu.branch} (${edu.specialization})`}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-spider-textLight/90 max-w-2xl leading-relaxed pt-2">
                    {edu.description || "Undergraduate degree focusing on Artificial Intelligence, Machine Learning models, Neural Networks, Data Structures, and Software Engineering."}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 bg-spider-darkBg border border-spider-darkBorder text-xs font-mono text-spider-textMuted rounded-md flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-spider-blueSubtle" /> AI & ML Specialization
                    </span>
                    <span className="px-3 py-1 bg-spider-darkBg border border-spider-darkBorder text-xs font-mono text-spider-textMuted rounded-md flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-spider-redPrimary" /> Computer Science Engineering
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

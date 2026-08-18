import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Award, FileText } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export const ExperienceSection = () => {
  const { experience } = usePortfolioData();

  return (
    <section id="experience" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <span className="text-xs font-mono text-spider-redPrimary tracking-widest uppercase mb-2">
            05 / EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            FIELD EXPERIENCE
          </h2>
          <div className="w-20 h-1 bg-spider-redPrimary mt-3 rounded-full" />
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl space-y-8">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp._id || exp.id || idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-spider-darkCard border border-spider-darkBorder hover:border-spider-redPrimary/60 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden transition-all duration-300 shadow-xl"
            >
              {/* Top Row: Title, Company, Status Pill */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-spider-darkBorder pb-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-spider-redDark/20 border border-spider-redPrimary/40 text-spider-redPrimary text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                    <Award className="w-3.5 h-3.5" />
                    {exp.status || "INTERNSHIP / OFFER"}
                  </span>
                  
                  <h3 className="text-2xl font-display font-bold text-white uppercase">
                    {exp.role}
                  </h3>
                  
                  <h4 className="text-lg font-mono font-semibold text-spider-redPrimary mt-1">
                    {exp.company}
                  </h4>
                </div>

                <div className="flex flex-col sm:items-end text-xs font-mono text-spider-textMuted space-y-1">
                  <span className="flex items-center gap-1.5 text-spider-blueSubtle">
                    <Calendar className="w-3.5 h-3.5" /> Duration: {exp.duration}
                  </span>
                  {exp.offerDate && (
                    <span>Offer Date: {exp.offerDate}</span>
                  )}
                  {exp.type && (
                    <span className="text-spider-textLight font-semibold">{exp.type}</span>
                  )}
                </div>
              </div>

              {/* Responsibilities & Certificate Column */}
              <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Certificate Column */}
                {exp.certificatePath && (
                  <div className="lg:col-span-4 bg-spider-darkBg p-5 rounded-xl border border-spider-redPrimary/30 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-spider-redPrimary text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                        <Award className="w-3.5 h-3.5" /> VERIFIED CERTIFICATE
                      </div>
                      <p className="text-xs font-mono font-bold text-white">
                        {exp.company} Document
                      </p>
                    </div>
                    <a
                      href={exp.certificatePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-spider-redDark/30 hover:bg-spider-redPrimary border border-spider-redPrimary/60 text-white text-xs font-mono rounded-xl flex items-center justify-center gap-2 transition-all shadow-spider-glow"
                    >
                      <FileText className="w-4 h-4" /> View Certificate PDF
                    </a>
                  </div>
                )}

                {/* Responsibilities list */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className={exp.certificatePath ? "lg:col-span-8 space-y-3" : "lg:col-span-12 space-y-3"}>
                    <h5 className="text-xs font-mono uppercase tracking-widest text-spider-textMuted mb-2">
                      Key Scope & Field Responsibilities:
                    </h5>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li
                          key={rIdx}
                          className="flex items-start gap-2 text-xs font-sans text-spider-textLight/90 bg-spider-darkBg/60 p-3 rounded-lg border border-spider-darkBorder"
                        >
                          <CheckCircle2 className="w-4 h-4 text-spider-redPrimary shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

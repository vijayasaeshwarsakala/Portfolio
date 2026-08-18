import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Rocket, Brain, CheckCircle, Shield, FileText } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';

const iconMap = {
  Award: Award,
  Rocket: Rocket,
  Brain: Brain,
  CheckCircle: CheckCircle,
  Shield: Shield,
  Trophy: Trophy
};

export const AchievementsSection = () => {
  const { achievements } = usePortfolioData();

  return (
    <section id="achievements" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <span className="text-xs font-mono text-spider-redPrimary tracking-widest uppercase mb-2">
            07 / ACHIEVEMENTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            MISSIONS COMPLETED
          </h2>
          <div className="w-20 h-1 bg-spider-redPrimary mt-3 rounded-full" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Trophy;

            return (
              <motion.div
                key={item._id || item.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-spider-darkCard border border-spider-darkBorder hover:border-spider-redPrimary/60 rounded-xl p-6 backdrop-blur-md transition-all duration-300 hover:shadow-spider-glow flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-spider-redDark/20 border border-spider-redPrimary/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5 text-spider-redPrimary" />
                    </div>
                    {item.highlight && (
                      <span className="text-[10px] font-mono text-spider-blueSubtle bg-spider-blueDark/20 px-2.5 py-1 rounded border border-spider-blueSubtle/30 font-semibold">
                        {item.highlight}
                      </span>
                    )}
                  </div>

                  <h4 className="font-display font-bold text-lg text-white group-hover:text-spider-redPrimary transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs font-mono text-spider-textMuted mt-1">
                    {item.organization} {item.date ? `• ${item.date}` : ''}
                  </p>

                  <p className="text-xs text-spider-textLight/80 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-spider-darkBorder flex items-center justify-between gap-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-spider-textMuted flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-spider-redPrimary shrink-0" /> Verified Record
                  </div>

                  {(item.certificatePath || item.credentialUrl) && (
                    <a
                      href={item.certificatePath || item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-spider-redDark/20 hover:bg-spider-redPrimary border border-spider-redPrimary/40 text-[10px] font-mono font-bold text-white rounded-lg flex items-center gap-1 transition-all"
                    >
                      <FileText className="w-3 h-3 text-spider-redPrimary group-hover:text-white" /> View Certificate
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

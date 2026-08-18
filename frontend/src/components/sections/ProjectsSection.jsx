import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ExternalLink, Github, ShieldAlert } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export const ProjectsSection = () => {
  const { projects } = usePortfolioData();
  const isEmpty = !projects || projects.length === 0;

  return (
    <section id="projects" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <span className="text-xs font-mono text-spider-redPrimary tracking-widest uppercase mb-2">
            03 / PROJECTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            MY MISSIONS
          </h2>
          <div className="w-20 h-1 bg-spider-redPrimary mt-3 rounded-full" />
        </div>

        {isEmpty ? (
          /* Professional Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 bg-spider-darkCard/80 border border-dashed border-spider-redPrimary/40 rounded-2xl text-center flex flex-col items-center justify-center max-w-3xl mx-auto backdrop-blur-md"
          >
            <ShieldAlert className="w-16 h-16 text-spider-redPrimary mb-4 animate-pulse" />
            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">
              NO MISSIONS LOGGED YET
            </h3>
            <p className="text-sm font-sans text-spider-textMuted max-w-md mt-3 leading-relaxed">
              No project records have been published yet. Real AI/ML models and software missions will appear here once submitted by the user through the Admin Dashboard.
            </p>
          </motion.div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-spider-darkCard border border-spider-darkBorder hover:border-spider-redPrimary/60 rounded-2xl overflow-hidden group transition-all duration-300 shadow-xl flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-48 bg-spider-darkBg overflow-hidden">
                  <img
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-spider-darkCard via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-spider-redPrimary block mb-1">
                      {project.category || 'AI / ML Mission'}
                    </span>
                    <h4 className="font-display font-bold text-xl text-white group-hover:text-spider-redPrimary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs text-spider-textMuted font-sans leading-relaxed mt-2 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 bg-spider-darkBg border border-spider-darkBorder text-[10px] font-mono text-spider-textMuted rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-spider-darkBorder">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-spider-textMuted hover:text-white flex items-center gap-1.5"
                      >
                        <Github className="w-4 h-4" /> Code
                      </a>
                    ) : <span />}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-spider-redPrimary hover:bg-spider-redGlow text-white text-xs font-mono rounded-lg flex items-center gap-1.5 shadow-spider-glow"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Launch Mission
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

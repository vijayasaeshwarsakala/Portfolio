import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Mail, Github, Linkedin, ArrowRight, Shield, Award } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useSpiderSense } from '../../context/SpiderSenseContext';

export const HeroSection = () => {
  const { profile, activeResume, socials } = usePortfolioData();
  const { spiderSenseActive } = useSpiderSense();

  const fullName = profile?.fullName || "SAKALA Vijaya Saeshwar";
  const heroLabel = profile?.heroLabel || "YOUR FRIENDLY NEIGHBORHOOD DEVELOPER";
  const displayDegree = profile?.displayDegree || "B.Tech — CSE (AI & ML)";
  const title = profile?.title || "AI & ML ENTHUSIAST";
  const email = socials?.email || "vijayasaeshwarsakala@gmail.com";
  const githubUrl = socials?.githubUrl;
  const linkedinUrl = socials?.linkedinUrl;

  const handleDownloadResume = () => {
    if (activeResume?.filePath) {
      window.open(activeResume.filePath, '_blank');
    } else {
      alert("RESUME WILL BE AVAILABLE SOON. Please place your resume file inside public/user-data/resume/ or upload via Admin Dashboard.");
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Text Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-spider-redDark/20 border border-spider-redPrimary/40 text-spider-redPrimary text-xs font-mono tracking-widest uppercase shadow-spider-glow">
            <Shield className="w-3.5 h-3.5" />
            <span>{heroLabel}</span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h2 className="text-sm font-mono tracking-widest text-spider-textMuted uppercase">
              HI, I'M
            </h2>
            <h1 className={`font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-white uppercase ${spiderSenseActive ? 'text-spider-redGlow drop-shadow-[0_0_20px_rgba(229,9,20,0.8)]' : ''
              }`}>
              {fullName}
            </h1>
            <p className="text-xl sm:text-2xl font-mono font-bold text-spider-redPrimary tracking-wide">
              {displayDegree}
            </p>
            <p className="text-base text-spider-textMuted font-mono uppercase tracking-wider">
              {title}
            </p>
          </div>

          {/* Tagline / Pitch */}
          <p className="text-base sm:text-lg text-spider-textLight/90 max-w-2xl font-sans leading-relaxed">
            {profile?.tagline || "Building intelligent systems, machine learning models, and futuristic digital applications."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-xl bg-spider-redPrimary hover:bg-spider-redGlow text-white font-display font-semibold text-sm tracking-wider uppercase flex items-center gap-2 shadow-spider-glow transition-all hover:scale-105"
            >
              <Eye className="w-4 h-4" />
              VIEW MY WORK
            </a>

            <a
              href="#certificates"
              className="px-6 py-3.5 rounded-xl bg-spider-darkCard border border-spider-darkBorder hover:border-spider-redPrimary text-white font-display font-semibold text-sm tracking-wider uppercase flex items-center gap-2 transition-all hover:scale-105"
            >
              <Award className="w-4 h-4 text-spider-redPrimary" />
              VIEW CERTIFICATES
            </a>

            <button
              onClick={handleDownloadResume}
              className="px-6 py-3.5 rounded-xl bg-spider-darkCard border border-spider-darkBorder hover:border-spider-blueSubtle text-spider-textLight hover:text-white font-display font-semibold text-sm tracking-wider uppercase flex items-center gap-2 transition-all hover:scale-105"
            >
              <Download className="w-4 h-4 text-spider-blueSubtle" />
              {activeResume ? "DOWNLOAD RESUME" : "RESUME WILL BE AVAILABLE SOON"}
            </button>

            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl bg-spider-darkBg border border-spider-darkBorder text-spider-textMuted hover:text-spider-redPrimary hover:border-spider-redPrimary/40 font-display font-semibold text-sm tracking-wider uppercase flex items-center gap-2 transition-all"
            >
              <Mail className="w-4 h-4" />
              CONTACT ME
            </a>
          </div>

          {/* Social Links */}
          <div className="pt-6 flex items-center gap-4 border-t border-spider-darkBorder/60">
            <span className="text-xs font-mono text-spider-textMuted uppercase tracking-wider">
              TRANSMISSION CHANNELS:
            </span>

            {/* Email link (always known) */}
            <a
              href={`mailto:${email}`}
              className="p-2.5 rounded-lg bg-spider-darkCard border border-spider-darkBorder text-spider-textMuted hover:text-spider-redPrimary hover:border-spider-redPrimary/50 transition-all"
              title={`Email: ${email}`}
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* GitHub link (Hidden if not provided) */}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-spider-darkCard border border-spider-darkBorder text-spider-textMuted hover:text-spider-redPrimary hover:border-spider-redPrimary/50 transition-all"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {/* LinkedIn link (Hidden if not provided) */}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-spider-darkCard border border-spider-darkBorder text-spider-textMuted hover:text-spider-redPrimary hover:border-spider-redPrimary/50 transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Right Photo Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">

            {/* Outer Spider Glowing Frame */}
            <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-tr from-spider-redDark via-spider-redPrimary to-spider-blueSubtle opacity-60 blur-xl group-hover:opacity-100 transition duration-1000 ${spiderSenseActive ? 'opacity-100 blur-2xl animate-pulse' : ''
              }`} />

            {/* Photo Container */}
            <div className="relative w-full h-full rounded-2xl bg-spider-darkCard border-2 border-spider-redPrimary/50 overflow-hidden shadow-2xl">
              <img
                src={profile?.profilePhoto || "/user-data/profile-photo/profile.jpg"}
                alt="SAKALA Vijaya Saeshwar"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                onError={(e) => {
                  // Fallback avatar if local image not placed yet
                  e.target.onerror = null;
                  e.target.src = "https://cdn.corenexis.com/f/jWrQZRBnMHV.jpg";
                }}
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-spider-darkBg via-transparent to-transparent opacity-80" />

              {/* Floating Status Pill */}
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-spider-darkCard/90 backdrop-blur-md border border-spider-darkBorder rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-spider-redPrimary animate-ping" />
                  <span className="font-mono text-spider-textLight text-[11px] uppercase tracking-wider">
                    PRAGATI ENGINEERING COLLEGE
                  </span>
                </div>
                <span className="font-mono text-[10px] text-spider-redPrimary font-bold">
                  AI & ML
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

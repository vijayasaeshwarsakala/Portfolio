import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Search, FileText, CheckCircle, ExternalLink, Filter } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { PDFViewerModal } from '../common/PDFViewerModal';

export const CertificatesSection = () => {
  const { certificates } = usePortfolioData();
  const [selectedCert, setSelectedCert] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'AI & Machine Learning', 'Data Science', 'Cybersecurity', 'Career Skills', 'Competitions & Workshops'];

  const filteredCerts = certificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.organization.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' ||
      (selectedCategory === 'AI & Machine Learning' && cert.category.includes('AI')) ||
      (selectedCategory === 'Data Science' && cert.category.includes('Data')) ||
      (selectedCategory === 'Cybersecurity' && cert.category.includes('Cyber')) ||
      (selectedCategory === 'Competitions & Workshops' && (cert.category.includes('Entrepreneurship') || cert.category.includes('Social') || cert.category.includes('Innovation')));

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="certificates" className="relative py-24 z-10 bg-spider-darkBg/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-10">
          <span className="text-xs font-mono text-spider-redPrimary tracking-widest uppercase mb-2">
            04 / CERTIFICATES
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            ACHIEVEMENTS UNLOCKED
          </h2>
          <div className="w-20 h-1 bg-spider-redPrimary mt-3 rounded-full" />
          <p className="text-xs font-mono text-spider-textMuted mt-3">
            {certificates.length} Verified Certificates & Academic Credentials
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-spider-redPrimary text-white shadow-spider-glow'
                    : 'bg-spider-darkCard border border-spider-darkBorder text-spider-textMuted hover:border-spider-redPrimary/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-spider-textMuted" />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-spider-darkCard border border-spider-darkBorder rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-spider-textMuted focus:outline-none focus:border-spider-redPrimary transition-colors"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, idx) => (
            <motion.div
              key={cert._id || cert.id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedCert(cert)}
              className="bg-spider-darkCard border border-spider-darkBorder hover:border-spider-redPrimary/70 rounded-xl p-6 cursor-pointer group transition-all duration-300 hover:shadow-spider-glow flex flex-col justify-between"
            >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-spider-redPrimary bg-spider-redDark/20 px-2.5 py-0.5 rounded border border-spider-redPrimary/30">
                    {cert.category || 'CERTIFIED'}
                  </span>
                  <CheckCircle className="w-4 h-4 text-spider-redPrimary" />
                </div>

                {/* Title */}
                <h4 className="font-display font-bold text-base text-white group-hover:text-spider-redPrimary transition-colors line-clamp-2">
                  {cert.title}
                </h4>

                {/* Organization & Date */}
                <p className="text-xs font-mono text-spider-textMuted mt-1">
                  {cert.organization}
                </p>
                {cert.issueDate && (
                  <p className="text-[11px] font-mono text-spider-blueSubtle mt-0.5">
                    Issued: {cert.issueDate}
                  </p>
                )}

                {/* Description */}
                <p className="text-xs text-spider-textMuted/90 mt-3 line-clamp-3 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Action Prompt */}
              <div className="pt-4 mt-4 border-t border-spider-darkBorder flex items-center justify-between text-xs font-mono text-spider-textMuted group-hover:text-spider-redPrimary transition-colors">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> View PDF Credential
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Lightbox */}
        <PDFViewerModal
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />

      </div>
    </section>
  );
};

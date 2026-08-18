import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, CheckCircle2, ShieldAlert } from 'lucide-react';
import { sendContactMessage } from '../../services/api';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export const ContactSection = () => {
  const { socials } = usePortfolioData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ loading: false, success: false, error: 'Please fill in Name, Email, and Message.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });
    try {
      await sendContactMessage(formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: null });
      }, 6000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'Transmission failed. Please try again.' });
    }
  };

  return (
    <section id="contact" className="relative py-24 z-10 bg-spider-darkBg/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <span className="text-xs font-mono text-spider-redPrimary tracking-widest uppercase mb-2">
            08 / CONTACT
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            LET'S BUILD SOMETHING
          </h2>
          <div className="w-20 h-1 bg-spider-redPrimary mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-8 backdrop-blur-md space-y-6">
              <h3 className="text-xl font-display font-bold text-white uppercase">
                DIRECT TRANSMISSION
              </h3>
              <p className="text-sm font-sans text-spider-textMuted leading-relaxed">
                Have an AI/ML project, software collaboration, or opportunity? Send a signal directly to my inbox.
              </p>

              <div className="space-y-4 pt-4 border-t border-spider-darkBorder">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-spider-redDark/20 border border-spider-redPrimary/40 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-spider-redPrimary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-spider-textMuted uppercase block">EMAIL</span>
                    <a
                      href={`mailto:${socials?.email || 'vijayasaeshwarsakala@gmail.com'}`}
                      className="text-sm font-mono text-white hover:text-spider-redPrimary transition-colors"
                    >
                      {socials?.email || 'vijayasaeshwarsakala@gmail.com'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-8 backdrop-blur-md space-y-5 shadow-2xl"
            >
              {status.success && (
                <div className="p-4 bg-spider-redDark/20 border border-spider-redPrimary rounded-xl flex items-center gap-3 text-spider-redGlow text-xs font-mono font-bold uppercase">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  MISSION TRANSMITTED SUCCESSFULLY.
                </div>
              )}

              {status.error && (
                <div className="p-4 bg-red-950/40 border border-red-500 rounded-xl flex items-center gap-3 text-red-400 text-xs font-mono">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  {status.error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1.5">
                    NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-spider-textMuted focus:outline-none focus:border-spider-redPrimary transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1.5">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-spider-textMuted focus:outline-none focus:border-spider-redPrimary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1.5">
                  SUBJECT
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project / Collaboration Opportunity"
                  className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-spider-textMuted focus:outline-none focus:border-spider-redPrimary transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1.5">
                  MESSAGE *
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your transmission here..."
                  required
                  className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-spider-textMuted focus:outline-none focus:border-spider-redPrimary transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 bg-spider-redPrimary hover:bg-spider-redGlow text-white font-display font-semibold text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-spider-glow transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {status.loading ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

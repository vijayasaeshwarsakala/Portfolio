import React, { useState, useEffect } from 'react';
import { Share2, Save, CheckCircle2 } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import API from '../../services/api';

export const SocialsManager = () => {
  const { socials, refreshData } = usePortfolioData();
  const [formData, setFormData] = useState({
    email: 'vijayasaeshwarsakala@gmail.com',
    githubUrl: '',
    linkedinUrl: '',
    instagramUrl: '',
    portfolioUrl: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (socials) {
      setFormData({
        email: socials.email || 'vijayasaeshwarsakala@gmail.com',
        githubUrl: socials.githubUrl || '',
        linkedinUrl: socials.linkedinUrl || '',
        instagramUrl: socials.instagramUrl || '',
        portfolioUrl: socials.portfolioUrl || ''
      });
    }
  }, [socials]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await API.put('/socials', formData);
      await refreshData();
      setMessage({ type: 'success', text: 'Transmission social links updated! Website icons updated.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update social links' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-spider-darkBorder pb-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white uppercase">
            Transmission & Social Channels
          </h2>
          <p className="text-xs font-mono text-spider-textMuted">
            Icons dynamically display on website only when valid URLs exist.
          </p>
        </div>
        <Share2 className="w-6 h-6 text-spider-redPrimary" />
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-xs font-mono flex items-center gap-2 ${
          message.type === 'success' ? 'bg-spider-redDark/20 border border-spider-redPrimary text-white' : 'bg-red-950/40 border border-red-500 text-red-400'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-spider-redPrimary" />
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">GitHub Profile URL</label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="Leave empty until created"
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder="Leave empty until created"
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Instagram URL (Optional)</label>
            <input
              type="url"
              name="instagramUrl"
              value={formData.instagramUrl}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Deployed Portfolio URL</label>
            <input
              type="url"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleChange}
              placeholder="https://sakala-portfolio.vercel.app"
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-spider-redPrimary hover:bg-spider-redGlow text-white text-xs font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-spider-glow transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> Save Social Links
        </button>
      </form>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Save, User, CheckCircle2 } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import API from '../../services/api';

export const ProfileEditor = () => {
  const { profile, refreshData } = usePortfolioData();
  const [formData, setFormData] = useState({
    fullName: 'SAKALA Vijaya Saeshwar',
    title: 'AI & ML ENTHUSIAST',
    tagline: '',
    bio: '',
    email: 'vijayasaeshwarsakala@gmail.com',
    location: 'Kakinada, Andhra Pradesh, India',
    profilePhoto: '/user-data/profile-photo/profile.jpg'
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || 'SAKALA Vijaya Saeshwar',
        title: profile.title || 'AI & ML ENTHUSIAST',
        tagline: profile.tagline || '',
        bio: profile.bio || '',
        email: profile.email || 'vijayasaeshwarsakala@gmail.com',
        location: profile.location || '',
        profilePhoto: profile.profilePhoto || '/user-data/profile-photo/profile.jpg'
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await API.put('/profile', formData);
      await refreshData();
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-spider-darkBorder pb-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white uppercase">
            Profile Settings
          </h2>
          <p className="text-xs font-mono text-spider-textMuted">
            Update your public developer identity details.
          </p>
        </div>
        <User className="w-6 h-6 text-spider-redPrimary" />
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-xs font-mono flex items-center gap-2 ${
          message.type === 'success' ? 'bg-spider-redDark/20 border border-spider-redPrimary text-white' : 'bg-red-950/40 border border-red-500 text-red-400'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-spider-redPrimary" />
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
              Professional Title / Designation
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="AI & ML ENTHUSIAST"
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
            Tagline
          </label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            placeholder="Building intelligent systems & futuristic digital experiences"
            className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
            Biography / Bio
          </label>
          <textarea
            name="bio"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write your bio here..."
            className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
              Profile Photo Relative Path
            </label>
            <input
              type="text"
              name="profilePhoto"
              value={formData.profilePhoto}
              onChange={handleChange}
              placeholder="/user-data/profile-photo/profile.jpg"
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-spider-redPrimary hover:bg-spider-redGlow text-white text-xs font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-spider-glow transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
};

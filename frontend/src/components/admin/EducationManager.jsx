import React, { useState } from 'react';
import { GraduationCap, Save } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import API from '../../services/api';

export const EducationManager = () => {
  const { education, refreshData } = usePortfolioData();
  const currentEdu = education[0] || {};

  const [formData, setFormData] = useState({
    institution: currentEdu.institution || 'Pragati Engineering College',
    degree: currentEdu.degree || 'B.Tech',
    branch: currentEdu.branch || 'Computer Science Engineering',
    specialization: currentEdu.specialization || 'Artificial Intelligence & Machine Learning',
    displayTitle: currentEdu.displayTitle || 'B.Tech — CSE (AI & ML)',
    description: currentEdu.description || '',
    cgpa: currentEdu.cgpa || '',
    graduationYear: currentEdu.graduationYear || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eduId = currentEdu._id || currentEdu.id;
      if (eduId) {
        await API.put(`/education/${eduId}`, formData);
      } else {
        await API.post('/education', formData);
      }
      await refreshData();
      alert('Education record updated!');
    } catch (err) {
      alert(err.message || 'Failed to update education record');
    }
  };

  return (
    <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-spider-darkBorder pb-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white uppercase">
            Education Record
          </h2>
          <p className="text-xs font-mono text-spider-textMuted">
            Manage academic information. Leave CGPA/Graduation year empty until officially awarded.
          </p>
        </div>
        <GraduationCap className="w-6 h-6 text-spider-redPrimary" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Institution Name</label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData(p => ({ ...p, institution: e.target.value }))}
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Degree Title</label>
            <input
              type="text"
              value={formData.displayTitle}
              onChange={(e) => setFormData(p => ({ ...p, displayTitle: e.target.value }))}
              placeholder="B.Tech — CSE (AI & ML)"
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">CGPA / Percentage (Optional)</label>
            <input
              type="text"
              value={formData.cgpa}
              onChange={(e) => setFormData(p => ({ ...p, cgpa: e.target.value }))}
              placeholder="Leave empty until provided"
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Graduation Year (Optional)</label>
            <input
              type="text"
              value={formData.graduationYear}
              onChange={(e) => setFormData(p => ({ ...p, graduationYear: e.target.value }))}
              placeholder="Leave empty until provided"
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-spider-redPrimary hover:bg-spider-redGlow text-white text-xs font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-spider-glow transition-all"
        >
          <Save className="w-4 h-4" /> Save Education Record
        </button>
      </form>
    </div>
  );
};

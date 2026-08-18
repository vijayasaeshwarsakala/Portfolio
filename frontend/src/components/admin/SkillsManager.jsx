import React, { useState } from 'react';
import { Cpu, Plus, Trash2 } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import API from '../../services/api';

export const SkillsManager = () => {
  const { skills, refreshData } = usePortfolioData();
  const [formData, setFormData] = useState({
    name: '',
    category: 'AI / ML',
    proficiency: 85
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/skills', formData);
      setFormData({ name: '', category: 'AI / ML', proficiency: 85 });
      await refreshData();
    } catch (err) {
      alert(err.message || 'Failed to add skill');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/skills/${id}`);
      await refreshData();
    } catch (err) {
      alert(err.message || 'Failed to delete skill');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-spider-darkBorder pb-4">
          <h2 className="text-xl font-display font-bold text-white uppercase">
            Add Technical Skill (Power)
          </h2>
          <Cpu className="w-6 h-6 text-spider-redPrimary" />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Skill Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Python, PyTorch"
              required
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            >
              <option value="AI / ML">AI / ML</option>
              <option value="Programming">Programming</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Databases">Databases</option>
              <option value="Tools">Tools</option>
              <option value="Soft Skills">Soft Skills</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-spider-redPrimary hover:bg-spider-redGlow text-white text-xs font-mono uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-spider-glow transition-all"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </button>
        </form>
      </div>

      <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-display font-bold text-white uppercase">
          Skill Database ({skills.length})
        </h3>
        {skills.length === 0 ? (
          <p className="text-xs font-mono text-spider-textMuted italic">No skills added yet. Showing empty state on website.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map((s) => (
              <div key={s._id || s.id} className="p-3 bg-spider-darkBg border border-spider-darkBorder rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">{s.name}</span>
                  <span className="text-[10px] font-mono text-spider-textMuted">{s.category} ({s.proficiency}%)</span>
                </div>
                <button onClick={() => handleDelete(s._id || s.id)} className="p-1.5 text-spider-redPrimary hover:bg-spider-darkCard rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

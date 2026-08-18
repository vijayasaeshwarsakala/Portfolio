import React, { useState } from 'react';
import { Trophy, Plus, Trash2, Edit, Save } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import API from '../../services/api';

export const AchievementsManager = () => {
  const { achievements, refreshData } = usePortfolioData();
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    date: '',
    category: 'Competition',
    description: '',
    highlight: '',
    certificatePath: ''
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (file) {
        const data = new FormData();
        data.append('title', formData.title);
        data.append('organization', formData.organization);
        data.append('date', formData.date);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('highlight', formData.highlight);
        data.append('certificatePath', formData.certificatePath);
        data.append('certificateFile', file);

        if (editingId) {
          await API.put(`/achievements/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        } else {
          await API.post('/achievements', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        }
      } else {
        if (editingId) {
          await API.put(`/achievements/${editingId}`, formData);
        } else {
          await API.post('/achievements', formData);
        }
      }

      setFormData({ title: '', organization: '', date: '', category: 'Competition', description: '', highlight: '', certificatePath: '' });
      setFile(null);
      setEditingId(null);
      await refreshData();
    } catch (err) {
      alert(err.message || 'Failed to save achievement record');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ach) => {
    setEditingId(ach._id || ach.id);
    setFormData({
      title: ach.title || '',
      organization: ach.organization || '',
      date: ach.date || '',
      category: ach.category || 'Competition',
      description: ach.description || '',
      highlight: ach.highlight || '',
      certificatePath: ach.certificatePath || ach.credentialUrl || ''
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return;
    try {
      await API.delete(`/achievements/${id}`);
      await refreshData();
    } catch (err) {
      alert(err.message || 'Failed to delete achievement');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-spider-darkBorder pb-4">
          <h2 className="text-xl font-display font-bold text-white uppercase">
            {editingId ? 'Edit Achievement' : 'Add Achievement / Mission Completed'}
          </h2>
          <Trophy className="w-6 h-6 text-spider-redPrimary" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                required
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Organization</label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData(p => ({ ...p, organization: e.target.value }))}
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Highlight Badge</label>
              <input
                type="text"
                value={formData.highlight}
                onChange={(e) => setFormData(p => ({ ...p, highlight: e.target.value }))}
                placeholder="e.g. 100K Special Event"
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Date</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData(p => ({ ...p, date: e.target.value }))}
                placeholder="2026"
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                placeholder="AI Competition"
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Certificate Relative Path (or URL)</label>
              <input
                type="text"
                value={formData.certificatePath}
                onChange={(e) => setFormData(p => ({ ...p, certificatePath: e.target.value }))}
                placeholder="/user-data/certificates/google-gemini-quizoff.pdf"
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Upload Certificate File</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl p-1.5 text-xs font-mono text-spider-textMuted"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Description</label>
            <textarea
              rows="2"
              value={formData.description}
              onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-spider-redPrimary hover:bg-spider-redGlow text-white text-xs font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-spider-glow transition-all disabled:opacity-50"
            >
              {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {loading ? 'Saving...' : (editingId ? 'Update Achievement' : 'Save Achievement')}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setFormData({ title: '', organization: '', date: '', category: 'Competition', description: '', highlight: '', certificatePath: '' }); setFile(null); }}
                className="px-4 py-2.5 bg-spider-darkBg border border-spider-darkBorder text-spider-textMuted text-xs font-mono rounded-xl hover:text-white"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-display font-bold text-white uppercase">
          Achievements ({achievements.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements.map((a) => (
            <div key={a._id || a.id} className="p-4 bg-spider-darkBg border border-spider-darkBorder rounded-xl flex items-center justify-between gap-4">
              <div>
                <h4 className="font-display font-bold text-white text-xs">{a.title}</h4>
                <p className="text-[11px] font-mono text-spider-textMuted">
                  {a.organization}
                  {(a.certificatePath || a.credentialUrl) && <span className="text-spider-redPrimary font-semibold ml-2">• Certificate Attached</span>}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => handleEdit(a)} className="p-1.5 text-spider-blueSubtle hover:bg-spider-darkCard rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(a._id || a.id)} className="p-1.5 text-spider-redPrimary hover:bg-spider-darkCard rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

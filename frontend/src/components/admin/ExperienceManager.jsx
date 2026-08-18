import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Edit, Upload, Save, FileText } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import API from '../../services/api';

export const ExperienceManager = () => {
  const { experience, refreshData } = usePortfolioData();
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    duration: '',
    offerDate: '',
    status: 'INTERNSHIP / OFFER',
    certificatePath: '',
    responsibilities: ''
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const respArray = typeof formData.responsibilities === 'string'
        ? formData.responsibilities.split('\n').filter(Boolean)
        : formData.responsibilities;

      if (file) {
        const data = new FormData();
        data.append('company', formData.company);
        data.append('role', formData.role);
        data.append('duration', formData.duration);
        data.append('offerDate', formData.offerDate);
        data.append('status', formData.status);
        data.append('certificatePath', formData.certificatePath);
        if (Array.isArray(respArray)) {
          respArray.forEach(r => data.append('responsibilities', r));
        }
        data.append('certificateFile', file);

        if (editingId) {
          await API.put(`/experience/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        } else {
          await API.post('/experience', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        }
      } else {
        const payload = { ...formData, responsibilities: respArray };
        if (editingId) {
          await API.put(`/experience/${editingId}`, payload);
        } else {
          await API.post('/experience', payload);
        }
      }

      setFormData({ company: '', role: '', duration: '', offerDate: '', status: 'INTERNSHIP / OFFER', certificatePath: '', responsibilities: '' });
      setFile(null);
      setEditingId(null);
      await refreshData();
    } catch (err) {
      alert(err.message || 'Failed to save experience record');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (exp) => {
    setEditingId(exp._id || exp.id);
    setFormData({
      company: exp.company || '',
      role: exp.role || '',
      duration: exp.duration || '',
      offerDate: exp.offerDate || '',
      status: exp.status || 'INTERNSHIP / OFFER',
      certificatePath: exp.certificatePath || '',
      responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : (exp.responsibilities || '')
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this experience entry?')) return;
    try {
      await API.delete(`/experience/${id}`);
      await refreshData();
    } catch (err) {
      alert(err.message || 'Failed to delete experience record');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-spider-darkBorder pb-4">
          <h2 className="text-xl font-display font-bold text-white uppercase">
            {editingId ? 'Edit Field Experience' : 'Add Field Experience'}
          </h2>
          <Briefcase className="w-6 h-6 text-spider-redPrimary" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Company / Organization *</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                placeholder="HoloGrad LLP"
                required
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Role / Designation *</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData(p => ({ ...p, role: e.target.value }))}
                placeholder="Digital Marketing Intern"
                required
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(p => ({ ...p, duration: e.target.value }))}
                placeholder="60 Working Days"
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Offer Date</label>
              <input
                type="text"
                value={formData.offerDate}
                onChange={(e) => setFormData(p => ({ ...p, offerDate: e.target.value }))}
                placeholder="18 June 2026"
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Status Badge</label>
              <input
                type="text"
                value={formData.status}
                onChange={(e) => setFormData(p => ({ ...p, status: e.target.value }))}
                placeholder="INTERNSHIP / OFFER"
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
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
                placeholder="/user-data/certificates/leadership.pdf"
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Upload Certificate / Proof PDF</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl p-1.5 text-xs font-mono text-spider-textMuted"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Key Responsibilities (One per line)</label>
            <textarea
              rows="3"
              value={formData.responsibilities}
              onChange={(e) => setFormData(p => ({ ...p, responsibilities: e.target.value }))}
              placeholder="Executing digital marketing campaigns&#10;Lead generation & nurturing"
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-spider-redPrimary hover:bg-spider-redGlow text-white text-xs font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-spider-glow transition-all disabled:opacity-50"
            >
              {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {loading ? 'Saving...' : (editingId ? 'Update Experience' : 'Save Experience')}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setFormData({ company: '', role: '', duration: '', offerDate: '', status: 'INTERNSHIP / OFFER', certificatePath: '', responsibilities: '' }); setFile(null); }}
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
          Field Experiences ({experience.length})
        </h3>
        <div className="space-y-3">
          {experience.map((e) => (
            <div key={e._id || e.id} className="p-4 bg-spider-darkBg border border-spider-darkBorder rounded-xl flex items-center justify-between gap-4">
              <div>
                <h4 className="font-display font-bold text-white text-sm">{e.role} — {e.company}</h4>
                <p className="text-xs font-mono text-spider-textMuted">
                  {e.status} • {e.duration}
                  {e.certificatePath && <span className="text-spider-redPrimary font-semibold ml-2">• Certificate Attached</span>}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(e)} className="p-2 text-spider-blueSubtle hover:bg-spider-darkCard rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(e._id || e.id)} className="p-2 text-spider-redPrimary hover:bg-spider-darkCard rounded-lg">
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

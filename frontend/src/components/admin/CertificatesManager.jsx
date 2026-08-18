import React, { useState } from 'react';
import { Award, Plus, Trash2, Edit, Upload, CheckCircle2 } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import API from '../../services/api';

export const CertificatesManager = () => {
  const { certificates, refreshData } = usePortfolioData();
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    issueDate: '',
    category: 'AI & Machine Learning',
    description: '',
    credentialUrl: '',
    filePath: ''
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (file) data.append('certificateFile', file);

      if (editingId) {
        await API.put(`/certificates/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await API.post('/certificates', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      setFormData({ title: '', organization: '', issueDate: '', category: 'AI & Machine Learning', description: '', credentialUrl: '', filePath: '' });
      setFile(null);
      setEditingId(null);
      await refreshData();
    } catch (err) {
      alert(err.message || 'Failed to save certificate');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cert) => {
    setEditingId(cert._id || cert.id);
    setFormData({
      title: cert.title,
      organization: cert.organization,
      issueDate: cert.issueDate || '',
      category: cert.category || 'AI & Machine Learning',
      description: cert.description || '',
      credentialUrl: cert.credentialUrl || '',
      filePath: cert.filePath || ''
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this certificate record?')) return;
    try {
      await API.delete(`/certificates/${id}`);
      await refreshData();
    } catch (err) {
      alert(err.message || 'Failed to delete certificate');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-spider-darkBorder pb-4">
          <h2 className="text-xl font-display font-bold text-white uppercase">
            {editingId ? 'Edit Certificate' : 'Upload / Add Certificate'}
          </h2>
          <Award className="w-6 h-6 text-spider-redPrimary" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Certificate Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Issuing Organization *</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Issue Date</label>
              <input
                type="text"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                placeholder="July 26, 2025"
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="AI & Machine Learning"
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Local Relative Path</label>
              <input
                type="text"
                name="filePath"
                value={formData.filePath}
                onChange={handleChange}
                placeholder="/user-data/certificates/ai-for-beginners.pdf"
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Upload File (PDF / Image)</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl p-2 text-xs font-mono text-spider-textMuted"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Description</label>
            <textarea
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-spider-redPrimary hover:bg-spider-redGlow text-white text-xs font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-spider-glow transition-all"
          >
            <Upload className="w-4 h-4" />
            {loading ? 'Processing...' : (editingId ? 'Update Certificate' : 'Save Certificate')}
          </button>
        </form>
      </div>

      <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-display font-bold text-white uppercase">
          Verified Certificates ({certificates.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {certificates.map((c) => (
            <div key={c._id || c.id} className="p-4 bg-spider-darkBg border border-spider-darkBorder rounded-xl flex items-center justify-between gap-4">
              <div>
                <h4 className="font-display font-bold text-white text-xs">{c.title}</h4>
                <p className="text-[11px] font-mono text-spider-textMuted">{c.organization} • {c.issueDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(c)} className="p-1.5 text-spider-blueSubtle hover:bg-spider-darkCard rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(c._id || c.id)} className="p-1.5 text-spider-redPrimary hover:bg-spider-darkCard rounded-lg">
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

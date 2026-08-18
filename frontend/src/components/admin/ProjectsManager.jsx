import React, { useState } from 'react';
import { Plus, Trash2, Edit, FolderGit2, Save } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import API from '../../services/api';

export const ProjectsManager = () => {
  const { projects, refreshData } = usePortfolioData();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'AI / ML',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: typeof formData.technologies === 'string'
        ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
        : formData.technologies
    };

    try {
      if (editingId) {
        await API.put(`/projects/${editingId}`, payload);
      } else {
        await API.post('/projects', payload);
      }
      setFormData({ title: '', description: '', category: 'AI / ML', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' });
      setEditingId(null);
      await refreshData();
    } catch (err) {
      alert(err.message || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id || project.id);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category || 'AI / ML',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || ''
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this mission/project?')) return;
    try {
      await API.delete(`/projects/${id}`);
      await refreshData();
    } catch (err) {
      alert(err.message || 'Failed to delete project');
    }
  };

  return (
    <div className="space-y-8">
      {/* Add / Edit Form */}
      <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-spider-darkBorder pb-4">
          <h2 className="text-xl font-display font-bold text-white uppercase">
            {editingId ? 'Edit Mission / Project' : 'Add New Mission / Project'}
          </h2>
          <FolderGit2 className="w-6 h-6 text-spider-redPrimary" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Project Title *</label>
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
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              >
                <option value="AI / ML">AI / ML</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Description *</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Technologies (Comma separated)</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="Python, PyTorch, React, Node.js"
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">GitHub URL</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Live Demo URL</label>
              <input
                type="url"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-2 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-spider-redPrimary hover:bg-spider-redGlow text-white text-xs font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-spider-glow transition-all"
            >
              {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {editingId ? 'Update Mission' : 'Create Mission'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setFormData({ title: '', description: '', category: 'AI / ML', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' }); }}
                className="px-4 py-2.5 bg-spider-darkBg border border-spider-darkBorder text-spider-textMuted text-xs font-mono rounded-xl"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Projects List */}
      <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-display font-bold text-white uppercase">
          Current Missions ({projects.length})
        </h3>
        {projects.length === 0 ? (
          <p className="text-xs font-mono text-spider-textMuted italic">No missions published yet.</p>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p._id || p.id} className="p-4 bg-spider-darkBg border border-spider-darkBorder rounded-xl flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-display font-bold text-white text-sm">{p.title}</h4>
                  <p className="text-xs font-mono text-spider-textMuted">{p.category} — {p.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(p)} className="p-2 text-spider-blueSubtle hover:bg-spider-darkCard rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(p._id || p.id)} className="p-2 text-spider-redPrimary hover:bg-spider-darkCard rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

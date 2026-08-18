import React, { useState } from 'react';
import { FileText, Upload, Trash2, Eye, Download, CheckCircle2 } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import API from '../../services/api';

export const ResumeManager = () => {
  const { activeResume, refreshData } = usePortfolioData();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a PDF resume file first.');
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const data = new FormData();
      data.append('resume', file);
      await API.post('/resume/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setFile(null);
      await refreshData();
      setMessage({ type: 'success', text: 'Active resume uploaded and updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to upload resume.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const resId = activeResume?._id || activeResume?.id;
    if (!resId) return;
    if (!confirm('Are you sure you want to delete the active resume?')) return;

    try {
      await API.delete(`/resume/${resId}`);
      await refreshData();
      setMessage({ type: 'success', text: 'Resume deleted.' });
    } catch (err) {
      alert(err.message || 'Failed to delete resume');
    }
  };

  return (
    <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-spider-darkBorder pb-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white uppercase">
            Resume Management
          </h2>
          <p className="text-xs font-mono text-spider-textMuted">
            Upload or replace the resume PDF for the "DOWNLOAD RESUME" buttons.
          </p>
        </div>
        <FileText className="w-6 h-6 text-spider-redPrimary" />
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-xs font-mono flex items-center gap-2 ${
          message.type === 'success' ? 'bg-spider-redDark/20 border border-spider-redPrimary text-white' : 'bg-red-950/40 border border-red-500 text-red-400'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-spider-redPrimary" />
          {message.text}
        </div>
      )}

      {/* Active Resume Card */}
      <div className="p-6 bg-spider-darkBg border border-spider-darkBorder rounded-xl space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-spider-textMuted">
          CURRENT ACTIVE RESUME STATUS
        </h3>
        
        {activeResume ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-spider-darkCard rounded-xl border border-spider-redPrimary/40">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-spider-redPrimary" />
              <div>
                <h4 className="font-display font-bold text-white text-sm">
                  {activeResume.title || 'SAKALA_Vijaya_Saeshwar_Resume.pdf'}
                </h4>
                <p className="text-[11px] font-mono text-spider-textMuted">
                  Uploaded: {new Date(activeResume.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={activeResume.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-spider-darkBg border border-spider-darkBorder text-xs font-mono text-white rounded-lg flex items-center gap-1.5 hover:border-spider-redPrimary"
              >
                <Eye className="w-3.5 h-3.5 text-spider-blueSubtle" /> View
              </a>

              <a
                href={activeResume.filePath}
                download
                className="px-3 py-1.5 bg-spider-redPrimary text-xs font-mono text-white rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </a>

              <button
                onClick={handleDelete}
                className="p-1.5 text-spider-redPrimary hover:bg-spider-darkBg rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 border border-dashed border-spider-darkBorder rounded-xl text-center">
            <p className="text-xs font-mono text-spider-textMuted">
              No active resume file found. Website shows <span className="text-spider-redPrimary font-bold">"RESUME WILL BE AVAILABLE SOON"</span>.
            </p>
            <p className="text-[11px] font-mono text-spider-textMuted mt-1">
              You can also manually place your resume PDF inside <code className="text-spider-redPrimary">public/user-data/resume/resume.pdf</code>.
            </p>
          </div>
        )}
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="space-y-4">
        <h4 className="text-sm font-display font-bold text-white uppercase">
          Upload / Replace Resume PDF
        </h4>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl p-3 text-xs font-mono text-spider-textMuted"
        />

        <button
          type="submit"
          disabled={loading || !file}
          className="px-6 py-3 bg-spider-redPrimary hover:bg-spider-redGlow text-white text-xs font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-spider-glow transition-all disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {loading ? 'Uploading Resume...' : 'Upload & Set Active Resume'}
        </button>
      </form>
    </div>
  );
};

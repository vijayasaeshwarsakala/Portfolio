import React, { useState } from 'react';
import { ShieldCheck, KeyRound, CheckCircle2, AlertCircle, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';

export const SecuritySettings = () => {
  const { admin } = useAuth();
  const [newUsername, setNewUsername] = useState(admin?.username || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!newUsername.trim()) {
      setMessage({ type: 'error', text: 'Username cannot be empty.' });
      return;
    }

    if (newPassword.length < 4) {
      setMessage({ type: 'error', text: 'New password must be at least 4 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New password and confirmation password do not match.' });
      return;
    }

    setLoading(true);
    try {
      const res = await API.put('/auth/credentials', {
        newUsername: newUsername.trim(),
        newPassword
      });
      if (res.data?.success) {
        setMessage({
          type: 'success',
          text: res.data.message || 'Credentials updated successfully! Use your new username & password next time you log in.'
        });
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'error', text: res.data?.message || 'Failed to update credentials' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || err.message || 'Error updating credentials.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-spider-darkBorder pb-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white uppercase">
            Admin Security & Credentials
          </h2>
          <p className="text-xs font-mono text-spider-textMuted">
            Update your admin login username and password.
          </p>
        </div>
        <ShieldCheck className="w-6 h-6 text-spider-redPrimary" />
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-xs font-mono flex items-center gap-2 ${
          message.type === 'success'
            ? 'bg-spider-redDark/20 border border-spider-redPrimary text-white'
            : 'bg-red-950/40 border border-red-500 text-red-400'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-spider-redPrimary shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
        <div>
          <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
            New Admin Username *
          </label>
          <div className="relative">
            <UserCheck className="w-4 h-4 text-spider-textMuted absolute left-3.5 top-3" />
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
              required
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
            New Password *
          </label>
          <div className="relative">
            <KeyRound className="w-4 h-4 text-spider-textMuted absolute left-3.5 top-3" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
            Confirm New Password *
          </label>
          <div className="relative">
            <KeyRound className="w-4 h-4 text-spider-textMuted absolute left-3.5 top-3" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white focus:border-spider-redPrimary focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-spider-redPrimary hover:bg-spider-redGlow text-white text-xs font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-spider-glow transition-all disabled:opacity-50"
        >
          <KeyRound className="w-4 h-4" />
          {loading ? 'Updating Credentials...' : 'Update Admin Credentials'}
        </button>
      </form>
    </div>
  );
};

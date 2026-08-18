import React, { useState } from 'react';
import { Shield, Lock, ArrowLeft, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLoginPage = ({ onBackToHome, onSuccess }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        onSuccess();
      } else {
        setError('Incorrect password or username. Please check your credentials.');
      }
    } catch (err) {
      let errMsg = err.message || 'Incorrect password or username. Access denied.';
      if (errMsg.includes('401')) {
        errMsg = 'Incorrect password or username. Access denied.';
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-spider-darkBg text-spider-textLight flex items-center justify-center p-4 web-overlay relative z-50">
      <div className="w-full max-w-md bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-8 shadow-2xl space-y-6">
        
        {/* Back Link */}
        <button
          onClick={onBackToHome}
          className="text-xs font-mono text-spider-textMuted hover:text-spider-redPrimary flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Website
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-spider-redDark/20 border border-spider-redPrimary/40 flex items-center justify-center mx-auto shadow-spider-glow">
            <Lock className="w-6 h-6 text-spider-redPrimary" />
          </div>
          <h2 className="font-display font-bold text-2xl text-white uppercase tracking-wider">
            ADMIN AUTHENTICATION
          </h2>
          <p className="text-xs font-mono text-spider-textMuted">
            SAKALA VIJAYA SAESHWAR CONTROL PANEL
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/50 border border-red-500 rounded-xl text-xs font-mono text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-spider-redPrimary transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-spider-textMuted uppercase block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-spider-darkBg border border-spider-darkBorder rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-spider-redPrimary transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-spider-redPrimary hover:bg-spider-redGlow text-white font-display font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-spider-glow transition-all disabled:opacity-50"
          >
            <KeyRound className="w-4 h-4" />
            {loading ? 'Authenticating...' : 'Authenticate'}
          </button>
        </form>

      </div>
    </div>
  );
};

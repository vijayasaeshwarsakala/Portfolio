import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Calendar, RefreshCw } from 'lucide-react';
import API from '../../services/api';

export const MessagesViewer = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await API.get('/contact');
      if (res.data?.data) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.log('Unable to load messages from backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="bg-spider-darkCard border border-spider-darkBorder rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-spider-darkBorder pb-4">
        <div>
          <h2 className="text-xl font-display font-bold text-white uppercase">
            Received Transmissions ({messages.length})
          </h2>
          <p className="text-xs font-mono text-spider-textMuted">
            Messages sent through public portfolio contact form.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchMessages}
            disabled={loading}
            className="px-3 py-1.5 bg-spider-darkBg border border-spider-darkBorder text-xs font-mono text-white rounded-lg flex items-center gap-1.5 hover:border-spider-redPrimary transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh Messages
          </button>
          <MessageSquare className="w-6 h-6 text-spider-redPrimary" />
        </div>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-spider-textMuted">Loading transmissions...</p>
      ) : messages.length === 0 ? (
        <p className="text-xs font-mono text-spider-textMuted italic">No messages received yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m._id || m.id} className="p-4 bg-spider-darkBg border border-spider-darkBorder rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold font-display text-white">{m.name}</span>
                <span className="text-[10px] font-mono text-spider-textMuted flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {new Date(m.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs font-mono text-spider-redPrimary flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> {m.email}
              </p>
              {m.subject && (
                <p className="text-xs font-mono font-semibold text-white">Subject: {m.subject}</p>
              )}
              <p className="text-xs text-spider-textLight bg-spider-darkCard p-3 rounded-lg border border-spider-darkBorder whitespace-pre-wrap">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

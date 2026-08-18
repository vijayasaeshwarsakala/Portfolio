import React from 'react';
import { X, ExternalLink, Download, FileText, CheckCircle2 } from 'lucide-react';

export const PDFViewerModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const isPdf = certificate.filePath?.toLowerCase().endsWith('.pdf');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-spider-darkCard border border-spider-darkBorder rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-spider-darkBorder bg-spider-darkBg/90">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-spider-redPrimary" />
            <div>
              <h3 className="font-display font-bold text-white text-base leading-snug">
                {certificate.title}
              </h3>
              <p className="text-xs font-mono text-spider-textMuted flex items-center gap-2">
                <span>{certificate.organization}</span>
                {certificate.issueDate && <span>• {certificate.issueDate}</span>}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-spider-darkCard hover:bg-spider-redPrimary/20 text-spider-textMuted hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Viewer Body */}
        <div className="flex-1 bg-spider-darkBg p-4 overflow-y-auto flex items-center justify-center min-h-[400px]">
          {certificate.filePath ? (
            isPdf ? (
              <iframe
                src={`${certificate.filePath}#toolbar=0`}
                title={certificate.title}
                className="w-full h-[550px] rounded-lg border border-spider-darkBorder"
              />
            ) : (
              <img
                src={certificate.filePath}
                alt={certificate.title}
                className="max-h-[550px] object-contain rounded-lg border border-spider-darkBorder"
              />
            )
          ) : (
            <div className="text-center p-8">
              <CheckCircle2 className="w-12 h-12 text-spider-redPrimary mx-auto mb-3" />
              <p className="text-sm font-mono text-spider-textMuted">
                Certificate document file placeholder. Place PDF inside <code className="text-spider-redPrimary">public/user-data/certificates/</code>.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-spider-darkBorder bg-spider-darkBg/90 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-spider-textMuted font-mono">
            {certificate.description || 'Verified Academic / Professional Credential'}
          </p>

          <div className="flex items-center gap-3">
            {certificate.credentialUrl && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-spider-darkCard border border-spider-darkBorder hover:border-spider-redPrimary text-xs font-mono text-white rounded-lg flex items-center gap-2 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-spider-redPrimary" />
                Verify Credential
              </a>
            )}

            {certificate.filePath && (
              <a
                href={certificate.filePath}
                download
                className="px-4 py-2 bg-spider-redPrimary hover:bg-spider-redGlow text-xs font-mono text-white rounded-lg flex items-center gap-2 transition-all shadow-spider-glow"
              >
                <Download className="w-3.5 h-3.5" />
                Download Document
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

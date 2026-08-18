import React from 'react';
import { Zap } from 'lucide-react';
import { useSpiderSense } from '../../context/SpiderSenseContext';

export const SpiderSenseToggle = () => {
  const { spiderSenseActive, toggleSpiderSense } = useSpiderSense();

  return (
    <button
      onClick={toggleSpiderSense}
      title="Press 'S' or click to toggle Spider-Sense Mode"
      className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-widest flex items-center gap-1.5 transition-all duration-300 ${
        spiderSenseActive
          ? 'bg-spider-redPrimary text-white shadow-spider-glow-strong animate-pulse'
          : 'bg-spider-darkCard text-spider-textMuted border border-spider-darkBorder hover:border-spider-redPrimary hover:text-spider-textLight'
      }`}
    >
      <Zap className={`w-3.5 h-3.5 ${spiderSenseActive ? 'text-white fill-white' : 'text-spider-redPrimary'}`} />
      <span>{spiderSenseActive ? 'SPIDER-SENSE ON' : 'SPIDER-SENSE'}</span>
      <span className="hidden md:inline-block opacity-60 text-[10px] bg-spider-darkBg px-1 rounded">
        [S]
      </span>
    </button>
  );
};

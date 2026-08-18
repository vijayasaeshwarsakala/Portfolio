import React, { createContext, useContext, useState, useEffect } from 'react';

const SpiderSenseContext = createContext();

export const SpiderSenseProvider = ({ children }) => {
  const [spiderSenseActive, setSpiderSenseActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const toggleSpiderSense = () => {
    setSpiderSenseActive(prev => !prev);
  };

  const registerLogoClick = () => {
    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 4) {
        setSpiderSenseActive(true);
        return 0;
      }
      return next;
    });
  };

  // Keyboard shortcut: Press 'S' or 's' to activate Spider-Sense!
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key.toLowerCase() === 's' &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA'
      ) {
        setSpiderSenseActive(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SpiderSenseContext.Provider value={{ spiderSenseActive, toggleSpiderSense, registerLogoClick }}>
      <div className={spiderSenseActive ? 'spider-sense-active min-h-screen transition-all duration-500' : ''}>
        {children}

        {/* Spider-Sense Active HUD Pill */}
        {spiderSenseActive && (
          <div className="fixed bottom-6 right-6 z-50 bg-spider-redPrimary text-white font-mono text-xs px-4 py-2 rounded-full shadow-spider-glow-strong border border-white/30 flex items-center gap-2 animate-bounce pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>⚡ SPIDER-SENSE ENGAGED [Press 'S' to Exit]</span>
          </div>
        )}
      </div>
    </SpiderSenseContext.Provider>
  );
};

export const useSpiderSense = () => useContext(SpiderSenseContext);

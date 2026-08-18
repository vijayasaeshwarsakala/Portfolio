import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Lock } from 'lucide-react';
import { SpiderSenseToggle } from './SpiderSenseToggle';
import { useSpiderSense } from '../../context/SpiderSenseContext';

export const Navbar = ({ onOpenAdmin }) => {
  const { registerLogoClick } = useSpiderSense();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '01. ABOUT', href: '#about' },
    { label: '02. SKILLS', href: '#skills' },
    { label: '03. MISSIONS', href: '#projects' },
    { label: '04. CERTIFICATES', href: '#certificates' },
    { label: '05. EXPERIENCE', href: '#experience' },
    { label: '06. ORIGIN', href: '#education' },
    { label: '07. ACHIEVEMENTS', href: '#achievements' },
    { label: '08. CONTACT', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-spider-darkBg/90 backdrop-blur-md border-b border-spider-darkBorder py-3 shadow-2xl' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={registerLogoClick}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-spider-redDark/20 border border-spider-redPrimary/40 flex items-center justify-center group-hover:border-spider-redPrimary group-hover:shadow-spider-glow transition-all">
            <Shield className="w-5 h-5 text-spider-redPrimary group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <span className="font-display font-bold text-lg text-white tracking-wider block leading-none">
              SAKALA
            </span>
            <span className="text-[10px] font-mono tracking-widest text-spider-redPrimary block mt-0.5 uppercase">
              Vijaya Saeshwar
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-xs font-mono tracking-wider text-spider-textMuted hover:text-spider-redPrimary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="hidden lg:flex items-center gap-4">
          <SpiderSenseToggle />
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-lg bg-spider-darkCard border border-spider-darkBorder text-spider-textMuted hover:text-spider-textLight hover:border-spider-redPrimary/50 transition-all"
            title="Admin Login Portal"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <SpiderSenseToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-spider-darkCard border border-spider-darkBorder text-spider-textLight"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-spider-darkCard/95 backdrop-blur-xl border-b border-spider-darkBorder px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono tracking-wider text-spider-textLight hover:text-spider-redPrimary transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-spider-darkBorder flex items-center justify-between">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="w-full py-2 bg-spider-darkBg border border-spider-darkBorder text-xs font-mono uppercase tracking-wider text-spider-textMuted rounded-lg flex items-center justify-center gap-2 hover:border-spider-redPrimary"
            >
              <Lock className="w-4 h-4 text-spider-redPrimary" />
              Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { LogoMark } from './LogoMark';
import { Menu, X, ArrowUpRight, Sparkles, Search, Command } from 'lucide-react';

interface NavbarProps {
  onOpenContact: (prefillScope?: string) => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenCommandPalette }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['capabilities', 'case-studies', 'simulator', 'tech-stack', 'about', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Capabilities', href: '#capabilities', id: 'capabilities' },
    { name: 'Case Studies', href: '#case-studies', id: 'case-studies' },
    { name: 'Latency Lab', href: '#simulator', id: 'simulator' },
    { name: 'Tech Stack', href: '#tech-stack', id: 'tech-stack' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#121418]/90 backdrop-blur-xl border-b border-[rgba(138,148,166,0.2)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] py-3.5'
          : 'bg-[#121418]/60 backdrop-blur-md border-b border-[rgba(138,148,166,0.2)] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#"
          id="nav-brand-logo"
          aria-label="Zynthrop Technologies - Home"
          className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A59] rounded-lg transition-transform"
        >
          <LogoMark size="md" animated={true} />
        </a>

        {/* Desktop Nav Links */}
        <nav id="desktop-nav-links" className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                id={`nav-link-${link.id}`}
                href={link.href}
                className={`text-[0.9rem] font-medium transition-all duration-200 relative py-1 ${
                  isActive
                    ? 'text-white'
                    : 'text-[#A0AEC0] hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF7A59] to-[#FFA07A] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Command Palette Button */}
          {onOpenCommandPalette && (
            <button
              id="nav-cmd-palette-btn"
              type="button"
              onClick={onOpenCommandPalette}
              className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#181C25] hover:bg-[#202734] border border-[#2B3444] text-xs font-mono text-[#8A94A6] hover:text-white transition-all shadow-inner"
              title="Open Command Palette (Cmd + K / Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-[#FF7A59]" />
              <span className="text-[11px]">Command</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#10131A] text-[10px] text-[#A0AEC0] border border-[#2B3444]">⌘K</kbd>
            </button>
          )}

          {/* Direct CTA Button */}
          <button
            id="nav-cta-start-project"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                onOpenContact();
              }
            }}
            className="btn-primary flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 text-[#A0AEC0] hover:text-white hover:bg-[#1a1e24] rounded-md transition-colors border border-[rgba(138,148,166,0.2)] focus:outline-none focus:ring-2 focus:ring-[#FF7A59]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden border-b border-[#2B3441] bg-[#14171E]/95 backdrop-blur-2xl px-5 pt-3 pb-6 animate-in slide-in-from-top-3 duration-200"
        >
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`mobile-nav-link-${link.id}`}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-[#A0AEC0] hover:text-white hover:bg-[#1C222C] transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8A94A6] opacity-60" />
              </a>
            ))}

            <div className="pt-3">
              <button
                id="mobile-cta-start-project"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 px-4 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#FF7A59] to-[#FFA07A] shadow-[0_0_20px_rgba(255,122,89,0.35)] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

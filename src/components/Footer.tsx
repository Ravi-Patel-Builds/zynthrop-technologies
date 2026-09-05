import React from 'react';
import { LogoMark } from './LogoMark';
import { Github, Linkedin, ArrowUp, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="site-footer" 
      aria-label="Site Footer" 
      className="bg-[#0e1014] border-t border-[rgba(138,148,166,0.15)] text-[#8A94A6] pt-16 pb-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[rgba(138,148,166,0.15)] items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="inline-block" aria-label="Zynthrop Technologies">
              <LogoMark size="md" />
            </a>
            
            {/* Tagline */}
            <p className="text-sm font-semibold text-white tracking-tight">
              Production Systems Engineering
            </p>

            <p className="text-xs text-[#7A8799] max-w-sm leading-relaxed">
              High-performance web applications, distributed backend services, and low-latency AI integrations.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#1a1e24] border border-[rgba(138,148,166,0.2)] text-[11px] font-mono text-[#CBD5E1]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All Systems Operational (99.99% Uptime)</span>
            </div>
          </div>

          {/* Nav Navigation links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-white transition-colors">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Leadership
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Founder Profile & Socials */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Leadership
            </div>
            <p className="text-xs text-[#7A8799]">
              Connect directly with Ravi Shankar Patel:
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {/* LinkedIn link */}
              <a
                id="footer-founder-linkedin"
                href="https://www.linkedin.com/in/ravi-patel-builds/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ravi Shankar Patel LinkedIn Profile"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#1a1e24] hover:bg-[#0077B5]/20 text-xs font-medium text-[#CBD5E1] hover:text-white border border-[rgba(138,148,166,0.2)] hover:border-[#0077B5] transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                <span>LinkedIn / Ravi Shankar Patel</span>
              </a>

              {/* GitHub link */}
              <a
                id="footer-founder-github"
                href="https://github.com/Ravi-Patel-Builds"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ravi Shankar Patel GitHub Profile"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#1a1e24] hover:bg-white/10 text-xs font-medium text-[#CBD5E1] hover:text-white border border-[rgba(138,148,166,0.2)] hover:border-white/30 transition-all"
              >
                <Github className="w-3.5 h-3.5 text-white" />
                <span>GitHub / Ravi Shankar Patel</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            &copy; {currentYear} Zynthrop Technologies. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#64748B] font-mono text-[11px]">
              ZYNTHROP_OS // v4.2.0-PROD
            </span>

            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="p-2 rounded-md bg-[#1a1e24] hover:bg-white/5 text-[#CBD5E1] hover:text-white border border-[rgba(138,148,166,0.2)] transition-colors flex items-center gap-1.5"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

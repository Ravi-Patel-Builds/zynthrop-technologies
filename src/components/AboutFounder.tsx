import React from 'react';
import { 
  Github, 
  Linkedin, 
  ArrowUpRight, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Award,
  Sparkles
} from 'lucide-react';

interface AboutFounderProps {
  onInitiateProject: () => void;
}

export const AboutFounder: React.FC<AboutFounderProps> = ({ onInitiateProject }) => {
  return (
    <section 
      id="about" 
      aria-label="About the Founder" 
      className="py-24 relative z-10 border-t border-[#1E2530]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1e24] border border-[rgba(138,148,166,0.2)] text-xs font-mono uppercase tracking-wider text-[#FF7A59]">
            <Terminal className="w-3.5 h-3.5 text-[#FF7A59]" />
            <span>Leadership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Principal Systems <span className="text-gradient">Engineering.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A0AEC0] leading-relaxed">
            High-throughput architectures, fault-tolerant backends, and low-latency AI pipelines.
          </p>
        </div>

        {/* Founder Profile Card */}
        <div className="max-w-4xl mx-auto rounded-xl glass border border-[rgba(138,148,166,0.2)] p-8 sm:p-10 lg:p-12 shadow-[0_16px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF7A59]/8 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Avatar & Quick Links */}
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-5">
              {/* Stylized Avatar Frame */}
              <div className="relative">
                <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-[#2D3748] to-[#1A202C] p-1 shadow-[0_0_30px_rgba(255,122,89,0.2)] border border-[rgba(138,148,166,0.25)]">
                  <div className="w-full h-full rounded-lg bg-[#151921] flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Monogram / Visual Badge */}
                    <span className="text-3xl font-extrabold text-white font-mono tracking-wider">
                      RSP
                    </span>
                    <span className="text-[10px] font-mono text-[#FF7A59] tracking-widest uppercase mt-1">
                      Principal
                    </span>
                    {/* Tech circuit traces inside avatar */}
                    <div className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#1a1e24] border border-[#FF7A59]/40 text-[10px] font-mono text-[#FFA07A] flex items-center gap-1 shadow-md whitespace-nowrap">
                  <CheckCircle2 className="w-3 h-3 text-[#FF7A59]" />
                  <span>Principal Architect</span>
                </div>
              </div>

              {/* Founder Name & Title */}
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Ravi Shankar Patel
                </h3>
                <p className="text-xs font-mono text-[#8A94A6] uppercase tracking-wider mt-0.5">
                  Founder & Principal Systems Architect
                </p>
              </div>

              {/* Founder Social Badges */}
              <div className="flex flex-col w-full gap-2 pt-2">
                {/* LinkedIn Badge */}
                <a
                  id="founder-link-linkedin"
                  href="https://www.linkedin.com/in/ravi-patel-builds/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ravi Shankar Patel LinkedIn Profile"
                  className="w-full py-2.5 px-4 rounded-md bg-[#1a1e24] hover:bg-[#0077B5]/20 text-xs font-semibold text-white border border-[rgba(138,148,166,0.2)] hover:border-[#0077B5] transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm"
                >
                  <Linkedin className="w-4 h-4 text-[#0077B5] group-hover:scale-110 transition-transform" />
                  <span>LinkedIn / Connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8A94A6] group-hover:text-white" />
                </a>

                {/* GitHub Badge */}
                <a
                  id="founder-link-github"
                  href="https://github.com/Ravi-Patel-Builds"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ravi Shankar Patel GitHub Profile"
                  className="w-full py-2.5 px-4 rounded-md bg-[#1a1e24] hover:bg-white/10 text-xs font-semibold text-white border border-[rgba(138,148,166,0.2)] hover:border-white/40 transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm"
                >
                  <Github className="w-4 h-4 text-[#CBD5E1] group-hover:scale-110 transition-transform" />
                  <span>GitHub / Repositories</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8A94A6] group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Right Column: Philosophy & Architectural Principles */}
            <div className="md:col-span-8 space-y-6 md:pl-6 md:border-l md:border-[rgba(138,148,166,0.15)]">
              
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[#FF7A59] font-semibold">
                  Engineering Philosophy
                </div>
                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                  "We construct software for production from day one—architecting low-latency interfaces, fault-tolerant backends, and deterministic AI pipelines engineered to endure real-world scale."
                </p>
              </div>

              {/* 3 Core Tenets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 rounded-lg bg-[#121418] border border-[rgba(138,148,166,0.15)] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-white font-semibold text-xs">
                    <Zap className="w-3.5 h-3.5 text-[#FF7A59]" />
                    <span>Latency Budget</span>
                  </div>
                  <p className="text-[11px] text-[#8A94A6] leading-relaxed">
                    Zero tolerance for bloated dependencies or non-essential re-renders.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#121418] border border-[rgba(138,148,166,0.15)] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-white font-semibold text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FFA07A]" />
                    <span>Deterministic AI</span>
                  </div>
                  <p className="text-[11px] text-[#8A94A6] leading-relaxed">
                    Strict payload schemas and deterministic evaluation for production AI.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#121418] border border-[rgba(138,148,166,0.15)] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-white font-semibold text-xs">
                    <Cpu className="w-3.5 h-3.5 text-[#FF7A59]" />
                    <span>End-to-End Types</span>
                  </div>
                  <p className="text-[11px] text-[#8A94A6] leading-relaxed">
                    Shared contracts from database models to frontend interfaces.
                  </p>
                </div>
              </div>

              {/* Direct Invitation */}
              <div className="pt-2 flex items-center justify-between">
                <div className="text-xs text-[#8A94A6]">
                  Available for technical consultations & enterprise advisory.
                </div>
                <button
                  id="btn-founder-book-call"
                  onClick={onInitiateProject}
                  className="text-xs font-semibold text-[#FFA07A] hover:text-white flex items-center gap-1 group transition-colors"
                >
                  <span>Discuss Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

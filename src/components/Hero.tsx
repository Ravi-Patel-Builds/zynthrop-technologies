import React, { useState, useEffect } from 'react';
import { ArrowRight, Code2, Cpu, ShieldCheck, Terminal, Zap, CheckCircle2, ChevronRight, Activity, Layers, Sparkles } from 'lucide-react';
import { HeroFlashcards } from './HeroFlashcards';

interface HeroProps {
  onExploreWork: () => void;
  onBookConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onBookConsultation }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'ai' | 'latency' | 'mesh'>('ai');
  const [liveReqCount, setLiveReqCount] = useState(14820);

  // Simulated request ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveReqCount((prev) => prev + Math.floor(Math.random() * 8 + 3));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Telemetry details mapping
  const telemetryData = {
    ai: {
      badge1: '⚡ 350 tok/s Hardware LPU',
      badge2: '1536-dim Vector RAG',
      statLabel: 'Inference Throughput',
      statVal: '4.2k tokens/s',
      status: 'GPU/LPU CLUSTER ACTIVE'
    },
    latency: {
      badge1: '<18ms Edge P99 TTFB',
      badge2: '99.4% Cache Offload',
      statLabel: 'Global Ingress Latency',
      statVal: '14.2ms avg',
      status: 'CLOUDFLARE EDGE KV'
    },
    mesh: {
      badge1: '99.999% Uptime Cluster',
      badge2: '<120ms Auto-Failover',
      statLabel: 'Service Mesh Health',
      statVal: '48 / 48 Nodes OK',
      status: 'DISTRIBUTED MESH'
    }
  };

  const currentTel = telemetryData[activeTelemetryTab];

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tech startup indicator badge */}
            <div 
              id="hero-status-pill"
              className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#1a1e24] border border-[rgba(138,148,166,0.2)] text-xs font-medium text-[#CBD5E1] shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A59] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A59]"></span>
              </span>
              <span className="tracking-wide text-xs uppercase font-mono text-[#A0AEC0]">
                High-Performance Systems & AI Architecture
              </span>
            </div>

            {/* Main Headline */}
            <h1 
              id="hero-main-headline"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.6rem] font-extrabold text-white tracking-[-0.03em] leading-[1.1]"
            >
              Engineering{' '}
              <span className="text-gradient inline-block">
                Scalable Digital Products.
              </span>
            </h1>

            {/* Sub-headline */}
            <p 
              id="hero-subheadline"
              className="text-base sm:text-lg text-[#A0AEC0] max-w-xl leading-[1.6] font-normal"
            >
              High-performance web applications, distributed systems, and production AI architectures built for enterprise scale.
            </p>

            {/* CTAs */}
            <div id="hero-action-buttons" className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA: Explore Our Work */}
              <button
                id="hero-primary-cta"
                onClick={onExploreWork}
                className="btn-primary flex items-center gap-2"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA: Book a Technical Consultation */}
              <button
                id="hero-secondary-cta"
                onClick={onBookConsultation}
                className="btn-outline flex items-center gap-2"
              >
                <Terminal className="w-4 h-4 text-[#FF7A59] opacity-90" />
                <span>Book a Consultation</span>
              </button>
            </div>

            {/* Engineering Metrics Strip */}
            <div 
              id="hero-metrics-strip"
              className="pt-6 border-t border-[rgba(138,148,166,0.2)] grid grid-cols-3 gap-4 max-w-xl"
            >
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-1">
                  <span>&lt;40ms</span>
                </div>
                <div className="text-xs text-[#8A94A6] uppercase tracking-wider mt-0.5">
                  Avg API Latency
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  99.99%
                </div>
                <div className="text-xs text-[#8A94A6] uppercase tracking-wider mt-0.5">
                  Uptime Guarantee
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-1">
                  <span>100%</span>
                </div>
                <div className="text-xs text-[#8A94A6] uppercase tracking-wider mt-0.5">
                  Type-Safe Codebase
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Anchor (Interactive Geometric 'Z' & Elegant Dark Anchor) */}
          <div className="lg:col-span-5 flex justify-center relative items-center">
            {/* Elegant Dark rotated backdrop frame */}
            <div className="absolute w-[320px] h-[320px] border border-[rgba(138,148,166,0.2)] rounded-[32px] rotate-[8deg] pointer-events-none transition-transform duration-500">
              <div className="absolute inset-0 border border-[#FF7A59]/25 rounded-[32px] -translate-x-2 -translate-y-2" />
              <div className="absolute bottom-4 right-4 w-16 h-[1px] bg-gradient-to-r from-transparent to-[#FF7A59] opacity-60" />
              <div className="absolute top-4 left-4 w-[1px] h-16 bg-gradient-to-b from-transparent to-[#FF7A59] opacity-60" />
              <span className="absolute top-2 right-3 text-[9px] font-mono text-[#8A94A6]/60">NODE_US_WEST</span>
            </div>

            <div 
              id="hero-visual-anchor-card"
              className="relative w-full max-w-[480px] rounded-2xl glass p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden group transition-all duration-300 z-10"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              {/* Radial backdrop inside the card */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(255,122,89,0.12),transparent_70%)] pointer-events-none" />
              
              {/* Card Header with Terminal Controls */}
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(138,148,166,0.2)] relative z-20 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3B4252]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4C566A]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D08770]/70" />
                  <span className="text-[11px] font-mono text-[#8A94A6] ml-1">core_cluster.v4</span>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1a1e24] text-[10px] font-mono text-[#FF7A59] border border-[#FF7A59]/30">
                  <Activity className="w-3 h-3 animate-pulse text-[#FF7A59]" />
                  <span>{currentTel.status}</span>
                </div>
              </div>

              {/* 4-Second Auto-Sliding Architecture Flashcards (Leftward Sliding) */}
              <HeroFlashcards activeFilter={activeTelemetryTab} />

              {/* Card Footer: Interactive Architecture Selector Tabs */}
              <div className="pt-3 mt-3 border-t border-[#252C38] flex items-center justify-between">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setActiveTelemetryTab('ai')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                      activeTelemetryTab === 'ai'
                        ? 'bg-gradient-to-r from-[#FF7A59]/25 to-[#FFA07A]/25 text-white border border-[#FF7A59]/50 font-semibold shadow-sm'
                        : 'text-[#8A94A6] hover:text-white bg-[#161B24]'
                    }`}
                  >
                    AI Agent Bus
                  </button>
                  <button
                    onClick={() => setActiveTelemetryTab('latency')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                      activeTelemetryTab === 'latency'
                        ? 'bg-gradient-to-r from-[#FF7A59]/25 to-[#FFA07A]/25 text-white border border-[#FF7A59]/50 font-semibold shadow-sm'
                        : 'text-[#8A94A6] hover:text-white bg-[#161B24]'
                    }`}
                  >
                    Edge Cache
                  </button>
                  <button
                    onClick={() => setActiveTelemetryTab('mesh')}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                      activeTelemetryTab === 'mesh'
                        ? 'bg-gradient-to-r from-[#FF7A59]/25 to-[#FFA07A]/25 text-white border border-[#FF7A59]/50 font-semibold shadow-sm'
                        : 'text-[#8A94A6] hover:text-white bg-[#161B24]'
                    }`}
                  >
                    Microservices
                  </button>
                </div>

                <span className="text-[10px] font-mono text-[#627084]">
                  {liveReqCount.toLocaleString()} reqs
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

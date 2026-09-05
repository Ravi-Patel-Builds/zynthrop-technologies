import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Activity, 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Terminal,
  Code2,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface Flashcard {
  id: string;
  category: string;
  title: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
  metricLabel: string;
  metricValue: string;
  codeSnippet: string;
  stats: {
    label: string;
    val: string;
  }[];
  highlight: string;
}

const FLASHCARDS: Flashcard[] = [
  {
    id: 'mesh',
    category: 'DISTRIBUTED ARCHITECTURE',
    title: 'Zero-Loss Event Mesh',
    badge: '120k req/s · <14ms P99',
    badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/50',
    icon: Cpu,
    metricLabel: 'Throughput',
    metricValue: '120,000 req/sec',
    codeSnippet: `// Multi-Region Rust Event Bus\npipeline.route(topic: "market.l2")\n  .compress(Snappy)\n  .deliver_p99(<12ms);`,
    stats: [
      { label: 'P99 LATENCY', val: '11.8 ms' },
      { label: 'PACKET LOSS', val: '0.000%' },
      { label: 'ACTIVE NODES', val: '48 / 48' }
    ],
    highlight: 'Non-blocking reactive event loop with zero-copy I/O.'
  },
  {
    id: 'ai-agents',
    category: 'COGNITIVE INFRASTRUCTURE',
    title: 'Deterministic AI Pipeline',
    badge: '350 tok/s · Hardware LPU',
    badgeColor: 'text-[#FFA07A] bg-[#FF7A59]/15 border-[#FF7A59]/40',
    icon: Sparkles,
    metricLabel: 'Inference Velocity',
    metricValue: '350 tok/sec',
    codeSnippet: `// Guarded Autonomous Tool Calling\nagent.execute({\n  tools: [vectorSearch, ledgerVerify],\n  schema: strictPayloadSchema\n});`,
    stats: [
      { label: 'ACCURACY', val: '99.98%' },
      { label: 'RETRIEVAL', val: '0.8 ms' },
      { label: 'ENCLAVE', val: 'AES-256' }
    ],
    highlight: 'Sub-millisecond vector indexing with deterministic guardrails.'
  },
  {
    id: 'edge',
    category: 'DISTRIBUTED EDGE',
    title: 'Smart Anycast Edge Grid',
    badge: '99.999% SLA · 28 PoPs',
    badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/50',
    icon: Globe,
    metricLabel: 'Edge Cold Load',
    metricValue: '8ms Global',
    codeSnippet: `// Edge Cache & Stale-While-Revalidate\nmesh.cache(ttl: 3600, stale: 86400)\n  .geoRouting("auto-nearest")\n  .failover(<120ms);`,
    stats: [
      { label: 'CACHE HIT', val: '98.6%' },
      { label: 'GLOBAL POPS', val: '28 Edge' },
      { label: 'FAILOVER', val: '<120 ms' }
    ],
    highlight: 'Geo-distributed edge workers within 15ms of 94% of global users.'
  },
  {
    id: 'fintech',
    category: 'SECURITY & COMPLIANCE',
    title: 'Immutable FinTech Ledger',
    badge: 'PCI-DSS L1 · Zero Drift',
    badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800/50',
    icon: ShieldCheck,
    metricLabel: 'Reconciliation',
    metricValue: '$0.00 Drift',
    codeSnippet: `// Double-Entry Balance Proof\nledger.postTransaction({\n  debit: acc_104, credit: acc_902,\n  sha256Proof: block.hash\n});`,
    stats: [
      { label: 'INTEGRITY', val: '100% SHA' },
      { label: 'KEY ROTATION', val: 'HSM v3' },
      { label: 'AUDIT LOG', val: 'Immutable' }
    ],
    highlight: 'Double-entry transaction engine with automated cryptographic verification.'
  },
  {
    id: 'realtime',
    category: 'REAL-TIME SYNCHRONIZATION',
    title: 'High-Concurrency State Mesh',
    badge: '250k Peers · Delta CRDT',
    badgeColor: 'text-purple-400 bg-purple-950/60 border-purple-800/50',
    icon: Activity,
    metricLabel: 'Peer Latency',
    metricValue: '6ms Delta',
    codeSnippet: `// Binary State Reconciliation\ndoc.applyUpdate(peerDelta);\nsocket.broadcastToRoom(room_id);\nmetric.recordBandwidth(-84%);`,
    stats: [
      { label: 'CONCURRENCY', val: '250k+' },
      { label: 'BANDWIDTH', val: '-84% Save' },
      { label: 'SOCKETS', val: 'TLS v1.3' }
    ],
    highlight: 'Binary WebSockets with conflict-free replicated data types (CRDT).'
  }
];

interface HeroFlashcardsProps {
  onSelectFeature?: (featureId: string) => void;
  activeFilter?: 'ai' | 'latency' | 'mesh';
}

export const HeroFlashcards: React.FC<HeroFlashcardsProps> = ({ onSelectFeature, activeFilter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pingPulse, setPingPulse] = useState(false);
  
  const startTimeRef = useRef<number>(Date.now());
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION_MS = 4000;
  const TICK_MS = 40;

  // React to external tab selection
  useEffect(() => {
    if (!activeFilter) return;
    if (activeFilter === 'mesh') {
      setCurrentIndex(0);
      setProgress(0);
    } else if (activeFilter === 'ai') {
      setCurrentIndex(1);
      setProgress(0);
    } else if (activeFilter === 'latency') {
      setCurrentIndex(2);
      setProgress(0);
    }
  }, [activeFilter]);

  // Handle 4-second continuous sliding towards the left
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    startTimeRef.current = Date.now();
    setProgress(0);

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / SLIDE_DURATION_MS) * 100);
      setProgress(pct);

      if (elapsed >= SLIDE_DURATION_MS) {
        startTimeRef.current = Date.now();
        setProgress(0);
        // Slide to the next card towards the left
        setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
      }
    }, TICK_MS);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPaused]);

  const goToNext = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const goToPrev = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  const goToIndex = (idx: number) => {
    setProgress(0);
    setCurrentIndex(idx);
  };

  const triggerTestPing = () => {
    setPingPulse(true);
    setTimeout(() => setPingPulse(false), 900);
  };

  const activeCard = FLASHCARDS[currentIndex];

  return (
    <div 
      id="hero-flashcards-carousel"
      className="relative w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="System Architecture Carousel"
    >
      {/* 4-Second Slide Timer Progress Bar */}
      <div className="w-full h-1 bg-[#1A202C] rounded-full overflow-hidden mb-3 relative">
        <div 
          className="h-full bg-gradient-to-r from-[#FF7A59] to-[#FFA07A] transition-all duration-75 ease-linear rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top Carousel Navigation & Status Bar */}
      <div className="flex items-center justify-between text-xs font-mono mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#161B24] border border-[#2B3545] text-[10px] text-[#CBD5E1]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ARCH {currentIndex + 1} / {FLASHCARDS.length}</span>
          </span>
        </div>

        {/* Carousel Controls: Prev, Pause/Play, Next */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous Spec"
            className="p-1 rounded bg-[#161B24] hover:bg-[#202736] text-[#A0AEC0] hover:text-white border border-[#2B3545] transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Resume' : 'Pause'}
            className="p-1 rounded bg-[#161B24] hover:bg-[#202736] text-[#A0AEC0] hover:text-white border border-[#2B3545] transition-colors"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-[#FF7A59]" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next Spec"
            className="p-1 rounded bg-[#161B24] hover:bg-[#202736] text-[#A0AEC0] hover:text-white border border-[#2B3545] transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Sliding Viewport: Tracks slide towards the left */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#2B3545] bg-[#12151C]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <div 
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {FLASHCARDS.map((card, idx) => {
            const IconComponent = card.icon;
            const isCardActive = idx === currentIndex;

            return (
              <div 
                key={card.id}
                className="w-full min-w-full flex-shrink-0 p-4 sm:p-5 flex flex-col justify-between space-y-3.5"
                style={{ minHeight: '265px' }}
              >
                {/* Flashcard Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF7A59] font-semibold">
                        {card.category}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-[#FFA07A]" />
                      <span>{card.title}</span>
                    </h3>
                  </div>

                  {/* High-Tech Badge */}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border whitespace-nowrap ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                {/* Architecture Code Snippet / Terminal Box */}
                <div className="rounded-lg bg-[#0C0E12] border border-[#1E2530] p-3 font-mono text-[11px] text-[#A0AEC0] relative overflow-hidden group">
                  <div className="flex items-center justify-between text-[9px] text-[#4A5568] pb-1.5 mb-1.5 border-b border-[#1A202C]">
                    <span className="flex items-center gap-1 text-[#FF7A59]">
                      <Code2 className="w-3 h-3" />
                      SYSTEM SPECIFICATION
                    </span>
                    <span>ACTIVE</span>
                  </div>
                  <pre className="text-[11px] text-[#CBD5E1] font-mono leading-relaxed overflow-x-auto whitespace-pre">
                    {card.codeSnippet}
                  </pre>
                </div>

                {/* Key Metrics 3-Column Strip */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#1E2530]">
                  {card.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="bg-[#161B24]/80 rounded p-1.5 border border-[#232B38] text-center">
                      <div className="text-[9px] font-mono text-[#718096] uppercase tracking-wider">
                        {stat.label}
                      </div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">
                        {stat.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Highlight Line */}
                <div className="text-[11px] text-[#8A94A6] leading-snug flex items-center gap-1.5 pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] flex-shrink-0" />
                  <span className="truncate">{card.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Pagination Dots & Interactive Ping Button */}
      <div className="flex items-center justify-between mt-3 px-1">
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {FLASHCARDS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToIndex(idx)}
              aria-label={`Jump to Flashcard ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-6 bg-[#FF7A59]'
                  : 'w-1.5 bg-[#2B3545] hover:bg-[#4A5568]'
              }`}
            />
          ))}
        </div>

        {/* Live Packet Ping Trigger */}
        <button
          type="button"
          onClick={triggerTestPing}
          className={`px-2.5 py-1 rounded bg-[#161B24] hover:bg-[#FF7A59]/20 hover:border-[#FF7A59]/50 border border-[#2B3545] text-[10px] font-mono text-white flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
            pingPulse ? 'border-[#FF7A59] text-[#FFA07A]' : ''
          }`}
          title="Test Packet Latency"
        >
          {pingPulse ? (
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ACK 200 OK (8ms)
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#FF7A59]" />
              Packet Ping
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

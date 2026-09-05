import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Cpu, 
  Database, 
  Layers, 
  Play, 
  Pause, 
  RotateCcw, 
  Server, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  Terminal,
  ShieldAlert
} from 'lucide-react';

export const SystemSimulator: React.FC = () => {
  const [trafficLoad, setTrafficLoad] = useState<number>(45); // in thousands of req/min
  const [cachingTier, setCachingTier] = useState<'none' | 'redis' | 'edge'>('edge');
  const [aiEngine, setAiEngine] = useState<'standard' | 'rag' | 'groq'>('groq');
  const [multiRegion, setMultiRegion] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [logEntries, setLogEntries] = useState<string[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute realistic simulated metrics based on parameters
  // Base latency
  let latencyBase = 120;
  if (cachingTier === 'none') latencyBase += 280;
  if (cachingTier === 'redis') latencyBase += 25;
  if (cachingTier === 'edge') latencyBase += 4;

  if (aiEngine === 'standard') latencyBase += 1200;
  if (aiEngine === 'rag') latencyBase += 280;
  if (aiEngine === 'groq') latencyBase += 28;

  if (!multiRegion) latencyBase += 75; // cross-continent latency penalty

  // Traffic load scaling impact
  const loadFactor = trafficLoad > 100 ? (trafficLoad - 100) * 0.4 : 0;
  const computedLatency = Math.round(latencyBase + loadFactor + (Math.sin(Date.now() / 1000) * 3));
  const throughput = Math.round((trafficLoad * 1000) / 60);
  const cacheHitRatio = cachingTier === 'edge' ? 98.6 : cachingTier === 'redis' ? 91.2 : 0;
  const healthScore = Math.max(72, Math.min(99.9, 100 - (loadFactor * 0.15) - (cachingTier === 'none' ? 12 : 0)));

  // Simulated live log generator
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const endpoints = [
        'POST /api/v1/agent/inference',
        'GET /api/v1/metrics/stream',
        'POST /api/v1/rag/retrieve',
        'GET /api/v1/auth/verify-token'
      ];
      const ep = endpoints[Math.floor(Math.random() * endpoints.length)];
      const reqId = Math.floor(10000 + Math.random() * 90000);
      const lat = Math.max(4, Math.round(computedLatency * (0.85 + Math.random() * 0.3)));
      const cacheStatus = cachingTier === 'none' ? 'MISS' : Math.random() < (cacheHitRatio / 100) ? 'HIT (L1)' : 'PASS';
      
      const newLog = `[${new Date().toISOString().split('T')[1].slice(0, 8)}] REQ-${reqId} ${ep} 200 OK (${lat}ms) cache:${cacheStatus}`;
      
      setLogEntries((prev) => [newLog, ...prev.slice(0, 4)]);
    }, 1400);

    return () => clearInterval(interval);
  }, [isRunning, computedLatency, cachingTier, cacheHitRatio]);

  // Rolling latency canvas wave chart with high-DPI scaling and throttled telemetry updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const history: number[] = new Array(50).fill(computedLatency);
    let lastDataTime = Date.now();
    let currentWidth = canvas.parentElement?.clientWidth || 400;
    let currentHeight = 140;

    const updateCanvasSize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      currentWidth = canvas.parentElement.clientWidth || 400;
      currentHeight = 140;
      canvas.width = Math.floor(currentWidth * dpr);
      canvas.height = Math.floor(currentHeight * dpr);
      canvas.style.width = `${currentWidth}px`;
      canvas.style.height = `${currentHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const render = () => {
      const now = Date.now();
      // Advance telemetry data at stable 100ms intervals instead of every animation frame
      if (isRunning && now - lastDataTime >= 100) {
        lastDataTime = now;
        history.shift();
        const jitter = (Math.random() - 0.5) * 6;
        history.push(Math.max(10, computedLatency + jitter));
      }

      ctx.clearRect(0, 0, currentWidth, currentHeight);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(138, 148, 166, 0.12)';
      ctx.lineWidth = 1;
      for (let y = 20; y < currentHeight; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(currentWidth, y);
        ctx.stroke();
      }

      // Draw wave
      const maxVal = Math.max(...history, 300);
      const minVal = 0;

      ctx.beginPath();
      for (let i = 0; i < history.length; i++) {
        const x = (i / (history.length - 1)) * currentWidth;
        const normalized = (history[i] - minVal) / (maxVal - minVal);
        const y = currentHeight - 20 - normalized * (currentHeight - 40);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // Stroke style
      const strokeGrad = ctx.createLinearGradient(0, 0, currentWidth, 0);
      strokeGrad.addColorStop(0, '#FF7A59');
      strokeGrad.addColorStop(1, '#FFA07A');
      ctx.strokeStyle = strokeGrad;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Area fill
      ctx.lineTo(currentWidth, currentHeight);
      ctx.lineTo(0, currentHeight);
      ctx.closePath();
      const fillGrad = ctx.createLinearGradient(0, 0, 0, currentHeight);
      fillGrad.addColorStop(0, 'rgba(255, 122, 89, 0.25)');
      fillGrad.addColorStop(1, 'rgba(255, 122, 89, 0.0)');
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Draw active head dot
      const lastNorm = (history[history.length - 1] - minVal) / (maxVal - minVal);
      const lastY = currentHeight - 20 - lastNorm * (currentHeight - 40);
      ctx.beginPath();
      ctx.arc(currentWidth - 3, lastY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [isRunning, computedLatency]);

  return (
    <section 
      id="simulator"
      data-section="system-simulator"
      aria-label="Live System Architecture Simulator"
      className="py-24 relative z-10 border-t border-[rgba(138,148,166,0.15)] bg-[#101217]/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1e24] border border-[rgba(138,148,166,0.2)] text-xs font-mono uppercase tracking-wider text-[#FF7A59]">
            <Activity className="w-3.5 h-3.5 text-[#FF7A59]" />
            <span>Latency Lab</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Latency & <span className="text-gradient">Throughput Simulator.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A0AEC0] leading-relaxed">
            Simulate real-time latency and throughput across distributed caching and inference topologies.
          </p>
        </div>

        {/* Simulator Dashboard Container */}
        <div className="rounded-2xl glass border border-[rgba(138,148,166,0.25)] p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[rgba(138,148,166,0.15)]">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isRunning ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isRunning ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                TELEMETRY // {isRunning ? 'ACTIVE' : 'PAUSED'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-3 py-1.5 rounded-md bg-[#1a1e24] hover:bg-white/10 text-xs font-mono text-white border border-[rgba(138,148,166,0.2)] flex items-center gap-1.5 transition-colors"
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? 'Pause' : 'Resume'}</span>
              </button>

              <button
                onClick={() => {
                  setTrafficLoad(45);
                  setCachingTier('edge');
                  setAiEngine('groq');
                  setMultiRegion(true);
                }}
                className="p-1.5 rounded-md bg-[#1a1e24] hover:bg-white/10 text-xs text-[#8A94A6] hover:text-white border border-[rgba(138,148,166,0.2)] transition-colors"
                title="Reset to default optimal spec"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main 2-Column Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            
            {/* Left Column: Interactive Tuning Knobs */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Parameter 1: Traffic Load Slider */}
              <div className="p-5 rounded-xl bg-[#14171F] border border-[rgba(138,148,166,0.15)] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono uppercase text-[#CBD5E1] font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#FF7A59]" />
                    <span>Concurrent Traffic Load</span>
                  </span>
                  <span className="font-mono text-sm font-bold text-white text-coral-gradient">
                    {trafficLoad.toLocaleString()},000 req/min
                  </span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="250"
                  step="5"
                  value={trafficLoad}
                  onChange={(e) => setTrafficLoad(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#252C38] rounded-lg appearance-none cursor-pointer accent-[#FF7A59]"
                />

                <div className="flex justify-between text-[10px] font-mono text-[#718096]">
                  <span>5k req/min</span>
                  <span>100k req/min</span>
                  <span>250k req/min</span>
                </div>
              </div>

              {/* Parameter 2: Caching Strategy Selector */}
              <div className="p-5 rounded-xl bg-[#14171F] border border-[rgba(138,148,166,0.15)] space-y-3">
                <div className="text-xs font-mono uppercase text-[#CBD5E1] font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#FFA07A]" />
                  <span>Caching & Edge Acceleration</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setCachingTier('none')}
                    className={`p-3 rounded-lg text-left text-xs font-mono transition-all border ${
                      cachingTier === 'none'
                        ? 'bg-[#2A1815] border-[#FF7A59] text-white shadow-sm'
                        : 'bg-[#181C24] border-[rgba(138,148,166,0.2)] text-[#8A94A6] hover:text-white'
                    }`}
                  >
                    <div className="font-bold">No Cache</div>
                    <div className="text-[10px] text-[#A0AEC0] mt-0.5">Direct DB Hits</div>
                  </button>

                  <button
                    onClick={() => setCachingTier('redis')}
                    className={`p-3 rounded-lg text-left text-xs font-mono transition-all border ${
                      cachingTier === 'redis'
                        ? 'bg-[#2A1815] border-[#FF7A59] text-white shadow-sm'
                        : 'bg-[#181C24] border-[rgba(138,148,166,0.2)] text-[#8A94A6] hover:text-white'
                    }`}
                  >
                    <div className="font-bold">Redis L2</div>
                    <div className="text-[10px] text-[#A0AEC0] mt-0.5">In-Memory Bus</div>
                  </button>

                  <button
                    onClick={() => setCachingTier('edge')}
                    className={`p-3 rounded-lg text-left text-xs font-mono transition-all border ${
                      cachingTier === 'edge'
                        ? 'bg-[#2A1815] border-[#FF7A59] text-white shadow-sm'
                        : 'bg-[#181C24] border-[rgba(138,148,166,0.2)] text-[#8A94A6] hover:text-white'
                    }`}
                  >
                    <div className="font-bold">Edge KV</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">Sub-5ms Global</div>
                  </button>
                </div>
              </div>

              {/* Parameter 3: AI Inference Engine Selector */}
              <div className="p-5 rounded-xl bg-[#14171F] border border-[rgba(138,148,166,0.15)] space-y-3">
                <div className="text-xs font-mono uppercase text-[#CBD5E1] font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#FF7A59]" />
                  <span>AI Inference Execution Engine</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setAiEngine('standard')}
                    className={`p-3 rounded-lg text-left text-xs font-mono transition-all border ${
                      aiEngine === 'standard'
                        ? 'bg-[#2A1815] border-[#FF7A59] text-white shadow-sm'
                        : 'bg-[#181C24] border-[rgba(138,148,166,0.2)] text-[#8A94A6] hover:text-white'
                    }`}
                  >
                    <div className="font-bold">Legacy API</div>
                    <div className="text-[10px] text-[#A0AEC0] mt-0.5">~1,200ms cold</div>
                  </button>

                  <button
                    onClick={() => setAiEngine('rag')}
                    className={`p-3 rounded-lg text-left text-xs font-mono transition-all border ${
                      aiEngine === 'rag'
                        ? 'bg-[#2A1815] border-[#FF7A59] text-white shadow-sm'
                        : 'bg-[#181C24] border-[rgba(138,148,166,0.2)] text-[#8A94A6] hover:text-white'
                    }`}
                  >
                    <div className="font-bold">Hybrid RAG</div>
                    <div className="text-[10px] text-[#A0AEC0] mt-0.5">Pgvector Index</div>
                  </button>

                  <button
                    onClick={() => setAiEngine('groq')}
                    className={`p-3 rounded-lg text-left text-xs font-mono transition-all border ${
                      aiEngine === 'groq'
                        ? 'bg-[#2A1815] border-[#FF7A59] text-white shadow-sm'
                        : 'bg-[#181C24] border-[rgba(138,148,166,0.2)] text-[#8A94A6] hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-white">Groq LPU</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">350 tok/s hardware</div>
                  </button>
                </div>
              </div>

              {/* Multi-Region Active Toggle */}
              <div className="p-4 rounded-xl bg-[#14171F] border border-[rgba(138,148,166,0.15)] flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Multi-Region Active-Active Replication</div>
                  <div className="text-[10px] font-mono text-[#8A94A6]">Distribute across US, EU, and APAC edge nodes</div>
                </div>
                <button
                  type="button"
                  onClick={() => setMultiRegion(!multiRegion)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    multiRegion ? 'bg-[#FF7A59]' : 'bg-[#2B3442]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      multiRegion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

            </div>

            {/* Right Column: Live Telemetry Display & Canvas Chart */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              
              {/* Primary Scoreboard Strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#14171F] border border-[rgba(138,148,166,0.2)]">
                  <div className="text-[11px] font-mono text-[#8A94A6] uppercase tracking-wider">
                    P99 Latency
                  </div>
                  <div className={`text-2xl sm:text-3xl font-extrabold font-mono mt-1 ${
                    computedLatency < 60 ? 'text-emerald-400' : computedLatency < 180 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {computedLatency}ms
                  </div>
                  <div className="text-[10px] font-mono text-[#718096] mt-0.5">
                    {computedLatency < 60 ? '⚡ Ultra-Responsive' : 'Degraded SLA'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#14171F] border border-[rgba(138,148,166,0.2)]">
                  <div className="text-[11px] font-mono text-[#8A94A6] uppercase tracking-wider">
                    Throughput
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
                    {throughput}
                  </div>
                  <div className="text-[10px] font-mono text-[#718096] mt-0.5">
                    Requests / Second
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#14171F] border border-[rgba(138,148,166,0.2)]">
                  <div className="text-[11px] font-mono text-[#8A94A6] uppercase tracking-wider">
                    Cache Hit Rate
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#FFA07A] mt-1">
                    {cacheHitRatio}%
                  </div>
                  <div className="text-[10px] font-mono text-[#718096] mt-0.5">
                    Origin Offload
                  </div>
                </div>
              </div>

              {/* Rolling Waveform Chart */}
              <div className="p-5 rounded-xl bg-[#14171F] border border-[rgba(138,148,166,0.15)] space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-[#8A94A6]">
                  <span className="flex items-center gap-1.5 text-white font-semibold">
                    <Activity className="w-3.5 h-3.5 text-[#FF7A59]" />
                    <span>Realtime Latency Waveform</span>
                  </span>
                  <span className="text-[10px]">Window: 50 Samples</span>
                </div>

                <div className="w-full h-[140px] relative overflow-hidden rounded-lg bg-[#0E1015]">
                  <canvas ref={canvasRef} className="w-full h-full" />
                </div>
              </div>

              {/* Terminal Log Output Stream */}
              <div className="p-4 rounded-xl bg-[#0E1015] border border-[#202735] space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-[#8A94A6] border-b border-[#202735] pb-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#FF7A59]" />
                    <span>edge_proxy.log</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">STREAMING</span>
                </div>

                <div className="space-y-1 text-[11px] text-[#A0AEC0]">
                  {logEntries.length === 0 ? (
                    <div className="text-[#64748B] italic">Waiting for inbound telemetry...</div>
                  ) : (
                    logEntries.map((log, idx) => (
                      <div key={idx} className="truncate hover:text-white transition-colors">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Architectural Recommendation Banner */}
          <div className="mt-8 p-4 rounded-xl bg-[#181C25] border border-[rgba(138,148,166,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                <strong className="text-white">Optimal Enterprise Topology:</strong> Cloudflare Edge Workers + Redis L2 + Groq Hardware Inference maintains sub-30ms P99 latency even under 200,000+ req/min surges.
              </p>
            </div>

            <a
              href="#contact"
              className="btn-primary text-xs font-semibold whitespace-nowrap px-4 py-2 flex items-center gap-1.5"
            >
              <span>Deploy This Spec</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

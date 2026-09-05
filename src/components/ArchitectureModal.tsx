import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Code, 
  Layers, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Copy, 
  Check, 
  Cpu, 
  Database, 
  Server, 
  Globe 
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    title: string;
    domain?: string;
    category?: string;
    summary: string;
    architectureOverview?: string;
    techStack: string[];
    impact?: { metric: string; label: string }[];
    solution?: string;
  } | null;
  onDeployBlueprint: (title: string) => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
  item,
  onDeployBlueprint
}) => {
  const [activeTab, setActiveTab] = useState<'topology' | 'contracts' | 'sla'>('topology');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const sampleTypeScriptContract = `// Architecture Contract: ${item.title}
export interface SystemTopologyConfig {
  serviceName: "${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}";
  clusterTier: "Enterprise Multi-Region";
  p99LatencyThresholdMs: 35;
  zeroTrustAuth: true;
  cacheTtlSeconds: 300;
  retrievalEngine: {
    vectorDimension: 1536;
    similarityMetric: "cosine";
    indexType: "HNSW_SQ8";
  };
  rateLimit: {
    windowSeconds: 60;
    maxRequestsPerClient: 2500;
  };
}

export async function dispatchTelemetryEvent(payload: SystemTopologyConfig): Promise<{ status: "ACK" | "FAIL"; latencyMs: number }> {
  // Edge-routed microsecond telemetry dispatch
  return { status: "ACK", latencyMs: 14 };
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleTypeScriptContract);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0B0D11]/85 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#14171E] border border-[rgba(138,148,166,0.25)] shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-[rgba(138,148,166,0.2)] bg-[#181C24] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF7A59]/15 border border-[#FF7A59]/30 flex items-center justify-center text-[#FF7A59]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#FF7A59] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#FF7A59]/10 border border-[#FF7A59]/25">
                  {item.category || 'Architecture Blueprint'}
                </span>
                <span className="text-xs font-mono text-[#8A94A6]">SPECIFICATION</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight leading-tight mt-0.5">
                {item.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-[#8A94A6] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[rgba(138,148,166,0.15)] bg-[#121419] px-6">
          <button
            onClick={() => setActiveTab('topology')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'topology'
                ? 'border-[#FF7A59] text-white'
                : 'border-transparent text-[#8A94A6] hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Topology & Flow</span>
          </button>

          <button
            onClick={() => setActiveTab('contracts')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'contracts'
                ? 'border-[#FF7A59] text-white'
                : 'border-transparent text-[#8A94A6] hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>API & Type Contract</span>
          </button>

          <button
            onClick={() => setActiveTab('sla')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'sla'
                ? 'border-[#FF7A59] text-white'
                : 'border-transparent text-[#8A94A6] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SLA & Guardrails</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {activeTab === 'topology' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Architecture Pipeline Visualizer */}
              <div className="p-5 rounded-xl bg-[#101217] border border-[rgba(138,148,166,0.15)] space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-[#FFA07A] flex items-center justify-between">
                  <span>Execution Pipeline</span>
                  <span className="text-[10px] text-emerald-400 font-normal">Verified Pipeline</span>
                </div>

                {/* Interactive Topology Graph */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-center">
                  <div className="p-3 rounded-lg bg-[#181C24] border border-[#2A3444] space-y-1">
                    <Globe className="w-4 h-4 text-[#8A94A6] mx-auto" />
                    <div className="text-xs font-semibold text-white">1. Edge Ingress</div>
                    <div className="text-[10px] font-mono text-[#8A94A6]">Cloudflare Worker &lt;5ms</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#181C24] border border-[#2A3444] space-y-1">
                    <Server className="w-4 h-4 text-[#FF7A59] mx-auto" />
                    <div className="text-xs font-semibold text-white">2. Microservice Mesh</div>
                    <div className="text-[10px] font-mono text-[#8A94A6]">FastAPI / Node async</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#181C24] border border-[#2A3444] space-y-1">
                    <Zap className="w-4 h-4 text-[#FFA07A] mx-auto" />
                    <div className="text-xs font-semibold text-white">3. In-Memory Cache</div>
                    <div className="text-[10px] font-mono text-[#8A94A6]">Redis Cluster L2</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#181C24] border border-[#2A3444] space-y-1">
                    <Database className="w-4 h-4 text-emerald-400 mx-auto" />
                    <div className="text-xs font-semibold text-white">4. State & Vector DB</div>
                    <div className="text-[10px] font-mono text-[#8A94A6]">Pgvector / Sharded SQL</div>
                  </div>
                </div>

                <p className="text-xs text-[#CBD5E1] leading-relaxed pt-2">
                  {item.architectureOverview || item.summary}
                </p>
              </div>

              {/* Applied Tech Stack */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8A94A6]">
                  Production Tooling Matrix
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md bg-[#181C24] border border-[rgba(138,148,166,0.2)] text-xs text-[#CBD5E1] font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantitative Metrics */}
              {item.impact && item.impact.length > 0 && (
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {item.impact.map((imp, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#161A22] border border-[rgba(138,148,166,0.15)]">
                      <div className="text-xl font-bold font-mono text-coral-gradient">
                        {imp.metric}
                      </div>
                      <div className="text-[11px] text-[#8A94A6] leading-tight mt-0.5">
                        {imp.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-mono text-[#8A94A6]">
                <span>types/system-spec.ts</span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-xs text-[#FFA07A] hover:text-white transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied Contract' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-[#0E1015] border border-[#232936] text-xs font-mono text-[#E2E8F0] overflow-x-auto leading-relaxed">
                <code>{sampleTypeScriptContract}</code>
              </pre>
            </div>
          )}

          {activeTab === 'sla' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#161A22] border border-[#2B3444] space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Availability Guarantee</span>
                  </div>
                  <p className="text-xs text-[#8A94A6] leading-relaxed">
                    99.99% monthly uptime backed by multi-region active-active clusters and automated health recovery probes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#161A22] border border-[#2B3444] space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs">
                    <Zap className="w-4 h-4 text-[#FF7A59]" />
                    <span>P99 Latency SLA</span>
                  </div>
                  <p className="text-xs text-[#8A94A6] leading-relaxed">
                    Strict sub-40ms P99 API response target with edge hydration and optimistic client mutations.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#161A22] border border-[#2B3444] space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs">
                    <ShieldCheck className="w-4 h-4 text-[#FFA07A]" />
                    <span>Zero-Trust Security</span>
                  </div>
                  <p className="text-xs text-[#8A94A6] leading-relaxed">
                    TLS 1.3, ephemeral OAuth 2.1 tokens, RBAC permission scopes, and end-to-end audit logging.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#161A22] border border-[#2B3444] space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span>AI Determinism Guardrails</span>
                  </div>
                  <p className="text-xs text-[#8A94A6] leading-relaxed">
                    Enforced JSON Schema validation on all LLM outputs with zero data retention for training.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Action */}
        <div className="px-6 py-4 bg-[#181C24] border-t border-[rgba(138,148,166,0.2)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#8A94A6]">
            Deploy this architecture with custom SLA and dedicated infrastructure:
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-md text-xs font-semibold text-[#CBD5E1] hover:text-white bg-transparent hover:bg-white/5 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onDeployBlueprint(item.title);
              }}
              className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 text-xs font-semibold whitespace-nowrap"
            >
              <span>Initiate Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

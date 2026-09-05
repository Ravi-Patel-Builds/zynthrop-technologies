import React, { useState } from 'react';
import { 
  Calculator, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Server,
  Database
} from 'lucide-react';

interface ProjectEstimatorProps {
  onApplyProposal: (proposalText: string, scopeType: 'Web App' | 'Full-Stack System' | 'AI Integration') => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ onApplyProposal }) => {
  const [projectType, setProjectType] = useState<'Web App' | 'Full-Stack System' | 'AI Integration'>('Full-Stack System');
  const [scaleTier, setScaleTier] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'redis-cache',
    'vector-db',
    'auth-rbac'
  ]);

  const featureOptions = [
    { id: 'redis-cache', label: 'In-Memory Caching (Redis L2)', tag: '<10ms Hits', cat: 'Perf' },
    { id: 'vector-db', label: 'Vector Search & RAG (Pgvector)', tag: 'AI Retrieval', cat: 'AI' },
    { id: 'auth-rbac', label: 'Multi-Tenant RBAC & OAuth 2.1', tag: 'Security', cat: 'Auth' },
    { id: 'websocket', label: 'Real-Time WebSockets Stream', tag: 'Live Sync', cat: 'Realtime' },
    { id: 'payment', label: 'Stripe Billing & Metered Usage', tag: 'Monetization', cat: 'SaaS' },
    { id: 'cicd', label: 'Automated CI/CD & Multi-Region', tag: 'DevOps', cat: 'Cloud' }
  ];

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) => 
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Compute estimate
  let sprintWeeks = projectType === 'Web App' ? 3 : projectType === 'Full-Stack System' ? 5 : 6;
  if (scaleTier === 'enterprise') sprintWeeks += 3;
  if (selectedFeatures.length > 4) sprintWeeks += 1;

  const estimatedSLA = scaleTier === 'enterprise' ? '99.999% SLA' : scaleTier === 'growth' ? '99.95% SLA' : '99.9% SLA';
  const estimatedLatency = selectedFeatures.includes('redis-cache') ? '<35ms P99' : '<90ms P99';

  const handleApply = () => {
    const summaryText = `[AUTOMATED ARCHITECTURE ESTIMATE]
- Selected System: ${projectType} (${scaleTier.toUpperCase()} Tier)
- Target Timeline: ${sprintWeeks} Weeks to Production Ready
- SLA Guarantee: ${estimatedSLA}, Latency: ${estimatedLatency}
- Selected Capabilities: ${selectedFeatures.map(f => featureOptions.find(o => o.id === f)?.label).join(', ')}
- Goal: Please schedule a technical discovery call to review this architecture.`;

    onApplyProposal(summaryText, projectType);
  };

  return (
    <div className="rounded-2xl glass border border-[rgba(138,148,166,0.25)] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.65)] space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[rgba(138,148,166,0.15)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FF7A59]/15 border border-[#FF7A59]/30 flex items-center justify-center text-[#FF7A59]">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Scope & Architecture Estimator
            </h3>
            <p className="text-xs text-[#8A94A6]">
              Configure system requirements to calculate timelines and SLA targets.
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-[#181C24] border border-[#2B3444] text-[10px] font-mono text-[#FFA07A]">
          ESTIMATOR
        </span>
      </div>

      {/* Step 1: System Domain */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase text-[#CBD5E1] font-semibold flex items-center gap-1.5">
          <span>1. System Type</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {(['Web App', 'Full-Stack System', 'AI Integration'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setProjectType(type)}
              className={`p-3 rounded-lg text-left text-xs font-mono transition-all border ${
                projectType === type
                  ? 'bg-[#2A1815] border-[#FF7A59] text-white shadow-sm'
                  : 'bg-[#181C24] border-[rgba(138,148,166,0.2)] text-[#8A94A6] hover:text-white'
              }`}
            >
              <div className="font-bold">{type}</div>
              <div className="text-[10px] text-[#A0AEC0] mt-0.5">
                {type === 'Web App' ? 'Interactive SPA / Portal' : type === 'Full-Stack System' ? 'API Gateway + DB Mesh' : 'RAG & Autonomous Agents'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Scale & Reliability Tier */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase text-[#CBD5E1] font-semibold flex items-center gap-1.5">
          <span>2. Scale Tier</span>
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => setScaleTier('mvp')}
            className={`p-3 rounded-lg text-left text-xs font-mono transition-all border ${
              scaleTier === 'mvp'
                ? 'bg-[#2A1815] border-[#FF7A59] text-white'
                : 'bg-[#181C24] border-[rgba(138,148,166,0.2)] text-[#8A94A6] hover:text-white'
            }`}
          >
            <div className="font-bold">Standard</div>
            <div className="text-[10px] text-[#A0AEC0]">Up to 10k users</div>
          </button>

          <button
            type="button"
            onClick={() => setScaleTier('growth')}
            className={`p-3 rounded-lg text-left text-xs font-mono transition-all border ${
              scaleTier === 'growth'
                ? 'bg-[#2A1815] border-[#FF7A59] text-white'
                : 'bg-[#181C24] border-[rgba(138,148,166,0.2)] text-[#8A94A6] hover:text-white'
            }`}
          >
            <div className="font-bold">Growth</div>
            <div className="text-[10px] text-emerald-400">10k - 200k users</div>
          </button>

          <button
            type="button"
            onClick={() => setScaleTier('enterprise')}
            className={`p-3 rounded-lg text-left text-xs font-mono transition-all border ${
              scaleTier === 'enterprise'
                ? 'bg-[#2A1815] border-[#FF7A59] text-white'
                : 'bg-[#181C24] border-[rgba(138,148,166,0.2)] text-[#8A94A6] hover:text-white'
            }`}
          >
            <div className="font-bold">Enterprise</div>
            <div className="text-[10px] text-[#A0AEC0]">Multi-Region High SLA</div>
          </button>
        </div>
      </div>

      {/* Step 3: Required Engineering Modules */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase text-[#CBD5E1] font-semibold flex items-center justify-between">
          <span>3. Infrastructure Modules</span>
          <span className="text-[10px] text-[#8A94A6] lowercase font-normal">select all that apply</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {featureOptions.map((feat) => {
            const isSelected = selectedFeatures.includes(feat.id);
            return (
              <button
                key={feat.id}
                type="button"
                onClick={() => toggleFeature(feat.id)}
                className={`p-2.5 rounded-lg text-left text-xs font-mono flex items-center justify-between transition-all border ${
                  isSelected
                    ? 'bg-[#2A1815]/80 border-[#FF7A59] text-white'
                    : 'bg-[#181C24] border-[rgba(138,148,166,0.15)] text-[#8A94A6] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                    isSelected ? 'bg-[#FF7A59] text-white' : 'border border-[#4A5568]'
                  }`}>
                    {isSelected && '✓'}
                  </div>
                  <span>{feat.label}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-[#FFA07A]">
                  {feat.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Computed Estimate Output Card */}
      <div className="p-4 rounded-xl bg-[#121419] border border-[#2B3444] space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-2.5 rounded-lg bg-[#181C24]">
            <div className="text-[10px] font-mono text-[#8A94A6] uppercase">Delivery Timeline</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white mt-0.5">
              ~{sprintWeeks} Weeks
            </div>
            <div className="text-[10px] font-mono text-emerald-400">Production Sprint</div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#181C24]">
            <div className="text-[10px] font-mono text-[#8A94A6] uppercase">Target Latency</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-[#FFA07A] mt-0.5">
              {estimatedLatency}
            </div>
            <div className="text-[10px] font-mono text-[#8A94A6]">Global Edge Hydrated</div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#181C24]">
            <div className="text-[10px] font-mono text-[#8A94A6] uppercase">Uptime SLA</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white mt-0.5">
              {estimatedSLA}
            </div>
            <div className="text-[10px] font-mono text-emerald-400">Active Failover</div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="w-full btn-primary flex items-center justify-center gap-2 text-xs font-semibold py-3"
        >
          <span>Apply Estimate to Inquiry Form</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  BarChart3, 
  Bot, 
  Network, 
  ExternalLink, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Sparkles, 
  ArrowUpRight, 
  Shield, 
  Activity, 
  Code,
  FileCode2
} from 'lucide-react';
import { CaseStudyItem } from '../types';
import { ArchitectureModal } from './ArchitectureModal';

interface CaseStudiesProps {
  onDiscussProject: (projectDomain: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onDiscussProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Web App' | 'Full-Stack' | 'AI System'>('All');
  const [activeModalItem, setActiveModalItem] = useState<any | null>(null);

  const caseStudies: (CaseStudyItem & {
    icon: React.ElementType;
    badge: string;
    architectureOverview: string;
  })[] = [
    {
      id: 'case-pulse-analytics',
      title: 'Real-Time Financial Intelligence Engine',
      domain: 'High-Frequency Fintech SaaS',
      category: 'Web App',
      icon: BarChart3,
      badge: 'Interactive Web Application',
      summary:
        'High-density trading and risk dashboard processing 1.4M incoming tick events per minute with sub-35ms render latency.',
      challenge:
        'Severe DOM lag and memory degradation during prolonged market feeds across 25,000+ concurrent traders.',
      solution:
        'Architected a Next.js/TypeScript frontend using WebGL-accelerated canvas rendering, binary WebSocket deserialization, and state virtualization.',
      techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Chart.js / D3'],
      impact: [
        { metric: '-68%', label: 'First Contentful Paint latency' },
        { metric: '1.4M', label: 'Events processed / min' },
        { metric: '0', label: 'Memory leak dropouts' }
      ],
      architectureOverview: 'Client-side WebWorker telemetry decompression + Virtualized Canvas grid rendering.'
    },
    {
      id: 'case-omni-cognitive',
      title: 'Autonomous Medical Record Triage & RAG Assistant',
      domain: 'Healthcare AI & Automation',
      category: 'AI System',
      icon: Bot,
      badge: 'AI & LLM Integration',
      summary:
        'HIPAA-compliant generative AI triage agent analyzing EHR records and clinical timelines with sub-second retrieval.',
      challenge:
        'Manual analysis of disjointed PDF records consumed 3+ hours daily per clinician with high error risk.',
      solution:
        'Constructed a deterministic RAG pipeline via Google Vertex AI, Groq LPU inference, and hybrid vector search in Pgvector.',
      techStack: ['Python', 'FastAPI', 'Google Vertex AI', 'Groq API', 'Pgvector', 'Docker'],
      impact: [
        { metric: '99.4%', label: 'Clinical extraction precision' },
        { metric: '4.8x', label: 'Faster patient triage cycle' },
        { metric: '3.1 hrs', label: 'Saved per physician daily' }
      ],
      architectureOverview: 'Two-stage retrieval (BM25 + Dense Embeddings) -> Groq high-speed token inference -> JSON Schema validation.'
    },
    {
      id: 'case-nexus-cloud',
      title: 'Distributed Incident Triage & Automated Remediation Mesh',
      domain: 'Cloud Infrastructure & DevOps',
      category: 'Full-Stack',
      icon: Network,
      badge: 'Full-Stack Architecture',
      summary:
        'Multi-region incident triage platform correlating telemetry across 800+ microservices with automated remediation.',
      challenge:
        'Cascading timeouts during peak traffic surges caused outages taking 24+ minutes to diagnose.',
      solution:
        'Engineered a distributed event broker on Redis Cluster and partitioned PostgreSQL with automated circuit breakers.',
      techStack: ['Node.js', 'FastAPI', 'Python', 'Docker', 'Redis Cluster', 'PostgreSQL', 'GraphQL'],
      impact: [
        { metric: '99.995%', label: 'Production cluster uptime' },
        { metric: '-82%', label: 'Mean Time to Recovery (MTTR)' },
        { metric: '$410K', label: 'Annual infrastructure savings' }
      ],
      architectureOverview: 'Decoupled event-driven bus -> Real-time GraphQL subscriptions -> Automated canary rollback.'
    }
  ];

  const filteredStudies = selectedCategory === 'All' 
    ? caseStudies 
    : caseStudies.filter((c) => c.category === selectedCategory);

  return (
    <section 
      id="case-studies" 
      aria-label="Case Studies and Proof of Work" 
      className="py-24 relative z-10 border-t border-[rgba(138,148,166,0.15)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1e24] border border-[rgba(138,148,166,0.2)] text-xs font-mono uppercase tracking-wider text-[#FFA07A]">
              <Activity className="w-3.5 h-3.5 text-[#FF7A59]" />
              <span>Case Studies</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Featured Case Studies & <span className="text-gradient">Production Benchmarks.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#A0AEC0] max-w-2xl">
              Production implementations with verified throughput, latency, and reliability metrics.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-[#1a1e24] border border-[rgba(138,148,166,0.2)] self-start md:self-auto">
            {(['All', 'Web App', 'Full-Stack', 'AI System'] as const).map((category) => (
              <button
                key={category}
                id={`filter-case-studies-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#FF7A59] to-[#FFA07A] text-white shadow-sm'
                    : 'text-[#A0AEC0] hover:text-white hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Cards Stack */}
        <div className="space-y-8">
          {filteredStudies.map((study) => {
            const Icon = study.icon;

            return (
              <div
                key={study.id}
                id={`case-study-card-${study.id}`}
                className="rounded-xl glass hover:border-[#FF7A59]/40 transition-all duration-300 shadow-[0_12px_32px_rgba(0,0,0,0.4)] p-6 sm:p-8 lg:p-10 relative overflow-hidden group"
              >
                {/* Subtle side accent border on hover */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF7A59]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF7A59]/10 transition-colors" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Context, Challenge, Solution */}
                  <div className="lg:col-span-8 space-y-6">
                    {/* Header line */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono text-[#FFA07A] bg-[#FF7A59]/10 border border-[#FF7A59]/25">
                        {study.badge}
                      </span>
                      <span className="text-xs font-mono text-[#8A94A6]">
                        {study.domain}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {study.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                      {study.summary}
                    </p>

                    {/* Challenge Box */}
                    <div className="rounded-lg bg-[#121418] border border-[rgba(138,148,166,0.15)] p-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFA07A] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                        <span>The Challenge</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    {/* Solution Box */}
                    <div className="rounded-lg bg-[#151921] border border-[rgba(138,148,166,0.15)] p-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CBD5E1] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A59]" />
                        <span>Engineering Solution</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed">
                        {study.solution}
                      </p>
                    </div>

                    {/* Tech Stack Tags with icons */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#8A94A6]">
                        Applied Tech Stack
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {study.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="tech-tag"
                          >
                            <Code className="w-3 h-3 text-[#FF7A59] mr-1" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Quantitative Impact & CTA */}
                  <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 lg:pl-4 lg:border-l lg:border-[#232A36]">
                    
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFA07A] mb-4 font-semibold">
                        <TrendingUp className="w-4 h-4 text-[#FF7A59]" />
                        <span>Measurable Impact</span>
                      </div>

                      <div className="grid grid-cols-1 gap-3.5">
                        {study.impact.map((imp, idx) => (
                          <div 
                            key={idx}
                            className="p-4 rounded-xl bg-[#121419] border border-[#27303E] group-hover:border-[#384457] transition-all"
                          >
                            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight text-coral-gradient">
                              {imp.metric}
                            </div>
                            <div className="text-xs text-[#8A94A6] mt-1 leading-snug">
                              {imp.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Architectural Blueprint Snippet */}
                    <div className="p-3.5 rounded-xl bg-[#101217] border border-[#202632] text-xs font-mono text-[#8A94A6] space-y-1">
                      <span className="text-[#FFA07A] font-semibold text-[11px] block">
                        Architecture Blueprint
                      </span>
                      <p className="text-[11px] text-[#A0AEC0] leading-relaxed">
                        {study.architectureOverview}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-2.5 w-full">
                      <button
                        id={`btn-case-inspect-${study.id}`}
                        onClick={() => setActiveModalItem(study)}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#14171E] hover:bg-[#1E2430] border border-[#2B3444] hover:border-[#FF7A59]/40 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm group"
                      >
                        <FileCode2 className="w-3.5 h-3.5 text-[#FF7A59] group-hover:scale-110 transition-transform" />
                        <span>View Architecture Spec</span>
                      </button>

                      <button
                        id={`btn-case-discuss-${study.id}`}
                        onClick={() => onDiscussProject(study.title)}
                        className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-[#1C222C] hover:bg-gradient-to-r hover:from-[#FF7A59] hover:to-[#FFA07A] border border-[#333E50] hover:border-[#FFA07A]/50 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span>Discuss Similar Project</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Deep-dive Architecture Modal */}
        <ArchitectureModal
          isOpen={activeModalItem !== null}
          onClose={() => setActiveModalItem(null)}
          item={activeModalItem}
          onDeployBlueprint={(title) => onDiscussProject(title)}
        />

      </div>
    </section>
  );
};

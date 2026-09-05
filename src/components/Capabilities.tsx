import React, { useState } from 'react';
import { 
  Globe, 
  Layers, 
  BrainCircuit, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Server, 
  Database, 
  Gauge, 
  Lock, 
  Zap, 
  Workflow,
  FileCode2
} from 'lucide-react';
import { CapabilityItem } from '../types';
import { ArchitectureModal } from './ArchitectureModal';

interface CapabilitiesProps {
  onSelectService: (serviceName: string) => void;
}

export const Capabilities: React.FC<CapabilitiesProps> = ({ onSelectService }) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [activeSpecItem, setActiveSpecItem] = useState<any | null>(null);

  const capabilities: (CapabilityItem & {
    icon: React.ElementType;
    architecturalHighlights: string[];
    sampleDeliverable: string;
  })[] = [
    {
      id: 'custom-web-applications',
      title: 'Custom Web Applications',
      tagline: 'High-performance, responsive, and built with modern frameworks.',
      description:
        'We engineer interactive, lightning-fast web applications designed for demanding enterprise workflows, fluid user experiences, and seamless responsiveness across any screen size.',
      icon: Globe,
      features: [
        'React, Next.js & TypeScript architecture',
        'Sub-second First Contentful Paint (FCP)',
        'Fluid animations & responsive design systems',
        'Rigorous automated E2E & unit test coverage'
      ],
      architecturalHighlights: [
        'Component-driven atomic design architecture',
        'State hydration & edge caching strategies',
        'Optimistic UI mutations for zero perceptible lag',
        'WCAG 2.1 AA accessibility compliance standards'
      ],
      metricsBadge: '0.4s Core Web Vitals',
      sampleDeliverable: 'Enterprise SaaS Platforms & Portals'
    },
    {
      id: 'full-stack-systems',
      title: 'Full-Stack Systems',
      tagline: 'Resilient backend architectures, secure APIs, and robust databases.',
      description:
        'From high-throughput event queues to distributed transactional databases, we construct secure, fault-tolerant backend foundations that reliably scale to millions of concurrent users.',
      icon: Layers,
      features: [
        'Microservices & modular monolith backends',
        'High-concurrency Node.js, Python & FastAPI',
        'PostgreSQL, Redis & distributed caching',
        'Zero-trust API security & role-based access'
      ],
      architecturalHighlights: [
        'Multi-region active-active database replication',
        'Message queue buffering with Redis & Kafka',
        'Strict schema validation with Pydantic & Zod',
        'Automated CI/CD pipelines & container orchestration'
      ],
      metricsBadge: '99.99% Fault Tolerance',
      sampleDeliverable: 'Scalable Microservice & API Infrastructure'
    },
    {
      id: 'ai-llm-integration',
      title: 'AI & LLM Integration',
      tagline: 'Custom AI agents, RAG pipelines, and automated intelligence workflows.',
      description:
        'Transform static software into cognitive systems. We integrate production-grade LLM pipelines, autonomous multi-step agents, and custom retrieval-augmented generation (RAG) engines.',
      icon: BrainCircuit,
      features: [
        'Vector database embeddings & semantic search',
        'Autonomous task agents with tool calling',
        'Streaming token generation & low-latency inference',
        'Deterministic guardrails & evaluation harness'
      ],
      architecturalHighlights: [
        'Hybrid dense/sparse retrieval with Pinecone & Pgvector',
        'Context-window optimization & smart reranking',
        'Structured JSON output validation & schema enforcement',
        'Enterprise data privacy with zero model training retention'
      ],
      metricsBadge: 'Sub-300ms First Token',
      sampleDeliverable: 'Custom Cognitive Agents & Triage Pipelines'
    }
  ];

  return (
    <section 
      id="capabilities" 
      aria-label="Capabilities and Services" 
      className="py-24 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181C24] border border-[#2B3441] text-xs font-mono uppercase tracking-wider text-[#FF7A59]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A59]" />
            <span>Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Specialized Architecture.{' '}
            <span className="text-coral-gradient">Engineered to Scale.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A0AEC0] leading-relaxed">
            Structured for high throughput, enterprise security, and long-term maintainability.
          </p>
        </div>

        {/* 3 Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {capabilities.map((item) => {
            const Icon = item.icon;
            const isHovered = activeCard === item.id;

            return (
              <div
                key={item.id}
                id={`capability-card-${item.id}`}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative flex flex-col justify-between rounded-xl glass transition-all duration-300 p-6 lg:p-7 ${
                  isHovered
                    ? 'border-[#FF7A59]/60 shadow-[0_0_30px_rgba(255,122,89,0.25)] -translate-y-1'
                    : 'border-[rgba(138,148,166,0.2)] shadow-[0_8px_24px_rgba(0,0,0,0.4)]'
                }`}
              >
                {/* Top Subtle Ambient Glow */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-opacity duration-300 ${
                    isHovered 
                      ? 'bg-gradient-to-r from-[#FF7A59] to-[#FFA07A] opacity-100' 
                      : 'bg-transparent opacity-0'
                  }`} 
                />

                <div className="space-y-5">
                  {/* Top Bar: Icon & Metric Badge */}
                  <div className="flex items-center justify-between">
                    <div className="card-icon">
                      <Icon className="w-4 h-4 text-[#FF7A59]" />
                    </div>

                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono text-[#FF8C68] bg-[#FF7A59]/10 border border-[#FF7A59]/30">
                      {item.metricsBadge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#A0AEC0] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Tech Tags from Elegant Dark Design */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.id === 'custom-web-applications' && (
                      <>
                        <span className="tech-tag">React</span>
                        <span className="tech-tag">Next.js</span>
                        <span className="tech-tag">TypeScript</span>
                      </>
                    )}
                    {item.id === 'full-stack-systems' && (
                      <>
                        <span className="tech-tag">Python</span>
                        <span className="tech-tag">FastAPI</span>
                        <span className="tech-tag">Docker</span>
                      </>
                    )}
                    {item.id === 'ai-llm-integration' && (
                      <>
                        <span className="tech-tag">Vertex AI</span>
                        <span className="tech-tag">Groq</span>
                        <span className="tech-tag">LLMs</span>
                      </>
                    )}
                  </div>

                  {/* Core Features List */}
                  <div className="pt-2 space-y-2 border-t border-[rgba(138,148,166,0.15)]">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#A0AEC0]">
                      Key Specifications
                    </div>
                    <ul className="space-y-1.5">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                          <span className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 rounded-full bg-[#FF7A59]/15 text-[#FF7A59] flex items-center justify-center">
                            <Check className="w-2 h-2" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-5 mt-5 border-t border-[rgba(138,148,166,0.15)] space-y-2">
                  <button
                    id={`btn-spec-${item.id}`}
                    onClick={() => setActiveSpecItem({
                      title: item.title,
                      domain: item.sampleDeliverable,
                      category: 'Architecture Spec',
                      summary: item.description,
                      architectureOverview: item.architecturalHighlights.join('. '),
                      techStack: item.id === 'custom-web-applications' 
                        ? ['React', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vitest']
                        : item.id === 'full-stack-systems'
                        ? ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes']
                        : ['Google Vertex AI', 'Groq LPU', 'Pgvector', 'LangChain', 'FastAPI', 'Docker'],
                      impact: [
                        { metric: item.metricsBadge, label: 'Standard SLA Delivery' },
                        { metric: '100%', label: 'Type-Safe End-to-End' }
                      ]
                    })}
                    className="w-full py-2 px-3 rounded-md bg-[#161921] hover:bg-[#202530] text-xs font-semibold text-white border border-[#2B3444] hover:border-[#FF7A59]/40 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <FileCode2 className="w-3.5 h-3.5 text-[#FF7A59]" />
                    <span>Architecture Spec</span>
                  </button>

                  <button
                    id={`btn-select-${item.id}`}
                    onClick={() => onSelectService(item.title)}
                    className="w-full group/btn py-2 px-3.5 rounded-md bg-[#1a1e24] hover:bg-gradient-to-r hover:from-[#FF7A59] hover:to-[#FFA07A] text-xs font-semibold text-[#CBD5E1] hover:text-white border border-[rgba(138,148,166,0.2)] hover:border-transparent transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Technical Spec Architecture Modal */}
        <ArchitectureModal
          isOpen={activeSpecItem !== null}
          onClose={() => setActiveSpecItem(null)}
          item={activeSpecItem}
          onDeployBlueprint={(title) => onSelectService(title)}
        />

      </div>
    </section>
  );
};

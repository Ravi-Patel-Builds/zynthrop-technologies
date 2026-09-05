import React, { useState } from 'react';
import { 
  Code2, 
  Server, 
  Cpu, 
  Terminal, 
  Check, 
  Layers, 
  Flame, 
  GitBranch, 
  Search, 
  Zap, 
  ExternalLink,
  Copy,
  BarChart2,
  Sliders
} from 'lucide-react';
import { TechItem } from '../types';

export const TechStack: React.FC = () => {
  const [viewMode, setViewMode] = useState<'directory' | 'code-lab'>('directory');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Frontend' | 'Backend' | 'AI & Cloud/DevOps'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSnippetKey, setActiveSnippetKey] = useState<'fastapi' | 'nextjs' | 'rag'>('fastapi');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const codeSnippets = {
    fastapi: {
      title: 'FastAPI Async Microservice',
      runtime: 'Python 3.12 / Pydantic v2',
      p99: '14ms',
      memory: '42MB RSS',
      code: `@router.post("/v1/telemetry/stream", response_model=TelemetryResponse)
async def process_telemetry(
    payload: TelemetryInbound,
    db: AsyncSession = Depends(get_db_session),
    cache: RedisClient = Depends(get_redis_cluster)
) -> TelemetryResponse:
    # 1. Non-blocking distributed cache verification (<1ms)
    cached_state = await cache.get(f"telemetry:{payload.device_id}")
    if cached_state:
        return TelemetryResponse.model_validate_json(cached_state)

    # 2. Asynchronous batched database write
    result = await db.execute(insert(TelemetryRecord).values(**payload.model_dump()))
    await cache.setex(f"telemetry:{payload.device_id}", 60, result.to_json())
    return TelemetryResponse(status="INGESTED", latency_ms=14.2)`
    },
    nextjs: {
      title: 'Next.js 15 Edge Server Component',
      runtime: 'Node.js 22 / Edge Runtime',
      p99: '22ms TTFB',
      memory: '38MB RSS',
      code: `import { Suspense } from 'react';
import { cacheLife } from 'next/cache';

export default async function RealtimeDashboardPage() {
  'use cache';
  cacheLife('minutes');

  // Multi-region edge-hydrated streaming data
  const streamData = await fetch('https://edge.zynthrop.tech/api/metrics', {
    next: { revalidate: 30 }
  }).then(res => res.json());

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <FinancialCanvasVisualizer initialEvents={streamData.ticks} />
    </Suspense>
  );
}`
    },
    rag: {
      title: 'Groq + Pgvector RAG Inference Engine',
      runtime: 'LPU Engine / Pgvector HNSW',
      p99: '32ms End-to-End',
      memory: '64MB RSS',
      code: `async def query_knowledge_base(user_prompt: str) -> AgentResponse:
    # 1. Generate 1536-dim vector embedding (<8ms)
    query_vector = await embedding_engine.embed_query(user_prompt)
    
    # 2. HNSW cosine similarity lookup in partitioned Pgvector (<6ms)
    retrieved_docs = await vector_store.similarity_search_by_vector(
        embedding=query_vector, 
        k=5, 
        distance_threshold=0.82
    )
    
    # 3. Stream Groq LPU response at 350 tokens/second
    return await groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=build_grounded_prompt(user_prompt, retrieved_docs),
        response_format={"type": "json_object"}
    )`
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const techItems: (TechItem & {
    description: string;
    metrics: string;
    iconSymbol: string;
  })[] = [
    // Frontend
    {
      name: 'React',
      category: 'Frontend',
      level: 'Core Framework',
      highlight: 'React 19 Server Components, Suspense, Concurrent Rendering',
      description: 'Declarative component hierarchies, custom reactive hooks, and micro-frontend state orchestration.',
      metrics: 'Zero unneeded re-renders',
      iconSymbol: '⚛️'
    },
    {
      name: 'Next.js',
      category: 'Frontend',
      level: 'Production Standard',
      highlight: 'App Router, Streaming SSR, Edge Runtime & ISR',
      description: 'Full-stack React framework optimized for enterprise performance, SEO indexing, and hybrid caching.',
      metrics: 'Sub-second TTFB',
      iconSymbol: '▲'
    },
    {
      name: 'Tailwind CSS',
      category: 'Frontend',
      level: 'Production Standard',
      highlight: 'Tailwind v4 Engine, Custom Design Systems, JIT Optimization',
      description: 'Utility-first CSS architecture, bespoke tokens, dark-mode styling, and minimal stylesheet footprint.',
      metrics: '< 15kb Purged CSS',
      iconSymbol: '🎨'
    },
    {
      name: 'JavaScript / TypeScript',
      category: 'Frontend',
      level: 'Strict TypeScript',
      highlight: 'Strict Type Soundness, Generics, AST Validation, ES2024+',
      description: 'Zero-tolerance for runtime type exceptions, strict schema generation, and compile-time contract safety.',
      metrics: '100% Type Coverage',
      iconSymbol: 'TS'
    },

    // Backend
    {
      name: 'Python',
      category: 'Backend',
      level: 'Core Runtime',
      highlight: 'Asynchronous AsyncIO, Pydantic v2, Scientific Stack',
      description: 'High-performance script orchestration, data transformation pipelines, and native AI integration bindings.',
      metrics: 'High-Throughput Concurrency',
      iconSymbol: '🐍'
    },
    {
      name: 'FastAPI',
      category: 'Backend',
      level: 'High Concurrency',
      highlight: 'Asynchronous OpenAPI 3.1, Starlette Core, Dependency Injection',
      description: 'Ultra-fast Python web API framework delivering Go/Node-level throughput with automatic documentation.',
      metrics: 'P99 < 20ms JSON I/O',
      iconSymbol: '⚡'
    },
    {
      name: 'Node.js',
      category: 'Backend',
      level: 'Core Runtime',
      highlight: 'Node 22 LTS, Worker Threads, Event Loop Optimization',
      description: 'Non-blocking event-driven backend services handling real-time WebSockets, auth, and data ingestion.',
      metrics: '50k+ Concurrent Conns',
      iconSymbol: '🟢'
    },
    {
      name: 'REST & GraphQL APIs',
      category: 'Backend',
      level: 'Enterprise Standard',
      highlight: 'Federated Schemas, Apollo Server, Rate Limiting, OpenAPI',
      description: 'Self-documenting, resilient API interfaces engineered with cache headers, idempotent mutations, and telemetry.',
      metrics: 'Zero Over-fetching',
      iconSymbol: '⇄'
    },

    // AI & Cloud/DevOps
    {
      name: 'Docker',
      category: 'AI & Cloud/DevOps',
      level: 'Containers',
      highlight: 'Multi-stage builds, Distroless images, Compose & K8s',
      description: 'Immutable, hermetic container packaging ensuring identical behavior across local dev and cloud clusters.',
      metrics: '< 80MB Image Sizes',
      iconSymbol: '🐳'
    },
    {
      name: 'Google Vertex AI',
      category: 'AI & Cloud/DevOps',
      level: 'Enterprise AI',
      highlight: 'Gemini Models, Custom Embeddings, Vector Search Index',
      description: 'Enterprise generative AI platform for multimodal reasoning, grounded RAG search, and fine-tuned deployments.',
      metrics: 'Enterprise SLA & Security',
      iconSymbol: '✦'
    },
    {
      name: 'Groq API',
      category: 'AI & Cloud/DevOps',
      level: 'LPU Inference',
      highlight: 'LPU Inference Engine, 300+ Tokens/Sec, Llama-3 Models',
      description: 'Near-instantaneous token streaming architecture for real-time conversational agents and voice assistants.',
      metrics: '350+ Tokens / Second',
      iconSymbol: '⚡'
    },
    {
      name: 'Git & GitHub',
      category: 'AI & Cloud/DevOps',
      level: 'CI/CD Automation',
      highlight: 'GitHub Actions, Trunk-based Delivery, Automated Security Scanning',
      description: 'Continuous integration, branch protection, automated test execution, and zero-downtime deployment pipelines.',
      metrics: 'Automated CI/CD Gates',
      iconSymbol: '🐙'
    },
  ];

  const filteredItems = techItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      id="tech-stack" 
      aria-label="Master Tech Stack" 
      className="py-24 relative z-10 border-t border-[#1E2530]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1e24] border border-[rgba(138,148,166,0.2)] text-xs font-mono uppercase tracking-wider text-[#FF7A59]">
            <Cpu className="w-3.5 h-3.5 text-[#FF7A59]" />
            <span>Tech Stack</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Technology Stack & <span className="text-gradient">Infrastructure.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A0AEC0] leading-relaxed">
            Chosen for throughput, memory safety, and production resilience.
          </p>
        </div>

        {/* Marquee Ticker: Continuous smooth technology tape */}
        <div className="relative w-full overflow-hidden mb-12 py-3 rounded-xl bg-[#14171F] border border-[rgba(138,148,166,0.15)]">
          <div className="flex w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused] gap-6 px-4">
            {[...techItems, ...techItems].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-[#1a1e24] border border-[rgba(138,148,166,0.2)] text-xs font-medium text-[#E2E8F0] shadow-sm whitespace-nowrap"
              >
                <span className="font-mono text-[#FFA07A] font-bold">{item.iconSymbol}</span>
                <span className="text-white font-semibold">{item.name}</span>
                <span className="text-[10px] font-mono text-[#8A94A6] uppercase px-1.5 py-0.5 rounded bg-[#121418]">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* View Mode Toggle: Tooling Directory vs Interactive Code Lab */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-[#14171F] border border-[rgba(138,148,166,0.2)]">
            <button
              onClick={() => setViewMode('directory')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono flex items-center gap-2 transition-all ${
                viewMode === 'directory'
                  ? 'bg-gradient-to-r from-[#FF7A59] to-[#FFA07A] text-white shadow-sm'
                  : 'text-[#8A94A6] hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Tooling Directory</span>
            </button>

            <button
              onClick={() => setViewMode('code-lab')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono flex items-center gap-2 transition-all ${
                viewMode === 'code-lab'
                  ? 'bg-gradient-to-r from-[#FF7A59] to-[#FFA07A] text-white shadow-sm'
                  : 'text-[#8A94A6] hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Code & Benchmark Lab</span>
            </button>
          </div>
        </div>

        {viewMode === 'directory' ? (
          <>
            {/* Category Controls & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-[#1a1e24] border border-[rgba(138,148,166,0.2)] w-full sm:w-auto">
                {(['All', 'Frontend', 'Backend', 'AI & Cloud/DevOps'] as const).map((cat) => (
                  <button
                    key={cat}
                    id={`tech-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      activeCategory === cat
                        ? 'bg-gradient-to-r from-[#FF7A59] to-[#FFA07A] text-white shadow-sm'
                        : 'text-[#A0AEC0] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Filter Input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-[#8A94A6] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="tech-stack-search-input"
                  type="text"
                  placeholder="Search stack or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-md bg-[#1a1e24] border border-[rgba(138,148,166,0.2)] text-white placeholder-[#6E7B8E] focus:outline-none focus:border-[#FF7A59] transition-colors"
                />
              </div>

            </div>

            {/* Grouped Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((tech) => (
                <div
                  key={tech.name}
                  id={`tech-card-${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className="group p-6 rounded-xl glass hover:border-[#FF7A59]/45 transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.35)] flex flex-col justify-between hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#14171E] border border-[rgba(138,148,166,0.2)] flex items-center justify-center text-lg font-bold text-white shadow-inner group-hover:border-[#FF7A59]/40 transition-colors">
                          {tech.iconSymbol}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white group-hover:text-[#FFA07A] transition-colors">
                            {tech.name}
                          </h3>
                          <span className="text-[10px] font-mono text-[#8A94A6] uppercase">
                            {tech.category}
                          </span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-[#FF8C68] bg-[#FF7A59]/10 border border-[#FF7A59]/25">
                        {tech.level}
                      </span>
                    </div>

                    {/* Highlight specification */}
                    <div className="text-xs font-medium text-[#CBD5E1] bg-[#121418] p-2.5 rounded-md border border-[rgba(138,148,166,0.15)]">
                      {tech.highlight}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#8A94A6] leading-relaxed">
                      {tech.description}
                    </p>
                  </div>

                  {/* Footer Metric */}
                  <div className="pt-4 mt-4 border-t border-[rgba(138,148,166,0.15)] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#64748B]">Benchmark</span>
                    <span className="text-[#E2E8F0] font-semibold flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#FF7A59]" />
                      <span>{tech.metrics}</span>
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </>
        ) : (
          /* Interactive Code & Benchmark Lab Panel */
          <div className="rounded-2xl glass border border-[rgba(138,148,166,0.25)] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-6">
            
            {/* Snippet Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(138,148,166,0.15)] pb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveSnippetKey('fastapi')}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
                    activeSnippetKey === 'fastapi'
                      ? 'bg-[#FF7A59]/20 text-[#FFA07A] border border-[#FF7A59]/40'
                      : 'text-[#8A94A6] hover:text-white bg-[#14171E]'
                  }`}
                >
                  ⚡ FastAPI Microservice
                </button>

                <button
                  onClick={() => setActiveSnippetKey('nextjs')}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
                    activeSnippetKey === 'nextjs'
                      ? 'bg-[#FF7A59]/20 text-[#FFA07A] border border-[#FF7A59]/40'
                      : 'text-[#8A94A6] hover:text-white bg-[#14171E]'
                  }`}
                >
                  ▲ Next.js 15 Streaming
                </button>

                <button
                  onClick={() => setActiveSnippetKey('rag')}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
                    activeSnippetKey === 'rag'
                      ? 'bg-[#FF7A59]/20 text-[#FFA07A] border border-[#FF7A59]/40'
                      : 'text-[#8A94A6] hover:text-white bg-[#14171E]'
                  }`}
                >
                  🤖 Groq + Pgvector RAG
                </button>
              </div>

              {/* Benchmarks Strip */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-[#8A94A6]">
                  <span>P99:</span>
                  <span className="text-emerald-400 font-bold">{codeSnippets[activeSnippetKey].p99}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#8A94A6]">
                  <span>Footprint:</span>
                  <span className="text-white font-bold">{codeSnippets[activeSnippetKey].memory}</span>
                </div>
              </div>
            </div>

            {/* Code Block Container */}
            <div className="relative rounded-xl bg-[#0C0E13] border border-[#232936] p-4 overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2533] text-xs font-mono text-[#8A94A6]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E06C75]/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E5C07B]/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#98C379]/70" />
                  <span className="ml-2 text-white font-semibold">{codeSnippets[activeSnippetKey].title}</span>
                  <span className="text-[#64748B]">({codeSnippets[activeSnippetKey].runtime})</span>
                </div>

                <button
                  onClick={() => handleCopy(codeSnippets[activeSnippetKey].code)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#181C25] hover:bg-white/10 text-[#FFA07A] text-[11px] transition-colors"
                >
                  {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="pt-4 text-xs font-mono text-[#E2E8F0] overflow-x-auto leading-relaxed">
                <code>{codeSnippets[activeSnippetKey].code}</code>
              </pre>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

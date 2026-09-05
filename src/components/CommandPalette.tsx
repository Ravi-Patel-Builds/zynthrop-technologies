import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Terminal, 
  Cpu, 
  Activity, 
  Layers, 
  ArrowRight, 
  Zap, 
  X, 
  Check, 
  ShieldCheck, 
  Code,
  Sparkles
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenEstimator?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenEstimator
}) => {
  const [query, setQuery] = useState('');
  const [copiedMsg, setCopiedMsg] = useState('');

  // Keyboard shortcut listener for Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when palette is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const commands = [
    {
      id: 'capabilities',
      title: 'Explore Capabilities',
      category: 'Navigation',
      icon: Layers,
      action: () => {
        onNavigate('capabilities');
        onClose();
      }
    },
    {
      id: 'simulator',
      title: 'Run Latency Simulator',
      category: 'Interactive',
      icon: Activity,
      action: () => {
        onNavigate('simulator');
        onClose();
      }
    },
    {
      id: 'case-studies',
      title: 'View Case Studies',
      category: 'Navigation',
      icon: Cpu,
      action: () => {
        onNavigate('case-studies');
        onClose();
      }
    },
    {
      id: 'tech-stack',
      title: 'Inspect Tech Stack',
      category: 'Navigation',
      icon: Code,
      action: () => {
        onNavigate('tech-stack');
        onClose();
      }
    },
    {
      id: 'estimator',
      title: 'Open Scope & Architecture Estimator',
      category: 'Tool',
      icon: Zap,
      action: () => {
        onNavigate('contact');
        if (onOpenEstimator) onOpenEstimator();
        onClose();
      }
    },
    {
      id: 'founder',
      title: 'Leadership: Ravi Shankar Patel',
      category: 'Team',
      icon: ShieldCheck,
      action: () => {
        onNavigate('about');
        onClose();
      }
    },
    {
      id: 'contact',
      title: 'Schedule Technical Consultation',
      category: 'Intake',
      icon: ArrowRight,
      action: () => {
        onNavigate('contact');
        onClose();
      }
    },
    {
      id: 'copy-email',
      title: 'Copy Direct Email (ravishankarpatel431@gmail.com)',
      category: 'Action',
      icon: Check,
      action: () => {
        navigator.clipboard.writeText('ravishankarpatel431@gmail.com');
        setCopiedMsg('Copied ravishankarpatel431@gmail.com to clipboard!');
        setTimeout(() => setCopiedMsg(''), 2500);
      }
    }
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0A0C10]/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Palette Box */}
      <div className="relative w-full max-w-xl rounded-2xl bg-[#14171E] border border-[rgba(138,148,166,0.25)] shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10 overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[rgba(138,148,166,0.15)] bg-[#181C25]">
          <Terminal className="w-4 h-4 text-[#FF7A59] mr-3" />
          <input
            type="text"
            placeholder="Type a command, inspect specs, or jump to section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-[#718096] focus:outline-none font-mono"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#101217] border border-[#2B3444] text-[10px] font-mono text-[#8A94A6]">
            ESC
          </kbd>
        </div>

        {/* Feedback Alert if copied */}
        {copiedMsg && (
          <div className="px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <Check className="w-3.5 h-3.5" />
            <span>{copiedMsg}</span>
          </div>
        )}

        {/* Command List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#8A94A6] font-mono">
              No matching architectural commands found for "{query}"
            </div>
          ) : (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full px-3 py-2.5 rounded-lg flex items-center justify-between text-left hover:bg-[#1E232F] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-[#111318] border border-[rgba(138,148,166,0.15)] flex items-center justify-center text-[#8A94A6] group-hover:text-[#FF7A59] group-hover:border-[#FF7A59]/40 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-medium text-[#CBD5E1] group-hover:text-white transition-colors">
                      {cmd.title}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase text-[#718096] group-hover:text-[#FFA07A] transition-colors px-2 py-0.5 rounded bg-black/30">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-[#101217] border-t border-[rgba(138,148,166,0.15)] flex items-center justify-between text-[11px] font-mono text-[#718096]">
          <span>ZYNTHROP_CLI // FAST TELEMETRY</span>
          <div className="flex items-center gap-2">
            <span>Navigate with click</span>
            <span>•</span>
            <span>ESC to close</span>
          </div>
        </div>

      </div>
    </div>
  );
};

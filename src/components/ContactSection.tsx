import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Mail, 
  AlertCircle,
  Copy,
  Check,
  ChevronDown,
  Calculator,
  FileSpreadsheet
} from 'lucide-react';
import { ContactFormData } from '../types';
import { ProjectEstimator } from './ProjectEstimator';

interface ContactSectionProps {
  initialScope?: string;
  activeTab?: 'form' | 'estimator';
  onTabChange?: (tab: 'form' | 'estimator') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  initialScope,
  activeTab: controlledTab,
  onTabChange
}) => {
  const [internalTab, setInternalTab] = useState<'form' | 'estimator'>('form');
  const activeTab = controlledTab !== undefined ? controlledTab : internalTab;

  const setActiveTab = (tab: 'form' | 'estimator') => {
    setInternalTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    scope: (initialScope as any) || 'Full-Stack System',
    budget: '$25,000 - $50,000',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  // Sync initial scope if parent changes it
  React.useEffect(() => {
    if (initialScope) {
      if (['Web App', 'Full-Stack System', 'AI Integration'].includes(initialScope)) {
        setFormData((prev) => ({ ...prev, scope: initialScope as any }));
      }
    }
  }, [initialScope]);

  const validate = () => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      errs.name = 'Please provide your name';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!trimmedEmail) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(trimmedEmail)) {
      errs.email = 'Please enter a valid work email address';
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      errs.message = 'Please provide brief details about your project (at least 10 characters)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate realistic network transmission & verification
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const generatedId = `ZY-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmissionId(generatedId);
    }, 1200);
  };

  const handleCopyDirectEmail = () => {
    navigator.clipboard.writeText('ravishankarpatel431@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section 
      id="contact" 
      aria-label="Contact and Technical Consultation" 
      className="py-24 relative z-10 border-t border-[#1E2530]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1e24] border border-[rgba(138,148,166,0.2)] text-xs font-mono uppercase tracking-wider text-[#FF7A59]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A59]" />
            <span>Direct Inquiry</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Initiate a Technical <span className="text-gradient">Consultation.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A0AEC0] leading-relaxed">
            Direct consultation with engineering leadership. Inquiries reviewed and scoped within 24 hours.
          </p>
        </div>

        {/* Mode Switcher: Direct Intake vs Interactive Architecture Estimator */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-xl bg-[#14171F] border border-[rgba(138,148,166,0.2)]">
            <button
              id="tab-intake-form"
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono flex items-center gap-2 transition-all ${
                activeTab === 'form'
                  ? 'bg-gradient-to-r from-[#FF7A59] to-[#FFA07A] text-white shadow-sm'
                  : 'text-[#8A94A6] hover:text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Inquiry Form</span>
            </button>

            <button
              id="tab-architecture-estimator"
              onClick={() => setActiveTab('estimator')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono flex items-center gap-2 transition-all ${
                activeTab === 'estimator'
                  ? 'bg-gradient-to-r from-[#FF7A59] to-[#FFA07A] text-white shadow-sm'
                  : 'text-[#8A94A6] hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Scope & Budget Estimator</span>
            </button>
          </div>
        </div>

        {activeTab === 'estimator' ? (
          <div className="max-w-4xl mx-auto">
            <ProjectEstimator
              onApplyProposal={(proposalText, scopeType) => {
                setFormData((prev) => ({
                  ...prev,
                  message: proposalText,
                  scope: scopeType
                }));
                setActiveTab('form');
              }}
            />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-xl glass border border-[rgba(138,148,166,0.2)] space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Engineering Standards
                </h3>
                <p className="text-xs text-[#8A94A6] mt-1 leading-relaxed">
                  Every inquiry is evaluated directly by systems engineers.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 text-[#CBD5E1]">
                  <Clock className="w-4 h-4 text-[#FF7A59] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Rapid Response SLA</span>
                    <span className="text-[#8A94A6]">Replies delivered in under 4 business hours.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#CBD5E1]">
                  <ShieldCheck className="w-4 h-4 text-[#FFA07A] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Mutual NDA Standard</span>
                    <span className="text-[#8A94A6]">Proprietary specifications protected under NDA.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#CBD5E1]">
                  <Mail className="w-4 h-4 text-[#FF7A59] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Direct Engineering Desk</span>
                    <span className="text-[#8A94A6]">Direct route to principal engineering leadership.</span>
                  </div>
                </div>
              </div>

              {/* Direct email quick-copy card */}
              <div className="pt-4 border-t border-[rgba(138,148,166,0.15)]">
                <span className="text-[11px] font-mono text-[#8A94A6] uppercase tracking-wider block mb-2">
                  Direct Email
                </span>
                <button
                  type="button"
                  onClick={handleCopyDirectEmail}
                  className="w-full py-2.5 px-3 rounded-md bg-[#121418] hover:bg-white/5 border border-[rgba(138,148,166,0.2)] text-xs font-mono text-[#CBD5E1] hover:text-white transition-all flex items-center justify-between"
                >
                  <span className="truncate">ravishankarpatel431@gmail.com</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#FFA07A]">
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Field Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl glass border border-[rgba(138,148,166,0.2)] p-7 sm:p-9 shadow-[0_16px_40px_rgba(0,0,0,0.5)] relative">
              
              {isSubmitted ? (
                /* Success State */
                <div 
                  id="contact-submission-success"
                  className="py-8 text-center space-y-5 animate-in fade-in zoom-in duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF7A59] to-[#FFA07A] text-white flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(255,122,89,0.45)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      Project Dispatch Received
                    </h3>
                    <p className="text-sm text-[#A0AEC0] max-w-md mx-auto">
                      Thank you, <span className="text-white font-medium">{formData.name}</span>. Our engineering team has logged your specification.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#10131A] border border-[#263140] inline-block text-left text-xs font-mono space-y-1">
                    <div className="text-[#8A94A6]">Reference Number: <span className="text-[#FFA07A] font-bold">{submissionId}</span></div>
                    <div className="text-[#8A94A6]">Scope Category: <span className="text-white">{formData.scope}</span></div>
                    <div className="text-[#8A94A6]">Target Dispatch: <span className="text-emerald-400 font-semibold">Under 4 Hours</span></div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          scope: 'Full-Stack System',
                          budget: '$25,000 - $50,000',
                          message: ''
                        });
                      }}
                      className="text-xs font-semibold text-[#CBD5E1] hover:text-[#FFA07A] underline transition-colors"
                    >
                      Submit Another Project Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Fields */
                <form id="project-contact-form" onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-input-name" className="block text-xs font-medium text-[#CBD5E1]">
                        Full Name <span className="text-[#FF7A59]">*</span>
                      </label>
                      <input
                        id="contact-input-name"
                        type="text"
                        required
                        placeholder="e.g. Alex Mercer"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-md bg-[#121418] border text-sm text-white placeholder-[#5A6679] focus:outline-none focus:ring-1 transition-colors ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-[rgba(138,148,166,0.2)] focus:border-[#FF7A59] focus:ring-[#FF7A59]'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-input-email" className="block text-xs font-medium text-[#CBD5E1]">
                        Work Email <span className="text-[#FF7A59]">*</span>
                      </label>
                      <input
                        id="contact-input-email"
                        type="email"
                        required
                        placeholder="alex@enterprise.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-md bg-[#121418] border text-sm text-white placeholder-[#5A6679] focus:outline-none focus:ring-1 transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-[rgba(138,148,166,0.2)] focus:border-[#FF7A59] focus:ring-[#FF7A59]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Project Scope & Budget Dropdowns Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Project Scope Dropdown */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-select-scope" className="block text-xs font-medium text-[#CBD5E1]">
                        Project Scope / Type <span className="text-[#FF7A59]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="contact-select-scope"
                          value={formData.scope}
                          onChange={(e) =>
                            setFormData({ ...formData, scope: e.target.value as any })
                          }
                          className="w-full appearance-none px-3.5 py-2.5 rounded-md bg-[#121418] border border-[rgba(138,148,166,0.2)] text-sm text-white focus:outline-none focus:border-[#FF7A59] focus:ring-1 focus:ring-[#FF7A59] transition-colors pr-9"
                        >
                          <option value="Web App">Web App</option>
                          <option value="Full-Stack System">Full-Stack System</option>
                          <option value="AI Integration">AI Integration</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#8A94A6] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Budget Range Dropdown */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-select-budget" className="block text-xs font-medium text-[#CBD5E1]">
                        Estimated Budget Range <span className="text-[#FF7A59]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="contact-select-budget"
                          value={formData.budget}
                          onChange={(e) =>
                            setFormData({ ...formData, budget: e.target.value })
                          }
                          className="w-full appearance-none px-3.5 py-2.5 rounded-md bg-[#121418] border border-[rgba(138,148,166,0.2)] text-sm text-white focus:outline-none focus:border-[#FF7A59] focus:ring-1 focus:ring-[#FF7A59] transition-colors pr-9"
                        >
                          <option value="< $10,000">&lt; $10,000</option>
                          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                          <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                          <option value="$100,000+">$100,000+ (Enterprise)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#8A94A6] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-input-message" className="block text-xs font-medium text-[#CBD5E1]">
                      Project Overview & Technical Requirements <span className="text-[#FF7A59]">*</span>
                    </label>
                    <textarea
                      id="contact-input-message"
                      rows={4}
                      required
                      placeholder="Outline your application goals, expected scale, target deadlines, or technical constraints..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-md bg-[#121418] border text-sm text-white placeholder-[#5A6679] focus:outline-none focus:ring-1 transition-colors resize-none ${
                        errors.message
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-[rgba(138,148,166,0.2)] focus:border-[#FF7A59] focus:ring-[#FF7A59]'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button Styled with Signature Coral Gradient */}
                  <div className="pt-2">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full py-3.5 px-6 font-semibold text-white shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed justify-center"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Transmitting Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Project Inquiry</span>
                            <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </button>
                  </div>

                  <div className="text-center">
                    <span className="text-[11px] text-[#6A788C]">
                      Strict client confidentiality maintained across all project proposals.
                    </span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
        )}

      </div>
    </section>
  );
};

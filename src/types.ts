export interface CapabilityItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  metricsBadge: string;
  accentColor?: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  domain: string;
  category: 'Web App' | 'Full-Stack' | 'AI System';
  summary: string;
  challenge: string;
  solution: string;
  techStack: string[];
  impact: {
    metric: string;
    label: string;
  }[];
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI & Cloud/DevOps';
  level: string;
  highlight: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  scope: 'Web App' | 'Full-Stack System' | 'AI Integration';
  budget: string;
  message: string;
}

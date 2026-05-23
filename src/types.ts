export type Page = 'home' | 'product' | 'about' | 'waitlist' | 'contact' | 'partner' | 'privacy' | 'terms' | 'signup' | 'signin';

export interface WaitlistEntry {
  email: string;
  role: 'sales-leader' | 'ic-sales' | 'founder' | 'investor' | 'cofounder-candidate' | 'other';
  company?: string;
  useCase?: string;
  timestamp: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: string; // lucide icon identifier
}

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
}

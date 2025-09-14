// User Types
export interface User {
  userId: string;
  walletAddress: string;
  subscriptionTier: 'free' | 'basic' | 'premium' | 'enterprise';
  onboardingStatus: 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

// Memo Types
export interface Memo {
  memoId: string;
  userId: string;
  promptText: string;
  generatedContent: string;
  versionHistory: MemoVersion[];
  status: 'draft' | 'generated' | 'under_review' | 'approved' | 'rejected';
  reviewStatus: 'pending' | 'assigned' | 'completed';
  jurisdiction: string;
  legalArea: string;
  citations: LegalCitation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MemoVersion {
  version: number;
  content: string;
  changes: string;
  createdAt: Date;
}

export interface LegalCitation {
  source: string;
  title: string;
  url?: string;
  jurisdiction: string;
  relevance: number;
}

// Prompt Template Types
export interface PromptTemplate {
  templateId: string;
  name: string;
  description: string;
  templateText: string;
  category: string;
  jurisdiction: string;
  isActive: boolean;
}

// Lawyer Types
export interface LawyerProfile {
  lawyerId: string;
  walletAddress: string;
  name: string;
  firmName: string;
  expertiseAreas: string[];
  jurisdiction: string[];
  kycStatus: 'pending' | 'verified' | 'rejected';
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  availability: 'available' | 'busy' | 'offline';
  bio: string;
  credentials: LawyerCredential[];
  createdAt: Date;
}

export interface LawyerCredential {
  type: 'bar_admission' | 'education' | 'certification';
  institution: string;
  year: number;
  verified: boolean;
}

// Review Types
export interface ReviewRequest {
  requestId: string;
  memoId: string;
  assignedLawyerId?: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  reviewFeedback?: string;
  billingAmount?: number;
  estimatedHours?: number;
  deadline?: Date;
  createdAt: Date;
  completedAt?: Date;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Component Props Types
export interface FrameWrapperProps {
  children: React.ReactNode;
  variant?: 'default' | 'preview';
}

export interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  variant?: 'large' | 'collapsed';
  placeholder?: string;
  disabled?: boolean;
}

export interface MemoDisplayProps {
  memo: Memo;
  variant?: 'preview' | 'final';
  onRequestReview?: () => void;
}

export interface LawyerSelectionProps {
  lawyers: LawyerProfile[];
  selectedLawyer?: string;
  onSelect: (lawyerId: string) => void;
  variant?: 'list' | 'card';
}

export interface StatusIndicatorProps {
  status: 'pending' | 'approved' | 'rejected' | 'in_progress';
  variant?: 'pending' | 'approved' | 'rejected';
  label?: string;
}

// Form Types
export interface MemoGenerationRequest {
  promptText: string;
  jurisdiction: string;
  legalArea: string;
  urgency: 'low' | 'medium' | 'high';
  templateId?: string;
}

export interface LawyerReviewRequest {
  memoId: string;
  preferredLawyerId?: string;
  deadline?: Date;
  specialInstructions?: string;
}

// Subscription Types
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  memoCredits: number;
  reviewCredits: number;
  prioritySupport: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'memo_ready' | 'review_completed' | 'review_available' | 'payment_due';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

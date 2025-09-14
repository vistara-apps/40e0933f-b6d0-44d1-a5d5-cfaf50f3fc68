export const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'monthly' as const,
    features: [
      '2 AI memos per month',
      'Basic templates',
      'Community support',
    ],
    memoCredits: 2,
    reviewCredits: 0,
    prioritySupport: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    interval: 'monthly' as const,
    features: [
      '10 AI memos per month',
      '2 lawyer reviews',
      'All templates',
      'Email support',
    ],
    memoCredits: 10,
    reviewCredits: 2,
    prioritySupport: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    interval: 'monthly' as const,
    features: [
      '50 AI memos per month',
      '10 lawyer reviews',
      'Priority matching',
      'Custom templates',
      'Priority support',
    ],
    memoCredits: 50,
    reviewCredits: 10,
    prioritySupport: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    interval: 'monthly' as const,
    features: [
      'Unlimited AI memos',
      'Unlimited lawyer reviews',
      'Dedicated account manager',
      'Custom integrations',
      '24/7 support',
    ],
    memoCredits: -1, // Unlimited
    reviewCredits: -1, // Unlimited
    prioritySupport: true,
  },
];

export const LEGAL_AREAS = [
  'Corporate Law',
  'Contract Law',
  'Employment Law',
  'Intellectual Property',
  'Privacy & Data Protection',
  'Securities & Finance',
  'Real Estate',
  'Tax Law',
  'Regulatory Compliance',
  'Litigation',
  'Mergers & Acquisitions',
  'International Trade',
];

export const JURISDICTIONS = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
];

export const PROMPT_TEMPLATES = [
  {
    id: 'contract_review',
    name: 'Contract Review',
    description: 'Analyze contract terms and identify potential risks',
    category: 'Contract Law',
    template: `Please review the following contract terms and provide analysis on:
1. Key obligations and rights
2. Potential risks and liabilities
3. Recommended modifications
4. Compliance considerations

Contract details: {CONTRACT_DETAILS}`,
  },
  {
    id: 'privacy_policy',
    name: 'Privacy Policy Compliance',
    description: 'Ensure privacy policy meets regulatory requirements',
    category: 'Privacy & Data Protection',
    template: `Analyze this privacy policy for compliance with applicable regulations:
1. Data collection and processing practices
2. User rights and consent mechanisms
3. Cross-border data transfer considerations
4. Regulatory compliance gaps

Privacy policy: {PRIVACY_POLICY}`,
  },
  {
    id: 'employment_issue',
    name: 'Employment Issue Analysis',
    description: 'Review employment-related legal questions',
    category: 'Employment Law',
    template: `Please analyze this employment situation:
1. Legal rights and obligations
2. Potential claims or defenses
3. Recommended actions
4. Compliance with labor laws

Situation: {EMPLOYMENT_SITUATION}`,
  },
  {
    id: 'ip_protection',
    name: 'IP Protection Strategy',
    description: 'Develop intellectual property protection plan',
    category: 'Intellectual Property',
    template: `Develop an IP protection strategy for:
1. Trademark and copyright considerations
2. Patent opportunities
3. Trade secret protection
4. Enforcement mechanisms

IP assets: {IP_ASSETS}`,
  },
];

export const LAWYER_EXPERTISE_AREAS = LEGAL_AREAS;

export const REVIEW_PRIORITIES = [
  { value: 'low', label: 'Low Priority', color: 'text-gray-600' },
  { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600' },
  { value: 'high', label: 'High Priority', color: 'text-orange-600' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-600' },
];

export const STATUS_LABELS = {
  pending: 'Pending',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  completed: 'Completed',
  approved: 'Approved',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
  draft: 'Draft',
  generated: 'Generated',
  under_review: 'Under Review',
};

export const NOTIFICATION_TYPES = {
  memo_ready: 'Memo Ready',
  review_completed: 'Review Completed',
  review_available: 'Review Available',
  payment_due: 'Payment Due',
};

export const API_ENDPOINTS = {
  GENERATE_MEMO: '/api/memos/generate',
  REQUEST_REVIEW: '/api/reviews/request',
  GET_LAWYERS: '/api/lawyers',
  GET_MEMOS: '/api/memos',
  GET_REVIEWS: '/api/reviews',
  UPDATE_PROFILE: '/api/profile',
  GET_NOTIFICATIONS: '/api/notifications',
};

export const OPENAI_CONFIG = {
  model: 'google/gemini-2.0-flash-001',
  maxTokens: 2000,
  temperature: 0.7,
};

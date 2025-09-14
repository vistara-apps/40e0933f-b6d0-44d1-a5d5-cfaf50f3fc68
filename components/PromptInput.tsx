'use client';

import { useState } from 'react';
import { Maximize2, Minimize2, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import type { PromptInputProps } from '../lib/types';

export function PromptInput({
  value,
  onChange,
  variant = 'large',
  placeholder = 'Enter your legal question or prompt...',
  disabled = false,
}: PromptInputProps) {
  const [isExpanded, setIsExpanded] = useState(variant === 'large');
  const [showTips, setShowTips] = useState(false);

  const tips = [
    'Be specific about your business situation and goals',
    'Include relevant jurisdiction and industry context',
    'Mention any specific legal concerns or requirements',
    'Provide background information that might affect the analysis',
  ];

  return (
    <div className="space-y-3">
      {/* Input Area */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={isExpanded ? 6 : 3}
          className={cn(
            'input-field resize-none transition-all duration-200',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
        
        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-2 right-2 p-1 text-text-secondary hover:text-text-primary transition-colors duration-200"
          disabled={disabled}
        >
          {isExpanded ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Character Count */}
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center gap-1 hover:text-text-primary transition-colors duration-200"
          >
            <HelpCircle className="w-3 h-3" />
            Writing tips
          </button>
        </div>
        <span className={cn(
          value.length > 1000 && 'text-orange-500',
          value.length > 1500 && 'text-red-500'
        )}>
          {value.length} / 2000 characters
        </span>
      </div>

      {/* Tips Panel */}
      {showTips && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 animate-slide-up">
          <h4 className="font-medium text-sm text-blue-900 mb-2">
            Tips for better legal analysis:
          </h4>
          <ul className="space-y-1 text-sm text-blue-800">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

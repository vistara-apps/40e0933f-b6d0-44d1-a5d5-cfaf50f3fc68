'use client';

import { useState } from 'react';
import { FileText, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { PromptInput } from './PromptInput';
import { MemoDisplay } from './MemoDisplay';
import { cn, generateMemoId } from '../lib/utils';
import { PROMPT_TEMPLATES, LEGAL_AREAS, JURISDICTIONS } from '../lib/constants';
import type { Memo, MemoGenerationRequest } from '../lib/types';

export function MemoGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentMemo, setCurrentMemo] = useState<Memo | null>(null);
  const [formData, setFormData] = useState<MemoGenerationRequest>({
    promptText: '',
    jurisdiction: 'US',
    legalArea: 'Corporate Law',
    urgency: 'medium',
  });

  const handleGenerate = async () => {
    if (!formData.promptText.trim()) return;

    setIsGenerating(true);
    
    try {
      // Simulate API call to generate memo
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newMemo: Memo = {
        memoId: generateMemoId(),
        userId: 'current-user',
        promptText: formData.promptText,
        generatedContent: generateSampleMemo(formData),
        versionHistory: [],
        status: 'generated',
        reviewStatus: 'pending',
        jurisdiction: formData.jurisdiction,
        legalArea: formData.legalArea,
        citations: [
          {
            source: 'Delaware General Corporation Law',
            title: 'Title 8, Chapter 1',
            url: 'https://delcode.delaware.gov/title8/c001/',
            jurisdiction: 'US',
            relevance: 0.9,
          },
          {
            source: 'Model Business Corporation Act',
            title: 'Section 8.30',
            jurisdiction: 'US',
            relevance: 0.8,
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setCurrentMemo(newMemo);
    } catch (error) {
      console.error('Error generating memo:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = PROMPT_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setFormData(prev => ({
        ...prev,
        promptText: template.template,
        legalArea: template.category,
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">AI Memo Generator</h2>
            <p className="text-text-secondary text-sm">
              Generate legal analysis with AI assistance
            </p>
          </div>
        </div>

        {/* Template Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Quick Templates
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PROMPT_TEMPLATES.slice(0, 4).map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className="p-3 text-left border border-border rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="font-medium text-sm">{template.name}</div>
                <div className="text-xs text-text-secondary mt-1">
                  {template.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Jurisdiction
            </label>
            <select
              value={formData.jurisdiction}
              onChange={(e) => setFormData(prev => ({ ...prev, jurisdiction: e.target.value }))}
              className="input-field"
            >
              {JURISDICTIONS.map((jurisdiction) => (
                <option key={jurisdiction.code} value={jurisdiction.code}>
                  {jurisdiction.flag} {jurisdiction.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Legal Area
            </label>
            <select
              value={formData.legalArea}
              onChange={(e) => setFormData(prev => ({ ...prev, legalArea: e.target.value }))}
              className="input-field"
            >
              {LEGAL_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Prompt Input */}
        <PromptInput
          value={formData.promptText}
          onChange={(value) => setFormData(prev => ({ ...prev, promptText: value }))}
          placeholder="Describe your legal question or situation in detail..."
          disabled={isGenerating}
        />

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !formData.promptText.trim()}
          className={cn(
            'btn-primary w-full mt-4 flex items-center justify-center gap-2',
            (isGenerating || !formData.promptText.trim()) && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Generating Memo...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              Generate Legal Memo
            </>
          )}
        </button>
      </div>

      {/* Generated Memo */}
      {currentMemo && (
        <MemoDisplay
          memo={currentMemo}
          variant="preview"
          onRequestReview={() => {
            // Handle review request
            console.log('Requesting review for memo:', currentMemo.memoId);
          }}
        />
      )}

      {/* Usage Stats */}
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">This month</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">8 / 10 memos used</div>
            <div className="text-xs text-text-secondary">Basic plan</div>
          </div>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
        </div>
      </div>
    </div>
  );
}

function generateSampleMemo(request: MemoGenerationRequest): string {
  return `# Legal Memorandum

**TO:** Client
**FROM:** VeriLex AI Legal Assistant
**DATE:** ${new Date().toLocaleDateString()}
**RE:** ${request.legalArea} Analysis - ${request.promptText.slice(0, 50)}...

## Executive Summary

Based on your inquiry regarding ${request.legalArea.toLowerCase()}, this memorandum provides an analysis of the key legal considerations and recommendations for your situation.

## Legal Analysis

### 1. Applicable Law
Under ${request.jurisdiction} jurisdiction, the relevant legal framework includes:
- Statutory requirements under applicable corporate law
- Common law principles governing fiduciary duties
- Regulatory compliance obligations

### 2. Key Issues Identified
The primary legal considerations in your situation include:
- **Compliance Requirements**: Ensuring adherence to applicable regulations
- **Risk Mitigation**: Identifying and addressing potential legal exposures
- **Best Practices**: Implementing industry-standard procedures

### 3. Recommendations
Based on this analysis, we recommend:
1. Conducting a comprehensive compliance review
2. Implementing appropriate risk management procedures
3. Consulting with qualified legal counsel for jurisdiction-specific advice

## Conclusion

This preliminary analysis provides a framework for understanding the legal implications of your situation. For definitive legal advice tailored to your specific circumstances, we recommend having this memo reviewed by a qualified attorney in your jurisdiction.

---
*This memo was generated by AI and should be reviewed by a qualified attorney before making any legal decisions.*`;
}

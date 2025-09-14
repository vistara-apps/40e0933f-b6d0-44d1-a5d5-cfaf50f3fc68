import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { generateMemoId } from '../../../../lib/utils';
import { OPENAI_CONFIG } from '../../../../lib/constants';
import type { MemoGenerationRequest, Memo } from '../../../../lib/types';

export async function POST(request: NextRequest) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      dangerouslyAllowBrowser: true,
    });

    const body: MemoGenerationRequest = await request.json();
    const { promptText, jurisdiction, legalArea, urgency } = body;

    if (!promptText?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Prompt text is required' },
        { status: 400 }
      );
    }

    // Generate legal memo using AI
    const systemPrompt = `You are a senior partner at a top-tier law firm specializing in ${legalArea}. 
    You are providing legal analysis for a client in ${jurisdiction} jurisdiction.
    
    Generate a comprehensive legal memorandum that includes:
    1. Executive Summary
    2. Legal Analysis with relevant statutes and case law
    3. Risk Assessment
    4. Recommendations
    5. Conclusion
    
    The memo should be professional, well-structured, and include relevant legal citations.
    Always include appropriate disclaimers about the need for qualified legal counsel.`;

    const completion = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: promptText }
      ],
      max_tokens: OPENAI_CONFIG.maxTokens,
      temperature: OPENAI_CONFIG.temperature,
    });

    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error('Failed to generate memo content');
    }

    // Create memo object
    const memo: Memo = {
      memoId: generateMemoId(),
      userId: 'current-user', // In real app, get from auth
      promptText,
      generatedContent,
      versionHistory: [],
      status: 'generated',
      reviewStatus: 'pending',
      jurisdiction,
      legalArea,
      citations: [
        {
          source: `${jurisdiction} Legal Database`,
          title: `${legalArea} Regulations`,
          jurisdiction,
          relevance: 0.9,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: memo,
      message: 'Legal memo generated successfully',
    });

  } catch (error) {
    console.error('Error generating memo:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate legal memo. Please try again.' 
      },
      { status: 500 }
    );
  }
}

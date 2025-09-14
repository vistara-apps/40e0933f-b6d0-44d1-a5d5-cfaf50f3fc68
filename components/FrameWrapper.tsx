'use client';

import { useMiniKit } from '@coinbase/minikit';
import { cn } from '../lib/utils';
import type { FrameWrapperProps } from '../lib/types';

export function FrameWrapper({ 
  children, 
  variant = 'default' 
}: FrameWrapperProps) {
  const { context } = useMiniKit();

  return (
    <div className={cn(
      'min-h-screen bg-background',
      variant === 'preview' && 'max-w-sm mx-auto border-x border-border'
    )}>
      {/* Frame Header - only show in preview mode */}
      {variant === 'preview' && (
        <div className="bg-surface border-b border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">V</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">VeriLex</h3>
              <p className="text-xs text-text-secondary">Legal AI Assistant</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative">
        {children}
      </div>

      {/* Frame Footer - show user context if available */}
      {context?.user && (
        <div className="bg-surface border-t border-border p-3">
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span>Connected as {context.user.displayName || 'User'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { cn } from '../lib/utils';
import type { FrameWrapperProps } from '../lib/types';

export function FrameWrapper({
  children,
  variant = 'default'
}: FrameWrapperProps) {
  // TODO: Add user context when MiniKit is properly configured
  const context = null;

  return (
    <div className={cn(
      'min-h-screen bg-white',
      variant === 'preview' && 'max-w-sm mx-auto border-x border-gray-200'
    )}>
      {/* Frame Header - only show in preview mode */}
      {variant === 'preview' && (
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">V</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">VeriLex</h3>
              <p className="text-xs text-gray-600">Legal AI Assistant</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative">
        {children}
      </div>

      {/* Frame Footer - TODO: Add user context when MiniKit is properly configured */}
      {/* {context?.user && (
        <div className="bg-gray-50 border-t border-gray-200 p-3">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span>Connected as {context.user.displayName || 'User'}</span>
          </div>
        </div>
      )} */}
    </div>
  );
}

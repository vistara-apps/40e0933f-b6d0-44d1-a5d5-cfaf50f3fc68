'use client';

import { Clock, CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react';
import { cn } from '../lib/utils';
import type { StatusIndicatorProps } from '../lib/types';

export function StatusIndicator({ 
  status, 
  variant, 
  label 
}: StatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
          label: label || 'Pending',
        };
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'text-green-600 bg-green-50 border-green-200',
          label: label || 'Approved',
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-red-600 bg-red-50 border-red-200',
          label: label || 'Rejected',
        };
      case 'in_progress':
        return {
          icon: Loader,
          color: 'text-blue-600 bg-blue-50 border-blue-200',
          label: label || 'In Progress',
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-600 bg-gray-50 border-gray-200',
          label: label || 'Unknown',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={cn(
      'inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium',
      config.color
    )}>
      <Icon className={cn(
        'w-3 h-3',
        status === 'in_progress' && 'animate-spin'
      )} />
      <span>{config.label}</span>
    </div>
  );
}

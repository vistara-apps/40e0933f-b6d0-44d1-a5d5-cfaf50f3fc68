'use client';

import { Star, MapPin, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { cn, formatCurrency, getJurisdictionFlag } from '../lib/utils';
import type { LawyerSelectionProps } from '../lib/types';

export function LawyerSelection({
  lawyers,
  selectedLawyer,
  onSelect,
  variant = 'list'
}: LawyerSelectionProps) {
  if (lawyers.length === 0) {
    return (
      <div className="card p-6 text-center">
        <div className="text-text-secondary">
          No lawyers found matching your criteria.
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="space-y-3">
        {lawyers.map((lawyer) => (
          <div
            key={lawyer.lawyerId}
            className={cn(
              'card p-4 cursor-pointer transition-all duration-200 hover:shadow-lg',
              selectedLawyer === lawyer.lawyerId && 'ring-2 ring-primary'
            )}
            onClick={() => onSelect(lawyer.lawyerId)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{lawyer.name}</h3>
                  {lawyer.kycStatus === 'verified' && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    lawyer.availability === 'available' ? 'bg-green-500' : 'bg-yellow-500'
                  )} />
                </div>
                
                <p className="text-sm text-text-secondary mb-2">{lawyer.firmName}</p>
                
                <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>{lawyer.rating}</span>
                    <span>({lawyer.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>
                      {lawyer.jurisdiction.map(j => getJurisdictionFlag(j)).join(' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    <span>{formatCurrency(lawyer.hourlyRate)}/hr</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {lawyer.expertiseAreas.slice(0, 3).map((area) => (
                    <span
                      key={area}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {area}
                    </span>
                  ))}
                  {lawyer.expertiseAreas.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{lawyer.expertiseAreas.length - 3} more
                    </span>
                  )}
                </div>

                <p className="text-sm text-text-secondary line-clamp-2">
                  {lawyer.bio}
                </p>
              </div>

              <div className="ml-4 text-right">
                <div className={cn(
                  'px-2 py-1 text-xs rounded-full',
                  lawyer.availability === 'available' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                )}>
                  {lawyer.availability === 'available' ? 'Available' : 'Busy'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // List variant
  return (
    <div className="card">
      <div className="divide-y divide-border">
        {lawyers.map((lawyer) => (
          <div
            key={lawyer.lawyerId}
            className={cn(
              'p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200',
              selectedLawyer === lawyer.lawyerId && 'bg-blue-50'
            )}
            onClick={() => onSelect(lawyer.lawyerId)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {lawyer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{lawyer.name}</h4>
                    {lawyer.kycStatus === 'verified' && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <span>{lawyer.firmName}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span>{lawyer.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium">
                  {formatCurrency(lawyer.hourlyRate)}/hr
                </div>
                <div className={cn(
                  'text-xs',
                  lawyer.availability === 'available' ? 'text-green-600' : 'text-yellow-600'
                )}>
                  {lawyer.availability === 'available' ? 'Available' : 'Busy'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Users, Star, MapPin, Clock, Filter } from 'lucide-react';
import { LawyerSelection } from './LawyerSelection';
import { cn, getJurisdictionFlag } from '../lib/utils';
import type { LawyerProfile } from '../lib/types';

const sampleLawyers: LawyerProfile[] = [
  {
    lawyerId: 'lawyer_1',
    walletAddress: '0x1234...5678',
    name: 'Sarah Chen',
    firmName: 'Chen & Associates',
    expertiseAreas: ['Corporate Law', 'Securities & Finance', 'M&A'],
    jurisdiction: ['US', 'CA'],
    kycStatus: 'verified',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 450,
    availability: 'available',
    bio: 'Partner specializing in corporate transactions and securities law with 15+ years experience.',
    credentials: [
      { type: 'bar_admission', institution: 'New York State Bar', year: 2008, verified: true },
      { type: 'education', institution: 'Harvard Law School', year: 2007, verified: true },
    ],
    createdAt: new Date('2023-01-15'),
  },
  {
    lawyerId: 'lawyer_2',
    walletAddress: '0x2345...6789',
    name: 'Michael Rodriguez',
    firmName: 'Rodriguez Legal Group',
    expertiseAreas: ['Employment Law', 'Contract Law', 'Litigation'],
    jurisdiction: ['US'],
    kycStatus: 'verified',
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 375,
    availability: 'busy',
    bio: 'Employment law specialist with extensive experience in workplace disputes and compliance.',
    credentials: [
      { type: 'bar_admission', institution: 'California State Bar', year: 2010, verified: true },
      { type: 'education', institution: 'Stanford Law School', year: 2009, verified: true },
    ],
    createdAt: new Date('2023-02-20'),
  },
  {
    lawyerId: 'lawyer_3',
    walletAddress: '0x3456...7890',
    name: 'Emily Thompson',
    firmName: 'Thompson IP Law',
    expertiseAreas: ['Intellectual Property', 'Privacy & Data Protection', 'Tech Law'],
    jurisdiction: ['US', 'UK'],
    kycStatus: 'verified',
    rating: 4.9,
    reviewCount: 156,
    hourlyRate: 525,
    availability: 'available',
    bio: 'IP and privacy law expert helping tech companies navigate complex regulatory landscapes.',
    credentials: [
      { type: 'bar_admission', institution: 'DC Bar', year: 2006, verified: true },
      { type: 'education', institution: 'Georgetown Law', year: 2005, verified: true },
    ],
    createdAt: new Date('2023-01-10'),
  },
];

export function LawyerNetwork() {
  const [selectedLawyer, setSelectedLawyer] = useState<string>('');
  const [filterBy, setFilterBy] = useState<'all' | 'available' | 'top_rated'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredLawyers = sampleLawyers.filter(lawyer => {
    switch (filterBy) {
      case 'available':
        return lawyer.availability === 'available';
      case 'top_rated':
        return lawyer.rating >= 4.8;
      default:
        return true;
    }
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Lawyer Network</h2>
              <p className="text-text-secondary text-sm">
                {filteredLawyers.length} qualified lawyers available
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'p-2 rounded-md transition-colors duration-200',
              showFilters ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
            )}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md animate-slide-up">
            <div className="flex gap-2">
              <button
                onClick={() => setFilterBy('all')}
                className={cn(
                  'px-3 py-1 text-sm rounded-full transition-colors duration-200',
                  filterBy === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-text-secondary hover:text-text-primary'
                )}
              >
                All Lawyers
              </button>
              <button
                onClick={() => setFilterBy('available')}
                className={cn(
                  'px-3 py-1 text-sm rounded-full transition-colors duration-200',
                  filterBy === 'available' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-text-secondary hover:text-text-primary'
                )}
              >
                Available Now
              </button>
              <button
                onClick={() => setFilterBy('top_rated')}
                className={cn(
                  'px-3 py-1 text-sm rounded-full transition-colors duration-200',
                  filterBy === 'top_rated' 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-text-secondary hover:text-text-primary'
                )}
              >
                Top Rated
              </button>
            </div>
          </div>
        )}

        {/* Network Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-primary">24</div>
            <div className="text-xs text-text-secondary">Active Lawyers</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-accent">4.8</div>
            <div className="text-xs text-text-secondary">Avg Rating</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">98%</div>
            <div className="text-xs text-text-secondary">Response Rate</div>
          </div>
        </div>
      </div>

      {/* Lawyer Selection */}
      <LawyerSelection
        lawyers={filteredLawyers}
        selectedLawyer={selectedLawyer}
        onSelect={setSelectedLawyer}
        variant="card"
      />

      {/* Quick Match */}
      <div className="card p-4">
        <h3 className="font-medium mb-3">Quick Match</h3>
        <p className="text-sm text-text-secondary mb-4">
          Let our AI match you with the best lawyer for your specific legal needs.
        </p>
        <button className="btn-secondary w-full">
          Find My Lawyer
        </button>
      </div>
    </div>
  );
}

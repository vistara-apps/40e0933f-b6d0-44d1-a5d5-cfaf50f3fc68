'use client';

import { useState } from 'react';
import { Activity, FileText, Users, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { StatusIndicator } from './StatusIndicator';
import { formatCurrency, formatDate } from '../lib/utils';

interface DashboardStats {
  totalMemos: number;
  pendingReviews: number;
  completedReviews: number;
  totalSpent: number;
  avgResponseTime: number;
  successRate: number;
}

interface RecentActivity {
  id: string;
  type: 'memo_generated' | 'review_completed' | 'lawyer_assigned';
  title: string;
  description: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected' | 'in_progress';
}

const mockStats: DashboardStats = {
  totalMemos: 23,
  pendingReviews: 3,
  completedReviews: 18,
  totalSpent: 2450,
  avgResponseTime: 4.2,
  successRate: 94,
};

const mockActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'review_completed',
    title: 'Contract Review Completed',
    description: 'Sarah Chen approved your employment contract analysis',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: 'approved',
  },
  {
    id: '2',
    type: 'lawyer_assigned',
    title: 'Lawyer Assigned',
    description: 'Michael Rodriguez assigned to IP protection memo',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    status: 'in_progress',
  },
  {
    id: '3',
    type: 'memo_generated',
    title: 'Memo Generated',
    description: 'Privacy policy compliance analysis ready for review',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    status: 'pending',
  },
];

export function StatusDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity'>('overview');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="card p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <p className="text-text-secondary text-sm">
              Track your legal requests and reviews
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
              activeTab === 'overview'
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
              activeTab === 'activity'
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Recent Activity
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' ? (
          <div className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Total Memos</span>
                </div>
                <div className="text-xl font-semibold text-blue-900">{mockStats.totalMemos}</div>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-900">Pending Reviews</span>
                </div>
                <div className="text-xl font-semibold text-yellow-900">{mockStats.pendingReviews}</div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Total Spent</span>
                </div>
                <div className="text-xl font-semibold text-green-900">
                  {formatCurrency(mockStats.totalSpent)}
                </div>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Success Rate</span>
                </div>
                <div className="text-xl font-semibold text-purple-900">{mockStats.successRate}%</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="pt-3 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Avg Response Time</span>
                <span className="font-medium">{mockStats.avgResponseTime} hours</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-text-secondary">Completed Reviews</span>
                <span className="font-medium">{mockStats.completedReviews}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {mockActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  {activity.type === 'memo_generated' && <FileText className="w-4 h-4 text-white" />}
                  {activity.type === 'review_completed' && <Users className="w-4 h-4 text-white" />}
                  {activity.type === 'lawyer_assigned' && <Calendar className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <StatusIndicator status={activity.status} />
                  </div>
                  <p className="text-xs text-text-secondary mb-1">{activity.description}</p>
                  <p className="text-xs text-text-secondary">{formatDate(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card p-4">
        <h3 className="font-medium mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="btn-secondary w-full text-left">
            View All Memos
          </button>
          <button className="btn-secondary w-full text-left">
            Manage Subscriptions
          </button>
          <button className="btn-secondary w-full text-left">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { BranchData } from './dashboard-data';

interface InsightsAndActivitySectionProps {
  branchData: BranchData;
  onInsightAction: (actionType: 'staffing' | 'compliance' | 'revenue' | 'onboarding') => void;
  onViewAll: (activeTab: 'insights' | 'activity') => void;
}

export function InsightsAndActivitySection({
  branchData,
  onInsightAction,
  onViewAll,
}: InsightsAndActivitySectionProps) {
  const [activeTab, setActiveTab] = useState<'insights' | 'activity'>('insights');
  const { insights, liveActivity } = branchData;

  const getDepartmentTagStyle = (dept: string) => {
    switch (dept) {
      case 'STAFFING':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
      case 'COMPLIANCE':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      case 'REVENUE':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      case 'ONBOARDING':
        return 'bg-emerald-50 text-[#3e6b2b] border-emerald-200/80';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)]">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-0.5 rounded-xl flex items-center gap-0.5 border border-slate-200/60 shadow-inner">
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'insights'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900 font-medium'
                }`}
            >
              Insights ({insights.length})
            </button>

            <button
              onClick={() => setActiveTab('activity')}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${activeTab === 'activity'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-900 font-medium'
                }`}
            >
              Live Activity
            </button>
          </div>
        </div>

        <button
          onClick={() => onViewAll(activeTab)}
          className="text-xs text-[#3e6b2b] hover:text-[#2d551e] flex items-center gap-1 font-bold transition-colors cursor-pointer group hover:underline"
        >
          <span>View all</span>
          <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </button>
      </div>

      {/* 10.1 Insights Content */}
      {activeTab === 'insights' && (
        <div className="space-y-2.5">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 text-xs min-w-0">
                <span
                  className={`font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-md border shrink-0 ${getDepartmentTagStyle(
                    insight.department
                  )}`}
                >
                  {insight.department}
                </span>
                <span className="text-slate-800 font-medium leading-snug">
                  {insight.message}
                </span>
              </div>

              <div className="shrink-0 self-end sm:self-auto">
                <button
                  onClick={() => onInsightAction(insight.targetAction)}
                  className="px-3.5 py-1.5 bg-white hover:bg-[#3e6b2b]/5 border border-slate-200/90 hover:border-[#3e6b2b]/30 text-xs text-slate-800 hover:text-[#3e6b2b] font-bold rounded-xl shadow-2xs transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                >
                  {insight.actionLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 10.2 Live Activity Content */}
      {activeTab === 'activity' && (
        <div className="divide-y divide-slate-100/90">
          {liveActivity.map((activity) => (
            <div
              key={activity.id}
              className="py-3 flex items-center justify-between gap-3 text-xs hover:bg-slate-50/50 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/60 shrink-0">
                  {activity.recordId}
                </span>
                <span className="text-slate-900 font-semibold truncate">
                  {activity.description}
                </span>
                <span className="text-slate-400 text-[11px] hidden sm:inline">({activity.actor})</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono shrink-0">
                {activity.timestamp}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

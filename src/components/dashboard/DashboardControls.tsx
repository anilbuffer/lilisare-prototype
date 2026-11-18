'use client';

import React from 'react';
import {
  Sparkles,
  Compass,
} from 'lucide-react';
import { BranchId, DashboardTabId, BranchData } from './dashboard-data';

interface DashboardControlsProps {
  branchData?: BranchData;
  currentBranch?: BranchId;
  onSelectBranch?: (branchId: BranchId) => void;
  activeTab?: DashboardTabId;
  onSelectTab?: (tabId: DashboardTabId) => void;
  onOpenAIBriefing: () => void;
  onTrackCaregivers?: () => void;
}

export function DashboardControls({
  onOpenAIBriefing,
  onTrackCaregivers,
}: DashboardControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Left: Greeting & Date */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight">
          Good morning, Lisa!
        </h2>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Wednesday, November 18
          </p>
        </div>
      </div>

      {/* Right: Pill Action Buttons */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onTrackCaregivers}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200/90 rounded-full text-xs font-bold transition-all shadow-2xs active:scale-98 cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 text-[#3e6b2b]" />
          <span>Track Caregivers</span>
        </button>

        <button
          type="button"
          onClick={onOpenAIBriefing}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#3e6b2b] hover:bg-[#325622] text-white rounded-full text-xs font-bold transition-all shadow-xs hover:shadow active:scale-98 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F2B632] animate-pulse" />
          <span>AI Briefing</span>
        </button>
      </div>
    </div>
  );
}

{/* Dashboard Tabs Component (Placed Just Below Stats Row) */}
export function DashboardTabs({
  activeTab,
  onSelectTab,
}: {
  activeTab: DashboardTabId;
  onSelectTab: (tabId: DashboardTabId) => void;
}) {
  const tabs: { id: DashboardTabId; label: string }[] = [
    { id: 'executive', label: 'Executive' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'billing', label: 'Billing' },
    { id: 'scheduler', label: 'Scheduler' },
  ];

  return (
    <div className="flex items-center justify-between gap-4 pt-1">
      {/* Modern Segmented Pill Control (Matches User's Reference Screenshot) */}
      <div className="bg-slate-200/70 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/60 shadow-inner overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`px-4 py-1.5 rounded-xl text-xs transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs font-bold ring-1.5 ring-slate-900'
                  : 'text-slate-600 hover:text-slate-900 font-medium hover:bg-white/40'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

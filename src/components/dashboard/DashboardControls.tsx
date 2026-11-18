'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  Building2,
  Users,
} from 'lucide-react';
import { BranchId, DashboardTabId, BranchData, BRANCH_DATA } from './dashboard-data';

interface DashboardControlsProps {
  branchData?: BranchData;
  currentBranch?: BranchId;
  onSelectBranch?: (branchId: BranchId) => void;
  activeSection?: DashboardTabId;
  onNavigateSection?: (sectionId: DashboardTabId) => void;
  onOpenAIBriefing: () => void;
}

export function DashboardControls({
  branchData,
  currentBranch = 'mountain-lane',
  onSelectBranch,
  activeSection = 'executive',
  onNavigateSection,
  onOpenAIBriefing,
}: DashboardControlsProps) {
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);

  const branchList: { id: BranchId | 'all'; name: string }[] = [
    { id: 'mountain-lane', name: 'Mountain Lane (Denver)' },
    { id: 'colorado-home-health', name: 'Colorado Home Health (Colo Spgs)' },
    { id: 'frisco', name: 'High Country (Frisco)' },
  ];

  const currentBranchName = branchData?.name || 'Mountain Lane';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
      {/* Left: Greeting & Date */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Good morning, Sarah!
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Wednesday, November 18
        </p>
      </div>

      {/* Right Controls: Branch Filter + AI Briefing */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {/* Branch Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
          >
            <span className="text-slate-400 font-normal">Branch:</span>
            <span className="font-bold text-slate-900 truncate max-w-[120px] sm:max-w-[140px]">
              {currentBranchName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {isBranchDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-98 duration-100">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Operating Branch
              </div>
              {branchList.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    if (b.id !== 'all' && onSelectBranch) {
                      onSelectBranch(b.id as BranchId);
                    }
                    setIsBranchDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    currentBranch === b.id
                      ? 'bg-emerald-50 text-[#3e6b2b]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{b.name}</span>
                  {currentBranch === b.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3e6b2b]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* AI Briefing Button (EHR Reference Primary Green Pill) */}
        <button
          type="button"
          onClick={onOpenAIBriefing}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#3e6b2b] hover:bg-[#325722] text-white rounded-full text-xs font-bold transition-all shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#7bdcb5]" />
          <span>AI Briefing</span>
        </button>
      </div>
    </div>
  );
}

{/* Legacy fallback export so no existing import crashes */}
export function DashboardTabs({
  activeTab,
  onSelectTab,
}: {
  activeTab: DashboardTabId;
  onSelectTab: (tabId: DashboardTabId) => void;
}) {
  return null;
}

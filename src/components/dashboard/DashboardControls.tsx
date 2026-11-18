'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  Building2,
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

  const sections: { id: DashboardTabId; label: string }[] = [
    { id: 'executive', label: 'Executive' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'billing', label: 'Billing' },
    { id: 'scheduler', label: 'Scheduler' },
  ];

  const branchList: { id: BranchId | 'all'; name: string }[] = [
    { id: 'mountain-lane', name: 'Mountain Lane (Denver)' },
    { id: 'colorado-home-health', name: 'Colorado Home Health (Colo Spgs)' },
    { id: 'frisco', name: 'High Country (Frisco)' },
  ];

  const currentBranchName = branchData?.name || 'All';

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2">
      {/* Left: Greeting & Date */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight">
          Good morning, Lisa!
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Tuesday, November 17, 2026 · Overview
        </p>
      </div>

      {/* Right Controls: Branch Filter + Unified Section Jumper Tabs + AI Briefing */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {/* Branch Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 sm:py-2 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
          >
            <span className="text-slate-400 font-normal">Branch:</span>
            <span className="font-bold text-slate-900 truncate max-w-[120px] sm:max-w-[150px]">
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

        {/* Section Jump Pill Bar (Single-Page In-Page Navigation) */}
        <div className="bg-slate-100/90 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/70 shadow-inner overflow-x-auto scrollbar-none">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => onNavigateSection?.(sec.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs font-bold ring-1 ring-slate-900/10'
                    : 'text-slate-600 hover:text-slate-900 font-medium hover:bg-white/50'
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>

        {/* AI Briefing Button */}
        <button
          type="button"
          onClick={onOpenAIBriefing}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:py-2 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full text-xs font-bold text-slate-800 transition-all shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F2B632]" />
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

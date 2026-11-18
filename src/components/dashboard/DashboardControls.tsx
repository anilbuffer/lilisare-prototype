'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Building2,
  ChevronDown,
  Sparkles,
  Check,
  Calendar,
  Compass,
  MapPin,
} from 'lucide-react';
import { BranchId, DashboardTabId, BranchData } from './dashboard-data';

interface DashboardControlsProps {
  branchData: BranchData;
  currentBranch: BranchId;
  onSelectBranch: (branchId: BranchId) => void;
  activeTab: DashboardTabId;
  onSelectTab: (tabId: DashboardTabId) => void;
  onOpenAIBriefing: () => void;
  onTrackCaregivers?: () => void;
}

export function DashboardControls({
  branchData,
  currentBranch,
  onSelectBranch,
  activeTab,
  onSelectTab,
  onOpenAIBriefing,
  onTrackCaregivers,
}: DashboardControlsProps) {
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const branchDropdownRef = useRef<HTMLDivElement>(null);

  const branches = [
    { id: 'mountain-lane' as BranchId, name: 'Mountain Lane', region: 'Denver Metro & Jefferson' },
    { id: 'colorado-home-health' as BranchId, name: 'Colorado Home Health', region: 'El Paso County & Pueblo' },
    { id: 'frisco' as BranchId, name: 'Frisco', region: 'Summit & High Country' },
  ];

  const tabs: { id: DashboardTabId; label: string }[] = [
    { id: 'executive', label: 'Executive' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'billing', label: 'Billing' },
    { id: 'scheduler', label: 'Scheduler' },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (branchDropdownRef.current && !branchDropdownRef.current.contains(e.target as Node)) {
        setIsBranchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentBranchObj = branches.find((b) => b.id === currentBranch) || branches[0];

  return (
    <div className="space-y-3.5">
      {/* Row 2: Greeting & Action Buttons (Exact Reference Layout with Brand Theme) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Greeting & Date */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight">
            Good morning, Lisa!
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
            Wednesday, November 18, 2026
          </p>
        </div>

        {/* Right: Pill Action Buttons (Matching Reference Image) */}
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

      {/* Row 3: Operating Branch & Filter Perspective Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-slate-200/70">
        {/* Branch Selector Dropdown */}
        <div className="relative" ref={branchDropdownRef}>
          <button
            onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
            aria-label="Select Operating Branch"
            aria-expanded={isBranchDropdownOpen}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-800 transition-all cursor-pointer shadow-2xs group active:scale-98"
          >
            <Building2 className="w-3.5 h-3.5 text-[#3e6b2b]" />
            <span className="text-slate-400 font-normal">Branch:</span>
            <span className="font-bold text-slate-900">{currentBranchObj.name}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform ${isBranchDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isBranchDropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-40 animate-in fade-in zoom-in-98 duration-150">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Authorized Operating Branches
              </div>
              <div className="space-y-0.5 py-1">
                {branches.map((b) => {
                  const isSelected = b.id === currentBranch;
                  return (
                    <button
                      key={b.id}
                      onClick={() => {
                        onSelectBranch(b.id);
                        setIsBranchDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-[#3e6b2b]/10 text-slate-900 font-bold'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-semibold">{b.name}</p>
                        <p className="text-[10px] text-slate-400">{b.region}</p>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#3e6b2b]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Tabs (Modern Segmented Pill Control) */}
        <div className="bg-slate-200/70 p-0.5 rounded-xl flex items-center gap-0.5 border border-slate-200/60 shadow-inner">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 font-medium hover:bg-white/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Calendar, Building2, ShieldCheck, Sparkles } from 'lucide-react';
import { BranchData } from './dashboard-data';

interface DashboardHeaderProps {
  branchData: BranchData;
}

export function DashboardHeader({ branchData }: DashboardHeaderProps) {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-bold text-[#3e6b2b] mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3e6b2b] animate-ping" />
          <span>Agency Operations Command</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 font-mono text-[10px]">{branchData.code}</span>
        </div>

        {/* Page Title: 28-32px ExtraBold */}
        <h1 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight">
          Good morning, Lisa!
        </h1>

        {/* Subheading: Tuesday, November 17, 2026 • Overview */}
        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-[#64748b]">
          <span className="font-medium text-slate-700">Tuesday, November 17, 2026</span>
          <span className="text-slate-300">•</span>
          <span className="font-semibold text-[#3e6b2b]">Overview</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">{branchData.region}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="bg-white border border-slate-200/90 rounded-xl px-3 py-1.5 shadow-2xs flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00d084]" />
          <span className="text-xs font-semibold text-slate-700">HCPF EVV Aggregator:</span>
          <span className="text-xs font-bold text-emerald-700 font-mono">Connected</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  AlertCircle,
  Clock,
  FileText,
  Home,
  ArrowRight,
} from 'lucide-react';
import { BranchData } from './dashboard-data';

interface NeedsAttentionSectionProps {
  branchData: BranchData;
  onOpenAttentionDrawer: (contextType: string) => void;
  onViewAllTasks: () => void;
}

export function NeedsAttentionSection({
  branchData,
  onOpenAttentionDrawer,
  onViewAllTasks,
}: NeedsAttentionSectionProps) {
  const { needsAttention } = branchData;

  const getItemIcon = (contextType: string) => {
    switch (contextType) {
      case 'unapproved-shifts':
        return (
          <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200/60 text-[#ff6900] flex items-center justify-center shrink-0 shadow-2xs">
            <AlertTriangle className="w-4 h-4" />
          </div>
        );
      case 'screening-flags':
        return (
          <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200/60 text-[#e04f32] flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldAlert className="w-4 h-4" />
          </div>
        );
      case 'expired-credentials':
        return (
          <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200/60 text-[#e04f32] flex items-center justify-center shrink-0 shadow-2xs">
            <AlertCircle className="w-4 h-4" />
          </div>
        );
      case 'evv-exceptions':
        return (
          <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/60 text-[#d97706] flex items-center justify-center shrink-0 shadow-2xs">
            <Clock className="w-4 h-4" />
          </div>
        );
      case 'care-notes':
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#3e6b2b] flex items-center justify-center shrink-0 shadow-2xs">
            <FileText className="w-4 h-4" />
          </div>
        );
      case 'stuck-households':
        return (
          <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200/60 text-[#d97706] flex items-center justify-center shrink-0 shadow-2xs">
            <Home className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/60 text-slate-400 flex items-center justify-center shrink-0 shadow-2xs">
            <AlertCircle className="w-4 h-4" />
          </div>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Immediate':
        return 'bg-rose-50 text-rose-700 border border-rose-200/80 font-bold';
      case 'Action required':
        return 'bg-rose-50 text-rose-700 border border-rose-200/80 font-semibold';
      case 'Overdue':
        return 'bg-rose-50 text-rose-700 border border-rose-200/80 font-semibold';
      case 'At risk':
        return 'bg-amber-50 text-amber-800 border border-amber-200/80 font-semibold';
      case 'Pending':
        return 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-semibold';
      case 'Delayed':
        return 'bg-amber-50 text-amber-800 border border-amber-200/80 font-semibold';
      default:
        return 'bg-slate-100 text-slate-600 border border-slate-200 font-semibold';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-slate-100 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff6900] shadow-[0_0_8px_rgba(255,105,0,0.5)] animate-pulse" />
          <h2 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
            Needs your attention
          </h2>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80">
            {needsAttention.length} priority items
          </span>
        </div>

        <button
          onClick={onViewAllTasks}
          className="text-xs text-[#3e6b2b] hover:text-[#2d551e] flex items-center gap-1 font-bold transition-colors cursor-pointer group hover:underline"
        >
          <span>View all tasks</span>
          <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </button>
      </div>

      {/* 6 Priority Rows */}
      <div className="divide-y divide-slate-100">
        {needsAttention.map((item) => (
          <div
            key={item.id}
            className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-100 px-2.5 sm:px-3 rounded-xl transition-all group"
          >
            {/* Left: Icon & Description */}
            <div className="flex items-center gap-3.5 min-w-0">
              {getItemIcon(item.contextType)}
              <div className="min-w-0">
                <p className="text-xs sm:text-[13px] text-slate-900 font-bold leading-snug">
                  {item.description}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {item.contextType === 'unapproved-shifts' && 'Medicaid compliance risk • Review authorization status before billing'}
                  {item.contextType === 'screening-flags' && 'CBI fingerprint check • Coordinator adjudication required'}
                  {item.contextType === 'expired-credentials' && 'Mandatory state credential • Active shift suspension notice'}
                  {item.contextType === 'evv-exceptions' && 'Geofence variance or missed clock-out • Self-correction verification'}
                  {item.contextType === 'care-notes' && 'AI clinical structuring complete • Pending RN supervisor sign-off'}
                  {item.contextType === 'stuck-households' && 'Intake bottleneck • Stalled in onboarding pipeline'}
                </p>
              </div>
            </div>

            {/* Right: Status Pill & Action Button */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 self-end sm:self-auto">
              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-2xs ${getStatusBadge(
                  item.status
                )}`}
              >
                {item.status}
              </span>

              <button
                onClick={() => onOpenAttentionDrawer(item.contextType)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] ${item.status === 'Immediate'
                  ? 'bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white shadow-[0_2px_8px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_12px_rgba(255,107,74,0.4)]'
                  : 'bg-white hover:bg-[#3e6b2b]/5 border border-slate-200/90 hover:border-[#3e6b2b]/30 text-slate-800 hover:text-[#3e6b2b] shadow-2xs'
                  }`}
              >
                {item.actionLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

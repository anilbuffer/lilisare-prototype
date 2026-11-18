'use client';

import React from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  AlertCircle,
  Clock,
  FileText,
  Home,
  GraduationCap,
  FileCheck2,
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
  // 7 priority items matching the design mockups exactly
  const items = [
    {
      id: 'att-training',
      description: '9 caregivers overdue on orientation & mandatory training',
      status: 'Overdue',
      actionLabel: 'Resolve in Training',
      contextType: 'orientation-training',
      icon: GraduationCap,
      iconColor: 'text-[#e04f32]',
      iconBg: 'bg-rose-50 border border-rose-200/60',
      badgeClass: 'bg-rose-50 text-rose-700 border border-rose-200/80 font-bold',
    },
    {
      id: 'att-unapproved',
      description: '6 caregivers working without approval · payment at risk',
      status: 'Immediate',
      actionLabel: 'Send follow-ups',
      contextType: 'unapproved-shifts',
      icon: AlertTriangle,
      iconColor: 'text-[#e04f32]',
      iconBg: 'bg-rose-50 border border-rose-200/60',
      badgeClass: 'bg-rose-50 text-rose-700 border border-rose-200/80 font-bold',
    },
    {
      id: 'att-screening',
      description: '3 screening results flagged for internal review',
      status: 'Action required',
      actionLabel: 'Review',
      contextType: 'screening-flags',
      icon: ShieldAlert,
      iconColor: 'text-[#e04f32]',
      iconBg: 'bg-rose-50 border border-rose-200/60',
      badgeClass: 'bg-rose-50 text-rose-700 border border-rose-200/80 font-semibold',
    },
    {
      id: 'att-expired',
      description: '8 caregiver credentials expired',
      status: 'Overdue',
      actionLabel: 'Review',
      contextType: 'expired-credentials',
      icon: FileCheck2,
      iconColor: 'text-[#e04f32]',
      iconBg: 'bg-rose-50 border border-rose-200/60',
      badgeClass: 'bg-rose-50 text-rose-700 border border-rose-200/80 font-semibold',
    },
    {
      id: 'att-evv',
      description: '14 EVV visits at risk · missing clock-out or GPS',
      status: 'At risk',
      actionLabel: 'Review',
      contextType: 'evv-exceptions',
      icon: Clock,
      iconColor: 'text-[#d97706]',
      iconBg: 'bg-amber-50 border border-amber-200/60',
      badgeClass: 'bg-amber-50 text-amber-800 border border-amber-200/80 font-semibold',
    },
    {
      id: 'att-notes',
      description: '26 care notes awaiting audit · AI wording ready',
      status: 'Pending',
      actionLabel: 'Open queue',
      contextType: 'care-notes',
      icon: FileText,
      iconColor: 'text-[#3e6b2b]',
      iconBg: 'bg-emerald-50 border border-emerald-200/60',
      badgeClass: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-semibold',
    },
    {
      id: 'att-households',
      description: '11 households stuck in onboarding > 5 days',
      status: 'Delayed',
      actionLabel: 'View',
      contextType: 'stuck-households',
      icon: Home,
      iconColor: 'text-[#d97706]',
      iconBg: 'bg-amber-50 border border-amber-200/60',
      badgeClass: 'bg-amber-50 text-amber-800 border border-amber-200/80 font-semibold',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-slate-100 mb-2">
        <div className="flex items-center gap-2.5">
          <h2 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
            Needs your attention
          </h2>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80">
            {items.length} priority items
          </span>
        </div>

        <button
          type="button"
          onClick={onViewAllTasks}
          className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors cursor-pointer group hover:underline"
        >
          <span>View all tasks</span>
          <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </button>
      </div>

      {/* 7 Priority Rows */}
      <div className="divide-y divide-slate-100">
        {items.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 px-2.5 sm:px-3 rounded-xl transition-all group"
            >
              {/* Left: Icon & Description */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-[13px] text-slate-900 font-bold leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right: Status Pill & Action Button */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 self-end sm:self-auto">
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-2xs ${item.badgeClass}`}>
                  {item.status}
                </span>

                <button
                  type="button"
                  onClick={() => onOpenAttentionDrawer(item.contextType)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-[0.98] ${item.status === 'Immediate'
                    ? 'bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white shadow-[0_2px_8px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_12px_rgba(255,107,74,0.4)]'
                    : 'bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 text-slate-700 shadow-2xs'
                    }`}
                >
                  {item.actionLabel}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

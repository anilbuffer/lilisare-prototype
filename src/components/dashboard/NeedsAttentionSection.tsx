'use client';

import React from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Clock,
  FileText,
  Home,
  GraduationCap,
  FileCheck2,
  ShieldCheck,
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
  // 7 brand priority items matching reference screenshot exactly
  const items = [
    {
      id: 'att-training',
      description: '9 caregivers overdue on orientation & mandatory training',
      status: 'Overdue',
      actionLabel: 'Resolve in Training',
      contextType: 'expired-credentials',
      icon: GraduationCap,
      iconColor: 'text-slate-800',
      badgeClass: 'bg-[#fff1f1] text-[#e04f32]',
    },
    {
      id: 'att-unapproved',
      description: '6 caregivers working without approval · payment at risk',
      status: 'Immediate',
      actionLabel: 'Send follow-ups',
      contextType: 'unapproved-shifts',
      icon: AlertTriangle,
      iconColor: 'text-[#e04f32]',
      badgeClass: 'bg-[#fff1f1] text-[#e04f32]',
    },
    {
      id: 'att-screening',
      description: '3 screening results flagged for internal review',
      status: 'Action required',
      actionLabel: 'Review',
      contextType: 'screening-flags',
      icon: ShieldCheck,
      iconColor: 'text-[#e04f32]',
      badgeClass: 'bg-[#fff1f1] text-[#e04f32]',
    },
    {
      id: 'att-expired',
      description: '8 caregiver credentials expired',
      status: 'Overdue',
      actionLabel: 'Review',
      contextType: 'expired-credentials',
      icon: FileCheck2,
      iconColor: 'text-[#e04f32]',
      badgeClass: 'bg-[#fff1f1] text-[#e04f32]',
    },
    {
      id: 'att-evv',
      description: '14 EVV visits at risk · missing clock-out or GPS',
      status: 'At risk',
      actionLabel: 'Review',
      contextType: 'evv-exceptions',
      icon: Clock,
      iconColor: 'text-[#d97706]',
      badgeClass: 'bg-[#fffbeb] text-[#b45309]',
    },
    {
      id: 'att-notes',
      description: '26 care notes awaiting audit · AI wording ready',
      status: 'Pending',
      actionLabel: 'Open queue',
      contextType: 'care-notes',
      icon: FileText,
      iconColor: 'text-[#d97706]',
      badgeClass: 'bg-[#fffbeb] text-[#b45309]',
    },
    {
      id: 'att-households',
      description: '11 households stuck in onboarding > 5 days',
      status: 'Delayed',
      actionLabel: 'View',
      contextType: 'stuck-households',
      icon: Home,
      iconColor: 'text-[#d97706]',
      badgeClass: 'bg-[#fffbeb] text-[#b45309]',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-1">
        <div className="flex items-center gap-2.5">
          <h2 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
            Needs your attention
          </h2>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#fff1f1] text-[#e04f32]">
            {items.length} priority items
          </span>
        </div>

        <button
          type="button"
          onClick={onViewAllTasks}
          className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium transition-colors cursor-pointer group"
        >
          <span>View all tasks</span>
          <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </button>
      </div>

      {/* 7 Priority Rows */}
      <div className="divide-y divide-slate-100/90">
        {items.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-slate-50/70 px-2 rounded-xl transition-all group"
            >
              {/* Left: Icon & Description */}
              <div className="flex items-center gap-3 min-w-0">
                <IconComponent className={`w-4 h-4 shrink-0 ${item.iconColor}`} />
                <span className="text-xs sm:text-[13px] text-slate-800 font-medium leading-snug truncate">
                  {item.description}
                </span>
              </div>

              {/* Right: Status Pill & Action Button */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 self-end sm:self-auto">
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap shadow-2xs ${item.badgeClass}`}>
                  {item.status}
                </span>

                <button
                  type="button"
                  onClick={() => onOpenAttentionDrawer(item.contextType)}
                  className="px-3.5 py-1 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-lg text-xs font-medium text-slate-700 shadow-2xs hover:shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
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

'use client';

import React from 'react';
import { BranchData } from './dashboard-data';
import { Zap } from 'lucide-react';

interface AutomationBannerProps {
  branchData: BranchData;
  onOpenAutomationRules: () => void;
}

export function AutomationBanner({
  branchData,
  onOpenAutomationRules,
}: AutomationBannerProps) {
  const { automation } = branchData;

  return (
    <div className="bg-gradient-to-r from-emerald-50/50 via-white to-slate-50/60 border border-slate-200/90 rounded-2xl px-5 py-3.5 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-all">
      {/* Metric Text with Pulse Indicator */}
      <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
        <span className="w-2.5 h-2.5 rounded-full bg-[#00d084] shadow-[0_0_8px_rgba(0,208,132,0.5)] animate-pulse shrink-0" />
        <span>
          This week:{' '}
          <strong className="text-slate-900 font-mono font-bold">
            {automation.tasksAutomated.toLocaleString()}
          </strong>{' '}
          tasks automated •{' '}
          <strong className="text-slate-900 font-mono font-bold">
            {automation.remindersSent.toLocaleString()}
          </strong>{' '}
          reminders sent •{' '}
          <strong className="text-slate-900 font-mono font-bold">
            ~{automation.hoursSaved}
          </strong>{' '}
          staff hours saved
        </span>
      </div>

      {/* Right Link */}
      <button
        onClick={onOpenAutomationRules}
        className="text-xs text-[#3e6b2b] hover:text-[#2d551e] flex items-center gap-1 font-bold transition-colors cursor-pointer group self-end sm:self-auto hover:underline"
      >
        <span>View automation rules</span>
        <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
      </button>
    </div>
  );
}

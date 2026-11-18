'use client';

import React from 'react';
import { BranchData } from './dashboard-data';
import { Clock, AlertCircle, ArrowRight, UserCheck, MapPin } from 'lucide-react';

interface SchedulerSectionCardsProps {
  branchData: BranchData;
  onViewAllScheduler?: () => void;
  onOpenShiftDetail?: (shift: any) => void;
  onOpenEvvDetail?: (item: any) => void;
}

export function SchedulerSectionCards({
  branchData,
  onViewAllScheduler,
  onOpenShiftDetail,
  onOpenEvvDetail,
}: SchedulerSectionCardsProps) {
  const unfilledShifts = [
    {
      id: 'shift-1',
      date: 'Tue 17 · 9a–1p',
      caregiver: 'Harper N.',
      role: 'CNA',
    },
    {
      id: 'shift-2',
      date: 'Wed 18 · 12p–4p',
      caregiver: 'Desmond C.',
      role: 'IHSS',
    },
    {
      id: 'shift-3',
      date: 'Fri 20 · 3p–7p',
      caregiver: 'Priya R.',
      role: 'HCBS',
    },
  ];

  const evvExceptions = [
    {
      id: 'evv-1',
      type: 'Missed clock-out',
      detail: 'Luis Ruiz · Josefina R. · Nov 14 5:00 PM',
      action: 'Request self-correct',
      actionClass: 'bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700',
    },
    {
      id: 'evv-2',
      type: 'Self-correct request',
      detail: 'Grace Park · Aiden P. · Nov 15 6:10 PM',
      action: 'Approve / Deny',
      actionClass: 'bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-[#3e6b2b]',
    },
    {
      id: 'evv-3',
      type: 'GPS mismatch',
      detail: 'Linh Nguyen · Harper N. · Nov 15 9:02 AM',
      action: 'Resolve',
      actionClass: 'bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700',
    },
  ];

  const wastedBreakdown = [
    { label: 'Missed clock-outs', hours: '16.5 hrs', pct: 39, color: 'bg-rose-500' },
    { label: 'Late clock-ins', hours: '14.2 hrs', pct: 33, color: 'bg-amber-500' },
    { label: 'Early clock-outs', hours: '11.8 hrs', pct: 28, color: 'bg-sky-500' },
  ];

  const regionalOpenShifts = [
    { region: 'Denver Metro · IHSS program', open: '4 shifts open' },
    { region: 'Arapahoe / Douglas · PDN program', open: '2 shifts open' },
    { region: 'Boulder / North · CFC program', open: '2 shifts open' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
      {/* Card 1: Unfilled shifts */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Unfilled shifts
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80">
                5 urgent ≤48h
              </span>
            </div>

            <button
              type="button"
              onClick={onViewAllScheduler}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors cursor-pointer group hover:underline"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* List */}
          <div className="mt-3.5 divide-y divide-slate-100">
            {unfilledShifts.map((shift) => (
              <div key={shift.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-slate-900">
                    {shift.date}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {shift.caregiver} · <span className="font-semibold text-slate-700">{shift.role}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenShiftDetail?.(shift)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 hover:text-slate-900 shadow-2xs transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                >
                  Find cover
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 2: EVV exceptions & self-corrections */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                EVV exceptions &amp; self-corrections
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
                14 at risk
              </span>
            </div>

            <button
              type="button"
              onClick={onViewAllScheduler}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors cursor-pointer group hover:underline"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* List */}
          <div className="mt-3.5 divide-y divide-slate-100">
            {evvExceptions.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">
                    {item.type}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {item.detail}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenEvvDetail?.(item)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-2xs whitespace-nowrap cursor-pointer ${item.actionClass}`}
                >
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 3: Wasted / unverified hours */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Wasted / unverified hours
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
                42.5 hrs
              </span>
            </div>

            <button
              type="button"
              onClick={onViewAllScheduler}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors cursor-pointer group hover:underline"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* Big Stat */}
          <div className="my-4 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
              42.5 hrs
            </span>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/60">
              -$935.00 est. cost impact
            </span>
          </div>

          {/* Breakdown Bars */}
          <div className="space-y-3 pt-2">
            {wastedBreakdown.map((b) => (
              <div key={b.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">{b.label}</span>
                  <span className="font-mono text-slate-900 font-bold text-[11px]">{b.hours}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                  <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 4: Overtime & open shifts by region */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Overtime &amp; open shifts by region
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
                14 near OT
              </span>
            </div>

            <button
              type="button"
              onClick={onViewAllScheduler}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors cursor-pointer group hover:underline"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* Big Stat */}
          <div className="my-4 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
              14 Caregivers
            </span>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/60">
              -$3,420 projected OT
            </span>
          </div>

          {/* Regional Open Shifts List */}
          <div className="divide-y divide-slate-100 mt-2">
            {regionalOpenShifts.map((reg) => (
              <div key={reg.region} className="py-2.5 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{reg.region}</span>
                <span className="font-bold text-slate-900 font-mono text-[11px] bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                  {reg.open}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { BranchData } from './dashboard-data';
import { ArrowRight, AlertTriangle, AlertCircle } from 'lucide-react';

interface EVVAndWastedHoursSectionProps {
  branchData: BranchData;
  onOpenEvvExceptions?: () => void;
  onOpenWastedTime?: () => void;
}

export function EVVAndWastedHoursSection({
  branchData,
  onOpenEvvExceptions,
  onOpenWastedTime,
}: EVVAndWastedHoursSectionProps) {
  const { evvSummary, wastedHours } = branchData;

  const complianceRate = evvSummary?.complianceRate ?? 98.2;
  const strokeDashoffset = 283 * (1 - complianceRate / 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Left: EVV Compliance */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100/80">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              EVV Compliance
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Colorado HCPF Sandata aggregator telemetry
            </p>
          </div>
          <button
            onClick={onOpenEvvExceptions}
            className="text-xs font-semibold text-[#3e6b2b] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Exceptions</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Donut Ring & Risk Banner Row */}
        <div className="py-4 flex flex-col sm:flex-row items-center gap-5">
          {/* Circular Donut Gauge */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="9"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#00d084"
                strokeWidth="9"
                strokeDasharray="264"
                strokeDashoffset={264 * (1 - complianceRate / 100)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-slate-900 font-mono tracking-tight">
                {complianceRate}%
              </span>
            </div>
          </div>

          {/* Risk Alert Card */}
          <div className="flex-1 w-full bg-rose-50/80 border border-rose-200/80 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-rose-900">
                {evvSummary?.atRiskVisits ?? 14} Visits at Risk
              </h4>
              <p className="text-[11px] text-rose-700 mt-0.5 leading-snug">
                {evvSummary?.atRiskMessage ?? 'Missing EVV data may block billing and reimbursement cycles.'}
              </p>
            </div>
          </div>
        </div>

        {/* Top Exceptions List */}
        <div className="pt-3 border-t border-slate-100/80">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
            Top Exceptions
          </div>
          <div className="space-y-1.5">
            {evvSummary?.exceptions?.map((item) => (
              <div
                key={item.type}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors text-xs"
              >
                <span className="font-medium text-slate-700">{item.type}</span>
                <span className="px-2 py-0.5 rounded-md bg-rose-100/80 text-rose-700 border border-rose-200/60 font-mono font-bold text-[11px]">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Wasted Hours */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100/80">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Wasted Hours
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Schedule vs actual EVV — this week
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase tracking-wide">
            Cost leakage
          </span>
        </div>

        {/* Headline Stat & 3 Columns */}
        <div className="py-3">
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 font-mono tracking-tight">
              {wastedHours?.totalHours ?? 14.6} hrs
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              Est. cost impact ${wastedHours?.costImpact ?? 467}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100/80 text-center">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                Late clock-ins
              </span>
              <span className="text-sm font-black text-slate-800 font-mono mt-0.5 block">
                {wastedHours?.lateClockIns ?? 9.2} hrs
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                Early clock-outs
              </span>
              <span className="text-sm font-black text-slate-800 font-mono mt-0.5 block">
                {wastedHours?.earlyClockOuts ?? 3.1} hrs
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                Late clock-outs
              </span>
              <span className="text-sm font-black text-slate-800 font-mono mt-0.5 block">
                {wastedHours?.lateClockOuts ?? 2.3} hrs
              </span>
            </div>
          </div>
        </div>

        {/* Top Offenders */}
        <div className="pt-2 border-t border-slate-100/80">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
            Top Offenders
          </div>
          <div className="space-y-1.5">
            {wastedHours?.offenders?.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors text-xs"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{item.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5">
                    Schedule {item.scheduled} → Actual {item.actual}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-amber-100/80 text-amber-800 border border-amber-200 font-mono font-bold text-[11px] shrink-0 ml-2">
                  {item.diff}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2.5 text-right">
            <button
              onClick={onOpenWastedTime}
              className="text-[11px] font-semibold text-[#3e6b2b] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View all wasted-time exceptions</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { BranchData } from './dashboard-data';
import { Star, ArrowRight } from 'lucide-react';

interface VisitsAndSatisfactionSectionProps {
  branchData: BranchData;
  onViewAllSatisfaction?: () => void;
  onViewVisitsDetail?: () => void;
}

export function VisitsAndSatisfactionSection({
  branchData,
  onViewAllSatisfaction,
  onViewVisitsDetail,
}: VisitsAndSatisfactionSectionProps) {
  const { weeklyVisits, patientSatisfaction } = branchData;

  const maxVal = 160; // Y axis ceiling matching EHR reference

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
      {/* Left 65%: Visits this week */}
      <div className="lg:col-span-8 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100/90">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Visits this week
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80 text-[11px] font-bold shadow-2xs">
            {weeklyVisits?.completionRate ?? 86}% Completion
          </span>
        </div>

        {/* Dual Bar Chart */}
        <div className="mt-4 flex-1 flex flex-col justify-end">
          <div className="relative h-44 w-full flex items-end">
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-slate-200 w-full flex justify-between">
                <span className="text-[10px] text-slate-400 font-mono -translate-y-2.5">160</span>
              </div>
              <div className="border-b border-slate-200 w-full flex justify-between">
                <span className="text-[10px] text-slate-400 font-mono -translate-y-2.5">120</span>
              </div>
              <div className="border-b border-slate-200 w-full flex justify-between">
                <span className="text-[10px] text-slate-400 font-mono -translate-y-2.5">80</span>
              </div>
              <div className="border-b border-slate-200 w-full flex justify-between">
                <span className="text-[10px] text-slate-400 font-mono -translate-y-2.5">40</span>
              </div>
              <div className="border-b border-slate-200 w-full flex justify-between">
                <span className="text-[10px] text-slate-400 font-mono -translate-y-2.5">0</span>
              </div>
            </div>

            {/* Bars Column Container */}
            <div className="w-full pl-6 grid grid-cols-7 gap-2 sm:gap-4 h-full items-end z-10">
              {weeklyVisits?.days?.map((item) => {
                const schedHeight = Math.min(100, Math.round((item.scheduled / maxVal) * 100));
                const compHeight = Math.min(100, Math.round((item.completed / maxVal) * 100));

                return (
                  <div key={item.day} className="flex flex-col items-center h-full justify-end group">
                    <div className="flex items-end gap-1 sm:gap-1.5 h-full w-full justify-center">
                      {/* Scheduled Bar (Gray) */}
                      <div
                        style={{ height: `${schedHeight}%` }}
                        className="w-2.5 sm:w-4 bg-slate-200 rounded-t-sm transition-all duration-300 group-hover:bg-slate-300 relative"
                        title={`Scheduled: ${item.scheduled}`}
                      />
                      {/* Completed Bar (LiliSare Brand Green) */}
                      <div
                        style={{ height: `${compHeight}%` }}
                        className="w-2.5 sm:w-4 bg-[#008060] rounded-t-sm transition-all duration-300 group-hover:bg-[#006e52] relative"
                        title={`Completed: ${item.completed}`}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 mt-2">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#008060]" />
              <span className="font-semibold text-slate-700">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="font-medium text-slate-500">Scheduled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right 35%: Patient Satisfaction */}
      <div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100/90">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Patient Satisfaction
          </h3>
          <button
            onClick={onViewAllSatisfaction}
            className="text-xs font-semibold text-[#3e6b2b] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View all</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Gauge Arc Graphic */}
        <div className="my-2 flex flex-col items-center justify-center relative">
          <div className="relative w-44 h-24 flex items-end justify-center">
            {/* SVG Semi-Circle Gauge */}
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
              {/* Background Arc */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Active Arc (LiliSare Green Gradient) */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#008060"
                strokeWidth="10"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 * (1 - (patientSatisfaction?.score ?? 4.8) / 5.0)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute bottom-0 flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono leading-none">
                {patientSatisfaction?.score ?? 4.8}
              </span>
              <div className="flex items-center gap-0.5 text-[#F2B632] mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F2B632]" />
                ))}
              </div>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 mt-1">
            out of {patientSatisfaction?.total ?? '5.0'}
          </span>
        </div>

        {/* Criteria Breakdown */}
        <div className="space-y-2 pt-2.5 border-t border-slate-100/90">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-600 font-medium text-[11px]">Punctuality</span>
              <span className="font-bold text-slate-900 font-mono text-[11px]">
                {patientSatisfaction?.breakdown?.punctuality ?? 4.9}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#008060] h-full rounded-full transition-all duration-500"
                style={{ width: `${((patientSatisfaction?.breakdown?.punctuality ?? 4.9) / 5) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-600 font-medium text-[11px]">Care Quality</span>
              <span className="font-bold text-slate-900 font-mono text-[11px]">
                {patientSatisfaction?.breakdown?.careQuality ?? 4.8}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#008060] h-full rounded-full transition-all duration-500"
                style={{ width: `${((patientSatisfaction?.breakdown?.careQuality ?? 4.8) / 5) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-600 font-medium text-[11px]">Communication</span>
              <span className="font-bold text-slate-900 font-mono text-[11px]">
                {patientSatisfaction?.breakdown?.communication ?? 4.6}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#008060] h-full rounded-full transition-all duration-500"
                style={{ width: `${((patientSatisfaction?.breakdown?.communication ?? 4.6) / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { BranchData } from './dashboard-data';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface FinancialAndAuthSectionProps {
  branchData: BranchData;
  onOpenFinancialDetails?: () => void;
  onOpenAuthReport?: () => void;
  onOpenOvertimeSchedule?: () => void;
}

export function FinancialAndAuthSection({
  branchData,
  onOpenFinancialDetails,
  onOpenAuthReport,
  onOpenOvertimeSchedule,
}: FinancialAndAuthSectionProps) {
  const { financialHealth, authUtilization, caregiverOvertime } = branchData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 sm:gap-4">
      {/* Col 1: Financial Health */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100/90">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Financial Health
          </h3>
          <button
            onClick={onOpenFinancialDetails}
            className="text-xs font-semibold text-[#3e6b2b] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Donut Chart & Payer Legend */}
        <div className="py-3 flex items-center justify-between gap-4">
          {/* Donut graphic */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {/* Segments: Medicare 65%, Medicaid 20%, Private Pay 10%, Commercial 5% */}
              {/* Radius 40 -> Circumference = 2 * PI * 40 = 251.2 */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#3e6b2b"
                strokeWidth="12"
                strokeDasharray="238.7"
                strokeDashoffset="83.5"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#00d084"
                strokeWidth="12"
                strokeDasharray="238.7"
                strokeDashoffset="191"
                className="rotate-[234deg] origin-center"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#F2B632"
                strokeWidth="12"
                strokeDasharray="238.7"
                strokeDashoffset="214.8"
                className="rotate-[306deg] origin-center"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="12"
                strokeDasharray="238.7"
                strokeDashoffset="226.7"
                className="rotate-[342deg] origin-center"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Rev</span>
              <span className="text-sm font-black text-slate-900 font-mono tracking-tight leading-none mt-0.5">
                {financialHealth?.totalRevenue ?? '$1.2M'}
              </span>
            </div>
          </div>

          {/* Payers Legend */}
          <div className="flex-1 space-y-1.5 text-xs">
            {financialHealth?.payers?.map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-slate-600 font-medium">{p.name}</span>
                </div>
                <span className="font-bold text-slate-900 font-mono">{p.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Unbilled & Denied metrics */}
        <div className="pt-3 border-t border-slate-100/80">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">Unbilled</span>
              <span className="text-base font-black text-slate-900 font-mono block mt-0.5">
                {financialHealth?.unbilled ?? '$42,500'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100">
              <span className="text-[10px] uppercase font-bold text-rose-500 block truncate">Denied claims</span>
              <span className="text-base font-black text-rose-600 font-mono block mt-0.5">
                {financialHealth?.deniedClaims ?? '$8,240'}
              </span>
            </div>
          </div>

          {/* AR Aging bar */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
              <span>AR Aging</span>
              <span className="text-slate-400 font-mono text-[10px]">0-30d • 31-60d • 60d+</span>
            </div>
            <div className="w-full h-2 rounded-full flex overflow-hidden bg-slate-100">
              <div
                style={{ width: `${financialHealth?.arAging?.days0_30 ?? 72}%` }}
                className="bg-[#3e6b2b] h-full"
                title={`0-30 days: ${financialHealth?.arAging?.days0_30 ?? 72}%`}
              />
              <div
                style={{ width: `${financialHealth?.arAging?.days31_60 ?? 20}%` }}
                className="bg-[#F2B632] h-full"
                title={`31-60 days: ${financialHealth?.arAging?.days31_60 ?? 20}%`}
              />
              <div
                style={{ width: `${financialHealth?.arAging?.days60Plus ?? 8}%` }}
                className="bg-rose-500 h-full"
                title={`60+ days: ${financialHealth?.arAging?.days60Plus ?? 8}%`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Col 2: Authorization utilization */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100/90">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Authorization utilization
          </h3>
          <button
            onClick={onOpenAuthReport}
            className="text-xs font-semibold text-[#3e6b2b] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Report</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Progress Rows */}
        <div className="py-3 space-y-3.5">
          {/* At Risk */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-rose-700">
                {authUtilization?.atRisk?.label ?? 'At Risk (90%+)'}
              </span>
              <span className="font-bold text-slate-900 font-mono">
                {authUtilization?.atRisk?.count ?? 12} Patients
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${authUtilization?.atRisk?.percentage ?? 92}%` }}
              />
            </div>
          </div>

          {/* Approaching */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-amber-700">
                {authUtilization?.approaching?.label ?? 'Approaching (75-90%)'}
              </span>
              <span className="font-bold text-slate-900 font-mono">
                {authUtilization?.approaching?.count ?? 38} Patients
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#F2B632] h-full rounded-full transition-all duration-500"
                style={{ width: `${authUtilization?.approaching?.percentage ?? 80}%` }}
              />
            </div>
          </div>

          {/* On Track */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-emerald-700">
                {authUtilization?.onTrack?.label ?? 'On Track (<75%)'}
              </span>
              <span className="font-bold text-slate-900 font-mono">
                {authUtilization?.onTrack?.count ?? 545} Patients
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#3e6b2b] h-full rounded-full transition-all duration-500"
                style={{ width: `${authUtilization?.onTrack?.percentage ?? 55}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3 Bottom Stats */}
        <div className="pt-3 border-t border-slate-100/80 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-base font-black text-slate-900 font-mono block">
              {authUtilization?.stats?.active ?? 885}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold block truncate mt-0.5">
              Active Auths
            </span>
          </div>
          <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-100">
            <span className="text-base font-black text-amber-700 font-mono block">
              {authUtilization?.stats?.expiringSoon ?? 14}
            </span>
            <span className="text-[10px] text-amber-700 font-semibold block truncate mt-0.5">
              Expiring Soon
            </span>
          </div>
          <div className="p-2 rounded-xl bg-rose-50/70 border border-rose-100">
            <span className="text-base font-black text-rose-600 font-mono block">
              {authUtilization?.stats?.expired ?? 3}
            </span>
            <span className="text-[10px] text-rose-600 font-semibold block truncate mt-0.5">
              Expired
            </span>
          </div>
        </div>
      </div>

      {/* Col 3: Caregiver overtime */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100/90">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Caregiver overtime
          </h3>
          <button
            onClick={onOpenOvertimeSchedule}
            className="text-xs font-semibold text-[#3e6b2b] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Schedule</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Overtime List */}
        <div className="py-2.5 space-y-2">
          {caregiverOvertime?.flaggedStaff?.map((staff) => (
            <div
              key={staff.name}
              className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center font-mono text-[11px] shrink-0">
                  {staff.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">{staff.name}</p>
                  <p className="text-[11px] text-rose-600 font-medium font-mono">
                    {staff.hours} ({staff.otHours})
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Under 40 hours badge */}
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#00d084] shrink-0" />
            <span>{caregiverOvertime?.under40HoursRate ?? 98}% of staff under 40 hours</span>
          </div>
        </div>

        {/* 3 Bottom Summary Stats */}
        <div className="pt-3 border-t border-slate-100/80 grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block truncate">
              Total OT Hours
            </span>
            <span className="text-xs font-bold text-slate-800 font-mono mt-0.5 block">
              {caregiverOvertime?.totalOtHours ?? 14.5} hrs
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block truncate">
              Est. OT Cost
            </span>
            <span className="text-xs font-bold text-rose-600 font-mono mt-0.5 block">
              ${caregiverOvertime?.estOtCost ?? 543.75}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block truncate">
              Approaching OT
            </span>
            <span className="text-xs font-bold text-amber-700 font-mono mt-0.5 block">
              {caregiverOvertime?.approachingOt ?? 5} staff
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

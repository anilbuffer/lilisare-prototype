'use client';

import React from 'react';
import { BranchData } from './dashboard-data';
import { ShieldCheck, Calendar, UserCheck, AlertCircle, Clock } from 'lucide-react';

interface ComplianceSectionCardsProps {
  branchData: BranchData;
  onViewAllCompliance?: () => void;
  onOpenComplianceDetail?: (item: any) => void;
  onViewAllVisits?: () => void;
}

export function ComplianceSectionCards({
  branchData,
  onViewAllCompliance,
  onOpenComplianceDetail,
  onViewAllVisits,
}: ComplianceSectionCardsProps) {
  const { compliance } = branchData;

  const credentialsList = [
    {
      id: 'comp-1',
      name: 'Rosa Vega',
      credential: 'CPR / First aid',
      status: 'Expired 2d ago',
      badgeType: 'expired',
      action: 'Notify',
    },
    {
      id: 'comp-2',
      name: 'Luis Ruiz',
      credential: 'Driving record (MVR)',
      status: 'Expired 21d',
      badgeType: 'expired',
      action: 'Resolve',
    },
    {
      id: 'comp-3',
      name: 'Grace Park',
      credential: 'Annual TB screening test',
      status: '12d left',
      badgeType: 'warning',
      action: 'Remind',
    },
    {
      id: 'comp-4',
      name: 'David Miller',
      credential: 'Colorado CNA License',
      status: 'Expired 8d',
      badgeType: 'expired',
      action: 'Notify',
    },
    {
      id: 'comp-5',
      name: 'Hannah Miller',
      credential: 'Annual OIG/SAM exclusion',
      status: '5d left',
      badgeType: 'warning',
      action: 'Review',
    },
  ];

  const supervisoryTiers = [
    { label: '30-Day Initial Assessments', count: '82 / 87 on track', pct: 94, color: 'bg-[#3e6b2b]' },
    { label: '60-Day Routine Visits', count: '114 / 125 on track', pct: 91, color: 'bg-emerald-500' },
    { label: '90-Day Comprehensive', count: '82 / 98 on track', pct: 84, color: 'bg-[#F2B632]' },
  ];

  const upcomingVisits = [
    {
      id: 'vis-1',
      client: 'Liam Vance',
      caregiver: 'Evelyn Vance',
      tier: '60-day RN visit',
      due: '4 days overdue',
      urgent: true,
      action: 'Schedule visit',
    },
    {
      id: 'vis-2',
      client: 'Sofia Hernandez',
      caregiver: 'Mateo Hernandez',
      tier: '90-day RN visit',
      due: 'Due tomorrow',
      urgent: false,
      action: 'Confirm',
    },
    {
      id: 'vis-3',
      client: 'Marcus Bennett',
      caregiver: 'Chloe Bennett',
      tier: '30-day initial',
      due: 'Due in 3 days',
      urgent: false,
      action: 'Assign RN',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
      {/* 1. Credentials & licenses */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Credentials &amp; licenses
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80">
                8 expired
              </span>
            </div>

            <button
              type="button"
              onClick={onViewAllCompliance}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors cursor-pointer group hover:underline"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* List */}
          <div className="mt-3.5 divide-y divide-slate-100">
            {credentialsList.map((item) => {
              const initials = item.name.split(' ').map((n) => n[0]).join('').slice(0, 2);
              const isExpired = item.badgeType === 'expired';
              return (
                <div
                  key={item.id}
                  onClick={() => onOpenComplianceDetail?.(item)}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 px-2 rounded-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/70 font-bold text-xs flex items-center justify-center shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 group-hover:text-[#3e6b2b] transition-colors truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                        {item.credential}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-2xs ${
                        isExpired
                          ? 'bg-rose-50 text-rose-700 border border-rose-200/80'
                          : 'bg-amber-50 text-amber-800 border border-amber-200/80'
                      }`}
                    >
                      {item.status}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenComplianceDetail?.(item);
                      }}
                      className="px-3 py-1 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 hover:text-slate-900 shadow-2xs transition-all cursor-pointer"
                    >
                      {item.action}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Supervisory visits (RN / non-RN) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Supervisory visits (RN / non-RN)
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80">
                278 / 310 on track
              </span>
            </div>

            <button
              type="button"
              onClick={onViewAllVisits}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors cursor-pointer group hover:underline"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* Progress Bars */}
          <div className="mt-4 space-y-3 pb-3 border-b border-slate-100">
            {supervisoryTiers.map((tier) => (
              <div key={tier.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">{tier.label}</span>
                  <span className="font-mono text-slate-900 font-bold text-[11px]">
                    {tier.count} ({tier.pct}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                  <div
                    className={`h-full ${tier.color} rounded-full transition-all duration-500`}
                    style={{ width: `${tier.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Schedule */}
          <div className="mt-3 divide-y divide-slate-100">
            {upcomingVisits.map((v) => (
              <div key={v.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">
                    {v.client} <span className="font-normal text-slate-400">• {v.caregiver}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <span>{v.tier}</span>
                    <span>•</span>
                    <span className={v.urgent ? 'text-rose-600 font-bold' : 'text-slate-500'}>
                      {v.due}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onViewAllVisits}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    v.urgent
                      ? 'bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] text-white shadow-2xs hover:brightness-105'
                      : 'bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700'
                  }`}
                >
                  {v.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

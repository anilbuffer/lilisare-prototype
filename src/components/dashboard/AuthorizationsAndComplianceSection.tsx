'use client';

import React from 'react';
import { BranchData } from './dashboard-data';
import { Mail } from 'lucide-react';

interface AuthorizationsAndComplianceSectionProps {
  branchData: BranchData;
  onViewAllAuthorizations: () => void;
  onViewAllCompliance: () => void;
  onOpenAuthDetail: (authItem: any) => void;
  onSendFollowUp: (authItem: any) => void;
  onOpenComplianceDetail: (compItem: any) => void;
}

export function AuthorizationsAndComplianceSection({
  branchData,
  onViewAllAuthorizations,
  onViewAllCompliance,
  onOpenAuthDetail,
  onSendFollowUp,
  onOpenComplianceDetail,
}: AuthorizationsAndComplianceSectionProps) {
  const { authorizations, compliance } = branchData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
      {/* 9.1 Authorizations Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Authorizations
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80">
                {authorizations.overdueCount} overdue
              </span>
            </div>

            <button
              onClick={onViewAllAuthorizations}
              className="text-xs text-[#3e6b2b] hover:text-[#2d551e] flex items-center gap-1 font-bold transition-colors cursor-pointer group hover:underline"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* Status Breakdown Line & Stacked Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-2 font-medium">
              <span className="text-emerald-700 font-semibold">
                Approved: {authorizations.breakdown.approved.count} ({authorizations.breakdown.approved.percentage}%)
              </span>
              <span className="text-amber-700 font-semibold">
                Awaiting state: {authorizations.breakdown.awaitingState.count} ({authorizations.breakdown.awaitingState.percentage}%)
              </span>
              <span className="text-rose-700 font-bold">
                Overdue: {authorizations.breakdown.overdue.count} ({authorizations.breakdown.overdue.percentage}%)
              </span>
            </div>

            {/* 3-Segment Stacked Bar */}
            <div className="w-full h-2 rounded-full overflow-hidden flex gap-0.5 bg-slate-100 p-0.5 shadow-inner">
              <div
                className="h-full bg-[#10b981] rounded-l-full"
                style={{ width: `${authorizations.breakdown.approved.percentage}%` }}
              />
              <div
                className="h-full bg-[#f59e0b]"
                style={{ width: `${authorizations.breakdown.awaitingState.percentage}%` }}
              />
              <div
                className="h-full bg-[#e04f32] rounded-r-full"
                style={{ width: `${authorizations.breakdown.overdue.percentage}%` }}
              />
            </div>
          </div>

          {/* Overdue Authorizations List */}
          <div className="mt-4 divide-y divide-slate-100/90">
            {authorizations.overdueList.map((record) => {
              const initials = record.clientName.split(' ').map((n: string) => n[0]).join('').slice(0, 2);
              return (
                <div
                  key={record.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-xl transition-all group"
                >
                  <div
                    onClick={() => onOpenAuthDetail(record)}
                    className="flex items-center gap-3 min-w-0 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 border border-slate-200/70 font-bold text-xs flex items-center justify-center shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 group-hover:text-[#3e6b2b] transition-colors truncate">
                        {record.clientName}{' '}
                        <span className="text-slate-400 font-normal">
                          • CM: {record.caseManager}
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-400">Medicaid Prior Auth • Tier 2</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-[11px] font-bold text-rose-700 font-mono bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60 shadow-2xs">
                      {record.status}
                    </span>

                    <button
                      onClick={() => onSendFollowUp(record)}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white text-xs font-bold rounded-xl shadow-[0_2px_8px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_12px_rgba(255,107,74,0.4)] transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                    >
                      Send follow-up
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 9.2 Compliance Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                  Compliance
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80">
                  {compliance.expiredCount} expired
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Caregivers with urgent credential renewal deadlines
              </p>
            </div>

            <button
              onClick={onViewAllCompliance}
              className="text-xs text-[#3e6b2b] hover:text-[#2d551e] flex items-center gap-1 font-bold transition-colors cursor-pointer group hover:underline"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* Compliance List */}
          <div className="mt-4 divide-y divide-slate-100/90">
            {compliance.items.map((item) => {
              const isExpired = item.status.includes('Expired');
              const initials = item.caregiverName.split(' ').map((n: string) => n[0]).join('').slice(0, 2);
              return (
                <div
                  key={item.id}
                  onClick={() => onOpenComplianceDetail(item)}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/70 font-bold text-xs flex items-center justify-center shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 group-hover:text-[#3e6b2b] transition-colors truncate">
                        {item.caregiverName}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {item.credential}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-2xs ${isExpired
                      ? 'bg-rose-50 text-rose-700 border border-rose-200/80'
                      : 'bg-amber-50 text-amber-800 border border-amber-200/80'
                      }`}
                  >
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

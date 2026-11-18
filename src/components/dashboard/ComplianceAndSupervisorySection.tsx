'use client';

import React from 'react';
import { BranchData } from './dashboard-data';

interface ComplianceAndSupervisorySectionProps {
  branchData: BranchData;
  onViewAllCredentials: () => void;
  onViewAllSupervisory: () => void;
  onOpenCredentialDetail?: (item: any) => void;
}

export function ComplianceAndSupervisorySection({
  branchData,
  onViewAllCredentials,
  onViewAllSupervisory,
  onOpenCredentialDetail,
}: ComplianceAndSupervisorySectionProps) {
  const { compliance } = branchData;

  const credentialsList = [
    {
      id: 'cred-1',
      name: 'Rosa Vega',
      credential: 'CPR/First aid',
      status: 'Expired',
      badgeClass: 'bg-[#fff1f1] text-[#e04f32]',
    },
    {
      id: 'cred-2',
      name: 'David K.',
      credential: 'TB Test & Physical',
      status: '3d left',
      badgeClass: 'bg-[#fffbeb] text-[#b45309]',
    },
    {
      id: 'cred-3',
      name: 'Sarah J.',
      credential: 'HHA License',
      status: '12d left',
      badgeClass: 'bg-[#fffbeb] text-[#b45309]',
    },
  ];

  const supervisoryVisits = [
    {
      title: 'CNA (RN Quarterly)',
      done: 38,
      total: 52,
      percent: 73,
    },
    {
      title: 'HMA (RN Quarterly)',
      done: 21,
      total: 30,
      percent: 70,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 w-full">
      {/* 1. Credentials & licenses */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Credentials & licenses
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#fff1f1] text-[#e04f32]">
                8 expired
              </span>
            </div>

            <button
              type="button"
              onClick={onViewAllCredentials}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium transition-colors cursor-pointer group"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* List matching reference image */}
          <div className="mt-3 divide-y divide-slate-100/90">
            {credentialsList.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenCredentialDetail?.(item)}
                className="py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50/70 px-1 rounded-lg transition-colors cursor-pointer group"
              >
                <div>
                  <p className="text-xs sm:text-[13px] font-semibold text-slate-900 group-hover:text-[#3e6b2b] transition-colors">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {item.credential}
                  </p>
                </div>

                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-2xs ${item.badgeClass}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Supervisory visits (RN / non-RN) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Supervisory visits (RN / non-RN)
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b]">
                278/310 on track
              </span>
            </div>

            <button
              type="button"
              onClick={onViewAllSupervisory}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium transition-colors cursor-pointer group"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* Progress Bars matching reference image */}
          <div className="mt-4 space-y-3.5">
            {supervisoryVisits.map((item) => (
              <div key={item.title}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700">
                    {item.title}
                  </span>
                  <span className="font-semibold text-slate-900 text-xs">
                    {item.done} / {item.total} done ({item.percent}%)
                  </span>
                </div>

                {/* Dark Forest Green Progress Bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3e6b2b] rounded-full transition-all duration-300"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { BranchData } from './dashboard-data';
import { AlertTriangle, Download, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

interface BillingSectionCardsProps {
  branchData: BranchData;
  onViewAllBilling?: () => void;
  onSendFollowUp?: (record: any) => void;
  onExportPayroll?: () => void;
}

export function BillingSectionCards({
  branchData,
  onViewAllBilling,
  onSendFollowUp,
  onExportPayroll,
}: BillingSectionCardsProps) {
  const overdueAuths = [
    {
      id: 'auth-1',
      name: 'Marisol Vega',
      cm: 'Dana Whitfield',
      overdue: '14d overdue',
    },
    {
      id: 'auth-2',
      name: 'Harper Nguyen',
      cm: 'Dana Whitfield',
      overdue: '9d overdue',
    },
    {
      id: 'auth-3',
      name: 'Desmond Clarke',
      cm: 'Priya Shah',
      overdue: '7d overdue',
    },
  ];

  const denialLetters = [
    {
      id: 'CLM-7703',
      client: 'Aiden Park',
      amount: '$5,120',
      status: 'Requested Nov 10',
      badgeClass: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    },
    {
      id: 'CLM-7705',
      client: 'Josefina Ruiz',
      amount: '$3,780',
      status: 'Not requested',
      badgeClass: 'bg-rose-50 text-rose-700 border border-rose-200/80 font-bold',
    },
    {
      id: 'CLM-7699',
      client: 'Eli Brandt',
      amount: '$2,210',
      status: 'Received',
      badgeClass: 'bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80 font-bold',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
      {/* Card 1: Claims & Medicaid billing */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Claims &amp; Medicaid billing
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80">
                $184k billed
              </span>
            </div>

            <button
              type="button"
              onClick={onViewAllBilling}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors cursor-pointer group hover:underline"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* Three Key Metrics */}
          <div className="grid grid-cols-3 gap-3 my-5 text-center">
            <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                BILLED
              </span>
              <span className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                $184,320
              </span>
            </div>

            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                UNBILLED
              </span>
              <span className="text-lg sm:text-xl font-black text-amber-900 font-mono">
                $28,450
              </span>
            </div>

            <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                DENIED
              </span>
              <span className="text-lg sm:text-xl font-black text-rose-900 font-mono">
                $8,900
              </span>
            </div>
          </div>

          {/* AR Aging Stacked Bar */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-600 font-medium">AR Aging</span>
              <div className="flex items-center gap-3 text-[11px] font-bold">
                <span className="text-[#3e6b2b]">0–30d (78%)</span>
                <span className="text-amber-700">31–60d (14%)</span>
                <span className="text-rose-700">61d+ (8%)</span>
              </div>
            </div>

            <div className="w-full h-2.5 rounded-full bg-slate-100 flex overflow-hidden p-0.5 shadow-inner">
              <div className="h-full bg-[#3e6b2b] rounded-l-full" style={{ width: '78%' }} />
              <div className="h-full bg-[#F2B632]" style={{ width: '14%' }} />
              <div className="h-full bg-rose-500 rounded-r-full" style={{ width: '8%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Authorizations working without renewal */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Authorizations working without renewal
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80">
                6 overdue
              </span>
            </div>

            <button
              type="button"
              onClick={onViewAllBilling}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors cursor-pointer group hover:underline"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* Alert Banner */}
          <div className="mt-3.5 p-3 rounded-xl bg-rose-50/80 border border-rose-200/80 flex items-start gap-2.5 text-xs text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p className="font-semibold leading-snug">
              6 caregivers delivering care without state approval · $14,200 revenue at risk
            </p>
          </div>

          {/* Rows */}
          <div className="mt-3 divide-y divide-slate-100">
            {overdueAuths.map((auth) => (
              <div key={auth.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">
                    {auth.name} <span className="font-normal text-slate-400">• CM: {auth.cm}</span>
                  </p>
                  <p className="text-[11px] text-rose-600 font-bold mt-0.5">
                    {auth.overdue}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSendFollowUp?.(auth)}
                  className="px-3 py-1 bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white text-xs font-bold rounded-xl shadow-2xs hover:shadow transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
                >
                  Send follow-up
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 3: Medicaid commercial denial letters */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Medicaid commercial denial letters
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
                5 required
              </span>
            </div>

            <button
              type="button"
              onClick={onViewAllBilling}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors cursor-pointer group hover:underline"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-3 font-medium">
            Primary commercial denial letters required by Medicaid before billing:
          </p>

          {/* Denial Letters List */}
          <div className="mt-3 divide-y divide-slate-100">
            {denialLetters.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">
                    <span className="font-mono text-slate-600">{item.id}</span> · {item.client}{' '}
                    <span className="text-slate-500 font-mono">({item.amount})</span>
                  </p>
                </div>

                <span className={`text-[11px] px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-2xs ${item.badgeClass}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 4: Payroll readiness (ADP Export) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Payroll readiness (ADP Export)
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80">
                $246k ready
              </span>
            </div>

            <button
              type="button"
              onClick={onViewAllBilling}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors cursor-pointer group hover:underline"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* Payroll Groups */}
          <div className="mt-4 space-y-3">
            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  ADP Run (712 employees)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Pay period ending Nov 15
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-black text-slate-900 block">
                  $184,300
                </span>
                <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.2 rounded-full border border-amber-200/60 inline-block mt-0.5">
                  4 exceptions
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  ADP Workforce Now (190 1099s)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Pay period ending Nov 15
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-black text-slate-900 block">
                  $61,950
                </span>
                <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.2 rounded-full border border-amber-200/60 inline-block mt-0.5">
                  2 exceptions
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onExportPayroll}
            className="flex items-center gap-2 px-4 py-2 bg-[#3e6b2b] hover:bg-[#325622] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export ADP Batch File</span>
          </button>
        </div>
      </div>
    </div>
  );
}

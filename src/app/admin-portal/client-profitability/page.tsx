'use client';

import React from 'react';
import { usePortal } from '@/lib/store/portal-context';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
} from 'lucide-react';

export default function ClientProfitabilityPage() {
  const { notify } = usePortal();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Client Profitability &amp; Margin Intelligence
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200">
              $1.2M Annualized Run Rate
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Gross margins, caregiver overtime leakage, cost-per-hour, and payer reimbursement optimization
          </p>
        </div>

        <button
          onClick={() => notify('Export Financials', 'Generating client gross margin CSV ledger.', 'info')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white text-xs font-bold shadow-[0_3px_12px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_18px_rgba(255,107,74,0.4)] transition-all cursor-pointer self-start sm:self-auto active:scale-[0.98]"
        >
          <DollarSign className="w-4 h-4" />
          <span>Export Financial Ledger</span>
        </button>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Total Revenue</p>
          <p className="text-2xl font-black text-slate-900 mt-1">$1.2M</p>
          <span className="text-[10px] text-emerald-600 font-semibold">+4.4% vs last month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Gross Care Margin</p>
          <p className="text-2xl font-black text-[#3e6b2b] mt-1">34.2%</p>
          <span className="text-[10px] text-slate-400">Target: 32.0%</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Overtime Cost Leakage</p>
          <p className="text-2xl font-black text-[#ff6900] mt-1">$543.75</p>
          <span className="text-[10px] text-slate-400">14.5 OT hours this cycle</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Unbilled At Risk</p>
          <p className="text-2xl font-black text-slate-900 mt-1">$4,200</p>
          <span className="text-[10px] text-rose-600 font-semibold">23 shifts missing clock-out</span>
        </div>
      </div>

      {/* Payer Mix & Overtime Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Payer Mix */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Revenue by Payer Source</h3>
              <p className="text-xs text-slate-500">Distribution across state and commercial contracts</p>
            </div>
            <span className="text-xs font-bold text-[#3e6b2b]">$1.2M Total</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Health First Colorado Medicaid (IHSS &amp; HMA)</span>
                <span className="text-slate-900 font-bold">65% ($780k)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#3e6b2b] h-full rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Colorado Community Waivers (HCBS / CES)</span>
                <span className="text-slate-900 font-bold">20% ($240k)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#00d084] h-full rounded-full" style={{ width: '20%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Private Pay &amp; Family Co-Pay</span>
                <span className="text-slate-900 font-bold">10% ($120k)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#F2B632] h-full rounded-full" style={{ width: '10%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Commercial Insurance Supplemental</span>
                <span className="text-slate-900 font-bold">5% ($60k)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-sky-400 h-full rounded-full" style={{ width: '5%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Caregiver Overtime Control */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Caregiver Overtime Guardrails</h3>
              <p className="text-xs text-slate-500">Preventing unapproved FLSA overtime penalties</p>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b]">
              98% Under 40 hrs
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/70 text-xs space-y-1">
            <p className="font-bold text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>5 Staff Members Approaching 40 Hours Threshold</span>
            </p>
            <p className="text-slate-600 leading-relaxed">
              Automated scheduler re-routes pending shift coverages to avoid $543.75+ in non-reimbursable premium overtime.
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <p className="font-bold text-slate-900">Jessica Miller (CNA)</p>
                <p className="text-[11px] text-slate-400">Denver Metro • 46.5 total hours</p>
              </div>
              <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                +6.5 hrs OT ($243.75)
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <p className="font-bold text-slate-900">Thomas Wright (Attendant)</p>
                <p className="text-[11px] text-slate-400">Douglas County • 41.0 total hours</p>
              </div>
              <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                +1.0 hr OT ($37.50)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

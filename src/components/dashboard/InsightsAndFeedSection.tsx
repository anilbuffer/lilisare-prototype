'use client';

import React from 'react';
import { BranchData, LiveFeedItem } from './dashboard-data';
import { ArrowRight, Sparkles, User, ShieldCheck, AlertTriangle, DollarSign, Clock, Users } from 'lucide-react';

interface InsightsAndFeedSectionProps {
  branchData: BranchData;
  onOpenLiveFeed?: () => void;
  onTriggerInsight?: (category: string) => void;
  onSelectVisit?: (visit: LiveFeedItem) => void;
}

export function InsightsAndFeedSection({
  branchData,
  onOpenLiveFeed,
  onTriggerInsight,
  onSelectVisit,
}: InsightsAndFeedSectionProps) {
  const { atAGlance, liveVisitFeed } = branchData;

  const getStatusBadge = (variant: string, status: string) => {
    switch (variant) {
      case 'verified':
        return (
          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold text-[10px]">
            {status}
          </span>
        );
      case 'info':
        return (
          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/80 font-bold text-[10px]">
            {status}
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-bold text-[10px]">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Left 60%: At a glance + All Insights */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        {/* At a glance Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
            At a glance
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Retention */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path
                    className="text-slate-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#3e6b2b]"
                    strokeDasharray={`${atAGlance?.retention?.rate ?? 87}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[10px] font-black text-slate-900 font-mono">
                  {atAGlance?.retention?.rate ?? 87}%
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                  Caregiver
                </span>
                <span className="text-xs font-bold text-slate-800 block">
                  {atAGlance?.retention?.rate ?? 87}%
                </span>
                <span className="text-[10px] text-slate-400 block font-medium">
                  Target {atAGlance?.retention?.target ?? 85}%
                </span>
              </div>
            </div>

            {/* Compliance Alerts */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                Compliance alerts
              </span>
              <span className="text-sm font-black text-slate-900 font-mono mt-0.5 block">
                {atAGlance?.complianceAlerts?.total ?? 7} total
              </span>
              <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">
                {atAGlance?.complianceAlerts?.requireReview ?? 2} require review
              </span>
            </div>

            {/* Avg Completion */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                Avg completion
              </span>
              <span className="text-sm font-black text-slate-900 font-mono mt-0.5 block">
                {atAGlance?.avgCompletion?.rate ?? 98.2}%
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                {atAGlance?.avgCompletion?.change ?? '+1.2%'}
              </span>
            </div>

            {/* Unbilled Visits */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                Unbilled visits
              </span>
              <span className="text-sm font-black text-slate-900 font-mono mt-0.5 block">
                {atAGlance?.unbilledVisits?.count ?? 23}
              </span>
              <span className="text-[10px] text-rose-600 font-semibold block mt-0.5">
                {atAGlance?.unbilledVisits?.atRiskAmount ?? '$4,200'} at risk
              </span>
            </div>
          </div>
        </div>

        {/* All Insights Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] flex-1">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100/80 mb-3">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              All Insights
            </h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#F2B632]" />
              Sidekick
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Staffing Insight */}
            <div
              onClick={() => onTriggerInsight?.('staffing')}
              className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/60 transition-all cursor-pointer flex items-start gap-3 text-xs group"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#3e6b2b] border border-emerald-200/60 flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
                  Staffing
                </span>
                <p className="text-slate-700 mt-0.5 leading-snug">
                  3 caregivers needed in Douglas County by Thursday. Predicted demand from 4 new intakes.
                </p>
              </div>
            </div>

            {/* Compliance Insight */}
            <div
              onClick={() => onTriggerInsight?.('compliance')}
              className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/60 transition-all cursor-pointer flex items-start gap-3 text-xs group"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider block">
                  Compliance
                </span>
                <p className="text-slate-700 mt-0.5 leading-snug">
                  2 CPR certifications expiring within 14 days. Automated reminders queued.
                </p>
              </div>
            </div>

            {/* Risk Insight */}
            <div
              onClick={() => onTriggerInsight?.('risk')}
              className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/60 transition-all cursor-pointer flex items-start gap-3 text-xs group"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                  Risk
                </span>
                <p className="text-slate-700 mt-0.5 leading-snug">
                  Patient Robert Alvarez fall risk increased — recommend care plan review.{' '}
                  <span className="text-amber-800 font-semibold underline decoration-amber-300">
                    Authorization expires in 5 days
                  </span>{' '}
                  — renewal request not yet submitted.
                </p>
              </div>
            </div>

            {/* Financial Insight */}
            <div
              onClick={() => onTriggerInsight?.('revenue')}
              className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/60 transition-all cursor-pointer flex items-start gap-3 text-xs group"
            >
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 border border-purple-200/60 flex items-center justify-center shrink-0 mt-0.5">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-purple-800 tracking-wider block">
                  Financial
                </span>
                <p className="text-slate-700 mt-0.5 leading-snug">
                  3 Medicaid claims denied this week — authorization code mismatch. Review before timely filing deadline (12 days).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right 40%: Live visit feed */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100/80">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Live visit feed
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time shift clock-in &amp; completion stream
            </p>
          </div>
          <button
            onClick={onOpenLiveFeed}
            className="text-xs font-semibold text-[#3e6b2b] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View all</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="py-2 space-y-2 flex-1 flex flex-col justify-around">
          {liveVisitFeed?.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectVisit?.(item)}
              className="p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-100 transition-all cursor-pointer flex items-center justify-between text-xs group"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="text-[10px] text-slate-400 font-mono font-medium shrink-0 w-14">
                  {item.time}
                </span>
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center font-mono text-[10px] shrink-0">
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 group-hover:text-[#3e6b2b] transition-colors truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.address}</p>
                </div>
              </div>
              <div className="shrink-0">
                {getStatusBadge(item.variant, item.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

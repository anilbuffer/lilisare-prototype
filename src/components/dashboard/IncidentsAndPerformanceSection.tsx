'use client';

import React from 'react';
import { BranchData, IncidentItem, TopCaregiverItem, TrainingExpiryItem } from './dashboard-data';
import { ArrowRight, Star, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

interface IncidentsAndPerformanceSectionProps {
  branchData: BranchData;
  onViewAllIncidents?: () => void;
  onViewFullRanking?: () => void;
  onManageTraining?: () => void;
  onSelectIncident?: (incident: IncidentItem) => void;
}

export function IncidentsAndPerformanceSection({
  branchData,
  onViewAllIncidents,
  onViewFullRanking,
  onManageTraining,
  onSelectIncident,
}: IncidentsAndPerformanceSectionProps) {
  const { recentIncidents, topCaregivers, trainingExpiry } = branchData;

  const getIncidentBadge = (variant: string, status: string) => {
    switch (variant) {
      case 'critical':
        return (
          <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200/80 font-bold text-[10px]">
            {status}
          </span>
        );
      case 'warning':
        return (
          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80 font-bold text-[10px]">
            {status}
          </span>
        );
      case 'verified':
      default:
        return (
          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold text-[10px]">
            {status}
          </span>
        );
    }
  };

  const getExpiryBadge = (variant: string, daysLeft: string) => {
    switch (variant) {
      case 'critical':
        return (
          <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 border border-rose-200 font-bold text-[10px] font-mono">
            {daysLeft}
          </span>
        );
      case 'warning':
        return (
          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200 font-bold text-[10px] font-mono">
            {daysLeft}
          </span>
        );
      case 'verified':
      default:
        return (
          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-[10px] font-mono">
            {daysLeft}
          </span>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 sm:gap-4">
      {/* Col 1: Recent Incidents */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100/90">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Recent Incidents
          </h3>
          <button
            onClick={onViewAllIncidents}
            className="text-xs font-semibold text-[#3e6b2b] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View all</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="py-2 space-y-1.5">
          {recentIncidents?.map((inc) => (
            <div
              key={inc.id}
              onClick={() => onSelectIncident?.(inc)}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60 transition-all cursor-pointer flex items-center justify-between text-xs group"
            >
              <div className="min-w-0 pr-2">
                <p className="font-bold text-slate-900 group-hover:text-[#3e6b2b] transition-colors truncate text-xs">
                  {inc.title}
                </p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {inc.caregiver} · Patient: {inc.patient}
                </p>
              </div>
              <div className="shrink-0">
                {getIncidentBadge(inc.variant, inc.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Col 2: Top performing caregivers */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100/90">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Top performing caregivers
          </h3>
          <button
            onClick={onViewFullRanking}
            className="text-xs font-semibold text-[#3e6b2b] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Full ranking</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="py-2 space-y-2">
          {topCaregivers?.map((cg) => (
            <div key={cg.name} className="flex items-center gap-2.5 text-xs">
              <span className="w-4 font-mono font-bold text-slate-400 text-center shrink-0 text-[11px]">
                {cg.rank}
              </span>
              <div className="w-24 shrink-0 truncate">
                <span className="font-bold text-slate-900 text-xs">{cg.name}</span>
                <span className="text-[10px] text-slate-400 font-semibold ml-1">{cg.role}</span>
              </div>
              <div className="flex items-center gap-0.5 text-[#F2B632] shrink-0 text-[11px] font-bold">
                <Star className="w-3 h-3 fill-[#F2B632]" />
                <span className="text-slate-700">{cg.rating}</span>
              </div>
              <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#008060] h-full rounded-full transition-all duration-500"
                  style={{ width: `${cg.score}%` }}
                />
              </div>
              <span className="font-mono font-bold text-slate-800 text-right w-6 shrink-0 text-xs">
                {cg.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Col 3: Training Expiry */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100/90">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Training Expiry
          </h3>
          <button
            onClick={onManageTraining}
            className="text-xs font-semibold text-[#3e6b2b] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Manage</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="py-2 space-y-1.5">
          {trainingExpiry?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-1.5 sm:p-2 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors text-xs"
            >
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center font-mono text-[10px] shrink-0">
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate text-xs">{item.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{item.cert}</p>
                </div>
              </div>
              <div className="shrink-0">
                {getExpiryBadge(item.variant, item.daysLeft)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

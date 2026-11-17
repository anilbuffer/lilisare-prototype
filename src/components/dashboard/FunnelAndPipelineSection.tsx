'use client';

import React from 'react';
import { BranchData } from './dashboard-data';
import { Clock, TrendingUp } from 'lucide-react';

interface FunnelAndPipelineSectionProps {
  branchData: BranchData;
  onViewAllFunnel: () => void;
  onViewAllPipeline: () => void;
  onOpenStageDetails: (type: 'funnel' | 'pipeline', stageName: string) => void;
}

export function FunnelAndPipelineSection({
  branchData,
  onViewAllFunnel,
  onViewAllPipeline,
  onOpenStageDetails,
}: FunnelAndPipelineSectionProps) {
  const { funnel, pipeline } = branchData;
  const maxFunnelCount = 142;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
      {/* 8.1 Caregiver Onboarding Funnel */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                  Onboarding Funnel
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80">
                  Caregivers
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Avg <strong className="text-slate-800">{funnel.avgDaysToActivate} days</strong> to activate (target: {funnel.targetDays})
                </span>
              </p>
            </div>

            <button
              onClick={onViewAllFunnel}
              className="text-xs text-slate-400 hover:text-slate-800 flex items-center gap-1 font-semibold transition-colors cursor-pointer group"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* 5 Stages with Gradient Progress Bars */}
          <div className="mt-5 space-y-3.5">
            {funnel.stages.map((stage) => {
              const widthPct = Math.max(12, Math.round((stage.count / maxFunnelCount) * 100));
              return (
                <div
                  key={stage.name}
                  onClick={() => onOpenStageDetails('funnel', stage.name)}
                  className="group cursor-pointer p-1 -mx-1 rounded-lg hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-800 group-hover:text-[#3e6b2b] transition-colors">
                      {stage.name}
                    </span>
                    <span className="font-bold text-slate-900 font-mono text-[11px]">
                      {stage.count} caregivers
                    </span>
                  </div>

                  {/* Gradient Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-[#2b501a] via-[#3e6b2b] to-[#4a802f] rounded-full transition-all duration-300 group-hover:brightness-110 shadow-xs"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 8.2 Client Intake Pipeline */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                  Intake pipeline
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80">
                  Clients
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  <strong className="text-slate-800">{pipeline.activeInquiries} active inquiries</strong> • {pipeline.converted} converted ({pipeline.conversionRate}% conversion rate)
                </span>
              </p>
            </div>

            <button
              onClick={onViewAllPipeline}
              className="text-xs text-slate-400 hover:text-slate-800 flex items-center gap-1 font-semibold transition-colors cursor-pointer group"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* Multi-Segment Color Stacked Bar */}
          <div className="mt-5 mb-4">
            <div className="w-full h-3 rounded-full overflow-hidden flex gap-0.5 bg-slate-100 p-0.5 shadow-inner">
              <div className="h-full bg-[#10b981] rounded-l-full transition-all hover:opacity-90" style={{ width: '30%' }} title="New lead: 24" />
              <div className="h-full bg-[#0284c7] transition-all hover:opacity-90" style={{ width: '23%' }} title="Contacted: 18" />
              <div className="h-full bg-[#f59e0b] transition-all hover:opacity-90" style={{ width: '15%' }} title="In assessment: 12" />
              <div className="h-full bg-[#8b5cf6] transition-all hover:opacity-90" style={{ width: '12%' }} title="CM coordination: 9" />
              <div className="h-full bg-[#3e6b2b] rounded-r-full transition-all hover:opacity-90" style={{ width: '20%' }} title="Converted: 16" />
            </div>
          </div>

          {/* Metric Tiles Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div
              onClick={() => onOpenStageDetails('pipeline', 'New Lead')}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-2xs transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span className="group-hover:text-slate-900 transition-colors">New lead</span>
              </div>
              <div className="text-xl font-black text-slate-900 mt-1 font-mono">24</div>
            </div>

            <div
              onClick={() => onOpenStageDetails('pipeline', 'Contacted')}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-2xs transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                <span className="group-hover:text-slate-900 transition-colors">Contacted</span>
              </div>
              <div className="text-xl font-black text-slate-900 mt-1 font-mono">18</div>
            </div>

            <div
              onClick={() => onOpenStageDetails('pipeline', 'In Assessment')}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-2xs transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                <span className="group-hover:text-slate-900 transition-colors">In assessment</span>
              </div>
              <div className="text-xl font-black text-slate-900 mt-1 font-mono">12</div>
            </div>

            <div
              onClick={() => onOpenStageDetails('pipeline', 'CM Coordination')}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-2xs transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                <span className="group-hover:text-slate-900 transition-colors">CM coordination</span>
              </div>
              <div className="text-xl font-black text-slate-900 mt-1 font-mono">9</div>
            </div>

            <div
              onClick={() => onOpenStageDetails('pipeline', 'Converted')}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-2xs transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#3e6b2b]" />
                <span className="group-hover:text-slate-900 transition-colors">Converted</span>
              </div>
              <div className="text-xl font-black text-slate-900 mt-1 font-mono">16</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

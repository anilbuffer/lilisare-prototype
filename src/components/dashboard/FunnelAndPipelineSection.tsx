'use client';

import React from 'react';
import { BranchData } from './dashboard-data';

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 w-full">
      {/* 1. Caregiver Onboarding Funnel */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Onboarding funnel
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Avg {funnel.avgDaysToActivate} days to activate (target: {funnel.targetDays})
              </p>
            </div>

            <button
              type="button"
              onClick={onViewAllFunnel}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium transition-colors cursor-pointer group shrink-0"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* 5 Stages with Forest Green Progress Bars */}
          <div className="mt-4 space-y-3">
            {funnel.stages.map((stage) => {
              const widthPct = Math.max(12, Math.round((stage.count / maxFunnelCount) * 100));
              return (
                <div
                  key={stage.name}
                  onClick={() => onOpenStageDetails('funnel', stage.name)}
                  className="group cursor-pointer p-0.5 rounded-lg hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700 group-hover:text-[#3e6b2b] transition-colors">
                      {stage.name}
                    </span>
                    <span className="font-semibold text-slate-900 font-sans text-xs">
                      {stage.count} caregivers
                    </span>
                  </div>

                  {/* Clean Dark Forest Green Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#3e6b2b] rounded-full transition-all duration-300"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Client Intake Pipeline */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight">
                Client intake pipeline
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {pipeline.activeInquiries} active inquiries · {pipeline.converted} converted ({pipeline.conversionRate}% conversion rate)
              </p>
            </div>

            <button
              type="button"
              onClick={onViewAllPipeline}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium transition-colors cursor-pointer group shrink-0"
            >
              <span>View all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </button>
          </div>

          {/* Multi-Segment Color Stacked Bar */}
          <div className="mt-4 mb-3.5">
            <div className="w-full h-2.5 rounded-full overflow-hidden flex gap-0.5 bg-slate-100 shadow-inner">
              <div className="h-full bg-[#00d084] rounded-l-full transition-all" style={{ width: '30%' }} title="New lead: 24" />
              <div className="h-full bg-[#38bdf8] transition-all" style={{ width: '23%' }} title="Contacted: 18" />
              <div className="h-full bg-[#F2B632] transition-all" style={{ width: '15%' }} title="In assessment: 12" />
              <div className="h-full bg-[#a855f7] transition-all" style={{ width: '12%' }} title="CM coordination: 9" />
              <div className="h-full bg-[#3e6b2b] rounded-r-full transition-all" style={{ width: '20%' }} title="Converted: 16" />
            </div>
          </div>

          {/* Metric Tiles Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div
              onClick={() => onOpenStageDetails('pipeline', 'New Lead')}
              className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:border-slate-200 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#00d084]" />
                <span className="group-hover:text-slate-900 transition-colors">New lead</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 mt-1 font-sans">24</div>
            </div>

            <div
              onClick={() => onOpenStageDetails('pipeline', 'Contacted')}
              className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:border-slate-200 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                <span className="group-hover:text-slate-900 transition-colors">Contacted</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 mt-1 font-sans">18</div>
            </div>

            <div
              onClick={() => onOpenStageDetails('pipeline', 'In Assessment')}
              className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:border-slate-200 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#F2B632]" />
                <span className="group-hover:text-slate-900 transition-colors">In assessment</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 mt-1 font-sans">12</div>
            </div>

            <div
              onClick={() => onOpenStageDetails('pipeline', 'CM Coordination')}
              className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:border-slate-200 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#a855f7]" />
                <span className="group-hover:text-slate-900 transition-colors">CM coordination</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 mt-1 font-sans">9</div>
            </div>

            <div
              onClick={() => onOpenStageDetails('pipeline', 'Converted')}
              className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:border-slate-200 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#3e6b2b]" />
                <span className="group-hover:text-slate-900 transition-colors">Converted</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 mt-1 font-sans">16</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import {
  Sparkles,
  X,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Send,
  Building2,
  FileClock,
  HelpCircle,
  Copy,
  Printer,
} from 'lucide-react';
import { BranchData } from './dashboard-data';

interface AIBriefingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  branchData: BranchData;
  onTriggerAction: (actionType: string) => void;
}

export function AIBriefingDrawer({
  isOpen,
  onClose,
  branchData,
  onTriggerAction,
}: AIBriefingDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-in slide-in-from-right duration-200">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50/50 to-white">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-[#3e6b2b] to-[#658c51] text-white shadow-xs">
                <Sparkles className="w-4 h-4 text-[#F2B632]" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  Executive AI Briefing
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3e6b2b]/10 text-[#3e6b2b]">
                    Demo Synthesizer
                  </span>
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {branchData.name} • Tuesday, Nov 17, 2026
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Disclaimer Banner */}
            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Deterministic Prototype Briefing:</span> Generated from internal operational queues to assist agency leadership during morning stand-ups. Not connected to third-party public AI models.
              </div>
            </div>

            {/* 1. Priority Summary */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  1. Operational Priority Summary
                </h4>
                <span className="text-[10px] font-mono font-bold text-[#ff6900] bg-orange-50 px-2 py-0.5 rounded-full">
                  5 Key Hotspots
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2.5 text-xs text-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#fcb900] shrink-0" />
                  <span>
                    <strong className="text-slate-900 font-mono">23</strong> authorizations are pending state review.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff6900] shrink-0" />
                  <span>
                    <strong className="text-[#ff6900] font-mono">4</strong> authorization requests are overdue beyond the 10-day state SLA.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff6900] shrink-0" />
                  <span>
                    <strong className="text-[#ff6900] font-mono">8</strong> caregiver credentials have expired and require immediate suspension or renewal.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#fcb900] shrink-0" />
                  <span>
                    <strong className="text-slate-900 font-mono">14</strong> EVV visits require attention due to missing clock-outs or GPS geofence variances.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff6900] shrink-0" />
                  <span>
                    <strong className="text-[#ff6900] font-mono">11</strong> households have been delayed in onboarding for more than five days.
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Main Operational Risks */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                2. Main Operational Risks
              </h4>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50">
                  <div className="flex items-center gap-2 text-rose-900 font-bold text-xs mb-1">
                    <ShieldAlert className="w-4 h-4 text-rose-700" />
                    <span>Risk A: Caregiver Payment Disallowance</span>
                  </div>
                  <p className="text-[11px] text-rose-800 leading-relaxed">
                    6 active caregivers are logging shifts without signed Prior Authorization renewals. Medicaid billing will reject claims without valid Bridge PAR records.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1">
                    <Clock className="w-4 h-4 text-amber-700" />
                    <span>Risk B: Colorado CBI Background Check Backlog</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    3 background screenings returned alerts that need internal agency coordinator adjudication before orientation can be scheduled.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs mb-1">
                    <AlertTriangle className="w-4 h-4 text-slate-600" />
                    <span>Risk C: Intake Cycle Time Degradation</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Average activation timeline has risen to 14 days against target of 11 days, primarily caused by delayed physician attestation forms.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Suggested Next Actions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                3. Suggested Next Actions
              </h4>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onTriggerAction('draft-cm-batch');
                  }}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-[#3e6b2b] hover:bg-emerald-50/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-[#3e6b2b]">
                      Dispatch Case Manager Follow-up Batch
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Generate standardized PAR renewal reminders for Dana Whitfield &amp; Priya Shah.
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#3e6b2b] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onTriggerAction('dispatch-credential-sms');
                  }}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-[#3e6b2b] hover:bg-emerald-50/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-[#3e6b2b]">
                      Send Automated Credential Expiry SMS Wave
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Queue 30-day and 14-day renewal links to Rosa Vega, Luis Ruiz &amp; Grace Park.
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#3e6b2b] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onTriggerAction('review-evv-shifts');
                  }}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-[#3e6b2b] hover:bg-emerald-50/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-[#3e6b2b]">
                      Reconcile 14 At-Risk EVV Shifts
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Batch-review self-corrections and authorize medical transport exemptions.
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#3e6b2b] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Generated at 08:30 AM MST • Colorado Operations
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Close Briefing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

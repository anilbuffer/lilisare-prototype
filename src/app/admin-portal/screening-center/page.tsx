'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  FileText,
  UserCheck,
  Check,
  X,
} from 'lucide-react';

export default function ScreeningCenterPage() {
  const { notify } = usePortal();
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const flaggedCases = [
    {
      id: 'scr-1',
      candidate: 'Luis Ruiz',
      role: 'Family Caregiver Applicant',
      flagType: 'Driving Record / Motor Vehicle Verification',
      details: 'Expired Colorado driver license noted on MVR report. Requires renewed license upload for non-emergent medical transport authorization.',
      date: 'Nov 16, 2026',
      status: 'Action required',
    },
    {
      id: 'scr-2',
      candidate: 'Darren Vance',
      role: 'CNA Candidate',
      flagType: 'CAPS Registry Discrepancy Check',
      details: 'Name variant found in preliminary database match. Secondary SSN verification required with Colorado Dept of Early Childhood / Adult Protection.',
      date: 'Nov 15, 2026',
      status: 'Action required',
    },
    {
      id: 'scr-3',
      candidate: 'Tanya Peterson',
      role: 'Respite Caregiver',
      flagType: '10-Panel Drug Screen Chain of Custody',
      details: 'Lab results pending MRO (Medical Review Officer) sign-off due to legitimate prescribed maintenance medication verification.',
      date: 'Nov 14, 2026',
      status: 'Action required',
    },
  ];

  const handleClearFlag = (id: string, candidate: string) => {
    setResolvedIds((prev) => [...prev, id]);
    notify('Screening Cleared', `Flag for candidate ${candidate} resolved and file approved for credentialing.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Screening Center &amp; Background Clearances
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
              3 Flags for Review
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Colorado Bureau of Investigation (CBI), CAPS Adult Protection, OIG Federal Exclusions &amp; Fingerprint Tracking
          </p>
        </div>

        <button
          onClick={() => notify('Initiate Screen', 'Opened CBI biometric fingerprint scheduling form.', 'info')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white text-xs font-bold shadow-[0_3px_12px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_18px_rgba(255,107,74,0.4)] transition-all cursor-pointer self-start sm:self-auto active:scale-[0.98]"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>New Background Check</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Screened YTD</p>
          <p className="text-2xl font-black text-slate-900 mt-1">1,044</p>
          <span className="text-[10px] text-emerald-600 font-semibold">100% compliant</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">CBI Fingerprint Clear</p>
          <p className="text-2xl font-black text-[#3e6b2b] mt-1">98.8%</p>
          <span className="text-[10px] text-slate-400">Direct IdentoGO integration</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Flags Requiring Review</p>
          <p className="text-2xl font-black text-[#ff6900] mt-1">3</p>
          <span className="text-[10px] text-rose-600 font-semibold">Immediate action needed</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">OIG / SAM Exclusions</p>
          <p className="text-2xl font-black text-slate-900 mt-1">0 Hits</p>
          <span className="text-[10px] text-emerald-600 font-semibold">Continuous monthly scrub</span>
        </div>
      </div>

      {/* Flagged Cases Alert Queue */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#ff6900]" />
              <span>Flagged Screening Exceptions for Administrative Review</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Candidates cannot be authorized for payroll or shifts until cleared</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">3 Pending</span>
        </div>

        <div className="space-y-3">
          {flaggedCases.map((c) => {
            const isResolved = resolvedIds.includes(c.id);
            return (
              <div
                key={c.id}
                className={`p-4 rounded-xl border transition-all space-y-2.5 ${isResolved
                  ? 'border-emerald-200 bg-emerald-50/20 opacity-70'
                  : 'border-amber-200/80 bg-amber-50/30'
                  }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-slate-900">{c.candidate}</span>
                    <span className="text-xs text-slate-500">• {c.role}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isResolved
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}
                  >
                    {isResolved ? 'Resolved & Cleared' : c.status}
                  </span>
                </div>

                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{c.flagType}</span>
                  </p>
                  <p className="text-slate-600 leading-relaxed pl-5">{c.details}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px]">
                  <span className="text-slate-400">Report Date: {c.date}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => notify('Audit Binder', `Viewing full background check packet for ${c.candidate}.`, 'info')}
                      className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      View Report
                    </button>
                    <button
                      onClick={() => handleClearFlag(c.id, c.candidate)}
                      disabled={isResolved}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${isResolved
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-[#3e6b2b] hover:bg-[#345c24] text-white'
                        }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{isResolved ? 'Cleared' : 'Approve File'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

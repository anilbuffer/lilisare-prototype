'use client';

import React from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { ShieldCheck, AlertTriangle, Archive, FileText, CheckCircle2, Clock, Bell, Sparkles } from 'lucide-react';

export function CompliancePortal() {
  const { notify } = usePortal();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-primary-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            State Audit Readiness & Credential Lifecycles
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Compliance & State QA Dashboard
          </h1>
          <p className="text-amber-100 text-xs sm:text-sm mt-1 leading-relaxed">
            Automating recurring CPR, CBI background re-checks, and nurse supervisory audit compliance. Tracking historical data migration for 7–10 year Colorado state audit preservation.
          </p>
        </div>
      </div>

      {/* Expirations & Audit Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Credential Expiration Monitor */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                Active Credential Expirations & Renewals
              </h3>
              <p className="text-xs text-slate-500">Automated 30-day proactive notices</p>
            </div>
            <button
              onClick={() => notify('Automated Reminders Dispatched', 'Automated SMS and email reminders sent to 3 caregivers.', 'success')}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1.5"
            >
              <Bell className="w-3.5 h-3.5 text-amber-700" />
              Send Expiry Reminders
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">Hannah Miller, CNA</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                    Expires in 28 Days
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Credential: <strong>AHA BLS / CPR Certification</strong> (Exp: 2027-04-15)
                </p>
              </div>
              <button
                onClick={() => notify('Reminder Sent', 'Sent CPR renewal link to Hannah Miller.', 'info')}
                className="text-xs text-primary font-bold hover:underline"
              >
                Notify Caregiver
              </button>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">David Geller, Attendant</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                    Expires in 6 Days
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Credential: <strong>Annual TB Symptom Screening Attestation</strong>
                </p>
              </div>
              <button
                onClick={() => notify('Urgent Alert Sent', 'Dispatched urgent TB form link to David Geller.', 'warning')}
                className="text-xs text-rose-600 font-bold hover:underline"
              >
                Send Urgent Alert
              </button>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">Elena Morales</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Fully Compliant
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Credential: <strong>CBI Fingerprints & OIG Screening Verified</strong>
                </p>
              </div>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Good Standing
              </span>
            </div>
          </div>
        </div>

        {/* Right: Legacy Systems 7-10 Year Audit Migration Tracker */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Archive className="w-4 h-4 text-primary" />
                Legacy Systems Audit Migration
              </h3>
              <p className="text-xs text-slate-500">7–10 Year State Audit Data Vault</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              Release 3 Scope
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Consolidating historical records from legacy vendors into encrypted HIPAA-compliant AWS storage to eliminate high recurring vendor license fees while satisfying state audit requirements:
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">AxisCare Migration</span>
                <span className="text-emerald-700 font-bold">Schema Mapped (85%)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Caregiver profiles, EVV visits, historical clock-ins</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">KanTime EHR (Colorado Home Health)</span>
                <span className="text-amber-700 font-bold">Export Format Pending</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Nursing assessments, Form 485s, clinical notes</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Frisco Database (35–45 Clients)</span>
                <span className="text-emerald-700 font-bold">Export Ready</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Historical authorizations and service logs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

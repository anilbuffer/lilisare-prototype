'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import {
  Archive,
  Database,
  CheckCircle2,
  AlertTriangle,
  Server,
  Lock,
  ArrowRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

export function HistoricalDataMigrationView() {
  const { notify } = usePortal();
  const [retentionYears, setRetentionYears] = useState<'7 Years' | '10 Years'>('7 Years');

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-primary-950 to-primary-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-200 mb-2">
              <Archive className="w-3.5 h-3.5 text-secondary" />
              Historical Records Consolidation & Vendor Sunset
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              7-Year State Audit Archive Vault
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Consolidating and migrating 7 years of records from AxisCare, KanTime, and Frisco into encrypted, HIPAA-compliant AWS storage. Eliminates ongoing legacy SaaS licenses while safeguarding state audit compliance.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 text-center shrink-0">
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
              Statutory Retention Standard
            </span>
            <p className="text-2xl font-black text-secondary mt-0.5">7 Years</p>
            <span className="text-[11px] text-emerald-300 font-medium">CDPHE & Medicaid Compliant</span>
          </div>
        </div>
      </div>

      {/* Legacy Vendor Migration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* AxisCare */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-slate-900">AxisCare EHR</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Export Ready
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Contains caregiver profiles, EVV GPS clock-in logs, and historical payroll summaries.
          </p>
          <div className="space-y-1.5 text-xs text-slate-500 pt-1">
            <div className="flex justify-between">
              <span>Records Mapped:</span>
              <strong className="text-slate-800">142,850 visits</strong>
            </div>
            <div className="flex justify-between">
              <span>Deduplication:</span>
              <strong className="text-emerald-700">100% Unique</strong>
            </div>
          </div>
          <button
            onClick={() => notify('AxisCare Dry-Run Verified', 'Reconciled 142,850 records with zero critical schema errors.', 'success')}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
          >
            Run Dry-Run Verification
          </button>
        </div>

        {/* KanTime */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">KanTime EHR</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Schema Mapping
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Colorado Home Health nursing notes, Form 485 plans of care, and OASIS assessments.
          </p>
          <div className="space-y-1.5 text-xs text-slate-500 pt-1">
            <div className="flex justify-between">
              <span>Clinical Forms:</span>
              <strong className="text-slate-800">38,120 notes</strong>
            </div>
            <div className="flex justify-between">
              <span>PDF Attachments:</span>
              <strong className="text-amber-700">In Progress</strong>
            </div>
          </div>
          <button
            onClick={() => notify('KanTime Ingestion Test', 'PDF attachment extractor running on sample batch.', 'info')}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
          >
            Test Attachment Parser
          </button>
        </div>

        {/* Frisco */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900">Frisco Database</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Validated
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Historical operations and client service records for 35–45 specialized rural clients.
          </p>
          <div className="space-y-1.5 text-xs text-slate-500 pt-1">
            <div className="flex justify-between">
              <span>Target Clients:</span>
              <strong className="text-slate-800">42 clients</strong>
            </div>
            <div className="flex justify-between">
              <span>Historical Span:</span>
              <strong className="text-slate-800">7 Years (2019–2026)</strong>
            </div>
          </div>
          <button
            onClick={() => notify('Frisco Archive Ready', 'All 42 client historical logs archived in S3 Glacier Vault.', 'success')}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
          >
            View Archive Hashes
          </button>
        </div>
      </div>

      {/* Target Cloud Architecture & Security */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" />
          Target AWS HIPAA-Eligible Storage Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="font-bold text-slate-800 block mb-1">KMS Encryption at Rest</span>
            <p className="text-slate-600 leading-relaxed">
              AES-256 multi-region customer-managed KMS key. Meets all federal HIPAA Security Rule specifications.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="font-bold text-slate-800 block mb-1">State Audit Query Engine</span>
            <p className="text-slate-600 leading-relaxed">
              Zero-latency searchable SQL query interface allows state auditors instant read-only access to historical visits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="font-bold text-slate-800 block mb-1">Vendor Cost Savings</span>
            <p className="text-slate-600 leading-relaxed">
              Retiring the 3 legacy vendor licenses yields estimated savings of $1,400 to $2,800 monthly in recurring SaaS fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

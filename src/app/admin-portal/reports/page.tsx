'use client';

import React from 'react';
import { usePortal } from '@/lib/store/portal-context';
import {
  BarChart3,
  Download,
  FileText,
  Star,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export default function ReportsPage() {
  const { notify } = usePortal();

  const handleExport = (reportName: string) => {
    notify('Report Generated', `Exported ${reportName} in Colorado HCPF standard audit format.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Reports &amp; State Compliance Audits
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200">
              HCPF Audit Ready
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Automated Colorado Medicaid, Sandata EVV aggregator, and clinical quality assurance exports
          </p>
        </div>

        <button
          onClick={() => handleExport('Complete State Audit Binder')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white text-xs font-bold shadow-[0_3px_12px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_18px_rgba(255,107,74,0.4)] transition-all cursor-pointer self-start sm:self-auto active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          <span>Download Audit Binder (ZIP)</span>
        </button>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Patient Satisfaction</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-2xl font-black text-slate-900">4.8</span>
            <div className="flex items-center text-[#F2B632]">
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
          <span className="text-[10px] text-slate-400">Based on 320 family reviews</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">EVV Compliance Rate</p>
          <p className="text-2xl font-black text-[#3e6b2b] mt-1">98.2%</p>
          <span className="text-[10px] text-emerald-600 font-semibold">Exceeds 95% state bar</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Hours Automated</p>
          <p className="text-2xl font-black text-slate-900 mt-1">~94 hrs</p>
          <span className="text-[10px] text-slate-400">This week across staff</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Clean Claims Rate</p>
          <p className="text-2xl font-black text-slate-900 mt-1">99.1%</p>
          <span className="text-[10px] text-emerald-600 font-semibold">First-pass adjudication</span>
        </div>
      </div>

      {/* Reports Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: 'Colorado EVV Aggregator Export',
            desc: 'Quarterly Sandata telemetry, visit exceptions, GPS coordinates, and self-correction audit trail.',
            tag: 'HCPF Required',
            period: 'Q4 2026',
          },
          {
            title: 'IHSS & HMA Supervisory Log',
            desc: '60-day RN supervisory assessment signatures, vital sign logs, and medication administration records.',
            tag: 'Clinical Audit',
            period: 'Nov 2026',
          },
          {
            title: 'Medicaid Revenue & Remittance (835)',
            desc: 'Dual-NPI billing reconciliation for Mountain Lane and Colorado Home Health branches.',
            tag: 'Financial Ledger',
            period: 'Monthly',
          },
          {
            title: 'Caregiver Credential Lifecycle Audit',
            desc: 'CBI fingerprinting, CAPS registration, CPR renewals, and TB test records for 902 caregivers.',
            tag: 'HR & Licensing',
            period: 'Active',
          },
          {
            title: 'Client Intake Conversion & Waitlist',
            desc: 'Lead cycle time, Case Management Agency referrals, and time-to-first-visit performance metrics.',
            tag: 'Operations',
            period: 'Trailing 90 Days',
          },
          {
            title: 'Patient Satisfaction & Survey Breakdown',
            desc: 'Punctuality (4.9/5), Care Quality (4.8/5), and Case Coordinator Communication (4.6/5).',
            tag: 'Quality Assurance',
            period: 'Annual QA',
          },
        ].map((report, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {report.tag}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{report.period}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 leading-snug">{report.title}</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{report.desc}</p>
            </div>

            <button
              onClick={() => handleExport(report.title)}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer group"
            >
              <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
              <span>Export CSV / PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

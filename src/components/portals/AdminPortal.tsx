'use client';

import React from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { UserRole } from '@/lib/types';
import {
  Users,
  Activity,
  ShieldCheck,
  TrendingUp,
  Server,
  DollarSign,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export function AdminPortal() {
  const { switchRole, setActiveView } = usePortal();

  const handleNavigateToRole = (role: UserRole) => {
    setActiveView('portal');
    switchRole(role);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-primary-950 to-primary-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-200 mb-2">
            <Activity className="w-3.5 h-3.5 text-secondary" />
            Executive Oversight & System Scalability
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            LiliSphere Enterprise Operations
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
            Consolidated management for Mountain Lane and Colorado Home Health. Scaling operational capacity 3x–4x across 900+ caregivers without scaling administrative overhead.
          </p>
        </div>
      </div>

      {/* Operational Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Active Caregivers</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">914</p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">~90% Family Member Caregivers</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Clients / Patients</span>
            <HeartHandshake className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">512</p>
          <p className="text-[11px] text-slate-500 mt-1">CFC, IHSS, HCBS Waivers & HMA</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">EVV Compliance Rate</span>
            <ShieldCheck className="w-4 h-4 text-[#00d084]" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">99.1%</p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Self-correction resolved 96% misses</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Legacy EHR Retirement</span>
            <Server className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">3 Systems</p>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">AxisCare, KanTime, Frisco Migration</p>
        </div>
      </div>

      {/* Quick Role Navigation Deck */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900">Department Portals Quick Access</h3>
        <p className="text-xs text-slate-500">
          Jump directly into any operational perspective to execute role-authorized workflows:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => handleNavigateToRole('onboarding')}
            className="p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary-50/40 text-left transition-all group cursor-pointer"
          >
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary flex items-center justify-between">
              Caregiver Onboarding Portal
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
            </h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Verify 15–20 document packets, CBI background checks, and ADP payroll provisioning.
            </p>
          </button>

          <button
            onClick={() => handleNavigateToRole('caregiver')}
            className="p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary-50/40 text-left transition-all group cursor-pointer"
          >
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary flex items-center justify-between">
              Family Caregiver Self-Service (Mobile)
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
            </h4>
            <p className="text-[11px] text-slate-500 mt-1">
              EVV clock-in, self-service missed clock-out resolution, and AI voice care notes.
            </p>
          </button>

          <button
            onClick={() => handleNavigateToRole('enrollment')}
            className="p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary-50/40 text-left transition-all group cursor-pointer"
          >
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary flex items-center justify-between">
              Intake &amp; State Referral Pipeline
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
            </h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Centralized inquiries, case-management coordination, and service authorization tracking.
            </p>
          </button>

          <button
            onClick={() => handleNavigateToRole('clinical')}
            className="p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary-50/40 text-left transition-all group cursor-pointer"
          >
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary flex items-center justify-between">
              RN Clinical Supervision &amp; AI Audit
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
            </h4>
            <p className="text-[11px] text-slate-500 mt-1">
              60-day nurse visits, quarterly virtual reviews, and AI note quality audits.
            </p>
          </button>

          <button
            onClick={() => handleNavigateToRole('compliance')}
            className="p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary-50/40 text-left transition-all group cursor-pointer"
          >
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary flex items-center justify-between">
              State QA &amp; Expirations Monitor
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
            </h4>
            <p className="text-[11px] text-slate-500 mt-1">
              CPR renewals, annual TB screening, and 7–10 year legacy audit migration.
            </p>
          </button>

          <button
            onClick={() => handleNavigateToRole('billing')}
            className="p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary-50/40 text-left transition-all group cursor-pointer"
          >
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary flex items-center justify-between">
              Medicaid Billing &amp; Dual NPI Claims
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
            </h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Claim routing across Mountain Lane &amp; Colorado Home Health, and commercial denial letters.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

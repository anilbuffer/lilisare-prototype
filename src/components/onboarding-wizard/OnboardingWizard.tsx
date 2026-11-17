'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { PatientOnboardingStatus, CaregiverOnboardingStatus, ServiceType, CaregiverClassification } from '@/lib/types';
import { PatientOnboardingFlow } from '@/components/flows/PatientOnboardingFlow';
import { CaregiverOnboardingFlow } from '@/components/flows/CaregiverOnboardingFlow';
import {
  Users,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  AlertCircle,
  FileCheck,
  Award,
  Layers,
  ChevronRight,
  Check,
  Building,
  UserCheck,
  Phone,
  Mail,
  ShieldAlert,
  Info,
  Calendar,
  ExternalLink,
  RefreshCw,
  Sliders,
  Play
} from 'lucide-react';

export function OnboardingWizard({ onComplete }: { onComplete?: () => void }) {
  const { notify, setActiveView } = usePortal();

  // Internal tab: 'overview' (Shared Dashboard) | 'patient' (8 Steps) | 'caregiver' (10 Steps)
  const [activeTab, setActiveTab] = useState<'overview' | 'patient' | 'caregiver'>('overview');

  // Live Case Study: Mother (Elena) and Child (Mateo)
  const [childPatientStatus, setChildPatientStatus] = useState<PatientOnboardingStatus>('Approval Pending');
  const [motherCaregiverStatus, setMotherCaregiverStatus] = useState<CaregiverOnboardingStatus>('Training Pending');
  const [uncleCaregiverStatus, setUncleCaregiverStatus] = useState<CaregiverOnboardingStatus>('Application Sent');

  // Matrix Checklist Simulator Flags
  const [matrixState, setMatrixState] = useState({
    patientProfile: true,
    caregiverProfile: true,
    patientDocuments: true,
    caregiverDocuments: true,
    serviceSelection: true,
    stateAuthorization: false, // Pending State PAR
    backgroundChecks: true,    // CBI Cleared
    trainingOrientation: false, // LearnWorlds in progress
  });

  const isPatientReady = matrixState.patientProfile && matrixState.patientDocuments && matrixState.serviceSelection && matrixState.stateAuthorization;
  const isCaregiverReady = matrixState.caregiverProfile && matrixState.caregiverDocuments && matrixState.backgroundChecks && matrixState.trainingOrientation;
  const canServiceStart = isPatientReady && isCaregiverReady;

  const handleSimulateFullReadiness = () => {
    setMatrixState({
      patientProfile: true,
      caregiverProfile: true,
      patientDocuments: true,
      caregiverDocuments: true,
      serviceSelection: true,
      stateAuthorization: true,
      backgroundChecks: true,
      trainingOrientation: true,
    });
    setChildPatientStatus('Ready for Service');
    setMotherCaregiverStatus('Active');
    notify(
      'Service Start Cleared!',
      'Both Mateo (Patient) and Elena (Caregiver) satisfy all state & agency requirements. EVV shifts can now begin!',
      'success'
    );
  };

  const handleResetSimulation = () => {
    setMatrixState({
      patientProfile: true,
      caregiverProfile: true,
      patientDocuments: true,
      caregiverDocuments: true,
      serviceSelection: true,
      stateAuthorization: false,
      backgroundChecks: true,
      trainingOrientation: false,
    });
    setChildPatientStatus('Approval Pending');
    setMotherCaregiverStatus('Training Pending');
    notify('Simulation Reset', 'Status restored to initial Mother & Child onboarding state.', 'info');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 antialiased">
      {/* ========================================================================= */}
      {/* 1. TOP TAB NAVIGATION BAR (Home Page Styled)                              */}
      {/* ========================================================================= */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xs shadow-xs">
            LS
          </div>
          <div>
            <h2 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <span>LiliSphere Onboarding Engine</span>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-900">
                Dual-Track System
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">Connected journeys with separate progress and independent statuses</p>
          </div>
        </div>

        {/* Journey Tabs */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'overview'
              ? 'bg-white text-primary shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F2B632]" />
            <span>Shared Overview Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('patient')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'patient'
              ? 'bg-white text-primary shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Patient Flow (8 Steps)</span>
          </button>

          <button
            onClick={() => setActiveTab('caregiver')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'caregiver'
              ? 'bg-white text-primary shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-[#00d084]" />
            <span>Caregiver Flow (10 Steps)</span>
          </button>
        </div>
      </div>

      {/* Render Selected View */}
      {activeTab === 'patient' && <PatientOnboardingFlow />}
      {activeTab === 'caregiver' && <CaregiverOnboardingFlow />}

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* ========================================================================= */}
          {/* 2. HERO BANNER: Brand Authority & Dual Concept                             */}
          {/* ========================================================================= */}
          <div className="bg-gradient-to-r from-[#1b3614] via-[#2a3d20] to-[#3e6b2b] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-bold text-secondary mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00d084]" />
                  Connected Journeys • Independent Compliance Tracking
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Patient &amp; Caregiver Onboarding Command Center
                </h1>
                <p className="text-emerald-100 text-xs sm:text-sm mt-2 leading-relaxed max-w-2xl">
                  Both onboarding workflows start together when a family chooses LiliSare, but they progress independently. The system maintains separate profiles, distinct compliance tracks, and independent readiness criteria.
                </p>

                {/* Important Difference Clarification Box */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-start gap-2.5">
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-200">Patient Onboarding:</strong>
                      <p className="text-slate-300 text-[11px] mt-0.5">
                        Registering the person who <strong>needs care</strong>. Understand care needs, collect guardian consent, and obtain state Medicaid approvals.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-start gap-2.5">
                    <UserCheck className="w-4 h-4 text-[#00d084] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-200">Caregiver Onboarding:</strong>
                      <p className="text-slate-300 text-[11px] mt-0.5">
                        Registering and preparing the person who will <strong>provide care</strong>. Collect docs, run CBI background checks, train, and setup payroll.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Telemetry Summary */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shrink-0 min-w-[240px] text-center space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-slate-300 font-bold">
                  Service Readiness Gate
                </span>
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black shadow-xs ${canServiceStart
                      ? 'bg-[#00d084] text-white'
                      : 'bg-amber-400 text-amber-950'
                      }`}
                  >
                    {canServiceStart ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        Service Cleared to Begin
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4" />
                        Service on Hold (Pending Approvals)
                      </>
                    )}
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 leading-snug">
                  Service can begin when <strong>all applicable requirements</strong> for both Patient and Caregiver are satisfied.
                </p>

                <div className="pt-2 border-t border-white/15 flex justify-center gap-2">
                  <button
                    onClick={handleSimulateFullReadiness}
                    className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                  >
                    Simulate Full Clearance
                  </button>
                  <button
                    onClick={handleResetSimulation}
                    className="px-2.5 py-1 bg-black/20 hover:bg-black/30 text-slate-300 text-[10px] font-semibold rounded-lg transition-all cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. HOW BOTH ONBOARDING PROCESSES WORK TOGETHER (Visual Architecture)       */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  How Both Onboarding Processes Work Together
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Two separate workflows that launch simultaneously upon family intake but advance independently
                </p>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                Dual-Pipeline Architecture
              </span>
            </div>

            {/* Visual Flow Graphic */}
            <div className="bg-[#fbfdfa] rounded-2xl p-5 border border-slate-200/80 space-y-4">
              {/* Intake Trigger */}
              <div className="flex items-center justify-center">
                <div className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs flex items-center gap-2 shadow-xs">
                  <span>Family Chooses LiliSare</span>
                  <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-secondary font-black">Staff Starts Onboarding</span>
                </div>
              </div>

              {/* Parallel Split Streams */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Track A: Patient */}
                <div className="bg-white rounded-2xl p-4 border border-rose-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-rose-700 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      Patient Onboarding Stream (8 Steps)
                    </span>
                    <button
                      onClick={() => setActiveTab('patient')}
                      className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      Open Flow <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 gap-1 overflow-x-auto py-2">
                    <span className="px-2 py-1 rounded bg-rose-50 border border-rose-100 text-rose-900 shrink-0">Profile</span>
                    <span className="text-slate-300">→</span>
                    <span className="px-2 py-1 rounded bg-rose-50 border border-rose-100 text-rose-900 shrink-0">Service</span>
                    <span className="text-slate-300">→</span>
                    <span className="px-2 py-1 rounded bg-rose-50 border border-rose-100 text-rose-900 shrink-0">Documents</span>
                    <span className="text-slate-300">→</span>
                    <span className="px-2 py-1 rounded bg-amber-50 border border-amber-200 text-amber-900 shrink-0 font-bold">Authorization (PAR)</span>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-snug">
                    Focus: Medicaid ID, responsible party consent, CMA coordination, and state service plan approval.
                  </p>
                </div>

                {/* Track B: Caregiver */}
                <div className="bg-white rounded-2xl p-4 border border-emerald-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[#00d084]" />
                      Caregiver Onboarding Stream (10 Steps)
                    </span>
                    <button
                      onClick={() => setActiveTab('caregiver')}
                      className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      Open Flow <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 gap-1 overflow-x-auto py-2">
                    <span className="px-2 py-1 rounded bg-emerald-50 border border-emerald-100 text-emerald-900 shrink-0">Profile</span>
                    <span className="text-slate-300">→</span>
                    <span className="px-2 py-1 rounded bg-emerald-50 border border-emerald-100 text-emerald-900 shrink-0">Docs (~20)</span>
                    <span className="text-slate-300">→</span>
                    <span className="px-2 py-1 rounded bg-emerald-50 border border-emerald-100 text-emerald-900 shrink-0">CBI Checks</span>
                    <span className="text-slate-300">→</span>
                    <span className="px-2 py-1 rounded bg-amber-50 border border-amber-200 text-amber-900 shrink-0 font-bold">Training</span>
                    <span className="text-slate-300">→</span>
                    <span className="px-2 py-1 rounded bg-emerald-50 border border-emerald-100 text-emerald-900 shrink-0">Activation</span>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-snug">
                    Focus: Tax classification (W-2 vs 1099), background checks, LearnWorlds LMS, and ADP setup.
                  </p>
                </div>
              </div>

              {/* Review & Service Clearance */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center text-xs space-y-1">
                <span className="font-black text-primary-900">Both Workflows Reviewed &amp; Checked Independently</span>
                <p className="text-[11px] text-slate-600">
                  Service can begin when all applicable requirements are satisfied for <strong>both</strong> sides.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. REAL-LIFE MOTHER & CHILD CASE STUDY CARDS (Mateo & Elena)              */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Child / Patient Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs border border-rose-200">
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">Mateo Morales (Child / Patient)</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Patient ID: PAT-101 • Age 8 • Denver County</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  Needs Care
                </span>
              </div>

              {/* Status Picker with the 8 recommended Patient Statuses */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Patient Dashboard Status:</span>
                  <select
                    value={childPatientStatus}
                    onChange={(e) => {
                      setChildPatientStatus(e.target.value as PatientOnboardingStatus);
                      notify('Patient Status Changed', `Mateo set to: ${e.target.value}`, 'info');
                    }}
                    className="text-xs font-black px-2.5 py-1 rounded-lg border border-slate-300 bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Documents Pending">Documents Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approval Pending">Approval Pending</option>
                    <option value="Ready for Service">Ready for Service</option>
                    <option value="Active">Active</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                <p className="text-[10px] text-slate-500">
                  Current Stage: Step 7/8 — State Prior Authorization review underway with RMHS case manager.
                </p>
              </div>

              {/* Patient Key Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Requested Service</span>
                  <p className="font-bold text-slate-900 mt-0.5">IHSS (HCBS-CES)</p>
                  <span className="text-[10px] text-slate-500">28.5 hours/week</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Responsible Party</span>
                  <p className="font-bold text-slate-900 mt-0.5">Elena Morales</p>
                  <span className="text-[10px] text-slate-500">Mother (Legal Guardian)</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Blocker: State PAR Letter Pending
                </span>
                <button
                  onClick={() => setActiveTab('patient')}
                  className="px-3 py-1.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-800 transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <span>Open Patient Journey</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Mother / Caregiver Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center font-bold text-xs border border-emerald-200">
                    <UserCheck className="w-4 h-4 text-[#00d084]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">Elena Morales (Mother / Caregiver)</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Caregiver ID: CG-801 • Linked to Mateo</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Provides Care
                </span>
              </div>

              {/* Status Picker with the 8 recommended Caregiver Statuses */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Caregiver Dashboard Status:</span>
                  <select
                    value={motherCaregiverStatus}
                    onChange={(e) => {
                      setMotherCaregiverStatus(e.target.value as CaregiverOnboardingStatus);
                      notify('Caregiver Status Changed', `Elena set to: ${e.target.value}`, 'info');
                    }}
                    className="text-xs font-black px-2.5 py-1 rounded-lg border border-slate-300 bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="Application Sent">Application Sent</option>
                    <option value="Documents Pending">Documents Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Background Check Pending">Background Check Pending</option>
                    <option value="Training Pending">Training Pending</option>
                    <option value="Ready for Activation">Ready for Activation</option>
                    <option value="Active">Active</option>
                  </select>
                </div>
                <p className="text-[10px] text-slate-500">
                  Current Stage: Step 7/10 — Background checks passed; LearnWorlds courses &amp; RN signoff in progress.
                </p>
              </div>

              {/* Caregiver Key Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Classification</span>
                  <p className="font-bold text-slate-900 mt-0.5">Employee (W-2)</p>
                  <span className="text-[10px] text-slate-500">20 Documents Packet</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Background Checks</span>
                  <p className="font-bold text-emerald-700 mt-0.5">CBI &amp; OIG Cleared</p>
                  <span className="text-[10px] text-slate-500">Clean Fingerprint Log</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Blocker: LearnWorlds LMS Quizzes
                </span>
                <button
                  onClick={() => setActiveTab('caregiver')}
                  className="px-3 py-1.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-800 transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  <span>Open Caregiver Journey</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 5. INTERACTIVE ACTIVITY COMPARISON MATRIX (Exact User Table)              */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Dual Workflow Activity Comparison Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Even if the child’s profile is complete, the mother’s onboarding is not automatically complete, and vice versa.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Interactive Simulation:</span>
                <button
                  onClick={handleSimulateFullReadiness}
                  className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg font-bold hover:bg-emerald-100 transition-all cursor-pointer"
                >
                  Clear All Pending
                </button>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-700 font-black text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">Activity</th>
                    <th className="py-3 px-4 text-center">Child (Patient: Mateo)</th>
                    <th className="py-3 px-4 text-center">Mother (Caregiver: Elena)</th>
                    <th className="py-3 px-4">System Rule &amp; Operational Independence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Row 1: Profile */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">Profile</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" /> Completed
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" /> Completed
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      <strong>Rule 1:</strong> Separate records (PAT-101 vs CG-801) with distinct HIPAA and operational scopes.
                    </td>
                  </tr>

                  {/* Row 2: Documents */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">Documents</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" /> Completed
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" /> Completed
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      <strong>Rule 4:</strong> Patient signs consent &amp; rights; caregiver provides W-4/I-9 (~20 docs for W-2).
                    </td>
                  </tr>

                  {/* Row 3: Service Selection */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">Service Selection</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" /> Completed (IHSS)
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-400 font-medium">
                      — Not Applicable
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      Caregiver provides labor; patient program defines Medicaid waiver billing rate.
                    </td>
                  </tr>

                  {/* Row 4: Authorization */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">Authorization (State PAR)</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setMatrixState({ ...matrixState, stateAuthorization: !matrixState.stateAuthorization });
                          notify('PAR Toggled', `State authorization: ${!matrixState.stateAuthorization ? 'Approved' : 'Pending'}`, 'info');
                        }}
                        className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-full border cursor-pointer ${matrixState.stateAuthorization
                          ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                          : 'text-amber-800 bg-amber-50 border-amber-200'
                          }`}
                      >
                        {matrixState.stateAuthorization ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {matrixState.stateAuthorization ? 'Approved' : 'Pending'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-400 font-medium">
                      — Not Applicable
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      State Medicaid issues PAR number and approved hours (28.5 hrs/wk) to the patient.
                    </td>
                  </tr>

                  {/* Row 5: Background Checks */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">Background Checks (CBI)</td>
                    <td className="py-3 px-4 text-center text-slate-400 font-medium">
                      — Not Applicable
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" /> Completed
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      Caregiver undergoes Colorado Bureau of Investigation fingerprint check &amp; OIG screening.
                    </td>
                  </tr>

                  {/* Row 6: Training */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">Training &amp; Orientation</td>
                    <td className="py-3 px-4 text-center text-slate-400 font-medium">
                      — Not Applicable
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setMatrixState({ ...matrixState, trainingOrientation: !matrixState.trainingOrientation });
                          notify('Training Toggled', `Training status: ${!matrixState.trainingOrientation ? 'Completed' : 'Pending'}`, 'info');
                        }}
                        className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-full border cursor-pointer ${matrixState.trainingOrientation
                          ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                          : 'text-amber-800 bg-amber-50 border-amber-200'
                          }`}
                      >
                        {matrixState.trainingOrientation ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {matrixState.trainingOrientation ? 'Completed' : 'Pending'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      LearnWorlds LMS courses, quiz scoring, orientation video, and RN skills verification.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Matrix Rule Enforcement Banner */}
            <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">System Enforcement (Rule 5):</p>
                <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                  Notice that even when Mateo’s authorization arrives, Elena’s training must still be finished before care shifts can begin. Conversely, if Elena completes training first, care cannot start until Mateo’s state PAR is officially active.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 6. RECOMMENDED SIMPLE STATUS SYSTEM REFERENCE                             */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" />
                  Recommended Simple Onboarding Status System
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clear, easy-to-understand operational statuses for staff and families across the LiliSphere dashboard
                </p>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                8 Patient / 8 Caregiver
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Patient Status Column */}
              <div className="p-4 rounded-2xl border border-rose-100 bg-rose-50/30 space-y-2">
                <div className="flex items-center gap-2 pb-2 border-b border-rose-200/60 font-black text-rose-900">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  Patient Status Progression
                </div>
                <div className="space-y-1.5">
                  {[
                    { s: 'Not Started', desc: 'Initial inquiry received; profile not yet opened' },
                    { s: 'In Progress', desc: 'Staff gathering demographics and emergency contacts' },
                    { s: 'Documents Pending', desc: 'Patient forms sent to responsible party for signature' },
                    { s: 'Under Review', desc: 'Clinical team reviewing diagnosis and care tasks' },
                    { s: 'Approval Pending', desc: 'Waiting for state case manager PAR approval' },
                    { s: 'Ready for Service', desc: 'All requirements satisfied; ready for care to start' },
                    { s: 'Active', desc: 'Actively receiving approved care shifts' },
                    { s: 'On Hold', desc: 'Temporary pause (hospitalization, travel, reassessment)' },
                  ].map((item, idx) => (
                    <div key={item.s} className="flex items-start gap-2 p-1.5 rounded-lg bg-white border border-rose-100/80">
                      <span className="text-[10px] font-mono font-bold text-slate-400 w-4">{idx + 1}.</span>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900">{item.s}</span>
                        <p className="text-[10px] text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Caregiver Status Column */}
              <div className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/30 space-y-2">
                <div className="flex items-center gap-2 pb-2 border-b border-emerald-200/60 font-black text-emerald-900">
                  <UserCheck className="w-3.5 h-3.5 text-[#00d084]" />
                  Caregiver Status Progression
                </div>
                <div className="space-y-1.5">
                  {[
                    { s: 'Not Started', desc: 'Identified as caregiver; intake not yet started' },
                    { s: 'Application Sent', desc: 'Application magic link emailed to caregiver' },
                    { s: 'Documents Pending', desc: 'Waiting for upload of 15–20 compliance documents' },
                    { s: 'Under Review', desc: 'Staff auditing uploaded IDs, W-4/W-9, and forms' },
                    { s: 'Background Check Pending', desc: 'CBI fingerprint or federal screening in progress' },
                    { s: 'Training Pending', desc: 'Caregiver completing LearnWorlds LMS courses & quizzes' },
                    { s: 'Ready for Activation', desc: 'All checks, training, and ADP setup completed' },
                    { s: 'Active', desc: 'Fully activated and authorized to clock into EVV shifts' },
                  ].map((item, idx) => (
                    <div key={item.s} className="flex items-start gap-2 p-1.5 rounded-lg bg-white border border-emerald-100/80">
                      <span className="text-[10px] font-mono font-bold text-slate-400 w-4">{idx + 1}.</span>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900">{item.s}</span>
                        <p className="text-[10px] text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 7. IMPORTANT SYSTEM RULES (The 5 Fundamental Rules)                        */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                5 Important System Rules from LiliSare Business Process
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Core architectural guardrails governing all family onboarding operations in LiliSphere
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
              {/* Rule 1 */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
                <div>
                  <span className="w-5 h-5 rounded-full bg-primary text-white font-bold text-[10px] flex items-center justify-center mb-2">
                    1
                  </span>
                  <p className="font-bold text-slate-900">Separate Profiles</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Patient and caregiver must always have distinct profiles, IDs, and compliance records.
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-primary mt-2">PAT-101 vs CG-801</span>
              </div>

              {/* Rule 2 */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
                <div>
                  <span className="w-5 h-5 rounded-full bg-primary text-white font-bold text-[10px] flex items-center justify-center mb-2">
                    2
                  </span>
                  <p className="font-bold text-slate-900">Multi-Caregiver</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    One patient can have multiple caregivers linked (e.g. Mother as primary + Uncle as respite).
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-primary mt-2">1 Patient → N Caregivers</span>
              </div>

              {/* Rule 3 */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
                <div>
                  <span className="w-5 h-5 rounded-full bg-primary text-white font-bold text-[10px] flex items-center justify-center mb-2">
                    3
                  </span>
                  <p className="font-bold text-slate-900">Multi-Patient</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    One caregiver may potentially serve multiple patients across family or community cases.
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-primary mt-2">1 Caregiver → N Patients</span>
              </div>

              {/* Rule 4 */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
                <div>
                  <span className="w-5 h-5 rounded-full bg-primary text-white font-bold text-[10px] flex items-center justify-center mb-2">
                    4
                  </span>
                  <p className="font-bold text-slate-900">Automated Docs</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    System automatically compiles packet based on caregiver classification (~20 W-2 vs ~15 1099).
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-primary mt-2">Zero Manual Form Picking</span>
              </div>

              {/* Rule 5 */}
              <div className="p-3.5 rounded-2xl border border-amber-300 bg-amber-50/60 flex flex-col justify-between">
                <div>
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center mb-2">
                    5
                  </span>
                  <p className="font-bold text-amber-950">Non-Cascading</p>
                  <p className="text-[11px] text-amber-800 mt-1 leading-snug">
                    Patient onboarding completion must <strong>never</strong> automatically complete caregiver onboarding.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-amber-900 mt-2">Independent Readiness</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

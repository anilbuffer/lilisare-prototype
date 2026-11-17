'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import {
  Heart,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  FileCheck,
  Building,
  Calendar,
  Users,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface PatientStep {
  stepNumber: number;
  title: string;
  category: 'Intake & Discovery' | 'Authorization & State Plan' | 'Care Coordination & Activation';
  responsibleParty: string;
  summary: string;
  keyOutputs: string[];
  automationRule: string;
}

const PATIENT_STEPS: PatientStep[] = [
  {
    stepNumber: 1,
    title: 'Client Referral / Inquiry',
    category: 'Intake & Discovery',
    responsibleParty: 'Enrollment Team',
    summary: 'Receive initial referral via case management agency, family phone inquiry, website, or direct provider.',
    keyOutputs: ['Inquiry source recorded', 'Lead profile created', 'Assigned intake specialist'],
    automationRule: 'Auto-logs referral in unified pipeline and assigns follow-up task within 4 business hours.',
  },
  {
    stepNumber: 2,
    title: 'Initial Client Information',
    category: 'Intake & Discovery',
    responsibleParty: 'Enrollment Team / Family',
    summary: 'Gather client details, Medicaid number, family or responsible party contacts, and emergency information.',
    keyOutputs: ['Demographics & Medicaid ID verified', 'Responsible party legal relationship mapped'],
    automationRule: 'Reuses shared household contact data if caregiver is in the same household.',
  },
  {
    stepNumber: 3,
    title: 'Service Identification',
    category: 'Intake & Discovery',
    responsibleParty: 'Care Coordinator',
    summary: 'Determine exact state program (IHSS, CNA, HMA, Personal Care, HCBS Waiver, CFC) and eligibility rules.',
    keyOutputs: ['Target service program selected', 'Clinical supervision requirements identified'],
    automationRule: 'Configures compliance schedule based on service type (e.g. CNA requires 60-day RN visit; HMA requires quarterly virtual RN).',
  },
  {
    stepNumber: 4,
    title: 'Client Documentation',
    category: 'Intake & Discovery',
    responsibleParty: 'Client / Responsible Party',
    summary: 'Generate client-specific documentation packet, collect digital signatures, and attach medical orders.',
    keyOutputs: ['Signed Client Rights notice', 'Physician Order / 485', 'Consent for service'],
    automationRule: 'Generates single e-sign envelope for legal guardian or responsible party.',
  },
  {
    stepNumber: 5,
    title: 'Case Manager Coordination',
    category: 'Authorization & State Plan',
    responsibleParty: 'Enrollment / Case Manager',
    summary: 'Establish direct communication channel with Colorado State Case Management Agency (e.g. RMHS, TRE, Imagine!).',
    keyOutputs: ['Case manager contact linked', 'Communication log opened', 'PAR timeline established'],
    automationRule: 'Sends templated polite email and SMS status check to state case manager.',
  },
  {
    stepNumber: 6,
    title: 'State Authorization',
    category: 'Authorization & State Plan',
    responsibleParty: 'State Medicaid (HCPF)',
    summary: 'Submit Prior Authorization Request (PAR) and track state approval. (Caregivers cannot be paid until approval arrives).',
    keyOutputs: ['PAR number issued', 'Authorized weekly unit cap confirmed', 'Effective date range set'],
    automationRule: 'Monitors approval status and alerts billing/onboarding if payment will be at risk.',
  },
  {
    stepNumber: 7,
    title: 'Service Plan Processing',
    category: 'Authorization & State Plan',
    responsibleParty: 'Clinical Team & System',
    summary: 'Receive, import, extract, verify, and digitally store the state-issued service plan document.',
    keyOutputs: ['Extracted task allocation matrix', 'Authorized hours breakdown', 'Digital plan archived'],
    automationRule: 'Automated document extraction extracts authorized hours and ADL tasks directly into system records.',
  },
  {
    stepNumber: 8,
    title: 'Client Service Configuration',
    category: 'Care Coordination & Activation',
    responsibleParty: 'Care Coordinator',
    summary: 'Configure approved services, weekly hour budgets, authorized service codes, and supervisory visit frequency.',
    keyOutputs: ['System shift rules active', 'EVV weekly hour ceilings locked', 'Supervisory visit task created'],
    automationRule: 'Enforces EVV weekly hour limits so caregiver cannot accidentally exceed authorized units.',
  },
  {
    stepNumber: 9,
    title: 'Caregiver Matching & Scheduling',
    category: 'Care Coordination & Activation',
    responsibleParty: 'Staff & Family',
    summary: 'Match eligible, compliant family caregiver (or agency attendant) and establish initial care schedule.',
    keyOutputs: ['Caregiver assigned to client', 'Schedule published to mobile app', 'Geofence activated'],
    automationRule: 'Checks caregiver credential clearance (CBI + CPR) before allowing shift assignment.',
  },
  {
    stepNumber: 10,
    title: 'Client Activation',
    category: 'Care Coordination & Activation',
    responsibleParty: 'Operations Lead',
    summary: 'Final activation: client profile goes live, ready for authorized home care delivery and EVV tracking.',
    keyOutputs: ['Client status set to Active', 'Ready for shift clock-in', 'Medicaid billing record opened'],
    automationRule: 'Notifies family caregiver that EVV clock-in is now enabled on their mobile app.',
  },
  {
    stepNumber: 11,
    title: 'Ongoing Client Management',
    category: 'Care Coordination & Activation',
    responsibleParty: 'Clinical & Compliance',
    summary: 'Continuous care oversight: annual plan renewals, RN supervisory visits, care note monitoring, and audits.',
    keyOutputs: ['Annual recertification alerts', 'Supervisory visit evidence', 'Historical audit trail maintained'],
    automationRule: 'Schedules recurring 60-day or quarterly visit tasks in compliance dashboard.',
  },
];

export function PatientOnboardingFlow() {
  const { clients, notify } = usePortal();
  const [activeStepNumber, setActiveStepNumber] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);

  const activeStep = PATIENT_STEPS.find((s) => s.stepNumber === activeStepNumber) || PATIENT_STEPS[0];

  const handleToggleComplete = (stepNum: number) => {
    if (completedSteps.includes(stepNum)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepNum));
      notify('Patient Step Reopened', `Step ${stepNum}: ${activeStep.title} marked in-progress.`, 'info');
    } else {
      setCompletedSteps([...completedSteps, stepNum]);
      notify('Patient Step Cleared', `Step ${stepNum}: ${activeStep.title} marked completed!`, 'success');
      if (stepNum < 11) {
        setActiveStepNumber(stepNum + 1);
      }
    }
  };

  const progressPercent = Math.round((completedSteps.length / PATIENT_STEPS.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-primary-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-200 mb-2">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              Patient Onboarding Flow (11 Steps)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Patient / Client Lifecycle Engine
            </h1>
            <p className="text-teal-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              From inquiry and service identification to state prior-authorization, care plan extraction, caregiver assignment, and active EVV service delivery.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 text-center shrink-0">
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
              Client Activation Readiness
            </span>
            <p className="text-3xl font-black text-secondary mt-0.5">{progressPercent}%</p>
            <span className="text-[11px] text-teal-300 font-medium">
              {completedSteps.length} of 11 Milestones Cleared
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Steps list + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 11 Steps */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col h-[720px]">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">11 Patient Milestones</h3>
            <span className="text-xs text-slate-500">Interactive Progression</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 mt-3 pr-1">
            {PATIENT_STEPS.map((step) => {
              const isSelected = step.stepNumber === activeStep.stepNumber;
              const isCompleted = completedSteps.includes(step.stepNumber);

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStepNumber(step.stepNumber)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-primary bg-primary-50/60 shadow-sm'
                      : 'border-slate-200/70 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isSelected
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4 text-[#00d084]" /> : step.stepNumber}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {step.stepNumber}. {step.title}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">{step.category}</p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-primary translate-x-0.5' : 'text-slate-300'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Step Inspector */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-teal-100 text-teal-900">
                  Milestone {activeStep.stepNumber} of 11
                </span>
                <span className="text-xs font-semibold text-slate-500">{activeStep.category}</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2">{activeStep.title}</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{activeStep.summary}</p>
            </div>

            <button
              onClick={() => handleToggleComplete(activeStep.stepNumber)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0 ${
                completedSteps.includes(activeStep.stepNumber)
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-primary hover:bg-primary-600 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {completedSteps.includes(activeStep.stepNumber) ? 'Mark Milestone Pending' : 'Approve Milestone'}
            </button>
          </div>

          {/* Accountable Party */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                Responsible Role
              </span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{activeStep.responsibleParty}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-medium">
              Client Care Pathway
            </span>
          </div>

          {/* Key Outputs */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-primary" />
              Key Outputs & State Compliance Criteria
            </h3>
            <div className="space-y-2">
              {activeStep.keyOutputs.map((out, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200/80 bg-white text-xs text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Automation Rule */}
          <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200/80 text-xs space-y-1">
            <h4 className="font-bold text-teal-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Automated State Rule Execution
            </h4>
            <p className="text-teal-900 leading-relaxed">{activeStep.automationRule}</p>
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveStepNumber(Math.max(1, activeStep.stepNumber - 1))}
              disabled={activeStep.stepNumber === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Previous Milestone
            </button>
            <span className="text-xs text-slate-500 font-medium">
              Milestone {activeStep.stepNumber} of 11
            </span>
            <button
              onClick={() => setActiveStepNumber(Math.min(11, activeStep.stepNumber + 1))}
              disabled={activeStep.stepNumber === 11}
              className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-600"
            >
              Next Milestone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

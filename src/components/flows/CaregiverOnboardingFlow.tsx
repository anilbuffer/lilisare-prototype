'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import {
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  FileText,
  Building2,
  Video,
  CreditCard,
  Send,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface StepDetail {
  stepNumber: number;
  title: string;
  phase: 'Phase I: Intake & Onboarding' | 'Phase II: Compliance & Authorization' | 'Phase III: Activation & Delivery' | 'Phase IV: Monitoring & Billing';
  roleResponsible: string;
  description: string;
  requirements: string[];
  systemAutomation: string;
}

const CAREGIVER_STEPS: StepDetail[] = [
  {
    stepNumber: 1,
    title: 'Lead Confirmation',
    phase: 'Phase I: Intake & Onboarding',
    roleResponsible: 'Enrollment Team',
    description: 'Family confirms they want to receive home-care services from LiliSare.',
    requirements: ['Family consent confirmed', 'Client needs identified', 'Service program selected'],
    systemAutomation: 'Automatically tags lead as "Converted" and opens onboarding pipeline.',
  },
  {
    stepNumber: 2,
    title: 'Internal Caregiver Notification',
    phase: 'Phase I: Intake & Onboarding',
    roleResponsible: 'System Automation',
    description: 'Enrollment triggers an automated handover to the 2-person caregiver onboarding team.',
    requirements: ['Client details attached', 'Caregiver relationship defined', 'Service category flagged'],
    systemAutomation: 'Instant dispatch of intake notification containing client demographics and caregiver contacts.',
  },
  {
    stepNumber: 3,
    title: 'Caregiver Digital Application',
    phase: 'Phase I: Intake & Onboarding',
    roleResponsible: 'Onboarding Coordinator',
    description: 'Secure digital application link emailed/SMS-sent to the family caregiver.',
    requirements: ['Caregiver personal information', 'Driver license / state ID', 'Emergency contacts'],
    systemAutomation: 'Sends personalized magic link to caregiver mobile self-service portal.',
  },
  {
    stepNumber: 4,
    title: 'Application Completion',
    phase: 'Phase I: Intake & Onboarding',
    roleResponsible: 'Caregiver (Self-Service)',
    description: 'Caregiver opens the portal and completes profile, address, and household info.',
    requirements: ['Demographic info', 'Proof of residency', 'Relationship to client'],
    systemAutomation: 'Validates phone, email, and checks for existing household record to prevent duplicate entries.',
  },
  {
    stepNumber: 5,
    title: 'Caregiver Profile Creation',
    phase: 'Phase I: Intake & Onboarding',
    roleResponsible: 'System Automation',
    description: 'System automatically provisions the caregiver profile linked to the client record.',
    requirements: ['Profile generated in LiliSphere', 'Linked to Client ID', 'Household relationship mapped'],
    systemAutomation: 'Automated profile creation with linked household relationship (shared address without duplicating legal forms).',
  },
  {
    stepNumber: 6,
    title: 'Determine Classification',
    phase: 'Phase I: Intake & Onboarding',
    roleResponsible: 'Onboarding Coordinator',
    description: 'Identify if caregiver is W-2 Employee, 1099 Contractor, or Dual classification.',
    requirements: ['W-2 for CNA/IHSS family employee', '1099 for independent respite', 'Dual packet if working both'],
    systemAutomation: 'System locks in classification and selects either 15-document or 20-document packet.',
  },
  {
    stepNumber: 7,
    title: 'Send Service Documentation Packet',
    phase: 'Phase II: Compliance & Authorization',
    roleResponsible: 'System Automation',
    description: 'System automatically assigns and sends the service-specific compliance packet.',
    requirements: ['W-4 or W-9 form', 'I-9 verification', 'Caregiver mutual agreement', 'Direct deposit form'],
    systemAutomation: 'Staff do not manually pick individual forms; service rule auto-dispatches required packet.',
  },
  {
    stepNumber: 8,
    title: 'Document Upload & Signature',
    phase: 'Phase II: Compliance & Authorization',
    roleResponsible: 'Caregiver (Self-Service)',
    description: 'Caregiver uploads photo IDs and electronically signs required agreements.',
    requirements: ['Government ID', 'Signed policy forms', 'Direct deposit voided check'],
    systemAutomation: 'OCR checks document validity; tracks checklist progress in real time.',
  },
  {
    stepNumber: 9,
    title: 'CBI & Federal Background Verification',
    phase: 'Phase II: Compliance & Authorization',
    roleResponsible: 'System / Compliance Lead',
    description: 'Background screening executed through Colorado Bureau of Investigation (CBI) & OIG.',
    requirements: ['CBI fingerprint clearance', 'OIG Exclusion check', 'Colorado DMV driving history'],
    systemAutomation: 'Automated API check when available; tracks status, cost, and renewal expiration.',
  },
  {
    stepNumber: 10,
    title: 'LearnWorlds Training & Quizzes',
    phase: 'Phase II: Compliance & Authorization',
    roleResponsible: 'Caregiver / LearnWorlds',
    description: 'Caregiver completes assigned coursework and passing quizzes on LearnWorlds LMS.',
    requirements: ['Infection control', 'Client rights & HIPAA', 'EVV clock-in training', 'Emergency procedures'],
    systemAutomation: 'Automated webhook syncs course completion and quiz scores directly into LiliSphere.',
  },
  {
    stepNumber: 11,
    title: 'Orientation Video Completion',
    phase: 'Phase II: Compliance & Authorization',
    roleResponsible: 'Caregiver',
    description: 'Caregiver watches mandatory LiliSare company orientation video.',
    requirements: ['100% video playback verified', 'Acknowledgment signed'],
    systemAutomation: 'Embedded video player timestamps viewing and records digital attestation.',
  },
  {
    stepNumber: 12,
    title: 'Post-Orientation Virtual Meeting',
    phase: 'Phase II: Compliance & Authorization',
    roleResponsible: 'Onboarding Coordinator',
    description: '15-minute introductory video meeting with the onboarding coordinator.',
    requirements: ['Identity verification check', 'Q&A on EVV and time tracking', 'Communication preferences'],
    systemAutomation: 'Calendar booking integration logs meeting attendance and supervisor signoff.',
  },
  {
    stepNumber: 13,
    title: 'Clinical Skills Validation',
    phase: 'Phase III: Activation & Delivery',
    roleResponsible: 'RN Clinical Supervisor',
    description: 'Nurse validates that the caregiver is competent to perform the specific authorized care tasks.',
    requirements: ['ADL assistance competency', 'Service-specific protocols (CNA or HMA)', 'Nurse signoff'],
    systemAutomation: 'Routes skill signoff sheet to RN Clinical Supervisor for electronic signature.',
  },
  {
    stepNumber: 14,
    title: 'ADP Payroll Profile Creation',
    phase: 'Phase III: Activation & Delivery',
    roleResponsible: 'System Automation / Payroll',
    description: 'Payroll profile generated in ADP Run (for W-2 employees) or ADP Workforce Now (for 1099).',
    requirements: ['Tax ID verified', 'Direct deposit routing confirmed', 'Payer rate established'],
    systemAutomation: 'Auto-syncs verified caregiver profile and pay rate into ADP.',
  },
  {
    stepNumber: 15,
    title: 'Caregiver Activation & EVV Release',
    phase: 'Phase III: Activation & Delivery',
    roleResponsible: 'Onboarding Lead & System',
    description: 'Final clearance: caregiver is certified, authorized for shifts, and released for EVV clock-in.',
    requirements: ['All 14 prior steps verified', 'State case authorization approved', 'Client profile active'],
    systemAutomation: 'Activates mobile app permissions, enables GPS-verified EVV clock-in, and releases shifts.',
  },
];

export function CaregiverOnboardingFlow() {
  const { caregivers, notify } = usePortal();
  const [activeStepNumber, setActiveStepNumber] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const activeStep = CAREGIVER_STEPS.find((s) => s.stepNumber === activeStepNumber) || CAREGIVER_STEPS[0];

  const handleToggleComplete = (stepNum: number) => {
    if (completedSteps.includes(stepNum)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepNum));
      notify('Step Reopened', `Step ${stepNum}: ${activeStep.title} marked in-progress.`, 'info');
    } else {
      setCompletedSteps([...completedSteps, stepNum]);
      notify('Step Completed', `Step ${stepNum}: ${activeStep.title} marked completed!`, 'success');
      if (stepNum < 15) {
        setActiveStepNumber(stepNum + 1);
      }
    }
  };

  const progressPercent = Math.round((completedSteps.length / CAREGIVER_STEPS.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              Full 15-Step Interactive Roadmap
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Caregiver Onboarding Journey
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Step-by-step lifecycle from initial family lead confirmation to ADP provisioning and state EVV activation. Designed for a 2-person onboarding team handling 900+ caregivers.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 text-center shrink-0">
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
              Journey Completion
            </span>
            <p className="text-3xl font-black text-secondary mt-0.5">{progressPercent}%</p>
            <span className="text-[11px] text-emerald-300 font-medium">
              {completedSteps.length} of 15 Steps Cleared
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Step Navigator + Detailed Step Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 15-Step List */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col h-[750px]">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">15 Operational Steps</h3>
            <span className="text-xs text-slate-500">Click any step to inspect</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 mt-3 pr-1">
            {CAREGIVER_STEPS.map((step) => {
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
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4 text-[#00d084]" /> : step.stepNumber}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        Step {step.stepNumber}: {step.title}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">{step.phase}</p>
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

        {/* Right: Active Step Inspector & Action Controller */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-primary-100 text-primary-900">
                  Step {activeStep.stepNumber} of 15
                </span>
                <span className="text-xs font-semibold text-slate-500">{activeStep.phase}</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-2">{activeStep.title}</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{activeStep.description}</p>
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
              {completedSteps.includes(activeStep.stepNumber) ? 'Mark Incomplete' : 'Complete This Step'}
            </button>
          </div>

          {/* Role Responsible */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                Owner / Responsible Role
              </span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{activeStep.roleResponsible}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-medium">
              Standard Operating Procedure
            </span>
          </div>

          {/* Key Deliverables & Validation Criteria */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Step Requirements & Verification Criteria
            </h3>
            <div className="space-y-2">
              {activeStep.requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200/80 bg-white text-xs text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LiliSphere System Automation */}
          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs space-y-1">
            <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              LiliSphere Platform Automation Logic
            </h4>
            <p className="text-emerald-900 leading-relaxed">{activeStep.systemAutomation}</p>
          </div>

          {/* Step Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveStepNumber(Math.max(1, activeStep.stepNumber - 1))}
              disabled={activeStep.stepNumber === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Previous Step
            </button>
            <span className="text-xs text-slate-500 font-medium">
              Step {activeStep.stepNumber} of 15
            </span>
            <button
              onClick={() => setActiveStepNumber(Math.min(15, activeStep.stepNumber + 1))}
              disabled={activeStep.stepNumber === 15}
              className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-600"
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

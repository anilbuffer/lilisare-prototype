'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { PatientOnboardingStatus, ServiceType } from '@/lib/types';
import {
  Heart,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Building,
  Calendar,
  Users,
  Sparkles,
  ChevronRight,
  User,
  Home as HomeIcon,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  Send,
  Check,
  RefreshCw,
  Award
} from 'lucide-react';

interface PatientStepItem {
  stepNumber: number;
  title: string;
  category: 'Intake & Profile' | 'Care Needs & Linking' | 'Documentation & State Plan' | 'Readiness & Completion';
  responsibleParty: string;
  summary: string;
  bullets: string[];
  systemAutomation: string;
}

const PATIENT_STEPS: PatientStepItem[] = [
  {
    stepNumber: 1,
    title: 'Patient Information',
    category: 'Intake & Profile',
    responsibleParty: 'Staff / Care Coordinator',
    summary: 'Staff creates the patient’s profile with core demographics and contacts.',
    bullets: [
      'Full legal name and Medicaid ID (State of Colorado)',
      'Date of birth and gender identity',
      'Residential address and living arrangement',
      'Contact phone and preferred communication channel',
      'Emergency contact name, relation, and phone'
    ],
    systemAutomation: 'Validates Colorado Medicaid ID format and checks for existing household record to prevent duplicate entries.'
  },
  {
    stepNumber: 2,
    title: 'Family / Responsible Party Details',
    category: 'Intake & Profile',
    responsibleParty: 'Enrollment Coordinator & Family',
    summary: 'Add the parent, family member, or legally authorized representative.',
    bullets: [
      'Primary responsible person full name and contact details',
      'Legal relationship to patient (Parent, Guardian, Power of Attorney)',
      'Responsible party authorization documents and e-signature consent',
      'Preferred language preference (English, Spanish, etc.)'
    ],
    systemAutomation: 'Maps shared household contact information so shared address does not require redundant re-entry.'
  },
  {
    stepNumber: 3,
    title: 'Select Service and Program',
    category: 'Care Needs & Linking',
    responsibleParty: 'Care Coordinator',
    summary: 'Identify the exact type of care and Medicaid waiver program the patient needs.',
    bullets: [
      'Evaluate care program: IHSS, CNA, HMA, Personal Care, or Homemaker',
      'Identify applicable Colorado Waiver: HCBS-CES, CHRP, SLS, DD, or CFC',
      'Define preliminary requested hours per week (e.g. 28.5 hrs/wk)',
      'Establish clinical supervision frequency (RN supervisory visits)'
    ],
    systemAutomation: 'Automatically assigns the state-mandated clinical oversight schedule based on selected service type.'
  },
  {
    stepNumber: 4,
    title: 'Add Caregiver Information',
    category: 'Care Needs & Linking',
    responsibleParty: 'Care Coordinator & Family',
    summary: 'Link the caregiver or multiple caregivers to the patient record.',
    bullets: [
      'Link primary caregiver (e.g. Mother: Elena Morales)',
      'Link secondary/respite caregiver if needed (e.g. Uncle: Carlos Morales)',
      'Specify caregiver-patient relationship and living arrangement',
      'Verify separate caregiver profile exists (Enforcing Rule 1 & Rule 2)'
    ],
    systemAutomation: 'Maintains independent caregiver profile link while ensuring one patient can have multiple assigned caregivers.'
  },
  {
    stepNumber: 5,
    title: 'Complete Patient Documents',
    category: 'Documentation & State Plan',
    responsibleParty: 'Responsible Party (Digital Signature)',
    summary: 'Send the required patient forms and consent packet to the responsible party.',
    bullets: [
      'Patient Information & Intake Demographic Form',
      'Consent for Care Services & Client Bill of Rights',
      'HIPAA Privacy Disclosure & Medical Information Release',
      'Physician Order / CMS-485 Plan of Care (if clinical CNA)'
    ],
    systemAutomation: 'Dispatches secure digital signature envelope via email/SMS; tracks status in real time.'
  },
  {
    stepNumber: 6,
    title: 'Case Manager Coordination',
    category: 'Documentation & State Plan',
    responsibleParty: 'Case Management Agency (CMA) Coordinator',
    summary: 'Record assigned state case manager and request necessary Prior Authorization (PAR).',
    bullets: [
      'Identify Case Management Agency (e.g. RMHS, TRE, Imagine!, Developmental Pathways)',
      'Record case manager contact details (Name, direct phone, secure email)',
      'Submit formal service authorization request for required hours',
      'Log case manager correspondence and follow-up timeline'
    ],
    systemAutomation: 'Automates case manager notification and tracks PAR approval SLA with automated reminder alerts.'
  },
  {
    stepNumber: 7,
    title: 'Service Plan and Authorization',
    category: 'Documentation & State Plan',
    responsibleParty: 'Colorado State Medicaid (HCPF) / Clinical Team',
    summary: 'Receive and verify approved services, authorized weekly hours, and task scope.',
    bullets: [
      'Receive official State Prior Authorization (PAR) approval letter',
      'Verify approved weekly hour caps (e.g. 28.5 hours authorized)',
      'Confirm effective service date range and authorized billing codes',
      'Extract approved ADL tasks (Hygiene, Feeding, Mobility, Transfers)'
    ],
    systemAutomation: 'Locks weekly EVV shift hour limits to approved state units to prevent over-billing or unbilled hours.'
  },
  {
    stepNumber: 8,
    title: 'Patient Onboarding Completed',
    category: 'Readiness & Completion',
    responsibleParty: 'Intake Director & System',
    summary: 'Mark the patient ready for service once all patient requirements and approvals are satisfied.',
    bullets: [
      'Confirm Patient profile complete and validated',
      'Confirm Service plan and state authorization approved',
      'Confirm all patient legal and consent documents executed',
      'IMPORTANT (Rule 5): Caregiver onboarding remains separate and independent'
    ],
    systemAutomation: 'Marks patient "Ready for Service" in LiliSphere. Does NOT auto-activate caregiver; checks caregiver readiness separately.'
  }
];

export function PatientOnboardingFlow() {
  const { notify, setActiveView } = usePortal();
  const [activeStepNumber, setActiveStepNumber] = useState<number>(1);
  const [patientStatus, setPatientStatus] = useState<PatientOnboardingStatus>('Approval Pending');
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2, 3, 4, 5, 6]);

  // Form State for Interactive Simulation
  const [patientData, setPatientData] = useState({
    fullName: 'Mateo Morales',
    dateOfBirth: '2016-04-12',
    medicaidId: 'CO-984421008',
    address: '4820 Mountain Crest Dr, Denver, CO 80219',
    phone: '(303) 555-0142',
    emergencyContactName: 'Carlos Morales',
    emergencyContactPhone: '(303) 555-0199',
    emergencyContactRel: 'Uncle',
    responsiblePartyName: 'Elena Morales',
    responsiblePartyRel: 'Mother (Legal Guardian)',
    responsiblePartyPhone: '(303) 555-0142',
    responsiblePartyEmail: 'elena.morales@coloradomail.net',
    serviceProgram: 'IHSS' as ServiceType,
    waiverType: 'HCBS-CES (Children’s Extensive Support)',
    requestedHours: 28.5,
    caseManagerAgency: 'Rocky Mountain Human Services (RMHS)',
    caseManagerName: 'Sarah Jenkins, MSW',
    caseManagerEmail: 'sjenkins@rmhs.org',
    parStatus: 'State Review Underway (PAR-2026-9921)',
    authorizedHours: 28.5,
  });

  const [docsSent, setDocsSent] = useState(true);
  const [docsSigned, setDocsSigned] = useState(true);
  const [parApproved, setParApproved] = useState(false);

  const activeStep = PATIENT_STEPS.find((s) => s.stepNumber === activeStepNumber) || PATIENT_STEPS[0];

  const handleToggleStep = (stepNum: number) => {
    if (completedSteps.includes(stepNum)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepNum));
      notify('Step Reopened', `Step ${stepNum}: ${activeStep.title} is now in-progress.`, 'info');
    } else {
      const next = [...completedSteps, stepNum];
      setCompletedSteps(next);
      notify('Step Completed', `Step ${stepNum}: ${activeStep.title} marked completed!`, 'success');
      if (stepNum < 8) {
        setActiveStepNumber(stepNum + 1);
      }
      if (next.includes(8)) {
        setPatientStatus('Ready for Service');
      }
    }
  };

  const progressPercent = Math.round((completedSteps.length / PATIENT_STEPS.length) * 100);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 antialiased">
      {/* Top Breadcrumb & Dual Journey Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-bold text-slate-900">LiliSphere Onboarding</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-primary">Patient Journey (8 Steps)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('wizard')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Shared Overview Dashboard</span>
          </button>
          <button
            onClick={() => setActiveView('caregiver-flow')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-800 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Users className="w-3.5 h-3.5 text-secondary" />
            <span>Switch to Caregiver Flow (10 Steps)</span>
          </button>
        </div>
      </div>

      {/* Hero Banner with Home Page Brand Colors */}
      <div className="bg-gradient-to-r from-[#1b3614] via-[#2a3d20] to-[#3e6b2b] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-bold text-secondary mb-3">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              Patient Onboarding Journey • 8 Standard Steps
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Patient Registration &amp; Service Authorization
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-2 leading-relaxed max-w-2xl">
              <strong>Goal:</strong> Register the person who needs care, understand their specific clinical care needs, collect responsible party consent, coordinate with state case management, and obtain required service approvals.
            </p>

            {/* Sub-pill highlighting rule 5 */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-200 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00d084]" />
                Target Case: Mateo Morales (Child / Patient)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-200 font-medium">
                Rule 5: Patient readiness tracks separately from Caregiver readiness
              </span>
            </div>
          </div>

          {/* Status & Progress Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center shrink-0 min-w-[220px]">
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-bold">
              Current Patient Status
            </span>
            <div className="mt-1">
              <select
                value={patientStatus}
                onChange={(e) => {
                  setPatientStatus(e.target.value as PatientOnboardingStatus);
                  notify('Status Updated', `Patient status set to: ${e.target.value}`, 'info');
                }}
                className="bg-emerald-950/90 text-[#F2B632] font-black text-xs px-3 py-1.5 rounded-xl border border-emerald-700/60 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
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

            <div className="mt-4 pt-3 border-t border-white/15">
              <div className="flex items-center justify-between text-[11px] text-slate-200 font-semibold mb-1">
                <span>Journey Progress</span>
                <span className="text-[#00d084] font-black">{progressPercent}%</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-secondary to-[#00d084] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-300 mt-1 block">
                {completedSteps.length} of 8 Steps Completed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split-Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANE: 8 Steps List */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 flex flex-col">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                8 Patient Journey Steps
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Click any step to inspect &amp; execute operations
              </p>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-primary border border-emerald-200">
              {completedSteps.length}/8 Done
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {PATIENT_STEPS.map((step) => {
              const isSelected = step.stepNumber === activeStep.stepNumber;
              const isCompleted = completedSteps.includes(step.stepNumber);

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStepNumber(step.stepNumber)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-primary bg-primary-50/70 shadow-xs ring-1 ring-primary/30'
                      : 'border-slate-200/70 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStep(step.stepNumber);
                      }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                        isCompleted
                          ? 'bg-[#00d084] text-white shadow-xs'
                          : isSelected
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title={isCompleted ? 'Click to mark incomplete' : 'Click to mark complete'}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.stepNumber}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Step {step.stepNumber}
                        </span>
                        <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                          {step.category}
                        </span>
                      </div>
                      <p className={`text-xs font-bold leading-snug mt-0.5 ${isSelected ? 'text-primary-900' : 'text-slate-800'}`}>
                        {step.title}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {step.summary}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 mt-1">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-[#00d084]" />
                        Done
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-500" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Outcome Footer */}
          <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/70 p-3 rounded-2xl">
            <div className="flex items-start gap-2">
              <Award className="w-4 h-4 text-[#F2B632] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900">Final Outcome</p>
                <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                  Patient profile is ready, service requirements are recorded, and the required approvals are in place.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Interactive Step Inspector */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col space-y-5">
          {/* Step Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-primary-100 text-primary-900 font-bold text-xs">
                  Step {activeStep.stepNumber} of 8
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Responsible: <strong className="text-slate-700">{activeStep.responsibleParty}</strong>
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                {activeStep.title}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                {activeStep.summary}
              </p>
            </div>

            <button
              onClick={() => handleToggleStep(activeStep.stepNumber)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                completedSteps.includes(activeStep.stepNumber)
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                  : 'bg-primary text-white hover:bg-primary-800 shadow-sm'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {completedSteps.includes(activeStep.stepNumber) ? 'Mark Incomplete' : 'Complete Step'}
            </button>
          </div>

          {/* Requirements Checklist for this Step */}
          <div className="bg-[#fbfdfa] rounded-2xl border border-emerald-100 p-4">
            <h3 className="text-xs font-bold text-primary-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-primary" />
              Key Step Requirements &amp; Deliverables
            </h3>
            <ul className="space-y-1.5">
              {activeStep.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Step Workspace */}
          <div className="border border-slate-200/80 rounded-2xl p-5 bg-white space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center justify-between">
              <span>Step Workspace &amp; Live Actions</span>
              <span className="text-[10px] text-slate-400 font-normal">Interactive Simulation</span>
            </h3>

            {/* STEP 1: Patient Information */}
            {activeStep.stepNumber === 1 && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700">Patient Full Name</label>
                    <input
                      type="text"
                      value={patientData.fullName}
                      onChange={(e) => setPatientData({ ...patientData, fullName: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Date of Birth</label>
                    <input
                      type="date"
                      value={patientData.dateOfBirth}
                      onChange={(e) => setPatientData({ ...patientData, dateOfBirth: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Colorado Medicaid ID</label>
                    <input
                      type="text"
                      value={patientData.medicaidId}
                      onChange={(e) => setPatientData({ ...patientData, medicaidId: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-primary focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Contact Phone</label>
                    <input
                      type="text"
                      value={patientData.phone}
                      onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-slate-700">Residential Address</label>
                    <input
                      type="text"
                      value={patientData.address}
                      onChange={(e) => setPatientData({ ...patientData, address: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Emergency Contact Name</label>
                    <input
                      type="text"
                      value={patientData.emergencyContactName}
                      onChange={(e) => setPatientData({ ...patientData, emergencyContactName: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Emergency Contact Phone</label>
                    <input
                      type="text"
                      value={patientData.emergencyContactPhone}
                      onChange={(e) => setPatientData({ ...patientData, emergencyContactPhone: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => notify('Patient Profile Saved', 'Core demographic details updated successfully.', 'success')}
                    className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-800 transition-all cursor-pointer"
                  >
                    Save Patient Profile
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Family / Responsible Party Details */}
            {activeStep.stepNumber === 2 && (
              <div className="space-y-3">
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900">
                  <p className="font-bold">Legal Responsible Representative</p>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    For minor children or dependent adults, service consent and state documentation must be executed by the authorized parent or legal guardian.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700">Responsible Person Name</label>
                    <input
                      type="text"
                      value={patientData.responsiblePartyName}
                      onChange={(e) => setPatientData({ ...patientData, responsiblePartyName: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Relationship to Patient</label>
                    <input
                      type="text"
                      value={patientData.responsiblePartyRel}
                      onChange={(e) => setPatientData({ ...patientData, responsiblePartyRel: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Contact Phone</label>
                    <input
                      type="text"
                      value={patientData.responsiblePartyPhone}
                      onChange={(e) => setPatientData({ ...patientData, responsiblePartyPhone: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Contact Email</label>
                    <input
                      type="email"
                      value={patientData.responsiblePartyEmail}
                      onChange={(e) => setPatientData({ ...patientData, responsiblePartyEmail: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#00d084] shrink-0" />
                  <span className="text-slate-700">
                    Legal guardian authority verified against Colorado birth certificate &amp; guardianship decree.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 3: Select Service and Program */}
            {activeStep.stepNumber === 3 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-600 font-medium">
                  Select the care program needed to support Mateo’s daily activities:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(['IHSS', 'CNA', 'HMA', 'Personal Care', 'Homemaker'] as ServiceType[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        setPatientData({ ...patientData, serviceProgram: st });
                        notify('Service Updated', `Patient care program set to: ${st}`, 'info');
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        patientData.serviceProgram === st
                          ? 'border-primary bg-primary-50/80 shadow-xs ring-1 ring-primary'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">{st}</span>
                        {patientData.serviceProgram === st && (
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                        {st === 'IHSS' && 'In-Home Support Services (Family direct attendant)'}
                        {st === 'CNA' && 'Certified Nursing Assistant (Skilled medical tasks)'}
                        {st === 'HMA' && 'Health Maintenance Activities (Nurse-delegated)'}
                        {st === 'Personal Care' && 'Bathing, dressing, hygiene & transfers'}
                        {st === 'Homemaker' && 'Meal prep, light housekeeping & laundry'}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-primary-900">Current Program:</span>{' '}
                    <span className="text-slate-800 font-semibold">{patientData.serviceProgram} ({patientData.waiverType})</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Est: 28.5 hrs/wk
                  </span>
                </div>
              </div>
            )}

            {/* STEP 4: Add Caregiver Information */}
            {activeStep.stepNumber === 4 && (
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Linked Caregivers for Mateo Morales</span>
                    <span className="text-[10px] font-bold text-primary bg-primary-100 px-2 py-0.5 rounded">
                      Rule 2: Multi-Caregiver Enabled
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    One patient can have multiple caregivers (e.g. Mother as primary, Uncle as respite).
                  </p>
                </div>

                <div className="space-y-2">
                  {/* Primary Caregiver: Elena Morales */}
                  <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs">
                        EM
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900">Elena Morales</span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                            Mother / Primary (W-2)
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">ID: CG-801 • IHSS Attendant • 20 hrs/wk</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      Onboarding in Progress
                    </span>
                  </div>

                  {/* Secondary Caregiver: Carlos Morales */}
                  <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
                        CM
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900">Carlos Morales</span>
                          <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded">
                            Uncle / Respite (1099)
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">ID: CG-802 • Respite Care • 8.5 hrs/wk</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      Application Sent
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Rule 1 Verified:</strong> Patient (Mateo PAT-101) and Caregivers (Elena CG-801, Carlos CG-802) maintain completely separate profiles.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 5: Complete Patient Documents */}
            {activeStep.stepNumber === 5 && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-600">
                  Required patient documents sent to legal guardian (Elena Morales) for digital execution:
                </p>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">1. Client Intake &amp; Consent for Services</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Signed (Nov 15)
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">2. Colorado Medicaid Client Rights Notice</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Signed (Nov 15)
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">3. HIPAA Privacy &amp; Medical Release</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Signed (Nov 15)
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">4. Physician Order &amp; Care Attestation (485)</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Verified by Clinical Team
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> All 4 Patient Forms Executed
                  </span>
                  <button
                    onClick={() => notify('Packet Re-sent', 'Digital e-sign link re-sent to elena.morales@coloradomail.net', 'info')}
                    className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded-xl text-xs hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Re-send Envelope
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: Case Manager Coordination */}
            {activeStep.stepNumber === 6 && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700">Case Management Agency</label>
                    <input
                      type="text"
                      value={patientData.caseManagerAgency}
                      onChange={(e) => setPatientData({ ...patientData, caseManagerAgency: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Case Manager Name</label>
                    <input
                      type="text"
                      value={patientData.caseManagerName}
                      onChange={(e) => setPatientData({ ...patientData, caseManagerName: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Case Manager Secure Email</label>
                    <input
                      type="email"
                      value={patientData.caseManagerEmail}
                      onChange={(e) => setPatientData({ ...patientData, caseManagerEmail: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">State PAR Request Status</label>
                    <input
                      type="text"
                      value={patientData.parStatus}
                      onChange={(e) => setPatientData({ ...patientData, parStatus: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-amber-700 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">Communication Log</p>
                    <p className="text-[11px] text-slate-500">PAR Request submitted to RMHS on Nov 16, 2026. Follow-up SLA: 3 business days.</p>
                  </div>
                  <button
                    onClick={() => notify('Outreach Logged', 'Automated polite inquiry dispatched to Sarah Jenkins at RMHS.', 'success')}
                    className="px-3 py-1.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-800 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    Ping Case Manager
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: Service Plan and Authorization */}
            {activeStep.stepNumber === 7 && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900">State Service Plan Review</span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      {parApproved ? 'PAR Approved & Verified' : 'PAR Approval Pending'}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-800 mt-1">
                    Receive and verify approved services and weekly hours. Confirm what care can legally be provided under Colorado Medicaid.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Approved Weekly Hours</span>
                    <p className="text-xl font-black text-primary mt-1">28.5 hrs/wk</p>
                    <span className="text-[10px] text-slate-500">114 units/week (T1019-IHSS)</span>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Authorization Period</span>
                    <p className="text-sm font-bold text-slate-800 mt-1">12/01/2026 – 11/30/2027</p>
                    <span className="text-[10px] text-slate-500">Annual PAR Renewal</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <p className="font-bold text-slate-800 mb-1">Approved Care Task Scope (ADLs):</p>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#00d084]" /> Personal Hygiene &amp; Bathing
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#00d084]" /> Meal Preparation &amp; Feeding
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#00d084]" /> Ambulation &amp; Transfers
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#00d084]" /> Medication Reminder (IHSS)
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setParApproved(true);
                      notify('PAR Verified', 'State Prior Authorization letter verified and hours locked into EVV schedule.', 'success');
                    }}
                    className="px-4 py-2 bg-[#00d084] text-white font-bold rounded-xl text-xs hover:bg-emerald-600 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Verify &amp; Approve Service Plan
                  </button>
                </div>
              </div>
            )}

            {/* STEP 8: Patient Onboarding Completed */}
            {activeStep.stepNumber === 8 && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <div className="flex items-center gap-2 text-primary font-black text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#00d084]" />
                    Ready for Service Clearance
                  </div>
                  <p className="text-slate-700 mt-1 leading-relaxed">
                    Once applicable patient requirements and approvals are satisfied, mark the patient ready for service.
                  </p>
                </div>

                {/* Important System Rule 5 Alert */}
                <div className="p-4 bg-amber-50/80 border border-amber-300 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-900 font-bold">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    Crucial System Rule: Non-Cascading Completion
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    <strong>Rule 5:</strong> Patient onboarding completion must <strong>never</strong> automatically complete caregiver onboarding. Even though Mateo is ready for service, caregiver Elena Morales must still complete background checks, LearnWorlds training, and ADP activation before care shifts can begin.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-800">Final Patient Readiness Checklist:</p>
                  <div className="space-y-1 text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00d084]" />
                      <span>Patient Profile &amp; Emergency Contacts Complete</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00d084]" />
                      <span>Legal Guardian Responsible Party Document Package Executed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00d084]" />
                      <span>IHSS Service &amp; HCBS-CES Waiver Program Assigned</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00d084]" />
                      <span>Case Management Agency (RMHS) Synced &amp; PAR Approved</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setActiveView('wizard')}
                    className="px-3.5 py-2 text-slate-600 hover:text-slate-900 font-bold text-xs cursor-pointer"
                  >
                    View Shared Overview
                  </button>

                  <button
                    onClick={() => {
                      setPatientStatus('Ready for Service');
                      if (!completedSteps.includes(8)) {
                        setCompletedSteps([...completedSteps, 8]);
                      }
                      notify(
                        'Patient Onboarding Complete!',
                        'Mateo Morales is now Ready for Service. Note: Caregiver onboarding continues independently.',
                        'success'
                      );
                    }}
                    className="px-5 py-2.5 bg-primary text-white font-black rounded-xl text-xs hover:bg-primary-800 transition-all cursor-pointer flex items-center gap-2 shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#F2B632]" />
                    Mark Patient Ready for Service
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls Between Steps */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveStepNumber(Math.max(1, activeStep.stepNumber - 1))}
              disabled={activeStep.stepNumber === 1}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                activeStep.stepNumber === 1
                  ? 'border-slate-200 text-slate-400 cursor-not-allowed bg-slate-50'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer'
              }`}
            >
              Previous Step
            </button>

            <span className="text-xs text-slate-400 font-medium">
              Step {activeStep.stepNumber} of 8
            </span>

            <button
              onClick={() => setActiveStepNumber(Math.min(8, activeStep.stepNumber + 1))}
              disabled={activeStep.stepNumber === 8}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                activeStep.stepNumber === 8
                  ? 'border-slate-200 text-slate-400 cursor-not-allowed bg-slate-50'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer'
              }`}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

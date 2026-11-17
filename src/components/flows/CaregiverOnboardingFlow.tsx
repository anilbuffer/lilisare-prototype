'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { CaregiverClassification, CaregiverOnboardingStatus } from '@/lib/types';
import {
  Users,
  CheckCircle2,
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
  ChevronRight,
  Check,
  Mail,
  Phone,
  MapPin,
  Upload,
  RefreshCw,
  FileCheck,
  Award,
  AlertCircle,
  GraduationCap,
  Calendar,
  Briefcase
} from 'lucide-react';

interface CaregiverStepItem {
  stepNumber: number;
  title: string;
  phase: 'Phase 1: Profile & Application' | 'Phase 2: Documents & Screening' | 'Phase 3: Training & Validation' | 'Phase 4: Payroll & Activation';
  roleResponsible: string;
  description: string;
  bullets: string[];
  systemAutomation: string;
}

const CAREGIVER_STEPS: CaregiverStepItem[] = [
  {
    stepNumber: 1,
    title: 'Add Caregiver Profile',
    phase: 'Phase 1: Profile & Application',
    roleResponsible: 'Staff / Care Coordinator',
    description: 'Staff adds the caregiver profile and links them to the relevant patient.',
    bullets: [
      'Full legal name and contact details (phone, email)',
      'Residential address and living arrangement',
      'Relationship to patient (e.g. Mother, Father, Family Friend)',
      'Link to relevant patient record (e.g. Mateo Morales - PAT-101)'
    ],
    systemAutomation: 'Creates separate caregiver profile in LiliSphere with linked client ID (satisfying Rule 1).'
  },
  {
    stepNumber: 2,
    title: 'Select Caregiver Type',
    phase: 'Phase 1: Profile & Application',
    roleResponsible: 'Staff / Onboarding Lead',
    description: 'Identify the caregiver’s working classification to trigger correct document packages.',
    bullets: [
      'Employee (W-2): Typically for family members under IHSS / CNA programs (~20 documents)',
      '1099 Independent Contractor: Typically for independent respite attendants (~15 documents)',
      'Both Employee & Contractor: Combined packet for dual roles'
    ],
    systemAutomation: 'Rule 4 Engine automatically locks in classification and selects corresponding document bundle.'
  },
  {
    stepNumber: 3,
    title: 'Send Caregiver Application',
    phase: 'Phase 1: Profile & Application',
    roleResponsible: 'System Automation',
    description: 'The system sends a personalized application link to the caregiver via email/SMS.',
    bullets: [
      'Automated email with secure magic link dispatched to caregiver',
      'Caregiver opens link on mobile or desktop without needing app install',
      'Caregiver reviews and confirms personal data, tax identification, and disclosures',
      'Tracks email delivery, open rate, and submission timestamps'
    ],
    systemAutomation: 'Generates secure, authenticated self-service portal link with 7-day expiration.'
  },
  {
    stepNumber: 4,
    title: 'Complete Required Documents',
    phase: 'Phase 2: Documents & Screening',
    roleResponsible: 'Caregiver (Self-Service)',
    description: 'System automatically selects correct document package; caregiver uploads files.',
    bullets: [
      'Employee bundle: approximately 20 documents (W-4, I-9, Direct Deposit, Code of Conduct, etc.)',
      'Contractor bundle: approximately 15 documents (W-9, 1099 Agreement, Direct Deposit, etc.)',
      'Both bundle: Combined comprehensive package',
      'Caregiver snaps photos or uploads PDFs directly in self-service portal'
    ],
    systemAutomation: 'OCR checks uploaded files for readability and categorizes them automatically.'
  },
  {
    stepNumber: 5,
    title: 'Document Verification',
    phase: 'Phase 2: Documents & Screening',
    roleResponsible: 'Internal Onboarding Staff',
    description: 'Internal staff reviews submitted documents for accuracy and validity.',
    bullets: [
      'Mark documents: Approved, Rejected / incorrect, or Pending',
      'Missing or incorrect documents immediately trigger automated reminders to caregiver',
      'Verification timestamp and staff auditor ID logged in compliance audit trail'
    ],
    systemAutomation: 'Sends automated SMS/email reminder alerts for rejected or un-submitted items.'
  },
  {
    stepNumber: 6,
    title: 'Background Checks',
    phase: 'Phase 2: Documents & Screening',
    roleResponsible: 'System / Compliance Lead',
    description: 'Complete applicable background screenings and record results against profile.',
    bullets: [
      'Colorado Bureau of Investigation (CBI) criminal fingerprint clearance',
      'HHS-OIG List of Excluded Individuals/Entities (LEIE) check',
      'Colorado Courts criminal records & National Sex Offender registry',
      'Colorado DMV driving record (if transportation is provided)'
    ],
    systemAutomation: 'Integrates with CBI database to log clearance dates and automate annual re-checks.'
  },
  {
    stepNumber: 7,
    title: 'Training and Orientation',
    phase: 'Phase 3: Training & Validation',
    roleResponsible: 'Caregiver (LearnWorlds LMS)',
    description: 'Caregiver completes required coursework, quizzes, orientation video, and meeting.',
    bullets: [
      'Required training modules: Infection Control, Client Rights & HIPAA, EVV Time Tracking',
      'Pass required quizzes with 85%+ passing threshold',
      'Watch mandatory LiliSare company orientation video',
      'Attend 15-minute post-orientation virtual meeting with onboarding coordinator'
    ],
    systemAutomation: 'Webhook from LearnWorlds LMS automatically logs course completion and quiz scores.'
  },
  {
    stepNumber: 8,
    title: 'Skills Validation',
    phase: 'Phase 3: Training & Validation',
    roleResponsible: 'Registered Nurse (RN) Clinical Supervisor',
    description: 'LiliSare checks whether the caregiver is qualified to provide the selected service.',
    bullets: [
      'Evaluate competency in Activities of Daily Living (ADLs): Bathing, Transfers, Mobility',
      'Verify service-specific qualifications (IHSS Family Attendant or CNA License)',
      'Clinical supervisor digital signoff and skills competency certificate issued'
    ],
    systemAutomation: 'Pre-populates clinical checklist based on patient’s authorized tasks (e.g. Mateo’s ADLs).'
  },
  {
    stepNumber: 9,
    title: 'Payroll Profile Setup',
    phase: 'Phase 4: Payroll & Activation',
    roleResponsible: 'Staff / ADP Integration',
    description: 'Create relevant employee or contractor profile in ADP according to applicable process.',
    bullets: [
      'For W-2 Employees: Provision profile in ADP Run with W-4 tax withholding',
      'For 1099 Contractors: Provision contractor profile in ADP Workforce Now with W-9',
      'Verify direct deposit bank account and routing details',
      'Assign hourly wage rate (e.g. $28.50/hr IHSS)'
    ],
    systemAutomation: 'Automated API sync pushes validated demographics, tax data, and pay rate into ADP.'
  },
  {
    stepNumber: 10,
    title: 'Final Approval and Activation',
    phase: 'Phase 4: Payroll & Activation',
    roleResponsible: 'Onboarding Lead & System',
    description: 'Check that all applicable requirements are complete, then activate the caregiver.',
    bullets: [
      'Verify all 9 prior onboarding steps are 100% satisfied',
      'Verify patient service conditions and state authorization are aligned',
      'Release caregiver profile for EVV clock-in and schedule assignment',
      'Send congratulations activation SMS/email to caregiver'
    ],
    systemAutomation: 'Unlocks mobile EVV clock-in permissions and connects shift calendar.'
  }
];

export function CaregiverOnboardingFlow() {
  const { notify, setActiveView } = usePortal();
  const [activeStepNumber, setActiveStepNumber] = useState<number>(1);
  const [caregiverStatus, setCaregiverStatus] = useState<CaregiverOnboardingStatus>('Training Pending');
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2, 3, 4, 5, 6]);

  // Caregiver Interactive State
  const [caregiverData, setCaregiverData] = useState({
    fullName: 'Elena Morales',
    phone: '(303) 555-0142',
    email: 'elena.morales@coloradomail.net',
    address: '4820 Mountain Crest Dr, Denver, CO 80219',
    relationship: 'Mother',
    linkedPatientName: 'Mateo Morales',
    linkedPatientId: 'PAT-101',
    classification: 'Employee (W-2)' as CaregiverClassification,
    hourlyRate: 28.50,
  });

  // Step 4 & 5 Mock Documents
  const [docList, setDocList] = useState([
    { id: 'd1', name: 'Form W-4 Federal Tax Withholding', status: 'Approved', category: 'Tax' },
    { id: 'd2', name: 'Form I-9 Employment Eligibility Verification', status: 'Approved', category: 'Legal' },
    { id: 'd3', name: 'Direct Deposit Voided Check / Bank Letter', status: 'Approved', category: 'Payroll' },
    { id: 'd4', name: 'Government Issued Photo ID (Colorado Driver License)', status: 'Approved', category: 'Identity' },
    { id: 'd5', name: 'LiliSare Caregiver Mutual Consent Agreement', status: 'Approved', category: 'Company' },
    { id: 'd6', name: 'Family Caregiver Attestation Form', status: 'Approved', category: 'Company' },
    { id: 'd7', name: 'Social Security Card Verification', status: 'Approved', category: 'Identity' },
    { id: 'd8', name: 'Proof of Residence (Utility Bill)', status: 'Approved', category: 'Identity' },
    { id: 'd9', name: 'Code of Ethics & HIPAA Agreement', status: 'Approved', category: 'Compliance' },
    { id: 'd10', name: 'Emergency Contact Form', status: 'Approved', category: 'Company' },
    { id: 'd11', name: 'Tuberculosis (TB) Symptom Questionnaire', status: 'Approved', category: 'Clinical' },
    { id: 'd12', name: 'CPR / First Aid Attestation', status: 'Pending', category: 'Clinical' },
  ]);

  // Background screening state
  const [cbiCleared, setCbiCleared] = useState(true);
  const [oigCleared, setOigCleared] = useState(true);

  // Training state
  const [quizScore, setQuizScore] = useState(96);
  const [videoWatched, setVideoWatched] = useState(true);
  const [meetingScheduled, setMeetingScheduled] = useState(true);

  // Skills validation
  const [rnValidated, setRnValidated] = useState(false);

  // ADP setup
  const [adpCreated, setAdpCreated] = useState(false);

  const activeStep = CAREGIVER_STEPS.find((s) => s.stepNumber === activeStepNumber) || CAREGIVER_STEPS[0];

  const handleToggleStep = (stepNum: number) => {
    if (completedSteps.includes(stepNum)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepNum));
      notify('Step Reopened', `Step ${stepNum}: ${activeStep.title} is now in-progress.`, 'info');
    } else {
      const next = [...completedSteps, stepNum];
      setCompletedSteps(next);
      notify('Step Completed', `Step ${stepNum}: ${activeStep.title} marked completed!`, 'success');
      if (stepNum < 10) {
        setActiveStepNumber(stepNum + 1);
      }
      if (next.includes(10)) {
        setCaregiverStatus('Active');
      }
    }
  };

  const progressPercent = Math.round((completedSteps.length / CAREGIVER_STEPS.length) * 100);

  const totalDocsCount = caregiverData.classification === 'Employee (W-2)' ? 20 : caregiverData.classification === 'Independent Contractor (1099)' ? 15 : 25;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 antialiased">
      {/* Top Breadcrumb & Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-bold text-slate-900">LiliSphere Onboarding</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-primary">Caregiver Journey (10 Steps)</span>
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
            onClick={() => setActiveView('patient-flow')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-800 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Users className="w-3.5 h-3.5 text-secondary" />
            <span>Switch to Patient Flow (8 Steps)</span>
          </button>
        </div>
      </div>

      {/* Hero Banner with Home Page Brand Colors */}
      <div className="bg-gradient-to-r from-[#1b3614] via-[#2a3d20] to-[#3e6b2b] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-bold text-secondary mb-3">
              <UserCheck className="w-3.5 h-3.5 text-[#00d084]" />
              Caregiver Onboarding Journey • 10 Standard Steps
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Caregiver Verification, Training &amp; Activation
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-2 leading-relaxed max-w-2xl">
              <strong>Goal:</strong> Register the caregiver, collect required documents, complete checks and training, and prepare them to provide care.
            </p>

            {/* Sub-pill highlighting rule 5 */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-200 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00d084]" />
                Target Caregiver: Elena Morales (Mother / Primary)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-200 font-medium">
                Linked Patient: Mateo Morales (PAT-101) • Independent Progression
              </span>
            </div>
          </div>

          {/* Status & Progress Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center shrink-0 min-w-[220px]">
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-bold">
              Current Caregiver Status
            </span>
            <div className="mt-1">
              <select
                value={caregiverStatus}
                onChange={(e) => {
                  setCaregiverStatus(e.target.value as CaregiverOnboardingStatus);
                  notify('Status Updated', `Caregiver status set to: ${e.target.value}`, 'info');
                }}
                className="bg-emerald-950/90 text-[#F2B632] font-black text-xs px-3 py-1.5 rounded-xl border border-emerald-700/60 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
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
                {completedSteps.length} of 10 Steps Completed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split-Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANE: 10 Steps List */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 flex flex-col">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-primary" />
                10 Caregiver Journey Steps
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Click any step to inspect &amp; execute operations
              </p>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-primary border border-emerald-200">
              {completedSteps.length}/10 Done
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {CAREGIVER_STEPS.map((step) => {
              const isSelected = step.stepNumber === activeStep.stepNumber;
              const isCompleted = completedSteps.includes(step.stepNumber);

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStepNumber(step.stepNumber)}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex items-start justify-between gap-3 ${
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
                          {step.phase.split(':')[0]}
                        </span>
                      </div>
                      <p className={`text-xs font-bold leading-snug mt-0.5 ${isSelected ? 'text-primary-900' : 'text-slate-800'}`}>
                        {step.title}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {step.description}
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
                  Caregiver is onboarded, verified, trained and ready to provide approved services.
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
                  Step {activeStep.stepNumber} of 10
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Responsible: <strong className="text-slate-700">{activeStep.roleResponsible}</strong>
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                {activeStep.title}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                {activeStep.description}
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

            {/* STEP 1: Add Caregiver Profile */}
            {activeStep.stepNumber === 1 && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-primary-900">Linked to Patient:</span>{' '}
                    <span className="text-slate-800 font-semibold">{caregiverData.linkedPatientName} ({caregiverData.linkedPatientId})</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Separate Profile: CG-801
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700">Caregiver Full Name</label>
                    <input
                      type="text"
                      value={caregiverData.fullName}
                      onChange={(e) => setCaregiverData({ ...caregiverData, fullName: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Relationship with Patient</label>
                    <input
                      type="text"
                      value={caregiverData.relationship}
                      onChange={(e) => setCaregiverData({ ...caregiverData, relationship: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Contact Phone</label>
                    <input
                      type="text"
                      value={caregiverData.phone}
                      onChange={(e) => setCaregiverData({ ...caregiverData, phone: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">Contact Email</label>
                    <input
                      type="email"
                      value={caregiverData.email}
                      onChange={(e) => setCaregiverData({ ...caregiverData, email: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-slate-700">Residential Address</label>
                    <input
                      type="text"
                      value={caregiverData.address}
                      onChange={(e) => setCaregiverData({ ...caregiverData, address: e.target.value })}
                      className="mt-1 w-full p-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => notify('Caregiver Profile Saved', 'Elena Morales profile linked to Mateo Morales.', 'success')}
                    className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-800 transition-all cursor-pointer"
                  >
                    Save Caregiver Profile
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Select Caregiver Type */}
            {activeStep.stepNumber === 2 && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="font-bold text-amber-900">Rule 4 in Action: Automated Package Selection</span>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    The system automatically selects the correct document package based on caregiver classification.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { type: 'Employee (W-2)', docs: '~20 Documents', desc: 'Standard for family members providing IHSS/CNA services. Withholds federal and CO state taxes.' },
                    { type: 'Independent Contractor (1099)', docs: '~15 Documents', desc: 'For independent respite or non-exclusive attendants. Receives 1099-NEC annually.' },
                    { type: 'Dual (Employee + Contractor)', docs: 'Combined Package', desc: 'For caregivers working W-2 shifts for family and 1099 respite for other clients.' }
                  ].map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => {
                        setCaregiverData({ ...caregiverData, classification: item.type as CaregiverClassification });
                        notify('Classification Updated', `Caregiver set to: ${item.type}`, 'info');
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        caregiverData.classification === item.type
                          ? 'border-primary bg-primary-50/80 shadow-xs ring-1 ring-primary'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">{item.type}</span>
                        {caregiverData.classification === item.type && (
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <span className="inline-block mt-1 text-[10px] font-black text-primary bg-primary-100/70 px-2 py-0.5 rounded">
                        {item.docs}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {item.desc}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Selected Working Classification:</span>
                  <span className="font-black text-primary">{caregiverData.classification} ({totalDocsCount} documents required)</span>
                </div>
              </div>
            )}

            {/* STEP 3: Send Caregiver Application */}
            {activeStep.stepNumber === 3 && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-600">
                  The system dispatches a personalized mobile application link directly to Elena Morales.
                </p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Recipient Email:</span>
                    <strong className="text-slate-800">{caregiverData.email}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Subject:</span>
                    <span className="text-slate-800 font-medium">Welcome to LiliSare — Start Your Caregiver Onboarding for Mateo</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Secure Magic Link:</span>
                    <span className="text-primary font-mono text-[10px]">https://lilisphere.care/cg/invite?token=cg_morales_9981</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00d084]" />
                    Application Submitted by Caregiver on Mobile
                  </span>
                  <button
                    onClick={() => notify('Application Link Sent', `Magic link re-dispatched to ${caregiverData.email}`, 'success')}
                    className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-800 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send / Re-send Link
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Complete Required Documents */}
            {activeStep.stepNumber === 4 && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">
                    Uploaded Document Packet ({docList.filter((d) => d.status === 'Approved').length} of {totalDocsCount} Received)
                  </span>
                  <span className="text-[10px] font-bold text-primary bg-primary-100 px-2 py-0.5 rounded">
                    Auto-selected: {caregiverData.classification}
                  </span>
                </div>

                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {docList.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between hover:bg-slate-50/60"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-800">{doc.name}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 font-semibold">
                          {doc.category}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        doc.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <button
                    onClick={() => notify('Reminder Dispatched', 'Automated SMS sent to caregiver for missing CPR verification.', 'info')}
                    className="text-amber-700 hover:underline font-bold"
                  >
                    Send Missing Document Reminder
                  </button>
                  <button
                    onClick={() => notify('Document Uploaded', 'Simulated file upload successful.', 'success')}
                    className="px-3 py-1.5 border border-primary text-primary font-bold rounded-xl hover:bg-primary-50 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload Additional Document
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Document Verification */}
            {activeStep.stepNumber === 5 && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-600">
                  Internal staff reviews submitted documents and marks: <strong>Approved</strong>, <strong>Rejected / incorrect</strong>, or <strong>Pending</strong>.
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Verification Queue</span>
                    <span className="text-[10px] text-slate-500">Auditor: Danielle Brooks</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                      <p className="text-lg font-black text-emerald-700">11</p>
                      <p className="text-[10px] font-bold text-emerald-800 uppercase">Approved</p>
                    </div>
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                      <p className="text-lg font-black text-amber-700">1</p>
                      <p className="text-[10px] font-bold text-amber-800 uppercase">Pending Review</p>
                    </div>
                    <div className="p-2 rounded-xl bg-rose-50 border border-rose-200">
                      <p className="text-lg font-black text-rose-700">0</p>
                      <p className="text-[10px] font-bold text-rose-800 uppercase">Rejected</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => notify('Reminder Dispatched', 'Automated reminders sent to Elena Morales for pending items.', 'info')}
                    className="px-3 py-1.5 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50"
                  >
                    Trigger Missing Doc Reminder
                  </button>
                  <button
                    onClick={() => notify('All Approved', 'All 12 documents verified and audit stamped.', 'success')}
                    className="px-3.5 py-1.5 bg-[#00d084] text-white font-bold rounded-xl hover:bg-emerald-600 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve All Documents
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: Background Checks */}
            {activeStep.stepNumber === 6 && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-600">
                  Colorado Bureau of Investigation (CBI) &amp; federal screenings executed and recorded against Elena’s profile:
                </p>

                <div className="space-y-2">
                  <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">Colorado Bureau of Investigation (CBI) Fingerprints</span>
                      <p className="text-[11px] text-slate-500">Record ID: CBI-CO-2026-8819 • Cleared on Nov 14, 2026</p>
                    </div>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#00d084]" /> Cleared
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">HHS-OIG List of Excluded Individuals (LEIE)</span>
                      <p className="text-[11px] text-slate-500">Federal exclusion check • No exclusions found</p>
                    </div>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#00d084]" /> Cleared
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">Colorado Courts &amp; Sex Offender Registry</span>
                      <p className="text-[11px] text-slate-500">Verified clean judicial record</p>
                    </div>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#00d084]" /> Cleared
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-[11px] text-emerald-700 font-bold">
                  <span>Annual CBI Renewal Scheduled for Nov 14, 2027</span>
                  <button
                    onClick={() => notify('Screening Re-verified', 'CBI API poll refreshed: All background checks confirmed passed.', 'success')}
                    className="px-3 py-1.5 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                  >
                    Re-check CBI API
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: Training and Orientation */}
            {activeStep.stepNumber === 7 && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="text-[10px] uppercase font-bold text-slate-400">LearnWorlds LMS Courses</span>
                    <p className="text-xl font-black text-primary mt-1">4 of 4 Completed</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Average Quiz Score: {quizScore}%</span>
                  </div>

                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Orientation Video</span>
                    <p className="text-sm font-bold text-slate-800 mt-1">100% Watched &amp; Attested</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Digital Attestation Timestamped</span>
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-bold text-slate-900">Post-Orientation Virtual Meeting</p>
                      <p className="text-[11px] text-slate-500">15-min 1-on-1 with Onboarding Coordinator (Danielle)</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Meeting Completed
                  </span>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => notify('Training Synced', 'LearnWorlds LMS webhook refreshed. All coursework 100% satisfied.', 'success')}
                    className="px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-800 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Confirm Training &amp; Orientation
                  </button>
                </div>
              </div>
            )}

            {/* STEP 8: Skills Validation */}
            {activeStep.stepNumber === 8 && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-600">
                  LiliSare checks whether Elena Morales is qualified to provide the authorized care tasks for Mateo:
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-800">RN Competency Checklist (IHSS Attendant):</p>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded text-primary" />
                      <span>Hygiene &amp; Bed Bathing</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded text-primary" />
                      <span>Transfer &amp; Ambulation Assist</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded text-primary" />
                      <span>Feeding &amp; Meal Preparation</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded text-primary" />
                      <span>Medication Reminder Protocol</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[11px] text-slate-500">
                    Clinical Supervisor: <strong>Rachel Vance, RN (License CO-RN-88412)</strong>
                  </span>
                  <button
                    onClick={() => {
                      setRnValidated(true);
                      notify('Skills Validated', 'RN Clinical Supervisor signature executed and skills verified.', 'success');
                    }}
                    className="px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-800 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                    RN Skills Signoff
                  </button>
                </div>
              </div>
            )}

            {/* STEP 9: Payroll Profile Setup */}
            {activeStep.stepNumber === 9 && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">ADP Payroll System Setup</span>
                    <span className="text-[10px] font-bold text-primary bg-primary-100 px-2 py-0.5 rounded">
                      ADP Run (W-2 Employee)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500">Pay Rate:</span>
                      <p className="font-bold text-slate-800">${caregiverData.hourlyRate.toFixed(2)} / hour</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Pay Frequency:</span>
                      <p className="font-bold text-slate-800">Bi-Weekly Direct Deposit</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Direct Deposit:</span>
                      <p className="font-bold text-emerald-700">Routing &amp; Acct Verified (Chase)</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Tax Withholding:</span>
                      <p className="font-bold text-slate-800">Form W-4 Synced</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setAdpCreated(true);
                      notify('ADP Profile Created', 'Caregiver employee record provisioned in ADP Run with active direct deposit.', 'success');
                    }}
                    className="px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-800 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-secondary" />
                    Create ADP Profile
                  </button>
                </div>
              </div>
            )}

            {/* STEP 10: Final Approval and Activation */}
            {activeStep.stepNumber === 10 && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <div className="flex items-center gap-2 text-primary font-black text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#00d084]" />
                    Ready for Activation Clearance
                  </div>
                  <p className="text-slate-700 mt-1 leading-relaxed">
                    Check that all applicable requirements are complete, including required background checks, training, and service conditions. Once satisfied, activate the caregiver.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <p className="font-bold text-slate-800">Caregiver Activation Criteria:</p>
                  <div className="space-y-1 text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00d084]" />
                      <span>Caregiver Demographics &amp; Classification Set (Employee W-2)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00d084]" />
                      <span>All Required Documents Uploaded &amp; Verified (20 Documents)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00d084]" />
                      <span>CBI Fingerprint &amp; Federal Background Checks Cleared</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00d084]" />
                      <span>LearnWorlds Courses, Quizzes (96%), and Orientation Video Done</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00d084]" />
                      <span>RN Skills Competency Validated</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00d084]" />
                      <span>ADP Payroll Profile Active</span>
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
                      setCaregiverStatus('Active');
                      if (!completedSteps.includes(10)) {
                        setCompletedSteps([...completedSteps, 10]);
                      }
                      notify(
                        'Caregiver Activated!',
                        'Elena Morales is now Active and authorized to clock into EVV shifts.',
                        'success'
                      );
                    }}
                    className="px-5 py-2.5 bg-[#00d084] text-white font-black rounded-xl text-xs hover:bg-emerald-600 transition-all cursor-pointer flex items-center gap-2 shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    Activate Caregiver &amp; Release EVV Shifts
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
              Step {activeStep.stepNumber} of 10
            </span>

            <button
              onClick={() => setActiveStepNumber(Math.min(10, activeStep.stepNumber + 1))}
              disabled={activeStep.stepNumber === 10}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                activeStep.stepNumber === 10
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

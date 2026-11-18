'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePortal } from '@/lib/store/portal-context';
import { CaregiverClassification, CaregiverApplicant, CaregiverIntakeStage } from '@/lib/types';
import { DocumentUploadItem, UploadedFileMeta } from '@/components/ui/DocumentUploadItem';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  User,
  ShieldCheck,
  Building,
  Upload,
  CreditCard,
  Video,
  X,
  Briefcase,
  Sparkles,
} from 'lucide-react';

interface CaregiverRegisterWizardProps {
  onBackToHome?: () => void;
  onSwitchToPatient?: () => void;
  onClose?: () => void;
  initialStage?: CaregiverIntakeStage;
  onApplicantCreated?: (applicant: Partial<CaregiverApplicant>) => void;
}

export function CaregiverOnboardingFlow({
  onBackToHome,
  onSwitchToPatient,
  onClose,
  initialStage,
  onApplicantCreated,
}: CaregiverRegisterWizardProps) {
  const router = useRouter();
  const { notify, setActiveView, submitRegistrationApplication } = usePortal();
  const [step, setStep] = useState<number>(1);
  const [submittedAppNumber, setSubmittedAppNumber] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    // Step 1: Caregiver Profile
    firstName: 'Elena',
    lastName: 'Morales',
    phone: '(303) 555-0142',
    email: 'elena.morales@coloradomail.net',
    street: '4820 Mountain Crest Dr',
    city: 'Denver',
    state: 'CO',
    zip: '80219',
    relationship: 'Mother',
    linkedPatient: 'Mateo Morales',

    // Step 2: Caregiver Type
    classification: 'Employee (W-2)' as CaregiverClassification,

    // Step 3: Application
    appConfirmed: true,

    // Step 4: Documents
    docsUploaded: true,

    // Step 5: Document Verification
    docsVerified: true,

    // Step 6: Background Checks
    cbiCleared: true,

    // Step 7: Training and Orientation
    trainingDone: true,

    // Step 8: Skills Validation
    rnApproved: true,
    nurseName: 'Rachel Vance, RN',

    // Step 9: Payroll Profile Setup
    hourlyRate: 28.50,
    bankName: 'Chase Bank',
    routingNumber: '••••1240',
    accountNumber: '••••7821',

    // Step 10: Final Activation
    activated: true,
  });

  // Interactive Uploaded Documents State
  const [caregiverDocs, setCaregiverDocs] = useState<{
    id: string;
    title: string;
    description: string;
    required: boolean;
    file: UploadedFileMeta | null;
  }[]>([
    {
      id: 'doc-id',
      title: 'Driver License / Government Photo ID',
      description: 'Clear color copy of Colorado Driver License or State ID (front & back).',
      required: true,
      file: {
        name: 'colorado_drivers_license_elena.jpg',
        size: '3.2 MB',
        uploadedAt: 'Today, 09:16 AM',
      },
    },
    {
      id: 'doc-ssn',
      title: 'Social Security Card',
      description: 'Required for Colorado payroll tax compliance and IHSS background verification.',
      required: true,
      file: {
        name: 'social_security_card_elena.pdf',
        size: '1.1 MB',
        uploadedAt: 'Today, 09:18 AM',
      },
    },
    {
      id: 'doc-i9',
      title: 'Form I-9 Employment Eligibility Verification',
      description: 'USCIS verification confirming legal authorization to work in the United States.',
      required: true,
      file: {
        name: 'elena_morales_form_i9_signed.pdf',
        size: '2.1 MB',
        uploadedAt: 'Today, 09:14 AM',
      },
    },
    {
      id: 'doc-w4',
      title: 'Form W-4 Federal Tax Withholding',
      description: 'IRS Employee withholding certificate for Colorado payroll setup.',
      required: true,
      file: {
        name: 'elena_morales_w4_2026.pdf',
        size: '1.4 MB',
        uploadedAt: 'Today, 09:12 AM',
      },
    },
    {
      id: 'doc-direct-deposit',
      title: 'Direct Deposit Authorization Form & Voided Check',
      description: 'Routing and account verification for bi-weekly EVV payroll disbursement.',
      required: true,
      file: {
        name: 'firstbank_voided_check_elena.png',
        size: '840 KB',
        uploadedAt: 'Today, 09:15 AM',
      },
    },
    {
      id: 'doc-consent',
      title: 'Caregiver Mutual Consent Agreement',
      description: 'Family care agreement acknowledging client care tasks and in-home responsibilities.',
      required: true,
      file: {
        name: 'caregiver_mutual_consent_signed.pdf',
        size: '950 KB',
        uploadedAt: 'Today, 09:20 AM',
      },
    },
    {
      id: 'doc-tb',
      title: 'TB Symptom Questionnaire & Attestation',
      description: 'Annual Colorado CDPHE infection control symptom screening questionnaire.',
      required: false,
      file: {
        name: 'tb_questionnaire_elena.pdf',
        size: '620 KB',
        uploadedAt: 'Today, 09:21 AM',
      },
    },
  ]);

  const handleUploadDoc = (docId: string, fileMeta: UploadedFileMeta) => {
    setCaregiverDocs((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, file: fileMeta } : d))
    );
    notify('Document Uploaded', `${fileMeta.name} uploaded successfully.`, 'success');
  };

  const handleRemoveDoc = (docId: string) => {
    setCaregiverDocs((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, file: null } : d))
    );
    notify('Document Removed', 'File cleared. You can upload a new document.', 'info');
  };

  const totalSteps = 10;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleComplete = () => {
    const appNumber = submitRegistrationApplication({
      type: 'Caregiver',
      fullName: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      address: form.street,
      city: form.city,
      state: form.state,
      zip: form.zip,
      linkedEntityName: `${form.linkedPatient} (${form.relationship})`,
      serviceOrClassification: `${form.classification} • IHSS Family Caregiver`,
      payload: { ...form },
    });
    if (onApplicantCreated) {
      onApplicantCreated({
        name: `${form.firstName} ${form.lastName}`,
        role: form.relationship && form.relationship !== 'Non-Family' ? 'IHSS' : 'CNA',
        classificationType: form.classification.includes('1099') ? '1099' : 'Employee',
        stage: initialStage || 'New Application',
        currentStep: 1,
        totalSteps: 7,
        stepLabel: 'Application logged',
        source: 'Website',
        county: form.city ? `${form.city} County` : 'Denver County',
        recruiter: 'Alicia T.',
        recruiterInitials: 'AT',
        daysInStage: 0,
        phone: form.phone,
        email: form.email,
        targetSchedule: 'Full-Time (30-40 hrs/wk)',
        targetRate: '$21.50 - $24.00/hr',
        appliedDate: 'Today',
        cbiPending: true,
      });
    }
    setSubmittedAppNumber(appNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exitWizard = () => {
    if (onClose) {
      onClose();
    } else if (onBackToHome) {
      onBackToHome();
    } else {
      setActiveView('landing');
    }
  };

  const stepTitles = [
    'Caregiver Profile',
    'Caregiver Type',
    'Application',
    'Required Documents',
    'Document Verification',
    'Background Checks',
    'Training & Orientation',
    'Skills Validation',
    'Payroll Setup',
    'Review & Submit'
  ];

  return (
    <div className="min-h-screen flex w-full bg-[#f4f7f6] text-slate-900 antialiased select-none relative">
      {/* Floating Close Button for Modal Mode */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="fixed top-4 right-4 z-50 px-3.5 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md border border-slate-200 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold active:scale-95"
          title="Close and return to portal"
        >
          <X className="w-4 h-4" />
          <span>Close</span>
        </button>
      )}
      {/* LEFT SIDEBAR: Warm Organic LiliSare Forest Gradient Pane (Matching Reference Screenshot) */}
      <aside className="w-64 lg:w-72 h-screen sticky top-0 shrink-0 bg-gradient-to-b from-[#55823a] via-[#436c2a] to-[#2b4919] text-white flex flex-col justify-between p-6 border-r border-[#243e15] shadow-xl z-20 hidden md:flex relative overflow-hidden">
        {/* Ambient Branded Watermark Emblem (Exact Official LiliSare Lotus & Heart Line Art) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
          <img
            src="/images/lilisare-watermark.png"
            alt=""
            className="absolute -right-16 bottom-20 w-80 max-w-none opacity-10 pointer-events-none transform -rotate-12"
          />
          <img
            src="/images/lilisare-watermark-white.png"
            alt=""
            className="absolute -left-16 top-1/4 w-72 max-w-none opacity-5 pointer-events-none transform rotate-6"
          />
        </div>

        {/* Top Branding & Step Progress */}
        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-sm">
              <img src="/images/lilisare-icon.png" alt="LiliSare" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-xs font-bold text-white tracking-tight">LiliSare Colorado</p>
              <p className="text-[10px] text-emerald-200 font-medium">Caregiver Onboarding</p>
            </div>
          </div>

          {/* State Medicaid Badge */}
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d084] animate-pulse" />
            Caregiver HR &amp; Credentialing
          </div>

          {/* Progress Card */}
          <div className="p-3.5 rounded-xl bg-black/20 border border-white/15 space-y-2 backdrop-blur-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-100 font-medium text-[11px]">Progress</span>
              <span className="font-bold text-white text-[11px]">{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="h-2 w-full bg-black/25 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#00d084] to-[#F2B632] rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Vertical Step Indicators */}
          <div className="space-y-1 max-h-[calc(100vh-360px)] overflow-y-auto pr-1">
            {stepTitles.map((title, idx) => {
              const stepNum = idx + 1;
              const isCurrent = step === stepNum;
              const isCompleted = step > stepNum;
              return (
                <div
                  key={title}
                  onClick={() => setStep(stepNum)}
                  className={`p-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between ${isCurrent
                    ? 'bg-white text-slate-900 font-bold shadow-md'
                    : isCompleted
                      ? 'text-emerald-100 hover:bg-white/10 font-medium'
                      : 'text-white/60 hover:bg-white/5 font-medium'
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${isCurrent
                        ? 'bg-[#3e6b2b] text-white'
                        : isCompleted
                          ? 'bg-white/20 text-[#00d084]'
                          : 'bg-black/20 text-emerald-100/70'
                        }`}
                    >
                      {isCompleted ? '✓' : stepNum}
                    </span>
                    <span className="truncate text-[11px]">{title}</span>
                  </div>
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#00d084] animate-pulse" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pinned Bottom: Back to Sign In (Matching Reference Screenshot) */}
        <div className="pt-4 border-t border-white/15 relative z-10">
          <Link
            href="/login"
            className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </aside>

      {/* RIGHT WORKSPACE: Header + Main Form Card */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Mobile Sticky Step Progress Header (Screens < md) */}
        <div className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-2.5 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <img src="/images/lilisare-icon.png" alt="LiliSare" className="w-5 h-5 object-contain shrink-0" />
              <span className="text-xs font-bold text-slate-900 shrink-0">Step {step} of {totalSteps}:</span>
              <span className="text-xs text-slate-600 truncate">{stepTitles[step - 1]}</span>
            </div>
            <span className="text-[11px] font-bold text-[#3e6b2b] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 shrink-0">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00d084] to-[#3e6b2b] rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Top Header Row */}
        <div className="p-4 sm:p-6 lg:p-8 pb-0 max-w-4xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Caregiver Registration
            </h1>
          </div>

          {/* Pre-fill Application Data Button (Matching Reference Screenshot) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                notify('Pre-fill Complete', 'Elena Morales caregiver credentials populated for testing.', 'info');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50/50 border border-amber-300 text-slate-900 text-xs font-bold transition-all shadow-2xs cursor-pointer group active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F2B632] group-hover:rotate-12 transition-transform" />
              <span>Pre-fill Application Data</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
          {/* White Card with Outline & Soft Shadow */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(15,23,42,0.03)] p-4 sm:p-7 lg:p-8">

            {/* STEP 1: Add Caregiver Profile */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 1</p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Caregiver Profile</h1>
                  <p className="text-sm text-slate-500 mt-1">Staff adds the caregiver and links them to the patient.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Linked Patient:</span>
                  <span className="font-bold text-slate-900">{form.linkedPatient}</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">First Name *</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Phone Number *</label>
                      <input
                        type="text"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Relationship to Patient *</label>
                    <input
                      type="text"
                      value={form.relationship}
                      onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                      placeholder="e.g. Mother, Father, Spouse, Adult Sibling, Friend"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Residential Address *</label>
                    <input
                      type="text"
                      value={form.street}
                      onChange={(e) => setForm({ ...form, street: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">City</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">State</label>
                      <input
                        type="text"
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">ZIP</label>
                      <input
                        type="text"
                        value={form.zip}
                        onChange={(e) => setForm({ ...form, zip: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Select Caregiver Type */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 2</p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Select Caregiver Type</h1>
                  <p className="text-sm text-slate-500 mt-1">Identify their working classification.</p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      type: 'Employee (W-2)',
                      docs: '~20 documents',
                      desc: 'Standard for family members under IHSS / CNA programs with tax withholding.',
                    },
                    {
                      type: 'Independent Contractor (1099)',
                      docs: '~15 documents',
                      desc: 'For independent respite attendants or non-exclusive caregivers.',
                    },
                    {
                      type: 'Both Employee and Contractor',
                      docs: 'Combined package',
                      desc: 'Dual classification for family care and external respite work.',
                    },
                  ].map((item) => (
                    <label
                      key={item.type}
                      onClick={() => setForm({ ...form, classification: item.type as CaregiverClassification })}
                      className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${form.classification === item.type
                        ? 'border-[#3e6b2b] bg-[#f4f7f2] shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="classification"
                        checked={form.classification === item.type}
                        onChange={() => setForm({ ...form, classification: item.type as CaregiverClassification })}
                        className="mt-1 text-[#3e6b2b] focus:ring-[#3e6b2b]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-900">{item.type}</span>
                          <span className="text-[11px] font-semibold text-[#3e6b2b] bg-[#e6ede1] px-2 py-0.5 rounded">
                            {item.docs}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Send Caregiver Application */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 3</p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Caregiver Application</h1>
                  <p className="text-sm text-slate-500 mt-1">Application link sent to caregiver by email.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500">Sent To:</span>
                    <span className="font-semibold text-slate-800">{form.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500">Caregiver:</span>
                    <span className="font-semibold text-slate-800">{form.firstName} {form.lastName}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Application Status:</span>
                    <span className="font-bold text-[#3e6b2b] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Completed by Caregiver
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Complete Required Documents */}
            {step === 4 && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 4 of {totalSteps}</p>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Upload Required Documents</h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Please upload your employment and identification documents.
                    </p>
                  </div>

                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 w-fit">
                    {caregiverDocs.filter((d) => d.file !== null).length} of {caregiverDocs.length} Uploaded
                  </span>
                </div>

                {/* Unified Clean Document List (Single Elegant Container) */}
                <div className="bg-white rounded-2xl border border-slate-200/90 divide-y divide-slate-100 shadow-2xs overflow-hidden">
                  {caregiverDocs.map((doc) => (
                    <DocumentUploadItem
                      key={doc.id}
                      id={doc.id}
                      title={doc.title}
                      description={doc.description}
                      required={doc.required}
                      file={doc.file}
                      onUpload={(meta) => handleUploadDoc(doc.id, meta)}
                      onRemove={() => handleRemoveDoc(doc.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Document Verification Status */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 5 of {totalSteps}</p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Document Audit Staging</h1>
                  <p className="text-sm text-slate-500 mt-1">
                    Review your uploaded packet before background authorization.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#e6ede1] text-[#3e6b2b] flex items-center justify-center mx-auto shadow-inner">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {caregiverDocs.filter((d) => d.file !== null).length} Documents Staged for Review
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                      All attached files are encrypted and queued. Once you submit your application, Agency Admin (Danielle M.) will visually verify each credential.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left pt-2 max-w-lg mx-auto">
                    {caregiverDocs.filter((d) => d.file !== null).map((doc) => (
                      <div key={doc.id} className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs flex items-center justify-between">
                        <span className="font-medium text-slate-800 truncate pr-2">{doc.title}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                          Ready
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Background Checks */}
            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 6</p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Background Checks</h1>
                  <p className="text-sm text-slate-500 mt-1">Applicable criminal and screening checks.</p>
                </div>

                <div className="space-y-2.5 text-xs">
                  {[
                    { name: 'Colorado Bureau of Investigation (CBI) Fingerprints', status: 'Passed' },
                    { name: 'HHS-OIG List of Excluded Individuals (LEIE)', status: 'Cleared' },
                    { name: 'Colorado Courts Judicial Records', status: 'Cleared' },
                    { name: 'Colorado DMV Driving History', status: 'Cleared' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                      <span className="font-medium text-slate-800">{item.name}</span>
                      <span className="text-[11px] font-bold text-[#3e6b2b] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 7: Training and Orientation */}
            {step === 7 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 7</p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Training &amp; Orientation</h1>
                  <p className="text-sm text-slate-500 mt-1">Required training courses, quizzes, and orientation.</p>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                    <span className="font-medium text-slate-800">LearnWorlds LMS Coursework (4 Modules)</span>
                    <span className="text-[11px] font-bold text-[#3e6b2b] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> 100% Completed
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                    <span className="font-medium text-slate-800">Coursework Quizzes</span>
                    <span className="text-[11px] font-bold text-[#3e6b2b] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> 96% Average Passed
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                    <span className="font-medium text-slate-800">Company Orientation Video</span>
                    <span className="text-[11px] font-bold text-[#3e6b2b] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Watched &amp; Attested
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                    <span className="font-medium text-slate-800">Post-Orientation 1-on-1 Meeting</span>
                    <span className="text-[11px] font-bold text-[#3e6b2b] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Completed
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: Skills Validation */}
            {step === 8 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 8</p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Skills Validation</h1>
                  <p className="text-sm text-slate-500 mt-1">Clinical supervisor validates care task competency.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-800">Clinical Supervisor: {form.nurseName}</span>
                    <span className="text-xs font-bold text-[#3e6b2b] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Validated
                    </span>
                  </div>

                  <div className="space-y-1.5 text-slate-600 text-xs">
                    <div>✓ Personal Hygiene &amp; Bathing Assistance</div>
                    <div>✓ Transfers &amp; Mobility Support</div>
                    <div>✓ Meal Preparation &amp; Feeding</div>
                    <div>✓ Medication Reminders</div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 9: Payroll Profile Setup */}
            {step === 9 && (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 9</p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Payroll Profile Setup</h1>
                  <p className="text-sm text-slate-500 mt-1">Employee profile created in ADP according to applicable process.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500">Pay Rate:</span>
                    <span className="font-bold text-[#3e6b2b]">${form.hourlyRate.toFixed(2)} / hour</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500">Direct Deposit:</span>
                    <span className="font-semibold text-slate-800">{form.bankName} ({form.accountNumber})</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">ADP Status:</span>
                    <span className="font-bold text-[#3e6b2b] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Enrolled &amp; Active
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* SUBMITTED CONFIRMATION STATUS VIEW */}
            {submittedAppNumber ? (
              <div className="space-y-6 text-center py-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
                  <ShieldCheck className="w-10 h-10" />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 mb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    Confirmation Status: Pending Agency Admin Verification
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Registration Application Submitted!
                  </h1>
                  <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">
                    Thank you, <strong>{form.firstName}</strong>! Your application has been sent to the LiliSare Agency Intake &amp; Credentialing Team. We review credentials, verify Form I-9 documents, and process CBI checks within <strong>24–48 business hours</strong>.
                  </p>
                </div>

                {/* Reference Details Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 text-left text-xs max-w-md mx-auto space-y-2.5 shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Tracking Reference:</span>
                    <span className="font-bold text-slate-900 text-sm bg-slate-100 px-2 py-0.5 rounded">
                      {submittedAppNumber}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Caregiver Name:</span>
                    <span className="font-semibold text-slate-800">{form.firstName} {form.lastName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Position / Classification:</span>
                    <span className="font-semibold text-slate-800">{form.classification}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Linked Recipient:</span>
                    <span className="font-semibold text-slate-800">{form.linkedPatient} ({form.relationship})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Residence:</span>
                    <span className="font-semibold text-slate-800">{form.street}, {form.city}, CO</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Direct Deposit:</span>
                    <span className="font-semibold text-emerald-700">{form.bankName} (Attached)</span>
                  </div>
                </div>

                {/* Lifecycle Progress Stepper */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-3">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Application Lifecycle &amp; Verification Steps
                  </h4>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2.5 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Step 1: Application Received &amp; Profile Created (Completed)</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-amber-700 font-semibold">
                      <span className="w-4 h-4 rounded-full border-2 border-amber-500 flex items-center justify-center shrink-0 text-[10px]">●</span>
                      <span>Step 2: Agency Admin Document &amp; Form I-9 Verification (In Queue)</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-500">
                      <span className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0 text-[10px]">○</span>
                      <span>Step 3: Colorado CBI &amp; CAPS Registry Screening (Processing)</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-500">
                      <span className="w-4 h-4 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0 text-[10px]">○</span>
                      <span>Step 4: Final Sign-off &amp; EVV Clock-in Activation (Pending)</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={() => router.push('/admin-portal/onboarding?tab=approvals')}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Review in Agency Admin Portal</span>
                  </button>
                  <button
                    type="button"
                    onClick={exitWizard}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <span>{onClose ? 'Return to Caregiver Intake' : 'Return to Home'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* STEP 10: Review & Submit */}
                {step === 10 && (
                  <div className="space-y-6 text-center py-4">
                    <div className="w-14 h-14 rounded-full bg-[#f4f7f2] text-[#3e6b2b] flex items-center justify-center mx-auto">
                      <FileText className="w-8 h-8" />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 10 of 10</p>
                      <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Review &amp; Submit Application</h1>
                      <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                        Please review your caregiver information before submitting to LiliSare Agency Admin for verification.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs max-w-md mx-auto space-y-2.5">
                      <div className="flex justify-between py-1 border-b border-slate-200/80">
                        <span className="text-slate-500">Caregiver:</span>
                        <span className="font-semibold text-slate-800">{form.firstName} {form.lastName}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/80">
                        <span className="text-slate-500">Classification:</span>
                        <span className="font-semibold text-slate-800">{form.classification}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/80">
                        <span className="text-slate-500">Linked Patient:</span>
                        <span className="font-semibold text-slate-800">{form.linkedPatient} ({form.relationship})</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/80">
                        <span className="text-slate-500">Denver Address:</span>
                        <span className="font-semibold text-slate-800">{form.street}, {form.city}, CO</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">CBI Screening Consent:</span>
                        <span className="font-bold text-[#3e6b2b]">Granted &amp; Signed</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-left text-[11px] text-amber-900 max-w-md mx-auto leading-relaxed">
                      By submitting, your application will be routed to the <strong>Agency Admin Onboarding Queue</strong> for document inspection, CBI background verification, and formal approval.
                    </div>
                  </div>
                )}

                {/* Clean Stepper Navigation Footer */}
                <div className="pt-8 border-t border-slate-100 flex items-center justify-between gap-3">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-5 py-2.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all shadow-2xs active:scale-[0.98] flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : <div />}

                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white text-xs sm:text-sm font-bold transition-all shadow-[0_3px_12px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_18px_rgba(255,107,74,0.4)] active:scale-[0.98] flex items-center gap-2 cursor-pointer ml-auto"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleComplete}
                      className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#3e6b2b] to-[#4c8335] hover:from-[#345c24] hover:to-[#3e6b2b] text-white text-xs sm:text-sm font-bold transition-all shadow-[0_3px_12px_rgba(62,107,43,0.3)] hover:shadow-[0_4px_18px_rgba(62,107,43,0.4)] active:scale-[0.98] flex items-center gap-2 cursor-pointer ml-auto"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Submit Application for Agency Approval</span>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </main>

        <footer className="text-center py-6 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} LiliSare Home Health • Colorado CDPHE Licensed Agency
        </footer>
      </div>
    </div>
  );
}

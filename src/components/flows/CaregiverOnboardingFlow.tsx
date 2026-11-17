'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { CaregiverClassification } from '@/lib/types';
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
  Briefcase
} from 'lucide-react';

interface CaregiverRegisterWizardProps {
  onBackToHome?: () => void;
  onSwitchToPatient?: () => void;
}

export function CaregiverOnboardingFlow({ onBackToHome, onSwitchToPatient }: CaregiverRegisterWizardProps) {
  const { notify, setActiveView } = usePortal();
  const [step, setStep] = useState<number>(1);

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
    notify(
      'Caregiver Activated',
      `${form.firstName} ${form.lastName} has been verified, trained, and activated for care shifts.`,
      'success'
    );
    if (onBackToHome) {
      onBackToHome();
    } else {
      setActiveView('landing');
    }
  };

  const exitWizard = () => {
    if (onBackToHome) {
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
    'Activation'
  ];

  return (
    <div className="min-h-screen bg-[#fafbfa] text-slate-900 antialiased flex flex-col justify-between">
      {/* Sleek Minimalist Top Navigation */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={exitWizard}>
            <img src="/images/lilisare-logo.png" alt="LiliSare" className="h-8 w-auto object-contain" />
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">|</span>
            <span className="text-xs font-semibold text-slate-600 hidden sm:inline">Caregiver Registration</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-slate-500">
              Step <span className="font-semibold text-slate-900">{step}</span> of {totalSteps}
            </span>
            <button
              onClick={exitWizard}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>

        {/* Clean Linear Progress Indicator */}
        <div className="max-w-3xl mx-auto mt-3">
          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3e6b2b] transition-all duration-300 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-8 sm:p-12">

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
                <div className="grid grid-cols-2 gap-3">
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

                <div className="grid grid-cols-2 gap-3">
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

                <div className="grid grid-cols-3 gap-3">
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
                    className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
                      form.classification === item.type
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
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 4</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Complete Required Documents</h1>
                <p className="text-sm text-slate-500 mt-1">Required document package for {form.classification}.</p>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  'Form W-4 Federal Tax Withholding',
                  'Form I-9 Employment Eligibility Verification',
                  'Direct Deposit Authorization Form & Voided Check',
                  'Driver License / Government Photo ID',
                  'Social Security Card',
                  'Caregiver Mutual Consent Agreement',
                  'TB Symptom Questionnaire',
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                    <span className="font-medium text-slate-800">{doc}</span>
                    <span className="text-[11px] font-bold text-[#3e6b2b] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Uploaded
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Document Verification */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 5</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Document Verification</h1>
                <p className="text-sm text-slate-500 mt-1">Internal staff reviews submitted documents.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#e6ede1] text-[#3e6b2b] flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">All Submitted Documents Verified</h3>
                <p className="text-xs text-slate-500">
                  Reviewed and approved by LiliSare onboarding staff.
                </p>
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

          {/* STEP 10: Final Activation */}
          {step === 10 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#f4f7f2] text-[#3e6b2b] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 10 of 10</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Caregiver Activated</h1>
                <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  {form.firstName} {form.lastName} is onboarded, verified, trained, and ready to provide approved care.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs max-w-md mx-auto space-y-2">
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
                  <span className="font-semibold text-slate-800">{form.linkedPatient}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">EVV Shift Status:</span>
                  <span className="font-bold text-[#3e6b2b]">Authorized &amp; Active</span>
                </div>
              </div>
            </div>
          )}

          {/* Clean Stepper Navigation Footer */}
          <div className="pt-8 border-t border-slate-100 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-[#3e6b2b] hover:bg-[#325723] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                className="px-7 py-2.5 rounded-xl bg-[#3e6b2b] hover:bg-[#325723] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Finish &amp; Activate</span>
              </button>
            )}
          </div>

        </div>
      </main>

      <footer className="text-center py-6 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} LiliSare Home Health • Colorado CDPHE Licensed Agency
      </footer>
    </div>
  );
}

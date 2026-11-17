'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePortal } from '@/lib/store/portal-context';
import { ServiceType } from '@/lib/types';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  User,
  Heart,
  ShieldCheck,
  Building,
  Plus,
  Trash2,
  X,
  Sparkles,
} from 'lucide-react';

interface PatientRegisterWizardProps {
  onBackToHome?: () => void;
  onSwitchToCaregiver?: () => void;
}

export function PatientOnboardingFlow({ onBackToHome, onSwitchToCaregiver }: PatientRegisterWizardProps) {
  const router = useRouter();
  const { notify, setActiveView } = usePortal();
  const [step, setStep] = useState<number>(1);

  // Form State
  const [form, setForm] = useState({
    // Step 1: Patient Information
    firstName: 'Mateo',
    lastName: 'Morales',
    dob: '2016-04-12',
    gender: 'Male',
    medicaidId: 'CO-984421008',
    street: '4820 Mountain Crest Dr',
    city: 'Denver',
    state: 'CO',
    zip: '80219',
    phone: '(303) 555-0142',
    emergencyName: 'Carlos Morales',
    emergencyPhone: '(303) 555-0199',
    emergencyRel: 'Uncle',

    // Step 2: Responsible Party Details
    respName: 'Elena Morales',
    respRel: 'Mother',
    respPhone: '(303) 555-0142',
    respEmail: 'elena.morales@coloradomail.net',
    legalConsent: true,

    // Step 3: Service & Program
    serviceType: 'IHSS' as ServiceType,
    waiver: 'HCBS-CES (Children’s Extensive Support)',
    hoursPerWeek: 28.5,

    // Step 4: Caregiver Information
    cgName: 'Elena Morales',
    cgRel: 'Mother',
    cgPhone: '(303) 555-0142',
    cgEmail: 'elena.morales@coloradomail.net',
    hasSecondCg: false,
    secondCgName: 'Carlos Morales',
    secondCgRel: 'Uncle',

    // Step 5: Patient Documents
    signature: 'Elena Morales',

    // Step 6: Case Manager Coordination
    cmaAgency: 'Rocky Mountain Human Services (RMHS)',
    cmName: 'Sarah Jenkins',
    cmPhone: '(303) 636-5600',
    cmEmail: 'sjenkins@rmhs.org',

    // Step 7: Service Plan and Authorization
    authHours: 28.5,
    startDate: '2026-12-01',
    endDate: '2027-11-30',
  });

  const totalSteps = 8;

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
      'Registration Complete',
      `${form.firstName} ${form.lastName} has been registered and marked Ready for Service.`,
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
    'Patient Information',
    'Responsible Party',
    'Service & Program',
    'Caregiver Information',
    'Patient Documents',
    'Case Manager',
    'Service Plan',
    'Registration Complete'
  ];

  return (
    <div className="min-h-screen flex w-full bg-[#f4f7f6] text-slate-900 antialiased select-none">
      {/* LEFT SIDEBAR: Dark Forest Progress Pane (Matching Reference Screenshot) */}
      <aside className="w-64 lg:w-72 h-screen sticky top-0 shrink-0 bg-[#06231b] text-white flex flex-col justify-between p-6 border-r border-[#041913] shadow-xl z-20 hidden md:flex">
        {/* Top Branding & Step Progress */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
              <img src="/images/lilisare-logo.png" alt="LiliSare" className="h-full w-auto object-contain" />
            </div>
            <div>
              <p className="text-xs font-bold text-white tracking-tight">LiliSare Colorado</p>
              <p className="text-[10px] text-emerald-400 font-medium">Patient Onboarding</p>
            </div>
          </div>

          {/* State Medicaid Badge */}
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d084] animate-pulse" />
            CO Medicaid Intake
          </div>

          {/* Progress Card */}
          <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-200/80 font-medium text-[11px]">Progress</span>
              <span className="font-mono font-bold text-white text-[11px]">{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#00d084] to-[#3e6b2b] rounded-full transition-all duration-300"
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
                  className={`p-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between ${
                    isCurrent
                      ? 'bg-white text-slate-900 font-bold shadow-md'
                      : isCompleted
                      ? 'text-emerald-300/90 hover:bg-white/[0.06] font-medium'
                      : 'text-emerald-100/40 hover:bg-white/[0.04] font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                      isCurrent
                        ? 'bg-[#3e6b2b] text-white'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-[#00d084]'
                        : 'bg-white/10 text-emerald-200/60'
                    }`}>
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
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/login"
            className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </aside>

      {/* RIGHT WORKSPACE: Header + Main Form Card */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header Row */}
        <div className="p-6 lg:p-8 pb-0 max-w-4xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Patient Registration
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Official application for Colorado Health Care Policy &amp; Financing (HCPF)
            </p>
          </div>

          {/* Pre-fill Application Data Button (Matching Reference Screenshot) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                notify('Pre-fill Complete', 'Mateo Morales patient file populated with valid CO Medicaid credentials.', 'info');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50/50 border border-amber-300 text-slate-900 text-xs font-bold transition-all shadow-2xs cursor-pointer group active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F2B632] group-hover:rotate-12 transition-transform" />
              <span>Pre-fill Application Data</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="p-6 lg:p-8 max-w-4xl mx-auto w-full">
          {/* White Card with Outline & Soft Shadow */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(15,23,42,0.03)] p-6 sm:p-8">

          {/* STEP 1: Patient Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 1</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Patient Information</h1>
                <p className="text-sm text-slate-500 mt-1">Enter details for the person who needs care.</p>
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
                    <label className="font-semibold text-slate-700 block mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      value={form.dob}
                      onChange={(e) => setForm({ ...form, dob: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Colorado Medicaid ID *</label>
                    <input
                      type="text"
                      value={form.medicaidId}
                      onChange={(e) => setForm({ ...form, medicaidId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Street Address *</label>
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

                <div className="pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-800 text-xs block mb-2">Emergency Contact</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Name"
                        value={form.emergencyName}
                        onChange={(e) => setForm({ ...form, emergencyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Relationship"
                        value={form.emergencyRel}
                        onChange={(e) => setForm({ ...form, emergencyRel: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Phone"
                        value={form.emergencyPhone}
                        onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Responsible Party */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 2</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Family / Responsible Party</h1>
                <p className="text-sm text-slate-500 mt-1">Add the parent, legal guardian, or responsible family member.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    value={form.respName}
                    onChange={(e) => setForm({ ...form, respName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    placeholder="e.g. Elena Morales"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Relationship to Patient *</label>
                  <input
                    type="text"
                    value={form.respRel}
                    onChange={(e) => setForm({ ...form, respRel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    placeholder="e.g. Mother, Father, Legal Guardian"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="text"
                      value={form.respPhone}
                      onChange={(e) => setForm({ ...form, respPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={form.respEmail}
                      onChange={(e) => setForm({ ...form, respEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.legalConsent}
                      onChange={(e) => setForm({ ...form, legalConsent: e.target.checked })}
                      className="mt-0.5 rounded text-[#3e6b2b] focus:ring-[#3e6b2b] w-4 h-4"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      I confirm that I am the legal parent or authorized representative of {form.firstName} {form.lastName}, authorized to consent to healthcare services.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Select Service and Program */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 3</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Select Service &amp; Program</h1>
                <p className="text-sm text-slate-500 mt-1">Choose the type of care the patient requires.</p>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'IHSS', name: 'IHSS (In-Home Support Services)', desc: 'Family members provide direct personal care and homemaking.' },
                  { id: 'CNA', name: 'CNA (Certified Nursing Assistant)', desc: 'Skilled clinical care under registered nurse supervision.' },
                  { id: 'HMA', name: 'HMA (Health Maintenance Activities)', desc: 'Nurse-delegated medical tasks performed by trained attendants.' },
                  { id: 'Personal Care', name: 'Personal Care', desc: 'Assistance with bathing, dressing, hygiene, and transfers.' },
                  { id: 'Homemaker', name: 'Homemaker Services', desc: 'Assistance with meal prep, cleaning, and daily household tasks.' },
                ].map((s) => (
                  <label
                    key={s.id}
                    onClick={() => setForm({ ...form, serviceType: s.id as ServiceType })}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                      form.serviceType === s.id
                        ? 'border-[#3e6b2b] bg-[#f4f7f2] shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      checked={form.serviceType === s.id}
                      onChange={() => setForm({ ...form, serviceType: s.id as ServiceType })}
                      className="mt-1 text-[#3e6b2b] focus:ring-[#3e6b2b]"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{s.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Medicaid Waiver Program</label>
                  <select
                    value={form.waiver}
                    onChange={(e) => setForm({ ...form, waiver: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                  >
                    <option value="HCBS-CES (Children’s Extensive Support)">HCBS-CES (Children’s Extensive Support)</option>
                    <option value="HCBS-CHRP (Children’s Habilitation Residential)">HCBS-CHRP (Children’s Habilitation)</option>
                    <option value="HCBS-SLS (Supported Living Services)">HCBS-SLS (Supported Living Services)</option>
                    <option value="HCBS-DD (Developmental Disabilities)">HCBS-DD (Developmental Disabilities)</option>
                    <option value="HCBS-EBD (Elderly, Blind and Disabled)">HCBS-EBD (Elderly, Blind and Disabled)</option>
                    <option value="CFC (Community First Choice)">CFC (Community First Choice)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Requested Hours / Week</label>
                  <input
                    type="number"
                    step="0.5"
                    value={form.hoursPerWeek}
                    onChange={(e) => setForm({ ...form, hoursPerWeek: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#3e6b2b] focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Caregiver Information */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 4</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Link Caregiver Information</h1>
                <p className="text-sm text-slate-500 mt-1">Link the caregiver who will provide care to this patient.</p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 text-xs">
                <span className="font-bold text-slate-900 text-xs block">Primary Caregiver</span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={form.cgName}
                      onChange={(e) => setForm({ ...form, cgName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Relationship to Patient</label>
                    <input
                      type="text"
                      value={form.cgRel}
                      onChange={(e) => setForm({ ...form, cgRel: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Phone</label>
                    <input
                      type="text"
                      value={form.cgPhone}
                      onChange={(e) => setForm({ ...form, cgPhone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Email</label>
                    <input
                      type="email"
                      value={form.cgEmail}
                      onChange={(e) => setForm({ ...form, cgEmail: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    />
                  </div>
                </div>
              </div>

              {form.hasSecondCg ? (
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">Secondary / Respite Caregiver</span>
                    <button
                      onClick={() => setForm({ ...form, hasSecondCg: false })}
                      className="text-[11px] text-rose-600 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={form.secondCgName}
                        onChange={(e) => setForm({ ...form, secondCgName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Relationship"
                        value={form.secondCgRel}
                        onChange={(e) => setForm({ ...form, secondCgRel: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setForm({ ...form, hasSecondCg: true })}
                  className="w-full py-3 rounded-2xl border border-dashed border-slate-300 hover:border-slate-400 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-slate-400" />
                  <span>Add Another Caregiver (e.g. Respite Caregiver)</span>
                </button>
              )}
            </div>
          )}

          {/* STEP 5: Patient Documents */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 5</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Patient Documents</h1>
                <p className="text-sm text-slate-500 mt-1">Review required patient forms and provide digital signature.</p>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  'Patient Intake & Information Form',
                  'Colorado Medicaid Client Rights Notice',
                  'HIPAA Privacy Authorization & Medical Release',
                  'Physician Order / CMS-485 Plan of Care',
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                    <span className="font-medium text-slate-800">{doc}</span>
                    <span className="text-[11px] font-bold text-[#3e6b2b] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Ready
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs">
                <label className="font-semibold text-slate-700 block mb-1">Responsible Party Electronic Signature *</label>
                <input
                  type="text"
                  value={form.signature}
                  onChange={(e) => setForm({ ...form, signature: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                  placeholder="Type your full legal name"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  By typing your name, you electronically sign the required patient intake agreements.
                </span>
              </div>
            </div>
          )}

          {/* STEP 6: Case Manager Coordination */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 6</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Case Manager Coordination</h1>
                <p className="text-sm text-slate-500 mt-1">Record the assigned state case manager for Prior Authorization (PAR).</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Case Management Agency (CMA) *</label>
                  <input
                    type="text"
                    value={form.cmaAgency}
                    onChange={(e) => setForm({ ...form, cmaAgency: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    placeholder="e.g. Rocky Mountain Human Services (RMHS)"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Case Manager Name *</label>
                  <input
                    type="text"
                    value={form.cmName}
                    onChange={(e) => setForm({ ...form, cmName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    placeholder="e.g. Sarah Jenkins"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Case Manager Phone</label>
                    <input
                      type="text"
                      value={form.cmPhone}
                      onChange={(e) => setForm({ ...form, cmPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Case Manager Email *</label>
                    <input
                      type="email"
                      value={form.cmEmail}
                      onChange={(e) => setForm({ ...form, cmEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#3e6b2b] focus:ring-1 focus:ring-[#3e6b2b] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Service Plan and Authorization */}
          {step === 7 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 7</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Service Plan &amp; Authorization</h1>
                <p className="text-sm text-slate-500 mt-1">Verify approved services and hours under Colorado Medicaid.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-800">Approved Prior Authorization (PAR)</span>
                  <span className="font-bold text-[#3e6b2b] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Approved
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Authorized Care Hours:</span>
                    <p className="text-lg font-bold text-[#3e6b2b]">{form.authHours} hrs / week</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Effective Term:</span>
                    <p className="text-sm font-semibold text-slate-800">{form.startDate} to {form.endDate}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 block text-[11px] mb-1">Authorized ADL Tasks:</span>
                  <div className="grid grid-cols-2 gap-1.5 text-slate-700 text-xs">
                    <span>✓ Personal Hygiene &amp; Bathing</span>
                    <span>✓ Meal Preparation &amp; Feeding</span>
                    <span>✓ Transfers &amp; Mobility</span>
                    <span>✓ Medication Reminders</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: Registration Complete */}
          {step === 8 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-[#f4f7f2] text-[#3e6b2b] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#3e6b2b] uppercase tracking-wider">Step 8 of 8</p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">Patient Registration Complete</h1>
                <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  {form.firstName} {form.lastName} has been registered and is marked ready for service.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs max-w-md mx-auto space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-semibold text-slate-800">{form.firstName} {form.lastName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">Medicaid ID:</span>
                  <span className="font-mono text-slate-800">{form.medicaidId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">Service Program:</span>
                  <span className="font-semibold text-slate-800">{form.serviceType} ({form.authHours} hrs/wk)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">Responsible Party:</span>
                  <span className="font-semibold text-slate-800">{form.respName} ({form.respRel})</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Assigned Caregiver:</span>
                  <span className="font-semibold text-slate-800">{form.cgName}</span>
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
                className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white text-xs sm:text-sm font-bold transition-all shadow-[0_3px_12px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_18px_rgba(255,107,74,0.4)] active:scale-[0.98] flex items-center gap-2 cursor-pointer ml-auto"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Finish Registration</span>
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} LiliSare Home Health • Colorado CDPHE Licensed Agency
      </footer>
    </div>
  </div>
  );
}

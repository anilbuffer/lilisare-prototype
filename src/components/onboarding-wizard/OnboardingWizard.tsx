'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { ServiceType, CaregiverClassification } from '@/lib/types';
import {
  Users,
  UserPlus,
  Heart,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Building2,
  Trash2,
  FileCheck,
  CreditCard,
  Check,
  Info
} from 'lucide-react';

interface WizardPatient {
  id: string;
  fullName: string;
  dateOfBirth: string;
  medicaidId: string;
  serviceType: ServiceType;
  caseManagerAgency: string;
  hoursRequested: number;
}

interface WizardCaregiver {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  relationship: string;
  classification: CaregiverClassification;
  assignedPatientIds: string[];
}

export function OnboardingWizard({ onComplete }: { onComplete?: () => void }) {
  const { notify, setActiveView } = usePortal();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // STEP 1 STATE: Patients & Caregivers (Enforcing Rules 1, 2, 3)
  const [patients, setPatients] = useState<WizardPatient[]>([
    {
      id: 'PAT-101',
      fullName: 'Mateo Morales',
      dateOfBirth: '2016-04-12',
      medicaidId: 'CO-984421008',
      serviceType: 'IHSS',
      caseManagerAgency: 'Rocky Mountain Human Services (RMHS)',
      hoursRequested: 28.5,
    },
  ]);

  const [caregivers, setCaregivers] = useState<WizardCaregiver[]>([
    {
      id: 'CG-801',
      fullName: 'Elena Morales',
      phone: '(303) 555-0142',
      email: 'elena.morales@coloradomail.net',
      relationship: 'Mother',
      classification: 'Employee (W-2)',
      assignedPatientIds: ['PAT-101'],
    },
    {
      id: 'CG-802',
      fullName: 'Carlos Morales',
      phone: '(303) 555-0199',
      email: 'carlos.morales@coloradomail.net',
      relationship: 'Uncle / Respite Attendant',
      classification: 'Independent Contractor (1099)',
      assignedPatientIds: ['PAT-101'],
    },
  ]);

  // Form helpers for adding more patients/caregivers
  const [newPatientName, setNewPatientName] = useState('');
  const [newCaregiverName, setNewCaregiverName] = useState('');
  const [newCaregiverRel, setNewCaregiverRel] = useState('Spouse');

  // STEP 4 SIMULATION: Document verification flags
  const [patientDocSigned, setPatientDocSigned] = useState(true);
  const [caregiverDocUploaded, setCaregiverDocUploaded] = useState(false);
  const [cbiCleared, setCbiCleared] = useState(false);

  // Rule 4: System Automatically selects required documents based on service & caregiver classification
  const getCaregiverRequiredDocs = (cg: WizardCaregiver, service: ServiceType) => {
    const docs = ['State I-9 Identity Verification (Photo ID + SSN)', 'Direct Deposit Authorization'];
    if (cg.classification === 'Employee (W-2)') {
      docs.push('Form W-4 Federal Tax Withholding');
      docs.push('Family Attestation & Mutual Consent Agreement');
      docs.push('Colorado Bureau of Investigation (CBI) Fingerprints');
      docs.push('OIG List of Excluded Entities Check');
    } else if (cg.classification === 'Independent Contractor (1099)') {
      docs.push('Form W-9 Taxpayer ID Request');
      docs.push('Independent Contractor Agreement');
      docs.push('CBI State Background Verification');
    } else {
      // Dual
      docs.push('Dual W-4 / W-9 Employment Packet');
      docs.push('Family Attestation & Respite Agreement');
      docs.push('CBI Fingerprints & OIG Screening');
    }

    if (service === 'CNA') {
      docs.push('Colorado DORA Certified Nurse Aide (CNA) License');
      docs.push('American Heart Association BLS / CPR Card');
      docs.push('7-Year DMV Motor Vehicle Record (MVR)');
    } else if (service === 'HMA') {
      docs.push('RN Health Maintenance Skill Validation Protocol');
      docs.push('Medication Administration Delegation Form');
    }
    return docs;
  };

  const getPatientRequiredDocs = (service: ServiceType) => {
    return [
      'Colorado State Prior Authorization Request (PAR)',
      'Client Rights & Freedom of Choice Notice',
      'Physician Order & Attestation Statement (Form 485)',
      `State Task Allocation Matrix (${service})`,
    ];
  };

  const handleAddPatient = () => {
    if (!newPatientName) return;
    const newId = `PAT-${100 + patients.length + 1}`;
    setPatients([
      ...patients,
      {
        id: newId,
        fullName: newPatientName,
        dateOfBirth: '2018-09-15',
        medicaidId: `CO-${Math.floor(100000000 + Math.random() * 900000000)}`,
        serviceType: 'IHSS',
        caseManagerAgency: 'Rocky Mountain Human Services (RMHS)',
        hoursRequested: 20.0,
      },
    ]);
    setNewPatientName('');
    notify('Patient Added', `Created separate patient record ${newId} (Rule 1 & Rule 3 satisfied).`, 'info');
  };

  const handleAddCaregiver = () => {
    if (!newCaregiverName) return;
    const newId = `CG-${800 + caregivers.length + 1}`;
    setCaregivers([
      ...caregivers,
      {
        id: newId,
        fullName: newCaregiverName,
        phone: '(303) 555-0177',
        email: 'family.caregiver@coloradomail.net',
        relationship: newCaregiverRel,
        classification: 'Employee (W-2)',
        assignedPatientIds: [patients[0].id],
      },
    ]);
    setNewCaregiverName('');
    notify('Caregiver Added', `Created separate caregiver record ${newId} (Rule 1 & Rule 2 satisfied).`, 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 antialiased pb-12">
      {/* Wizard Header Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setActiveView('landing')}
          >
            <img
              src="/images/lilisare-logo.png"
              alt="LiliSare"
              className="h-9 w-auto object-contain"
            />
            <div className="hidden sm:block border-l border-slate-200 pl-3">
              <p className="text-xs font-black text-slate-800">Onboarding Enrollment Wizard</p>
              <p className="text-[10px] text-slate-500 font-medium">Task 2 • Dual Patient & Caregiver Setup</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-primary-50 text-primary border border-primary-200">
              <Sparkles className="w-3 h-3" />
              Rules 1–5 Enforced
            </span>
            <button
              onClick={() => setActiveView('landing')}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6 pt-6">
        {/* 5-Rule Mandatory System Banner */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
            LiliSphere 5 Fundamental Architecture Rules Active
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-[11px] text-slate-600">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
            <strong>Rule 1:</strong> Separate profiles for Patient vs Caregiver
          </div>
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
            <strong>Rule 2:</strong> 1 Patient can have multiple Caregivers
          </div>
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
            <strong>Rule 3:</strong> 1 Caregiver can serve multiple Patients
          </div>
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
            <strong>Rule 4:</strong> Auto-select docs by service & classification
          </div>
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
            <strong>Rule 5:</strong> Patient completion never completes Caregiver
          </div>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm">
        <div className="flex items-center justify-between overflow-x-auto pb-2 sm:pb-0 gap-2 text-xs">
          {[
            { num: 1, label: '1. Care Circle Structure', sub: 'Rules 1, 2 & 3' },
            { num: 2, label: '2. Patient Profiles', sub: 'Medicaid & Needs' },
            { num: 3, label: '3. Caregiver Profiles', sub: 'W-2 / 1099 Classification' },
            { num: 4, label: '4. Smart Documents', sub: 'Rule 4 Auto-Engine' },
            { num: 5, label: '5. Independent Status', sub: 'Rule 5 Dual Progress' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`flex-1 min-w-[140px] text-left p-3 rounded-xl border transition-all ${
                currentStep === s.num
                  ? 'border-primary bg-primary-50/80 shadow-sm'
                  : currentStep > s.num
                  ? 'border-emerald-200 bg-emerald-50/50 text-slate-700'
                  : 'border-slate-100 bg-slate-50 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-bold ${currentStep === s.num ? 'text-primary' : 'text-slate-700'}`}>
                  {s.label}
                </span>
                {currentStep > s.num && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">{s.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: CARE CIRCLE & RELATIONSHIPS (RULES 1, 2, 3) */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 1 of 5</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Household Care Circle & Entity Configuration
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Define the patients receiving care and the caregivers providing care. The system establishes distinct records while mapping relationships.
            </p>
          </div>

          {/* Demonstration Diagram for Rules 1, 2 & 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Live Relational Architecture Map
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Patients ({patients.length})</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold">Rule 1 & 2</span>
                </div>
                {patients.map((p) => (
                  <div key={p.id} className="p-2 rounded-lg bg-teal-50/60 border border-teal-200/60 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-teal-950">{p.fullName}</p>
                      <p className="text-[10px] text-teal-700 font-mono">ID: {p.id} • Medicaid: {p.medicaidId}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600">
                      {caregivers.filter((cg) => cg.assignedPatientIds.includes(p.id)).length} Caregiver(s)
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Caregivers ({caregivers.length})</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-primary-100 text-primary-800 font-bold">Rule 1 & 3</span>
                </div>
                {caregivers.map((cg) => (
                  <div key={cg.id} className="p-2 rounded-lg bg-primary-50/60 border border-primary-200/60 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-primary-950">{cg.fullName} ({cg.relationship})</p>
                      <p className="text-[10px] text-primary-700">ID: {cg.id} • {cg.classification}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600">
                      Cares for {cg.assignedPatientIds.length} Patient(s)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Controls to add another patient or caregiver to test multi-relationships */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <UserPlus className="w-3.5 h-3.5 text-teal-600" />
                Add Another Patient (e.g. Sibling or Parent)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Sophia Morales"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <button
                  onClick={handleAddPatient}
                  className="px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shrink-0"
                >
                  Add Patient
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <UserPlus className="w-3.5 h-3.5 text-primary" />
                Add Another Caregiver (e.g. Respite or Backup)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Maria Morales"
                  value={newCaregiverName}
                  onChange={(e) => setNewCaregiverName(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <button
                  onClick={handleAddCaregiver}
                  className="px-3 py-2 bg-primary hover:bg-primary-600 text-white rounded-xl text-xs font-bold shrink-0"
                >
                  Add Caregiver
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-primary hover:bg-primary-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md flex items-center gap-2"
            >
              <span>Continue to Patient Profiles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PATIENT PROFILES & CARE SERVICE */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 2 of 5</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Patient Profiles & Service Program Selection
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Configure authorized Medicaid program and clinical supervision requirements for each patient.
            </p>
          </div>

          {patients.map((patient, pIdx) => (
            <div key={patient.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center">
                    {pIdx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{patient.fullName}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border text-slate-700">
                    {patient.id}
                  </span>
                </div>
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                  Patient Record
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700">Medicaid Number (State ID)</label>
                  <input
                    type="text"
                    value={patient.medicaidId}
                    onChange={(e) => {
                      const updated = [...patients];
                      updated[pIdx].medicaidId = e.target.value;
                      setPatients(updated);
                    }}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700">Care Program (Service)</label>
                  <select
                    value={patient.serviceType}
                    onChange={(e) => {
                      const updated = [...patients];
                      updated[pIdx].serviceType = e.target.value as ServiceType;
                      setPatients(updated);
                    }}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="IHSS">IHSS (In-Home Support Services)</option>
                    <option value="CNA">CNA (Certified Nurse Aide)</option>
                    <option value="HMA">HMA (Health Maintenance Activities)</option>
                    <option value="Personal Care">Personal Care & Homemaker</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700">Requested Weekly Hours</label>
                  <input
                    type="number"
                    value={patient.hoursRequested}
                    onChange={(e) => {
                      const updated = [...patients];
                      updated[pIdx].hoursRequested = parseFloat(e.target.value) || 0;
                      setPatients(updated);
                    }}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700">Case Management Agency</label>
                  <input
                    type="text"
                    value={patient.caseManagerAgency}
                    onChange={(e) => {
                      const updated = [...patients];
                      updated[pIdx].caseManagerAgency = e.target.value;
                      setPatients(updated);
                    }}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Supervisory Rule Applied</label>
                  <div className="mt-1 p-2 rounded-xl bg-white border border-slate-200 text-slate-600 font-medium text-[11px]">
                    {patient.serviceType === 'CNA'
                      ? 'Requires Initial RN visit + 60-day onsite nurse evaluation'
                      : patient.serviceType === 'HMA'
                      ? 'Requires Initial RN visit + quarterly virtual nurse check'
                      : 'Quarterly oversight review (telehealth eligible)'}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="bg-primary hover:bg-primary-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md flex items-center gap-2"
            >
              <span>Continue to Caregiver Profiles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CAREGIVER PROFILES & CLASSIFICATION */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 3 of 5</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Caregiver Profiles & Tax Classification
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select employment classification (W-2 vs 1099 vs Dual) to configure ADP payroll and required credentials.
            </p>
          </div>

          {caregivers.map((cg, cIdx) => (
            <div key={cg.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-100 text-primary text-xs font-bold flex items-center justify-center">
                    {cIdx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{cg.fullName}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border text-slate-700">
                    {cg.id}
                  </span>
                </div>
                <span className="text-xs font-bold text-primary-900 bg-primary-100 px-2.5 py-1 rounded-full">
                  Caregiver Record
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700">Family Relationship</label>
                  <input
                    type="text"
                    value={cg.relationship}
                    onChange={(e) => {
                      const updated = [...caregivers];
                      updated[cIdx].relationship = e.target.value;
                      setCaregivers(updated);
                    }}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700">Employment Classification</label>
                  <select
                    value={cg.classification}
                    onChange={(e) => {
                      const updated = [...caregivers];
                      updated[cIdx].classification = e.target.value as CaregiverClassification;
                      setCaregivers(updated);
                    }}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="Employee (W-2)">Employee (W-2) — Form W-4</option>
                    <option value="Independent Contractor (1099)">1099 Contractor — Form W-9</option>
                    <option value="Dual (Employee + Contractor)">Dual (W-2 Employee + 1099 Contractor)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700">Assigned ADP Engine</label>
                  <div className="mt-1 p-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {cg.classification === 'Independent Contractor (1099)'
                        ? 'ADP Workforce Now (1099)'
                        : 'ADP Run (W-2 Direct Deposit)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Patient Mapping (Rule 2 & 3: Multi-mapping) */}
              <div className="pt-2 text-xs">
                <label className="font-semibold text-slate-700 block mb-1">
                  Authorized to Provide Care for Patient(s):
                </label>
                <div className="flex flex-wrap gap-2">
                  {patients.map((p) => {
                    const isAssigned = cg.assignedPatientIds.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          const updated = [...caregivers];
                          if (isAssigned) {
                            if (cg.assignedPatientIds.length > 1) {
                              updated[cIdx].assignedPatientIds = cg.assignedPatientIds.filter((id) => id !== p.id);
                            }
                          } else {
                            updated[cIdx].assignedPatientIds.push(p.id);
                          }
                          setCaregivers(updated);
                        }}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                          isAssigned
                            ? 'bg-teal-700 text-white shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{p.fullName} ({p.serviceType})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="bg-primary hover:bg-primary-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md flex items-center gap-2"
            >
              <span>Continue to Smart Document Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SMART DOCUMENT ENGINE (RULE 4) */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              Rule 4 Active: Automated Document Packet Compiler
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Smart Document Packets Generated
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Staff do not manually select documents. The engine dynamically assigns the exact packet based on the patient service type and caregiver classification.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Patient Documents */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-teal-700" />
                    Patient Document Packet
                  </h3>
                  <p className="text-[11px] text-slate-500">Service: {patients[0].serviceType}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                  {getPatientRequiredDocs(patients[0].serviceType).length} Required Items
                </span>
              </div>

              <div className="space-y-2">
                {getPatientRequiredDocs(patients[0].serviceType).map((doc, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{doc}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Signed
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Caregiver Documents */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-primary" />
                    Caregiver Document Packet ({caregivers[0].fullName})
                  </h3>
                  <p className="text-[11px] text-slate-500">Classification: {caregivers[0].classification}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-100 text-primary-800">
                  {getCaregiverRequiredDocs(caregivers[0], patients[0].serviceType).length} Required Items
                </span>
              </div>

              <div className="space-y-2">
                {getCaregiverRequiredDocs(caregivers[0], patients[0].serviceType).map((doc, idx) => {
                  const isCbi = doc.includes('CBI');
                  return (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{doc}</span>
                      {isCbi ? (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${cbiCleared ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {cbiCleared ? 'Cleared' : 'Pending CBI Result'}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Uploaded
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="bg-primary hover:bg-primary-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md flex items-center gap-2"
            >
              <span>View Independent Statuses (Rule 5)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: REVIEW & INDEPENDENT DUAL PROGRESS (RULE 5) */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
              Rule 5 Enforced: Independent Dual Completion Engine
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Onboarding Readiness & Approval Status
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Notice below: <strong>Patient onboarding completion NEVER automatically completes caregiver onboarding</strong>. Both retain separate legal timelines and verification thresholds.
            </p>
          </div>

          {/* Dual Independent Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Status Card (100% Completed) */}
            <div className="p-6 rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{patients[0].fullName}</h3>
                  <p className="text-xs text-slate-500">Patient Record: {patients[0].id}</p>
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-600 text-white">
                  100% COMPLETE
                </span>
              </div>

              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 w-full" />
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-emerald-200/60">
                <div className="flex items-center justify-between">
                  <span>State PAR Request:</span>
                  <strong className="text-emerald-700">Submitted & Validated</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Physician Form 485:</span>
                  <strong className="text-emerald-700">Signed by MD</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Case Manager Sync:</span>
                  <strong className="text-emerald-700">Rocky Mountain Human Services</strong>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Patient care plan is certified and ready for service scheduling.</span>
              </div>
            </div>

            {/* Caregiver Status Card (Independent, Pending Background Check) */}
            <div className="p-6 rounded-2xl border-2 border-amber-300 bg-amber-50/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{caregivers[0].fullName}</h3>
                  <p className="text-xs text-slate-500">Caregiver Record: {caregivers[0].id}</p>
                </div>
                <span className={`text-xs font-black px-3 py-1 rounded-full ${cbiCleared ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}`}>
                  {cbiCleared ? '100% ACTIVATED' : '65% IN PROGRESS'}
                </span>
              </div>

              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${cbiCleared ? 'bg-emerald-600 w-full' : 'bg-[#F2B632] w-[65%]'}`}
                />
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-amber-200/60">
                <div className="flex items-center justify-between">
                  <span>Tax Form W-4 / I-9:</span>
                  <strong className="text-emerald-700">Verified</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>CBI Fingerprint Background:</span>
                  <strong className={cbiCleared ? 'text-emerald-700' : 'text-amber-800'}>
                    {cbiCleared ? 'Passed (No Disqualifiers)' : 'Pending State Result'}
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>ADP Direct Deposit:</span>
                  <strong className="text-slate-700">Routing Confirmed</strong>
                </div>
              </div>

              {/* Action Button to demonstrate Rule 5 independence */}
              {!cbiCleared ? (
                <button
                  type="button"
                  onClick={() => {
                    setCbiCleared(true);
                    notify('CBI Screening Returned', 'State background cleared! Caregiver status independently advanced to 100%.', 'success');
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Simulate CBI Fingerprint Clearance
                </button>
              ) : (
                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Caregiver is fully activated and cleared for EVV mobile clock-in!</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={() => {
                notify('Onboarding Complete', 'Both patient and caregiver profiles securely provisioned in LiliSphere.', 'success');
                if (onComplete) onComplete();
              }}
              className="bg-primary hover:bg-primary-600 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-md flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finalize & Exit Wizard</span>
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

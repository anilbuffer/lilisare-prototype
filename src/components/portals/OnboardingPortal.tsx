'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { Caregiver, ServiceType, CaregiverClassification } from '@/lib/types';
import {
  UserCheck,
  FileCheck,
  ShieldAlert,
  GraduationCap,
  CreditCard,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  FileText,
  UserPlus
} from 'lucide-react';

export function OnboardingPortal() {
  const { caregivers, updateCaregiverDocStatus, runBackgroundCheck, activateCaregiver } = usePortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string>(caregivers[0]?.id || '');
  const [serviceSimulator, setServiceSimulator] = useState<ServiceType>('IHSS');

  const selectedCaregiver = caregivers.find((c) => c.id === selectedCaregiverId) || caregivers[0];

  const filteredCaregivers = caregivers.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.linkedClientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'all' || c.classification === filterClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner: LiliSare Onboarding Hub */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold text-secondary-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            Two-Person Onboarding Command Center • Scaling 3x–4x Target
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Caregiver & Family Onboarding
          </h1>
          <p className="text-slate-200 text-sm mt-2 leading-relaxed">
            Automating the intake of 900+ family caregivers. Independent tracking for Client vs. Caregiver records, automated 15–20 document packets, CBI background checks, and ADP payroll provisioning.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
            <div>
              <p className="text-[11px] text-slate-300 font-medium uppercase tracking-wider">Active Caregivers</p>
              <p className="text-2xl font-black text-white mt-0.5">842</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-300 font-medium uppercase tracking-wider">In Pipeline</p>
              <p className="text-2xl font-black text-secondary mt-0.5">68</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-300 font-medium uppercase tracking-wider">CBI Checks Pending</p>
              <p className="text-2xl font-black text-brand-light-cyan mt-0.5">7</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-300 font-medium uppercase tracking-wider">Ready for Activation</p>
              <p className="text-2xl font-black text-brand-vivid-cyan mt-0.5">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlight: Automated Service-to-Packet Rules Engine */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              Automated Service-Based Document Packet Generator
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Staff do not manually select documents. Selecting the service auto-compiles the exact compliance packet.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">Test Service Rule:</span>
            <select
              value={serviceSimulator}
              onChange={(e) => setServiceSimulator(e.target.value as ServiceType)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="IHSS">IHSS (In-Home Support Services)</option>
              <option value="CNA">CNA (Certified Nurse Aide)</option>
              <option value="HMA">HMA (Health Maintenance Activities)</option>
              <option value="Personal Care">Personal Care & Homemaker</option>
            </select>
          </div>
        </div>

        {/* Dynamic Packet Rules Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] font-bold uppercase text-slate-400">Target Role</span>
            <p className="font-semibold text-slate-800 mt-0.5">
              {serviceSimulator === 'CNA' ? 'State Licensed CNA' : 'Family Member or Attendant'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              {serviceSimulator === 'CNA' ? 'Requires DORA license verification' : 'Standard family caregiver attestation'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] font-bold uppercase text-slate-400">Required Packet Size</span>
            <p className="font-semibold text-slate-800 mt-0.5">
              {serviceSimulator === 'CNA' ? '20 Documents (Dual Packet)' : serviceSimulator === 'HMA' ? '18 Documents' : '15 Documents'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              W-4 / W-9, I-9 ID, Family Mutual Consent, Emergency Info
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] font-bold uppercase text-slate-400">Background Screening</span>
            <p className="font-semibold text-slate-800 mt-0.5">CBI State Fingerprint + OIG</p>
            <p className="text-[11px] text-slate-500 mt-1">
              {serviceSimulator === 'CNA' ? 'Plus 7-year MVR Driving Check' : 'Mandatory automated HHS exclusion'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] font-bold uppercase text-slate-400">Supervisory Requirement</span>
            <p className="font-semibold text-primary mt-0.5 font-bold">
              {serviceSimulator === 'CNA'
                ? 'RN Initial + 60-Day Onsite Visit'
                : serviceSimulator === 'HMA'
                  ? 'RN Initial + Quarterly Virtual RN'
                  : serviceSimulator === 'IHSS'
                    ? 'Quarterly Oversight (Non-RN eligible)'
                    : 'Annual In-Home Visit'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Enforced by system scheduling rules</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Caregivers List & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Caregivers Queue */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col h-[700px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Onboarding Queue</h3>
              <p className="text-xs text-slate-500">Select a family caregiver to inspect verification status</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {filteredCaregivers.length} Records
            </span>
          </div>

          {/* Search and Filters */}
          <div className="my-3 space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search caregiver or client name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary bg-slate-50/50"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setFilterClass('all')}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${filterClass === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterClass('Employee (W-2)')}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${filterClass === 'Employee (W-2)'
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                W-2 Employees
              </button>
              <button
                onClick={() => setFilterClass('Independent Contractor (1099)')}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${filterClass === 'Independent Contractor (1099)'
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                1099 Contractors
              </button>
              <button
                onClick={() => setFilterClass('Dual (Employee + Contractor)')}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${filterClass === 'Dual (Employee + Contractor)'
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                Dual Classification
              </button>
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredCaregivers.map((cg) => {
              const isSelected = cg.id === selectedCaregiver.id;
              const isActivated = cg.onboardingStage === 'Active & Activated';

              return (
                <div
                  key={cg.id}
                  onClick={() => setSelectedCaregiverId(cg.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${isSelected
                      ? 'border-primary bg-primary-50/50 shadow-sm'
                      : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/70'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{cg.fullName}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {cg.relationshipToClient} of <strong>{cg.linkedClientName}</strong>
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActivated
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                        }`}
                    >
                      {isActivated ? 'Activated' : cg.onboardingStage}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                      {cg.classification}
                    </span>
                    <span>{cg.onboardingProgress}% Completed</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${cg.onboardingProgress === 100 ? 'bg-[#00d084]' : 'bg-[#F2B632]'
                        }`}
                      style={{ width: `${cg.onboardingProgress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Caregiver Detailed Workspace */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-6">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">{selectedCaregiver.fullName}</h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {selectedCaregiver.id}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary-100 text-primary-800">
                  {selectedCaregiver.classification}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Family relationship: <strong>{selectedCaregiver.relationshipToClient}</strong> caring for{' '}
                <span className="text-primary font-semibold underline">{selectedCaregiver.linkedClientName}</span>
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedCaregiver.address}, {selectedCaregiver.city}, {selectedCaregiver.state} {selectedCaregiver.zipCode} • {selectedCaregiver.phone}
              </p>
            </div>

            {/* Activation Button */}
            <div>
              {selectedCaregiver.onboardingStage === 'Active & Activated' ? (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Active for Care & EVV
                </div>
              ) : (
                <button
                  onClick={() => activateCaregiver(selectedCaregiver.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <UserCheck className="w-4 h-4" />
                  Activate Caregiver
                </button>
              )}
            </div>
          </div>

          {/* Linked Household Isolation Warning */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Linked Household Architecture Active</p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Demographics are synchronized with client <strong>{selectedCaregiver.linkedClientName}</strong>, but employee tax credentials, CBI records, and ADP profiles are stored in distinct, HIPAA-isolated records.
              </p>
            </div>
          </div>

          {/* Section 1: Document Packets Verification */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-primary" />
                Required Document Packet ({selectedCaregiver.documents.length} Items)
              </h4>
              <span className="text-xs text-slate-500">
                {selectedCaregiver.documents.filter((d) => d.status === 'Verified').length} of {selectedCaregiver.documents.length} verified
              </span>
            </div>

            <div className="space-y-2">
              {selectedCaregiver.documents.map((doc) => {
                const isVerified = doc.status === 'Verified';
                return (
                  <div
                    key={doc.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-slate-200/80 hover:border-slate-300 bg-white transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{doc.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-slate-100 text-slate-600">
                          {doc.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        File: <span className="font-mono text-slate-700">{doc.fileName || 'Pending upload from caregiver'}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isVerified
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                          }`}
                      >
                        {doc.status}
                      </span>
                      {!isVerified && (
                        <button
                          onClick={() => updateCaregiverDocStatus(selectedCaregiver.id, doc.id, 'Verified')}
                          className="px-2.5 py-1 rounded-lg bg-primary text-white text-[11px] font-semibold hover:bg-primary-600 transition-colors"
                        >
                          Verify Document
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Background Screening & CBI Integration */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-primary" />
                Background & CBI Screening (Colorado Bureau of Investigation)
              </h4>
              <span className="text-[11px] text-slate-500">Automated Direct Verification</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedCaregiver.backgroundChecks.map((bg) => {
                const isPassed = bg.status === 'Passed';
                return (
                  <div key={bg.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-slate-900 leading-snug">{bg.name}</p>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}
                      >
                        {bg.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">Provider: {bg.provider}</p>
                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/60">
                      <span className="text-slate-600">Cost: <strong>{bg.estimatedCost}</strong></span>
                      {!isPassed && (
                        <button
                          onClick={() => runBackgroundCheck(selectedCaregiver.id, bg.id)}
                          className="px-2 py-1 rounded-lg bg-emerald-700 text-white font-semibold text-[10px] hover:bg-emerald-800"
                        >
                          Run CBI Check
                        </button>
                      )}
                      {isPassed && (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Cleared ({bg.completedDate})
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: LearnWorlds Training & ADP Profile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* LearnWorlds Status */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  LearnWorlds Training LMS
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Synced
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Modules Completed:{' '}
                <strong>
                  {selectedCaregiver.trainingStatus.coursesCompleted} / {selectedCaregiver.trainingStatus.coursesAssigned}
                </strong>
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Average Quiz Score: <strong>{selectedCaregiver.trainingStatus.averageQuizScore}%</strong>
              </p>
              <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Orientation video & compliance test verified</span>
              </div>
            </div>

            {/* ADP Payroll Integration */}
            <div className="p-4 rounded-xl border border-slate-200/80 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#F2B632]" />
                  ADP Payroll Engine
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-100 text-primary-800">
                  {selectedCaregiver.adpStatus}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Payer System:{' '}
                <strong>
                  {selectedCaregiver.classification === 'Independent Contractor (1099)'
                    ? 'ADP Workforce Now'
                    : 'ADP Run (Employee)'}
                </strong>
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Tax Identification:{' '}
                <span className="font-mono text-slate-700">***-**-6819 (Verified)</span>
              </p>
              <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Ready for bi-weekly EVV unit disbursement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

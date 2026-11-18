'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePortal } from '@/lib/store/portal-context';
import { ServiceType } from '@/lib/types';
import {
  Plus,
  X,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  FileText,
  User,
  Users,
  Building2,
  ChevronRight,
  Check,
  Calendar,
  Sparkles,
  ExternalLink,
  Phone,
  Mail,
  Send,
  SlidersHorizontal,
} from 'lucide-react';

export type OnboardingTab = 'households' | 'clients' | 'caregivers';

export interface OnboardingHouseholdRecord {
  id: string;
  familyName: string;
  program: ServiceType;
  clientTrack: {
    clientName: string;
    progressPct: number;
    subtext: string;
  };
  caregiverTrack: {
    caregiverNames: string;
    progressPct: number;
    subtext: string;
  };
  caseManager: {
    name: string;
    agency: string;
    status: 'Approved' | 'Awaiting state' | 'Pending';
  };
  overallStatus: 'In onboarding' | 'Ready to start services';
}

export interface OnboardingClientRecord {
  id: string;
  clientName: string;
  familyName: string;
  program: ServiceType;
  packetStatus: 'Signed' | 'Sent' | 'Missing';
  signedDocs: string;
  authorization: 'Approved' | 'Awaiting state' | 'Pending';
  servicePlan: 'Finalized' | 'In Review';
  progressPct: number;
}

export interface OnboardingCaregiverRecord {
  id: string;
  caregiverName: string;
  roleSubtitle: string;
  classification: string;
  linkedHousehold: string;
  screeningStatus: 'Cleared' | 'Pending CBI';
  trainingStatus: string;
  adpSetup: 'Pending' | 'Profile Ready';
  progressPct: number;
}

export const INITIAL_HOUSEHOLDS: OnboardingHouseholdRecord[] = [
  {
    id: 'hh-1',
    familyName: 'Vega Family',
    program: 'IHSS',
    clientTrack: {
      clientName: 'Marisol Vega',
      progressPct: 80,
      subtext: 'Packet Signed',
    },
    caregiverTrack: {
      caregiverNames: 'Rosa Vega',
      progressPct: 55,
      subtext: 'Orientation video',
    },
    caseManager: {
      name: 'Dana Whitfield',
      agency: 'RMHS',
      status: 'Approved',
    },
    overallStatus: 'In onboarding',
  },
  {
    id: 'hh-2',
    familyName: 'Brandt Family',
    program: 'IHSS',
    clientTrack: {
      clientName: 'Eli Brandt',
      progressPct: 100,
      subtext: 'Packet Signed',
    },
    caregiverTrack: {
      caregiverNames: 'Karen Brandt, Dale Brandt',
      progressPct: 70,
      subtext: 'Post-orientation meeting',
    },
    caseManager: {
      name: 'Tom Okafor',
      agency: 'Continuous Care',
      status: 'Approved',
    },
    overallStatus: 'In onboarding',
  },
  {
    id: 'hh-3',
    familyName: 'Nguyen Family',
    program: 'CNA',
    clientTrack: {
      clientName: 'Harper Nguyen',
      progressPct: 60,
      subtext: 'Packet Signed',
    },
    caregiverTrack: {
      caregiverNames: 'Linh Nguyen',
      progressPct: 30,
      subtext: 'Background checks',
    },
    caseManager: {
      name: 'Dana Whitfield',
      agency: 'RMHS',
      status: 'Awaiting state',
    },
    overallStatus: 'In onboarding',
  },
  {
    id: 'hh-4',
    familyName: 'Clarke Family',
    program: 'IRSS',
    clientTrack: {
      clientName: 'Desmond Clarke',
      progressPct: 35,
      subtext: 'Packet Sent',
    },
    caregiverTrack: {
      caregiverNames: 'Tasha Clarke',
      progressPct: 15,
      subtext: 'ID upload',
    },
    caseManager: {
      name: 'Priya Shah',
      agency: 'Developmental Pathways',
      status: 'Pending',
    },
    overallStatus: 'In onboarding',
  },
  {
    id: 'hh-5',
    familyName: 'Park Family',
    program: 'PDN',
    clientTrack: {
      clientName: 'Aiden Park',
      progressPct: 90,
      subtext: 'Packet Signed',
    },
    caregiverTrack: {
      caregiverNames: 'Grace Park',
      progressPct: 85,
      subtext: 'ADP profile',
    },
    caseManager: {
      name: 'Tom Okafor',
      agency: 'Continuous Care',
      status: 'Approved',
    },
    overallStatus: 'In onboarding',
  },
  {
    id: 'hh-6',
    familyName: 'Ruiz Family',
    program: 'HMA',
    clientTrack: {
      clientName: 'Josefina Ruiz',
      progressPct: 50,
      subtext: 'Packet Missing',
    },
    caregiverTrack: {
      caregiverNames: 'Luis Ruiz',
      progressPct: 40,
      subtext: 'LearnWorlds training and quiz',
    },
    caseManager: {
      name: 'Priya Shah',
      agency: 'Developmental Pathways',
      status: 'Pending',
    },
    overallStatus: 'In onboarding',
  },
  {
    id: 'hh-7',
    familyName: 'Voss Family',
    program: 'CFC',
    clientTrack: {
      clientName: 'Lena Voss',
      progressPct: 100,
      subtext: 'Packet Signed',
    },
    caregiverTrack: {
      caregiverNames: 'Kendra Voss',
      progressPct: 100,
      subtext: 'Activation',
    },
    caseManager: {
      name: 'Dana Whitfield',
      agency: 'RMHS',
      status: 'Approved',
    },
    overallStatus: 'Ready to start services',
  },
];

export const INITIAL_CLIENTS: OnboardingClientRecord[] = [
  {
    id: 'cli-1',
    clientName: 'Marisol Vega',
    familyName: 'Vega Family',
    program: 'IHSS',
    packetStatus: 'Signed',
    signedDocs: '4 of 5 signed',
    authorization: 'Approved',
    servicePlan: 'Finalized',
    progressPct: 80,
  },
  {
    id: 'cli-2',
    clientName: 'Eli Brandt',
    familyName: 'Brandt Family',
    program: 'IHSS',
    packetStatus: 'Signed',
    signedDocs: '5 of 5 signed',
    authorization: 'Approved',
    servicePlan: 'Finalized',
    progressPct: 100,
  },
  {
    id: 'cli-3',
    clientName: 'Harper Nguyen',
    familyName: 'Nguyen Family',
    program: 'CNA',
    packetStatus: 'Signed',
    signedDocs: '4 of 5 signed',
    authorization: 'Awaiting state',
    servicePlan: 'In Review',
    progressPct: 60,
  },
  {
    id: 'cli-4',
    clientName: 'Desmond Clarke',
    familyName: 'Clarke Family',
    program: 'IRSS',
    packetStatus: 'Sent',
    signedDocs: '4 of 5 signed',
    authorization: 'Pending',
    servicePlan: 'In Review',
    progressPct: 35,
  },
  {
    id: 'cli-5',
    clientName: 'Aiden Park',
    familyName: 'Park Family',
    program: 'PDN',
    packetStatus: 'Signed',
    signedDocs: '4 of 5 signed',
    authorization: 'Approved',
    servicePlan: 'Finalized',
    progressPct: 90,
  },
  {
    id: 'cli-6',
    clientName: 'Josefina Ruiz',
    familyName: 'Ruiz Family',
    program: 'HMA',
    packetStatus: 'Missing',
    signedDocs: '4 of 5 signed',
    authorization: 'Pending',
    servicePlan: 'In Review',
    progressPct: 50,
  },
  {
    id: 'cli-7',
    clientName: 'Lena Voss',
    familyName: 'Voss Family',
    program: 'CFC',
    packetStatus: 'Signed',
    signedDocs: '5 of 5 signed',
    authorization: 'Approved',
    servicePlan: 'Finalized',
    progressPct: 100,
  },
];

export const INITIAL_CAREGIVERS: OnboardingCaregiverRecord[] = [
  {
    id: 'cg-1',
    caregiverName: 'Rosa Vega',
    roleSubtitle: 'Family Attendant',
    classification: 'Employee (~20 docs)',
    linkedHousehold: 'Vega Family',
    screeningStatus: 'Cleared',
    trainingStatus: 'In Progress (64%)',
    adpSetup: 'Pending',
    progressPct: 55,
  },
  {
    id: 'cg-2',
    caregiverName: 'Karen Brandt',
    roleSubtitle: 'Family Attendant',
    classification: 'Employee (~20 docs)',
    linkedHousehold: 'Brandt Family',
    screeningStatus: 'Cleared',
    trainingStatus: '100% LS3000',
    adpSetup: 'Pending',
    progressPct: 70,
  },
  {
    id: 'cg-3',
    caregiverName: 'Dale Brandt',
    roleSubtitle: 'Family Attendant',
    classification: 'Employee (~20 docs)',
    linkedHousehold: 'Brandt Family',
    screeningStatus: 'Cleared',
    trainingStatus: '100% LS3000',
    adpSetup: 'Pending',
    progressPct: 70,
  },
  {
    id: 'cg-4',
    caregiverName: 'Linh Nguyen',
    roleSubtitle: 'Family Attendant',
    classification: '1099 (~15 docs)',
    linkedHousehold: 'Nguyen Family',
    screeningStatus: 'Pending CBI',
    trainingStatus: 'In Progress (64%)',
    adpSetup: 'Pending',
    progressPct: 30,
  },
  {
    id: 'cg-5',
    caregiverName: 'Tasha Clarke',
    roleSubtitle: 'Family Attendant',
    classification: 'Both (~20 docs)',
    linkedHousehold: 'Clarke Family',
    screeningStatus: 'Pending CBI',
    trainingStatus: 'In Progress (64%)',
    adpSetup: 'Pending',
    progressPct: 15,
  },
  {
    id: 'cg-6',
    caregiverName: 'Grace Park',
    roleSubtitle: 'Family Attendant',
    classification: 'Employee (~20 docs)',
    linkedHousehold: 'Park Family',
    screeningStatus: 'Cleared',
    trainingStatus: '100% LS3000',
    adpSetup: 'Profile Ready',
    progressPct: 85,
  },
  {
    id: 'cg-7',
    caregiverName: 'Luis Ruiz',
    roleSubtitle: 'Family Attendant',
    classification: '1099 (~15 docs)',
    linkedHousehold: 'Ruiz Family',
    screeningStatus: 'Pending CBI',
    trainingStatus: 'In Progress (64%)',
    adpSetup: 'Pending',
    progressPct: 40,
  },
  {
    id: 'cg-8',
    caregiverName: 'Kendra Voss',
    roleSubtitle: 'Family Attendant',
    classification: 'Employee (~20 docs)',
    linkedHousehold: 'Voss Family',
    screeningStatus: 'Cleared',
    trainingStatus: '100% LS3000',
    adpSetup: 'Profile Ready',
    progressPct: 100,
  },
];

export function OnboardingHouseholdPortal() {
  const { notify } = usePortal();

  // Active Tab: 'households' | 'clients' | 'caregivers'
  const [activeTab, setActiveTab] = useState<OnboardingTab>('households');

  // Household, Client, Caregiver records in state
  const [households, setHouseholds] = useState<OnboardingHouseholdRecord[]>(INITIAL_HOUSEHOLDS);
  const [clients, setClients] = useState<OnboardingClientRecord[]>(INITIAL_CLIENTS);
  const [caregivers, setCaregivers] = useState<OnboardingCaregiverRecord[]>(INITIAL_CAREGIVERS);

  // Search Filter
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [showStartHouseholdModal, setShowStartHouseholdModal] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState<OnboardingHouseholdRecord | null>(null);
  const [selectedClient, setSelectedClient] = useState<OnboardingClientRecord | null>(null);
  const [selectedCaregiver, setSelectedCaregiver] = useState<OnboardingCaregiverRecord | null>(null);

  // Form State for + Start Household
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newProgram, setNewProgram] = useState<ServiceType>('IHSS');
  const [newClientName, setNewClientName] = useState('');
  const [newCaregiverName, setNewCaregiverName] = useState('');
  const [newCaseManager, setNewCaseManager] = useState('');
  const [newAgency, setNewAgency] = useState('RMHS');

  // Filtered lists
  const filteredHouseholds = useMemo(() => {
    if (!searchQuery.trim()) return households;
    const q = searchQuery.toLowerCase();
    return households.filter(
      (h) =>
        h.familyName.toLowerCase().includes(q) ||
        h.clientTrack.clientName.toLowerCase().includes(q) ||
        h.caregiverTrack.caregiverNames.toLowerCase().includes(q) ||
        h.caseManager.name.toLowerCase().includes(q) ||
        h.program.toLowerCase().includes(q)
    );
  }, [households, searchQuery]);

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients;
    const q = searchQuery.toLowerCase();
    return clients.filter(
      (c) =>
        c.clientName.toLowerCase().includes(q) ||
        c.familyName.toLowerCase().includes(q) ||
        c.program.toLowerCase().includes(q)
    );
  }, [clients, searchQuery]);

  const filteredCaregivers = useMemo(() => {
    if (!searchQuery.trim()) return caregivers;
    const q = searchQuery.toLowerCase();
    return caregivers.filter(
      (cg) =>
        cg.caregiverName.toLowerCase().includes(q) ||
        cg.linkedHousehold.toLowerCase().includes(q) ||
        cg.classification.toLowerCase().includes(q)
    );
  }, [caregivers, searchQuery]);

  // Create Household handler
  const handleCreateHousehold = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFamilyName.trim() || !newClientName.trim()) {
      notify('Missing Information', 'Please provide a household family name and primary client name.', 'warning');
      return;
    }

    const newHh: OnboardingHouseholdRecord = {
      id: `hh-${Date.now()}`,
      familyName: newFamilyName.includes('Family') ? newFamilyName : `${newFamilyName} Family`,
      program: newProgram,
      clientTrack: {
        clientName: newClientName,
        progressPct: 20,
        subtext: 'Packet Sent',
      },
      caregiverTrack: {
        caregiverNames: newCaregiverName || 'Pending Designation',
        progressPct: 10,
        subtext: 'Application review',
      },
      caseManager: {
        name: newCaseManager || 'State Intake Coordinator',
        agency: newAgency,
        status: 'Pending',
      },
      overallStatus: 'In onboarding',
    };

    setHouseholds([newHh, ...households]);

    // Also register linked client
    const newCli: OnboardingClientRecord = {
      id: `cli-${Date.now()}`,
      clientName: newClientName,
      familyName: newHh.familyName,
      program: newProgram,
      packetStatus: 'Sent',
      signedDocs: '1 of 5 signed',
      authorization: 'Pending',
      servicePlan: 'In Review',
      progressPct: 20,
    };
    setClients([newCli, ...clients]);

    // If caregiver name provided, register linked caregiver
    if (newCaregiverName.trim()) {
      const newCg: OnboardingCaregiverRecord = {
        id: `cg-${Date.now()}`,
        caregiverName: newCaregiverName,
        roleSubtitle: 'Family Attendant',
        classification: 'Employee (~20 docs)',
        linkedHousehold: newHh.familyName,
        screeningStatus: 'Pending CBI',
        trainingStatus: 'In Progress (0%)',
        adpSetup: 'Pending',
        progressPct: 10,
      };
      setCaregivers([newCg, ...caregivers]);
    }

    setShowStartHouseholdModal(false);
    setNewFamilyName('');
    setNewClientName('');
    setNewCaregiverName('');
    setNewCaseManager('');
    notify('Household Initiated', `${newHh.familyName} onboarding tracks opened successfully!`, 'success');
  };

  // Render Service Pill helper
  const renderServicePill = (service: ServiceType) => {
    return (
      <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wide inline-block">
        {service}
      </span>
    );
  };

  return (
    <div className="space-y-4 pb-16 select-none">
      {/* ========================================================================= */}
      {/* 1. PAGE TITLE & ACTION HEADER ROW                                         */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Onboarding
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Households: one client and their linked caregiver(s)
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowStartHouseholdModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Start household</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. THREE NAVIGATION TABS (Households (7) • Clients (7) • Caregivers (8))  */}
      {/* ========================================================================= */}
      <div className="border-b border-slate-200/90 pt-1">
        <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto text-xs font-bold">
          {/* Tab 1: Households (7) */}
          <button
            type="button"
            onClick={() => setActiveTab('households')}
            className={`pb-3 pt-1 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${activeTab === 'households'
              ? 'border-purple-600 text-purple-700 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
            <span>Households ({households.length})</span>
          </button>

          {/* Tab 2: Clients (7) */}
          <button
            type="button"
            onClick={() => setActiveTab('clients')}
            className={`pb-3 pt-1 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${activeTab === 'clients'
              ? 'border-blue-600 text-blue-700 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <span>Clients ({clients.length})</span>
          </button>

          {/* Tab 3: Caregivers (8) */}
          <button
            type="button"
            onClick={() => setActiveTab('caregivers')}
            className={`pb-3 pt-1 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${activeTab === 'caregivers'
              ? 'border-[#264e1e] text-[#264e1e] font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
            <span>Caregivers ({caregivers.length})</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SUBHEADER CONTEXT NOTE & LEGEND PILL                                    */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-0.5">
        <p className="text-slate-500 font-medium">
          {activeTab === 'households' && (
            <span>
              Showing {filteredHouseholds.length} active onboarding households · Both client and caregiver tracks must clear before start
            </span>
          )}
          {activeTab === 'clients' && (
            <span>
              Client intake &amp; documentation tracks · Blue = Client
            </span>
          )}
          {activeTab === 'caregivers' && (
            <span>
              Caregiver hiring &amp; onboarding tracks · Green = Caregiver
            </span>
          )}
        </p>

        <div className="shrink-0 self-start sm:self-auto">
          {activeTab === 'households' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md border border-purple-200 bg-purple-50 text-purple-700 font-semibold text-[11px]">
              Purple = Household
            </span>
          )}
          {activeTab === 'clients' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md border border-blue-200 bg-blue-50 text-blue-700 font-semibold text-[11px]">
              Blue = Client
            </span>
          )}
          {activeTab === 'caregivers' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-800 font-semibold text-[11px]">
              Green = Caregiver
            </span>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. ACTIVE TAB TABLE VIEW                                                  */}
      {/* ========================================================================= */}
      <div className="portal-table-container">
        {/* ======================================================================= */}
        {/* TAB 1: HOUSEHOLDS TABLE (Matches Image 1)                               */}
        {/* ======================================================================= */}
        {activeTab === 'households' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="portal-table-head">
                  <th className="py-3 px-4">HOUSEHOLD / FAMILY</th>
                  <th className="py-3 px-3">PROGRAM</th>
                  <th className="py-3 px-4 min-w-[170px]">CLIENT TRACK (BLUE)</th>
                  <th className="py-3 px-4 min-w-[210px]">CAREGIVER TRACK (GREEN)</th>
                  <th className="py-3 px-3 min-w-[160px]">CASE MANAGER</th>
                  <th className="py-3 px-3">OVERALL STATUS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredHouseholds.map((hh) => {
                  return (
                    <tr
                      key={hh.id}
                      onClick={() => setSelectedHousehold(hh)}
                      className="portal-table-row cursor-pointer"
                    >
                      {/* 1. HOUSEHOLD / FAMILY */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1 items-start">
                          <span className="font-bold text-slate-900 group-hover:text-[#264e1e] transition-colors">
                            {hh.familyName}
                          </span>
                          <span className="bg-[#f3e8ff] text-[#7e22ce] text-[9px] font-black px-1.5 py-0.5 rounded tracking-wide">
                            HOUSEHOLD
                          </span>
                        </div>
                      </td>

                      {/* 2. PROGRAM */}
                      <td className="py-3.5 px-3">
                        {renderServicePill(hh.program)}
                      </td>

                      {/* 3. CLIENT TRACK (BLUE) */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 truncate">
                              {hh.clientTrack.clientName}
                            </span>
                            <span className="text-[11px] font-bold text-blue-600 font-mono ml-2">
                              {hh.clientTrack.progressPct}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full transition-all duration-300"
                              style={{ width: `${hh.clientTrack.progressPct}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {hh.clientTrack.subtext}
                          </p>
                        </div>
                      </td>

                      {/* 4. CAREGIVER TRACK (GREEN) */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 truncate">
                              {hh.caregiverTrack.caregiverNames}
                            </span>
                            <span className="text-[11px] font-bold text-[#2b501a] font-mono ml-2">
                              {hh.caregiverTrack.progressPct}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#2b501a] rounded-full transition-all duration-300"
                              style={{ width: `${hh.caregiverTrack.progressPct}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {hh.caregiverTrack.subtext}
                          </p>
                        </div>
                      </td>

                      {/* 5. CASE MANAGER */}
                      <td className="py-3.5 px-3">
                        <p className="font-medium text-slate-800">
                          {hh.caseManager.name} ({hh.caseManager.agency})
                        </p>
                        <div className="mt-0.5">
                          {hh.caseManager.status === 'Approved' && (
                            <span className="text-[11px] font-semibold text-emerald-700">
                              Approved
                            </span>
                          )}
                          {hh.caseManager.status === 'Awaiting state' && (
                            <span className="text-[11px] font-semibold text-amber-700">
                              Awaiting state
                            </span>
                          )}
                          {hh.caseManager.status === 'Pending' && (
                            <span className="text-[11px] font-semibold text-orange-600">
                              Pending
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 6. OVERALL STATUS */}
                      <td className="py-3.5 px-3">
                        {hh.overallStatus === 'Ready to start services' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                            <span>✓</span>
                            <span>Ready to start services</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#fefce8] text-[#854d0e] border border-[#fef08a]">
                            <span>⏳</span>
                            <span>In onboarding</span>
                          </span>
                        )}
                      </td>

                      {/* 7. ACTIONS */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedHousehold(hh);
                          }}
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900 group-hover:text-[#264e1e] transition-colors inline-flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>View household</span>
                          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 2: CLIENTS TABLE (Matches Image 2)                                  */}
        {/* ======================================================================= */}
        {activeTab === 'clients' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="portal-table-head">
                  <th className="py-3 px-4">CLIENT NAME</th>
                  <th className="py-3 px-3">PROGRAM</th>
                  <th className="py-3 px-3">CLIENT PACKET</th>
                  <th className="py-3 px-3">SIGNED DOCS</th>
                  <th className="py-3 px-3">AUTHORIZATION</th>
                  <th className="py-3 px-3">SERVICE PLAN</th>
                  <th className="py-3 px-4 min-w-[140px]">CLIENT PROGRESS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredClients.map((c) => {
                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedClient(c)}
                      className="portal-table-row cursor-pointer"
                    >
                      {/* 1. CLIENT NAME */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 group-hover:text-[#264e1e] transition-colors">
                              {c.clientName}
                            </span>
                            <span className="bg-blue-100 text-blue-700 font-black text-[9px] px-1.5 py-0.2 rounded">
                              CLIENT
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {c.familyName}
                          </p>
                        </div>
                      </td>

                      {/* 2. PROGRAM */}
                      <td className="py-3.5 px-3">
                        {renderServicePill(c.program)}
                      </td>

                      {/* 3. CLIENT PACKET */}
                      <td className="py-3.5 px-3">
                        {c.packetStatus === 'Signed' && (
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                            Signed
                          </span>
                        )}
                        {c.packetStatus === 'Sent' && (
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#fefce8] text-[#854d0e] border border-[#fef08a]">
                            Sent
                          </span>
                        )}
                        {c.packetStatus === 'Missing' && (
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#fef2f2] text-[#991b1b] border border-[#fecaca]">
                            Missing
                          </span>
                        )}
                      </td>

                      {/* 4. SIGNED DOCS */}
                      <td className="py-3.5 px-3 text-slate-700 font-medium font-mono text-[11px]">
                        {c.signedDocs}
                      </td>

                      {/* 5. AUTHORIZATION */}
                      <td className="py-3.5 px-3">
                        {c.authorization === 'Approved' && (
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Approved
                          </span>
                        )}
                        {c.authorization === 'Awaiting state' && (
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            Awaiting state
                          </span>
                        )}
                        {c.authorization === 'Pending' && (
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-orange-50 text-orange-800 border border-orange-200">
                            Pending
                          </span>
                        )}
                      </td>

                      {/* 6. SERVICE PLAN */}
                      <td className="py-3.5 px-3 text-slate-700 font-medium">
                        {c.servicePlan}
                      </td>

                      {/* 7. CLIENT PROGRESS */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <span className="font-bold text-blue-600 font-mono text-[11px] block">
                            {c.progressPct}%
                          </span>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full transition-all duration-300"
                              style={{ width: `${c.progressPct}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* 8. ACTIONS */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedClient(c);
                          }}
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900 group-hover:text-[#264e1e] transition-colors inline-flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>Open packet</span>
                          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 3: CAREGIVERS TABLE (Matches Image 3)                                */}
        {/* ======================================================================= */}
        {activeTab === 'caregivers' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="portal-table-head">
                  <th className="py-3 px-4">CAREGIVER NAME</th>
                  <th className="py-3 px-3">CLASSIFICATION</th>
                  <th className="py-3 px-3">LINKED HOUSEHOLD</th>
                  <th className="py-3 px-3">SCREENING (CBI/OIG)</th>
                  <th className="py-3 px-3 min-w-[150px]">TRAINING (LEARNWORLDS)</th>
                  <th className="py-3 px-3">ADP SETUP</th>
                  <th className="py-3 px-4 min-w-[140px]">CAREGIVER PROGRESS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredCaregivers.map((cg) => {
                  return (
                    <tr
                      key={cg.id}
                      onClick={() => setSelectedCaregiver(cg)}
                      className="portal-table-row cursor-pointer"
                    >
                      {/* 1. CAREGIVER NAME */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 group-hover:text-[#264e1e] transition-colors">
                              {cg.caregiverName}
                            </span>
                            <span className="bg-emerald-100 text-emerald-800 font-bold text-[9px] px-1.5 py-0.2 rounded uppercase">
                              CAREGIVER
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {cg.roleSubtitle}
                          </p>
                        </div>
                      </td>

                      {/* 2. CLASSIFICATION */}
                      <td className="py-3.5 px-3 text-slate-700 font-medium">
                        {cg.classification}
                      </td>

                      {/* 3. LINKED HOUSEHOLD */}
                      <td className="py-3.5 px-3 font-semibold text-slate-800">
                        {cg.linkedHousehold}
                      </td>

                      {/* 4. SCREENING (CBI/OIG) */}
                      <td className="py-3.5 px-3">
                        {cg.screeningStatus === 'Cleared' ? (
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Cleared
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            Pending CBI
                          </span>
                        )}
                      </td>

                      {/* 5. TRAINING (LEARNWORLDS) */}
                      <td className="py-3.5 px-3 text-slate-700 font-medium">
                        {cg.trainingStatus}
                      </td>

                      {/* 6. ADP SETUP */}
                      <td className="py-3.5 px-3">
                        {cg.adpSetup === 'Profile Ready' ? (
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Profile Ready
                          </span>
                        ) : (
                          <span className="text-slate-600 font-medium text-[11px]">
                            Pending
                          </span>
                        )}
                      </td>

                      {/* 7. CAREGIVER PROGRESS */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <span className="font-bold text-[#2b501a] font-mono text-[11px] block">
                            {cg.progressPct}%
                          </span>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#2b501a] rounded-full transition-all duration-300"
                              style={{ width: `${cg.progressPct}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* 8. ACTIONS */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCaregiver(cg);
                          }}
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900 group-hover:text-[#264e1e] transition-colors inline-flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>View docs</span>
                          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5. START HOUSEHOLD MODAL                                                  */}
      {/* ========================================================================= */}
      {showStartHouseholdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                <h2 className="text-base font-black text-slate-900">
                  Start New Onboarding Household
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowStartHouseholdModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateHousehold} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wide block mb-1">
                  Household / Family Name *
                </label>
                <input
                  type="text"
                  required
                  value={newFamilyName}
                  onChange={(e) => setNewFamilyName(e.target.value)}
                  placeholder="e.g. Mendoza Family"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#264e1e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 uppercase tracking-wide block mb-1">
                    Program Waiver *
                  </label>
                  <select
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value as ServiceType)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#264e1e] font-semibold"
                  >
                    <option value="IHSS">IHSS</option>
                    <option value="CFC">CFC</option>
                    <option value="CNA">CNA</option>
                    <option value="IRSS">IRSS</option>
                    <option value="PDN">PDN</option>
                    <option value="HMA">HMA</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 uppercase tracking-wide block mb-1">
                    Case Management Agency
                  </label>
                  <select
                    value={newAgency}
                    onChange={(e) => setNewAgency(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#264e1e] font-semibold"
                  >
                    <option value="RMHS">RMHS</option>
                    <option value="Continuous Care">Continuous Care</option>
                    <option value="Developmental Pathways">Developmental Pathways</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wide block mb-1">
                  Primary Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Carlos Mendoza"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#264e1e]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wide block mb-1">
                  Linked Family Caregiver(s)
                </label>
                <input
                  type="text"
                  value={newCaregiverName}
                  onChange={(e) => setNewCaregiverName(e.target.value)}
                  placeholder="e.g. Maria Mendoza"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#264e1e]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wide block mb-1">
                  Case Manager Coordinator
                </label>
                <input
                  type="text"
                  value={newCaseManager}
                  onChange={(e) => setNewCaseManager(e.target.value)}
                  placeholder="e.g. Dana Whitfield"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#264e1e]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowStartHouseholdModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl font-bold transition-all shadow-xs cursor-pointer"
                >
                  Start Household
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SLIDE-OVER DETAIL DRAWERS FOR HOUSEHOLD, CLIENT, OR CAREGIVER          */}
      {/* ========================================================================= */}
      {/* A. Household Detail Drawer */}
      {selectedHousehold && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedHousehold(null)}
          />

          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    {selectedHousehold.familyName}
                  </h2>
                  <span className="bg-[#f3e8ff] text-[#7e22ce] text-[10px] font-black px-2 py-0.5 rounded">
                    HOUSEHOLD
                  </span>
                  {renderServicePill(selectedHousehold.program)}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Case Manager: {selectedHousehold.caseManager.name} ({selectedHousehold.caseManager.agency})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedHousehold(null)}
                className="w-8 h-8 rounded-xl bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
              {/* Overall Status Banner */}
              <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    OVERALL ONBOARDING STATUS
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                    {selectedHousehold.overallStatus}
                  </span>
                </div>
                {selectedHousehold.overallStatus === 'Ready to start services' ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]">
                    ✓ Cleared for EVV
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setHouseholds(
                        households.map((h) =>
                          h.id === selectedHousehold.id
                            ? {
                              ...h,
                              overallStatus: 'Ready to start services',
                              clientTrack: { ...h.clientTrack, progressPct: 100 },
                              caregiverTrack: { ...h.caregiverTrack, progressPct: 100 },
                            }
                            : h
                        )
                      );
                      setSelectedHousehold({
                        ...selectedHousehold,
                        overallStatus: 'Ready to start services',
                        clientTrack: { ...selectedHousehold.clientTrack, progressPct: 100 },
                        caregiverTrack: { ...selectedHousehold.caregiverTrack, progressPct: 100 },
                      });
                      notify('Services Cleared', `${selectedHousehold.familyName} is now ready for service start!`, 'success');
                    }}
                    className="px-3 py-1.5 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl font-bold cursor-pointer transition-all"
                  >
                    Clear All &amp; Start Services
                  </button>
                )}
              </div>

              {/* Client Track Box */}
              <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900 flex items-center gap-1.5 text-xs">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Client Track: {selectedHousehold.clientTrack.clientName}</span>
                  </span>
                  <span className="font-mono font-bold text-blue-700">
                    {selectedHousehold.clientTrack.progressPct}%
                  </span>
                </div>
                <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${selectedHousehold.clientTrack.progressPct}%` }}
                  />
                </div>
                <p className="text-[11px] text-blue-800 font-medium">
                  Status: {selectedHousehold.clientTrack.subtext} · Prior authorization submitted.
                </p>
              </div>

              {/* Caregiver Track Box */}
              <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-xs">
                    <Users className="w-4 h-4 text-[#264e1e]" />
                    <span>Caregiver Track: {selectedHousehold.caregiverTrack.caregiverNames}</span>
                  </span>
                  <span className="font-mono font-bold text-[#264e1e]">
                    {selectedHousehold.caregiverTrack.progressPct}%
                  </span>
                </div>
                <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2b501a] rounded-full"
                    style={{ width: `${selectedHousehold.caregiverTrack.progressPct}%` }}
                  />
                </div>
                <p className="text-[11px] text-emerald-900 font-medium">
                  Status: {selectedHousehold.caregiverTrack.subtext} · 20 compliance forms and CBI screening.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    notify('Reminders Dispatched', `Automated compliance alerts sent to ${selectedHousehold.familyName}.`, 'info');
                  }}
                  className="flex-1 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer text-center"
                >
                  Send Reminders
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedHousehold(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* B. Client Packet Drawer */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedClient(null)}
          />

          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    {selectedClient.clientName}
                  </h2>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded">
                    CLIENT
                  </span>
                  {renderServicePill(selectedClient.program)}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Linked Household: {selectedClient.familyName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedClient(null)}
                className="w-8 h-8 rounded-xl bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  5-DOCUMENT CLIENT PACKET
                </span>
                <div className="space-y-2">
                  {[
                    { name: 'Medicaid Prior Authorization Request (PAR)', status: 'Signed & Certified' },
                    { name: 'Mutual Service Agreement', status: 'Signed electronically' },
                    { name: 'Family Caregiver Designation Form', status: 'Signed' },
                    { name: 'HIPAA & Consent to Treat', status: 'Completed' },
                    { name: 'Sandata EVV Client Telephony Consent', status: selectedClient.signedDocs.includes('5') ? 'Completed' : 'Pending Client Signature' },
                  ].map((doc, idx) => (
                    <div key={idx} className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{doc.name}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedClient(null)}
                  className="px-4 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* C. Caregiver Docs Drawer */}
      {selectedCaregiver && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedCaregiver(null)}
          />

          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    {selectedCaregiver.caregiverName}
                  </h2>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    CAREGIVER
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedCaregiver.classification} · {selectedCaregiver.linkedHousehold}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCaregiver(null)}
                className="w-8 h-8 rounded-xl bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  CAREGIVER ONBOARDING VERIFICATION
                </span>
                <p><strong className="text-slate-800">CBI / OIG Background Check:</strong> {selectedCaregiver.screeningStatus}</p>
                <p><strong className="text-slate-800">LearnWorlds Training Curriculum:</strong> {selectedCaregiver.trainingStatus}</p>
                <p><strong className="text-slate-800">ADP Payroll Provisioning:</strong> {selectedCaregiver.adpSetup}</p>
                <p><strong className="text-slate-800">Document Progress:</strong> {selectedCaregiver.progressPct}% complete</p>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedCaregiver(null)}
                  className="px-4 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

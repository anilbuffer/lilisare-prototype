'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePortal } from '@/lib/store/portal-context';
import { Lead, LeadStatus, ServiceType } from '@/lib/types';
import {
  Search,
  Plus,
  X,
  Filter,
  Calendar,
  Clock,
  Phone,
  Mail,
  Building2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  User,
  Users,
  Check,
  ChevronDown,
  FileText,
  UserCheck,
  ShieldCheck,
  Send,
  MessageSquare,
  Award,
  DollarSign,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';

export const INTAKE_STAGES: LeadStatus[] = [
  'New Inquiry',
  'Contacted',
  'Needs Discussion',
  'Case Manager Coordination',
  'Family Decision',
  'Converted',
  'Closed / Not Proceeding',
];

const STAGE_THEMES: Record<
  LeadStatus,
  {
    label: string;
    dotColor: string;
    bgTint: string;
    borderColor: string;
    countBg: string;
    countText: string;
  }
> = {
  'New Inquiry': {
    label: 'New Inquiry',
    dotColor: 'bg-emerald-600',
    bgTint: 'bg-[#f4f9f4]',
    borderColor: 'border-[#dcf2e3]',
    countBg: 'bg-emerald-100',
    countText: 'text-emerald-900',
  },
  'Contact Pending': {
    label: 'New Inquiry',
    dotColor: 'bg-emerald-600',
    bgTint: 'bg-[#f4f9f4]',
    borderColor: 'border-[#dcf2e3]',
    countBg: 'bg-emerald-100',
    countText: 'text-emerald-900',
  },
  'Contacted': {
    label: 'Contacted',
    dotColor: 'bg-blue-600',
    bgTint: 'bg-[#f4f8fd]',
    borderColor: 'border-[#e1edf8]',
    countBg: 'bg-blue-100',
    countText: 'text-blue-900',
  },
  'Needs Discussion': {
    label: 'Needs Discussion',
    dotColor: 'bg-amber-600',
    bgTint: 'bg-[#fffdf2]',
    borderColor: 'border-[#fef0c7]',
    countBg: 'bg-amber-100',
    countText: 'text-amber-900',
  },
  'Needs Clarification': {
    label: 'Needs Discussion',
    dotColor: 'bg-amber-600',
    bgTint: 'bg-[#fffdf2]',
    borderColor: 'border-[#fef0c7]',
    countBg: 'bg-amber-100',
    countText: 'text-amber-900',
  },
  'Case Manager Coordination': {
    label: 'CMA Coordination',
    dotColor: 'bg-purple-600',
    bgTint: 'bg-[#faf5ff]',
    borderColor: 'border-[#f3e8ff]',
    countBg: 'bg-purple-100',
    countText: 'text-purple-900',
  },
  'Family Decision': {
    label: 'Family Decision',
    dotColor: 'bg-indigo-600',
    bgTint: 'bg-[#f5f6ff]',
    borderColor: 'border-[#e0e7ff]',
    countBg: 'bg-indigo-100',
    countText: 'text-indigo-900',
  },
  'Follow-up Scheduled': {
    label: 'Family Decision',
    dotColor: 'bg-indigo-600',
    bgTint: 'bg-[#f5f6ff]',
    borderColor: 'border-[#e0e7ff]',
    countBg: 'bg-indigo-100',
    countText: 'text-indigo-900',
  },
  'Converted': {
    label: 'Converted',
    dotColor: 'bg-emerald-700',
    bgTint: 'bg-[#f0fdf4]',
    borderColor: 'border-[#bbf7d0]',
    countBg: 'bg-emerald-200',
    countText: 'text-emerald-950',
  },
  'Closed / Not Proceeding': {
    label: 'Closed',
    dotColor: 'bg-slate-400',
    bgTint: 'bg-[#f8fafc]',
    borderColor: 'border-[#e2e8f0]',
    countBg: 'bg-slate-200',
    countText: 'text-slate-800',
  },
};

const INTAKE_STEPS_LABELS = [
  'Inquiry logged',
  'Family contacted',
  'Needs assessed',
  'Case manager linked',
  'Medicaid waiver review',
  'Family agreement',
  'Service converted',
];

const getLeadCounty = (lead: Lead): string => {
  if ((lead as any).county) return (lead as any).county;
  if (lead.referralAgency?.includes('Rocky Mountain') || lead.referralAgency?.includes('RMHS')) return 'Denver';
  if (lead.referralAgency?.includes('Developmental Pathways')) return 'Arapahoe';
  if (lead.referralAgency?.includes('Imagine')) return 'Boulder';
  if (lead.referralAgency?.includes('North Metro')) return 'Adams';
  if (lead.referralAgency?.includes('Continuum')) return 'Jefferson';
  return 'Denver';
};

export function ClientIntakePortal() {
  const router = useRouter();
  const { leads, updateLeadStatus, updateLead, addLead, notify } = usePortal();

  // View mode: 'board' or 'list'
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('All Stages');
  const [ownerFilter, setOwnerFilter] = useState('All Intake Staff');
  const [serviceFilter, setServiceFilter] = useState('All Services');
  const [sourceFilter, setSourceFilter] = useState('All Sources');
  const [countyFilter, setCountyFilter] = useState('All Counties');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const isFiltered =
    searchQuery.trim() !== '' ||
    stageFilter !== 'All Stages' ||
    ownerFilter !== 'All Intake Staff' ||
    serviceFilter !== 'All Services' ||
    sourceFilter !== 'All Sources' ||
    countyFilter !== 'All Counties' ||
    priorityFilter !== 'All Priorities';

  const handleClearFilters = () => {
    setSearchQuery('');
    setStageFilter('All Stages');
    setOwnerFilter('All Intake Staff');
    setServiceFilter('All Services');
    setSourceFilter('All Sources');
    setCountyFilter('All Counties');
    setPriorityFilter('All Priorities');
  };

  // Selected lead for detail modal (matching CaregiverIntake's centered modal)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailActiveTab, setDetailActiveTab] = useState<'overview' | 'clinical' | 'authorizations' | 'communication'>('overview');

  // Wizard Step Titles matching Patient Registration Wizard
  const clientWizardStepTitles = [
    'Patient Information',
    'Responsible Party',
    'Service, Waiver & CMA',
    'Pipeline & Review',
  ];

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [addInitialStage, setAddInitialStage] = useState<LeadStatus>('New Inquiry');
  const [showLogConsultationModal, setShowLogConsultationModal] = useState(false);
  const [consultationNotes, setConsultationNotes] = useState('');
  const [consultationDate, setConsultationDate] = useState('2026-11-20');
  const [consultationTime, setConsultationTime] = useState('10:00 AM');
  const [consultationType, setConsultationType] = useState('Initial Phone Consultation');
  const [showSourceInsightsModal, setShowSourceInsightsModal] = useState(false);

  // Add Client Inquiry Wizard state (Step 1 to 4 matching Patient Registration Wizard)
  const [addStep, setAddStep] = useState(1);
  const [newClientFirstName, setNewClientFirstName] = useState('');
  const [newClientLastName, setNewClientLastName] = useState('');
  const [newClientDob, setNewClientDob] = useState('2016-04-12');
  const [newClientGender, setNewClientGender] = useState('Male');
  const [newMedicaidId, setNewMedicaidId] = useState('CO-984421008');
  const [newStreet, setNewStreet] = useState('4820 Mountain Crest Dr');
  const [newCity, setNewCity] = useState('Denver');
  const [newState, setNewState] = useState('CO');
  const [newZip, setNewZip] = useState('80219');
  const [newCounty, setNewCounty] = useState('Denver');
  const [newPhone, setNewPhone] = useState('(303) 555-0142');
  const [newEmergencyContact, setNewEmergencyContact] = useState('Carlos Morales (Uncle) · (303) 555-0199');

  // Step 2: Responsible Party & Family Caregiver
  const [newContactName, setNewContactName] = useState('');
  const [newRelationship, setNewRelationship] = useState('Mother');
  const [newContactPhone, setNewContactPhone] = useState('(303) 555-0142');
  const [newEmail, setNewEmail] = useState('');
  const [newDesignatedCaregiver, setNewDesignatedCaregiver] = useState('Elena Morales (Designated Family Caregiver)');

  // Step 3: Service, Waiver Program & CMA
  const [newService, setNewService] = useState<ServiceType>('IHSS');
  const [newWaiver, setNewWaiver] = useState('HCBS-CES (Children’s Extensive Support)');
  const [newWeeklyHours, setNewWeeklyHours] = useState('32.0 hrs/week');
  const [newCmaAgency, setNewCmaAgency] = useState('Rocky Mountain Human Services (RMHS)');
  const [newCaseManagerName, setNewCaseManagerName] = useState('Sarah Jenkins');
  const [newCaseManagerPhone, setNewCaseManagerPhone] = useState('(303) 636-5600');
  const [newCaseManagerEmail, setNewCaseManagerEmail] = useState('sjenkins@rmhs.org');

  // Step 4: Pipeline Assignment & Review
  const [newSource, setNewSource] = useState('Website');
  const [newOwner, setNewOwner] = useState('Maya R.');
  const [newNotes, setNewNotes] = useState('');

  // Drag-and-drop state
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // 1. Stage filter
      if (stageFilter !== 'All Stages') {
        let currentLeadStage = lead.status;
        if (currentLeadStage === 'Contact Pending') currentLeadStage = 'New Inquiry';
        if (currentLeadStage === 'Needs Clarification') currentLeadStage = 'Needs Discussion';
        if (currentLeadStage === 'Follow-up Scheduled') currentLeadStage = 'Family Decision';
        if (currentLeadStage !== stageFilter) return false;
      }

      // 2. Comprehensive Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const county = getLeadCounty(lead).toLowerCase();
        const matchesName = lead.clientName.toLowerCase().includes(q);
        const matchesContact = lead.primaryContactName.toLowerCase().includes(q);
        const matchesPhone = lead.phone ? lead.phone.toLowerCase().includes(q) : false;
        const matchesEmail = lead.email ? lead.email.toLowerCase().includes(q) : false;
        const matchesAgency = lead.referralAgency ? lead.referralAgency.toLowerCase().includes(q) : false;
        const matchesService = lead.requestedService ? lead.requestedService.toLowerCase().includes(q) : false;
        const matchesStaff = (lead.assignedStaff || lead.ownerName || '').toLowerCase().includes(q);
        const matchesCounty = county.includes(q);
        const matchesNotes = lead.notes ? lead.notes.toLowerCase().includes(q) : false;
        if (
          !matchesName &&
          !matchesContact &&
          !matchesPhone &&
          !matchesEmail &&
          !matchesAgency &&
          !matchesService &&
          !matchesStaff &&
          !matchesCounty &&
          !matchesNotes
        )
          return false;
      }

      // 3. Owner / Staff filter
      if (ownerFilter !== 'All Intake Staff') {
        const leadOwner = lead.ownerName || lead.assignedStaff;
        if (leadOwner !== ownerFilter) return false;
      }

      // 4. Service filter
      if (serviceFilter !== 'All Services') {
        if (lead.requestedService !== serviceFilter) return false;
      }

      // 5. Source filter
      if (sourceFilter !== 'All Sources') {
        const cat = lead.sourceCategory || lead.inquirySource;
        if (!cat.toLowerCase().includes(sourceFilter.toLowerCase())) return false;
      }

      // 6. County filter
      if (countyFilter !== 'All Counties') {
        if (getLeadCounty(lead) !== countyFilter) return false;
      }

      // 7. Priority / Alert filter
      if (priorityFilter !== 'All Priorities') {
        if (priorityFilter === 'Overdue Only' && !lead.isOverdue) return false;
        if (priorityFilter === 'Awaiting case manager' && lead.alertBadge !== 'Awaiting case manager') return false;
        if (priorityFilter === 'Docs missing' && lead.alertBadge !== 'Docs missing') return false;
        if (priorityFilter === 'Payment at risk' && lead.alertBadge !== 'Payment at risk') return false;
      }

      return true;
    });
  }, [leads, searchQuery, stageFilter, ownerFilter, serviceFilter, sourceFilter, countyFilter, priorityFilter]);

  // Key Metrics matching Caregiver Intake's 5 cards layout:
  // 1. Open inquiries
  // 2. Family contacted
  // 3. CMA coordination
  // 4. Converted this month
  // 5. Avg days to convert
  const openInquiriesCount = useMemo(() => {
    return leads.filter(
      (l) => l.status !== 'Converted' && l.status !== 'Closed / Not Proceeding'
    ).length;
  }, [leads]);

  const contactedCount = useMemo(() => {
    return leads.filter((l) => l.status === 'Contacted').length;
  }, [leads]);

  const cmaCoordinationCount = useMemo(() => {
    return leads.filter(
      (l) => l.status === 'Case Manager Coordination' || l.status === 'Needs Discussion'
    ).length;
  }, [leads]);

  const convertedCount = useMemo(() => {
    return leads.filter((l) => l.status === 'Converted').length + 5;
  }, [leads]);

  const avgDaysToConvert = '11d';

  // Group leads by 7 stages
  const stageGroups = useMemo(() => {
    const groups: Record<LeadStatus, Lead[]> = {
      'New Inquiry': [],
      'Contact Pending': [],
      'Contacted': [],
      'Needs Discussion': [],
      'Needs Clarification': [],
      'Case Manager Coordination': [],
      'Family Decision': [],
      'Follow-up Scheduled': [],
      'Converted': [],
      'Closed / Not Proceeding': [],
    };

    filteredLeads.forEach((lead) => {
      let stage = lead.status;
      if (stage === 'Contact Pending') stage = 'New Inquiry';
      if (stage === 'Needs Clarification') stage = 'Needs Discussion';
      if (stage === 'Follow-up Scheduled') stage = 'Family Decision';

      if (groups[stage]) {
        groups[stage].push(lead);
      } else {
        groups['New Inquiry'].push(lead);
      }
    });

    return groups;
  }, [filteredLeads]);

  // Drag-and-drop
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedLeadId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: LeadStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedLeadId;
    if (id) {
      updateLeadStatus(id, targetStage);
      setDraggedLeadId(null);
    }
  };

  // Open Add Modal
  const handleOpenAddModal = (stage: LeadStatus = 'New Inquiry') => {
    setAddInitialStage(stage);
    setAddStep(1);
    setNewClientFirstName('');
    setNewClientLastName('');
    setNewClientDob('2016-04-12');
    setNewClientGender('Male');
    setNewMedicaidId('CO-984421008');
    setNewStreet('4820 Mountain Crest Dr');
    setNewCity('Denver');
    setNewState('CO');
    setNewZip('80219');
    setNewCounty('Denver');
    setNewPhone('(303) 555-0142');
    setNewEmergencyContact('Carlos Morales (Uncle) · (303) 555-0199');
    setNewContactName('');
    setNewRelationship('Mother');
    setNewContactPhone('(303) 555-0142');
    setNewEmail('');
    setNewDesignatedCaregiver('Elena Morales (Designated Family Caregiver)');
    setNewService('IHSS');
    setNewWaiver('HCBS-CES (Children’s Extensive Support)');
    setNewWeeklyHours('32.0 hrs/week');
    setNewCmaAgency('Rocky Mountain Human Services (RMHS)');
    setNewCaseManagerName('Sarah Jenkins');
    setNewCaseManagerPhone('(303) 636-5600');
    setNewCaseManagerEmail('sjenkins@rmhs.org');
    setNewSource('Website');
    setNewOwner('Maya R.');
    setNewNotes('');
    setShowAddModal(true);
  };

  // Pre-fill realistic demo data matching Patient Onboarding Flow
  const handlePrefillClientData = () => {
    setNewClientFirstName('Mateo');
    setNewClientLastName('Morales');
    setNewClientDob('2016-04-12');
    setNewClientGender('Male');
    setNewMedicaidId('CO-984421008');
    setNewStreet('4820 Mountain Crest Dr');
    setNewCity('Denver');
    setNewState('CO');
    setNewZip('80219');
    setNewCounty('Denver');
    setNewPhone('(303) 555-0142');
    setNewEmergencyContact('Carlos Morales (Uncle) · (303) 555-0199');
    setNewContactName('Elena Morales');
    setNewRelationship('Mother');
    setNewContactPhone('(303) 555-0142');
    setNewEmail('elena.morales@coloradomail.net');
    setNewDesignatedCaregiver('Elena Morales (Mother)');
    setNewService('IHSS');
    setNewWaiver('HCBS-CES (Children’s Extensive Support)');
    setNewWeeklyHours('32.0 hrs/week');
    setNewCmaAgency('Rocky Mountain Human Services (RMHS)');
    setNewCaseManagerName('Sarah Jenkins');
    setNewCaseManagerPhone('(303) 636-5600');
    setNewCaseManagerEmail('sjenkins@rmhs.org');
    setNewSource('Website');
    setNewOwner('Maya R.');
    setNewNotes('Inquiry for pediatric IHSS care under Colorado HCBS-CES waiver. Elena Morales designated as primary family caregiver.');
    notify('Pre-fill Complete', 'Mateo Morales patient intake data populated for testing.', 'info');
  };

  // Submit Add Client Inquiry
  const handleCreateLead = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const fullName = `${newClientFirstName} ${newClientLastName}`.trim();
    if (!fullName) {
      notify('Missing Information', 'Please provide patient first and last name.', 'warning');
      setAddStep(1);
      return;
    }

    const ownerInitials = newOwner
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    const ownerColors: Record<string, string> = {
      'Maya R.': 'bg-emerald-700',
      'Jon P.': 'bg-blue-600',
      'Sam K.': 'bg-amber-600',
      'Alicia T.': 'bg-purple-700',
    };

    addLead({
      clientName: fullName,
      primaryContactName: newContactName || `${fullName} Contact`,
      relationship: newRelationship,
      phone: newPhone || '(303) 555-0142',
      email: newEmail || 'inquiry@colorado.org',
      dateOfBirth: newClientDob || '2016-04-12',
      inquirySource: (newSource + ' Inquiry') as any,
      sourceCategory: newSource,
      sourceDetail: `Family inquiry · ${newSource}`,
      referralAgency: newCmaAgency,
      caseManagerName: newCaseManagerName,
      caseManagerPhone: newCaseManagerPhone,
      caseManagerEmail: newCaseManagerEmail,
      requestedService: newService,
      assignedStaff: newOwner,
      ownerName: newOwner,
      ownerInitials,
      ownerAvatarColor: ownerColors[newOwner] || 'bg-slate-700',
      status: addInitialStage,
      intakeStepsCompleted:
        addInitialStage === 'Converted'
          ? 7
          : addInitialStage === 'Family Decision'
            ? 6
            : addInitialStage === 'Case Manager Coordination'
              ? 4
              : addInitialStage === 'Needs Discussion'
                ? 3
                : addInitialStage === 'Contacted'
                  ? 2
                  : 1,
      intakeTotalSteps: 7,
      intakeStageLabel:
        addInitialStage === 'Converted'
          ? 'Service converted'
          : addInitialStage === 'Family Decision'
            ? 'Family agreement'
            : addInitialStage === 'Case Manager Coordination'
              ? 'Case manager linked'
              : addInitialStage === 'Needs Discussion'
                ? 'Needs assessed'
                : addInitialStage === 'Contacted'
                  ? 'Family contacted'
                  : 'Inquiry logged',
      daysInStage: 1,
      isOverdue: false,
      followUpDisplay: addInitialStage === 'Converted' || addInitialStage === 'Closed / Not Proceeding' ? '—' : 'Nov 24',
      nextFollowUpDate: '2026-11-24',
      notes:
        newNotes ||
        `Medicaid ID: ${newMedicaidId}. Waiver: ${newWaiver}. Authorized: ${newWeeklyHours}. Designated Caregiver: ${newDesignatedCaregiver}.`,
    });

    setShowAddModal(false);
  };

  // Advance Roadmap Step
  const handleAdvanceLeadStep = (leadId: string) => {
    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead) return;
    const currentStep = targetLead.intakeStepsCompleted || 1;
    if (currentStep < 7) {
      const nextStep = currentStep + 1;
      let nextStage: LeadStatus = targetLead.status;
      if (nextStep === 2) nextStage = 'Contacted';
      if (nextStep === 3) nextStage = 'Needs Discussion';
      if (nextStep === 4) nextStage = 'Case Manager Coordination';
      if (nextStep === 6) nextStage = 'Family Decision';
      if (nextStep === 7) nextStage = 'Converted';

      updateLead(targetLead.id, {
        intakeStepsCompleted: nextStep,
        status: nextStage,
        intakeStageLabel: INTAKE_STEPS_LABELS[nextStep - 1] || 'In progress',
      });

      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead({
          ...selectedLead,
          intakeStepsCompleted: nextStep,
          status: nextStage,
          intakeStageLabel: INTAKE_STEPS_LABELS[nextStep - 1] || 'In progress',
        });
      }

      notify(
        'Intake Roadmap Advanced',
        `${targetLead.clientName} advanced to Step ${nextStep}: ${INTAKE_STEPS_LABELS[nextStep - 1]}`,
        'success'
      );
    }
  };

  // Convert to Active Client
  const handleConvertToActiveClient = (lead: Lead) => {
    updateLeadStatus(lead.id, 'Converted');
    updateLead(lead.id, {
      intakeStepsCompleted: 7,
      status: 'Converted',
      intakeStageLabel: 'Service converted',
    });
    if (selectedLead && selectedLead.id === lead.id) {
      setSelectedLead({
        ...selectedLead,
        status: 'Converted',
        intakeStepsCompleted: 7,
        intakeStageLabel: 'Service converted',
      });
    }
    notify(
      'Client Converted!',
      `${lead.clientName} has been converted into an active client! Care plan and EVV provisioning unlocked.`,
      'success'
    );
  };

  // Render Service Badge (Matches renderRoleBadge in Caregiver Intake)
  const renderServiceBadge = (service: string) => {
    return (
      <span className="bg-slate-100 text-slate-700 font-semibold text-[11px] px-2 py-0.5 rounded-md border border-slate-200/80 whitespace-nowrap shrink-0">
        {service}
      </span>
    );
  };

  // Render Alert Badge
  const renderAlertBadge = (badge?: string) => {
    if (!badge) return null;
    let badgeClass = 'bg-blue-50 text-blue-700 border-blue-200/80';
    if (badge === 'Awaiting case manager') badgeClass = 'bg-purple-50 text-purple-700 border-purple-200/80';
    if (badge === 'Docs missing') badgeClass = 'bg-amber-50 text-amber-800 border-amber-200/80';
    if (badge === 'Payment at risk') badgeClass = 'bg-rose-50 text-rose-700 border-rose-200/80';

    return (
      <span
        className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md border ${badgeClass} whitespace-nowrap`}
      >
        {badge}
      </span>
    );
  };

  // Active lead in modal (synced)
  const currentLead = selectedLead
    ? leads.find((l) => l.id === selectedLead.id) || selectedLead
    : null;

  return (
    <div className="space-y-4 pb-12 select-none">
      {/* ========================================================================= */}
      {/* 1. PAGE TITLE & ACTION HEADER ROW                                         */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Client Intake
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track family and client inquiries from first call to conversion and care plan handoff.
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleOpenAddModal('New Inquiry')}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Add client inquiry</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. STANDARDIZED STATS CARDS (Matching Caregiver Intake 5-Card Layout)      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
        {/* 1. OPEN INQUIRIES */}
        <button
          type="button"
          onClick={() => {
            setStageFilter('All Stages');
            setCountyFilter('All Counties');
            setPriorityFilter('All Priorities');
          }}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md transition-all duration-200 text-left cursor-pointer group flex flex-col justify-between hover:border-[#3e6b2b] hover:-translate-y-0.5 relative overflow-hidden"
        >
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate block">
                OPEN INQUIRIES
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {openInquiriesCount}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Active client pipeline
            </span>
          </div>
        </button>

        {/* 2. FAMILY CONTACTED */}
        <button
          type="button"
          onClick={() => setStageFilter(stageFilter === 'Contacted' ? 'All Stages' : 'Contacted')}
          className={`bg-white rounded-2xl p-4 sm:p-5 border ${stageFilter === 'Contacted' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200/80'
            } shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md transition-all duration-200 text-left cursor-pointer group flex flex-col justify-between hover:border-blue-400 hover:-translate-y-0.5 relative overflow-hidden`}
        >
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate block">
                FAMILY CONTACTED
              </span>
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200/70 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {contactedCount}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-700">
              Initial intake consultations
            </span>
          </div>
        </button>

        {/* 3. CMA COORDINATION */}
        <button
          type="button"
          onClick={() =>
            setStageFilter(stageFilter === 'Case Manager Coordination' ? 'All Stages' : 'Case Manager Coordination')
          }
          className={`bg-white rounded-2xl p-4 sm:p-5 border ${stageFilter === 'Case Manager Coordination' ? 'border-amber-500 ring-2 ring-amber-200' : 'border-slate-200/80'
            } shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md transition-all duration-200 text-left cursor-pointer group flex flex-col justify-between hover:border-amber-400 hover:-translate-y-0.5 relative overflow-hidden`}
        >
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate block">
                CMA COORDINATION
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/70 text-amber-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {cmaCoordinationCount}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800">
              Awaiting PAR &amp; state waiver
            </span>
          </div>
        </button>

        {/* 4. CONVERTED THIS MONTH */}
        <button
          type="button"
          onClick={() => setStageFilter(stageFilter === 'Converted' ? 'All Stages' : 'Converted')}
          className={`bg-white rounded-2xl p-4 sm:p-5 border ${stageFilter === 'Converted' ? 'border-[#3e6b2b] ring-2 ring-emerald-200' : 'border-slate-200/80'
            } shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md transition-all duration-200 text-left cursor-pointer group flex flex-col justify-between hover:border-[#3e6b2b] hover:-translate-y-0.5 relative overflow-hidden`}
        >
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate block">
                CONVERTED THIS MONTH
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#3e6b2b] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {convertedCount}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700">
              Ready for care plan activation
            </span>
          </div>
        </button>

        {/* 5. AVG DAYS TO CONVERT */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md transition-all duration-200 text-left group flex flex-col justify-between hover:border-purple-400 relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate block">
                AVG DAYS TO CONVERT
              </span>
              <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-200/70 text-purple-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {avgDaysToConvert}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-700">
              Target &lt; 14 days
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. OPTIMIZED FILTER BAR WITH STAGE SELECTOR & FUNCTIONAL MORE FILTERS      */}
      {/* ========================================================================= */}
      <div className="space-y-2">
        <div className="portal-filter-bar">
          {/* Left: Search & Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {/* Search inquiries */}
            <div className="relative min-w-[210px] flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, contact, phone, CMA..."
                className="portal-input"
              />
            </div>

            {/* Stage Dropdown Filter */}
            <div className="relative">
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="portal-select"
              >
                <option value="All Stages">All Stages</option>
                {INTAKE_STAGES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* All Intake Staff */}
            <div className="relative">
              <select
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
                className="portal-select"
              >
                <option value="All Intake Staff">All Intake Staff</option>
                <option value="Maya R.">Maya R.</option>
                <option value="Jon P.">Jon P.</option>
                <option value="Sam K.">Sam K.</option>
                <option value="Alicia T.">Alicia T.</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* All Services */}
            <div className="relative">
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="portal-select"
              >
                <option value="All Services">All Services</option>
                <option value="IHSS">IHSS</option>
                <option value="CFC">CFC</option>
                <option value="HCBS">HCBS</option>
                <option value="PDN">PDN</option>
                <option value="IRSS">IRSS</option>
                <option value="HMA">HMA</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* All Sources */}
            <div className="relative">
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="portal-select"
              >
                <option value="All Sources">All Sources</option>
                <option value="Website">Website</option>
                <option value="Phone">Phone</option>
                <option value="Case Management Agency">Case Management Agency</option>
                <option value="Direct Referral">Direct Referral</option>
                <option value="RFP">RFP</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* More filters Toggle Button */}
            <button
              type="button"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className={`portal-filter-btn ${showMoreFilters || countyFilter !== 'All Counties' || priorityFilter !== 'All Priorities'
                ? 'bg-emerald-50 text-[#3e6b2b] border-[#3e6b2b]/40 font-bold'
                : ''
                }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>More filters</span>
              {(countyFilter !== 'All Counties' || priorityFilter !== 'All Priorities') && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#3e6b2b]" />
              )}
            </button>

            {/* Source insights button */}
            <button
              type="button"
              onClick={() => setShowSourceInsightsModal(true)}
              className="portal-filter-btn"
            >
              <span>📊</span>
              <span>Source insights</span>
            </button>

            {/* Reset filters */}
            {isFiltered && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-2.5 py-1.5 rounded-xl hover:bg-rose-50 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset filters</span>
              </button>
            )}
          </div>

          {/* Right: Board / List Switcher */}
          <div className="portal-view-switcher">
            <button
              type="button"
              onClick={() => setViewMode('board')}
              className={viewMode === 'board' ? 'portal-view-switcher-btn-active' : 'portal-view-switcher-btn-inactive'}
            >
              Board
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'portal-view-switcher-btn-active' : 'portal-view-switcher-btn-inactive'}
            >
              List
            </button>
          </div>
        </div>

        {/* Expandable Secondary Filters Row (County & Priority / Alert status) */}
        {showMoreFilters && (
          <div className="p-3 bg-white border border-slate-200/90 rounded-2xl shadow-2xs flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-150">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Additional Filters:
            </span>

            {/* County filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-medium">County:</span>
              <select
                value={countyFilter}
                onChange={(e) => setCountyFilter(e.target.value)}
                className="portal-select text-xs py-1"
              >
                <option value="All Counties">All Counties</option>
                <option value="Denver">Denver</option>
                <option value="Arapahoe">Arapahoe</option>
                <option value="Jefferson">Jefferson</option>
                <option value="Douglas">Douglas</option>
                <option value="Boulder">Boulder</option>
                <option value="Adams">Adams</option>
              </select>
            </div>

            {/* Priority & Follow-up status */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-medium">Priority / Status:</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="portal-select text-xs py-1"
              >
                <option value="All Priorities">All Priorities</option>
                <option value="Overdue Only">Overdue Follow-ups Only</option>
                <option value="Awaiting case manager">Awaiting Case Manager</option>
                <option value="Docs missing">Docs Missing</option>
                <option value="Payment at risk">Payment at Risk</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN VIEW: BOARD (KANBAN) OR LIST (TABLE)                              */}
      {/* ========================================================================= */}
      {viewMode === 'board' ? (
        /* KANBAN BOARD VIEW */
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3.5 min-w-[1720px] items-start">
            {INTAKE_STAGES.map((stage) => {
              const theme = STAGE_THEMES[stage];
              const leadsInStage = stageGroups[stage] || [];

              return (
                <div
                  key={stage}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage)}
                  className={`portal-board-column ${theme.borderColor} ${theme.bgTint}`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between px-1 py-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-2 h-2 rounded-full ${theme.dotColor} shrink-0 shadow-2xs`} />
                      <span className="text-xs font-bold text-slate-800 truncate">
                        {theme.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.countBg} ${theme.countText} border border-black/[0.04]`}
                      >
                        {leadsInStage.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenAddModal(stage)}
                        title={`Add inquiry to ${stage}`}
                        className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Cards Stack */}
                  <div className="space-y-2 min-h-[120px]">
                    {leadsInStage.map((lead) => {
                      const leadCounty = getLeadCounty(lead);

                      return (
                        <div
                          key={lead.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, lead.id)}
                          onClick={() => {
                            setSelectedLead(lead);
                            setDetailActiveTab('overview');
                          }}
                          className="portal-card-interactive group space-y-2"
                        >
                          {/* Row 1: Name + Service Badge */}
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-[#264e1e] transition-colors truncate">
                              {lead.clientName}
                            </span>
                            {renderServiceBadge(lead.requestedService)}
                          </div>

                          {/* Row 2: Location & Source */}
                          <div className="text-[11px] text-slate-500 font-medium truncate">
                            {leadCounty} Co. • {lead.sourceCategory || lead.inquirySource}
                          </div>

                          {/* Row 3: Action / Milestone Tag (Only when relevant) */}
                          {(lead.isOverdue || lead.alertBadge || lead.followUpDisplay) && (
                            <div className="pt-0.5">
                              {lead.isOverdue ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/80">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                  <span>Overdue ({lead.daysInStage || 1}d)</span>
                                </span>
                              ) : lead.alertBadge ? (
                                renderAlertBadge(lead.alertBadge)
                              ) : lead.followUpDisplay ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded-md border border-blue-200/80">
                                  <Calendar className="w-3 h-3 text-blue-500 shrink-0" />
                                  <span>{lead.followUpDisplay}</span>
                                </span>
                              ) : null}
                            </div>
                          )}

                          {/* Row 4: Footer - Owner + Days in Stage */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <div
                                className={`w-5 h-5 rounded-full ${lead.ownerAvatarColor || 'bg-slate-200'
                                  } text-white font-bold text-[9px] flex items-center justify-center shrink-0 shadow-2xs`}
                              >
                                {lead.ownerInitials || 'MR'}
                              </div>
                              <span className="text-slate-600 font-medium truncate text-[11px]">
                                {lead.ownerName || lead.assignedStaff}
                              </span>
                            </div>

                            <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-1">
                              {lead.daysInStage || 1}d in stage
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Add inquiry button */}
                  <button
                    type="button"
                    onClick={() => handleOpenAddModal(stage)}
                    className="portal-column-add-btn"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add inquiry</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* LIST / TABLE VIEW (Matches Caregiver Intake Table) */
        <div className="portal-table-container">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="portal-table-head">
                  <th className="py-3 px-4">CLIENT NAME</th>
                  <th className="py-3 px-3">SERVICE</th>
                  <th className="py-3 px-3">PROGRAM / PAYER</th>
                  <th className="py-3 px-3">STAGE</th>
                  <th className="py-3 px-4 min-w-[120px]">PROGRESS</th>
                  <th className="py-3 px-3">SOURCE</th>
                  <th className="py-3 px-3">INTAKE OWNER</th>
                  <th className="py-3 px-2 text-center">DAYS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredLeads.map((lead) => {
                  let effectiveStage = lead.status;
                  if (effectiveStage === 'Contact Pending') effectiveStage = 'New Inquiry';
                  if (effectiveStage === 'Needs Clarification') effectiveStage = 'Needs Discussion';
                  if (effectiveStage === 'Follow-up Scheduled') effectiveStage = 'Family Decision';
                  const theme = STAGE_THEMES[effectiveStage] || STAGE_THEMES['New Inquiry'];
                  const completedSteps = lead.intakeStepsCompleted || 1;
                  const totalSteps = lead.intakeTotalSteps || 7;
                  const stepPct = Math.round((completedSteps / totalSteps) * 100);

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => {
                        setSelectedLead(lead);
                        setDetailActiveTab('overview');
                      }}
                      className="portal-table-row"
                    >
                      {/* CLIENT NAME */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 group-hover:text-[#264e1e] transition-colors">
                          {lead.clientName}
                        </span>
                      </td>

                      {/* SERVICE */}
                      <td className="py-3 px-3">{renderServiceBadge(lead.requestedService)}</td>

                      {/* PROGRAM / PAYER */}
                      <td className="py-3 px-3 text-slate-600 font-medium">Medicaid HCBS Waiver</td>

                      {/* STAGE with colored dot */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${theme.dotColor} shrink-0`} />
                          <span className="font-semibold text-slate-800">{lead.status}</span>
                        </div>
                      </td>

                      {/* PROGRESS */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-medium text-slate-500 font-mono">
                            Step {completedSteps}/{totalSteps}
                          </span>
                          <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${lead.isOverdue ? 'bg-rose-500' : 'bg-[#264e1e]'
                                }`}
                              style={{ width: `${stepPct}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* SOURCE */}
                      <td className="py-3 px-3 text-slate-600">{lead.sourceCategory || lead.inquirySource}</td>

                      {/* INTAKE OWNER */}
                      <td className="py-3 px-3 text-slate-700 font-semibold">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-5 h-5 rounded-full ${lead.ownerAvatarColor || 'bg-emerald-700'
                              } text-white font-bold text-[9px] flex items-center justify-center shrink-0 shadow-2xs`}
                          >
                            {lead.ownerInitials || 'MR'}
                          </div>
                          <span>{lead.ownerName || lead.assignedStaff}</span>
                        </div>
                      </td>

                      {/* DAYS */}
                      <td className="py-3 px-2 text-center text-slate-400 font-medium font-mono text-[11px]">
                        {lead.daysInStage || 1}d
                      </td>

                      {/* ACTIONS */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                            setDetailActiveTab('overview');
                          }}
                          className="text-xs font-semibold text-[#3e6b2b] hover:text-[#264e1e] bg-emerald-50/80 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>View details</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. DETAIL MODAL (Matching Caregiver Intake Centered Modal Layout)         */}
      {/* ========================================================================= */}
      {currentLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedLead(null)}
          />

          <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-98 duration-150">
            {/* Modal Top Header */}
            <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 bg-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      {currentLead.clientName}
                    </h2>
                    <span className="bg-slate-100 text-slate-700 font-semibold text-xs px-2.5 py-0.5 rounded-full border border-slate-200">
                      {currentLead.requestedService} · Medicaid HCBS Waiver
                    </span>
                    {currentLead.isOverdue && (
                      <span className="bg-rose-100 text-rose-800 font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        <span>Follow-up Overdue</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mt-1">
                    Primary Contact: <strong className="text-slate-700 font-semibold">{currentLead.primaryContactName} ({currentLead.relationship})</strong> · County: <strong className="text-slate-700 font-semibold">{getLeadCounty(currentLead)}</strong> · Source: {currentLead.sourceCategory || currentLead.inquirySource} · Owner: <strong className="text-slate-800">{currentLead.ownerName || currentLead.assignedStaff}</strong> · <strong className="text-slate-900 font-black">CMA: {currentLead.referralAgency}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin-portal/client-intake/${currentLead.id}`}
                    className="px-2.5 py-1 text-xs font-semibold text-[#3e6b2b] bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    title="Open Dedicated Full Page"
                  >
                    <span>Full page</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedLead(null)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stage Dropdown & Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    STAGE:
                  </span>
                  <div className="relative">
                    <select
                      value={currentLead.status}
                      onChange={(e) => {
                        const newSt = e.target.value as LeadStatus;
                        updateLeadStatus(currentLead.id, newSt);
                      }}
                      className="appearance-none pl-3 pr-8 py-1.5 bg-slate-50/60 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 cursor-pointer focus:outline-none shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
                    >
                      {INTAKE_STAGES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setShowLogConsultationModal(true)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 shadow-[0_1px_3px_rgba(15,23,42,0.05)] hover:shadow cursor-pointer transition-all"
                  >
                    Log consultation
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      notify(
                        'Message Sent',
                        `SMS & Email dispatched to ${currentLead.primaryContactName} (${currentLead.phone}).`,
                        'info'
                      );
                    }}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 shadow-[0_1px_3px_rgba(15,23,42,0.05)] hover:shadow cursor-pointer transition-all"
                  >
                    Send message
                  </button>

                  <button
                    type="button"
                    onClick={() => handleConvertToActiveClient(currentLead)}
                    className="px-4 py-1.5 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all"
                  >
                    Convert &amp; Activate Service
                  </button>
                </div>
              </div>

              {/* INTAKE STEPPER: STEP X OF 7 */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    INTAKE STEPPER: STEP {currentLead.intakeStepsCompleted || 1} OF 7
                  </span>

                  {(currentLead.intakeStepsCompleted || 1) < 7 && (
                    <button
                      type="button"
                      onClick={() => handleAdvanceLeadStep(currentLead.id)}
                      className="inline-flex items-center gap-1.5 lg:gap-4 px-3 py-1 bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      <span>Mark complete</span>
                      <span>✓</span>
                    </button>
                  )}
                </div>

                {/* 7 Horizontal Stepper Bars */}
                <div className="grid grid-cols-7 gap-1.5 lg:gap-4">
                  {INTAKE_STEPS_LABELS.map((stepLabel, idx) => {
                    const stepNum = idx + 1;
                    const isCompleted = (currentLead.intakeStepsCompleted || 1) >= stepNum;
                    const isCurrent = (currentLead.intakeStepsCompleted || 1) === stepNum;

                    return (
                      <div key={stepNum} className="space-y-1">
                        <div
                          className={`h-1 rounded-full transition-all duration-300 ${isCompleted ? 'bg-[#264e1e]' : 'bg-slate-200'
                            }`}
                        />
                        <p
                          className={`text-[10px] truncate ${isCurrent
                            ? 'font-bold text-[#264e1e]'
                            : isCompleted
                              ? 'text-slate-700 font-medium'
                              : 'text-slate-400'
                            }`}
                          title={`Step ${stepNum}: ${stepLabel}`}
                        >
                          {stepLabel}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tabs Bar */}
            <div className="px-6 border-b border-slate-200 bg-white flex items-center gap-6 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setDetailActiveTab('overview')}
                className={`py-3 transition-colors border-b-2 cursor-pointer ${detailActiveTab === 'overview'
                  ? 'border-[#264e1e] text-[#264e1e] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setDetailActiveTab('clinical')}
                className={`py-3 transition-colors border-b-2 cursor-pointer ${detailActiveTab === 'clinical'
                  ? 'border-[#264e1e] text-[#264e1e] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
              >
                Needs &amp; Care Plan
              </button>
              <button
                type="button"
                onClick={() => setDetailActiveTab('authorizations')}
                className={`py-3 transition-colors border-b-2 cursor-pointer ${detailActiveTab === 'authorizations'
                  ? 'border-[#264e1e] text-[#264e1e] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
              >
                Authorization &amp; CMA
              </button>
              <button
                type="button"
                onClick={() => setDetailActiveTab('communication')}
                className={`py-3 transition-colors border-b-2 cursor-pointer ${detailActiveTab === 'communication'
                  ? 'border-[#264e1e] text-[#264e1e] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
              >
                Communication (2)
              </button>
            </div>

            {/* Modal Body: Active Tab Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {detailActiveTab === 'overview' && (
                <div className="space-y-4">
                  {/* Family & Client Information Card */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      Client &amp; Family Demographics
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          PRIMARY CONTACT &amp; RELATIONSHIP:
                        </span>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {currentLead.primaryContactName} ({currentLead.relationship})
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          PRIMARY TELEPHONE:
                        </span>
                        <a href={`tel:${currentLead.phone}`} className="font-bold text-slate-900 hover:text-blue-600 mt-0.5 block">
                          {currentLead.phone}
                        </a>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          EMAIL ADDRESS:
                        </span>
                        <a href={`mailto:${currentLead.email}`} className="font-bold text-slate-900 hover:text-blue-600 mt-0.5 block truncate">
                          {currentLead.email}
                        </a>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          COUNTY / LOCATION:
                        </span>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {getLeadCounty(currentLead)} County, CO
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          DATE OF BIRTH:
                        </span>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {currentLead.dateOfBirth} (Pediatric / HCBS Waiver)
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          TARGET SERVICE SCHEDULE:
                        </span>
                        <p className="font-bold text-slate-900 mt-0.5">
                          30–35 hrs/wk (Family Caregiver Model)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Staff Notes Card */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      Intake Staff &amp; Clinical Case Notes
                    </h3>

                    <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-700 leading-relaxed font-medium">
                      {currentLead.notes}
                    </div>
                  </div>
                </div>
              )}

              {detailActiveTab === 'clinical' && (
                <div className="space-y-4">
                  {/* Activities of Daily Living Card */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#264e1e]" />
                      <span>Activities of Daily Living (ADLs) &amp; Care Needs</span>
                    </h3>

                    <div className="space-y-2 text-xs">
                      {[
                        { title: 'Personal Care & Hygiene', desc: 'Assistance with bathing, dressing, and skin care', status: 'Assessed' },
                        { title: 'Health Maintenance Activities (HMA)', desc: 'Skilled nurse delegated tasks and medication oversight', status: 'Approved' },
                        { title: 'Homemaker & Meal Preparation', desc: 'Specialized nutrition and meal setup assistance', status: 'Assessed' },
                        { title: 'Protective Oversight & Mobility', desc: 'Fall prevention and transfer safety support', status: 'Assessed' },
                      ].map((item) => (
                        <div key={item.title} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                          <div>
                            <span className="font-bold text-slate-800 block">{item.title}</span>
                            <span className="text-[11px] text-slate-500">{item.desc}</span>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Program Scheduling & Caregiver Preference */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#264e1e]" />
                      <span>Service Allocation &amp; Schedule</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          REQUESTED PROGRAM:
                        </span>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {currentLead.requestedService} (In-Home Support Services)
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          AUTHORIZED WEEKLY HOURS:
                        </span>
                        <p className="font-bold text-slate-900 mt-0.5">
                          32.0 hrs/week
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          CAREGIVER DESIGNATION:
                        </span>
                        <p className="font-bold text-slate-900 mt-0.5">
                          Family Caregiver (Designated Household Member)
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          EVV COMPLIANCE STATUS:
                        </span>
                        <p className="font-bold text-emerald-700 mt-0.5">
                          Eligible for Electronic Visit Verification
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {detailActiveTab === 'authorizations' && (
                <div className="space-y-4">
                  {/* Case Management Agency Coordinates */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#264e1e]" />
                      <span>Case Management Agency (CMA) Coordinates</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          CASE MANAGEMENT AGENCY:
                        </span>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {currentLead.referralAgency}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          ASSIGNED CASE MANAGER:
                        </span>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {currentLead.caseManagerName}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          CMA PHONE NUMBER:
                        </span>
                        <a href={`tel:${currentLead.caseManagerPhone}`} className="font-bold text-slate-900 hover:text-blue-600 mt-0.5 block">
                          {currentLead.caseManagerPhone}
                        </a>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          CMA EMAIL ADDRESS:
                        </span>
                        <a href={`mailto:${currentLead.caseManagerEmail}`} className="font-bold text-slate-900 hover:text-blue-600 mt-0.5 block truncate">
                          {currentLead.caseManagerEmail}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Prior Authorization & State Medicaid Verification */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#264e1e]" />
                      <span>Medicaid Benefit &amp; PAR Authorization</span>
                    </h3>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                        <div>
                          <span className="font-bold text-slate-800 block">Colorado Medicaid Eligibility (Health First Colorado)</span>
                          <span className="text-[11px] text-slate-500">Active Enrollment verified via State Portal</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                          Verified Active
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                        <div>
                          <span className="font-bold text-slate-800 block">Prior Authorization Request (PAR)</span>
                          <span className="text-[11px] text-slate-500">PAR package submitted to Case Management Agency</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 shrink-0">
                          In State Review
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                        <div>
                          <span className="font-bold text-slate-800 block">Physician Attestation &amp; Care Orders</span>
                          <span className="text-[11px] text-slate-500">Signed medical documentation for pediatric IHSS care</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                          Received
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {detailActiveTab === 'communication' && (
                <div className="space-y-4">
                  {/* Messages Feed */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-[#264e1e]" />
                      <span>Communication History with Family &amp; CMA</span>
                    </h3>

                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-800">{currentLead.ownerName || currentLead.assignedStaff} (Staff)</span>
                          <span className="text-slate-400">Nov 16, 2:15 PM · SMS</span>
                        </div>
                        <p className="text-xs text-slate-700">
                          Hello {currentLead.primaryContactName}, thank you for contacting LiliSare Home Health. We received your inquiry regarding {currentLead.requestedService} care for {currentLead.clientName}. Would you be free for a 10-minute intake consultation this week?
                        </p>
                      </div>

                      <div className="p-3 bg-emerald-50/60 border border-emerald-200/70 rounded-xl space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-emerald-900">{currentLead.primaryContactName} (Family)</span>
                          <span className="text-slate-400">Nov 16, 2:38 PM · SMS</span>
                        </div>
                        <p className="text-xs text-slate-700">
                          Thank you! Yes, we have our CMA care plan ready from {currentLead.referralAgency}. We are eager to start as family caregivers. Thursday morning works great.
                        </p>
                      </div>

                      <div className="p-3 bg-purple-50/60 border border-purple-200/70 rounded-xl space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-purple-900">{currentLead.caseManagerName} (CMA Coordinator)</span>
                          <span className="text-slate-400">Nov 17, 9:20 AM · Email</span>
                        </div>
                        <p className="text-xs text-slate-700">
                          Prior authorization review in progress. We verified active Colorado Medicaid enrollment and sent over the initial assessment file.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Send New Message Box */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-3">
                    <span className="text-xs font-bold text-slate-700 block">Dispatch Message</span>
                    <textarea
                      rows={2}
                      placeholder={`Type SMS or Email to ${currentLead.primaryContactName}...`}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1.5 focus:ring-[#264e1e]/30"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          notify('Message Sent', `Dispatched SMS to ${currentLead.primaryContactName} (${currentLead.phone}).`, 'success');
                        }}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL: LOG INTAKE CONSULTATION                                         */}
      {/* ========================================================================= */}
      {showLogConsultationModal && currentLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowLogConsultationModal(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Log Family Consultation
              </h3>
              <button
                type="button"
                onClick={() => setShowLogConsultationModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                notify(
                  'Consultation Logged',
                  `Intake call recorded for ${currentLead.clientName} with primary contact ${currentLead.primaryContactName}.`,
                  'success'
                );
                setShowLogConsultationModal(false);
              }}
              className="space-y-4 pt-4 text-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Client</label>
                <input
                  type="text"
                  disabled
                  value={`${currentLead.clientName} (${currentLead.primaryContactName})`}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Date</label>
                  <input
                    type="date"
                    value={consultationDate}
                    onChange={(e) => setConsultationDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Time</label>
                  <input
                    type="text"
                    value={consultationTime}
                    onChange={(e) => setConsultationTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Consultation Type</label>
                <select
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  <option value="Initial Phone Consultation">Initial Phone Consultation</option>
                  <option value="In-Person Home Assessment">In-Person Home Assessment</option>
                  <option value="CMA Coordinator Joint Call">CMA Coordinator Joint Call</option>
                  <option value="Care Plan Review">Care Plan Review</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Consultation Notes</label>
                <textarea
                  rows={3}
                  value={consultationNotes}
                  onChange={(e) => setConsultationNotes(e.target.value)}
                  placeholder="Detail primary care requirements, diagnosis, and current Medicaid status..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogConsultationModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Save Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MODAL: + ADD CLIENT INQUIRY (4-STEP PATIENT REGISTRATION WIZARD)       */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowAddModal(false)}
          />

          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-98 duration-150">
            {/* Top Wizard Header */}
            <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 bg-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      New Client Inquiry
                    </h2>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#264e1e] border border-emerald-200/80">
                      Registration Wizard
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Multi-step patient intake wizard matching Colorado Medicaid HCBS standards.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handlePrefillClientData}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50/50 border border-amber-300 text-slate-900 text-xs font-bold transition-all shadow-2xs cursor-pointer group active:scale-98"
                    title="Pre-fill realistic Colorado Patient intake test data"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#F2B632] group-hover:rotate-12 transition-transform" />
                    <span>Pre-fill Data</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress & Stepper Pills */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Step {addStep} of 4:</span>
                    <span className="text-slate-600 font-medium">
                      {clientWizardStepTitles[addStep - 1]}
                    </span>
                  </div>
                  <span className="font-bold text-[#264e1e] font-mono text-[11px]">
                    {Math.round((addStep / 4) * 100)}% Completed
                  </span>
                </div>

                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00d084] to-[#264e1e] rounded-full transition-all duration-300"
                    style={{ width: `${(addStep / 4) * 100}%` }}
                  />
                </div>

                {/* Step indicator tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {clientWizardStepTitles.map((title, idx) => {
                    const stepNum = idx + 1;
                    const isCurrent = addStep === stepNum;
                    const isCompleted = addStep > stepNum;

                    return (
                      <button
                        type="button"
                        key={title}
                        onClick={() => setAddStep(stepNum)}
                        className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${isCurrent
                          ? 'bg-emerald-50/80 border-[#264e1e] text-slate-900 font-bold shadow-2xs'
                          : isCompleted
                            ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            : 'bg-white border-slate-200/60 text-slate-400 hover:bg-slate-50'
                          }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${isCurrent
                              ? 'bg-[#264e1e] text-white'
                              : isCompleted
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-500'
                              }`}
                          >
                            {isCompleted ? '✓' : stepNum}
                          </span>
                          <span className="truncate text-[11px] block">{title}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50/50">
              {/* STEP 1: Patient Information */}
              {addStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#264e1e] uppercase tracking-wider block">
                        Step 1 of 4
                      </span>
                      <h3 className="text-base font-bold text-slate-900">Patient Information</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Enter personal and Medicaid identification details for the individual needing home care.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Patient First Name *</label>
                        <input
                          type="text"
                          value={newClientFirstName}
                          onChange={(e) => setNewClientFirstName(e.target.value)}
                          placeholder="e.g. Mateo"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs outline-none focus:border-[#264e1e] focus:ring-1 focus:ring-[#264e1e]"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Patient Last Name *</label>
                        <input
                          type="text"
                          value={newClientLastName}
                          onChange={(e) => setNewClientLastName(e.target.value)}
                          placeholder="e.g. Morales"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs outline-none focus:border-[#264e1e] focus:ring-1 focus:ring-[#264e1e]"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Date of Birth *</label>
                        <input
                          type="date"
                          value={newClientDob}
                          onChange={(e) => setNewClientDob(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs outline-none focus:border-[#264e1e]"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Colorado Medicaid ID *</label>
                        <input
                          type="text"
                          value={newMedicaidId}
                          onChange={(e) => setNewMedicaidId(e.target.value)}
                          placeholder="e.g. CO-984421008"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs font-mono font-bold text-slate-800 outline-none focus:border-[#264e1e]"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Gender</label>
                        <select
                          value={newClientGender}
                          onChange={(e) => setNewClientGender(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-xs outline-none focus:border-[#264e1e]"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Non-Binary">Non-Binary</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">County *</label>
                        <select
                          value={newCounty}
                          onChange={(e) => setNewCounty(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-xs outline-none focus:border-[#264e1e]"
                        >
                          <option value="Denver">Denver County</option>
                          <option value="Arapahoe">Arapahoe County</option>
                          <option value="Jefferson">Jefferson County</option>
                          <option value="Douglas">Douglas County</option>
                          <option value="Boulder">Boulder County</option>
                          <option value="Adams">Adams County</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="font-semibold text-slate-700 block mb-1">Street Address</label>
                        <input
                          type="text"
                          value={newStreet}
                          onChange={(e) => setNewStreet(e.target.value)}
                          placeholder="4820 Mountain Crest Dr"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs outline-none focus:border-[#264e1e]"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">City</label>
                        <input
                          type="text"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          placeholder="Denver"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">State / ZIP</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newState}
                            onChange={(e) => setNewState(e.target.value)}
                            className="w-16 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs text-center font-bold"
                          />
                          <input
                            type="text"
                            value={newZip}
                            onChange={(e) => setNewZip(e.target.value)}
                            placeholder="80219"
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="font-semibold text-slate-700 block mb-1">Emergency Contact</label>
                        <input
                          type="text"
                          value={newEmergencyContact}
                          onChange={(e) => setNewEmergencyContact(e.target.value)}
                          placeholder="e.g. Carlos Morales (Uncle) · (303) 555-0199"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Responsible Party & Caregiver Designation */}
              {addStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#264e1e] uppercase tracking-wider block">
                        Step 2 of 4
                      </span>
                      <h3 className="text-base font-bold text-slate-900">Responsible Party &amp; Caregiver</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Record the legal representative, primary family contact, and designated family caregiver.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Primary Contact Full Name *</label>
                        <input
                          type="text"
                          value={newContactName}
                          onChange={(e) => setNewContactName(e.target.value)}
                          placeholder="e.g. Elena Morales"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs outline-none focus:border-[#264e1e]"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Relationship to Patient *</label>
                        <select
                          value={newRelationship}
                          onChange={(e) => setNewRelationship(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-xs outline-none focus:border-[#264e1e]"
                        >
                          <option value="Mother">Mother</option>
                          <option value="Father">Father</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Legal Guardian">Legal Guardian</option>
                          <option value="Adult Sibling">Adult Sibling</option>
                          <option value="Adult Child">Adult Child</option>
                          <option value="Self">Self (Independent Adult)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Contact Phone Number *</label>
                        <input
                          type="text"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          placeholder="(303) 555-0142"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs outline-none focus:border-[#264e1e]"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Contact Email Address *</label>
                        <input
                          type="email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          placeholder="elena.morales@coloradomail.net"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs outline-none focus:border-[#264e1e]"
                        />
                      </div>

                      <div className="sm:col-span-2 pt-2 border-t border-slate-100">
                        <label className="font-semibold text-slate-700 block mb-1">
                          Designated Family Caregiver (for IHSS / Family Care model)
                        </label>
                        <input
                          type="text"
                          value={newDesignatedCaregiver}
                          onChange={(e) => setNewDesignatedCaregiver(e.target.value)}
                          placeholder="e.g. Elena Morales (Mother)"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">
                          Family members can be designated as the paid caregiver under Colorado Medicaid IHSS rules.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Service, Waiver Program & CMA */}
              {addStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#264e1e] uppercase tracking-wider block">
                        Step 3 of 4
                      </span>
                      <h3 className="text-base font-bold text-slate-900">Service, Waiver Program &amp; CMA</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Configure Medicaid waiver eligibility and state case management agency linkage.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Requested Service *</label>
                        <select
                          value={newService}
                          onChange={(e) => setNewService(e.target.value as ServiceType)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-xs outline-none focus:border-[#264e1e]"
                        >
                          <option value="IHSS">IHSS (In-Home Support Services)</option>
                          <option value="CFC">CFC (Children's First Choice)</option>
                          <option value="HCBS">HCBS (Home &amp; Community-Based Services)</option>
                          <option value="PDN">PDN (Private Duty Nursing)</option>
                          <option value="IRSS">IRSS (Residential Services)</option>
                          <option value="HMA">HMA (Health Maintenance Activities)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Medicaid Waiver Program</label>
                        <select
                          value={newWaiver}
                          onChange={(e) => setNewWaiver(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-xs outline-none focus:border-[#264e1e]"
                        >
                          <option value="HCBS-CES (Children’s Extensive Support)">HCBS-CES (Children’s Extensive Support)</option>
                          <option value="HCBS-EBD (Elderly, Blind &amp; Disabled)">HCBS-EBD (Elderly, Blind &amp; Disabled)</option>
                          <option value="HCBS-DD (Developmental Disabilities)">HCBS-DD (Developmental Disabilities)</option>
                          <option value="HCBS-SLS (Supported Living Services)">HCBS-SLS (Supported Living Services)</option>
                          <option value="Colorado Medicaid State Plan">Colorado Medicaid State Plan</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Target Authorized Hours</label>
                        <input
                          type="text"
                          value={newWeeklyHours}
                          onChange={(e) => setNewWeeklyHours(e.target.value)}
                          placeholder="32.0 hrs/week"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs font-bold text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Case Management Agency (CMA)</label>
                        <select
                          value={newCmaAgency}
                          onChange={(e) => setNewCmaAgency(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-xs outline-none focus:border-[#264e1e]"
                        >
                          <option value="Rocky Mountain Human Services (RMHS)">Rocky Mountain Human Services (RMHS) - Denver</option>
                          <option value="Developmental Pathways">Developmental Pathways - Arapahoe / Douglas</option>
                          <option value="Imagine! Colorado">Imagine! Colorado - Boulder / Broomfield</option>
                          <option value="Continuum of Colorado">Continuum of Colorado - Jefferson</option>
                          <option value="North Metro Community Services">North Metro Community Services - Adams</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Assigned Case Manager Name</label>
                        <input
                          type="text"
                          value={newCaseManagerName}
                          onChange={(e) => setNewCaseManagerName(e.target.value)}
                          placeholder="Sarah Jenkins"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Case Manager Phone / Email</label>
                        <input
                          type="text"
                          value={`${newCaseManagerPhone} · ${newCaseManagerEmail}`}
                          onChange={(e) => {
                            const val = e.target.value;
                            setNewCaseManagerPhone(val.split('·')[0]?.trim() || val);
                          }}
                          placeholder="(303) 636-5600 · sjenkins@rmhs.org"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Pipeline & Review */}
              {addStep === 4 && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#264e1e] uppercase tracking-wider block">
                        Step 4 of 4
                      </span>
                      <h3 className="text-base font-bold text-slate-900">Pipeline Assignment &amp; Review</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Assign intake staff, record clinical notes, and place the inquiry into the pipeline.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Inquiry Source</label>
                        <select
                          value={newSource}
                          onChange={(e) => setNewSource(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-xs outline-none focus:border-[#264e1e]"
                        >
                          <option value="Website">Website Inbound</option>
                          <option value="Phone">Phone Call to Office</option>
                          <option value="Case Management Agency">CMA Referral</option>
                          <option value="Direct Referral">Direct Family Referral</option>
                          <option value="RFP">State RFP Process</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Initial Pipeline Stage</label>
                        <select
                          value={addInitialStage}
                          onChange={(e) => setAddInitialStage(e.target.value as LeadStatus)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-xs outline-none focus:border-[#264e1e]"
                        >
                          {INTAKE_STAGES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Assigned Intake Staff</label>
                        <select
                          value={newOwner}
                          onChange={(e) => setNewOwner(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-xs outline-none focus:border-[#264e1e]"
                        >
                          <option value="Maya R.">Maya R.</option>
                          <option value="Jon P.">Jon P.</option>
                          <option value="Sam K.">Sam K.</option>
                          <option value="Alicia T.">Alicia T.</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="font-semibold text-slate-700 block mb-1">
                          Clinical Care &amp; Intake Background Notes
                        </label>
                        <textarea
                          rows={2}
                          value={newNotes}
                          onChange={(e) => setNewNotes(e.target.value)}
                          placeholder="Detail primary care requirements, diagnosis, medical history, and household support needs..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Review Summary Card */}
                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-2 text-xs">
                      <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide">
                        Patient Intake Summary
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                        <div>
                          <span className="text-slate-400 block">Patient Name:</span>
                          <span className="font-bold text-slate-900">{newClientFirstName || 'Mateo'} {newClientLastName || 'Morales'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Primary Contact:</span>
                          <span className="font-bold text-slate-900">{newContactName || 'Elena Morales'} ({newRelationship})</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Service &amp; Waiver:</span>
                          <span className="font-bold text-emerald-800">{newService} · {newWaiver.split('(')[0]}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Medicaid ID:</span>
                          <span className="font-bold text-slate-900 font-mono">{newMedicaidId}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">CMA Agency:</span>
                          <span className="font-bold text-slate-900">{newCmaAgency.split('(')[0]}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Assigned Owner:</span>
                          <span className="font-bold text-slate-900">{newOwner}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pinned Bottom Footer Navigation Bar */}
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex items-center justify-between gap-3">
              {addStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setAddStep(addStep - 1)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
              )}

              <div className="text-xs text-slate-400 font-medium">
                Step {addStep} of 4
              </div>

              {addStep < 4 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (addStep === 1 && !newClientFirstName.trim() && !newClientLastName.trim()) {
                      notify('Patient Name Required', 'Please enter first and last name.', 'warning');
                      return;
                    }
                    setAddStep(addStep + 1);
                  }}
                  className="flex items-center gap-1.5 px-5 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCreateLead()}
                  className="flex items-center gap-1.5 px-6 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Create Client Inquiry</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. MODAL: SOURCE INSIGHTS ANALYTICS                                       */}
      {/* ========================================================================= */}
      {showSourceInsightsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowSourceInsightsModal(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">📊</span>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    Inquiry Source Insights
                  </h3>
                  <p className="text-xs text-slate-500">
                    Lead acquisition volume and channel performance across Colorado.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSourceInsightsModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 pt-4">
              <div className="space-y-3">
                {[
                  { source: 'Website Inquiry', count: 3, pct: 30, color: 'bg-blue-600', conv: '67%' },
                  { source: 'Phone Inbound', count: 2, pct: 20, color: 'bg-emerald-600', conv: '50%' },
                  { source: 'Case Management Agency (CMA)', count: 2, pct: 20, color: 'bg-purple-600', conv: '80%' },
                  { source: 'Direct Referral', count: 2, pct: 20, color: 'bg-amber-500', conv: '75%' },
                  { source: 'RFP Process', count: 1, pct: 10, color: 'bg-rose-500', conv: '40%' },
                ].map((item) => (
                  <div key={item.source} className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-900">{item.source}</span>
                      <span className="font-mono text-slate-500 font-semibold">
                        {item.count} leads ({item.pct}%) • Conv. Rate: <strong className="text-emerald-700">{item.conv}</strong>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Top Channel:</strong> Case Management Agencies yield the highest qualification and fast-track authorization turnaround (avg 8.2 days).
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePortal } from '@/lib/store/portal-context';
import { CaregiverApplicant, CaregiverIntakeStage } from '@/lib/types';
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

export const CAREGIVER_STAGES: CaregiverIntakeStage[] = [
  'New Application',
  'Phone Screened',
  'Interview Scheduled',
  'Hiring Decision',
  'Offer Extended',
  'Hired (→ Onboarding)',
  'Archived / Withdrawn',
];

const STAGE_THEMES: Record<
  CaregiverIntakeStage,
  {
    label: string;
    dotColor: string;
    bgTint: string;
    borderColor: string;
    countBg: string;
    countText: string;
  }
> = {
  'New Application': {
    label: 'New Application',
    dotColor: 'bg-emerald-600',
    bgTint: 'bg-[#f4f9f4]',
    borderColor: 'border-[#dcf2e3]',
    countBg: 'bg-emerald-100',
    countText: 'text-emerald-900',
  },
  'Phone Screened': {
    label: 'Phone Screened',
    dotColor: 'bg-blue-600',
    bgTint: 'bg-[#f4f8fd]',
    borderColor: 'border-[#e1edf8]',
    countBg: 'bg-blue-100',
    countText: 'text-blue-900',
  },
  'Interview Scheduled': {
    label: 'Interview Scheduled',
    dotColor: 'bg-amber-600',
    bgTint: 'bg-[#fffdf2]',
    borderColor: 'border-[#fef0c7]',
    countBg: 'bg-amber-100',
    countText: 'text-amber-900',
  },
  'Hiring Decision': {
    label: 'Hiring Decision',
    dotColor: 'bg-purple-600',
    bgTint: 'bg-[#faf5ff]',
    borderColor: 'border-[#f3e8ff]',
    countBg: 'bg-purple-100',
    countText: 'text-purple-900',
  },
  'Offer Extended': {
    label: 'Offer Extended',
    dotColor: 'bg-indigo-600',
    bgTint: 'bg-[#f5f6ff]',
    borderColor: 'border-[#e0e7ff]',
    countBg: 'bg-indigo-100',
    countText: 'text-indigo-900',
  },
  'Hired (→ Onboarding)': {
    label: 'Hired & Onboarding',
    dotColor: 'bg-emerald-700',
    bgTint: 'bg-[#f0fdf4]',
    borderColor: 'border-[#bbf7d0]',
    countBg: 'bg-emerald-200',
    countText: 'text-emerald-950',
  },
  'Archived / Withdrawn': {
    label: 'Archived',
    dotColor: 'bg-slate-400',
    bgTint: 'bg-[#f8fafc]',
    borderColor: 'border-[#e2e8f0]',
    countBg: 'bg-slate-200',
    countText: 'text-slate-800',
  },
};

const HIRING_STEPS_LABELS = [
  'Application logged',
  'Phone screened',
  'Interview conducted',
  'References verified',
  'Offer extended',
  'Offer accepted',
  'Hired to onboarding',
];

export function CaregiverIntakePortal() {
  const router = useRouter();
  const {
    caregiverApplicants,
    updateCaregiverApplicantStage,
    advanceApplicantStep,
    addCaregiverApplicant,
    notify,
  } = usePortal();

  // View mode: 'board' or 'list'
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('All Stages');
  const [recruiterFilter, setRecruiterFilter] = useState('All Recruiters');
  const [classificationFilter, setClassificationFilter] = useState('All Classifications');
  const [sourceFilter, setSourceFilter] = useState('All Sources');
  const [countyFilter, setCountyFilter] = useState('All Counties');
  const [cbiFilter, setCbiFilter] = useState('All CBI');
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const isFiltered =
    searchQuery.trim() !== '' ||
    stageFilter !== 'All Stages' ||
    recruiterFilter !== 'All Recruiters' ||
    classificationFilter !== 'All Classifications' ||
    sourceFilter !== 'All Sources' ||
    countyFilter !== 'All Counties' ||
    cbiFilter !== 'All CBI';

  const handleClearFilters = () => {
    setSearchQuery('');
    setStageFilter('All Stages');
    setRecruiterFilter('All Recruiters');
    setClassificationFilter('All Classifications');
    setSourceFilter('All Sources');
    setCountyFilter('All Counties');
    setCbiFilter('All CBI');
  };

  // Selected applicant for detail modal (Image 3)
  const [selectedApplicant, setSelectedApplicant] = useState<CaregiverApplicant | null>(null);
  const [detailActiveTab, setDetailActiveTab] = useState<'overview' | 'credentials' | 'compensation' | 'communication'>('overview');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [addInitialStage, setAddInitialStage] = useState<CaregiverIntakeStage>('New Application');
  const [showLogInterviewModal, setShowLogInterviewModal] = useState(false);
  const [interviewNotes, setInterviewNotes] = useState('');
  const [interviewDate, setInterviewDate] = useState('2026-11-20');
  const [interviewTime, setInterviewTime] = useState('10:00 AM');

  // Add Caregiver Wizard state (Step 1 to 4 matching Caregiver Registration Wizard)
  const [addStep, setAddStep] = useState(1);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newStreet, setNewStreet] = useState('4820 Mountain Crest Dr');
  const [newCity, setNewCity] = useState('Denver');
  const [newState, setNewState] = useState('CO');
  const [newZip, setNewZip] = useState('80219');
  const [newCounty, setNewCounty] = useState('Denver');
  const [newRelationship, setNewRelationship] = useState('Mother');
  const [newLinkedPatient, setNewLinkedPatient] = useState('Mateo Morales');

  // Step 2: Role & Classification
  const [newType, setNewType] = useState<'Employee' | '1099' | 'Both'>('Employee');
  const [newRole, setNewRole] = useState('CNA');
  const [newSchedule, setNewSchedule] = useState('35–40 hrs/wk');
  const [newRate, setNewRate] = useState('$22.50/hr');

  // Step 3: Screening & Credentials
  const [newCbiPending, setNewCbiPending] = useState(false);
  const [newCprCertified, setNewCprCertified] = useState(true);
  const [newLicenseDora, setNewLicenseDora] = useState('Colorado DORA CNA Active (#88412)');
  const [newExperience, setNewExperience] = useState('4 years in-home pediatric care');
  const [newSource, setNewSource] = useState('Indeed');

  // Step 4: Pipeline Assignment & Review
  const [newRecruiter, setNewRecruiter] = useState('Alicia T.');
  const [newNotes, setNewNotes] = useState('');

  // Drag-and-drop state
  const [draggedAppId, setDraggedAppId] = useState<string | null>(null);

  // Filtered applicants
  const filteredApplicants = useMemo(() => {
    return caregiverApplicants.filter((app) => {
      // 1. Stage filter
      if (stageFilter !== 'All Stages') {
        if (app.stage !== stageFilter) return false;
      }

      // 2. Comprehensive Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = app.name.toLowerCase().includes(q);
        const matchesRole = app.role.toLowerCase().includes(q);
        const matchesCounty = app.county.toLowerCase().includes(q);
        const matchesPhone = app.phone ? app.phone.toLowerCase().includes(q) : false;
        const matchesEmail = app.email ? app.email.toLowerCase().includes(q) : false;
        const matchesRecruiter = app.recruiter.toLowerCase().includes(q);
        const matchesSource = app.source.toLowerCase().includes(q);
        const matchesNotes = app.notes ? app.notes.toLowerCase().includes(q) : false;
        if (!matchesName && !matchesRole && !matchesCounty && !matchesPhone && !matchesEmail && !matchesRecruiter && !matchesSource && !matchesNotes) return false;
      }

      // 3. Recruiter filter
      if (recruiterFilter !== 'All Recruiters') {
        if (app.recruiter !== recruiterFilter) return false;
      }

      // 4. Classification filter
      if (classificationFilter !== 'All Classifications') {
        if (app.classificationType !== classificationFilter) return false;
      }

      // 5. Source filter
      if (sourceFilter !== 'All Sources') {
        if (app.source !== sourceFilter) return false;
      }

      // 6. County filter
      if (countyFilter !== 'All Counties') {
        if (app.county !== countyFilter) return false;
      }

      // 7. CBI filter
      if (cbiFilter !== 'All CBI') {
        if (cbiFilter === 'Pending' && !app.cbiPending) return false;
        if (cbiFilter === 'Cleared' && app.cbiPending) return false;
      }

      return true;
    });
  }, [caregiverApplicants, searchQuery, stageFilter, recruiterFilter, classificationFilter, sourceFilter, countyFilter, cbiFilter]);

  // Key Metrics matching Image 1 & Image 2:
  // Open applicants: 6
  // Phone screens: 1
  // Interviews booked: 1
  // Hired this month: 8
  // Avg days to hire: 9d
  const openApplicantsCount = useMemo(() => {
    return caregiverApplicants.filter(
      (a) => a.stage !== 'Hired (→ Onboarding)' && a.stage !== 'Archived / Withdrawn'
    ).length;
  }, [caregiverApplicants]);

  const phoneScreensCount = useMemo(() => {
    return caregiverApplicants.filter((a) => a.stage === 'Phone Screened').length;
  }, [caregiverApplicants]);

  const interviewsBookedCount = useMemo(() => {
    return caregiverApplicants.filter((a) => a.stage === 'Interview Scheduled').length;
  }, [caregiverApplicants]);

  const hiredThisMonthCount = useMemo(() => {
    return caregiverApplicants.filter((a) => a.stage === 'Hired (→ Onboarding)').length + 6; // 8 as in screenshots
  }, [caregiverApplicants]);

  const avgDaysToHire = '9d';

  // Group applicants by 7 stages
  const stageGroups = useMemo(() => {
    const groups: Record<CaregiverIntakeStage, CaregiverApplicant[]> = {
      'New Application': [],
      'Phone Screened': [],
      'Interview Scheduled': [],
      'Hiring Decision': [],
      'Offer Extended': [],
      'Hired (→ Onboarding)': [],
      'Archived / Withdrawn': [],
    };

    filteredApplicants.forEach((app) => {
      if (groups[app.stage]) {
        groups[app.stage].push(app);
      } else {
        groups['New Application'].push(app);
      }
    });

    return groups;
  }, [filteredApplicants]);

  // Drag-and-drop
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedAppId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: CaregiverIntakeStage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedAppId;
    if (id) {
      updateCaregiverApplicantStage(id, targetStage);
      setDraggedAppId(null);
    }
  };

  // Wizard Step Titles matching Caregiver Registration Wizard
  const caregiverWizardStepTitles = [
    'Caregiver Profile',
    'Role & Classification',
    'Screening & Credentials',
    'Pipeline & Review',
  ];

  // Open Add Modal
  const handleOpenAddModal = (stage: CaregiverIntakeStage = 'New Application') => {
    setAddInitialStage(stage);
    setAddStep(1);
    setNewFirstName('');
    setNewLastName('');
    setNewPhone('');
    setNewEmail('');
    setNewStreet('4820 Mountain Crest Dr');
    setNewCity('Denver');
    setNewState('CO');
    setNewZip('80219');
    setNewCounty('Denver');
    setNewRelationship('Mother');
    setNewLinkedPatient('Mateo Morales');
    setNewType('Employee');
    setNewRole('CNA');
    setNewSchedule('35–40 hrs/wk');
    setNewRate('$22.50/hr');
    setNewCbiPending(false);
    setNewCprCertified(true);
    setNewLicenseDora('Colorado DORA CNA Active (#88412)');
    setNewExperience('4 years in-home care');
    setNewSource('Indeed');
    setNewRecruiter('Alicia T.');
    setNewNotes('');
    setShowAddModal(true);
  };

  // Pre-fill realistic demo data matching Caregiver Onboarding Flow
  const handlePrefillCaregiverData = () => {
    setNewFirstName('Elena');
    setNewLastName('Morales');
    setNewPhone('(303) 555-0142');
    setNewEmail('elena.morales@coloradomail.net');
    setNewStreet('4820 Mountain Crest Dr');
    setNewCity('Denver');
    setNewState('CO');
    setNewZip('80219');
    setNewCounty('Denver');
    setNewRelationship('Mother');
    setNewLinkedPatient('Mateo Morales');
    setNewType('Employee');
    setNewRole('CNA');
    setNewSchedule('35–40 hrs/wk');
    setNewRate('$22.50/hr');
    setNewCbiPending(false);
    setNewCprCertified(true);
    setNewLicenseDora('Colorado DORA CNA Active (#88412)');
    setNewExperience('4 years in-home pediatric care');
    setNewSource('Indeed');
    setNewRecruiter('Alicia T.');
    setNewNotes('Experienced family caregiver with CPR/First Aid certification. Ready for immediate IHSS assignment.');
    notify('Pre-fill Complete', 'Elena Morales caregiver credentials populated for testing.', 'info');
  };

  // Submit Add Caregiver Inquiry
  const handleCreateApplicant = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const fullName = `${newFirstName} ${newLastName}`.trim();
    if (!fullName) {
      notify('Missing Name', 'Please provide applicant first and last name.', 'warning');
      setAddStep(1);
      return;
    }

    const recruiterInitials = newRecruiter
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    addCaregiverApplicant({
      name: fullName,
      role: newRole,
      classificationType: newType,
      stage: addInitialStage,
      currentStep:
        addInitialStage === 'Hired (→ Onboarding)'
          ? 7
          : addInitialStage === 'Offer Extended'
          ? 5
          : addInitialStage === 'Hiring Decision'
          ? 4
          : addInitialStage === 'Interview Scheduled'
          ? 3
          : addInitialStage === 'Phone Screened'
          ? 2
          : 1,
      totalSteps: 7,
      stepLabel:
        addInitialStage === 'Hired (→ Onboarding)' ? 'Hired to onboarding' : 'Application logged',
      source: newSource,
      county: newCounty,
      recruiter: newRecruiter,
      recruiterInitials,
      daysInStage: 1,
      cbiPending: newCbiPending,
      phone: newPhone || '(303) 555-0142',
      email: newEmail || 'elena.morales@coloradomail.net',
      targetSchedule: newSchedule,
      targetRate: newRate,
      appliedDate: 'Today',
      notes:
        newNotes ||
        `Linked to ${newLinkedPatient} (${newRelationship}). Experience: ${newExperience}. DORA: ${newLicenseDora}.`,
      experienceYears: 4,
      certifications: [newLicenseDora, newCprCertified ? 'AHA CPR / First Aid' : 'First Aid'],
    });

    setShowAddModal(false);
  };

  // Handle Hire & Move to Onboarding
  const handleHireAndMove = (applicant: CaregiverApplicant) => {
    updateCaregiverApplicantStage(applicant.id, 'Hired (→ Onboarding)');
    setSelectedApplicant({
      ...applicant,
      stage: 'Hired (→ Onboarding)',
      currentStep: 7,
      stepLabel: 'Hired to onboarding',
    });
    notify(
      'Caregiver Hired!',
      `${applicant.name} moved to Onboarding. 15-document packet, CBI checks, and ADP payroll provisioning unlocked.`,
      'success'
    );
  };

  // Render Role Badge
  const renderRoleBadge = (role: string) => {
    const displayRole =
      role === 'Personal Care Attendant (PCA)' ? 'PCA' : role === 'Personal Care' ? 'PCA' : role;
    return (
      <span className="bg-slate-100 text-slate-700 font-semibold text-[11px] px-2 py-0.5 rounded-md border border-slate-200/80 whitespace-nowrap shrink-0">
        {displayRole}
      </span>
    );
  };

  // Active applicant in modal (synced)
  const currentApplicant = selectedApplicant
    ? caregiverApplicants.find((a) => a.id === selectedApplicant.id) || selectedApplicant
    : null;

  return (
    <div className="space-y-4 pb-12 select-none">
      {/* ========================================================================= */}
      {/* 1. PAGE TITLE & ACTION HEADER ROW                                         */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Caregiver Intake
          </h1>
        </div>
        <button
          type="button"
          onClick={() => handleOpenAddModal('New Application')}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add caregiver inquiry</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. STANDARDIZED STATS CARDS (Matching Dashboard KpiCards Layout & Style)   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
        {/* 1. Open applicants */}
        <button
          type="button"
          onClick={() => {
            setStageFilter('All Stages');
            setCountyFilter('All Counties');
            setCbiFilter('All CBI');
          }}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md transition-all duration-200 text-left cursor-pointer group flex flex-col justify-between hover:border-[#3e6b2b] hover:-translate-y-0.5 relative overflow-hidden"
        >
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate block">
                OPEN APPLICANTS
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {openApplicantsCount}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Active recruiting pipeline
            </span>
          </div>
        </button>

        {/* 2. Phone screens */}
        <button
          type="button"
          onClick={() => setStageFilter(stageFilter === 'Phone Screened' ? 'All Stages' : 'Phone Screened')}
          className={`bg-white rounded-2xl p-4 sm:p-5 border ${stageFilter === 'Phone Screened' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200/80'
            } shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md transition-all duration-200 text-left cursor-pointer group flex flex-col justify-between hover:border-blue-400 hover:-translate-y-0.5 relative overflow-hidden`}
        >
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate block">
                PHONE SCREENS
              </span>
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200/70 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {phoneScreensCount}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-700">
              Pending recruiter review
            </span>
          </div>
        </button>

        {/* 3. Interviews booked */}
        <button
          type="button"
          onClick={() => setStageFilter(stageFilter === 'Interview Scheduled' ? 'All Stages' : 'Interview Scheduled')}
          className={`bg-white rounded-2xl p-4 sm:p-5 border ${stageFilter === 'Interview Scheduled' ? 'border-amber-500 ring-2 ring-amber-200' : 'border-slate-200/80'
            } shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md transition-all duration-200 text-left cursor-pointer group flex flex-col justify-between hover:border-amber-400 hover:-translate-y-0.5 relative overflow-hidden`}
        >
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate block">
                INTERVIEWS BOOKED
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200/70 text-amber-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {interviewsBookedCount}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800">
              Scheduled this week
            </span>
          </div>
        </button>

        {/* 4. Hired this month */}
        <button
          type="button"
          onClick={() => setStageFilter(stageFilter === 'Hired (→ Onboarding)' ? 'All Stages' : 'Hired (→ Onboarding)')}
          className={`bg-white rounded-2xl p-4 sm:p-5 border ${stageFilter === 'Hired (→ Onboarding)' ? 'border-[#3e6b2b] ring-2 ring-emerald-200' : 'border-slate-200/80'
            } shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md transition-all duration-200 text-left cursor-pointer group flex flex-col justify-between hover:border-[#3e6b2b] hover:-translate-y-0.5 relative overflow-hidden`}
        >
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate block">
                HIRED THIS MONTH
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#3e6b2b] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {hiredThisMonthCount}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700">
              Ready for onboarding handoff
            </span>
          </div>
        </button>

        {/* 5. Avg days to hire */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md transition-all duration-200 text-left group flex flex-col justify-between hover:border-purple-400 relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate block">
                AVG DAYS TO HIRE
              </span>
              <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-200/70 text-purple-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {avgDaysToHire}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-700">
              Target &lt; 12 days
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
            {/* Search applicants */}
            <div className="relative min-w-[210px] flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, role, email..."
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
                {CAREGIVER_STAGES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* All Recruiters */}
            <div className="relative">
              <select
                value={recruiterFilter}
                onChange={(e) => setRecruiterFilter(e.target.value)}
                className="portal-select"
              >
                <option value="All Recruiters">All Recruiters</option>
                <option value="Alicia T.">Alicia T.</option>
                <option value="Maya R.">Maya R.</option>
                <option value="Jon P.">Jon P.</option>
                <option value="Sam K.">Sam K.</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* All Classifications */}
            <div className="relative">
              <select
                value={classificationFilter}
                onChange={(e) => setClassificationFilter(e.target.value)}
                className="portal-select"
              >
                <option value="All Classifications">All Classifications</option>
                <option value="Employee">Employee</option>
                <option value="1099">1099</option>
                <option value="Both">Both</option>
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
                <option value="Indeed">Indeed</option>
                <option value="Referral">Referral</option>
                <option value="Website">Website</option>
                <option value="Job Fair">Job Fair</option>
                <option value="Phone Call">Phone Call</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* More filters Toggle Button */}
            <button
              type="button"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className={`portal-filter-btn ${showMoreFilters || countyFilter !== 'All Counties' || cbiFilter !== 'All CBI'
                ? 'bg-emerald-50 text-[#3e6b2b] border-[#3e6b2b]/40 font-bold'
                : ''
                }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>More filters</span>
              {(countyFilter !== 'All Counties' || cbiFilter !== 'All CBI') && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#3e6b2b]" />
              )}
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

        {/* Expandable Secondary Filters Row (County & CBI status) */}
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
              </select>
            </div>

            {/* CBI Background Check Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-medium">CBI Check:</span>
              <select
                value={cbiFilter}
                onChange={(e) => setCbiFilter(e.target.value)}
                className="portal-select text-xs py-1"
              >
                <option value="All CBI">All CBI Statuses</option>
                <option value="Pending">CBI Pending</option>
                <option value="Cleared">CBI Cleared</option>
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
            {CAREGIVER_STAGES.map((stage) => {
              const theme = STAGE_THEMES[stage];
              const applicantsInStage = stageGroups[stage] || [];

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
                        {applicantsInStage.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenAddModal(stage)}
                        title={`Add applicant to ${stage}`}
                        className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Cards Stack */}
                  <div className="space-y-2 min-h-[120px]">
                    {applicantsInStage.map((app) => {
                      return (
                        <div
                          key={app.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, app.id)}
                          onClick={() => {
                            setSelectedApplicant(app);
                            setDetailActiveTab('overview');
                          }}
                          className="portal-card-interactive group space-y-2"
                        >
                          {/* Row 1: Name + Role Badge */}
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-[#264e1e] transition-colors truncate">
                              {app.name}
                            </span>
                            {renderRoleBadge(app.role)}
                          </div>

                          {/* Row 2: Location & Source */}
                          <div className="text-[11px] text-slate-500 font-medium truncate">
                            {app.county} Co. • {app.classificationType} • {app.source}
                          </div>

                          {/* Row 3: Action / Milestone Tag (Only when relevant) */}
                          {(app.interviewScheduledTime || app.cbiPending) && (
                            <div className="pt-0.5">
                              {app.interviewScheduledTime ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded-md border border-blue-200/80">
                                  <Calendar className="w-3 h-3 text-blue-500 shrink-0" />
                                  <span>{app.interviewScheduledTime}</span>
                                </span>
                              ) : app.cbiPending ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  <span>CBI pending</span>
                                </span>
                              ) : null}
                            </div>
                          )}

                          {/* Row 4: Footer - Recruiter + Days in Stage */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                                {app.recruiterInitials}
                              </div>
                              <span className="text-slate-600 font-medium truncate text-[11px]">
                                {app.recruiter}
                              </span>
                            </div>

                            <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-1">
                              {app.daysInStage}d in stage
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom + Add applicant button */}
                  <button
                    type="button"
                    onClick={() => handleOpenAddModal(stage)}
                    className="portal-column-add-btn"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add applicant</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* LIST / TABLE VIEW (Matches Image 2) */
        <div className="portal-table-container">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="portal-table-head">
                  <th className="py-3 px-4">APPLICANT NAME</th>
                  <th className="py-3 px-3">ROLE</th>
                  <th className="py-3 px-3">TYPE</th>
                  <th className="py-3 px-3">STAGE</th>
                  <th className="py-3 px-4 min-w-[120px]">PROGRESS</th>
                  <th className="py-3 px-3">SOURCE</th>
                  <th className="py-3 px-3">RECRUITER</th>
                  <th className="py-3 px-2 text-center">DAYS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredApplicants.map((app) => {
                  const theme = STAGE_THEMES[app.stage];
                  const stepPct = Math.round((app.currentStep / app.totalSteps) * 100);

                  return (
                    <tr
                      key={app.id}
                      onClick={() => {
                        setSelectedApplicant(app);
                        setDetailActiveTab('overview');
                      }}
                      className="portal-table-row"
                    >
                      {/* APPLICANT NAME */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 group-hover:text-[#264e1e] transition-colors">
                          {app.name}
                        </span>
                      </td>

                      {/* ROLE */}
                      <td className="py-3 px-3">{renderRoleBadge(app.role)}</td>

                      {/* TYPE */}
                      <td className="py-3 px-3 text-slate-600 font-medium">{app.classificationType}</td>

                      {/* STAGE with colored dot */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${theme.dotColor} shrink-0`} />
                          <span className="font-semibold text-slate-800">{app.stage}</span>
                        </div>
                      </td>

                      {/* PROGRESS */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-medium text-slate-500 font-mono">
                            Step {app.currentStep}/{app.totalSteps}
                          </span>
                          <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#264e1e] rounded-full"
                              style={{ width: `${stepPct}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* SOURCE */}
                      <td className="py-3 px-3 text-slate-600">{app.source}</td>

                      {/* RECRUITER */}
                      <td className="py-3 px-3 text-slate-700 font-semibold">{app.recruiter}</td>

                      {/* DAYS */}
                      <td className="py-3 px-2 text-center text-slate-400 font-medium font-mono text-[11px]">
                        {app.daysInStage}d
                      </td>

                      {/* ACTIONS */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedApplicant(app);
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
      {/* 5. DETAIL MODAL / DRAWER (Matches Image 3)                                */}
      {/* ========================================================================= */}
      {currentApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedApplicant(null)}
          />

          <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-98 duration-150">
            {/* Modal Top Header (Image 3) */}
            <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 bg-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      {currentApplicant.name}
                    </h2>
                    <span className="bg-slate-100 text-slate-700 font-semibold text-xs px-2.5 py-0.5 rounded-full border border-slate-200">
                      {currentApplicant.role} · {currentApplicant.classificationType}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1">
                    County: <strong className="text-slate-700 font-semibold">{currentApplicant.county}</strong> · Source: {currentApplicant.source} · Applied: {currentApplicant.appliedDate} · Recruiter: {currentApplicant.recruiter} · <strong className="text-slate-900 font-black">Target Rate: {currentApplicant.targetRate}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin-portal/caregiver-intake/${currentApplicant.id}`}
                    className="px-2.5 py-1 text-xs font-semibold text-[#3e6b2b] bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    title="Open Dedicated Full Page"
                  >
                    <span>Full page</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedApplicant(null)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stage Dropdown & Action Buttons (Image 3) */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    STAGE:
                  </span>
                  <div className="relative">
                    <select
                      value={currentApplicant.stage}
                      onChange={(e) => {
                        const newSt = e.target.value as CaregiverIntakeStage;
                        updateCaregiverApplicantStage(currentApplicant.id, newSt);
                      }}
                      className="appearance-none pl-3 pr-8 py-1.5 bg-slate-50/60 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 cursor-pointer focus:outline-none shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
                    >
                      {CAREGIVER_STAGES.map((st) => (
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
                    onClick={() => setShowLogInterviewModal(true)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 shadow-[0_1px_3px_rgba(15,23,42,0.05)] hover:shadow cursor-pointer transition-all"
                  >
                    Log interview
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      notify('Message Sent', `SMS & Email dispatched to ${currentApplicant.name} (${currentApplicant.phone}).`, 'info');
                    }}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 shadow-[0_1px_3px_rgba(15,23,42,0.05)] hover:shadow cursor-pointer transition-all"
                  >
                    Send message
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHireAndMove(currentApplicant)}
                    className="px-4 py-1.5 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all"
                  >
                    Hire &amp; Move to Onboarding
                  </button>
                </div>
              </div>

              {/* HIRING STEPPER: STEP X OF 7 (Image 3) */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    HIRING STEPPER: STEP {currentApplicant.currentStep} OF 7
                  </span>

                  <button
                    type="button"
                    onClick={() => advanceApplicantStep(currentApplicant.id)}
                    className="inline-flex items-center gap-1.5 lg:gap-4 px-3 py-1 bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>Mark complete</span>
                    <span>✓</span>
                  </button>
                </div>

                {/* 7 Horizontal Stepper Bars */}
                <div className="grid grid-cols-7 gap-1.5 lg:gap-4">
                  {HIRING_STEPS_LABELS.map((stepLabel, idx) => {
                    const stepNum = idx + 1;
                    const isCompleted = currentApplicant.currentStep >= stepNum;
                    const isCurrent = currentApplicant.currentStep === stepNum;

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

            {/* Tabs Bar (Image 3) */}
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
                onClick={() => setDetailActiveTab('credentials')}
                className={`py-3 transition-colors border-b-2 cursor-pointer ${detailActiveTab === 'credentials'
                  ? 'border-[#264e1e] text-[#264e1e] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
              >
                Experience &amp; Credentials
              </button>
              <button
                type="button"
                onClick={() => setDetailActiveTab('compensation')}
                className={`py-3 transition-colors border-b-2 cursor-pointer ${detailActiveTab === 'compensation'
                  ? 'border-[#264e1e] text-[#264e1e] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
              >
                Compensation &amp; Packet
              </button>
              <button
                type="button"
                onClick={() => setDetailActiveTab('communication')}
                className={`py-3 transition-colors border-b-2 cursor-pointer ${detailActiveTab === 'communication'
                  ? 'border-[#264e1e] text-[#264e1e] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
              >
                Communication (1)
              </button>
            </div>

            {/* Modal Body: Active Tab Content (Image 3) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {detailActiveTab === 'overview' && (
                <div className="space-y-4">
                  {/* Candidate Information Card */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      Candidate Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          PRIMARY PHONE:
                        </span>
                        <a href={`tel:${currentApplicant.phone}`} className="font-bold text-slate-900 hover:text-blue-600 mt-0.5 block">
                          {currentApplicant.phone}
                        </a>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          EMAIL ADDRESS:
                        </span>
                        <a href={`mailto:${currentApplicant.email}`} className="font-bold text-slate-900 hover:text-blue-600 mt-0.5 block truncate">
                          {currentApplicant.email}
                        </a>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          COUNTY / LOCATION:
                        </span>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {currentApplicant.county} County, CO
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          TARGET SCHEDULE:
                        </span>
                        <p className="font-bold text-slate-900 mt-0.5">
                          {currentApplicant.targetSchedule}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recruiter Notes Card */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      Recruiter Notes
                    </h3>

                    <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-700 leading-relaxed font-medium">
                      {currentApplicant.notes}
                    </div>
                  </div>
                </div>
              )}

              {detailActiveTab === 'credentials' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#264e1e]" />
                      <span>Licenses &amp; Professional Certifications</span>
                    </h3>

                    <div className="space-y-2 text-xs">
                      {currentApplicant.certifications && currentApplicant.certifications.length > 0 ? (
                        currentApplicant.certifications.map((cert) => (
                          <div key={cert} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                            <span className="font-bold text-slate-800">{cert}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              Active / Verified
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-500 italic">No state licenses uploaded yet.</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#264e1e]" />
                      <span>Background Clearance &amp; Colorado CBI Screening</span>
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">CBI Fingerprint Status</span>
                        <span className={`font-bold mt-1 inline-block ${currentApplicant.cbiPending ? 'text-amber-700' : 'text-emerald-700'}`}>
                          {currentApplicant.cbiPending ? '● In Verification (Pending)' : '✓ Passed & Cleared'}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Federal OIG Exclusion</span>
                        <span className="font-bold text-emerald-700 mt-1 inline-block">✓ No Match Found</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {detailActiveTab === 'compensation' && (
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-4 text-xs">
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#264e1e]" />
                    <span>Compensation, Classification &amp; 15-Doc Packet</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Target Pay Rate</span>
                      <span className="text-base font-black text-slate-900 mt-0.5 block">{currentApplicant.targetRate}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Employee Classification</span>
                      <span className="text-base font-black text-[#264e1e] mt-0.5 block">{currentApplicant.classificationType}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-900">
                    <p className="font-bold">Onboarding Packet Ready for Dispatch</p>
                    <p className="text-[11px] text-emerald-800 mt-1">
                      Promoting this candidate automatically compiles the 15-document onboarding package (W-4, I-9, Direct Deposit, Code of Conduct) and creates their employee record in Onboarding.
                    </p>
                  </div>
                </div>
              )}

              {detailActiveTab === 'communication' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-[#264e1e]" />
                      <span>Communication History</span>
                    </h3>

                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                        <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1 font-semibold">
                          <span>SMS · Automated Dispatch</span>
                          <span>Nov 16, 09:30 AM</span>
                        </div>
                        <p className="text-slate-800 font-medium">
                          &quot;Hi {currentApplicant.name}, thank you for your application to LiliSare. Our recruitment team has received your submission and will review it within 24 hours.&quot;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Send Quick Note */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] flex gap-2">
                    <input
                      type="text"
                      placeholder={`Send SMS or email to ${currentApplicant.name}...`}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1.5 focus:ring-[#264e1e]/30"
                    />
                    <button
                      type="button"
                      onClick={() => notify('Message Dispatched', 'Communication logged successfully.', 'success')}
                      className="px-4 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL: LOG INTERVIEW                                                   */}
      {/* ========================================================================= */}
      {showLogInterviewModal && currentApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowLogInterviewModal(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Log Interview · {currentApplicant.name}
              </h3>
              <button
                type="button"
                onClick={() => setShowLogInterviewModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 pt-4 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Interview Date</label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Time</label>
                  <input
                    type="text"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Interview Feedback &amp; Notes</label>
                <textarea
                  rows={3}
                  value={interviewNotes}
                  onChange={(e) => setInterviewNotes(e.target.value)}
                  placeholder="Clinical skills assessment, communication demeanor, schedule reliability..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogInterviewModal(false)}
                  className="px-3 py-1.5 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateCaregiverApplicantStage(currentApplicant.id, 'Interview Scheduled');
                    setShowLogInterviewModal(false);
                    notify('Interview Logged', `Interview confirmed for ${currentApplicant.name} on ${interviewDate} at ${interviewTime}.`, 'success');
                  }}
                  className="px-4 py-1.5 bg-[#264e1e] text-white rounded-xl font-bold"
                >
                  Save &amp; Update Stage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MODAL: + ADD CAREGIVER INQUIRY (4-STEP REGISTRATION STEPS WIZARD)       */}
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
                      New Caregiver Inquiry
                    </h2>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#264e1e] border border-emerald-200/80">
                      Registration Wizard
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Multi-step caregiver application wizard matching Colorado credentialing standards.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handlePrefillCaregiverData}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50/50 border border-amber-300 text-slate-900 text-xs font-bold transition-all shadow-2xs cursor-pointer group active:scale-98"
                    title="Pre-fill realistic Colorado Caregiver application data"
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
                      {caregiverWizardStepTitles[addStep - 1]}
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
                  {caregiverWizardStepTitles.map((title, idx) => {
                    const stepNum = idx + 1;
                    const isCurrent = addStep === stepNum;
                    const isCompleted = addStep > stepNum;

                    return (
                      <button
                        type="button"
                        key={title}
                        onClick={() => setAddStep(stepNum)}
                        className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${
                          isCurrent
                            ? 'bg-emerald-50/80 border-[#264e1e] text-slate-900 font-bold shadow-2xs'
                            : isCompleted
                            ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            : 'bg-white border-slate-200/60 text-slate-400 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                              isCurrent
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
              {/* STEP 1: Caregiver Profile */}
              {addStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#264e1e] uppercase tracking-wider block">
                          Step 1 of 4
                        </span>
                        <h3 className="text-base font-bold text-slate-900">Caregiver Profile &amp; Contact</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Record basic demographic coordinates and family patient relationship.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex flex-wrap items-center justify-between gap-2">
                      <span className="text-slate-600 font-medium">Linked Client / Patient:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newLinkedPatient}
                          onChange={(e) => setNewLinkedPatient(e.target.value)}
                          placeholder="e.g. Mateo Morales"
                          className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                        />
                        <span className="text-slate-400 text-[11px]">({newRelationship})</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">First Name *</label>
                        <input
                          type="text"
                          value={newFirstName}
                          onChange={(e) => setNewFirstName(e.target.value)}
                          placeholder="e.g. Elena"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs outline-none focus:border-[#264e1e] focus:ring-1 focus:ring-[#264e1e]"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Last Name *</label>
                        <input
                          type="text"
                          value={newLastName}
                          onChange={(e) => setNewLastName(e.target.value)}
                          placeholder="e.g. Morales"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs outline-none focus:border-[#264e1e] focus:ring-1 focus:ring-[#264e1e]"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Phone Number *</label>
                        <input
                          type="text"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          placeholder="(303) 555-0142"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs outline-none focus:border-[#264e1e] focus:ring-1 focus:ring-[#264e1e]"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Email Address *</label>
                        <input
                          type="email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          placeholder="elena.morales@coloradomail.net"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs outline-none focus:border-[#264e1e] focus:ring-1 focus:ring-[#264e1e]"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Relationship to Client *</label>
                        <input
                          type="text"
                          value={newRelationship}
                          onChange={(e) => setNewRelationship(e.target.value)}
                          placeholder="e.g. Mother, Father, Spouse, Adult Child"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs outline-none focus:border-[#264e1e] focus:ring-1 focus:ring-[#264e1e]"
                        />
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
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Role & Classification */}
              {addStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#264e1e] uppercase tracking-wider block">
                        Step 2 of 4
                      </span>
                      <h3 className="text-base font-bold text-slate-900">Employment Classification &amp; Role</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Select the caregiver's employment tax model and target schedule requirements.
                      </p>
                    </div>

                    {/* Radio Cards matching Caregiver Onboarding Flow */}
                    <div className="space-y-2.5">
                      {[
                        {
                          type: 'Employee',
                          label: 'Employee (W-2)',
                          docs: '~20 packet items',
                          desc: 'Standard for family members under IHSS / CNA programs with state tax withholding and workers comp.',
                        },
                        {
                          type: '1099',
                          label: 'Independent Contractor (1099)',
                          docs: '~15 packet items',
                          desc: 'For independent respite attendants or non-exclusive caregivers operating as contractors.',
                        },
                        {
                          type: 'Both',
                          label: 'Both Employee and Contractor',
                          docs: 'Combined packet',
                          desc: 'Dual classification for primary family care plus external respite / backup agency shifts.',
                        },
                      ].map((item) => (
                        <label
                          key={item.type}
                          onClick={() => setNewType(item.type as any)}
                          className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                            newType === item.type
                              ? 'border-[#264e1e] bg-emerald-50/50 shadow-2xs ring-1 ring-[#264e1e]/20'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="classification"
                            checked={newType === item.type}
                            onChange={() => setNewType(item.type as any)}
                            className="mt-0.5 text-[#264e1e] focus:ring-[#264e1e]"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900">{item.label}</span>
                              <span className="text-[10px] font-semibold text-[#264e1e] bg-emerald-100/70 px-2 py-0.5 rounded">
                                {item.docs}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Role Applied For</label>
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-xs outline-none focus:border-[#264e1e]"
                        >
                          <option value="CNA">CNA (Certified Nursing Assistant)</option>
                          <option value="IHSS">IHSS (Family Caregiver)</option>
                          <option value="Personal Care">Personal Care Worker</option>
                          <option value="SCC">SCC (Specialized Care)</option>
                          <option value="HMA">HMA (Health Maintenance)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Target Schedule</label>
                        <input
                          type="text"
                          value={newSchedule}
                          onChange={(e) => setNewSchedule(e.target.value)}
                          placeholder="35–40 hrs/wk"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Target Rate</label>
                        <input
                          type="text"
                          value={newRate}
                          onChange={(e) => setNewRate(e.target.value)}
                          placeholder="$22.50/hr"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs font-bold text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Screening & Credentials */}
              {addStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#264e1e] uppercase tracking-wider block">
                        Step 3 of 4
                      </span>
                      <h3 className="text-base font-bold text-slate-900">Screening, Credentials &amp; Source</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Track background check clearances, state registry licenses, and referral origin.
                      </p>
                    </div>

                    <div className="space-y-3 text-xs">
                      {/* CBI Background Check */}
                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 block">Colorado CBI Background Check</span>
                          <span className="text-[11px] text-slate-500">State fingerprint criminal history repository</span>
                        </div>
                        <select
                          value={newCbiPending ? 'Pending' : 'Cleared'}
                          onChange={(e) => setNewCbiPending(e.target.value === 'Pending')}
                          className="px-2.5 py-1 rounded-xl border border-slate-200 bg-white font-bold text-xs"
                        >
                          <option value="Cleared">Cleared on file</option>
                          <option value="Pending">Pending submission</option>
                        </select>
                      </div>

                      {/* CPR Certification */}
                      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 block">CPR &amp; First Aid Certification</span>
                          <span className="text-[11px] text-slate-500">American Heart Association or Red Cross</span>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                          <input
                            type="checkbox"
                            checked={newCprCertified}
                            onChange={(e) => setNewCprCertified(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-300 text-[#264e1e] focus:ring-[#264e1e]"
                          />
                          <span>Verified Active</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">State License / Registration</label>
                          <input
                            type="text"
                            value={newLicenseDora}
                            onChange={(e) => setNewLicenseDora(e.target.value)}
                            placeholder="e.g. Colorado DORA CNA #88412"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-slate-700 block mb-1">In-Home Experience</label>
                          <input
                            type="text"
                            value={newExperience}
                            onChange={(e) => setNewExperience(e.target.value)}
                            placeholder="e.g. 4 years pediatric care"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="font-semibold text-slate-700 block mb-1">Inquiry Source</label>
                          <select
                            value={newSource}
                            onChange={(e) => setNewSource(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-xs outline-none focus:border-[#264e1e]"
                          >
                            <option value="Indeed">Indeed (Inbound Job Post)</option>
                            <option value="Referral">Referral (Client Family Referral)</option>
                            <option value="Website">Website Application Form</option>
                            <option value="Job Fair">Denver Community Job Fair</option>
                            <option value="Phone Call">Direct Phone Call to Office</option>
                          </select>
                        </div>
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
                        Assign recruiter, review application credentials, and place in pipeline.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Initial Pipeline Stage</label>
                        <select
                          value={addInitialStage}
                          onChange={(e) => setAddInitialStage(e.target.value as CaregiverIntakeStage)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-xs outline-none focus:border-[#264e1e]"
                        >
                          {CAREGIVER_STAGES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Assigned Recruiter</label>
                        <select
                          value={newRecruiter}
                          onChange={(e) => setNewRecruiter(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 font-semibold text-xs outline-none focus:border-[#264e1e]"
                        >
                          <option value="Alicia T.">Alicia T.</option>
                          <option value="Maya R.">Maya R.</option>
                          <option value="Jon P.">Jon P.</option>
                          <option value="Sam K.">Sam K.</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-semibold text-slate-700 block mb-1">Recruiter Notes &amp; Availability</label>
                        <textarea
                          rows={2}
                          value={newNotes}
                          onChange={(e) => setNewNotes(e.target.value)}
                          placeholder="Candidate shift availability, pediatric experience, and specific family care notes..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Review Summary Card */}
                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-2 text-xs">
                      <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide">
                        Caregiver Application Summary
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                        <div>
                          <span className="text-slate-400 block">Name:</span>
                          <span className="font-bold text-slate-900">{newFirstName || 'Elena'} {newLastName || 'Morales'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Role &amp; Class:</span>
                          <span className="font-bold text-slate-900">{newRole} · {newType}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Target Rate:</span>
                          <span className="font-bold text-emerald-800">{newRate}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">County:</span>
                          <span className="font-bold text-slate-900">{newCounty} County</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">CBI Status:</span>
                          <span className="font-bold text-slate-900">{newCbiPending ? 'Pending' : 'Cleared on file'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Recruiter:</span>
                          <span className="font-bold text-slate-900">{newRecruiter}</span>
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
                    if (addStep === 1 && !newFirstName.trim() && !newLastName.trim()) {
                      notify('Applicant Name Required', 'Please enter first and last name.', 'warning');
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
                  onClick={() => handleCreateApplicant()}
                  className="flex items-center gap-1.5 px-6 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Create Caregiver Inquiry</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

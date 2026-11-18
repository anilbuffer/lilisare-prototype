'use client';

import React, { useState, useMemo } from 'react';
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
  ArrowRight,
  Sparkles,
  User,
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
    label: 'NEW APPLICATION',
    dotColor: 'bg-emerald-600',
    bgTint: 'bg-[#f4f9f4]',
    borderColor: 'border-[#dcf2e3]',
    countBg: 'bg-emerald-100',
    countText: 'text-emerald-900',
  },
  'Phone Screened': {
    label: 'PHONE SCREENED',
    dotColor: 'bg-blue-600',
    bgTint: 'bg-[#f4f8fd]',
    borderColor: 'border-[#e1edf8]',
    countBg: 'bg-blue-100',
    countText: 'text-blue-900',
  },
  'Interview Scheduled': {
    label: 'INTERVIEW SCHEDULED',
    dotColor: 'bg-amber-600',
    bgTint: 'bg-[#fffdf2]',
    borderColor: 'border-[#fef0c7]',
    countBg: 'bg-amber-100',
    countText: 'text-amber-900',
  },
  'Hiring Decision': {
    label: 'HIRING DECISION',
    dotColor: 'bg-purple-600',
    bgTint: 'bg-[#faf5ff]',
    borderColor: 'border-[#f3e8ff]',
    countBg: 'bg-purple-100',
    countText: 'text-purple-900',
  },
  'Offer Extended': {
    label: 'OFFER EXTENDED',
    dotColor: 'bg-indigo-600',
    bgTint: 'bg-[#f5f6ff]',
    borderColor: 'border-[#e0e7ff]',
    countBg: 'bg-indigo-100',
    countText: 'text-indigo-900',
  },
  'Hired (→ Onboarding)': {
    label: 'HIRED (→ ONBOARDING)',
    dotColor: 'bg-emerald-700',
    bgTint: 'bg-[#f0fdf4]',
    borderColor: 'border-[#bbf7d0]',
    countBg: 'bg-emerald-200',
    countText: 'text-emerald-950',
  },
  'Archived / Withdrawn': {
    label: 'ARCHIVED / WITHDRAWN',
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
  const [recruiterFilter, setRecruiterFilter] = useState('All Recruiters');
  const [classificationFilter, setClassificationFilter] = useState('All Classifications');
  const [sourceFilter, setSourceFilter] = useState('All Sources');

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

  // Add Caregiver form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('CNA');
  const [newType, setNewType] = useState<'Employee' | '1099' | 'Both'>('Employee');
  const [newCounty, setNewCounty] = useState('Denver');
  const [newSource, setNewSource] = useState('Indeed');
  const [newRecruiter, setNewRecruiter] = useState('Alicia T.');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSchedule, setNewSchedule] = useState('35–40 hrs/wk');
  const [newRate, setNewRate] = useState('$22.50/hr');
  const [newNotes, setNewNotes] = useState('');

  // Drag-and-drop state
  const [draggedAppId, setDraggedAppId] = useState<string | null>(null);

  // Filtered applicants
  const filteredApplicants = useMemo(() => {
    return caregiverApplicants.filter((app) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = app.name.toLowerCase().includes(q);
        const matchesRole = app.role.toLowerCase().includes(q);
        const matchesCounty = app.county.toLowerCase().includes(q);
        if (!matchesName && !matchesRole && !matchesCounty) return false;
      }

      // Recruiter filter
      if (recruiterFilter !== 'All Recruiters') {
        if (app.recruiter !== recruiterFilter) return false;
      }

      // Classification filter
      if (classificationFilter !== 'All Classifications') {
        if (app.classificationType !== classificationFilter) return false;
      }

      // Source filter
      if (sourceFilter !== 'All Sources') {
        if (app.source !== sourceFilter) return false;
      }

      return true;
    });
  }, [caregiverApplicants, searchQuery, recruiterFilter, classificationFilter, sourceFilter]);

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

  // Open Add Modal
  const handleOpenAddModal = (stage: CaregiverIntakeStage = 'New Application') => {
    setAddInitialStage(stage);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewNotes('');
    setShowAddModal(true);
  };

  // Submit Add Caregiver Inquiry
  const handleCreateApplicant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      notify('Missing Name', 'Please provide applicant name.', 'warning');
      return;
    }

    const recruiterInitials = newRecruiter
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    addCaregiverApplicant({
      name: newName,
      role: newRole,
      classificationType: newType,
      stage: addInitialStage,
      currentStep: addInitialStage === 'Hired (→ Onboarding)' ? 7 : addInitialStage === 'Offer Extended' ? 5 : addInitialStage === 'Hiring Decision' ? 4 : addInitialStage === 'Interview Scheduled' ? 3 : addInitialStage === 'Phone Screened' ? 2 : 1,
      totalSteps: 7,
      stepLabel: addInitialStage === 'Hired (→ Onboarding)' ? 'Hired to onboarding' : 'Application logged',
      source: newSource,
      county: newCounty,
      recruiter: newRecruiter,
      recruiterInitials,
      daysInStage: 1,
      phone: newPhone || '(303) 555-0199',
      email: newEmail || 'caregiver@example.com',
      targetSchedule: newSchedule,
      targetRate: newRate,
      appliedDate: 'Today',
      notes: newNotes || 'Direct applicant registered from command center.',
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
    return (
      <span className="bg-slate-100 text-slate-700 font-semibold text-xs px-2 py-0.5 rounded-md border border-slate-200/80">
        {role}
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
      {/* 1. TOP HEADER                                                             */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
            Caregiver Intake
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-normal">
            Track caregiver inquiries and applicants from first contact to hiring and onboarding handoff.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleOpenAddModal('New Application')}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Add caregiver inquiry</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. FIVE KPI CARDS (Matches Image 1 & 2)                                   */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-[0_2px_12px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {/* 1. Open applicants */}
          <div className="px-3 py-2 sm:px-4 sm:py-1 rounded-xl hover:bg-slate-50/60 transition-colors">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Open applicants</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                {openApplicantsCount}
              </p>
            </div>
          </div>

          {/* 2. Phone screens */}
          <div className="px-3 py-2 sm:px-4 sm:py-1 rounded-xl hover:bg-slate-50/60 transition-colors">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone screens</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                {phoneScreensCount}
              </p>
            </div>
          </div>

          {/* 3. Interviews booked */}
          <div className="px-3 py-2 sm:px-4 sm:py-1 rounded-xl hover:bg-slate-50/60 transition-colors">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Interviews booked</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                {interviewsBookedCount}
              </p>
            </div>
          </div>

          {/* 4. Hired this month */}
          <div className="px-3 py-2 sm:px-4 sm:py-1 rounded-xl hover:bg-slate-50/60 transition-colors">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hired this month</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-700 shrink-0" />
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                {hiredThisMonthCount}
              </p>
            </div>
          </div>

          {/* 5. Avg days to hire */}
          <div className="px-3 py-2 sm:px-4 sm:py-1 col-span-2 sm:col-span-1 rounded-xl hover:bg-slate-50/60 transition-colors">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg days to hire</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                {avgDaysToHire}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FILTER BAR WITH SEARCH, DROPDOWNS & BOARD / LIST SWITCHER              */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-3.5 shadow-[0_2px_12px_rgba(15,23,42,0.05),0_1px_3px_rgba(15,23,42,0.03)] ring-1 ring-black/[0.02] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Search & Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search applicants */}
          <div className="relative min-w-[210px] flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search applicants..."
              className="w-full pl-8.5 pr-3 py-1.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-[#264e1e]/30 focus:border-[#264e1e] shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
            />
          </div>

          {/* All Recruiters */}
          <div className="relative">
            <select
              value={recruiterFilter}
              onChange={(e) => setRecruiterFilter(e.target.value)}
              className="appearance-none pl-3 pr-7 py-1.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
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
              className="appearance-none pl-3 pr-7 py-1.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
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
              className="appearance-none pl-3 pr-7 py-1.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
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

          {/* More filters */}
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setRecruiterFilter('All Recruiters');
              setClassificationFilter('All Classifications');
              setSourceFilter('All Sources');
              notify('Filters Reset', 'Showing all caregiver applications.', 'info');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer shadow-[0_1px_3px_rgba(15,23,42,0.05)] hover:shadow"
          >
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>More filters</span>
          </button>
        </div>

        {/* Right: Board / List Switcher */}
        <div className="bg-slate-100/90 p-0.5 rounded-xl border border-slate-200/80 shadow-inner flex items-center self-end lg:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('board')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'board'
                ? 'bg-white text-slate-900 shadow-[0_1px_4px_rgba(15,23,42,0.1),0_1px_2px_rgba(15,23,42,0.06)]'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Board
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-slate-900 shadow-[0_1px_4px_rgba(15,23,42,0.1),0_1px_2px_rgba(15,23,42,0.06)]'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN VIEW: BOARD (KANBAN) OR LIST (TABLE)                              */}
      {/* ========================================================================= */}
      {viewMode === 'board' ? (
        /* KANBAN BOARD VIEW */
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3.5 min-w-[1440px] items-start">
            {CAREGIVER_STAGES.map((stage) => {
              const theme = STAGE_THEMES[stage];
              const applicantsInStage = stageGroups[stage] || [];

              return (
                <div
                  key={stage}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage)}
                  className={`flex-1 min-w-[210px] max-w-[240px] rounded-2xl border ${theme.borderColor} ${theme.bgTint} p-3 flex flex-col gap-2.5 transition-all shadow-[0_2px_10px_rgba(15,23,42,0.04),0_1px_2px_rgba(15,23,42,0.02)] ring-1 ring-black/[0.02]`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between px-1 py-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-2 h-2 rounded-full ${theme.dotColor} shrink-0 shadow-2xs`} />
                      <span className="text-[11px] font-black tracking-wider text-slate-800 truncate uppercase">
                        {theme.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${theme.countBg} ${theme.countText} border border-black/[0.04]`}
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
                  <div className="space-y-2.5 min-h-[140px]">
                    {applicantsInStage.map((app) => {
                      const stepPct = Math.round((app.currentStep / app.totalSteps) * 100);

                      return (
                        <div
                          key={app.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, app.id)}
                          onClick={() => {
                            setSelectedApplicant(app);
                            setDetailActiveTab('overview');
                          }}
                          className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.10),0_2px_6px_rgba(15,23,42,0.05)] hover:border-slate-300 transition-all duration-200 cursor-pointer group hover:-translate-y-0.5 active:scale-[0.99] ring-1 ring-black/[0.02]"
                        >
                          {/* Row 1: Name + Role Badge */}
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="text-[13px] font-bold text-slate-900 group-hover:text-[#264e1e] transition-colors truncate">
                              {app.name}
                            </span>
                            {renderRoleBadge(app.role)}
                          </div>

                          {/* Row 2: Subtitle Meta */}
                          <p className="text-[11px] text-slate-400 mt-1 truncate">
                            {app.classificationType} · {app.county} · via {app.source}
                          </p>

                          {/* Row 3: Step & Progress bar */}
                          <div className="mt-2.5">
                            <p className="text-[10px] font-medium text-slate-500 mb-1">
                              Step {app.currentStep} of {app.totalSteps} · {app.stepLabel}
                            </p>
                            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#264e1e] rounded-full transition-all duration-300"
                                style={{ width: `${stepPct}%` }}
                              />
                            </div>
                          </div>

                          {/* Row 4: Footer - Recruiter + CBI pending / Interview Time + Days */}
                          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                                {app.recruiterInitials}
                              </div>
                              <span className="text-slate-600 font-medium truncate">
                                {app.recruiter}
                              </span>

                              {app.cbiPending && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 font-semibold ml-1 shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  <span>CBI pending</span>
                                </span>
                              )}

                              {app.interviewScheduledTime && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-blue-700 font-semibold ml-1 shrink-0">
                                  <Calendar className="w-3 h-3 text-blue-600" />
                                  <span>{app.interviewScheduledTime}</span>
                                </span>
                              )}
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
                    className="w-full py-1.5 px-2 rounded-xl border border-dashed border-slate-300 hover:border-slate-400 hover:bg-white/90 text-slate-500 hover:text-slate-800 text-[11px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer mt-1 bg-white/40 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add applicant</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* LIST / TABLE VIEW (Matches Image 2) */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.08),0_1px_3px_rgba(15,23,42,0.04)] ring-1 ring-black/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/90 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
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
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
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
                          className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200/90 rounded-lg text-xs font-semibold text-slate-700 transition-all shadow-[0_1px_2px_rgba(15,23,42,0.05)] hover:shadow cursor-pointer"
                        >
                          Open
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

          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 z-10 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-98 duration-150">
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

                <button
                  type="button"
                  onClick={() => setSelectedApplicant(null)}
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
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
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>Mark complete</span>
                    <span>✓</span>
                  </button>
                </div>

                {/* 7 Horizontal Stepper Bars */}
                <div className="grid grid-cols-7 gap-1.5">
                  {HIRING_STEPS_LABELS.map((stepLabel, idx) => {
                    const stepNum = idx + 1;
                    const isCompleted = currentApplicant.currentStep >= stepNum;
                    const isCurrent = currentApplicant.currentStep === stepNum;

                    return (
                      <div key={stepNum} className="space-y-1">
                        <div
                          className={`h-1 rounded-full transition-all duration-300 ${
                            isCompleted ? 'bg-[#264e1e]' : 'bg-slate-200'
                          }`}
                        />
                        <p
                          className={`text-[10px] truncate ${
                            isCurrent
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
                className={`py-3 transition-colors border-b-2 cursor-pointer ${
                  detailActiveTab === 'overview'
                    ? 'border-[#264e1e] text-[#264e1e] font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setDetailActiveTab('credentials')}
                className={`py-3 transition-colors border-b-2 cursor-pointer ${
                  detailActiveTab === 'credentials'
                    ? 'border-[#264e1e] text-[#264e1e] font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Experience &amp; Credentials
              </button>
              <button
                type="button"
                onClick={() => setDetailActiveTab('compensation')}
                className={`py-3 transition-colors border-b-2 cursor-pointer ${
                  detailActiveTab === 'compensation'
                    ? 'border-[#264e1e] text-[#264e1e] font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Compensation &amp; Packet
              </button>
              <button
                type="button"
                onClick={() => setDetailActiveTab('communication')}
                className={`py-3 transition-colors border-b-2 cursor-pointer ${
                  detailActiveTab === 'communication'
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
      {/* 7. MODAL: + ADD CAREGIVER INQUIRY                                         */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowAddModal(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  New Caregiver Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Record an inbound caregiver application, job fair candidate or phone inquiry.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateApplicant} className="space-y-4 pt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1 space-y-1">
                  <label className="font-bold text-slate-700">Applicant Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Taylor Miller"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1.5 focus:ring-[#264e1e]/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Role Applied For</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="CNA">CNA</option>
                    <option value="IHSS">IHSS</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="SCC">SCC</option>
                    <option value="HMA">HMA</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Phone</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="(303) 555-0199"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Email</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="caregiver@email.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Classification</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="Employee">Employee (W-2)</option>
                    <option value="1099">1099 Contractor</option>
                    <option value="Both">Both (Employee + Contractor)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">County</label>
                  <select
                    value={newCounty}
                    onChange={(e) => setNewCounty(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="Denver">Denver</option>
                    <option value="Arapahoe">Arapahoe</option>
                    <option value="Jefferson">Jefferson</option>
                    <option value="Douglas">Douglas</option>
                    <option value="Boulder">Boulder</option>
                    <option value="Adams">Adams</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Source</label>
                  <select
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="Indeed">Indeed</option>
                    <option value="Referral">Referral</option>
                    <option value="Website">Website</option>
                    <option value="Job Fair">Job Fair</option>
                    <option value="Phone Call">Phone Call</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Assigned Recruiter</label>
                  <select
                    value={newRecruiter}
                    onChange={(e) => setNewRecruiter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="Alicia T.">Alicia T.</option>
                    <option value="Maya R.">Maya R.</option>
                    <option value="Jon P.">Jon P.</option>
                    <option value="Sam K.">Sam K.</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Target Schedule</label>
                  <input
                    type="text"
                    value={newSchedule}
                    onChange={(e) => setNewSchedule(e.target.value)}
                    placeholder="35–40 hrs/wk"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Target Rate</label>
                  <input
                    type="text"
                    value={newRate}
                    onChange={(e) => setNewRate(e.target.value)}
                    placeholder="$22.50/hr"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Recruiter Notes</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Experience summary, preferred shift availability..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl font-bold shadow-xs"
                >
                  Create Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

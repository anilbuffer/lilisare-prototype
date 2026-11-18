'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { RegistrationApplication, StepReviewStatus, ApplicationConfirmationStatus } from '@/lib/types';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  FileText,
  UserCheck,
  Check,
  X,
  AlertCircle,
  Eye,
  HeartHandshake,
  User,
  Users,
  ChevronRight,
  Calendar,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Sparkles,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react';

interface AgencyApprovalsCenterProps {
  initialSelectedId?: string;
  defaultTypeFilter?: 'All' | 'Caregiver' | 'Patient';
  title?: string;
}

export function AgencyApprovalsCenter({
  initialSelectedId,
  defaultTypeFilter = 'All',
  title,
}: AgencyApprovalsCenterProps) {
  const {
    applications,
    updateApplicationStepStatus,
    approveApplication,
    declineApplication,
    reopenApplication,
    notify,
  } = usePortal();

  const [typeFilter, setTypeFilter] = useState<'All' | 'Caregiver' | 'Patient'>(defaultTypeFilter);
  const [statusFilter, setStatusFilter] = useState<'All' | ApplicationConfirmationStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected application for detail audit modal
  const [selectedAppId, setSelectedAppId] = useState<string | null>(
    initialSelectedId || applications[0]?.id || null
  );

  // Rejection modal state
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [adminDecisionNote, setAdminDecisionNote] = useState('');

  // Flag step note modal state
  const [flaggingStepId, setFlaggingStepId] = useState<string | null>(null);
  const [flagNote, setFlagNote] = useState('');

  // Selected application object
  const activeApp = applications.find((a) => a.id === selectedAppId) || null;

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesType = typeFilter === 'All' || app.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.linkedEntityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.serviceOrClassification.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  // KPI counts
  const totalCount = applications.length;
  const pendingCount = applications.filter((a) => a.status === 'Pending Review').length;
  const inVerificationCount = applications.filter((a) => a.status === 'In Verification').length;
  const approvedCount = applications.filter((a) => a.status === 'Approved').length;
  const declinedCount = applications.filter((a) => a.status === 'Declined').length;

  const handleOpenDecline = () => {
    setDeclineReason('');
    setIsDeclineModalOpen(true);
  };

  const handleConfirmDecline = () => {
    if (!activeApp) return;
    if (!declineReason.trim()) {
      notify('Reason Required', 'Please specify a reason for declining or requesting revisions.', 'error');
      return;
    }
    declineApplication(activeApp.id, declineReason);
    setIsDeclineModalOpen(false);
  };

  const handleApprove = () => {
    if (!activeApp) return;
    approveApplication(activeApp.id, adminDecisionNote || undefined);
    setAdminDecisionNote('');
  };

  const handleFlagStep = (stepId: string) => {
    setFlaggingStepId(stepId);
    setFlagNote('');
  };

  const handleConfirmFlagStep = () => {
    if (!activeApp || !flaggingStepId) return;
    updateApplicationStepStatus(activeApp.id, flaggingStepId, 'Flagged', flagNote || 'Requires clarification by applicant');
    setFlaggingStepId(null);
    setFlagNote('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Verification Command Center */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold text-secondary-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            Agency Admin Verification &amp; Approval Gateway • Colorado Home Health
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {title || 'Registration Approvals & Step Verification'}
          </h1>
          <p className="text-slate-200 text-sm mt-2 leading-relaxed">
            Review incoming Caregiver and Patient intake applications. Verify identity, documents, Colorado CBI background clearances, and Medicaid waiver authorizations before granting active status.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mt-6 pt-6 border-t border-white/15">
            <div>
              <p className="text-[11px] text-slate-300 font-medium uppercase tracking-wider">Total Inbound</p>
              <p className="text-2xl font-black text-white mt-0.5">{totalCount}</p>
            </div>
            <div>
              <p className="text-[11px] text-amber-300 font-medium uppercase tracking-wider">Pending Review</p>
              <p className="text-2xl font-black text-[#F2B632] mt-0.5">{pendingCount}</p>
            </div>
            <div>
              <p className="text-[11px] text-sky-300 font-medium uppercase tracking-wider">In Verification</p>
              <p className="text-2xl font-black text-sky-300 mt-0.5">{inVerificationCount}</p>
            </div>
            <div>
              <p className="text-[11px] text-emerald-300 font-medium uppercase tracking-wider">Approved &amp; Active</p>
              <p className="text-2xl font-black text-emerald-400 mt-0.5">{approvedCount}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[11px] text-rose-300 font-medium uppercase tracking-wider">Action / Declined</p>
              <p className="text-2xl font-black text-rose-400 mt-0.5">{declinedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Applications Queue (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col h-[480px] sm:h-[580px] lg:h-[750px]">
          {/* Header & Count */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Incoming Applications Queue</h2>
              <p className="text-xs text-slate-500">Caregivers &amp; Patients awaiting agency verification</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {filteredApps.length} Shown
            </span>
          </div>

          {/* Search Bar */}
          <div className="mt-3 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID (APP-...), city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary bg-slate-50/50"
            />
          </div>

          {/* Filter Pills */}
          <div className="mt-2.5 space-y-2 pb-2 border-b border-slate-100">
            {/* Type Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider w-10 shrink-0">Role:</span>
              <button
                onClick={() => setTypeFilter('All')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${typeFilter === 'All' ? 'bg-primary text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setTypeFilter('Caregiver')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${typeFilter === 'Caregiver' ? 'bg-primary text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                <HeartHandshake className="w-3 h-3" />
                Caregivers
              </button>
              <button
                onClick={() => setTypeFilter('Patient')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${typeFilter === 'Patient' ? 'bg-primary text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                <User className="w-3 h-3" />
                Patients
              </button>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider w-10 shrink-0">Status:</span>
              {(['All', 'Pending Review', 'In Verification', 'Approved', 'Declined'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${statusFilter === st
                    ? 'bg-slate-800 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* List of Applications */}
          <div className="flex-1 overflow-y-auto space-y-2 mt-3 pr-1">
            {filteredApps.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No registration applications found matching current criteria.
              </div>
            ) : (
              filteredApps.map((app) => {
                const isSelected = activeApp?.id === app.id;
                const verifiedStepsCount = app.steps.filter((s) => s.status === 'Verified').length;
                const totalStepsCount = app.steps.length;
                const progressPercent = Math.round((verifiedStepsCount / totalStepsCount) * 100);

                let badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
                if (app.status === 'Approved') badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                if (app.status === 'Declined') badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
                if (app.status === 'In Verification') badgeColor = 'bg-sky-100 text-sky-800 border-sky-200';

                return (
                  <div
                    key={app.id}
                    onClick={() => {
                      setSelectedAppId(app.id);
                      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                        document.getElementById('verification-audit-panel')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${isSelected
                      ? 'border-primary bg-primary-50/50 shadow-sm ring-1 ring-primary/30'
                      : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/70'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${app.type === 'Caregiver' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                            }`}
                        >
                          {app.type === 'Caregiver' ? <HeartHandshake className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-slate-900">{app.fullName}</h4>
                            <span className="text-[10px] font-medium text-slate-400">
                              {app.applicationNumber}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[200px]">
                            {app.serviceOrClassification}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${badgeColor}`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="truncate max-w-[170px]">
                        Linked: <strong>{app.linkedEntityName}</strong>
                      </span>
                      <span>{app.city}, CO</span>
                    </div>

                    {/* Step verification progress bar */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${app.status === 'Approved'
                            ? 'bg-emerald-500'
                            : app.status === 'Declined'
                              ? 'bg-rose-500'
                              : 'bg-primary'
                            }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 shrink-0">
                        {verifiedStepsCount}/{totalStepsCount} Steps
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Step-by-Step Verification Audit Inspector (7 Cols) */}
        <div id="verification-audit-panel" className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 space-y-6">
          {activeApp ? (
            <>
              {/* Applicant Header Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${activeApp.type === 'Caregiver'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-sky-600 text-white shadow-sm'
                      }`}
                  >
                    {activeApp.type === 'Caregiver' ? (
                      <HeartHandshake className="w-6 h-6" />
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900">{activeApp.fullName}</h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                        {activeApp.applicationNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${activeApp.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : activeApp.status === 'Declined'
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : activeApp.status === 'In Verification'
                              ? 'bg-sky-100 text-sky-800 border-sky-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                      >
                        ● {activeApp.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1">
                      {activeApp.type} Application • <span className="font-semibold text-slate-800">{activeApp.serviceOrClassification}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {activeApp.address}, {activeApp.city}, {activeApp.state} {activeApp.zip}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {activeApp.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Submitted: {activeApp.submittedAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs shrink-0 pl-3 sm:border-l border-slate-200/80">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Linked Entity</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">{activeApp.linkedEntityName}</span>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Verification Engine: Active
                  </span>
                </div>
              </div>

              {/* Status Outcome Banner if already Approved or Declined */}
              {activeApp.status === 'Approved' && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-emerald-900">Application Verified &amp; Approved</h4>
                      <p className="text-emerald-700 mt-0.5">
                        Reviewed by <strong>{activeApp.reviewedBy || 'Danielle M. (Agency Intake Director)'}</strong> on {activeApp.reviewedAt || 'Today'}.
                      </p>
                      {activeApp.decisionReason && (
                        <p className="mt-1 text-emerald-800 font-medium italic">
                          &ldquo;{activeApp.decisionReason}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => reopenApplication(activeApp.id)}
                    className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-white hover:bg-emerald-100 text-emerald-800 font-semibold text-[11px] transition-colors shrink-0 cursor-pointer"
                  >
                    Reopen Review
                  </button>
                </div>
              )}

              {activeApp.status === 'Declined' && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-rose-900">Application Declined / Action Required</h4>
                      <p className="text-rose-700 mt-0.5">
                        Logged by <strong>{activeApp.reviewedBy || 'Danielle M. (Agency Intake Director)'}</strong> on {activeApp.reviewedAt || 'Today'}.
                      </p>
                      {activeApp.decisionReason && (
                        <div className="mt-2 p-2 rounded-lg bg-white/70 border border-rose-200 text-rose-800 font-medium">
                          <strong>Reason:</strong> {activeApp.decisionReason}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => reopenApplication(activeApp.id)}
                    className="px-3 py-1.5 rounded-lg border border-rose-300 bg-white hover:bg-rose-100 text-rose-800 font-semibold text-[11px] transition-colors shrink-0 cursor-pointer"
                  >
                    Re-evaluate
                  </button>
                </div>
              )}

              {/* Step-by-Step Inspection Checklist */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      Step-by-Step Verification Audit Checklist
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Admin must inspect each registration section. Mark items Verified or Flag for applicant clarification.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-primary">
                    {activeApp.steps.filter((s) => s.status === 'Verified').length} / {activeApp.steps.length} Cleared
                  </span>
                </div>

                <div className="space-y-3">
                  {activeApp.steps.map((st, index) => {
                    const isVerified = st.status === 'Verified';
                    const isFlagged = st.status === 'Flagged';

                    return (
                      <div
                        key={st.id}
                        className={`p-4 rounded-xl border transition-all ${isVerified
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : isFlagged
                            ? 'bg-amber-50/50 border-amber-200 ring-1 ring-amber-300/40'
                            : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                          }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${isVerified
                                ? 'bg-emerald-600 text-white'
                                : isFlagged
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-slate-200 text-slate-600'
                                }`}
                            >
                              {isVerified ? <Check className="w-3.5 h-3.5" /> : isFlagged ? '!' : index + 1}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-slate-900">{st.name}</h4>
                                <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-slate-200/70 text-slate-600">
                                  {st.category}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{st.details}</p>

                              {st.notes && (
                                <p className="text-[11px] text-amber-800 font-medium mt-1 bg-amber-100/70 px-2.5 py-1 rounded-md border border-amber-200/60 inline-block">
                                  Flag Note: {st.notes}
                                </p>
                              )}

                              {isVerified && st.verifiedBy && (
                                <p className="text-[10px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  Verified by {st.verifiedBy} ({st.verifiedAt || 'Recorded'})
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Step Action Buttons */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            {!isVerified && (
                              <button
                                type="button"
                                onClick={() => updateApplicationStepStatus(activeApp.id, st.id, 'Verified')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-all shadow-2xs active:scale-[0.98] flex items-center gap-1 cursor-pointer"
                              >
                                <Check className="w-3 h-3" />
                                <span>Verify</span>
                              </button>
                            )}

                            {!isFlagged && (
                              <button
                                type="button"
                                onClick={() => handleFlagStep(st.id)}
                                className="px-2.5 py-1 rounded-lg border border-amber-300 bg-white hover:bg-amber-50 text-amber-700 text-[11px] font-semibold transition-all cursor-pointer"
                              >
                                Flag
                              </button>
                            )}

                            {(isVerified || isFlagged) && (
                              <button
                                type="button"
                                onClick={() => updateApplicationStepStatus(activeApp.id, st.id, 'Pending')}
                                className="px-2 py-1 rounded-lg text-slate-400 hover:text-slate-600 text-[10px] font-medium transition-colors cursor-pointer"
                                title="Reset step to Pending"
                              >
                                Reset
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Agency Decision Section */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Agency Final Adjudication
                    </h4>
                    <p className="text-xs text-slate-500">
                      Grant active credentialing or decline with corrective notice
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">
                    Officer: Danielle M.
                  </span>
                </div>

                {activeApp.status !== 'Approved' && activeApp.status !== 'Declined' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Adjudication Notes / Audit Approval Memo (Optional):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. All CBI checks verified with state portal. Active PAR confirmed with RMHS."
                      value={adminDecisionNote}
                      onChange={(e) => setAdminDecisionNote(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-200/80">
                  <button
                    type="button"
                    onClick={handleOpenDecline}
                    className="px-4 py-2.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-700 text-xs font-bold transition-all shadow-2xs active:scale-[0.98] flex items-center gap-1.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Decline / Request Fix</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleApprove}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold transition-all shadow-[0_3px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_18px_rgba(16,185,129,0.4)] active:scale-[0.98] flex items-center gap-2 cursor-pointer ml-auto"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Approve &amp; Activate {activeApp.type}</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500">
              Select an application from the queue to audit verification steps.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Decline / Request Fix Reason */}
      {isDeclineModalOpen && activeApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertCircle className="w-5 h-5" />
                <h3 className="text-sm font-bold text-slate-900">Decline / Request Corrections</h3>
              </div>
              <button
                onClick={() => setIsDeclineModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Please enter the official reason for declining or returning <strong>{activeApp.fullName}</strong>&apos;s application. This will be recorded on their confirmation record and visible to staff.
            </p>

            {/* Quick Reason Suggestions */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Quick Colorado Compliance Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Blurry Colorado Driver License photo',
                  'Missing Form I-9 signature',
                  'CBI fingerprint match requires clarification',
                  'Medicaid Health First ID unverified with HCPF',
                  'MVR driving record suspension',
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDeclineReason(preset)}
                    className="text-[10px] font-medium px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-left"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Decline Notice:
              </label>
              <textarea
                rows={3}
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Describe what documentation or clarification is required from the applicant..."
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsDeclineModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDecline}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Flag Specific Step */}
      {flaggingStepId && activeApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle className="w-5 h-5" />
                <h3 className="text-sm font-bold text-slate-900">Flag Verification Step</h3>
              </div>
              <button
                onClick={() => setFlaggingStepId(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Add a flag note explaining what needs revision on this step.
            </p>

            <div>
              <input
                type="text"
                value={flagNote}
                onChange={(e) => setFlagNote(e.target.value)}
                placeholder="e.g. Upload higher resolution image of license"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setFlaggingStepId(null)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmFlagStep}
                className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Save Flag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

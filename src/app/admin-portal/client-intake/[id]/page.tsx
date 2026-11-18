'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { usePortal } from '@/lib/store/portal-context';
import { LeadStatus, ServiceType, Lead } from '@/lib/types';
import { TopUtilityBar } from '@/components/dashboard/TopUtilityBar';
import { INTAKE_STAGES } from '@/components/portals/ClientIntakePortal';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  Building2,
  Calendar,
  User,
  ShieldCheck,
  FileText,
  Check,
  Plus,
  Send,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

const INTAKE_STEPS = [
  { step: 1, title: 'Inquiry Logged', desc: 'Contact details, household demographics and source recorded.' },
  { step: 2, title: 'Family Contacted', desc: 'Initial telephone intake consultation conducted with family.' },
  { step: 3, title: 'Needs Assessed', desc: 'Clinical care hours, waiver program, and scheduling needs identified.' },
  { step: 4, title: 'Case Manager Linked', desc: 'Case Management Agency coordinator connected for state authorization.' },
  { step: 5, title: 'Medicaid Waiver Review', desc: 'Prior Authorization Request (PAR) and physician orders submitted.' },
  { step: 6, title: 'Family Agreement', desc: 'Mutual service agreements and family caregiver designations e-signed.' },
  { step: 7, title: 'Service Converted', desc: 'Authorized care plan activated, caregiver provisioned for EVV.' },
];

export default function ClientIntakeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { leads, updateLeadStatus, updateLead, notify } = usePortal();

  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string) || '';

  // Lookup lead by id or fallback to first lead
  const lead: Lead | undefined = useMemo(() => {
    return leads.find((l) => l.id === id) || leads[0];
  }, [leads, id]);

  const [activeTab, setActiveTab] = useState<'overview' | 'assessment' | 'medicaid' | 'communication'>('overview');
  const [newNoteText, setNewNoteText] = useState('');
  const [activityNotes, setActivityNotes] = useState<
    Array<{ id: string; date: string; author: string; text: string }>
  >([
    {
      id: 'note-1',
      date: 'Today at 10:15 AM',
      author: 'Maya R.',
      text: 'Conducted initial phone consultation with primary contact. Family confirmed eligibility under Colorado Medicaid HCBS waiver.',
    },
    {
      id: 'note-2',
      date: 'Yesterday at 3:40 PM',
      author: 'Jon P.',
      text: 'Inquiry intake details confirmed. Packet dispatched via secure electronic portal.',
    },
  ]);

  if (!lead) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-500 text-sm">Client intake record not found.</p>
        <Link
          href="/admin-portal/client-intake"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#264e1e] text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Client Intake</span>
        </Link>
      </div>
    );
  }

  const currentStep = lead.intakeStepsCompleted || 1;

  const handleAdvanceStep = () => {
    if (currentStep < 7) {
      const nextStep = currentStep + 1;
      let nextStage: LeadStatus = lead.status;
      if (nextStep === 2) nextStage = 'Contacted';
      if (nextStep === 3) nextStage = 'Needs Discussion';
      if (nextStep === 4) nextStage = 'Case Manager Coordination';
      if (nextStep === 6) nextStage = 'Family Decision';
      if (nextStep === 7) nextStage = 'Converted';

      updateLead(lead.id, {
        intakeStepsCompleted: nextStep,
        status: nextStage,
      });
      notify('Roadmap Advanced', `${lead.clientName} advanced to Step ${nextStep}: ${INTAKE_STEPS[nextStep - 1].title}`, 'success');
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    setActivityNotes([
      {
        id: `note-${Date.now()}`,
        date: 'Just now',
        author: 'Current User',
        text: newNoteText.trim(),
      },
      ...activityNotes,
    ]);
    setNewNoteText('');
    notify('Note Logged', 'Case activity updated successfully.', 'success');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Shared Dashboard Fixed Header */}
      <TopUtilityBar
        title="Client Intake Record"
        subtitle={`Viewing full case file for ${lead.clientName}`}
        actionButton={
          <Link
            href="/admin-portal/client-intake"
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 rounded-full text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Intake Pipeline</span>
          </Link>
        }
      />

      {/* 2. Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {lead.clientName}
              </h1>
              <span className="bg-blue-100 text-blue-700 font-black text-xs px-2.5 py-0.5 rounded-full">
                CLIENT
              </span>
              <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-2.5 py-0.5 rounded-full uppercase">
                {lead.requestedService}
              </span>
              {lead.isOverdue && (
                <span className="bg-rose-100 text-rose-700 font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Follow-up Overdue</span>
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Source: <strong className="text-slate-700 font-semibold">{lead.sourceCategory || lead.inquirySource}</strong> · Referral: {lead.referralAgency || 'Direct'} · Assigned Owner: <strong className="text-slate-800">{lead.ownerName || lead.assignedStaff}</strong> · Registered: {lead.createdAt || 'Nov 16, 2026'}
            </p>
          </div>

          {/* Stage Selector & Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1.5">
              <span className="text-xs font-bold text-slate-600 uppercase">Stage:</span>
              <select
                value={lead.status}
                onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                className="bg-transparent font-bold text-xs text-[#264e1e] cursor-pointer focus:outline-none"
              >
                {INTAKE_STAGES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                updateLeadStatus(lead.id, 'Converted');
                updateLead(lead.id, { intakeStepsCompleted: 7 });
                notify('Client Converted', `${lead.clientName} is now converted into active care!`, 'success');
              }}
              className="px-4 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Convert to Active Client
            </button>
          </div>
        </div>

        {/* 7-Step Intake Roadmap */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#264e1e]" />
              <span>Client Intake Roadmap: Step {currentStep} of 7 ({INTAKE_STEPS[currentStep - 1]?.title})</span>
            </span>

            {currentStep < 7 && (
              <button
                type="button"
                onClick={handleAdvanceStep}
                className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#166534] border border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Advance step</span>
                <span>✓</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {INTAKE_STEPS.map((s) => {
              const isDone = currentStep >= s.step;
              const isCurrent = currentStep === s.step;

              return (
                <div key={s.step} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isDone ? 'bg-[#264e1e]' : 'bg-slate-200'
                    }`}
                  />
                  <p
                    className={`text-[10px] truncate ${
                      isCurrent
                        ? 'font-bold text-[#264e1e]'
                        : isDone
                        ? 'text-slate-700 font-semibold'
                        : 'text-slate-400'
                    }`}
                    title={`Step ${s.step}: ${s.title}`}
                  >
                    {s.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Multi-Tab Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="flex items-center border-b border-slate-200 px-6 gap-6 text-xs font-semibold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#264e1e] text-[#264e1e] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Client &amp; Contact Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('assessment')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'assessment'
                ? 'border-[#264e1e] text-[#264e1e] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Clinical Care &amp; Assessment
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('medicaid')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'medicaid'
                ? 'border-[#264e1e] text-[#264e1e] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Medicaid &amp; State Authorizations
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('communication')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'communication'
                ? 'border-[#264e1e] text-[#264e1e] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Communication &amp; Case Log ({activityNotes.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Client Demographics */}
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <User className="w-4 h-4 text-[#264e1e]" />
                  <span>Client Demographics</span>
                </h3>
                <div className="space-y-2 text-slate-600">
                  <p>
                    <strong className="text-slate-800">Full Name:</strong> {lead.clientName}
                  </p>
                  <p>
                    <strong className="text-slate-800">Date of Birth:</strong> {lead.dateOfBirth || '2016-01-01'}
                  </p>
                  <p>
                    <strong className="text-slate-800">County:</strong> Denver Metro / Jefferson
                  </p>
                  <p>
                    <strong className="text-slate-800">Program:</strong> {lead.requestedService} (Family Caregiver Waiver)
                  </p>
                </div>
              </div>

              {/* Primary Contact */}
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#264e1e]" />
                  <span>Primary Family Contact</span>
                </h3>
                <div className="space-y-2 text-slate-600">
                  <p>
                    <strong className="text-slate-800">Contact Name:</strong> {lead.primaryContactName}
                  </p>
                  <p>
                    <strong className="text-slate-800">Relationship:</strong> {lead.relationship || 'Parent / Guardian'}
                  </p>
                  <p>
                    <strong className="text-slate-800">Primary Phone:</strong> {lead.phone}
                  </p>
                  <p>
                    <strong className="text-slate-800">Email Address:</strong> {lead.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assessment' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-2">
                <h3 className="text-sm font-bold text-slate-900">Clinical Assessment Summary</h3>
                <p className="text-slate-600 leading-relaxed">
                  Client requires attendant care services including personal care support, homemaker assistance, and healthcare maintenance tasks under Colorado HCPF Medicaid guidelines. Family member has designated intent to serve as primary paid caregiver.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'medicaid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#264e1e]" />
                  <span>Case Management Agency</span>
                </h3>
                <p className="text-slate-600"><strong className="text-slate-800">Agency:</strong> {lead.referralAgency || 'Rocky Mountain Human Services'}</p>
                <p className="text-slate-600"><strong className="text-slate-800">Coordinator:</strong> {lead.caseManagerName || 'State Case Coordinator'}</p>
                <p className="text-slate-600"><strong className="text-slate-800">Email:</strong> {lead.caseManagerEmail || 'coordinator@rmhs.org'}</p>
              </div>

              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#264e1e]" />
                  <span>PAR &amp; Prior Authorization</span>
                </h3>
                <p className="text-slate-600"><strong className="text-slate-800">State PAR Status:</strong> Under Review (10-Day SLA)</p>
                <p className="text-slate-600"><strong className="text-slate-800">Physician Attestation:</strong> Received &amp; Signed</p>
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-6">
              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-3">
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Log a new consultation note, phone record, or family follow-up..."
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#264e1e] min-h-[90px]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Case Note</span>
                </button>
              </form>

              {/* Activity Log */}
              <div className="space-y-3">
                {activityNotes.map((note) => (
                  <div key={note.id} className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-800">{note.author}</span>
                      <span className="text-slate-400 font-mono">{note.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

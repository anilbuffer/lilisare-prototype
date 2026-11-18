'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { usePortal } from '@/lib/store/portal-context';
import { LeadStatus, ServiceType, Lead } from '@/lib/types';
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
  Award,
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

const getLeadCounty = (lead: Lead): string => {
  if ((lead as any).county) return (lead as any).county;
  if (lead.referralAgency?.includes('Rocky Mountain') || lead.referralAgency?.includes('RMHS')) return 'Denver';
  if (lead.referralAgency?.includes('Developmental Pathways')) return 'Arapahoe';
  if (lead.referralAgency?.includes('Imagine')) return 'Boulder';
  if (lead.referralAgency?.includes('North Metro')) return 'Adams';
  if (lead.referralAgency?.includes('Continuum')) return 'Jefferson';
  return 'Denver';
};

export default function ClientIntakeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { leads, updateLeadStatus, updateLead, notify } = usePortal();

  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string) || '';

  // Lookup lead by id or fallback to first lead
  const lead: Lead | undefined = useMemo(() => {
    return leads.find((l) => l.id === id) || leads[0];
  }, [leads, id]);

  const [activeTab, setActiveTab] = useState<'overview' | 'clinical' | 'authorizations' | 'communication'>('overview');
  const [newNoteText, setNewNoteText] = useState('');
  const [messages, setMessages] = useState<
    Array<{ id: string; date: string; sender: string; type: string; text: string }>
  >([
    {
      id: 'msg-1',
      date: 'Nov 16, 2:15 PM',
      sender: 'Maya R. (Intake Coordinator)',
      type: 'SMS',
      text: 'Hello, thank you for contacting LiliSare Home Health. We received your inquiry regarding pediatric care. Would you be free for a 10-minute intake consultation this week?',
    },
    {
      id: 'msg-2',
      date: 'Nov 16, 2:38 PM',
      sender: 'Family Primary Contact',
      type: 'SMS',
      text: 'Thank you! Yes, we have our CMA care plan ready from Rocky Mountain Human Services. We are eager to start as family caregivers. Thursday morning works great.',
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
  const leadCounty = getLeadCounty(lead);

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    setMessages([
      ...messages,
      {
        id: `msg-${Date.now()}`,
        date: 'Just now',
        sender: `${lead.ownerName || lead.assignedStaff} (Staff)`,
        type: 'SMS',
        text: newNoteText.trim(),
      },
    ]);
    setNewNoteText('');
    notify('Message Sent', `SMS dispatched to ${lead.primaryContactName} (${lead.phone}).`, 'info');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Back Navigation Row */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin-portal/client-intake"
          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 rounded-full text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>&larr; Back to Client Intake</span>
        </Link>
      </div>

      {/* 2. Top Header Card (Matches Caregiver Intake Detail Page Header) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {lead.clientName}
              </h1>
              <span className="bg-slate-100 text-slate-700 font-semibold text-xs px-2.5 py-0.5 rounded-full border border-slate-200">
                {lead.requestedService} · Medicaid HCBS Waiver
              </span>
              {lead.isOverdue && (
                <span className="bg-rose-100 text-rose-800 font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span>Follow-up Overdue</span>
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Primary Contact: <strong className="text-slate-700 font-semibold">{lead.primaryContactName} ({lead.relationship})</strong> · County: <strong className="text-slate-700 font-semibold">{leadCounty}</strong> · Source: {lead.sourceCategory || lead.inquirySource} · Owner: <strong className="text-slate-800">{lead.ownerName || lead.assignedStaff}</strong> · <strong className="text-slate-900 font-black">CMA: {lead.referralAgency}</strong>
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
                notify('Consultation Logged', `Phone intake call record created for ${lead.clientName}.`, 'info');
              }}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs cursor-pointer transition-all"
            >
              Log consultation
            </button>

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
              <span>INTAKE STEPPER: STEP {currentStep} OF 7 ({INTAKE_STEPS[currentStep - 1]?.title})</span>
            </span>

            {currentStep < 7 && (
              <button
                type="button"
                onClick={handleAdvanceStep}
                className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#166534] border border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Mark complete</span>
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

      {/* 3. Multi-Tab Navigation (Matching Caregiver Intake Detail Page Tabs) */}
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
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('clinical')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'clinical'
                ? 'border-[#264e1e] text-[#264e1e] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Needs &amp; Care Plan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('authorizations')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'authorizations'
                ? 'border-[#264e1e] text-[#264e1e] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Authorization &amp; CMA
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
            Communication ({messages.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Demographics Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Client &amp; Family Demographics
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      PRIMARY CONTACT:
                    </span>
                    <span className="text-slate-800 font-semibold mt-0.5 block">
                      {lead.primaryContactName} ({lead.relationship})
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      PRIMARY TELEPHONE:
                    </span>
                    <span className="text-slate-800 font-semibold mt-0.5 block">
                      {lead.phone}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      EMAIL ADDRESS:
                    </span>
                    <span className="text-slate-800 font-semibold mt-0.5 block">
                      {lead.email}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      COUNTY / LOCATION:
                    </span>
                    <span className="text-slate-800 font-semibold mt-0.5 block">
                      {leadCounty} County, CO
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      DATE OF BIRTH:
                    </span>
                    <span className="text-slate-800 font-semibold mt-0.5 block">
                      {lead.dateOfBirth}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      TARGET SERVICE SCHEDULE:
                    </span>
                    <span className="text-slate-800 font-semibold mt-0.5 block">
                      30–35 hrs/wk (Family Caregiver Model)
                    </span>
                  </div>
                </div>
              </div>

              {/* Staff Notes Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Intake Staff &amp; Case Notes
                </h3>

                <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 text-xs text-slate-700 leading-relaxed font-medium">
                  {lead.notes || 'Inquiry registered from administrative command center. Case coordinator assigned to verify waiver program.'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clinical' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#264e1e]" />
                  <span>Clinical Care Needs &amp; ADL Allocation</span>
                </h3>
                <div className="space-y-2 text-slate-700">
                  <p><strong className="text-slate-900">Personal Care:</strong> Assistance with bathing, grooming, and transfers</p>
                  <p><strong className="text-slate-900">Health Maintenance Activities (HMA):</strong> Nurse delegated medication setup</p>
                  <p><strong className="text-slate-900">Homemaker Support:</strong> Special meal prep, medical laundry, sanitation</p>
                  <p><strong className="text-slate-900">Protective Oversight:</strong> 24/7 designated family supervision</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'authorizations' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#264e1e]" />
                  <span>Case Management Agency (CMA) Coordinates</span>
                </h3>
                <div className="space-y-2 text-slate-700">
                  <p><strong className="text-slate-900">Agency:</strong> {lead.referralAgency}</p>
                  <p><strong className="text-slate-900">Coordinator:</strong> {lead.caseManagerName} ({lead.caseManagerPhone} • {lead.caseManagerEmail})</p>
                  <p><strong className="text-slate-900">PAR Status:</strong> Prior Authorization Request submitted to State of Colorado</p>
                  <p><strong className="text-slate-900">Medicaid Benefit:</strong> Health First Colorado (Medicaid HCBS Waiver Active)</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-6">
              {/* Message History */}
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-800">{m.sender} <span className="text-[10px] text-slate-400 font-mono font-normal">({m.type})</span></span>
                      <span className="text-slate-400 font-mono">{m.date}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>

              {/* Send Quick Reply */}
              <form onSubmit={handleSendMessage} className="space-y-3">
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder={`Dispatch SMS or email update to ${lead.primaryContactName}...`}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#264e1e] min-h-[90px]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

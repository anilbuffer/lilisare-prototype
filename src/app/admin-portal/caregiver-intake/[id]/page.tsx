'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { usePortal } from '@/lib/store/portal-context';
import { CaregiverApplicant, CaregiverIntakeStage } from '@/lib/types';
import { TopUtilityBar } from '@/components/dashboard/TopUtilityBar';
import { CAREGIVER_STAGES } from '@/components/portals/CaregiverIntakePortal';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  User,
  ShieldCheck,
  FileText,
  Check,
  Plus,
  Send,
  Sparkles,
  ChevronRight,
  Award,
  DollarSign,
  MessageSquare,
} from 'lucide-react';

const HIRING_STEPS_LABELS = [
  'Application logged',
  'Phone screened',
  'Interview conducted',
  'References verified',
  'Offer extended',
  'Offer accepted',
  'Hired to onboarding',
];

export default function CaregiverIntakeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const {
    caregiverApplicants,
    updateCaregiverApplicantStage,
    advanceApplicantStep,
    notify,
  } = usePortal();

  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string) || '';

  // Lookup applicant by id or fallback to first
  const applicant: CaregiverApplicant | undefined = useMemo(() => {
    return caregiverApplicants.find((a) => a.id === id) || caregiverApplicants[0];
  }, [caregiverApplicants, id]);

  const [activeTab, setActiveTab] = useState<'overview' | 'credentials' | 'compensation' | 'communication'>('overview');
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'Alicia T. (Recruiter)',
      date: 'Nov 16, 2:30 PM',
      type: 'SMS',
      text: 'Hi Jordan, thank you for applying to the Family Caregiver role at LiliSare. Are you available for a brief 10-minute screening call this week?',
    },
    {
      id: 'msg-2',
      sender: 'Jordan Bailey',
      date: 'Nov 16, 2:45 PM',
      type: 'SMS',
      text: 'Hello Alicia! Yes, I am free Wednesday or Thursday afternoon. Looking forward to speaking with you.',
    },
  ]);
  const [newMessageText, setNewMessageText] = useState('');

  if (!applicant) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-500 text-sm">Applicant record not found.</p>
        <Link
          href="/admin-portal/caregiver-intake"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#264e1e] text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Caregiver Intake</span>
        </Link>
      </div>
    );
  }

  const handleHireAndMove = () => {
    updateCaregiverApplicantStage(applicant.id, 'Hired (→ Onboarding)');
    notify(
      'Hired & Moved to Onboarding',
      `${applicant.name} was moved to active onboarding! Electronic packet dispatched.`,
      'success'
    );
    router.push('/admin-portal/onboarding');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    setMessages([
      ...messages,
      {
        id: `msg-${Date.now()}`,
        sender: `${applicant.recruiter} (Staff)`,
        date: 'Just now',
        type: 'SMS',
        text: newMessageText.trim(),
      },
    ]);
    setNewMessageText('');
    notify('Message Sent', `SMS delivered to ${applicant.name} (${applicant.phone})`, 'info');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Shared Dashboard Fixed Header */}
      <TopUtilityBar
        title="Caregiver Intake Record"
        subtitle={`Candidate profile & recruitment file for ${applicant.name}`}
        actionButton={
          <Link
            href="/admin-portal/caregiver-intake"
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 rounded-full text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Applicants</span>
          </Link>
        }
      />

      {/* 2. Top Header Card (Matches Image 7 - Jordan Bailey Header) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {applicant.name}
              </h1>
              <span className="bg-slate-100 text-slate-700 font-semibold text-xs px-2.5 py-0.5 rounded-full border border-slate-200">
                {applicant.role} · {applicant.classificationType}
              </span>
              {applicant.cbiPending && (
                <span className="bg-amber-100 text-amber-800 font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>CBI Pending</span>
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              County: <strong className="text-slate-700 font-semibold">{applicant.county}</strong> · Source: {applicant.source} · Applied: {applicant.appliedDate} · Recruiter: <strong className="text-slate-800">{applicant.recruiter}</strong> · <strong className="text-slate-900 font-black">Target Rate: {applicant.targetRate}</strong>
            </p>
          </div>

          {/* Action Buttons & Stage Selector */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1.5">
              <span className="text-xs font-bold text-slate-600 uppercase">Stage:</span>
              <select
                value={applicant.stage}
                onChange={(e) => updateCaregiverApplicantStage(applicant.id, e.target.value as CaregiverIntakeStage)}
                className="bg-transparent font-bold text-xs text-[#264e1e] cursor-pointer focus:outline-none"
              >
                {CAREGIVER_STAGES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                notify('Interview Logged', `Phone interview record created for ${applicant.name}.`, 'info');
              }}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs cursor-pointer transition-all"
            >
              Log interview
            </button>

            <button
              type="button"
              onClick={handleHireAndMove}
              className="px-4 py-2 bg-[#264e1e] hover:bg-[#1e3e18] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Hire &amp; Move to Onboarding
            </button>
          </div>
        </div>

        {/* Hiring Stepper: Step X of 7 (Exact Match to Image 7) */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              HIRING STEPPER: STEP {applicant.currentStep} OF 7 ({HIRING_STEPS_LABELS[applicant.currentStep - 1]})
            </span>

            {applicant.currentStep < 7 && (
              <button
                type="button"
                onClick={() => advanceApplicantStep(applicant.id)}
                className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#166534] border border-emerald-200 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Mark complete</span>
                <span>✓</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {HIRING_STEPS_LABELS.map((stepLabel, idx) => {
              const stepNum = idx + 1;
              const isCompleted = applicant.currentStep >= stepNum;
              const isCurrent = applicant.currentStep === stepNum;

              return (
                <div key={stepNum} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isCompleted ? 'bg-[#264e1e]' : 'bg-slate-200'
                    }`}
                  />
                  <p
                    className={`text-[10px] truncate ${
                      isCurrent
                        ? 'font-bold text-[#264e1e]'
                        : isCompleted
                        ? 'text-slate-700 font-semibold'
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

      {/* 3. Multi-Tab Navigation (Matching Image 7 Tabs) */}
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
            onClick={() => setActiveTab('credentials')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'credentials'
                ? 'border-[#264e1e] text-[#264e1e] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Experience &amp; Credentials
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('compensation')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'compensation'
                ? 'border-[#264e1e] text-[#264e1e] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Compensation &amp; Packet
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
              {/* Candidate Information Card (Exact Match to Image 7) */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Candidate Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      PRIMARY PHONE:
                    </span>
                    <span className="text-slate-800 font-semibold mt-0.5 block">
                      {applicant.phone}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      EMAIL ADDRESS:
                    </span>
                    <span className="text-slate-800 font-semibold mt-0.5 block">
                      {applicant.email}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      COUNTY / LOCATION:
                    </span>
                    <span className="text-slate-800 font-semibold mt-0.5 block">
                      {applicant.county} County, CO
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      TARGET SCHEDULE:
                    </span>
                    <span className="text-slate-800 font-semibold mt-0.5 block">
                      {applicant.targetSchedule}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recruiter Notes Card (Exact Match to Image 7) */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Recruiter Notes
                </h3>

                <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 text-xs text-slate-700 leading-relaxed">
                  {applicant.notes || 'Experienced healthcare worker looking for full-time schedule in central Denver. Strong background in home care, compassion, and reliability.'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'credentials' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Credentials &amp; Certifications</h3>
                <div className="space-y-2 text-slate-700">
                  <p><strong className="text-slate-900">CNA License:</strong> Verified active on Colorado DORA Registry</p>
                  <p><strong className="text-slate-900">CPR / First Aid:</strong> Valid through Oct 2027 (American Heart Association)</p>
                  <p><strong className="text-slate-900">Colorado CBI Check:</strong> {applicant.cbiPending ? 'Pending submission' : 'Cleared on file'}</p>
                  <p><strong className="text-slate-900">CAPS Check:</strong> Submitted to Colorado Department of Human Services</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'compensation' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Compensation &amp; Onboarding Packet</h3>
                <div className="space-y-2 text-slate-700">
                  <p><strong className="text-slate-900">Agreed Hourly Rate:</strong> {applicant.targetRate}</p>
                  <p><strong className="text-slate-900">Employment Type:</strong> {applicant.classificationType} (W-2 with Direct Deposit)</p>
                  <p><strong className="text-slate-900">Overtime Authorization:</strong> Standard 1.5x after 40 hours/week</p>
                  <p><strong className="text-slate-900">EVV Telephony Setup:</strong> Pre-registered with Sandata Mobile Connect</p>
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
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  placeholder={`Dispatch SMS or email update to ${applicant.name}...`}
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

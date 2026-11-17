'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import {
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Send,
  Heart,
  Calendar,
  FileCheck,
  ShieldCheck,
  Mic,
  ChevronRight,
  Info
} from 'lucide-react';

export function CaregiverPortal() {
  const {
    evvRecords,
    submitClockIn,
    submitClockOut,
    submitSelfCorrection,
    caregivers,
    clients,
    notify,
  } = usePortal();

  const caregiver = caregivers[0]; // Elena Morales
  const client = clients[0]; // Mateo Morales

  // Active shift logic
  const activeShift = evvRecords.find(
    (r) => r.caregiverId === caregiver.id && r.actualClockIn && !r.actualClockOut && !r.evvStateStatus.includes('Exception')
  );

  const missedClockOutShift = evvRecords.find(
    (r) => r.caregiverId === caregiver.id && r.evvStateStatus === 'Exception: Missed Clock-Out'
  );

  // States for interactive actions
  const [careNoteText, setCareNoteText] = useState(
    'Assisted Mateo with morning routine, dental hygiene, and supervised preparation of high-protein breakfast. Completed 30 minutes of passive motor range exercises prescribed by physical therapist.'
  );
  const [isRecording, setIsRecording] = useState(false);
  const [correctedTimeInput, setCorrectedTimeInput] = useState('05:00 PM');
  const [correctionReasonInput, setCorrectionReasonInput] = useState(
    'Phone battery died while transporting Mateo back from Denver Children’s speech clinic.'
  );

  const handleSimulateDictate = () => {
    setIsRecording(true);
    notify('Speech Recognition Active', 'Listening to caregiver voice notes...', 'info');
    setTimeout(() => {
      setIsRecording(false);
      setCareNoteText(
        'Assisted Mateo with afternoon wheelchair transfer, administered scheduled afternoon fluids, and facilitated sensory playtime. Skin integrity verified clean and dry.'
      );
      notify('AI Note Transcribed', 'Note formatted according to Colorado IHSS documentation standards.', 'success');
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Mobile-Friendly Friendly Header */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-200 mb-2">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              Family Caregiver Self-Service Mobile Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, Elena!
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm mt-1">
              Providing care for your son: <strong className="text-secondary-300">Mateo Morales</strong>
            </p>
            <p className="text-slate-300 text-xs mt-0.5">
              Program: <strong>IHSS Waiver</strong> • Authorized: <strong>28.5 hrs / week</strong>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 text-center sm:text-right">
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
              Current Pay Cycle Hours
            </span>
            <p className="text-3xl font-black text-secondary mt-0.5">24.5 hrs</p>
            <span className="text-[11px] text-emerald-300 font-medium">4.0 hrs remaining this week</span>
          </div>
        </div>
      </div>

      {/* Primary Action Card: EVV Shift & Clock In / Out */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-slate-900">Today&apos;s Scheduled EVV Shift</h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-100 text-primary-800">
            Denver Residence Geofence Active
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium">Scheduled Time Window</span>
            <p className="text-lg font-bold text-slate-800">08:00 AM – 12:00 PM</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>4820 W 38th Ave, Denver, CO</span>
            </div>
          </div>

          <div className="space-y-1 md:border-l md:border-slate-100 md:pl-4">
            <span className="text-xs text-slate-500 font-medium">Colorado State EVV Verification</span>
            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> GPS Geofence Matched
            </p>
            <p className="text-[11px] text-slate-400">Automated Sandata / State EVV payload prepared</p>
          </div>

          {/* Action Trigger */}
          <div className="flex flex-col gap-2">
            {activeShift ? (
              <button
                onClick={() => submitClockOut(activeShift.id, careNoteText)}
                className="w-full py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                Clock Out of Shift (Ends at 12:00 PM)
              </button>
            ) : (
              <button
                onClick={() => submitClockIn(caregiver.id, client.id)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#3e6b2b] hover:bg-primary-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                Clock In for Today&apos;s Shift
              </button>
            )}
            <p className="text-[10px] text-center text-slate-400">
              Verified by Colorado Department of Health Care Policy & Financing (HCPF)
            </p>
          </div>
        </div>
      </div>

      {/* High-Value Feature: Self-Service Missed Clock-Out Resolution */}
      {missedClockOutShift && (
        <div className="bg-amber-50/90 rounded-2xl border border-amber-200 p-6 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-950">
                  Missed Clock-Out Resolution (Yesterday, Nov 16)
                </h3>
                <p className="text-xs text-amber-800 mt-0.5">
                  LiliSphere lets you correct your own time directly instead of having office staff chase you down.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
              {missedClockOutShift.caregiverSelfCorrection?.status || 'Needs Correction'}
            </span>
          </div>

          {missedClockOutShift.caregiverSelfCorrection?.status === 'Approved' ? (
            <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                Correction Approved by Onboarding QA: Adjusted time <strong>{missedClockOutShift.actualClockOut}</strong> included in payroll.
              </span>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-4 border border-amber-200/80 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700">Actual Shift End Time</label>
                  <input
                    type="text"
                    value={correctedTimeInput}
                    onChange={(e) => setCorrectedTimeInput(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Reason for Missed EVV Action</label>
                  <input
                    type="text"
                    value={correctionReasonInput}
                    onChange={(e) => setCorrectionReasonInput(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() =>
                    submitSelfCorrection(missedClockOutShift.id, correctedTimeInput, correctionReasonInput)
                  }
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Self-Correction for Review
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI-Assisted Care Notes & Dictation (Release 2 Highlight) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              AI-Assisted Care Note Dictation
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Speak or write your visit notes. AI ensures wording matches Colorado Medicaid documentation rules.
            </p>
          </div>
          <button
            onClick={handleSimulateDictate}
            disabled={isRecording}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-primary-50 text-primary-800 hover:bg-primary-100 border border-primary-200'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            {isRecording ? 'Listening...' : 'Dictate with AI'}
          </button>
        </div>

        <div className="space-y-2">
          <textarea
            rows={3}
            value={careNoteText}
            onChange={(e) => setCareNoteText(e.target.value)}
            className="w-full text-xs p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
            placeholder="Describe activities of daily living (ADLs), transfers, meal assistance, or behavioral notes..."
          />

          {/* AI Compliance Score Badge */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00d084]" />
              <span className="font-semibold text-slate-800">
                AI Compliance Check: <strong>97% Confidence Score</strong>
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">• 3 ADL activities detected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                Nutritional Monitoring
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                ADL Hygiene
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                Mobility Support
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Elena's Onboarding & Compliance Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Onboarding Profile Summary */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-primary" />
              My Onboarding & Documents
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              100% Complete
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-600">Classification:</span>
              <span className="font-semibold text-slate-900">W-2 Family Employee</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-600">Payroll System:</span>
              <span className="font-semibold text-slate-900">ADP Run (Direct Deposit Active)</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-600">Background Verification:</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> CBI Fingerprint Cleared
              </span>
            </div>
          </div>
        </div>

        {/* LearnWorlds LMS */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary" />
              LearnWorlds Caregiver Training
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              6 / 6 Modules Passed
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Mandatory Colorado IHSS orientation, client rights, infection control, and EVV procedures completed.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-500">
            <span>Average Quiz Score: <strong>98%</strong></span>
            <button
              type="button"
              onClick={() => notify('Training Certificate', 'Colorado IHSS Compliance Certificate is verified and valid through Nov 2027.', 'info')}
              className="text-primary hover:underline font-semibold cursor-pointer"
            >
              View Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

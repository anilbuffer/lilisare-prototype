'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { Stethoscope, CheckCircle2, Clock, AlertTriangle, Video, MapPin, Sparkles, FileText, Calendar } from 'lucide-react';

export function ClinicalPortal() {
  const { complianceVisits, markVisitCompleted, evvRecords, notify } = usePortal();
  const [selectedVisitId, setSelectedVisitId] = useState<string>(complianceVisits[0]?.id || '');
  const [visitNotes, setVisitNotes] = useState('Patient stable. Caregiver demonstrated proper body mechanics and protocol adherence. No skin breakdown observed.');

  const selectedVisit = complianceVisits.find((v) => v.id === selectedVisitId) || complianceVisits[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-primary-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-teal-200 mb-2">
            <Stethoscope className="w-3.5 h-3.5 text-teal-300" />
            Registered Nurse Oversight & Care Plan Compliance
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Clinical RN Supervisory Console
          </h1>
          <p className="text-teal-100 text-xs sm:text-sm mt-1 leading-relaxed">
            Managing state-mandated supervisory schedules: 60-day onsite CNA visits, quarterly virtual HMA assessments, and AI-assisted care note quality auditing across 900+ family caregivers.
          </p>
        </div>
      </div>

      {/* Main Grid: Visits & AI Care Note Auditing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Supervisory Visits List */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Mandatory Supervisory Visits Schedule
              </h3>
              <p className="text-xs text-slate-500">Track and log required nurse assessments</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
              {complianceVisits.length} Assigned
            </span>
          </div>

          <div className="space-y-2.5">
            {complianceVisits.map((visit) => {
              const isSelected = visit.id === selectedVisit.id;
              const isOverdue = visit.status === 'Overdue';
              const isCompleted = visit.status === 'Completed';

              return (
                <div
                  key={visit.id}
                  onClick={() => setSelectedVisitId(visit.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary bg-primary-50/40 shadow-sm'
                      : 'border-slate-200/80 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{visit.clientName}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Caregiver: <strong>{visit.caregiverName}</strong> ({visit.serviceCategory})
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isOverdue
                          ? 'bg-rose-100 text-rose-800 animate-pulse'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {visit.status}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span className="font-medium text-slate-700">{visit.visitType}</span>
                    <span>Due: <strong>{visit.dueDate}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visit Logging Action */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 mt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Complete Selected Visit: {selectedVisit.clientName}
            </h4>
            <div className="text-xs">
              <label className="font-semibold text-slate-600">RN Clinical Notes & Evidence</label>
              <textarea
                rows={2}
                value={visitNotes}
                onChange={(e) => setVisitNotes(e.target.value)}
                className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                onClick={() => markVisitCompleted(selectedVisit.id, visitNotes)}
                disabled={selectedVisit.status === 'Completed'}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  selectedVisit.status === 'Completed'
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-600 text-white shadow-md'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {selectedVisit.status === 'Completed' ? 'Visit Completed & Signed' : 'Sign & Complete RN Visit'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Care Note Quality & AI Auditing Feed */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-secondary" />
                AI-Assisted Care Note Audits
              </h3>
              <p className="text-xs text-slate-500">Continuous Medicaid documentation verification</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              900+ Caregivers Monitored
            </span>
          </div>

          <div className="space-y-3">
            {evvRecords.map((record) => (
              <div key={record.id} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {record.caregiverName} → {record.clientName}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Shift Date: {record.date} • {record.serviceType}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    AI Score: {record.aiDocumentationCheck.score}%
                  </span>
                </div>

                <p className="text-xs text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-200/70 leading-relaxed">
                  &ldquo;{record.caregiverNotes || 'Shift in progress; awaiting shift-end documentation.'}&rdquo;
                </p>

                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Medicaid ADL Criteria Satisfied
                  </span>
                  <button
                    onClick={() => notify('Care Note Approved', `Audit cleared for ${record.caregiverName}'s visit.`, 'success')}
                    className="text-primary hover:underline font-semibold"
                  >
                    Accept Note Audit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

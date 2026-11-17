'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import {
  FileCheck2,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Check,
  RotateCcw,
} from 'lucide-react';

export default function NoteAuditPage() {
  const { notify } = usePortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [approvedIds, setApprovedIds] = useState<string[]>([]);

  const mockNotes = [
    {
      id: 'note-101',
      client: 'Mateo Morales',
      caregiver: 'Elena Morales (Family Caregiver)',
      date: 'Today, 09:30 AM',
      service: 'IHSS Personal Care',
      rawText: 'Assisted Mateo with morning routine, breakfast, bathing and gave prescribed meds. He had a good mood.',
      aiRefinement: 'Caregiver assisted client with ADLs including transfers, bathing, and nutritional support. Prescribed medications administered per care plan protocol. Client demonstrated cooperative mood and stable baseline.',
      flags: 'AI wording ready • Compliant',
      status: 'Pending',
    },
    {
      id: 'note-102',
      client: 'Marisol Vega',
      caregiver: 'Rosa Vega (Family Caregiver)',
      date: 'Today, 11:15 AM',
      service: 'IHSS Health Maintenance (HMA)',
      rawText: 'Did respiratory therapy exercises and checked oxygen level at 97%. Cleaned supplies.',
      aiRefinement: 'Administered skilled respiratory hygiene protocol and documented pulse oximetry reading at 97% on room air. Sanitized durable medical equipment in compliance with infection control standards.',
      flags: 'HMA Nurse Supervisory Verified',
      status: 'Pending',
    },
    {
      id: 'note-103',
      client: 'Arthur Davis',
      caregiver: 'Emily R. (RN)',
      date: 'Yesterday, 04:00 PM',
      service: 'Private Duty Nursing',
      rawText: 'Catheter maintenance and vitals check. Arthur felt tired but alert.',
      aiRefinement: 'Performed sterile Foley catheter maintenance with no signs of erythema or trauma. Vital signs within normal clinical limits. Patient rested comfortably with continuous supervision.',
      flags: 'AI wording ready',
      status: 'Pending',
    },
    {
      id: 'note-104',
      client: 'Helen Sanchez',
      caregiver: 'Marcus T. (CNA)',
      date: 'Yesterday, 02:20 PM',
      service: 'Personal Care Attendant',
      rawText: 'Bed positioning, mobility assistance to wheelchair, meal prep.',
      aiRefinement: 'Facilitated safe biomechanical transfer to wheelchair using gait belt. Executed prescribed range-of-motion repositioning. Prepared medically prescribed pureed meal.',
      flags: 'EVV Geofence Verified',
      status: 'Pending',
    },
  ];

  const handleApprove = (id: string, clientName: string) => {
    setApprovedIds((prev) => [...prev, id]);
    notify('Care Note Approved', `Clinical note for ${clientName} scrubbed and approved for billing.`, 'success');
  };

  const handleBatchApprove = () => {
    setApprovedIds(mockNotes.map((n) => n.id));
    notify('Batch Audit Complete', '24 care notes approved with AI clinical wording standards.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Care Note Audit Queue
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              24 Pending Review
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            AI wording assistant transforms shorthand caregiver observations into audit-proof Medicaid clinical documentation.
          </p>
        </div>

        <button
          onClick={handleBatchApprove}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff8867] hover:from-[#f05a37] hover:to-[#ff7b57] text-white text-xs font-bold shadow-[0_3px_12px_rgba(255,107,74,0.3)] hover:shadow-[0_4px_18px_rgba(255,107,74,0.4)] transition-all cursor-pointer self-start sm:self-auto active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4 text-[#F2B632]" />
          <span>Batch Approve All Ready (24)</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Awaiting Audit</p>
          <p className="text-2xl font-black text-slate-900 mt-1">24</p>
          <span className="text-[10px] text-amber-600 font-semibold">Ready for review</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">AI Refined</p>
          <p className="text-2xl font-black text-[#3e6b2b] mt-1">100%</p>
          <span className="text-[10px] text-emerald-600 font-semibold">Standardized wording</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">EVV Clock-Out Match</p>
          <p className="text-2xl font-black text-slate-900 mt-1">22 / 24</p>
          <span className="text-[10px] text-slate-400">2 flagged for GPS check</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase">Scrub Pass Rate</p>
          <p className="text-2xl font-black text-slate-900 mt-1">99.4%</p>
          <span className="text-[10px] text-emerald-600 font-semibold">Zero Medicaid audits rejected</span>
        </div>
      </div>

      {/* Note Cards List */}
      <div className="space-y-4">
        {mockNotes.map((note) => {
          const isApproved = approvedIds.includes(note.id);
          return (
            <div
              key={note.id}
              className={`bg-white rounded-2xl p-5 border transition-all space-y-4 ${
                isApproved ? 'border-emerald-200 bg-emerald-50/20 shadow-2xs' : 'border-slate-200/90 shadow-2xs hover:shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                    <FileCheck2 className="w-4 h-4 text-[#3e6b2b]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{note.client}</h3>
                    <p className="text-[11px] text-slate-400 font-medium">Caregiver: <strong className="text-slate-700">{note.caregiver}</strong> • {note.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {note.service}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {note.flags}
                  </span>
                </div>
              </div>

              {/* Note Content Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Original Caregiver Observation
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans italic">
                    "{note.rawText}"
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200/80 space-y-1 relative">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#3e6b2b] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#F2B632]" />
                      <span>AI Audit-Scrubbed Documentation</span>
                    </p>
                    <span className="text-[9px] font-bold text-emerald-700 px-1.5 py-0.2 rounded bg-white border border-emerald-200">
                      Medicaid Compliant
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {note.aiRefinement}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400 font-mono">ID: {note.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => notify('Correction Requested', `Flagged note for ${note.caregiver} for clarification.`, 'info')}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Request Edit
                  </button>
                  <button
                    onClick={() => handleApprove(note.id, note.client)}
                    disabled={isApproved}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isApproved
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-[#3e6b2b] hover:bg-[#345c24] text-white shadow-2xs'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isApproved ? 'Approved & Locked' : 'Approve Note'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

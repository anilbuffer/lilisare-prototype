'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { Lead, LeadStatus, ServiceType } from '@/lib/types';
import {
  Inbox,
  UserPlus,
  PhoneCall,
  Mail,
  Building2,
  Calendar,
  Clock,
  ArrowRight,
  Send,
  CheckCircle2,
  Filter,
  Search,
  Sparkles
} from 'lucide-react';

const PIPELINE_STAGES: LeadStatus[] = [
  'New Inquiry',
  'Contacted',
  'Needs Clarification',
  'Case Manager Coordination',
  'Follow-up Scheduled',
  'Converted',
];

export function EnrollmentPortal() {
  const { leads, updateLeadStatus, addLead, notify } = usePortal();
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || '');
  const [filterService, setFilterService] = useState<string>('all');
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  // Form states for new lead
  const [newClientName, setNewClientName] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newRelationship, setNewRelationship] = useState('Mother');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newService, setNewService] = useState<ServiceType>('IHSS');
  const [newAgency, setNewAgency] = useState('Rocky Mountain Human Services (RMHS)');
  const [newCaseManager, setNewCaseManager] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newContactName) {
      notify('Missing Information', 'Please fill in client name and contact name.', 'warning');
      return;
    }

    addLead({
      clientName: newClientName,
      primaryContactName: newContactName,
      relationship: newRelationship,
      phone: newPhone || '(303) 555-0100',
      email: newEmail || 'family.contact@colorado.org',
      dateOfBirth: '2015-06-20',
      inquirySource: 'Case Management Agency',
      referralAgency: newAgency,
      caseManagerName: newCaseManager || 'State Case Coordinator',
      caseManagerPhone: '(303) 555-8000',
      caseManagerEmail: 'coordinator@rmhs.org',
      requestedService: newService,
      assignedStaff: 'Danielle Brooks',
      status: 'New Inquiry',
      nextFollowUpDate: '2026-11-20',
      notes: newNotes || 'Family inquiry for specialized home-care assistance.',
    });

    setShowNewLeadModal(false);
    setNewClientName('');
    setNewContactName('');
    setNewNotes('');
  };

  const filteredLeads = leads.filter(
    (l) => filterService === 'all' || l.requestedService === filterService
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-200 mb-2">
              <Inbox className="w-3.5 h-3.5 text-secondary" />
              Unified Intake Pipeline & Case Manager Coordination
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Client & Referral Intake
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Consolidating inquiries from Case Management Agencies, direct referrals, and families into one synchronized queue. Automated state case manager follow-ups protect payment authorizations.
            </p>
          </div>

          <button
            onClick={() => setShowNewLeadModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary-500 text-slate-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            Register New Intake
          </button>
        </div>
      </div>

      {/* Visual Pipeline Stages Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm overflow-x-auto">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
          Intake Pipeline Flow
        </p>
        <div className="flex items-center gap-2 min-w-[700px]">
          {PIPELINE_STAGES.map((stage, idx) => {
            const countInStage = leads.filter((l) => l.status === stage).length;
            return (
              <div
                key={stage}
                className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700">{stage}</span>
                  <span className="text-xs font-extrabold text-primary px-2 py-0.5 rounded-full bg-primary-100">
                    {countInStage}
                  </span>
                </div>
                <div className="w-full h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: countInStage > 0 ? '100%' : '0%' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Leads List & Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Leads Queue */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col h-[650px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Active Inquiries</h3>
              <p className="text-xs text-slate-500">Track and advance referral status</p>
            </div>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-300 bg-slate-50 text-slate-700"
            >
              <option value="all">All Services</option>
              <option value="IHSS">IHSS</option>
              <option value="CNA">CNA</option>
              <option value="HMA">HMA</option>
              <option value="Personal Care">Personal Care</option>
            </select>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 mt-3 pr-1">
            {filteredLeads.map((lead) => {
              const isSelected = lead.id === selectedLead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary bg-primary-50/50 shadow-sm'
                      : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{lead.clientName}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Contact: {lead.primaryContactName} ({lead.relationship})
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-100 text-primary-800">
                      {lead.requestedService}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">Agency: {lead.referralAgency.split(' ')[0]}</span>
                    <span className="font-bold text-slate-700">{lead.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Lead Details & Actions */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">{selectedLead.clientName}</h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {selectedLead.id}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-900">
                  {selectedLead.requestedService} Program
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Primary Contact: <strong>{selectedLead.primaryContactName}</strong> ({selectedLead.relationship}) •{' '}
                {selectedLead.phone}
              </p>
            </div>

            {/* Quick Status Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Stage:</span>
              <select
                value={selectedLead.status}
                onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as LeadStatus)}
                className="text-xs font-bold px-3 py-1.5 rounded-xl border border-primary/40 bg-primary-50 text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {PIPELINE_STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Referral Agency & State Case Manager Coordination */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-primary" />
                State Case Management Coordination
              </h4>
              <span className="text-[11px] text-slate-500">
                Communications logged: <strong>{selectedLead.communicationCount}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500">Referring Agency:</span>
                <p className="font-semibold text-slate-900 mt-0.5">{selectedLead.referralAgency}</p>
              </div>
              <div>
                <span className="text-slate-500">Case Manager:</span>
                <p className="font-semibold text-slate-900 mt-0.5">{selectedLead.caseManagerName}</p>
                <p className="text-[11px] text-slate-500">{selectedLead.caseManagerPhone} • {selectedLead.caseManagerEmail}</p>
              </div>
            </div>

            {/* One-Click Follow Up */}
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Next Follow-Up Due: <strong>{selectedLead.nextFollowUpDate}</strong>
              </span>
              <button
                onClick={() =>
                  notify(
                    'Templated Follow-Up Dispatched',
                    `Polite status inquiry sent to ${selectedLead.caseManagerName} regarding service-plan authorization.`,
                    'success'
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Send Case-Manager Follow-Up
              </button>
            </div>
          </div>

          {/* Lead Notes & Background */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Intake Notes & Special Circumstances
            </h4>
            <div className="p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white leading-relaxed">
              {selectedLead.notes}
            </div>
          </div>

          {/* Conversion Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-slate-900">Family Confirmed LiliSare?</p>
              <p className="text-[11px] text-slate-500">
                Advance directly to client and caregiver onboarding workflow.
              </p>
            </div>
            <button
              onClick={() => {
                updateLeadStatus(selectedLead.id, 'Converted');
                notify('Lead Converted!', `Client & Caregiver onboarding packet generated for ${selectedLead.clientName}.`, 'success');
              }}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Convert to Active Onboarding
            </button>
          </div>
        </div>
      </div>

      {/* New Lead Modal */}
      {showNewLeadModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Register New Lead / Inquiry</h3>
              <button
                onClick={() => setShowNewLeadModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Client / Child Name</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. Lucas Henderson"
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Primary Contact (Caregiver)</label>
                  <input
                    type="text"
                    required
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    placeholder="e.g. Sarah Henderson"
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Relationship</label>
                  <select
                    value={newRelationship}
                    onChange={(e) => setNewRelationship(e.target.value)}
                    className="w-full mt-1 px-2.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Adult Sibling">Adult Sibling</option>
                    <option value="Guardian">Legal Guardian</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Program / Service</label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value as ServiceType)}
                    className="w-full mt-1 px-2.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="IHSS">IHSS</option>
                    <option value="CNA">CNA</option>
                    <option value="HMA">HMA</option>
                    <option value="Personal Care">Personal Care</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Contact Phone</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="(303) 555-0199"
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Case Management Agency</label>
                  <input
                    type="text"
                    value={newAgency}
                    onChange={(e) => setNewAgency(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">State Case Manager</label>
                  <input
                    type="text"
                    value={newCaseManager}
                    onChange={(e) => setNewCaseManager(e.target.value)}
                    placeholder="e.g. Karen Miller, MSW"
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700">Clinical / Support Requirements</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Details about client needs, mobility, or medical authorizations..."
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-600 text-white font-bold shadow-md"
                >
                  Save Inquiry & Start Tracking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

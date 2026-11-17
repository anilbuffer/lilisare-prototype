'use client';

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Clock,
  Send,
  Mail,
  User,
  ShieldCheck,
  Building2,
  FileText,
  FileClock,
  DollarSign,
  Radio,
  FileCheck2,
  ExternalLink,
  Phone,
  Check,
  HelpCircle,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldAlert,
  Search,
  Filter,
} from 'lucide-react';
import {
  BranchData,
  UNAPPROVED_SHIFTS_RECORDS,
  SCREENING_REVIEW_RECORDS,
  EVV_EXCEPTION_RECORDS,
  CARE_NOTE_AUDIT_RECORDS,
  STUCK_HOUSEHOLDS_RECORDS,
} from './dashboard-data';

interface DashboardDrawersProps {
  activeDrawer: string | null;
  drawerData?: any;
  onClose: () => void;
  branchData: BranchData;
  onNotify: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export function DashboardDrawers({
  activeDrawer,
  drawerData,
  onClose,
  branchData,
  onNotify,
}: DashboardDrawersProps) {
  // Confirmation dialog state for sending external communications
  const [showConfirmSend, setShowConfirmSend] = useState(false);
  const [pendingCommunication, setPendingCommunication] = useState<{
    recipient: string;
    type: string;
    subject: string;
    message: string;
  } | null>(null);

  // Search/Filter state inside drawers
  const [drawerSearch, setDrawerSearch] = useState('');

  if (!activeDrawer) return null;

  // Helper to trigger confirmed message
  const handleConfirmAndSend = () => {
    if (pendingCommunication) {
      onNotify(
        'Communication Dispatched',
        `Official notice transmitted to ${pendingCommunication.recipient} via secure portal gateway.`,
        'success'
      );
    }
    setShowConfirmSend(false);
    setPendingCommunication(null);
  };

  const openCommunicationComposer = (recipient: string, type: string, subject: string, message: string) => {
    setPendingCommunication({ recipient, type, subject, message });
    setShowConfirmSend(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-in slide-in-from-right duration-200">
          
          {/* ======================================================== */}
          {/* 1. KPI: ACTIVE CLIENTS DIRECTORY */}
          {/* ======================================================== */}
          {activeDrawer === 'kpi-clients' && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-[#3e6b2b]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Client Directory ({branchData.kpis.activeClients.value})
                    </h3>
                    <p className="text-xs text-slate-500">
                      {branchData.name} • Active Colorado Medicaid IHSS &amp; HCBS Waivers
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Filter clients by name, Medicaid ID or waiver..."
                    value={drawerSearch}
                    onChange={(e) => setDrawerSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3e6b2b]/20"
                  />
                </div>

                <div className="space-y-2.5">
                  {[
                    { name: 'Mateo Morales', id: 'PT-1001', medicaid: 'CO-984421008', waiver: 'IHSS', caregiver: 'Elena Morales', hours: '28.5 hrs/wk', status: 'Active' },
                    { name: 'Harold Jenkins', id: 'PT-1002', medicaid: 'CO-912847551', waiver: 'CNA', caregiver: 'Marcus Jenkins', hours: '20.0 hrs/wk', status: 'Active' },
                    { name: 'Sophia Ramirez', id: 'PT-1003', medicaid: 'CO-944102941', waiver: 'HCBS-CES', caregiver: 'Lucia Ramirez', hours: '32.0 hrs/wk', status: 'Active' },
                    { name: 'Marisol Vega', id: 'PT-1042', medicaid: 'CO-891022134', waiver: 'IHSS', caregiver: 'Rosa Vega', hours: '28.5 hrs/wk', status: 'PAR Overdue' },
                    { name: 'Harper Nguyen', id: 'PT-1088', medicaid: 'CO-771829341', waiver: 'CNA', caregiver: 'Tuan Nguyen', hours: '20.0 hrs/wk', status: 'PAR Overdue' },
                    { name: 'Desmond Clarke', id: 'PT-1102', medicaid: 'CO-651294101', waiver: 'Personal Care', caregiver: 'Arthur Vance', hours: '18.0 hrs/wk', status: 'PAR Overdue' },
                  ]
                    .filter((c) => c.name.toLowerCase().includes(drawerSearch.toLowerCase()) || c.medicaid.includes(drawerSearch))
                    .map((client) => (
                      <div key={client.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-slate-900">{client.name}</p>
                            <span className="text-[10px] font-mono text-slate-400">{client.id}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                              {client.waiver}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Medicaid: <span className="font-mono">{client.medicaid}</span> • Caregiver: {client.caregiver} ({client.hours})
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${client.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-[#ff6900]'}`}>
                          {client.status}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">+12 net client growth this month</span>
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Close
                </button>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* 2. KPI: ACTIVE CAREGIVERS DIRECTORY */}
          {/* ======================================================== */}
          {activeDrawer === 'kpi-caregivers' && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-[#3e6b2b]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Caregiver Directory ({branchData.kpis.activeCaregivers.value})
                    </h3>
                    <p className="text-xs text-slate-500">
                      {branchData.name} • 38 currently in onboarding pipeline
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-xs text-emerald-900">
                  <strong>~90% Family Member Caregivers:</strong> Verified under Colorado IHSS Family Attendant guidelines with ADP Run payroll synchronization.
                </div>

                <div className="space-y-2.5">
                  {[
                    { name: 'Elena Morales', id: 'CG-001', type: 'W-2 Employee', patient: 'Mateo Morales (Son)', evvRate: '98% on-time', status: 'Active & Verified' },
                    { name: 'Rosa Vega', id: 'CG-0741', type: 'W-2 Employee', patient: 'Marisol Vega (Mother)', evvRate: '92% on-time', status: 'CPR Expired' },
                    { name: 'Luis Ruiz', id: 'CG-0812', type: '1099 Contractor', patient: 'Carlos Ruiz (Brother)', evvRate: '95% on-time', status: 'DL Expired' },
                    { name: 'Grace Park', id: 'CG-0935', type: 'W-2 Employee', patient: 'Jin Park (Father)', evvRate: '100% on-time', status: 'TB Test 12d' },
                    { name: 'Derek Miller', id: 'CG-0628', type: 'W-2 Employee', patient: 'Clara Miller (Spouse)', evvRate: '97% on-time', status: 'Active & Verified' },
                  ].map((cg) => (
                    <div key={cg.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">{cg.name}</p>
                          <span className="text-[10px] font-mono text-slate-400">{cg.id}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-semibold">{cg.type}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Care for: <strong className="text-slate-700">{cg.patient}</strong> • EVV score: {cg.evvRate}
                        </p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cg.status.includes('Active') ? 'bg-emerald-50 text-[#3e6b2b]' : 'bg-orange-50 text-[#ff6900]'}`}>
                        {cg.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">ADP Run sync active</span>
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Close
                </button>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* 3. KPI: PENDING AUTHORIZATIONS QUEUE */}
          {/* ======================================================== */}
          {(activeDrawer === 'kpi-authorizations' || activeDrawer === 'auth-queue') && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                    <FileClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Prior Authorization Queue ({branchData.kpis.pendingAuthorizations.value})
                    </h3>
                    <p className="text-xs text-slate-500">
                      {branchData.authorizations.overdueCount} requests currently overdue past 10-day state SLA
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                  <strong>Colorado HCPF Bridge Portal:</strong> Awaiting determination for submitted prior authorization requests. Follow up directly with assigned County Case Managers.
                </div>

                <div className="space-y-3">
                  {branchData.authorizations.overdueList.map((auth) => (
                    <div key={auth.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">{auth.clientName}</p>
                          <span className="text-[10px] font-mono text-slate-400">{auth.clientId}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">{auth.serviceType}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#ff6900] border border-[#ff6900]/20 font-mono">
                          {auth.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                        <div>Case Manager: <strong>{auth.caseManager}</strong></div>
                        <div>Agency: <strong>{auth.cmAgency}</strong></div>
                        <div>Waiver: <strong>{auth.waiver}</strong></div>
                        <div>Hours: <strong>{auth.requestedHours} hrs/wk</strong></div>
                      </div>
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => openCommunicationComposer(
                            `${auth.caseManager} (${auth.cmAgency})`,
                            'Case Manager Outreach',
                            `Urgent: PAR Renewal Status for ${auth.clientName} (${auth.clientId})`,
                            `Dear ${auth.caseManager},\n\nWe are following up regarding the Prior Authorization Request for ${auth.clientName} (${auth.clientId}) which has been pending determination for ${auth.daysOverdue} days. Daily care is ongoing under the ${auth.serviceType} program. Please let us know if additional clinical documentation is required to finalize approval.\n\nThank you,\nLisa Admin\nLiliSare Operations`
                          )}
                          className="px-3 py-1.5 bg-[#3e6b2b] hover:bg-[#2a3d20] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Compose CM Follow-up</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">Status synced with Colorado Bridge EHR</span>
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Close
                </button>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* 4. PRIORITY ITEM 1: CAREGIVERS PAYMENT AT RISK & FOLLOW-UP */}
          {/* ======================================================== */}
          {activeDrawer === 'unapproved-shifts' && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-orange-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-orange-100 text-[#ff6900]">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Unapproved Shifts — Payment at Risk ({UNAPPROVED_SHIFTS_RECORDS.length} records)
                    </h3>
                    <p className="text-xs text-[#ff6900] font-semibold">
                      Highest Urgency Operational Risk • Review &amp; Follow-up Queue
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                  <strong>Important Review Policy:</strong> The source data indicates shifts logged without confirmed authorization renewal. Do not automatically assume all caregivers have provided unauthorized or fraudulent care; many hold verbal CMA assurances while state paperwork processes. Review each record and confirm communication before dispatching external reminders.
                </div>

                <div className="space-y-3">
                  {UNAPPROVED_SHIFTS_RECORDS.map((rec) => (
                    <div key={rec.caregiverId} className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{rec.caregiverName} &rarr; {rec.clientName}</p>
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5">{rec.caregiverId} • Client {rec.clientId}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-[#ff6900] font-mono">{rec.riskAmount}</span>
                          <p className="text-[10px] text-slate-400 font-mono">{rec.hoursLogged} hrs logged</p>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-700">
                        <span className="font-semibold text-slate-900">Operational Bottleneck: </span>
                        {rec.reason}
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {rec.phone}
                        </span>

                        <button
                          onClick={() => openCommunicationComposer(
                            `${rec.caregiverName} & CMA`,
                            'PAR Verification Notice',
                            `Action Required: Authorization Status for ${rec.clientName}`,
                            `Notice to ${rec.caregiverName}:\n\nYour shifts logged between ${rec.shiftDate} (${rec.hoursLogged} hours) are currently awaiting State PAR renewal confirmation. We have contacted Rocky Mountain Human Services to expedite signature. Please ensure timesheets reflect approved care plan tasks.\n\nLiliSare Agency Administration`
                          )}
                          className="px-3 py-1.5 bg-[#ff6900] hover:bg-[#e05c00] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Draft Follow-up</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">Requires confirmation before external delivery</span>
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Done Reviewing
                </button>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* 5. PRIORITY ITEM 2: SCREENING RESULTS INTERNAL REVIEW */}
          {/* ======================================================== */}
          {activeDrawer === 'screening-flags' && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-amber-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Internal Screening Review Queue ({SCREENING_REVIEW_RECORDS.length} records)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Role-Authorized Personnel Only • Confidential CBI &amp; CAPS Repository
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                  <strong>Colorado State Background Protocol:</strong> Disqualifying felonies automatically reject applicants. These 3 items represent minor address discrepancies, out-of-state verification delays, or common name false positives.
                </div>

                <div className="space-y-3">
                  {SCREENING_REVIEW_RECORDS.map((scr) => (
                    <div key={scr.id} className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">{scr.caregiverName}</p>
                          <span className="text-[10px] font-mono text-slate-400">{scr.caregiverId}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          {scr.status}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-700">{scr.screeningType}</p>
                      
                      <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 space-y-1">
                        <div><strong>Finding:</strong> {scr.summary}</div>
                        <div><strong>Action:</strong> {scr.recommendedAction}</div>
                      </div>

                      <div className="pt-1 flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            onNotify('Screening Cleared', `${scr.caregiverName} CBI screening adjudicated and cleared for orientation.`, 'success');
                          }}
                          className="px-3 py-1.5 bg-[#3e6b2b] hover:bg-[#2a3d20] text-white text-xs font-bold rounded-xl transition-all"
                        >
                          Clear &amp; Approve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">CBI LiveScan integration active</span>
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Close
                </button>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* 6. PRIORITY ITEM 3: EXPIRED CAREGIVER CREDENTIALS */}
          {/* ======================================================== */}
          {activeDrawer === 'expired-credentials' && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-orange-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-orange-100 text-[#ff6900]">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Expired Credentials Queue ({branchData.compliance.expiredCount} urgent)
                    </h3>
                    <p className="text-xs text-[#ff6900] font-semibold">
                      Colorado CDPHE Compliance Standards • Mandatory Renewal
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                  Caregivers with expired CPR, Driver's Licenses, or TB clearances cannot be scheduled for Medicaid-reimbursable hours until verified document renewals are uploaded.
                </div>

                <div className="space-y-3">
                  {branchData.compliance.items.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{item.caregiverName}</p>
                          <p className="text-[11px] text-slate-500 font-mono">{item.caregiverId} • {item.category}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${item.status.includes('Expired') ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
                          {item.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg">
                        Credential: <strong>{item.credential}</strong> • Expiration Date: <span className="font-mono">{item.expirationDate}</span>
                      </div>

                      <div className="pt-2 flex justify-end gap-2">
                        <button
                          onClick={() => openCommunicationComposer(
                            item.caregiverName,
                            'Credential Renewal Notice',
                            `Immediate Action: ${item.credential} Expired`,
                            `Dear ${item.caregiverName},\n\nOur compliance system indicates that your ${item.credential} expired on ${item.expirationDate}. To continue providing authorized shifts, please upload an updated copy to your caregiver portal today.\n\nThank you,\nLiliSare Credentialing Team`
                          )}
                          className="px-3 py-1.5 bg-[#3e6b2b] hover:bg-[#2a3d20] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch Renewal Link</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">Auto-reminder webhook enabled</span>
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Close
                </button>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* 7. PRIORITY ITEM 4: EVV AT-RISK VISITS */}
          {/* ======================================================== */}
          {activeDrawer === 'evv-exceptions' && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-amber-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      EVV Visit Exception Queue (14 visits at risk)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Colorado HCPF Geofence &amp; Timestamp Exception Audit
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed">
                  <strong>Administrative Guidance:</strong> GPS geofence variances frequently occur during authorized community activities, medical transport, or residential cellular dead-zones. A GPS variance is not proof of fraud. Reconcile with caregiver notes before approving claim transmission.
                </div>

                <div className="space-y-3">
                  {EVV_EXCEPTION_RECORDS.map((evv) => (
                    <div key={evv.id} className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{evv.caregiverName} &rarr; {evv.clientName}</p>
                          <p className="text-[11px] text-slate-500 font-mono">{evv.id} • {evv.date}</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          {evv.variance}
                        </span>
                      </div>

                      <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg space-y-1">
                        <div>Scheduled: <span className="font-mono">{evv.scheduled}</span> | Actual: <span className="font-mono">{evv.actual}</span></div>
                        <div className="text-slate-600"><strong>Note:</strong> {evv.note}</div>
                      </div>

                      <div className="pt-1 flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            onNotify('EVV Exception Resolved', `Visit ${evv.id} matched and authorized for Medicaid claim.`, 'success');
                          }}
                          className="px-3 py-1.5 bg-[#00d084] hover:bg-emerald-600 text-slate-900 font-bold text-xs rounded-xl transition-all"
                        >
                          Approve Exception
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">96% resolved via Caregiver Self-Correction</span>
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Close
                </button>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* 8. PRIORITY ITEM 5: CARE NOTES AUDIT (AI WORDING READY) */}
          {/* ======================================================== */}
          {activeDrawer === 'care-notes' && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-100 text-[#3e6b2b]">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Care Notes Audit Queue (24 awaiting review)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Clinical Quality Review • AI Documentation Assistance
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                  <strong>Clinical Notice:</strong> AI structured wording is an assistive suggestion only. It must never be treated as an automatically approved final care note. An authorized RN Clinical Supervisor or Agency Admin must verify factual accuracy before Medicaid submission.
                </div>

                <div className="space-y-4">
                  {CARE_NOTE_AUDIT_RECORDS.map((note) => (
                    <div key={note.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{note.caregiverName} &rarr; {note.clientName}</p>
                          <p className="text-[11px] text-slate-500 font-mono">{note.id} • {note.service} • {note.date}</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {note.complianceScore}% Medicaid Match
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Raw Caregiver Voice Note</p>
                          <p className="text-slate-700 italic">"{note.rawNote}"</p>
                        </div>

                        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
                          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#3e6b2b] mb-1">
                            <Sparkles className="w-3 h-3 text-[#F2B632]" />
                            <span>AI Structured Clinical Suggestion</span>
                          </div>
                          <p className="text-slate-800">{note.aiStructuredSuggestion}</p>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            onNotify('Care Note Approved', `Clinical note for ${note.clientName} approved and attached to billing record.`, 'success');
                          }}
                          className="px-3 py-1.5 bg-[#3e6b2b] hover:bg-[#2a3d20] text-white text-xs font-bold rounded-xl transition-all"
                        >
                          RN Sign-off &amp; Approve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">HIPAA compliant AI formatting</span>
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Close
                </button>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* 9. PRIORITY ITEM 6: STUCK HOUSEHOLDS ONBOARDING */}
          {/* ======================================================== */}
          {(activeDrawer === 'stuck-households' || activeDrawer === 'kpi-households') && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-orange-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-orange-100 text-[#ff6900]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Households Delayed in Onboarding &gt; 5 Days ({STUCK_HOUSEHOLDS_RECORDS.length} listed)
                    </h3>
                    <p className="text-xs text-[#ff6900] font-semibold">
                      Intake Acceleration Queue • Target 11 Days
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                  These 11 households are currently delayed in onboarding due to missing state forms, physician signatures, or incomplete background steps.
                </div>

                <div className="space-y-3">
                  {STUCK_HOUSEHOLDS_RECORDS.map((hh) => (
                    <div key={hh.id} className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{hh.householdHead}</p>
                          <p className="text-[11px] text-slate-500 font-mono">{hh.id} • Assigned: {hh.assignedCoordinator}</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#ff6900] border border-[#ff6900]/20 font-mono">
                          {hh.daysStuck} days delayed
                        </span>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1">
                        <div><strong>Bottleneck:</strong> {hh.bottleneck}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {hh.missingItems.map((m, i) => (
                            <span key={i} className="text-[10px] font-bold px-1.5 py-0.2 bg-white border border-slate-200 text-slate-600 rounded">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-slate-500">{hh.contact}</span>
                        <button
                          onClick={() => openCommunicationComposer(
                            hh.householdHead,
                            'Household Onboarding Nudge',
                            'LiliSare Caregiver Onboarding — Action Needed',
                            `Hello,\n\nWe are reaching out to help finalize your household onboarding with LiliSare. We currently need the following item to activate your authorized shifts: ${hh.missingItems.join(', ')}.\n\nPlease reply or call our onboarding desk at (303) 555-0100 so we can assist.\n\nWarmly,\nDanielle Brooks\nLiliSare Care Coordination`
                          )}
                          className="px-3 py-1.5 bg-[#3e6b2b] hover:bg-[#2a3d20] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Send Household Nudge</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">Automated SMS reminder #2 sent</span>
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Close
                </button>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* 10. AUTOMATION RULES DRAWER */}
          {/* ======================================================== */}
          {activeDrawer === 'automation-rules' && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-100 text-[#3e6b2b]">
                    <Zap className="w-5 h-5 fill-[#3e6b2b]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Active Automation Rules
                    </h3>
                    <p className="text-xs text-slate-500">
                      This Week: 1,284 tasks automated • 312 reminders sent • ~46 staff hours saved
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                  Automation rules run continuously in the background to accelerate Medicaid onboarding and ensure state compliance without adding administrative head-count. (Figures displayed are mock/demo telemetry).
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: 'Caregiver Credential Expiry Wave',
                      trigger: 'Triggered 30 days and 14 days prior to CPR / TB expiration',
                      action: 'Sends localized SMS with one-tap LearnWorlds renewal or upload link',
                      active: true,
                      stats: '312 SMS dispatched this week',
                    },
                    {
                      name: 'CBI State Gateway Webhook Listener',
                      trigger: 'Fires when Colorado CBI completes fingerprint adjudication',
                      action: 'Auto-marks background check Passed; updates onboarding progress to 90%',
                      active: true,
                      stats: '44 background checks reconciled',
                    },
                    {
                      name: 'EVV Geofence Radius Validation',
                      trigger: 'Evaluates clock-in latitude & longitude against client address',
                      action: 'Matches within 250m radius; flags variances for self-correction review',
                      active: true,
                      stats: '99.1% verified without manual intervention',
                    },
                    {
                      name: 'AI Care Note Structuring Draft',
                      trigger: 'Caregiver submits raw voice note or short bullet shift summary',
                      action: 'Generates Medicaid compliant ADL narrative for RN Clinical review',
                      active: true,
                      stats: '24 drafts generated for review',
                    },
                  ].map((rule, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-900">{rule.name}</p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#00d084]" />
                          Active
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600"><strong>Trigger:</strong> {rule.trigger}</p>
                      <p className="text-[11px] text-slate-600"><strong>Action:</strong> {rule.action}</p>
                      <div className="pt-1 text-[10px] font-mono text-[#3e6b2b]">
                        Performance: {rule.stats}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">LiliSphere Automation Engine v1.0</span>
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Close
                </button>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* 11. STAFFING COVERAGE DRAWER (DOUGLAS COUNTY) */}
          {/* ======================================================== */}
          {activeDrawer === 'staffing' && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-indigo-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-100 text-indigo-800">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Douglas County Staffing Coverage
                    </h3>
                    <p className="text-xs text-slate-500">
                      3 caregivers needed by Thursday • 4 intakes pending in Parker &amp; Castle Rock
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                  Matching available certified caregivers within a 15-mile radius of pending Douglas County intakes:
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Derek Miller', location: 'Highlands Ranch (4.2 miles away)', hoursAvailable: '16 hrs/wk open', waiver: 'IHSS / CNA Certified' },
                    { name: 'Samantha Cruz', location: 'Parker (2.1 miles away)', hoursAvailable: '20 hrs/wk open', waiver: 'IHSS Attendant' },
                    { name: 'Arthur Vance', location: 'Castle Rock (5.8 miles away)', hoursAvailable: '12 hrs/wk open', waiver: 'Personal Care' },
                  ].map((c, i) => (
                    <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900">{c.name}</p>
                        <p className="text-[11px] text-slate-500">{c.location} • {c.waiver}</p>
                        <span className="text-[10px] font-mono text-[#3e6b2b] font-bold">{c.hoursAvailable}</span>
                      </div>
                      <button
                        onClick={() => onNotify('Shift Offered', `Coverage request transmitted to ${c.name}.`, 'success')}
                        className="px-3 py-1.5 bg-[#3e6b2b] text-white rounded-xl text-xs font-bold hover:bg-[#2a3d20]"
                      >
                        Assign Coverage
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">Scheduler Module Quick Connect</span>
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Close
                </button>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* 12. FULL NOTIFICATIONS MODAL / DRAWER */}
          {/* ======================================================== */}
          {activeDrawer === 'all-notifications' && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-200 text-slate-700">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      All Operational Notifications (12)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Full administrative activity audit log for {branchData.name}
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {[
                  { title: 'Screening result flagged for internal review', time: '10m ago', urgent: true, category: 'Compliance' },
                  { title: 'Prior Authorizations Overdue (4 PARs past SLA)', time: '45m ago', urgent: true, category: 'Authorizations' },
                  { title: 'EVV Visit Exceptions at Risk (14 shifts hold)', time: '2h ago', urgent: false, category: 'EVV Hub' },
                  { title: '6 Caregivers Working Unapproved Hours', time: '3h ago', urgent: true, category: 'Billing' },
                  { title: '24 Care notes awaiting RN audit (AI wording ready)', time: '4h ago', urgent: false, category: 'Clinical' },
                  { title: '11 Households stuck in onboarding > 5 days', time: '5h ago', urgent: false, category: 'Onboarding' },
                  { title: 'Medicaid Claim Batch Transmitted to State ($48,210)', time: 'Yesterday', urgent: false, category: 'Billing' },
                  { title: 'RN 60-Day Supervisory In-home Visit completed for Harold Jenkins', time: 'Yesterday', urgent: false, category: 'Clinical' },
                ].map((n, i) => (
                  <div key={i} className="p-3 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                    <div className="mt-0.5">
                      {n.urgent ? <AlertTriangle className="w-4 h-4 text-[#ff6900]" /> : <CheckCircle2 className="w-4 h-4 text-[#00d084]" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-900">{n.title}</p>
                        <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded mt-1 inline-block">
                        {n.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">Archived for 7 years per state regulations</span>
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Close
                </button>
              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* 13. USER PROFILE & SETTINGS MODALS */}
          {/* ======================================================== */}
          {activeDrawer === 'user-profile' && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#3e6b2b] text-white">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      User Profile &amp; Account Settings
                    </h3>
                    <p className="text-xs text-slate-500">
                      Admin Demo (Lisa) • Agency Administrator
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#3e6b2b] text-white font-extrabold text-lg flex items-center justify-center ring-4 ring-[#3e6b2b]/20">
                      AD
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Lisa Administrator</h4>
                      <p className="text-xs text-slate-500 font-mono">lisa.admin@lilisare.health</p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 mt-1 inline-block">
                        Active BAA Signed
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 text-xs space-y-1.5 text-slate-700">
                    <div><strong>Assigned Entities:</strong> Mountain Lane, Colorado Home Health, Frisco</div>
                    <div><strong>Access Level:</strong> Full Executive Operations (System Admin)</div>
                    <div><strong>MFA Authentication:</strong> Active (Hardware Token)</div>
                    <div><strong>Session Timeout:</strong> 15 minutes of inactivity (HIPAA standard)</div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                  All administrative actions performed in this session are digitally signed and recorded in the 7-year Colorado state audit trail.
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-500">LiliSphere Security v1.0</span>
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                  Close
                </button>
              </div>
            </>
          )}

          {/* Fallback default if drawer ID not explicitly matched */}
          {!['kpi-clients', 'kpi-caregivers', 'kpi-authorizations', 'auth-queue', 'unapproved-shifts', 'screening-flags', 'expired-credentials', 'evv-exceptions', 'care-notes', 'stuck-households', 'kpi-households', 'automation-rules', 'staffing', 'all-notifications', 'user-profile'].includes(activeDrawer) && (
            <>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-base font-bold text-slate-900">Queue Inspector: {activeDrawer}</h3>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-5 flex-1 overflow-y-auto">
                <p className="text-xs text-slate-600">Operational records for {activeDrawer} filtered for {branchData.name}.</p>
              </div>
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">Close</button>
              </div>
            </>
          )}

        </div>
      </div>

      {/* ======================================================== */}
      {/* MANDATORY CONFIRMATION MODAL BEFORE SENDING COMMUNICATIONS */}
      {/* ======================================================== */}
      {showConfirmSend && pendingCommunication && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-5 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-100 text-[#ff6900]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Confirm External Communication
                </h4>
                <p className="text-xs text-slate-500">
                  Transmit official healthcare agency notice
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div><strong>Recipient:</strong> {pendingCommunication.recipient}</div>
              <div><strong>Subject:</strong> {pendingCommunication.subject}</div>
              <div className="pt-1 border-t border-slate-200">
                <span className="font-semibold text-slate-800">Message Body:</span>
                <pre className="mt-1 p-2 bg-white rounded border border-slate-200 font-sans text-[11px] text-slate-700 whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {pendingCommunication.message}
                </pre>
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
              <strong>Confirmation Required:</strong> As an Agency Admin, verifying communications before dispatch prevents duplicate follow-ups and preserves state Case Management relationships.
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => {
                  setShowConfirmSend(false);
                  setPendingCommunication(null);
                }}
                className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAndSend}
                className="px-4 py-2 rounded-xl bg-[#3e6b2b] hover:bg-[#2a3d20] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm &amp; Send Notice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import {
  Radio,
  CheckCircle2,
  AlertTriangle,
  Send,
  MapPin,
  Clock,
  Code,
  ShieldCheck,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export function ColoradoEVVAggregatorView() {
  const { evvRecords, approveSelfCorrection, notify } = usePortal();
  const [selectedRecordId, setSelectedRecordId] = useState<string>(evvRecords[0]?.id || '');
  const [isTransmitting, setIsTransmitting] = useState(false);

  const selectedRecord = evvRecords.find((r) => r.id === selectedRecordId) || evvRecords[0];

  // Standard Colorado HCPF / Sandata EVV Open REST Payload Prototype
  const mockSandataPayload = {
    Aggregator: 'Colorado HCPF / Sandata Open REST EVV Aggregator (Standard MVP Specification)',
    PayerID: 'CO_MEDICAID_HCPF',
    ProviderInfo: {
      ProviderNPI: '1942289410',
      AgencyName: 'Mountain Lane & Colorado Home Health (LiliSare)',
      Program: selectedRecord.serviceType,
    },
    VisitDetails: {
      VisitID: selectedRecord.id,
      VisitDate: selectedRecord.date,
      CaregiverID: selectedRecord.caregiverId,
      CaregiverName: selectedRecord.caregiverName,
      ClientID: selectedRecord.clientId,
      ClientName: selectedRecord.clientName,
      ServiceCode: selectedRecord.serviceType === 'IHSS' ? 'T1019_IHSS' : 'G0299_RN',
      ScheduledTime: {
        Start: selectedRecord.scheduledStartTime,
        End: selectedRecord.scheduledEndTime,
      },
      ActualEVVUnits: {
        ClockInTime: selectedRecord.actualClockIn || '08:02 AM',
        ClockOutTime: selectedRecord.actualClockOut || 'Pending',
        DurationMinutes: selectedRecord.actualClockOut ? 240 : 0,
      },
      VerificationLocation: {
        Latitude: 39.7684,
        Longitude: -105.0482,
        GeofenceStatus: 'GPS_MATCHED_HOME_RESIDENCE',
        AccuracyMeters: 4.2,
      },
      ExceptionResolution: selectedRecord.caregiverSelfCorrection
        ? {
            HasCaregiverAdjustment: true,
            RequestedTime: selectedRecord.caregiverSelfCorrection.requestedTime,
            Reason: selectedRecord.caregiverSelfCorrection.reason,
            ApprovalStatus: selectedRecord.caregiverSelfCorrection.status,
            ReviewedBy: selectedRecord.caregiverSelfCorrection.reviewedBy || 'Danielle Brooks (QA)',
          }
        : null,
      AuditLog: {
        Hash: 'sha256-e8f9a01c34b82d77a',
        CreatedTimestamp: '2026-11-17T08:02:14-07:00',
        HIPAACompliantTransmission: true,
      },
    },
  };

  const handleSimulateTransmission = () => {
    setIsTransmitting(true);
    notify('Connecting to Colorado EVV Aggregator', 'Packaging REST payload and signing with SSL certificate...', 'info');
    setTimeout(() => {
      setIsTransmitting(false);
      notify('State EVV Aggregator Acknowledged', 'Status 200 OK: Visit batch matched and validated by Colorado HCPF.', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-primary-900 to-primary-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-secondary-200 mb-2">
              <Radio className="w-3.5 h-3.5 text-[#00d084] animate-pulse" />
              Colorado State EVV Aggregator Prototype (Sandata / HCPF Standard REST)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Electronic Visit Verification (EVV) Hub
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Open standard aggregator integration for Colorado Medicaid. Captures real-time clock-in/out, GPS geofence matching, and caregiver self-service exception resolution.
            </p>
          </div>

          <button
            onClick={handleSimulateTransmission}
            disabled={isTransmitting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00d084] hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${isTransmitting ? 'animate-spin' : ''}`} />
            {isTransmitting ? 'Transmitting...' : 'Send Live Test Payload'}
          </button>
        </div>
      </div>

      {/* Grid: Shift Exceptions & Sandata Payload Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: EVV Shifts Feed */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col h-[700px]">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">EVV Shift Transactions</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {evvRecords.length} Shifts Monitored
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 mt-3 pr-1">
            {evvRecords.map((record) => {
              const isSelected = record.id === selectedRecord.id;
              const hasException = record.evvStateStatus.includes('Exception');
              const isAdjusted = record.evvStateStatus === 'Adjusted by Caregiver';

              return (
                <div
                  key={record.id}
                  onClick={() => setSelectedRecordId(record.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary bg-primary-50/60 shadow-sm'
                      : 'border-slate-200/80 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{record.caregiverName}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Client: <strong>{record.clientName}</strong> ({record.serviceType})
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        hasException
                          ? 'bg-rose-100 text-rose-800'
                          : isAdjusted
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {record.evvStateStatus}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {record.actualClockIn || 'Pending'} – {record.actualClockOut || 'Missing'}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <MapPin className="w-3.5 h-3.5" /> GPS Geofenced
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Exception Resolver Callout */}
          {selectedRecord.caregiverSelfCorrection && (
            <div className="mt-3 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-amber-900">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Self-Correction Request
                </span>
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
                  {selectedRecord.caregiverSelfCorrection.status}
                </span>
              </div>
              <p className="text-amber-800 text-[11px] leading-snug">
                Reason: &ldquo;{selectedRecord.caregiverSelfCorrection.reason}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="font-semibold text-slate-700">
                  Requested Out: <strong>{selectedRecord.caregiverSelfCorrection.requestedTime}</strong>
                </span>
                {selectedRecord.caregiverSelfCorrection.status !== 'Approved' && (
                  <button
                    onClick={() => approveSelfCorrection(selectedRecord.id)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px]"
                  >
                    Approve & Reconcile
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Aggregator JSON Schema Inspector */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                Aggregator Outbound JSON Payload (Colorado HCPF Sandata Spec)
              </h3>
              <p className="text-xs text-slate-500">Live payload generated from active visit record</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              REST / JSON
            </span>
          </div>

          <div className="relative">
            <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-[550px] leading-relaxed border border-slate-800">
              {JSON.stringify(mockSandataPayload, null, 2)}
            </pre>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Cryptographically signed with SHA-256 for Colorado State Audit Trail
            </span>
            <span className="text-[11px] text-slate-400">Zero vendor lock-in</span>
          </div>
        </div>
      </div>
    </div>
  );
}

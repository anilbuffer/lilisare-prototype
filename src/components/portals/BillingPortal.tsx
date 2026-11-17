'use client';

import React from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { DollarSign, FileCheck, AlertTriangle, Send, CheckCircle2, Building, Shield } from 'lucide-react';

export function BillingPortal() {
  const { billingClaims, batchSubmitClaims, notify } = usePortal();

  const unsubmittedClaims = billingClaims.filter((c) => c.status === 'Ready for Batch' || c.status === 'Commercial Denial Pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-primary-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-200 mb-2">
            <DollarSign className="w-3.5 h-3.5 text-secondary" />
            Revenue Cycle & Medicaid NPI Claims Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Medicaid Billing & Claims Center
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 leading-relaxed">
            Dual-NPI billing routing for Mountain Lane (NPI 1) & Colorado Home Health (NPI 2). Automated commercial insurance denial letter management and EVV-verified payroll reconciliation.
          </p>
        </div>
      </div>

      {/* Claims Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Colorado Medicaid Claims Queue</h3>
            <p className="text-xs text-slate-500">Transmits verified EVV units to Health First Colorado (HCPF)</p>
          </div>

          <button
            onClick={() => batchSubmitClaims(billingClaims.map((c) => c.id))}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-600 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            <Send className="w-4 h-4" />
            Transmit Verified Claims Batch
          </button>
        </div>

        {/* Claims Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200">
              <tr>
                <th className="py-3 px-3">Claim ID</th>
                <th className="py-3 px-3">Client</th>
                <th className="py-3 px-3">Provider NPI</th>
                <th className="py-3 px-3">Service & Units</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Commercial Denial Status</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {billingClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">{claim.claimId}</td>
                  <td className="py-3.5 px-3 font-semibold text-slate-900">{claim.clientName}</td>
                  <td className="py-3.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px]">
                      {claim.billingProviderNPI}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-800">{claim.serviceType}</span> ({claim.billingUnits} units)
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">${claim.totalBilled.toFixed(2)}</td>
                  <td className="py-3.5 px-3">
                    {claim.requiresCommercialDenialFirst ? (
                      claim.denialLetterAttached ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Letter Attached
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                          <AlertTriangle className="w-3.5 h-3.5" /> Awaiting Denial Letter
                        </span>
                      )
                    ) : (
                      <span className="text-[11px] text-slate-400">Direct Medicaid</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        claim.status === 'Adjudicated - Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : claim.status === 'Transmitted to State'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {claim.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() =>
                        notify('Claim Inspected', `Verified EVV audit payload for ${claim.claimId}.`, 'info')
                      }
                      className="text-primary hover:underline font-bold text-xs"
                    >
                      Audit Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

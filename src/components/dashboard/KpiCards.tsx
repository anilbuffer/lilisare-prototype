'use client';

import React from 'react';
import { BranchData, DashboardTabId } from './dashboard-data';

interface KpiCardsProps {
  branchData: BranchData;
  domain?: DashboardTabId | 'top-summary';
  onOpenKpiDrawer?: (kpiId: string) => void;
}

export function KpiCards({ branchData, domain = 'top-summary', onOpenKpiDrawer }: KpiCardsProps) {
  const { kpis } = branchData;

  const getCardsForDomain = () => {
    switch (domain) {
      case 'compliance':
        return [
          {
            id: 'credentials-expiring',
            drawerTarget: 'expired-credentials',
            label: 'CREDENTIALS EXPIRING',
            value: 41,
            subtext: '8 expired now',
            hasDot: true,
            dotColor: 'bg-rose-500',
            isSelected: false,
          },
          {
            id: 'overdue-auths',
            drawerTarget: 'kpi-authorizations',
            label: 'OVERDUE AUTHORIZATIONS',
            value: 6,
            subtext: 'Payment at risk',
            hasDot: true,
            dotColor: 'bg-rose-500',
            isSelected: false,
          },
          {
            id: 'notes-awaiting-audit',
            drawerTarget: 'care-notes',
            label: 'NOTES AWAITING AUDIT',
            value: 26,
            subtext: 'AI suggestions ready',
            hasDot: true,
            dotColor: 'bg-amber-500',
            isSelected: false,
          },
          {
            id: 'evv-exceptions',
            drawerTarget: 'evv-exceptions',
            label: 'EVV EXCEPTIONS',
            value: 14,
            subtext: '7 self-correct pending',
            hasDot: true,
            dotColor: 'bg-amber-500',
            isSelected: false,
          },
          {
            id: 'supervisory-visits',
            drawerTarget: 'all-notifications',
            label: 'SUPERVISORY VISITS',
            value: '278/310',
            subtext: '90% on track',
            hasDot: false,
            isSelected: false,
          },
        ];

      case 'scheduler':
        return [
          {
            id: 'unfilled-shifts',
            drawerTarget: 'staffing',
            label: 'UNFILLED SHIFTS',
            value: 8,
            subtext: '5 urgent ≤48h',
            hasDot: true,
            dotColor: 'bg-rose-500',
            isSelected: false,
          },
          {
            id: 'evv-compliance',
            drawerTarget: 'evv-exceptions',
            label: 'EVV COMPLIANCE',
            value: '96.4%',
            subtext: 'Target: 95.0%',
            hasDot: false,
            isSelected: false,
          },
          {
            id: 'unverified-hours',
            drawerTarget: 'evv-exceptions',
            label: 'UNVERIFIED HOURS',
            value: '42.5h',
            subtext: '~$935.00 cost impact',
            hasDot: true,
            dotColor: 'bg-amber-500',
            isSelected: false,
          },
          {
            id: 'caregivers-near-ot',
            drawerTarget: 'staffing',
            label: 'CAREGIVERS NEAR OT',
            value: 14,
            subtext: '37-39.5 hrs logged',
            hasDot: true,
            dotColor: 'bg-amber-500',
            isSelected: false,
          },
          {
            id: 'completed-visits',
            drawerTarget: 'evv-exceptions',
            label: 'COMPLETED VISITS',
            value: 412,
            subtext: 'This pay period',
            hasDot: false,
            isSelected: false,
          },
        ];

      case 'onboarding':
        return [
          {
            id: 'active-caregivers',
            drawerTarget: 'kpi-caregivers',
            label: 'ACTIVE CAREGIVERS',
            value: 902,
            subtext: '38 in onboarding',
            hasDot: false,
            isSelected: false,
          },
          {
            id: 'households-stuck',
            drawerTarget: 'stuck-households',
            label: 'HOUSEHOLDS STUCK',
            value: 11,
            subtext: '> 5 days delayed',
            hasDot: true,
            dotColor: 'bg-amber-500',
            isSelected: false,
          },
          {
            id: 'inquiries-pipeline',
            drawerTarget: 'kpi-clients',
            label: 'INQUIRIES PIPELINE',
            value: 78,
            subtext: '24 new leads',
            hasDot: false,
            isSelected: false,
          },
          {
            id: 'background-checks',
            drawerTarget: 'screening-flags',
            label: 'BACKGROUND CHECKS',
            value: 77,
            subtext: '3 flagged for review',
            hasDot: true,
            dotColor: 'bg-rose-500',
            isSelected: false,
          },
          {
            id: 'activation',
            drawerTarget: 'kpi-caregivers',
            label: 'ACTIVATION',
            value: '7 days',
            subtext: 'Current avg',
            hasDot: false,
            isSelected: false,
          },
        ];

      case 'billing':
        return [
          {
            id: 'billed-amount',
            drawerTarget: 'kpi-authorizations',
            label: 'BILLED AMOUNT',
            value: '$184k',
            subtext: '712 claims paid',
            hasDot: false,
            isSelected: false,
          },
          {
            id: 'unbilled-amount',
            drawerTarget: 'kpi-authorizations',
            label: 'UNBILLED AMOUNT',
            value: '$28.5k',
            subtext: 'Awaiting notes / EVV',
            hasDot: true,
            dotColor: 'bg-amber-500',
            isSelected: false,
          },
          {
            id: 'denied-claims',
            drawerTarget: 'kpi-authorizations',
            label: 'DENIED CLAIMS',
            value: '$8.9k',
            subtext: '3 claims to appeal',
            hasDot: true,
            dotColor: 'bg-rose-500',
            isSelected: false,
          },
          {
            id: 'auths-unapproved',
            drawerTarget: 'unapproved-shifts',
            label: 'AUTHS WITHOUT APPROVAL',
            value: 6,
            subtext: '$14,200 at risk',
            hasDot: true,
            dotColor: 'bg-rose-500',
            isSelected: false,
          },
          {
            id: 'payroll-ready',
            drawerTarget: 'staffing',
            label: 'ADP PAYROLL READY',
            value: '$246k',
            subtext: '6 exceptions to clear',
            hasDot: false,
            isSelected: false,
          },
        ];

      case 'top-summary':
      case 'executive':
      default:
        // 5 Brand-Defined Top Stats Cards matching Reference Screenshot exactly
        return [
          {
            id: 'active-clients',
            drawerTarget: 'kpi-clients',
            label: 'ACTIVE CLIENTS',
            value: kpis?.activeClients?.value ?? 487,
            subtext: kpis?.activeClients?.change ?? '+12 this month',
            hasDot: false,
            isSelected: true, // Subtle green border outline matching screenshot
          },
          {
            id: 'active-caregivers',
            drawerTarget: 'kpi-caregivers',
            label: 'ACTIVE CAREGIVERS',
            value: kpis?.activeCaregivers?.value ?? 902,
            subtext: kpis?.activeCaregivers?.subtext ?? '38 in onboarding',
            hasDot: false,
            isSelected: false,
          },
          {
            id: 'pending-authorizations',
            drawerTarget: 'kpi-authorizations',
            label: 'PENDING AUTHORIZATIONS',
            value: kpis?.pendingAuthorizations?.value ?? 23,
            subtext: '6 overdue',
            hasDot: true,
            dotColor: 'bg-rose-500',
            isSelected: false,
          },
          {
            id: 'credentials-expiring',
            drawerTarget: 'expired-credentials',
            label: 'CREDENTIALS EXPIRING',
            value: kpis?.credentialsExpiring?.value ?? 41,
            subtext: '8 expired',
            hasDot: true,
            dotColor: 'bg-rose-500',
            isSelected: false,
          },
          {
            id: 'households-stuck',
            drawerTarget: 'stuck-households',
            label: 'HOUSEHOLDS STUCK',
            value: kpis?.householdsStuck?.value ?? 11,
            subtext: '> 5 days delayed',
            hasDot: true,
            dotColor: 'bg-amber-500',
            isSelected: false,
          },
        ];
    }
  };

  const cards = getCardsForDomain();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5 w-full">
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          onClick={() => onOpenKpiDrawer?.(card.drawerTarget)}
          className={`bg-white rounded-2xl p-4 sm:p-5 border text-left cursor-pointer transition-all duration-150 hover:-translate-y-0.5 shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_4px_12px_0_rgba(15,23,42,0.02)] ${
            card.isSelected
              ? 'border-[#3e6b2b] ring-1 ring-[#3e6b2b]/40 shadow-xs'
              : 'border-slate-200/90 hover:border-slate-300'
          }`}
        >
          <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate block">
            {card.label}
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none mt-2.5 mb-2 font-sans">
            {card.value}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            {card.hasDot && (
              <span className={`w-2 h-2 rounded-full ${card.dotColor || 'bg-rose-500'} shrink-0`} />
            )}
            <span className="truncate">{card.subtext}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

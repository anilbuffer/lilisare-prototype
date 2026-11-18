'use client';

import React from 'react';
import { BranchData, DashboardTabId } from './dashboard-data';
import {
  Users,
  HeartHandshake,
  FileClock,
  ShieldAlert,
  Home,
  Layers,
  ShieldCheck,
  Clock,
  FileText,
  UserCheck,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from 'lucide-react';

interface KpiCardsProps {
  branchData: BranchData;
  domain?: DashboardTabId;
  onOpenKpiDrawer?: (kpiId: string) => void;
}

export function KpiCards({ branchData, domain = 'executive', onOpenKpiDrawer }: KpiCardsProps) {
  const { kpis } = branchData;

  const getCardsForDomain = () => {
    switch (domain) {
      case 'onboarding':
        return [
          {
            id: 'caregivers',
            label: 'ACTIVE CAREGIVERS',
            value: '902',
            subtext: '38 in pipeline',
            subtextColor: 'text-slate-500',
            hasDot: false,
            icon: HeartHandshake,
            iconColor: 'text-[#3e6b2b]',
            iconBg: 'bg-emerald-50 border border-emerald-200/70',
            accentHover: 'hover:border-[#3e6b2b]',
          },
          {
            id: 'households',
            label: 'STUCK IN ONBOARDING',
            value: '11',
            subtext: '>5 days delayed',
            subtextColor: 'text-amber-800 font-bold',
            hasDot: true,
            dotColor: 'bg-amber-500',
            icon: Home,
            iconColor: 'text-[#d97706]',
            iconBg: 'bg-amber-50 border border-amber-200/70',
            accentHover: 'hover:border-amber-400',
          },
          {
            id: 'pipeline',
            label: 'INQUIRIES PIPELINE',
            value: '78',
            subtext: '24 new leads',
            subtextColor: 'text-slate-500',
            hasDot: false,
            icon: Layers,
            iconColor: 'text-[#3e6b2b]',
            iconBg: 'bg-emerald-50 border border-emerald-200/70',
            accentHover: 'hover:border-[#3e6b2b]',
          },
          {
            id: 'screening',
            label: 'BACKGROUND CHECKS',
            value: '77',
            subtext: '3 flagged for review',
            subtextColor: 'text-rose-700 font-bold',
            hasDot: true,
            dotColor: 'bg-rose-500',
            icon: ShieldCheck,
            iconColor: 'text-[#e04f32]',
            iconBg: 'bg-rose-50 border border-rose-200/70',
            accentHover: 'hover:border-rose-400',
          },
          {
            id: 'activation',
            label: 'ACTIVATION',
            value: '7 days',
            subtext: 'Current avg',
            subtextColor: 'text-slate-500',
            hasDot: false,
            icon: Clock,
            iconColor: 'text-[#3e6b2b]',
            iconBg: 'bg-emerald-50 border border-emerald-200/70',
            accentHover: 'hover:border-[#3e6b2b]',
          },
        ];

      case 'compliance':
        return [
          {
            id: 'compliance',
            label: 'CREDENTIALS EXPIRING',
            value: '41',
            subtext: '8 expired now',
            subtextColor: 'text-rose-700 font-bold',
            hasDot: true,
            dotColor: 'bg-rose-500',
            icon: ShieldAlert,
            iconColor: 'text-[#e04f32]',
            iconBg: 'bg-rose-50 border border-rose-200/70',
            accentHover: 'hover:border-rose-400',
          },
          {
            id: 'authorizations',
            label: 'OVERDUE AUTHORIZATIONS',
            value: '6',
            subtext: 'Payment at risk',
            subtextColor: 'text-rose-700 font-bold',
            hasDot: true,
            dotColor: 'bg-rose-500',
            icon: FileClock,
            iconColor: 'text-[#e04f32]',
            iconBg: 'bg-rose-50 border border-rose-200/70',
            accentHover: 'hover:border-rose-400',
          },
          {
            id: 'care-notes',
            label: 'NOTES AWAITING AUDIT',
            value: '26',
            subtext: 'AI suggestions ready',
            subtextColor: 'text-amber-800 font-bold',
            hasDot: true,
            dotColor: 'bg-amber-500',
            icon: FileText,
            iconColor: 'text-[#d97706]',
            iconBg: 'bg-amber-50 border border-amber-200/70',
            accentHover: 'hover:border-amber-400',
          },
          {
            id: 'evv-exceptions',
            label: 'EVV EXCEPTIONS',
            value: '14',
            subtext: '7 self-correct pending',
            subtextColor: 'text-amber-800 font-bold',
            hasDot: true,
            dotColor: 'bg-amber-500',
            icon: Clock,
            iconColor: 'text-[#d97706]',
            iconBg: 'bg-amber-50 border border-amber-200/70',
            accentHover: 'hover:border-amber-400',
          },
          {
            id: 'supervisory-visits',
            label: 'SUPERVISORY VISITS',
            value: '278/310',
            subtext: '90% on track',
            subtextColor: 'text-emerald-700 font-bold',
            hasDot: false,
            icon: UserCheck,
            iconColor: 'text-[#3e6b2b]',
            iconBg: 'bg-emerald-50 border border-emerald-200/70',
            accentHover: 'hover:border-[#3e6b2b]',
          },
        ];

      case 'billing':
        return [
          {
            id: 'billed-amount',
            label: 'BILLED AMOUNT',
            value: '$184k',
            subtext: '712 claims paid',
            subtextColor: 'text-slate-500',
            hasDot: false,
            icon: DollarSign,
            iconColor: 'text-[#3e6b2b]',
            iconBg: 'bg-emerald-50 border border-emerald-200/70',
            accentHover: 'hover:border-[#3e6b2b]',
          },
          {
            id: 'unbilled-amount',
            label: 'UNBILLED AMOUNT',
            value: '$28.5k',
            subtext: 'Awaiting notes / EVV',
            subtextColor: 'text-amber-800 font-bold',
            hasDot: true,
            dotColor: 'bg-amber-500',
            icon: Clock,
            iconColor: 'text-[#d97706]',
            iconBg: 'bg-amber-50 border border-amber-200/70',
            accentHover: 'hover:border-amber-400',
          },
          {
            id: 'denied-claims',
            label: 'DENIED CLAIMS',
            value: '$8.9k',
            subtext: '3 claims to appeal',
            subtextColor: 'text-rose-700 font-bold',
            hasDot: true,
            dotColor: 'bg-rose-500',
            icon: AlertTriangle,
            iconColor: 'text-[#e04f32]',
            iconBg: 'bg-rose-50 border border-rose-200/70',
            accentHover: 'hover:border-rose-400',
          },
          {
            id: 'auths-unapproved',
            label: 'AUTHS WITHOUT APPROVAL',
            value: '6',
            subtext: '$14,200 at risk',
            subtextColor: 'text-rose-700 font-bold',
            hasDot: true,
            dotColor: 'bg-rose-500',
            icon: ShieldAlert,
            iconColor: 'text-[#e04f32]',
            iconBg: 'bg-rose-50 border border-rose-200/70',
            accentHover: 'hover:border-rose-400',
          },
          {
            id: 'payroll-ready',
            label: 'ADP PAYROLL READY',
            value: '$246k',
            subtext: '6 exceptions to clear',
            subtextColor: 'text-slate-500',
            hasDot: false,
            icon: CheckCircle2,
            iconColor: 'text-[#3e6b2b]',
            iconBg: 'bg-emerald-50 border border-emerald-200/70',
            accentHover: 'hover:border-[#3e6b2b]',
          },
        ];

      case 'scheduler':
        return [
          {
            id: 'unfilled-shifts',
            label: 'UNFILLED SHIFTS',
            value: '8',
            subtext: '5 urgent ≤48h',
            subtextColor: 'text-rose-700 font-bold',
            hasDot: true,
            dotColor: 'bg-rose-500',
            icon: AlertCircle,
            iconColor: 'text-[#e04f32]',
            iconBg: 'bg-rose-50 border border-rose-200/70',
            accentHover: 'hover:border-rose-400',
          },
          {
            id: 'evv-compliance',
            label: 'EVV COMPLIANCE',
            value: '96.4%',
            subtext: 'Target: 95.0%',
            subtextColor: 'text-slate-500',
            hasDot: false,
            icon: CheckCircle2,
            iconColor: 'text-[#3e6b2b]',
            iconBg: 'bg-emerald-50 border border-emerald-200/70',
            accentHover: 'hover:border-[#3e6b2b]',
          },
          {
            id: 'unverified-hours',
            label: 'UNVERIFIED HOURS',
            value: '42.5h',
            subtext: '-$935.00 cost impact',
            subtextColor: 'text-amber-800 font-bold',
            hasDot: true,
            dotColor: 'bg-amber-500',
            icon: Clock,
            iconColor: 'text-[#d97706]',
            iconBg: 'bg-amber-50 border border-amber-200/70',
            accentHover: 'hover:border-amber-400',
          },
          {
            id: 'near-ot',
            label: 'CAREGIVERS NEAR OT',
            value: '14',
            subtext: '37-39.5 hrs logged',
            subtextColor: 'text-amber-800 font-bold',
            hasDot: true,
            dotColor: 'bg-amber-500',
            icon: Users,
            iconColor: 'text-[#d97706]',
            iconBg: 'bg-amber-50 border border-amber-200/70',
            accentHover: 'hover:border-amber-400',
          },
          {
            id: 'completed-visits',
            label: 'COMPLETED VISITS',
            value: '412',
            subtext: 'This pay period',
            subtextColor: 'text-slate-500',
            hasDot: false,
            icon: Calendar,
            iconColor: 'text-[#3e6b2b]',
            iconBg: 'bg-emerald-50 border border-emerald-200/70',
            accentHover: 'hover:border-[#3e6b2b]',
          },
        ];

      case 'executive':
      default:
        return [
          {
            id: 'clients',
            label: 'ACTIVE CLIENTS',
            value: kpis.activeClients.value,
            subtext: kpis.activeClients.change,
            subtextColor: 'text-emerald-700',
            hasDot: false,
            icon: Users,
            iconColor: 'text-[#3e6b2b]',
            iconBg: 'bg-emerald-50 border border-emerald-200/70',
            accentHover: 'hover:border-[#3e6b2b]',
          },
          {
            id: 'caregivers',
            label: 'ACTIVE CAREGIVERS',
            value: kpis.activeCaregivers.value,
            subtext: kpis.activeCaregivers.subtext,
            subtextColor: 'text-slate-500',
            hasDot: false,
            icon: HeartHandshake,
            iconColor: 'text-[#3e6b2b]',
            iconBg: 'bg-emerald-50 border border-emerald-200/70',
            accentHover: 'hover:border-[#3e6b2b]',
          },
          {
            id: 'authorizations',
            label: 'PENDING AUTHORIZATIONS',
            value: kpis.pendingAuthorizations.value,
            subtext: '6 overdue',
            subtextColor: 'text-rose-700 font-bold',
            hasDot: true,
            dotColor: 'bg-rose-500',
            icon: FileClock,
            iconColor: 'text-[#e04f32]',
            iconBg: 'bg-rose-50 border border-rose-200/70',
            accentHover: 'hover:border-rose-400',
          },
          {
            id: 'compliance',
            label: 'CREDENTIALS EXPIRING',
            value: kpis.credentialsExpiring.value,
            subtext: '8 expired',
            subtextColor: 'text-rose-700 font-bold',
            hasDot: true,
            dotColor: 'bg-rose-500',
            icon: ShieldAlert,
            iconColor: 'text-[#e04f32]',
            iconBg: 'bg-rose-50 border border-rose-200/70',
            accentHover: 'hover:border-rose-400',
          },
          {
            id: 'households',
            label: 'HOUSEHOLDS STUCK',
            value: kpis.householdsStuck.value,
            subtext: '>5 days delayed',
            subtextColor: 'text-amber-800 font-bold',
            hasDot: true,
            dotColor: 'bg-amber-500',
            icon: Home,
            iconColor: 'text-[#d97706]',
            iconBg: 'bg-amber-50 border border-amber-200/70',
            accentHover: 'hover:border-amber-400',
          },
        ];
    }
  };

  const cards = getCardsForDomain();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onOpenKpiDrawer?.(card.id)}
            className={`bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md transition-all duration-200 text-left cursor-pointer group flex flex-col justify-between ${card.accentHover} hover:-translate-y-0.5 relative overflow-hidden`}
          >
            <div>
              <div className="flex items-center justify-between gap-1.5 mb-2">
                <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate block">
                  {card.label}
                </span>
                <div
                  className={`w-8 h-8 rounded-full ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
                {card.value}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100/90 flex items-center gap-1.5">
              {card.hasDot && (
                <span className={`w-1.5 h-1.5 rounded-full ${card.dotColor || 'bg-rose-500'} shrink-0`} />
              )}
              <span className={`text-xs ${card.subtextColor} font-medium truncate block`}>
                {card.subtext}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

'use client';

import React from 'react';
import { BranchData } from './dashboard-data';
import {
  Users,
  HeartHandshake,
  FileClock,
  ShieldAlert,
  Home,
} from 'lucide-react';

interface KpiCardsProps {
  branchData: BranchData;
  onOpenKpiDrawer: (kpiId: string) => void;
}

export function KpiCards({ branchData, onOpenKpiDrawer }: KpiCardsProps) {
  const { kpis } = branchData;

  const cards = [
    {
      id: 'clients',
      label: 'ACTIVE CLIENTS',
      value: kpis.activeClients.value,
      subtext: kpis.activeClients.change,
      subtextColor: 'text-emerald-700',
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
      icon: HeartHandshake,
      iconColor: 'text-[#3e6b2b]',
      iconBg: 'bg-emerald-50 border border-emerald-200/70',
      accentHover: 'hover:border-[#3e6b2b]',
    },
    {
      id: 'authorizations',
      label: 'PENDING AUTHORIZATIONS',
      value: kpis.pendingAuthorizations.value,
      subtext: kpis.pendingAuthorizations.subtext,
      subtextColor: 'text-amber-800 font-bold',
      icon: FileClock,
      iconColor: 'text-[#ff6900]',
      iconBg: 'bg-amber-50 border border-amber-200/70',
      accentHover: 'hover:border-[#F2B632]',
    },
    {
      id: 'compliance',
      label: 'CREDENTIALS EXPIRING',
      value: kpis.credentialsExpiring.value,
      subtext: kpis.credentialsExpiring.subtext,
      subtextColor: 'text-rose-700 font-bold',
      icon: ShieldAlert,
      iconColor: 'text-[#ff6900]',
      iconBg: 'bg-rose-50 border border-rose-200/70',
      accentHover: 'hover:border-rose-400',
    },
    {
      id: 'households',
      label: 'HOUSEHOLDS STUCK',
      value: kpis.householdsStuck.value,
      subtext: kpis.householdsStuck.subtext,
      subtextColor: 'text-amber-800 font-bold',
      icon: Home,
      iconColor: 'text-[#e04f32]',
      iconBg: 'bg-orange-50 border border-orange-200/70',
      accentHover: 'hover:border-[#ff6900]',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <button
            key={card.id}
            onClick={() => onOpenKpiDrawer(card.id)}
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

            <div className="mt-3 pt-2.5 border-t border-slate-100/90">
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

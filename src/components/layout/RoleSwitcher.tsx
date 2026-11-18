'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { UserRole } from '@/lib/types';
import {
  Building2,
  Award,
  Users,
  Stethoscope,
  ShieldCheck,
  Activity,
  HeartHandshake,
  ChevronDown,
} from 'lucide-react';

export interface SimulatedPersona {
  id: UserRole;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  title: string;
  desc: string;
}

export const SIMULATED_PERSONAS: SimulatedPersona[] = [
  {
    id: 'admin',
    label: 'Admin',
    icon: Building2,
    name: 'Sarah Jenkins',
    title: 'Executive Admin',
    desc: 'Full agency operations across Mountain Lane & Colorado Home Health',
  },
  {
    id: 'onboarding',
    label: 'Onboard',
    icon: Award,
    name: 'Danielle Brooks',
    title: 'Onboarding Lead',
    desc: 'Caregiver intake pipeline, 15/20 packets, CBI checks, ADP provisioning',
  },
  {
    id: 'enrollment',
    label: 'Intake',
    icon: Users,
    name: 'Maya Ramirez',
    title: 'Enrollment Specialist',
    desc: 'Client inquiry pipeline, CMA directory, case manager correspondence',
  },
  {
    id: 'clinical',
    label: 'Clinical',
    icon: Stethoscope,
    name: 'Rebecca Stern, BSN, RN',
    title: 'Clinical Supervisor',
    desc: '60-day in-home nurse evaluations, Form 485, AI care note audits',
  },
  {
    id: 'compliance',
    label: 'Comply',
    icon: ShieldCheck,
    name: 'Marcus Vance',
    title: 'Compliance Officer',
    desc: 'Credential lifecycles, 30/7-day renewal alerts, 7-year audit vault',
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: Activity,
    name: 'Alicia Torres',
    title: 'Medicaid Billing Specialist',
    desc: 'Dual-NPI claims routing, 837P batch engine, commercial denial letters',
  },
  {
    id: 'caregiver',
    label: 'Caregiver',
    icon: HeartHandshake,
    name: 'Elena Morales',
    title: 'Family Caregiver',
    desc: 'GPS-verified EVV shift clock in/out, time self-correction, AI notes',
  },
];

interface PersonaSimulatorProps {
  showTitle?: boolean;
  showCallout?: boolean;
  darkTheme?: boolean;
  onSelect?: () => void;
}

export function PersonaSimulator({
  showTitle = true,
  showCallout = false,
  darkTheme = false,
  onSelect,
}: PersonaSimulatorProps) {
  const { currentRole, switchRole, notify } = usePortal();

  const handleSelect = (id: UserRole, label: string, name: string, title: string) => {
    switchRole(id);
    onSelect?.();
    notify(
      'Persona Switched',
      `Simulating ${name} (${title}) · UI and permissions calibrated.`,
      'info'
    );
  };

  const activePersona =
    SIMULATED_PERSONAS.find((p) => p.id === currentRole) || SIMULATED_PERSONAS[0];

  return (
    <div className="space-y-1.5 select-none">
      {/* Title + 7 Roles Configured Badge (Exact match to reference image) */}
      {showTitle && (
        <div className="flex items-center justify-between gap-2 px-0.5">
          <label
            className={`text-xs font-bold uppercase tracking-wider ${darkTheme ? 'text-white/90' : 'text-slate-800'
              }`}
          >
            SELECT PERSONA TO SIMULATE
          </label>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${darkTheme
                ? 'text-emerald-300 bg-white/10 border-white/15'
                : 'text-[#3e6b2b] bg-emerald-50 border-emerald-200'
              }`}
          >
            7 Roles Configured
          </span>
        </div>
      )}

      {/* 7 Segmented Buttons (Admin, Onboard, Intake, Clinical, Comply, Billing, Caregiver) */}
      <div
        className={`grid grid-cols-4 sm:grid-cols-7 gap-1 p-1 rounded-2xl border shadow-inner ${darkTheme
            ? 'bg-black/35 border-white/10'
            : 'bg-slate-100 border-slate-200/70'
          }`}
      >
        {SIMULATED_PERSONAS.map((item) => {
          const IconComponent = item.icon;
          const isSelected = currentRole === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id, item.label, item.name, item.title)}
              className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer flex flex-col items-center gap-1 ${isSelected
                  ? darkTheme
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'bg-white text-slate-900 shadow-xs ring-1 ring-[#3e6b2b]/30'
                  : darkTheme
                    ? 'text-white/70 hover:text-white hover:bg-white/10 font-medium'
                    : 'text-slate-500 hover:text-slate-900 font-medium'
                }`}
              title={`${item.name} (${item.title}) — ${item.desc}`}
            >
              <IconComponent
                className={`w-3.5 h-3.5 ${isSelected
                    ? 'text-[#3e6b2b]'
                    : darkTheme
                      ? 'text-white/60'
                      : 'text-slate-400'
                  }`}
              />
              <span className="text-[10px] leading-none truncate w-full">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Persona Callout Card */}
      {showCallout && (
        <div
          className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 animate-in fade-in duration-150 ${darkTheme
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-slate-50 border-slate-200/80 text-slate-900'
            }`}
        >
          <div
            className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${darkTheme ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100/80 text-[#3e6b2b]'
              }`}
          >
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className={`font-bold leading-tight ${darkTheme ? 'text-white' : 'text-slate-900'}`}>
              {activePersona.name}{' '}
              <span className={`font-normal ${darkTheme ? 'text-white/60' : 'text-slate-500'}`}>
                ({activePersona.title})
              </span>
            </p>
            <p
              className={`text-[11px] mt-0.5 leading-snug line-clamp-1 ${darkTheme ? 'text-emerald-300/80' : 'text-slate-500'
                }`}
            >
              {activePersona.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function RoleSwitcher() {
  const { currentRole } = usePortal();
  const [isOpen, setIsOpen] = useState(false);
  const activePersona =
    SIMULATED_PERSONAS.find((p) => p.id === currentRole) || SIMULATED_PERSONAS[0];
  const ActiveIcon = activePersona.icon;

  return (
    <>
      {/* 1. Large screens (>= xl): Direct inline horizontal bar matching reference image exactly */}
      <div className="hidden xl:block">
        <PersonaSimulator showTitle={true} showCallout={false} />
      </div>

      {/* 2. Medium screens (< xl): Compact Trigger Pill that opens popover card */}
      <div className="relative xl:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-white border border-slate-200/90 shadow-2xs text-left cursor-pointer transition-all"
        >
          <ActiveIcon className="w-3.5 h-3.5 text-[#3e6b2b]" />
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-800">{activePersona.label}</span>
            <span className="text-[9px] font-bold text-[#3e6b2b] bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
              7 Roles
            </span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''
              }`}
          />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 mt-2 w-96 max-w-[90vw] bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <PersonaSimulator
                showTitle={true}
                showCallout={true}
                onSelect={() => setIsOpen(false)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

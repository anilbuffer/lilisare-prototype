'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { UserRole } from '@/lib/types';
import { ShieldCheck, ChevronDown, Check, UserCheck, Stethoscope, FileText, DollarSign, HeartHandshake, Settings, Sparkles } from 'lucide-react';

const roleIcons: Record<UserRole, React.ReactNode> = {
  enrollment: <FileText className="w-3.5 h-3.5 text-emerald-700" />,
  onboarding: <UserCheck className="w-3.5 h-3.5 text-[#3e6b2b]" />,
  clinical: <Stethoscope className="w-3.5 h-3.5 text-teal-600" />,
  compliance: <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />,
  billing: <DollarSign className="w-3.5 h-3.5 text-[#F2B632]" />,
  caregiver: <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />,
  admin: <Settings className="w-3.5 h-3.5 text-slate-700" />,
};

export function RoleSwitcher() {
  const { currentRole, currentRoleConfig, switchRole, roles, notify } = usePortal();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs hover:border-[#3e6b2b]/50 hover:bg-slate-50 transition-all text-left group cursor-pointer"
        aria-label="Switch Role Perspective"
      >
        <div className="relative shrink-0">
          <img
            src={currentRoleConfig.avatar}
            alt={currentRoleConfig.label}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all"
          />
          <span className="absolute -bottom-0.5 -right-0.5 bg-white p-0.5 rounded-full shadow-xs">
            {roleIcons[currentRole]}
          </span>
        </div>
        <div className="hidden sm:block min-w-0 pr-1">
          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 leading-tight">
            <span className="truncate max-w-[130px]">{currentRoleConfig.userName || currentRoleConfig.label}</span>
            <span className="text-[9px] uppercase font-black tracking-wider px-1.5 py-0.2 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80 shrink-0">
              {currentRoleConfig.badgeLabel || 'ROLE'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium truncate max-w-[140px] leading-tight mt-0.5">
            {currentRoleConfig.userTitle || currentRoleConfig.department}
          </p>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#3e6b2b]" />
                <p className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Switch Portal Persona
                </p>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Simulate role-specific UI, HIPAA data isolation, and authorized actions
              </p>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-1 py-1">
              {roles.map((r) => {
                const isSelected = r.id === currentRole;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      switchRole(r.id);
                      setIsOpen(false);
                      notify(
                        'Persona Switched',
                        `Switched to ${r.userName || r.label} (${r.label}). Navigation and data boundaries calibrated.`,
                        'info'
                      );
                    }}
                    className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/70 border border-emerald-200 text-emerald-950 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <img
                      src={r.avatar}
                      alt={r.label}
                      className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          {roleIcons[r.id]}
                          {r.userName || r.label}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#3e6b2b] shrink-0" />}
                      </div>
                      <p className="text-[11px] font-semibold text-[#3e6b2b] mt-0.5">
                        {r.label} • {r.department}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {r.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="px-3 py-2 mt-1 bg-slate-50 rounded-xl border border-slate-100 text-[10px] text-slate-600 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3e6b2b] shrink-0" />
              <span>HIPAA compliance &amp; role-based access enforced in real time.</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

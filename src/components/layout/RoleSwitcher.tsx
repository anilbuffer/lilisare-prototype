'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { UserRole } from '@/lib/types';
import { ShieldCheck, ChevronDown, Check, UserCheck, Stethoscope, FileText, DollarSign, HeartHandshake, Settings } from 'lucide-react';

const roleIcons: Record<UserRole, React.ReactNode> = {
  enrollment: <FileText className="w-4 h-4 text-emerald-700" />,
  onboarding: <UserCheck className="w-4 h-4 text-[#3e6b2b]" />,
  clinical: <Stethoscope className="w-4 h-4 text-teal-600" />,
  compliance: <ShieldCheck className="w-4 h-4 text-amber-600" />,
  billing: <DollarSign className="w-4 h-4 text-[#F2B632]" />,
  caregiver: <HeartHandshake className="w-4 h-4 text-rose-600" />,
  admin: <Settings className="w-4 h-4 text-slate-700" />,
};

export function RoleSwitcher() {
  const { currentRole, currentRoleConfig, switchRole, roles } = usePortal();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:border-primary/50 hover:bg-slate-50 transition-all duration-200 text-left group"
        aria-label="Switch Role View"
      >
        <div className="relative">
          <img
            src={currentRoleConfig.avatar}
            alt={currentRoleConfig.label}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
          />
          <span className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow">
            {roleIcons[currentRole]}
          </span>
        </div>
        <div className="hidden sm:block">
          <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
            {currentRoleConfig.label}
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary-100 text-primary-800">
              Role
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium truncate max-w-[150px]">
            {currentRoleConfig.department}
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-slate-100 mb-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Switch Portal Perspective
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Simulate role-specific UI, data isolation & action authorization
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
                    }}
                    className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors ${
                      isSelected
                        ? 'bg-primary-50/80 border border-primary-200 text-primary-900'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <img
                      src={r.avatar}
                      alt={r.label}
                      className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                          {roleIcons[r.id]}
                          {r.label}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
                      </div>
                      <p className="text-[11px] font-medium text-primary-700 mt-0.5">{r.department}</p>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {r.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="px-3 py-2 mt-1 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>HIPAA BAA active. Role permissions enforced in view.</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

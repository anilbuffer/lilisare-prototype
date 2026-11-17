'use client';

import React from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { RoleSwitcher } from './RoleSwitcher';
import { Shield, Activity, Sparkles, UserCheck, Heart, Radio, Archive, LayoutDashboard } from 'lucide-react';

export function Header() {
  const { activeView, setActiveView } = usePortal();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 sm:px-6 py-2.5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Brand identity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3e6b2b] to-[#2a3d20] flex items-center justify-center text-white shadow-md shadow-primary/20 shrink-0">
              <span className="font-extrabold text-lg tracking-tight">LS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-[#14210e]">
                  LiliSare
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-900 border border-secondary-300">
                  <Sparkles className="w-3 h-3 text-[#F2B632]" />
                  LiliSphere
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Mountain Lane & Colorado Home Health
              </p>
            </div>
          </div>

          <div className="md:hidden">
            <RoleSwitcher />
          </div>
        </div>

        {/* Global Navigation Tabs (Interactive Roadmap & Modules) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 text-xs">
          <button
            onClick={() => setActiveView('portal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeView === 'portal'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Role Portals</span>
          </button>

          <button
            onClick={() => setActiveView('caregiver-flow')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeView === 'caregiver-flow'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Caregiver Journey (15 Steps)</span>
          </button>

          <button
            onClick={() => setActiveView('patient-flow')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeView === 'patient-flow'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Patient Flow (11 Steps)</span>
          </button>

          <button
            onClick={() => setActiveView('evv-aggregator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeView === 'evv-aggregator'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Colorado EVV Hub</span>
          </button>

          <button
            onClick={() => setActiveView('data-migration')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeView === 'data-migration'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>7-Yr Audit Vault</span>
          </button>
        </div>

        {/* Desktop Role switcher */}
        <div className="hidden md:flex items-center gap-2">
          <RoleSwitcher />
        </div>
      </div>
    </header>
  );
}

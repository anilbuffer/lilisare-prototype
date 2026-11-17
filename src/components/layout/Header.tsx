'use client';

import React from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { RoleSwitcher } from './RoleSwitcher';
import { Sparkles, UserCheck, Heart, Radio, Archive, LayoutDashboard, Compass } from 'lucide-react';

export function Header() {
  const { activeView, setActiveView } = usePortal();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-2.5 shadow-[0_1px_6px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Brand identity */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveView('landing')}
          >
            <img
              src="/images/lilisare-logo.png"
              alt="LiliSare - because we care"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
            <div className="hidden sm:block pl-2 border-l border-slate-200">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black tracking-tight text-slate-900">
                  LiliSphere Operations
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-900">
                  <Sparkles className="w-2.5 h-2.5 text-[#3e6b2b]" />
                  CO-HCPF
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                Mountain Lane &amp; Colorado Home Health
              </p>
            </div>
          </div>

          <div className="md:hidden">
            <RoleSwitcher />
          </div>
        </div>

        {/* Global Navigation Tabs (Clean, Professional, Non-Task Labels) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs scrollbar-none">
          <button
            onClick={() => setActiveView('landing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'landing'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F2B632]" />
            <span>Landing Page</span>
          </button>

          <button
            onClick={() => setActiveView('wizard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'wizard'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-[#00d084]" />
            <span>Onboarding Wizard</span>
          </button>

          <button
            onClick={() => setActiveView('portal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'portal'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-amber-500" />
            <span>Operations Portals</span>
          </button>

          <button
            onClick={() => setActiveView('caregiver-flow')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'caregiver-flow'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-teal-500" />
            <span>Caregiver Flow (15 Steps)</span>
          </button>

          <button
            onClick={() => setActiveView('patient-flow')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'patient-flow'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Patient Flow (11 Steps)</span>
          </button>

          <button
            onClick={() => setActiveView('evv-aggregator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'evv-aggregator'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-emerald-500" />
            <span>Colorado EVV Hub</span>
          </button>

          <button
            onClick={() => setActiveView('data-migration')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'data-migration'
                ? 'bg-primary text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Archive className="w-3.5 h-3.5 text-indigo-500" />
            <span>7-Year Data Vault</span>
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

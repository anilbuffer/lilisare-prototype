'use client';

import React from 'react';
import { RoleSwitcher } from './RoleSwitcher';
import { Shield, Activity, Radio, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3e6b2b] to-[#2a3d20] flex items-center justify-center text-white shadow-md shadow-primary/20">
            <span className="font-extrabold text-lg tracking-tight">LS</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight text-[#14210e]">
                LiliSare
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary-100 text-secondary-900 border border-secondary-300">
                <Sparkles className="w-3 h-3 text-[#F2B632]" />
                LiliSphere Platform
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Mountain Lane & Colorado Home Health Unified Portal
            </p>
          </div>
        </div>

        {/* System telemetry & Integration status (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-600 bg-slate-50/80 border border-slate-200/80 px-3 py-1.5 rounded-xl font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00d084] animate-pulse" />
            <span>CO EVV State: <strong>Online</strong></span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-primary" />
            <span>ADP Run / WFN: <strong>Connected</strong></span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 text-emerald-800">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span>BAA / HIPAA: <strong>Enforced</strong></span>
          </div>
        </div>

        {/* Role switcher & user profile */}
        <div className="flex items-center gap-2">
          <RoleSwitcher />
        </div>
      </div>
    </header>
  );
}

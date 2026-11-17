'use client';

import React from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { UserRole } from '@/lib/types';
import {
  Inbox,
  UserCheck,
  Stethoscope,
  ShieldCheck,
  DollarSign,
  HeartHandshake,
  Settings,
  Layers,
  FileText,
  Clock,
  MapPin,
  Calendar,
  Sparkles
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  allowedRoles: UserRole[];
}

export function Sidebar() {
  const { currentRole, switchRole, activeView, setActiveView } = usePortal();

  // Hide sidebar on the full-width marketing landing page
  if (activeView === 'landing') {
    return null;
  }

  const navigationItems: { role: UserRole; title: string; subtitle: string; icon: React.ReactNode }[] = [
    {
      role: 'onboarding',
      title: 'Caregiver Onboarding',
      subtitle: 'Packets, CBI & Activation',
      icon: <UserCheck className="w-4 h-4" />,
    },
    {
      role: 'caregiver',
      title: 'Caregiver Self-Service',
      subtitle: 'EVV Clock-In & AI Notes',
      icon: <HeartHandshake className="w-4 h-4 text-rose-600" />,
    },
    {
      role: 'enrollment',
      title: 'Intake & Referrals',
      subtitle: 'Leads & Case Managers',
      icon: <Inbox className="w-4 h-4 text-emerald-700" />,
    },
    {
      role: 'clinical',
      title: 'RN Clinical Supervision',
      subtitle: 'Nurse Visits & Audit',
      icon: <Stethoscope className="w-4 h-4 text-teal-600" />,
    },
    {
      role: 'compliance',
      title: 'Compliance & QA',
      subtitle: 'Expirations & Audit Log',
      icon: <ShieldCheck className="w-4 h-4 text-amber-600" />,
    },
    {
      role: 'billing',
      title: 'Billing & Claims',
      subtitle: 'Medicaid & NPI Routing',
      icon: <DollarSign className="w-4 h-4 text-secondary-600" />,
    },
    {
      role: 'admin',
      title: 'Enterprise Overview',
      subtitle: 'Executive Operations',
      icon: <Settings className="w-4 h-4 text-slate-700" />,
    },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200/80 p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
            Role-Scoped Perspectives
          </span>
          <p className="text-[11px] text-slate-500 px-3 mt-0.5 leading-snug">
            Each role view enforces strict permission boundaries
          </p>

          <nav className="mt-3 space-y-1">
            {navigationItems.map((item) => {
              const isActive = activeView === 'portal' && currentRole === item.role;
              return (
                <button
                  key={item.role}
                  onClick={() => {
                    setActiveView('portal');
                    switchRole(item.role);
                  }}
                  className={`w-full flex items-start gap-3 px-3 py-2 rounded-xl text-left transition-all ${isActive
                    ? 'bg-primary-50 text-primary-900 font-bold border border-primary-200/80 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                    }`}
                >
                  <span className={`mt-0.5 shrink-0 ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs leading-none">{item.title}</p>
                    <p className={`text-[10px] mt-1 truncate ${isActive ? 'text-primary-700' : 'text-slate-400'}`}>
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Core Journey Flow Maps */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
            Registration Wizards
          </span>
          <nav className="mt-2 space-y-1">
            <button
              onClick={() => setActiveView('patient-flow')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'patient-flow' || activeView === 'wizard'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
                Patient Register (8 Steps)
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeView === 'patient-flow' || activeView === 'wizard' ? 'bg-primary-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                8 Steps
              </span>
            </button>

            <button
              onClick={() => setActiveView('caregiver-flow')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'caregiver-flow'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                Caregiver Register (10 Steps)
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeView === 'caregiver-flow' ? 'bg-primary-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                10 Steps
              </span>
            </button>
          </nav>
        </div>

        {/* Operating Environment Specs */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/70 space-y-2 text-[11px] text-slate-600">
          <div className="flex items-center justify-between font-bold text-slate-700">
            <span>Operating Entities</span>
            <span className="text-primary font-mono text-[10px]">CO-HEALTH</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Mountain Lane • Colorado Home Health • Frisco Client Group
          </p>
          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
            <span>Active Caregivers:</span>
            <strong className="text-slate-900">914</strong>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span>Active Clients:</span>
            <strong className="text-slate-900">512</strong>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
        <span>LiliSphere OS v1.0</span>
        <span className="font-semibold text-emerald-700">HIPAA Certified</span>
      </div>
    </aside>
  );
}

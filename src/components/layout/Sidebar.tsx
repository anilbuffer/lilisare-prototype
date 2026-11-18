'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { usePortal } from '@/lib/store/portal-context';
import {
  Calendar,
  Layers,
  UserCheck,
  FileCheck2,
  Mail,
  Users,
  HeartHandshake,
  ShieldCheck,
  Clock,
  CheckSquare,
  DollarSign,
  TrendingUp,
  BarChart3,
  ChevronDown,
  Columns2,
  X,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const { switchRole, notify, applications } = usePortal();

  const pendingApplicationsCount = applications.filter(
    (a) => a.status === 'Pending Review' || a.status === 'In Verification'
  ).length;

  // Hide sidebar on the full-width marketing landing page or sign in page or registration wizard
  if (
    pathname === '/landing' ||
    pathname === '/login' ||
    pathname === '/registration' ||
    pathname.startsWith('/registration')
  ) {
    return null;
  }

  const workItems = [
    {
      id: 'today',
      label: 'Today',
      href: '/admin-portal/dashboard',
      icon: Calendar,
      isActive: pathname === '/admin-portal/dashboard' || pathname === '/admin-portal',
    },
    {
      id: 'intake-pipeline',
      label: 'Intake Pipeline',
      href: '/admin-portal/intake-pipeline',
      icon: Layers,
      isActive: pathname === '/admin-portal/intake-pipeline',
    },
    {
      id: 'onboarding',
      label: 'Onboarding & Approvals',
      href: '/admin-portal/onboarding',
      icon: UserCheck,
      badge: pendingApplicationsCount > 0 ? String(pendingApplicationsCount) : undefined,
      isActive: pathname === '/admin-portal/onboarding',
    },
    {
      id: 'note-audit',
      label: 'Note Audit',
      href: '/admin-portal/note-audit',
      icon: FileCheck2,
      badge: '24',
      isActive: pathname === '/admin-portal/note-audit',
    },
    {
      id: 'cm-emails',
      label: 'CM Emails',
      href: '/admin-portal/cm-emails',
      icon: Mail,
      badge: '7',
      isActive: pathname === '/admin-portal/cm-emails',
    },
  ];

  const peopleItems = [
    {
      id: 'clients',
      label: 'Clients',
      href: '/admin-portal/clients',
      icon: Users,
      isActive: pathname === '/admin-portal/clients',
    },
    {
      id: 'caregivers',
      label: 'Caregivers',
      href: '/admin-portal/caregivers',
      icon: HeartHandshake,
      isActive: pathname === '/admin-portal/caregivers',
    },
    {
      id: 'screening-center',
      label: 'Screening Center',
      href: '/admin-portal/screening-center',
      icon: ShieldCheck,
      isActive: pathname === '/admin-portal/screening-center',
    },
  ];

  const scheduleItems = [
    {
      id: 'scheduling-evv',
      label: 'Scheduling and EVV',
      href: '/admin-portal/scheduling-evv',
      icon: Clock,
      isActive: pathname === '/admin-portal/scheduling-evv',
    },
    {
      id: 'compliance',
      label: 'Compliance',
      href: '/admin-portal/compliance',
      icon: CheckSquare,
      isActive: pathname === '/admin-portal/compliance',
    },
  ];

  const businessItems = [
    {
      id: 'billing',
      label: 'Billing',
      href: '/admin-portal/billing',
      icon: DollarSign,
      isActive: pathname === '/admin-portal/billing',
    },
    {
      id: 'client-profitability',
      label: 'Client Profitability',
      href: '/admin-portal/client-profitability',
      icon: TrendingUp,
      isActive: pathname === '/admin-portal/client-profitability',
    },
    {
      id: 'reports',
      label: 'Reports',
      href: '/admin-portal/reports',
      icon: BarChart3,
      isActive: pathname === '/admin-portal/reports',
    },
  ];

  const renderNavContent = (isMobile: boolean) => (
    <>
      <div className="p-4 space-y-4 overflow-y-auto flex-1 scrollbar-thin relative z-10">
        {/* Top Brand Header (Official LiliSare Logo from Home Page) */}
        <div className="flex items-center justify-between pt-1 pb-2 px-1 border-b border-white/15">
          <Link
            href="/admin-portal/dashboard"
            onClick={() => {
              switchRole('admin');
              if (isMobile) onCloseMobile?.();
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="bg-white rounded-xl px-2.5 py-1.5 flex items-center justify-center shadow-xs border border-white/20 group-hover:scale-[1.02] transition-transform shrink-0">
              <img
                src="/images/lilisare-logo.png"
                alt="LiliSare"
                className="h-7 w-auto object-contain"
              />
            </div>
          </Link>

          <div className="flex items-center">
            {isMobile ? (
              <button
                type="button"
                onClick={onCloseMobile}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                title="Close Navigation"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => notify('Sidebar Toggle', 'Compact sidebar mode toggled.', 'info')}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer border border-white/15"
                title="Toggle Sidebar"
              >
                <Columns2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* GROUP 1: WORK                                            */}
        {/* ======================================================== */}
        <div className="space-y-1">
          <div className="px-3 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/90">
              WORK
            </span>
          </div>

          {workItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  if (isMobile) onCloseMobile?.();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-left cursor-pointer group ${item.isActive
                    ? 'font-bold bg-white text-slate-900 shadow-sm'
                    : 'font-medium text-emerald-50/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <IconComponent
                    className={`w-4 h-4 shrink-0 transition-colors ${item.isActive ? 'text-[#3e6b2b]' : 'text-emerald-200 group-hover:text-white'
                      }`}
                  />
                  <span className="text-[13px] truncate">{item.label}</span>
                </div>
                {item.isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d084] animate-pulse shrink-0" />
                )}
                {item.badge && !item.isActive && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#F2B632] text-slate-950 font-black text-[10px] leading-none shrink-0">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* GROUP 2: PEOPLE                                          */}
        {/* ======================================================== */}
        <div className="pt-1 space-y-1">
          <div className="px-3 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/90">
              PEOPLE
            </span>
          </div>

          {peopleItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  if (isMobile) onCloseMobile?.();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-left cursor-pointer group ${item.isActive
                    ? 'font-bold bg-white text-slate-900 shadow-sm'
                    : 'font-medium text-emerald-50/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <IconComponent
                    className={`w-4 h-4 shrink-0 transition-colors ${item.isActive ? 'text-[#3e6b2b]' : 'text-emerald-200 group-hover:text-white'
                      }`}
                  />
                  <span className="text-[13px] truncate">{item.label}</span>
                </div>
                {item.isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d084] animate-pulse shrink-0" />
                )}
              </Link>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* GROUP 3: SCHEDULE                                        */}
        {/* ======================================================== */}
        <div className="pt-1 space-y-1">
          <div className="px-3 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/90">
              SCHEDULE
            </span>
          </div>

          {scheduleItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  if (isMobile) onCloseMobile?.();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-left cursor-pointer group ${item.isActive
                    ? 'font-bold bg-white text-slate-900 shadow-sm'
                    : 'font-medium text-emerald-50/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <IconComponent
                    className={`w-4 h-4 shrink-0 transition-colors ${item.isActive ? 'text-[#3e6b2b]' : 'text-emerald-200 group-hover:text-white'
                      }`}
                  />
                  <span className="text-[13px] truncate">{item.label}</span>
                </div>
                {item.isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d084] animate-pulse shrink-0" />
                )}
              </Link>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* GROUP 4: BUSINESS                                        */}
        {/* ======================================================== */}
        <div className="pt-1 space-y-1">
          <div className="px-3 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/90">
              BUSINESS
            </span>
          </div>

          {businessItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  if (isMobile) onCloseMobile?.();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-left cursor-pointer group ${item.isActive
                    ? 'font-bold bg-white text-slate-900 shadow-sm'
                    : 'font-medium text-emerald-50/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <IconComponent
                    className={`w-4 h-4 shrink-0 transition-colors ${item.isActive ? 'text-[#3e6b2b]' : 'text-emerald-200 group-hover:text-white'
                      }`}
                  />
                  <span className="text-[13px] truncate">{item.label}</span>
                </div>
                {item.isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d084] animate-pulse shrink-0" />
                )}
              </Link>
            );
          })}
        </div>

        {/* HIPAA COMPLIANT BADGE */}
        <div className="pt-2">
          <div className="p-3 rounded-2xl bg-black/20 backdrop-blur-xs border border-white/15 flex items-start gap-2.5 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-[#00d084] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-xs text-white leading-tight">HIPAA Compliant</p>
              <p className="text-[10px] text-emerald-100/85 mt-0.5 leading-snug">
                Data encrypted in transit &amp; at rest.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* USER PROFILE FOOTER */}
      <Link
        href="/login"
        onClick={() => {
          if (isMobile) onCloseMobile?.();
        }}
        className="p-3.5 border-t border-white/15 bg-black/25 flex items-center justify-between cursor-pointer hover:bg-black/35 transition-colors relative z-10"
        title="Click to Sign Out"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-white text-[#3e6b2b] border border-white/30 flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
            AD
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">Admin Demo</p>
            <p className="text-[10px] font-semibold text-emerald-200 tracking-wider">LISA • ADMIN</p>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-emerald-200/80 shrink-0" />
      </Link>
    </>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Screens >= md) */}
      <aside className="w-60 lg:w-64 h-full shrink-0 bg-gradient-to-b from-[#55823a] via-[#436c2a] to-[#2b4919] text-white flex flex-col justify-between hidden md:flex border-r border-[#243e15] select-none shadow-2xl relative z-30 overflow-hidden">
        {renderNavContent(false)}
      </aside>

      {/* Mobile Slide-Over Drawer (Screens < md) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full bg-gradient-to-b from-[#55823a] via-[#436c2a] to-[#2b4919] text-white flex flex-col justify-between shadow-2xl z-10 overflow-hidden">
            {renderNavContent(true)}
          </div>
        </div>
      )}
    </>
  );
}

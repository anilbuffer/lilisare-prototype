'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  ChevronUp,
  Columns2,
  X,
  Settings,
  LogOut,
  User,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps = {}) {
  const pathname = usePathname() || '';
  const router = useRouter();
  const { switchRole, notify, applications, isSidebarCollapsed } = usePortal();

  const pendingApplicationsCount = applications.filter(
    (a) => a.status === 'Pending Review' || a.status === 'In Verification'
  ).length;

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
      id: 'client-intake',
      label: 'Client Intake',
      href: '/admin-portal/client-intake',
      icon: Layers,
      isActive:
        pathname === '/admin-portal/client-intake' ||
        pathname === '/admin-portal/intake-pipeline' ||
        pathname.startsWith('/admin-portal/client-intake'),
    },
    {
      id: 'caregiver-intake',
      label: 'Caregiver Intake',
      href: '/admin-portal/caregiver-intake',
      icon: UserCheck,
      badge: pendingApplicationsCount > 0 ? String(pendingApplicationsCount) : undefined,
      isActive:
        pathname === '/admin-portal/caregiver-intake' ||
        pathname.startsWith('/admin-portal/caregiver-intake'),
    },
    {
      id: 'onboarding',
      label: 'Onboarding',
      href: '/admin-portal/onboarding',
      icon: FileCheck2,
      badge: '24',
      isActive:
        pathname === '/admin-portal/onboarding' ||
        pathname.startsWith('/admin-portal/onboarding'),
    },
    {
      id: 'ca-emails',
      label: 'CA Emails',
      href: '/admin-portal/ca-emails',
      icon: Mail,
      badge: '7',
      isActive:
        pathname === '/admin-portal/ca-emails' ||
        pathname === '/admin-portal/cm-emails' ||
        pathname.startsWith('/admin-portal/ca-emails') ||
        pathname.startsWith('/admin-portal/cm-emails'),
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
    <div className="flex flex-col h-full overflow-hidden select-none w-full">
      {/* 1. FIXED TOP BRAND HEADER (Fixed, doesn't scroll) */}
      <div className="p-3.5 pb-2.5 shrink-0 border-b border-white/10 relative z-20">
        <div className={`flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center' : 'w-full gap-2'}`}>
          <Link
            href="/admin-portal/dashboard"
            onClick={() => {
              switchRole('admin');
              if (isMobile) onCloseMobile?.();
            }}
            className={`${isSidebarCollapsed && !isMobile ? '' : 'w-full'} cursor-pointer group block`}
          >
            <div className={`bg-white rounded-2xl ${isSidebarCollapsed && !isMobile
              ? 'p-2 w-10 h-10 flex items-center justify-center'
              : 'w-full py-2.5 px-3 flex items-center justify-center'
              } shadow-xs border border-white/20 group-hover:scale-[1.01] group-hover:shadow transition-all`}>
              <img
                src={isSidebarCollapsed && !isMobile ? "/images/lilisare-icon.png" : "/images/lilisare-logo.png"}
                alt="LiliSare"
                className={`${isSidebarCollapsed && !isMobile ? 'h-6 w-6' : 'h-9 sm:h-9.5 w-auto max-h-10'} object-contain`}
              />
            </div>
          </Link>

          {isMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer shrink-0"
              title="Close Navigation"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. SCROLLABLE MIDDLE MENU NAVIGATION (Only this menu list scrolls with ultra-thin scrollbar on the right) */}
      <nav className={`flex-1 overflow-y-auto overflow-x-hidden min-h-0 space-y-4 sidebar-thin-scroll relative z-10 py-3 ${isSidebarCollapsed && !isMobile ? 'px-2' : 'px-3.5 pr-2'
        }`}>
        {/* ======================================================== */}
        {/* GROUP 1: WORK                                            */}
        {/* ======================================================== */}
        <div className="space-y-1">
          <div className={`px-3 pb-1 ${isSidebarCollapsed && !isMobile ? 'hidden' : 'block'}`}>
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
                title={item.label}
                onClick={() => {
                  if (isMobile) onCloseMobile?.();
                }}
                className={`w-full flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'} rounded-xl text-xs transition-all text-left cursor-pointer group ${item.isActive
                  ? 'font-bold bg-white text-slate-900 shadow-sm'
                  : 'font-medium text-emerald-50/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                <div className={`flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center' : 'gap-2.5'} min-w-0`}>
                  <IconComponent
                    className={`w-4 h-4 shrink-0 transition-colors ${item.isActive ? 'text-[#3e6b2b]' : 'text-emerald-200 group-hover:text-white'
                      }`}
                  />
                  <span className={`text-[13px] truncate ${isSidebarCollapsed && !isMobile ? 'hidden' : 'inline'}`}>{item.label}</span>
                </div>
                {item.isActive && (!isSidebarCollapsed || isMobile) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d084] animate-pulse shrink-0" />
                )}
                {item.badge && !item.isActive && (!isSidebarCollapsed || isMobile) && (
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
          <div className={`px-3 pb-1 ${isSidebarCollapsed && !isMobile ? 'hidden' : 'block'}`}>
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
                title={item.label}
                onClick={() => {
                  if (isMobile) onCloseMobile?.();
                }}
                className={`w-full flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'} rounded-xl text-xs transition-all text-left cursor-pointer group ${item.isActive
                  ? 'font-bold bg-white text-slate-900 shadow-sm'
                  : 'font-medium text-emerald-50/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                <div className={`flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center' : 'gap-2.5'} min-w-0`}>
                  <IconComponent
                    className={`w-4 h-4 shrink-0 transition-colors ${item.isActive ? 'text-[#3e6b2b]' : 'text-emerald-200 group-hover:text-white'
                      }`}
                  />
                  <span className={`text-[13px] truncate ${isSidebarCollapsed && !isMobile ? 'hidden' : 'inline'}`}>{item.label}</span>
                </div>
                {item.isActive && (!isSidebarCollapsed || isMobile) && (
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
          <div className={`px-3 pb-1 ${isSidebarCollapsed && !isMobile ? 'hidden' : 'block'}`}>
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
                title={item.label}
                onClick={() => {
                  if (isMobile) onCloseMobile?.();
                }}
                className={`w-full flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'} rounded-xl text-xs transition-all text-left cursor-pointer group ${item.isActive
                  ? 'font-bold bg-white text-slate-900 shadow-sm'
                  : 'font-medium text-emerald-50/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                <div className={`flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center' : 'gap-2.5'} min-w-0`}>
                  <IconComponent
                    className={`w-4 h-4 shrink-0 transition-colors ${item.isActive ? 'text-[#3e6b2b]' : 'text-emerald-200 group-hover:text-white'
                      }`}
                  />
                  <span className={`text-[13px] truncate ${isSidebarCollapsed && !isMobile ? 'hidden' : 'inline'}`}>{item.label}</span>
                </div>
                {item.isActive && (!isSidebarCollapsed || isMobile) && (
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
          <div className={`px-3 pb-1 ${isSidebarCollapsed && !isMobile ? 'hidden' : 'block'}`}>
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
                title={item.label}
                onClick={() => {
                  if (isMobile) onCloseMobile?.();
                }}
                className={`w-full flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'} rounded-xl text-xs transition-all text-left cursor-pointer group ${item.isActive
                  ? 'font-bold bg-white text-slate-900 shadow-sm'
                  : 'font-medium text-emerald-50/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                <div className={`flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center' : 'gap-2.5'} min-w-0`}>
                  <IconComponent
                    className={`w-4 h-4 shrink-0 transition-colors ${item.isActive ? 'text-[#3e6b2b]' : 'text-emerald-200 group-hover:text-white'
                      }`}
                  />
                  <span className={`text-[13px] truncate ${isSidebarCollapsed && !isMobile ? 'hidden' : 'inline'}`}>{item.label}</span>
                </div>
                {item.isActive && (!isSidebarCollapsed || isMobile) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d084] animate-pulse shrink-0" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 3. FIXED BOTTOM FOOTER (HIPAA Badge + Sarah Jenkins Profile Dropup) */}
      <div className="shrink-0 p-3 pt-2 border-t border-white/10 space-y-2 relative z-20" ref={userMenuRef}>
        {/* HIPAA COMPLIANT BADGE */}
        <div className={isSidebarCollapsed && !isMobile ? 'hidden' : 'block'}>
          <div className="p-2.5 rounded-2xl bg-black/20 backdrop-blur-xs border border-white/15 flex items-start gap-2.5 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-[#00d084] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-xs text-white leading-tight">HIPAA Compliant</p>
              <p className="text-[10px] text-emerald-100/85 mt-0.5 leading-snug">
                Data encrypted in transit &amp; at rest.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Dropup Menu */}
        {isUserMenuOpen && (
          <div
            className={`absolute bottom-full mb-2 bg-[#203a13]/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 ${isSidebarCollapsed && !isMobile
              ? 'left-2 w-48'
              : 'left-3 right-3'
              }`}
          >
            {/* Settings Item */}
            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(false);
                notify('Settings', 'Opening system preferences & agency configuration.', 'info');
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors text-left cursor-pointer group"
            >
              <Settings className="w-4 h-4 text-emerald-200 group-hover:rotate-45 transition-transform" />
              <span>Settings</span>
            </button>

            {/* Divider */}
            <div className="border-t border-white/10 my-1" />

            {/* Log out Item */}
            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(false);
                if (isMobile) onCloseMobile?.();
                notify('Signed Out', 'You have been safely signed out of LiliSare Operations.', 'info');
                router.push('/login');
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Log out</span>
            </button>
          </div>
        )}

        {/* Profile Trigger Card */}
        <button
          type="button"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className={`w-full p-2 rounded-2xl border border-white/20 bg-black/20 hover:bg-black/30 transition-all flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center' : 'justify-between gap-2.5'
            } cursor-pointer group active:scale-[0.99]`}
          title="Sarah Jenkins • Admin Profile"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-white/15 transition-colors">
              <User className="w-4 h-4 text-emerald-100" />
            </div>
            <div className={`min-w-0 text-left ${isSidebarCollapsed && !isMobile ? 'hidden' : 'block'}`}>
              <p className="text-xs font-bold text-white truncate leading-tight">Sarah Jenkins</p>
              <p className="text-[10px] font-bold text-emerald-200/90 tracking-wider mt-0.5 uppercase">ADMIN</p>
            </div>
          </div>
          <ChevronUp
            className={`w-4 h-4 text-white/70 transition-transform duration-200 shrink-0 ${isSidebarCollapsed && !isMobile ? 'hidden' : 'block'
              } ${isUserMenuOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Screens >= md) */}
      <aside className={`h-full shrink-0 bg-gradient-to-b from-[#55823a] via-[#436c2a] to-[#2b4919] text-white flex flex-col hidden md:flex border-r border-[#243e15] select-none shadow-2xl relative z-30 transition-all duration-300 overflow-hidden ${isSidebarCollapsed ? 'w-18' : 'w-60 lg:w-64'}`}>
        {renderNavContent(false)}
      </aside>

      {/* Mobile Slide-Over Drawer (Screens < md) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full bg-gradient-to-b from-[#55823a] via-[#436c2a] to-[#2b4919] text-white flex flex-col shadow-2xl z-10 overflow-hidden">
            {renderNavContent(true)}
          </div>
        </div>
      )}
    </>
  );
}

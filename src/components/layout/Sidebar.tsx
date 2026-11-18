'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  FileText,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps = {}) {
  const pathname = usePathname() || '';
  const router = useRouter();
  const { switchRole, notify, applications, isSidebarCollapsed, currentRole, currentRoleConfig } = usePortal();

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

  interface NavItem {
    id: string;
    label: string;
    href: string;
    icon: any;
    badge?: string;
    isActive: boolean;
  }

  interface NavSection {
    title: string;
    items: NavItem[];
  }

  const navSections: NavSection[] = useMemo(() => {
    // 1. Enrollment Specialist
    if (currentRole === 'enrollment') {
      return [
        {
          title: 'INTAKE & REFERRALS',
          items: [
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
              isActive: pathname.startsWith('/admin-portal/client-intake') || pathname.startsWith('/admin-portal/intake-pipeline'),
            },
            {
              id: 'cm-emails',
              label: 'CM Emails',
              href: '/admin-portal/cm-emails',
              icon: Mail,
              badge: '7',
              isActive: pathname.startsWith('/admin-portal/cm-emails') || pathname.startsWith('/admin-portal/ca-emails'),
            },
          ],
        },
        {
          title: 'DIRECTORIES',
          items: [
            {
              id: 'clients',
              label: 'Clients',
              href: '/admin-portal/clients',
              icon: Users,
              isActive: pathname === '/admin-portal/clients',
            },
          ],
        },
      ];
    }

    // 2. Caregiver Onboarding Lead
    if (currentRole === 'onboarding') {
      return [
        {
          title: 'ONBOARDING PIPELINE',
          items: [
            {
              id: 'today',
              label: 'Today',
              href: '/admin-portal/dashboard',
              icon: Calendar,
              isActive: pathname === '/admin-portal/dashboard' || pathname === '/admin-portal',
            },
            {
              id: 'caregiver-intake',
              label: 'Caregiver Intake',
              href: '/admin-portal/caregiver-intake',
              icon: UserCheck,
              badge: pendingApplicationsCount > 0 ? String(pendingApplicationsCount) : undefined,
              isActive: pathname.startsWith('/admin-portal/caregiver-intake'),
            },
            {
              id: 'onboarding',
              label: 'Onboarding Queue',
              href: '/admin-portal/onboarding',
              icon: FileCheck2,
              badge: '24',
              isActive: pathname.startsWith('/admin-portal/onboarding'),
            },
          ],
        },
        {
          title: 'CREDENTIALING & SCREENING',
          items: [
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
              badge: '3',
              isActive: pathname === '/admin-portal/screening-center',
            },
          ],
        },
      ];
    }

    // 3. RN Clinical Supervisor
    if (currentRole === 'clinical') {
      return [
        {
          title: 'CLINICAL OVERSIGHT',
          items: [
            {
              id: 'today',
              label: 'Today',
              href: '/admin-portal/dashboard',
              icon: Calendar,
              isActive: pathname === '/admin-portal/dashboard' || pathname === '/admin-portal',
            },
            {
              id: 'note-audit',
              label: 'Note Audit',
              href: '/admin-portal/note-audit',
              icon: FileText,
              badge: '24',
              isActive: pathname === '/admin-portal/note-audit',
            },
            {
              id: 'compliance',
              label: 'Supervisory Visits',
              href: '/admin-portal/compliance',
              icon: CheckSquare,
              isActive: pathname === '/admin-portal/compliance',
            },
            {
              id: 'scheduling-evv',
              label: 'Shift Monitoring',
              href: '/admin-portal/scheduling-evv',
              icon: Clock,
              isActive: pathname === '/admin-portal/scheduling-evv',
            },
          ],
        },
        {
          title: 'PATIENT & STAFF ROSTER',
          items: [
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
          ],
        },
      ];
    }

    // 4. Compliance Officer
    if (currentRole === 'compliance') {
      return [
        {
          title: 'STATE QA & COMPLIANCE',
          items: [
            {
              id: 'today',
              label: 'Today',
              href: '/admin-portal/dashboard',
              icon: Calendar,
              isActive: pathname === '/admin-portal/dashboard' || pathname === '/admin-portal',
            },
            {
              id: 'compliance',
              label: 'Credential Expirations',
              href: '/admin-portal/compliance',
              icon: CheckSquare,
              badge: '41',
              isActive: pathname === '/admin-portal/compliance',
            },
            {
              id: 'screening-center',
              label: 'Screening Center',
              href: '/admin-portal/screening-center',
              icon: ShieldCheck,
              badge: '3',
              isActive: pathname === '/admin-portal/screening-center',
            },
          ],
        },
        {
          title: 'AUDIT VAULT & LOGS',
          items: [
            {
              id: 'note-audit',
              label: 'Note Audits',
              href: '/admin-portal/note-audit',
              icon: FileText,
              isActive: pathname === '/admin-portal/note-audit',
            },
            {
              id: 'reports',
              label: '7-Year Audit Vault',
              href: '/admin-portal/reports',
              icon: BarChart3,
              isActive: pathname === '/admin-portal/reports',
            },
          ],
        },
        {
          title: 'RECORDS DIRECTORY',
          items: [
            {
              id: 'caregivers',
              label: 'Caregivers',
              href: '/admin-portal/caregivers',
              icon: HeartHandshake,
              isActive: pathname === '/admin-portal/caregivers',
            },
            {
              id: 'clients',
              label: 'Clients',
              href: '/admin-portal/clients',
              icon: Users,
              isActive: pathname === '/admin-portal/clients',
            },
          ],
        },
      ];
    }

    // 5. Medicaid Billing Specialist
    if (currentRole === 'billing') {
      return [
        {
          title: 'REVENUE CYCLE & CLAIMS',
          items: [
            {
              id: 'today',
              label: 'Today',
              href: '/admin-portal/dashboard',
              icon: Calendar,
              isActive: pathname === '/admin-portal/dashboard' || pathname === '/admin-portal',
            },
            {
              id: 'billing',
              label: 'Billing & Claims',
              href: '/admin-portal/billing',
              icon: DollarSign,
              badge: '18',
              isActive: pathname === '/admin-portal/billing',
            },
          ],
        },
        {
          title: 'FINANCIAL OPERATIONS',
          items: [
            {
              id: 'scheduling-evv',
              label: 'EVV Reconciliation',
              href: '/admin-portal/scheduling-evv',
              icon: Clock,
              isActive: pathname === '/admin-portal/scheduling-evv',
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
              label: 'Remittance Reports',
              href: '/admin-portal/reports',
              icon: BarChart3,
              isActive: pathname === '/admin-portal/reports',
            },
          ],
        },
        {
          title: 'CLIENT ACCOUNTS',
          items: [
            {
              id: 'clients',
              label: 'Clients',
              href: '/admin-portal/clients',
              icon: Users,
              isActive: pathname === '/admin-portal/clients',
            },
          ],
        },
      ];
    }

    // 6. Family Caregiver (Elena Morales)
    if (currentRole === 'caregiver') {
      return [
        {
          title: 'MY VISITS & TIME',
          items: [
            {
              id: 'today',
              label: "Today's Shift & EVV",
              href: '/admin-portal/dashboard',
              icon: Calendar,
              isActive: pathname === '/admin-portal/dashboard' || pathname === '/admin-portal',
            },
            {
              id: 'scheduling-evv',
              label: 'My Schedule & Hours',
              href: '/admin-portal/scheduling-evv',
              icon: Clock,
              isActive: pathname === '/admin-portal/scheduling-evv',
            },
          ],
        },
        {
          title: 'MY CREDENTIALS',
          items: [
            {
              id: 'compliance',
              label: 'Certifications & Training',
              href: '/admin-portal/compliance',
              icon: ShieldCheck,
              isActive: pathname === '/admin-portal/compliance',
            },
          ],
        },
      ];
    }

    // 7. System Executive Admin (Full Access)
    return [
      {
        title: 'WORK',
        items: [
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
            isActive: pathname.startsWith('/admin-portal/client-intake') || pathname.startsWith('/admin-portal/intake-pipeline'),
          },
          {
            id: 'caregiver-intake',
            label: 'Caregiver Intake',
            href: '/admin-portal/caregiver-intake',
            icon: UserCheck,
            badge: pendingApplicationsCount > 0 ? String(pendingApplicationsCount) : undefined,
            isActive: pathname.startsWith('/admin-portal/caregiver-intake'),
          },
          {
            id: 'onboarding',
            label: 'Onboarding',
            href: '/admin-portal/onboarding',
            icon: FileCheck2,
            badge: '24',
            isActive: pathname.startsWith('/admin-portal/onboarding'),
          },
          {
            id: 'ca-emails',
            label: 'CM Emails',
            href: '/admin-portal/cm-emails',
            icon: Mail,
            badge: '7',
            isActive: pathname.startsWith('/admin-portal/cm-emails') || pathname.startsWith('/admin-portal/ca-emails'),
          },
        ],
      },
      {
        title: 'PEOPLE',
        items: [
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
        ],
      },
      {
        title: 'SCHEDULE & COMPLIANCE',
        items: [
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
          {
            id: 'note-audit',
            label: 'Note Audit',
            href: '/admin-portal/note-audit',
            icon: FileText,
            isActive: pathname === '/admin-portal/note-audit',
          },
        ],
      },
      {
        title: 'BUSINESS',
        items: [
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
        ],
      },
    ];
  }, [currentRole, pathname, pendingApplicationsCount]);

  const renderNavContent = (isMobile: boolean) => (
    <div className="flex flex-col h-full overflow-hidden select-none w-full bg-white">
      {/* 1. FIXED TOP BRAND HEADER (Fixed, doesn't scroll) */}
      <div className="h-16 px-4 shrink-0 border-b border-slate-100 flex items-center relative z-20">
        <div className={`flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center w-full' : 'w-full justify-between gap-2'}`}>
          <Link
            href="/admin-portal/dashboard"
            onClick={() => {
              if (isMobile) onCloseMobile?.();
            }}
            className={`${isSidebarCollapsed && !isMobile ? '' : 'flex items-center'} cursor-pointer group`}
          >
            <img
              src={isSidebarCollapsed && !isMobile ? "/images/lilisare-icon.png" : "/images/lilisare-logo.png"}
              alt="LiliSare"
              className={`${isSidebarCollapsed && !isMobile ? 'h-8 w-8' : 'h-9 sm:h-10 w-auto max-h-11'} object-contain transition-transform group-hover:scale-[1.02]`}
            />
          </Link>

          {isMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer shrink-0 transition-colors"
              title="Close Navigation"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. SCROLLABLE MIDDLE MENU NAVIGATION (Filtered dynamically per role) */}
      <nav className={`flex-1 overflow-y-auto overflow-x-hidden min-h-0 space-y-4 sidebar-thin-scroll relative z-10 py-3.5 ${isSidebarCollapsed && !isMobile ? 'px-2' : 'px-3'
        }`}>
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <div className={`px-3 py-1 ${isSidebarCollapsed && !isMobile ? 'hidden' : 'block'}`}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {section.title}
              </span>
            </div>

            {section.items.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  title={item.label}
                  onClick={() => {
                    if (isMobile) onCloseMobile?.();
                  }}
                  className={`w-full flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2.5'} rounded-xl text-xs transition-all text-left cursor-pointer group ${item.isActive
                    ? 'font-bold bg-[#3e6b2b] text-white shadow-xs'
                    : 'font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                >
                  <div className={`flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center' : 'gap-2.5'} min-w-0`}>
                    <IconComponent
                      className={`w-4 h-4 shrink-0 transition-colors ${item.isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#3e6b2b]'
                        }`}
                    />
                    <span className={`text-[13px] truncate ${isSidebarCollapsed && !isMobile ? 'hidden' : 'inline'}`}>{item.label}</span>
                  </div>
                  {item.badge && (!isSidebarCollapsed || isMobile) && (
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] leading-none shrink-0 ${item.isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200/70 group-hover:text-slate-800'
                      }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* 3. FIXED BOTTOM FOOTER (HIPAA Badge + Persona Profile Dropup) */}
      <div className="shrink-0 p-3 pt-2.5 border-t border-slate-100 space-y-2 relative z-20" ref={userMenuRef}>
        {/* HIPAA COMPLIANT BADGE */}
        <div className={isSidebarCollapsed && !isMobile ? 'hidden' : 'block'}>
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#3e6b2b] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-xs text-slate-900 leading-tight">HIPAA Compliant</p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                Data encrypted in transit &amp; at rest.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Dropup Menu */}
        {isUserMenuOpen && (
          <div
            className={`absolute bottom-full mb-2 bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 ${isSidebarCollapsed && !isMobile
              ? 'left-2 w-56'
              : 'left-3 right-3'
              }`}
          >
            {/* Persona Info Header */}
            <div className="px-3 py-2 border-b border-slate-100 mb-1">
              <p className="text-xs font-bold text-slate-900 truncate">
                {currentRoleConfig.userName || currentRoleConfig.label}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">
                {currentRoleConfig.department}
              </p>
            </div>

            {/* Switch Role shortcut */}
            {currentRole !== 'admin' && (
              <button
                type="button"
                onClick={() => {
                  setIsUserMenuOpen(false);
                  switchRole('admin');
                  router.push('/admin-portal/dashboard');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#3e6b2b] hover:bg-emerald-50 transition-colors text-left cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-[#3e6b2b]" />
                <span>Switch to Admin Mode</span>
              </button>
            )}

            {/* Settings Item */}
            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(false);
                notify('Settings', 'Opening system preferences & agency configuration.', 'info');
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left cursor-pointer group"
            >
              <Settings className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:rotate-45 transition-transform" />
              <span>Settings</span>
            </button>

            {/* Divider */}
            <div className="border-t border-slate-100 my-1" />

            {/* Log out Item */}
            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(false);
                if (isMobile) onCloseMobile?.();
                notify('Signed Out', 'You have been safely signed out of LiliSare Operations.', 'info');
                router.push('/login');
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Log out</span>
            </button>
          </div>
        )}

        {/* Profile Trigger Card */}
        <button
          type="button"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className={`w-full p-2 rounded-2xl border border-slate-200/80 bg-slate-50 hover:bg-slate-100/80 transition-all flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center' : 'justify-between gap-2.5'
            } cursor-pointer group active:scale-[0.99]`}
          title={`${currentRoleConfig.userName || currentRoleConfig.label} • ${currentRoleConfig.userTitle || currentRoleConfig.badgeLabel}`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={currentRoleConfig.avatar}
              alt={currentRoleConfig.userName || currentRoleConfig.label}
              className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0 group-hover:ring-1 group-hover:ring-slate-300 transition-all"
            />
            <div className={`min-w-0 text-left ${isSidebarCollapsed && !isMobile ? 'hidden' : 'block'}`}>
              <p className="text-xs font-bold text-slate-900 truncate leading-tight">
                {currentRoleConfig.userName || currentRoleConfig.label}
              </p>
              <p className="text-[10px] font-bold text-[#3e6b2b] tracking-wider mt-0.5 uppercase truncate">
                {currentRoleConfig.badgeLabel || currentRoleConfig.userTitle || currentRole.toUpperCase()}
              </p>
            </div>
          </div>
          <ChevronUp
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isSidebarCollapsed && !isMobile ? 'hidden' : 'block'
              } ${isUserMenuOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Screens >= md) */}
      <aside className={`h-full shrink-0 bg-white text-slate-800 flex flex-col hidden md:flex border-r border-slate-200/90 select-none shadow-xs relative z-30 transition-all duration-300 overflow-hidden ${isSidebarCollapsed ? 'w-18' : 'w-60 lg:w-64'}`}>
        {renderNavContent(false)}
      </aside>

      {/* Mobile Slide-Over Drawer (Screens < md) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full bg-white text-slate-800 flex flex-col shadow-2xl z-10 overflow-hidden">
            {renderNavContent(true)}
          </div>
        </div>
      )}
    </>
  );
}

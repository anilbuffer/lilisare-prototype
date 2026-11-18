'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { usePortal } from '@/lib/store/portal-context';
import {
  Home,
  Folder,
  Users,
  Activity,
  BarChart2,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  ChevronUp,
  X,
  ShieldCheck,
  LogOut,
  Calendar,
  Layers,
  UserCheck,
  FileCheck2,
  Mail,
  HeartHandshake,
  Clock,
  CheckSquare,
  DollarSign,
  TrendingUp,
  BarChart3,
  FileText,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface SubNavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  isActive: boolean;
}

interface NavGroup {
  id: string;
  title: string;
  icon: any;
  items: SubNavItem[];
}

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps = {}) {
  const pathname = usePathname() || '';
  const router = useRouter();
  const { switchRole, notify, applications, isSidebarCollapsed, toggleSidebar, currentRole, currentRoleConfig } = usePortal();

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

  // Hide sidebar on full-width landing/login/registration pages
  if (
    pathname === '/landing' ||
    pathname === '/login' ||
    pathname === '/registration' ||
    pathname.startsWith('/registration')
  ) {
    return null;
  }

  const isTodayActive = pathname === '/admin-portal/dashboard' || pathname === '/admin-portal';

  // Navigation Groups per Persona / Role
  const navGroups: NavGroup[] = useMemo(() => {
    // 1. Enrollment Specialist
    if (currentRole === 'enrollment') {
      return [
        {
          id: 'intake-onboarding',
          title: 'Intake & Onboarding',
          icon: Folder,
          items: [
            {
              id: 'client-intake',
              label: 'Client Intake',
              href: '/admin-portal/client-intake',
              isActive: pathname.startsWith('/admin-portal/client-intake') || pathname.startsWith('/admin-portal/intake-pipeline'),
            },
            {
              id: 'ca-emails',
              label: 'CA Emails',
              href: '/admin-portal/cm-emails',
              badge: '7',
              isActive: pathname.startsWith('/admin-portal/cm-emails') || pathname.startsWith('/admin-portal/ca-emails'),
            },
          ],
        },
        {
          id: 'people',
          title: 'People',
          icon: Users,
          items: [
            {
              id: 'clients',
              label: 'Clients',
              href: '/admin-portal/clients',
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
          id: 'intake-onboarding',
          title: 'Intake & Onboarding',
          icon: Folder,
          items: [
            {
              id: 'caregiver-intake',
              label: 'Caregiver Intake',
              href: '/admin-portal/caregiver-intake',
              badge: pendingApplicationsCount > 0 ? String(pendingApplicationsCount) : undefined,
              isActive: pathname.startsWith('/admin-portal/caregiver-intake'),
            },
            {
              id: 'onboarding',
              label: 'Onboarding',
              href: '/admin-portal/onboarding',
              badge: '24',
              isActive: pathname.startsWith('/admin-portal/onboarding'),
            },
          ],
        },
        {
          id: 'people',
          title: 'People',
          icon: Users,
          items: [
            {
              id: 'caregivers',
              label: 'Caregivers',
              href: '/admin-portal/caregivers',
              isActive: pathname === '/admin-portal/caregivers',
            },
            {
              id: 'screening-center',
              label: 'Screening Center',
              href: '/admin-portal/screening-center',
              isActive: pathname === '/admin-portal/screening-center',
            },
          ],
        },
      ];
    }

    // 3. Clinical Supervisor / QA
    if (currentRole === 'clinical') {
      return [
        {
          id: 'care-operations',
          title: 'Care Operations',
          icon: Activity,
          items: [
            {
              id: 'compliance',
              label: 'Supervisory Visits',
              href: '/admin-portal/compliance',
              badge: '4',
              isActive: pathname === '/admin-portal/compliance',
            },
            {
              id: 'note-audit',
              label: 'Care Notes Audit',
              href: '/admin-portal/note-audit',
              badge: '26',
              isActive: pathname === '/admin-portal/note-audit',
            },
          ],
        },
        {
          id: 'people',
          title: 'People',
          icon: Users,
          items: [
            {
              id: 'clients',
              label: 'Client Records',
              href: '/admin-portal/clients',
              isActive: pathname === '/admin-portal/clients',
            },
            {
              id: 'caregivers',
              label: 'Clinical Staff',
              href: '/admin-portal/caregivers',
              isActive: pathname === '/admin-portal/caregivers',
            },
          ],
        },
      ];
    }

    // 4. Billing & Claims Specialist
    if (currentRole === 'billing') {
      return [
        {
          id: 'finance-billing',
          title: 'Finance & Billing',
          icon: BarChart2,
          items: [
            {
              id: 'billing',
              label: 'Billing Engine',
              href: '/admin-portal/billing',
              badge: '3',
              isActive: pathname === '/admin-portal/billing',
            },
            {
              id: 'client-profitability',
              label: 'Client Profitability',
              href: '/admin-portal/client-profitability',
              isActive: pathname === '/admin-portal/client-profitability',
            },
            {
              id: 'reports',
              label: 'Reports',
              href: '/admin-portal/reports',
              isActive: pathname === '/admin-portal/reports',
            },
          ],
        },
        {
          id: 'care-operations',
          title: 'Care Operations',
          icon: Activity,
          items: [
            {
              id: 'scheduling-evv',
              label: 'EVV Billing Lock',
              href: '/admin-portal/scheduling-evv',
              badge: '14',
              isActive: pathname === '/admin-portal/scheduling-evv',
            },
          ],
        },
      ];
    }

    // 5. Compliance & Audit Officer
    if (currentRole === 'compliance') {
      return [
        {
          id: 'care-operations',
          title: 'Care Operations',
          icon: Activity,
          items: [
            {
              id: 'compliance',
              label: 'Compliance Hub',
              href: '/admin-portal/compliance',
              badge: '12',
              isActive: pathname === '/admin-portal/compliance',
            },
            {
              id: 'scheduling-evv',
              label: 'Sandata Colorado EVV',
              href: '/admin-portal/scheduling-evv',
              isActive: pathname === '/admin-portal/scheduling-evv',
            },
            {
              id: 'note-audit',
              label: 'Note Audit',
              href: '/admin-portal/note-audit',
              badge: '26',
              isActive: pathname === '/admin-portal/note-audit',
            },
          ],
        },
        {
          id: 'people',
          title: 'People',
          icon: Users,
          items: [
            {
              id: 'screening-center',
              label: 'Screening Center',
              href: '/admin-portal/screening-center',
              isActive: pathname === '/admin-portal/screening-center',
            },
          ],
        },
      ];
    }

    // 6. Caregiver Self-Service
    if (currentRole === 'caregiver') {
      return [
        {
          id: 'care-operations',
          title: 'Care Operations',
          icon: Activity,
          items: [
            {
              id: 'scheduling-evv',
              label: 'My Schedule & Hours',
              href: '/admin-portal/scheduling-evv',
              isActive: pathname === '/admin-portal/scheduling-evv',
            },
            {
              id: 'compliance',
              label: 'Training & Certs',
              href: '/admin-portal/compliance',
              isActive: pathname === '/admin-portal/compliance',
            },
          ],
        },
      ];
    }

    // 7. System Executive Admin (Standard EHR Layout matching Reference Screenshot)
    return [
      {
        id: 'intake-onboarding',
        title: 'Intake & Onboarding',
        icon: Folder,
        items: [
          {
            id: 'client-intake',
            label: 'Client Intake',
            href: '/admin-portal/client-intake',
            isActive: pathname.startsWith('/admin-portal/client-intake') || pathname.startsWith('/admin-portal/intake-pipeline'),
          },
          {
            id: 'caregiver-intake',
            label: 'Caregiver Intake',
            href: '/admin-portal/caregiver-intake',
            badge: '3',
            isActive: pathname.startsWith('/admin-portal/caregiver-intake'),
          },
          {
            id: 'onboarding',
            label: 'Onboarding',
            href: '/admin-portal/onboarding',
            isActive: pathname.startsWith('/admin-portal/onboarding'),
          },
          {
            id: 'ca-emails',
            label: 'CA Emails',
            href: '/admin-portal/cm-emails',
            badge: '7',
            isActive: pathname.startsWith('/admin-portal/cm-emails') || pathname.startsWith('/admin-portal/ca-emails'),
          },
        ],
      },
      {
        id: 'people',
        title: 'People',
        icon: Users,
        items: [
          {
            id: 'clients',
            label: 'Clients',
            href: '/admin-portal/clients',
            isActive: pathname === '/admin-portal/clients',
          },
          {
            id: 'caregivers',
            label: 'Caregivers',
            href: '/admin-portal/caregivers',
            isActive: pathname === '/admin-portal/caregivers',
          },
          {
            id: 'screening-center',
            label: 'Screening Center',
            href: '/admin-portal/screening-center',
            isActive: pathname === '/admin-portal/screening-center',
          },
          {
            id: 'training',
            label: 'Training',
            href: '/admin-portal/compliance',
            badge: '9',
            isActive: pathname === '/admin-portal/compliance',
          },
        ],
      },
      {
        id: 'care-operations',
        title: 'Care Operations',
        icon: Activity,
        items: [
          {
            id: 'care-notes',
            label: 'Care Notes',
            href: '/admin-portal/note-audit',
            badge: '26',
            isActive: pathname === '/admin-portal/note-audit',
          },
          {
            id: 'scheduling-evv',
            label: 'Scheduling and EVV',
            href: '/admin-portal/scheduling-evv',
            isActive: pathname === '/admin-portal/scheduling-evv',
          },
          {
            id: 'compliance',
            label: 'Compliance',
            href: '/admin-portal/compliance',
            isActive: pathname === '/admin-portal/compliance',
          },
        ],
      },
      {
        id: 'finance-billing',
        title: 'Finance & Billing',
        icon: BarChart2,
        items: [
          {
            id: 'billing',
            label: 'Billing',
            href: '/admin-portal/billing',
            isActive: pathname === '/admin-portal/billing',
          },
          {
            id: 'client-profitability',
            label: 'Client Profitability',
            href: '/admin-portal/client-profitability',
            isActive: pathname === '/admin-portal/client-profitability',
          },
          {
            id: 'reports',
            label: 'Reports',
            href: '/admin-portal/reports',
            isActive: pathname === '/admin-portal/reports',
          },
        ],
      },
      {
        id: 'system-admin',
        title: 'System & Admin',
        icon: Settings,
        items: [
          {
            id: 'automation-rules',
            label: 'Automation Rules',
            href: '/admin-portal/dashboard',
            isActive: false,
          },
        ],
      },
    ];
  }, [currentRole, pathname, pendingApplicationsCount]);

  const renderNavContent = (isMobile: boolean) => (
    <div className="flex flex-col h-full overflow-hidden select-none w-full">
      {/* 1. TOP LOGO HEADER & COLLAPSE CHEVRON */}
      <div className="p-3.5 pb-2 shrink-0 relative z-20">
        <div className={`flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center' : 'justify-between gap-2'}`}>
          <Link
            href="/admin-portal/dashboard"
            onClick={() => {
              if (isMobile) onCloseMobile?.();
            }}
            className={`${isSidebarCollapsed && !isMobile ? '' : 'flex-1'} cursor-pointer group block`}
          >
            <div
              className={`bg-white rounded-2xl ${isSidebarCollapsed && !isMobile
                  ? 'p-2 w-10 h-10 flex items-center justify-center'
                  : 'w-full py-2 px-3 flex items-center justify-center'
                } shadow-sm border border-white/20 group-hover:scale-[1.01] transition-transform`}
            >
              <img
                src={isSidebarCollapsed && !isMobile ? '/images/lilisare-icon.png' : '/images/lilisare-logo.png'}
                alt="LiliSare"
                className={`${isSidebarCollapsed && !isMobile ? 'h-7 w-7' : 'h-8 sm:h-9 w-auto max-h-10'} object-contain`}
              />
            </div>
          </Link>

          {/* Desktop Collapse Arrow Button (« / » matching screenshot) */}
          {!isMobile && !isSidebarCollapsed && (
            <button
              type="button"
              onClick={toggleSidebar}
              className="w-7 h-7 rounded-lg text-white/75 hover:text-white hover:bg-white/10 flex items-center justify-center cursor-pointer shrink-0 transition-colors"
              title="Collapse sidebar"
            >
              <ChevronsLeft className="w-4 h-4 text-white" />
            </button>
          )}

          {isMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer shrink-0 transition-colors"
              title="Close Navigation"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. SCROLLABLE MIDDLE NAVIGATION MENU */}
      <nav
        className={`flex-1 overflow-y-auto overflow-x-hidden min-h-0 space-y-1 sidebar-thin-scroll relative z-10 py-2 ${isSidebarCollapsed && !isMobile ? 'px-2' : 'px-3'
          }`}
      >
        {/* STANDALONE 'TODAY' ITEM (Matching Reference Screenshot) */}
        <div className="mb-2">
          <Link
            href="/admin-portal/dashboard"
            onClick={() => {
              if (isMobile) onCloseMobile?.();
            }}
            className={`w-full flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2'
              } rounded-2xl text-[13px] sm:text-[14px] transition-all cursor-pointer ${isTodayActive
                ? 'bg-[#516b49] text-white font-bold shadow-xs'
                : 'text-white/90 hover:text-white hover:bg-white/10 font-medium'
              }`}
          >
            <Home className="w-4 h-4 text-white shrink-0" />
            {(!isSidebarCollapsed || isMobile) && (
              <span className="truncate">Today</span>
            )}
          </Link>
        </div>

        {/* SECTION GROUPS WITH SUB-ITEMS & TREE GUIDELINES (Always Open, No Accordion) */}
        {navGroups.map((group) => {
          const GroupIcon = group.icon;

          return (
            <div key={group.id} className="pt-1.5">
              {/* Group Header (Static, always open, matching reference screenshot) */}
              {isSidebarCollapsed && !isMobile ? (
                <div className="flex justify-center py-2" title={group.title}>
                  <GroupIcon className="w-4 h-4 text-white shrink-0" />
                </div>
              ) : (
                <div className="flex items-center justify-between px-2 py-1 select-none">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <GroupIcon className="w-4 h-4 text-white shrink-0" />
                    <span className="text-[13px] sm:text-[14px] font-bold text-white tracking-normal truncate">
                      {group.title}
                    </span>
                  </div>
                  <ChevronUp className="w-3.5 h-3.5 text-white/70 shrink-0" />
                </div>
              )}

              {/* Sub-items (Always Open, Tree structure with vertical connecting line) */}
              {(!isSidebarCollapsed || isMobile) && (
                <div className="border-l border-white/20 ml-4 pl-3.5 space-y-0.5 my-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        if (isMobile) onCloseMobile?.();
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] transition-colors cursor-pointer ${item.isActive
                          ? 'text-white font-bold bg-white/15'
                          : 'text-white/90 hover:text-white hover:bg-white/10 font-normal'
                        }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#F2B632] text-slate-950 font-black text-[10px] sm:text-[11px] flex items-center justify-center shrink-0 leading-none shadow-2xs">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* 3. BOTTOM USER PROFILE (Matching Screenshot with Lisa Connell & Green Avatar) */}
      <div className="shrink-0 p-3 pt-2 border-t border-white/10 relative z-20" ref={userMenuRef}>
        {/* Floating Dropup Menu */}
        {isUserMenuOpen && (
          <div
            className={`absolute bottom-full mb-2 bg-[#25461b]/98 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 ${isSidebarCollapsed && !isMobile
                ? 'left-2 w-80 sm:w-96'
                : 'left-2 w-[calc(100%-1rem)] sm:w-96 sm:left-2'
              }`}
          >
            {/* Persona Info Header */}
            <div className="px-3 py-2 border-b border-white/10 mb-2 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#00d084] text-white font-black flex items-center justify-center shrink-0 text-sm shadow-xs">
                {currentRoleConfig.userName ? currentRoleConfig.userName.charAt(0) : 'L'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {currentRoleConfig.userName || 'Lisa Connell'}
                </p>
                <p className="text-[10px] text-white/70 font-medium truncate">
                  {currentRoleConfig.userTitle || 'Administrator · LiliSare'}
                </p>
              </div>
            </div>

            {/* Settings Item */}
            <button
              type="button"
              onClick={() => {
                setIsUserMenuOpen(false);
                notify('Settings', 'Opening system preferences & agency configuration.', 'info');
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors text-left cursor-pointer group"
            >
              <Settings className="w-4 h-4 text-white group-hover:rotate-45 transition-transform" />
              <span>Settings</span>
            </button>

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

        {/* Profile Trigger Button */}
        <button
          type="button"
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className={`w-full p-1.5 sm:p-2 rounded-2xl hover:bg-white/10 transition-all flex items-center ${isSidebarCollapsed && !isMobile ? 'justify-center' : 'justify-between gap-2.5'
            } cursor-pointer group active:scale-[0.99]`}
          title={`${currentRoleConfig.userName || 'Lisa Connell'} • ${currentRoleConfig.userTitle || 'Administrator · LiliSare'}`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Emerald/Cyan Avatar Initial matching reference */}
            <div className="w-9 h-9 rounded-full bg-[#00d084] text-white font-black flex items-center justify-center shrink-0 text-sm shadow-xs">
              {currentRoleConfig.userName ? currentRoleConfig.userName.charAt(0) : 'L'}
            </div>
            <div className={`min-w-0 text-left ${isSidebarCollapsed && !isMobile ? 'hidden' : 'block'}`}>
              <p className="text-xs sm:text-sm font-bold text-white truncate leading-tight">
                {currentRoleConfig.userName || 'Lisa Connell'}
              </p>
              <p className="text-[11px] font-medium text-white/70 truncate mt-0.5 leading-tight">
                {currentRoleConfig.userTitle || 'Administrator · LiliSare'}
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-white/60 transition-transform duration-200 shrink-0 ${isSidebarCollapsed && !isMobile ? 'hidden' : 'block'
              } ${isUserMenuOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Screens >= md) */}
      <aside
        className={`h-full shrink-0 bg-gradient-to-b from-[#2e5722] via-[#25461b] to-[#1c3814] text-white flex flex-col hidden md:flex border-r border-[#3a662c]/60 select-none shadow-2xl relative z-30 transition-all duration-300 overflow-hidden ${isSidebarCollapsed ? 'w-18' : 'w-60 lg:w-64'
          }`}
      >
        {renderNavContent(false)}
      </aside>

      {/* Mobile Slide-Over Drawer (Screens < md) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full bg-gradient-to-b from-[#2e5722] via-[#25461b] to-[#1c3814] text-white flex flex-col shadow-2xl z-10 overflow-hidden">
            {renderNavContent(true)}
          </div>
        </div>
      )}
    </>
  );
}

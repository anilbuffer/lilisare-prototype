'use client';

import React, { ReactNode, useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { usePortal } from '@/lib/store/portal-context';
import { UserRole, RoleConfig } from '@/lib/types';
import { Sidebar } from './Sidebar';
import { TopUtilityBar } from '@/components/dashboard/TopUtilityBar';
import { Menu, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

function getPageTitle(pathname: string, currentRole: UserRole): string {
  if (!pathname || pathname === '/admin-portal' || pathname === '/admin-portal/dashboard') {
    switch (currentRole) {
      case 'caregiver':
        return "Today's Shift & EVV";
      case 'clinical':
        return 'Clinical RN Supervisory Console';
      case 'enrollment':
        return 'Client & Referral Intake';
      case 'billing':
        return 'Medicaid Dual-NPI Billing Engine';
      case 'compliance':
        return 'Compliance & Credential Expirations';
      case 'onboarding':
        return 'Caregiver & Family Onboarding Hub';
      case 'admin':
      default:
        return 'Executive Operations Dashboard';
    }
  }
  if (pathname.startsWith('/admin-portal/client-intake') || pathname.startsWith('/admin-portal/intake-pipeline')) {
    if (pathname.includes('/[id]') || pathname.match(/\/client-intake\/.+/)) {
      return 'Client Intake Record';
    }
    return 'Client Intake';
  }
  if (pathname.startsWith('/admin-portal/caregiver-intake')) {
    if (pathname.includes('/[id]') || pathname.match(/\/caregiver-intake\/.+/)) {
      return 'Caregiver Intake Record';
    }
    return 'Caregiver Intake';
  }
  if (pathname.startsWith('/admin-portal/onboarding')) {
    return 'Onboarding';
  }
  if (pathname.startsWith('/admin-portal/ca-emails') || pathname.startsWith('/admin-portal/cm-emails')) {
    return 'Case Manager Emails';
  }
  if (pathname.startsWith('/admin-portal/clients')) {
    return 'Clients';
  }
  if (pathname.startsWith('/admin-portal/caregivers')) {
    return 'Caregivers';
  }
  if (pathname.startsWith('/admin-portal/screening-center')) {
    return 'Screening Center';
  }
  if (pathname.startsWith('/admin-portal/scheduling-evv')) {
    return 'Scheduling and EVV';
  }
  if (pathname.startsWith('/admin-portal/compliance')) {
    return 'Compliance';
  }
  if (pathname.startsWith('/admin-portal/billing')) {
    return 'Billing';
  }
  if (pathname.startsWith('/admin-portal/client-profitability')) {
    return 'Client Profitability';
  }
  if (pathname.startsWith('/admin-portal/reports')) {
    return 'Reports';
  }
  if (pathname.startsWith('/admin-portal/note-audit')) {
    return 'Note Audit';
  }
  return 'Dashboard';
}

export function AppContentWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const router = useRouter();
  const { activeView, applications, currentRole, currentRoleConfig, switchRole } = usePortal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pendingApprovalsCount = applications.filter(
    (a) => a.status === 'Pending Review' || a.status === 'In Verification'
  ).length;

  // If navigating via Next.js App Router under /admin-portal, render the Admin shell with fixed sticky sidebar
  const isPortalRoute = pathname.startsWith('/admin-portal') || pathname.startsWith('/portal');

  // Verify role access boundary for current persona
  const isPathAllowed = useMemo(() => {
    if (!isPortalRoute) return true;
    if (!currentRoleConfig?.allowedPaths || currentRoleConfig.allowedPaths.includes('*')) {
      return true;
    }
    return currentRoleConfig.allowedPaths.some(
      (allowed) => pathname === allowed || pathname.startsWith(allowed + '/')
    );
  }, [isPortalRoute, currentRoleConfig, pathname]);

  // If not on an admin portal route, check legacy activeView fallback
  const isLegacyFullWidth =
    activeView === 'login' ||
    activeView === 'landing' ||
    activeView === 'wizard' ||
    activeView === 'patient-flow' ||
    activeView === 'caregiver-flow';

  if (!isPortalRoute && (isLegacyFullWidth || pathname === '/' || pathname === '/login' || pathname === '/registration' || pathname.startsWith('/registration') || pathname === '/landing')) {
    return (
      <main className="flex-1 overflow-y-auto w-full h-screen">
        {children}
      </main>
    );
  }

  // Fixed sidebar pinned to the left, only the right content area scrolls
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f4f7f6]">
      {/* Desktop Sticky Sidebar + Mobile Slide Drawer */}
      <Sidebar
        mobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Independently Scrollable Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Mobile Portal Navigation Top Bar (Screens < md) */}
        <div className="md:hidden sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-2.5 flex items-center justify-between shadow-2xs">
          <Link href="/admin-portal/dashboard" className="flex items-center gap-2">
            <img src="/images/lilisare-logo.png" alt="LiliSare" className="h-6 w-auto object-contain" />
            <div className="border-l border-slate-200 pl-2">
              <span className="text-xs font-black text-slate-900 tracking-tight block leading-tight">
                LiliSphere
              </span>
              <span className="text-[9px] font-bold text-[#3e6b2b]">
                {currentRoleConfig.badgeLabel || currentRole.toUpperCase()}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {pendingApprovalsCount > 0 && currentRole === 'onboarding' && (
              <Link
                href="/admin-portal/onboarding"
                className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center gap-1 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>{pendingApprovalsCount}</span>
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Desktop Fixed Top Utility Bar */}
        <div className="hidden md:block shrink-0 z-30">
          <TopUtilityBar title={getPageTitle(pathname, currentRole)} />
        </div>

        <main className="flex-1 overflow-y-auto p-3.5 sm:p-4.5 lg:p-5 scroll-smooth">
          <div className="max-w-9xl mx-auto pb-8">
            {!isPathAllowed ? (
              <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm text-center space-y-5 animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-xs">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    HIPAA &amp; Role Access Boundary
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Module Restricted for Current Persona
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    This module is isolated to authorized staff roles. You are currently signed in as{' '}
                    <strong className="text-slate-900">{currentRoleConfig.userName || currentRoleConfig.label}</strong> ({currentRoleConfig.userTitle || currentRoleConfig.label}).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 max-w-lg mx-auto text-left space-y-1.5">
                  <p className="font-bold text-slate-800">Your authorized responsibilities:</p>
                  <p className="text-slate-600 leading-relaxed">{currentRoleConfig.description}</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    href="/admin-portal/dashboard"
                    className="px-5 py-2.5 rounded-xl bg-[#3e6b2b] text-white text-xs font-bold hover:bg-[#325723] transition-all cursor-pointer shadow-xs"
                  >
                    Return to {currentRoleConfig.label} Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      switchRole('admin');
                      router.push(pathname);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer border border-slate-300/80"
                  >
                    Switch to Executive Admin (All Modules)
                  </button>
                </div>
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

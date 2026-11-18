'use client';

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePortal } from '@/lib/store/portal-context';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

export function AppContentWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const { activeView, applications } = usePortal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pendingApprovalsCount = applications.filter(
    (a) => a.status === 'Pending Review' || a.status === 'In Verification'
  ).length;

  // If navigating via Next.js App Router under /admin-portal, render the Admin shell with fixed sticky sidebar
  const isPortalRoute = pathname.startsWith('/admin-portal') || pathname.startsWith('/portal');

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
              <span className="text-[9px] font-semibold text-[#3e6b2b]">ADMIN</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {pendingApprovalsCount > 0 && (
              <Link
                href="/admin-portal/onboarding"
                className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] flex items-center gap-1 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>{pendingApprovalsCount} Pending</span>
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

        <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-7 xl:p-8 scroll-smooth">
          <div className="max-w-9xl mx-auto pb-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

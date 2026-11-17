'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { usePortal } from '@/lib/store/portal-context';
import { Sidebar } from './Sidebar';

export function AppContentWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { activeView } = usePortal();

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
      {/* Fixed Sticky Sidebar */}
      <Sidebar />

      {/* Independently Scrollable Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 xl:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto pb-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

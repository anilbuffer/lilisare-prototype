'use client';

import React, { ReactNode } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppContentWrapper({ children }: { children: ReactNode }) {
  const { activeView } = usePortal();

  // On consumer marketing landing page or initial wizard, keep full-width specialized shell
  if (activeView === 'landing' || activeView === 'wizard') {
    return (
      <main className="flex-1 overflow-y-auto w-full">
        {children}
      </main>
    );
  }

  // On operational portals, flows, EVV hub, and data vault, provide top navigation header and role-scoped sidebar
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

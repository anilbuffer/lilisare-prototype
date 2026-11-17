'use client';

import React, { ReactNode } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { Sidebar } from './Sidebar';

export function AppContentWrapper({ children }: { children: ReactNode }) {
  const { activeView } = usePortal();

  if (activeView === 'landing') {
    return (
      <main className="flex-1 overflow-y-auto w-full">
        {children}
      </main>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

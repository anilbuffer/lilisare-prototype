'use client';

import React, { Suspense } from 'react';
import { ClientIntakePortal } from '@/components/portals/ClientIntakePortal';

export default function ClientIntakePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500">
          Loading Client Intake Pipeline...
        </div>
      }
    >
      <ClientIntakePortal />
    </Suspense>
  );
}

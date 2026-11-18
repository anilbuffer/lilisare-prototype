'use client';

import React, { Suspense } from 'react';
import { CaregiverIntakePortal } from '@/components/portals/CaregiverIntakePortal';

export default function CaregiverIntakePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500">
          Loading Caregiver Intake Pipeline...
        </div>
      }
    >
      <CaregiverIntakePortal />
    </Suspense>
  );
}

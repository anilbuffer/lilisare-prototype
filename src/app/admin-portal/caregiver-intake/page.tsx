'use client';

import React, { Suspense } from 'react';
import { AgencyApprovalsCenter } from '@/components/portals/AgencyApprovalsCenter';

export default function CaregiverIntakePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500">
          Loading Caregiver Intake Center...
        </div>
      }
    >
      <div className="space-y-6">
        <AgencyApprovalsCenter
          title="Caregiver Intake & Approvals"
          defaultTypeFilter="Caregiver"
        />
      </div>
    </Suspense>
  );
}

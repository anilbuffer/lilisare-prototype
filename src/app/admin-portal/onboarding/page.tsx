'use client';

import React, { Suspense } from 'react';
import { OnboardingHouseholdPortal } from '@/components/portals/OnboardingHouseholdPortal';

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500">
          Loading Onboarding Center...
        </div>
      }
    >
      <OnboardingHouseholdPortal />
    </Suspense>
  );
}

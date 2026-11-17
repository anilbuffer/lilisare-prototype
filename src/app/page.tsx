'use client';

import React from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { OnboardingPortal } from '@/components/portals/OnboardingPortal';
import { CaregiverPortal } from '@/components/portals/CaregiverPortal';
import { EnrollmentPortal } from '@/components/portals/EnrollmentPortal';
import { ClinicalPortal } from '@/components/portals/ClinicalPortal';
import { CompliancePortal } from '@/components/portals/CompliancePortal';
import { BillingPortal } from '@/components/portals/BillingPortal';
import { AdminPortal } from '@/components/portals/AdminPortal';

export default function Home() {
  const { currentRole } = usePortal();

  return (
    <div className="w-full">
      {currentRole === 'onboarding' && <OnboardingPortal />}
      {currentRole === 'caregiver' && <CaregiverPortal />}
      {currentRole === 'enrollment' && <EnrollmentPortal />}
      {currentRole === 'clinical' && <ClinicalPortal />}
      {currentRole === 'compliance' && <CompliancePortal />}
      {currentRole === 'billing' && <BillingPortal />}
      {currentRole === 'admin' && <AdminPortal />}
    </div>
  );
}

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
import { CaregiverOnboardingFlow } from '@/components/flows/CaregiverOnboardingFlow';
import { PatientOnboardingFlow } from '@/components/flows/PatientOnboardingFlow';
import { ColoradoEVVAggregatorView } from '@/components/views/ColoradoEVVAggregatorView';
import { HistoricalDataMigrationView } from '@/components/views/HistoricalDataMigrationView';

export default function Home() {
  const { currentRole, activeView } = usePortal();

  // If a specific interactive workflow or integration hub is selected
  if (activeView === 'caregiver-flow') {
    return <CaregiverOnboardingFlow />;
  }

  if (activeView === 'patient-flow') {
    return <PatientOnboardingFlow />;
  }

  if (activeView === 'evv-aggregator') {
    return <ColoradoEVVAggregatorView />;
  }

  if (activeView === 'data-migration') {
    return <HistoricalDataMigrationView />;
  }

  // Otherwise render the role-scoped portal
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

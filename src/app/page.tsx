'use client';

import React from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { LandingPage } from '@/components/landing/LandingPage';
import { OnboardingWizard } from '@/components/onboarding-wizard/OnboardingWizard';
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
  const { currentRole, activeView, setActiveView } = usePortal();

  // Task 1: Marketing Landing Page
  if (activeView === 'landing') {
    return (
      <LandingPage
        onStartOnboarding={() => setActiveView('wizard')}
        onExplorePortal={() => setActiveView('portal')}
      />
    );
  }

  // Task 2: Patient & Caregiver Onboarding Wizard (Rules 1-5)
  if (activeView === 'wizard') {
    return <OnboardingWizard onComplete={() => setActiveView('landing')} />;
  }

  // Process Flow Visualizers
  if (activeView === 'caregiver-flow') {
    return <CaregiverOnboardingFlow />;
  }

  if (activeView === 'patient-flow') {
    return <PatientOnboardingFlow />;
  }

  // Integrations & Vault
  if (activeView === 'evv-aggregator') {
    return <ColoradoEVVAggregatorView />;
  }

  if (activeView === 'data-migration') {
    return <HistoricalDataMigrationView />;
  }

  // Role-Scoped Operations Portals
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

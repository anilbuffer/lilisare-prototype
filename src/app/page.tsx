'use client';

import React from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { LandingPage } from '@/components/landing/LandingPage';
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

  // Marketing Landing Page:
  // - "Get Started" opens Patient Register form steps wizard
  // - "Staff Portal" opens Caregiver Register form steps wizard
  if (activeView === 'landing') {
    return (
      <LandingPage
        onStartOnboarding={() => setActiveView('patient-flow')}
        onExplorePortal={() => setActiveView('caregiver-flow')}
      />
    );
  }

  // Patient Register Form Steps Wizard (8 Steps) - Triggered by "Get Started"
  if (activeView === 'patient-flow' || activeView === 'wizard') {
    return (
      <PatientOnboardingFlow
        onBackToHome={() => setActiveView('landing')}
        onSwitchToCaregiver={() => setActiveView('caregiver-flow')}
      />
    );
  }

  // Caregiver Register Form Steps Wizard (10 Steps) - Triggered by "Staff Portal"
  if (activeView === 'caregiver-flow') {
    return (
      <CaregiverOnboardingFlow
        onBackToHome={() => setActiveView('landing')}
        onSwitchToPatient={() => setActiveView('patient-flow')}
      />
    );
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

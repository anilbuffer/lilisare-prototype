'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PatientOnboardingFlow } from '@/components/flows/PatientOnboardingFlow';

export default function PatientRegistrationPage() {
  const router = useRouter();

  return (
    <PatientOnboardingFlow
      onBackToHome={() => router.push('/landing')}
      onSwitchToCaregiver={() => router.push('/registration/caregiver')}
    />
  );
}

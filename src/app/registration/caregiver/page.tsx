'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CaregiverOnboardingFlow } from '@/components/flows/CaregiverOnboardingFlow';

export default function CaregiverRegistrationPage() {
  const router = useRouter();

  return (
    <CaregiverOnboardingFlow
      onBackToHome={() => router.push('/landing')}
      onSwitchToPatient={() => router.push('/registration/patient')}
    />
  );
}

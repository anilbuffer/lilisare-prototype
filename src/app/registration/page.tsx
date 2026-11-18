'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PatientOnboardingFlow } from '@/components/flows/PatientOnboardingFlow';
import { CaregiverOnboardingFlow } from '@/components/flows/CaregiverOnboardingFlow';

function RegistrationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams?.get('type');

  if (type === 'caregiver') {
    return (
      <CaregiverOnboardingFlow
        onBackToHome={() => router.push('/landing')}
        onSwitchToPatient={() => router.push('/registration?type=patient')}
      />
    );
  }

  return (
    <PatientOnboardingFlow
      onBackToHome={() => router.push('/landing')}
      onSwitchToCaregiver={() => router.push('/registration?type=caregiver')}
    />
  );
}

export default function RegistrationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-sm">Loading registration portal...</div>}>
      <RegistrationContent />
    </Suspense>
  );
}

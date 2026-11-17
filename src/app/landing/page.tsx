'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LandingPage } from '@/components/landing/LandingPage';

export default function MarketingLandingPage() {
  const router = useRouter();

  return (
    <LandingPage
      onStartOnboarding={() => router.push('/registration/patient')}
      onExplorePortal={() => router.push('/registration/caregiver')}
    />
  );
}

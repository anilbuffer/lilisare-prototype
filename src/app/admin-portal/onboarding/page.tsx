'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { OnboardingPortal } from '@/components/portals/OnboardingPortal';
import { AgencyApprovalsCenter } from '@/components/portals/AgencyApprovalsCenter';
import { usePortal } from '@/lib/store/portal-context';
import { ShieldCheck, UserCheck, Sparkles } from 'lucide-react';

function OnboardingContent() {
  const searchParams = useSearchParams();
  const urlTab = searchParams.get('tab');
  const initialAppId = searchParams.get('appId') || undefined;

  const { applications } = usePortal();
  const [activeTab, setActiveTab] = useState<'approvals' | 'credentialing'>(
    urlTab === 'approvals' ? 'approvals' : 'credentialing'
  );

  const pendingApprovalsCount = applications.filter(
    (a) => a.status === 'Pending Review' || a.status === 'In Verification'
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Mode Switcher Bar */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('approvals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'approvals'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Registration Approvals &amp; Step Verification</span>
            {pendingApprovalsCount > 0 && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'approvals'
                    ? 'bg-secondary text-primary-900'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {pendingApprovalsCount} Action Required
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('credentialing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'credentialing'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Caregiver Roster &amp; Document Engine</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 pr-3">
          <Sparkles className="w-3.5 h-3.5 text-secondary" />
          <span>Agency Intake Queue</span>
        </div>
      </div>

      {/* Render Active View */}
      {activeTab === 'approvals' ? (
        <AgencyApprovalsCenter initialSelectedId={initialAppId} />
      ) : (
        <OnboardingPortal />
      )}
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500">
          Loading Onboarding &amp; Approvals Center...
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}

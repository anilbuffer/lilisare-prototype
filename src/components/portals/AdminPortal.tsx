'use client';

import React, { useState, useEffect } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { DashboardControls } from '../dashboard/DashboardControls';
import { KpiCards } from '../dashboard/KpiCards';
import { NeedsAttentionSection } from '../dashboard/NeedsAttentionSection';
import { FunnelAndPipelineSection } from '../dashboard/FunnelAndPipelineSection';
import { ComplianceSectionCards } from '../dashboard/ComplianceSectionCards';
import { BillingSectionCards } from '../dashboard/BillingSectionCards';
import { SchedulerSectionCards } from '../dashboard/SchedulerSectionCards';
import { InsightsAndActivitySection } from '../dashboard/InsightsAndActivitySection';
import { AutomationBanner } from '../dashboard/AutomationBanner';
import { AIBriefingDrawer } from '../dashboard/AIBriefingDrawer';
import { DashboardDrawers } from '../dashboard/DashboardDrawers';
import {
  BranchId,
  DashboardTabId,
  BRANCH_DATA,
  SearchItem,
} from '../dashboard/dashboard-data';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  DollarSign,
  Clock,
  Sparkles,
} from 'lucide-react';
import { CaregiverPortal } from './CaregiverPortal';
import { ClinicalPortal } from './ClinicalPortal';
import { EnrollmentPortal } from './EnrollmentPortal';
import { BillingPortal } from './BillingPortal';
import { CompliancePortal } from './CompliancePortal';
import { OnboardingPortal } from './OnboardingPortal';

export function AdminPortal() {
  const { notify, switchRole, setActiveView, currentRole } = usePortal();

  // Role-scoped portal views per system requirements
  if (currentRole === 'caregiver') {
    return <CaregiverPortal />;
  }
  if (currentRole === 'clinical') {
    return <ClinicalPortal />;
  }
  if (currentRole === 'enrollment') {
    return <EnrollmentPortal />;
  }
  if (currentRole === 'billing') {
    return <BillingPortal />;
  }
  if (currentRole === 'compliance') {
    return <CompliancePortal />;
  }
  if (currentRole === 'onboarding') {
    return <OnboardingPortal />;
  }

  // Branch Selector State: Default 'mountain-lane'
  const [currentBranch, setCurrentBranch] = useState<BranchId>('mountain-lane');

  // Active section indicator for in-page navigation
  const [activeSection, setActiveSection] = useState<DashboardTabId>('executive');

  // AI Briefing Drawer State
  const [isAIBriefingOpen, setIsAIBriefingOpen] = useState(false);

  // Contextual Drawer State
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [drawerData, setDrawerData] = useState<any>(null);

  // Current branch data
  const branchData = BRANCH_DATA[currentBranch];

  // Handler for branch change
  const handleSelectBranch = (branchId: BranchId) => {
    setCurrentBranch(branchId);
    const targetBranch = BRANCH_DATA[branchId];
    notify(
      'Branch Context Switched',
      `Operating view updated to ${targetBranch.name} (${targetBranch.code}). Metrics & queues recalibrated.`,
      'info'
    );
  };

  // Smooth scroll to target section
  const handleNavigateSection = (sectionId: DashboardTabId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds: DashboardTabId[] = ['executive', 'onboarding', 'compliance', 'billing', 'scheduler'];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace('section-', '') as DashboardTabId;
          setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(`section-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handler for search selection
  const handleSelectSearchItem = (item: SearchItem) => {
    if (item.type === 'client') {
      setActiveDrawer('kpi-clients');
      setDrawerData(item);
      notify('Client Selected', `Viewing client profile for ${item.title}`, 'info');
    } else if (item.type === 'caregiver') {
      setActiveDrawer('kpi-caregivers');
      setDrawerData(item);
      notify('Caregiver Selected', `Viewing caregiver file for ${item.title}`, 'info');
    } else if (item.type === 'page') {
      if (item.id === 'page-2') {
        handleNavigateSection('onboarding');
      } else if (item.id === 'page-4') {
        setActiveDrawer('kpi-authorizations');
      } else if (item.id === 'page-5') {
        setActiveDrawer('expired-credentials');
      } else if (item.id === 'page-3') {
        setActiveView('evv-aggregator');
      } else if (item.id === 'page-7') {
        handleNavigateSection('billing');
      } else if (item.id === 'page-8') {
        setActiveView('data-migration');
      } else {
        handleNavigateSection('executive');
      }
      notify('Navigation', `Navigated to ${item.title}`, 'info');
    }
  };

  // Handler for AI Briefing triggers
  const handleAIBriefingAction = (actionType: string) => {
    if (actionType === 'draft-cm-batch') {
      setActiveDrawer('auth-queue');
      notify('Batch Composer Ready', 'Opened Prior Authorization follow-up queue for Case Managers.', 'info');
    } else if (actionType === 'dispatch-credential-sms') {
      setActiveDrawer('expired-credentials');
      notify('Credential Reminders', 'Caregiver compliance queue ready for automated renewal dispatch.', 'info');
    } else if (actionType === 'review-evv-shifts') {
      setActiveDrawer('evv-exceptions');
      notify('EVV Audit', 'Opened 14 at-risk shifts for geofence and timestamp reconciliation.', 'info');
    }
  };

  // Handler for KPI Drawer
  const handleOpenKpiDrawer = (kpiId: string) => {
    switch (kpiId) {
      case 'clients':
        setActiveDrawer('kpi-clients');
        break;
      case 'caregivers':
        setActiveDrawer('kpi-caregivers');
        break;
      case 'authorizations':
        setActiveDrawer('kpi-authorizations');
        break;
      case 'compliance':
        setActiveDrawer('expired-credentials');
        break;
      case 'households':
        setActiveDrawer('kpi-households');
        break;
      default:
        setActiveDrawer('all-notifications');
    }
  };

  // Handler for Needs Attention Drawer
  const handleOpenAttentionDrawer = (contextType: string) => {
    setActiveDrawer(contextType);
  };

  // Handler for Insights action
  const handleInsightAction = (actionType: 'staffing' | 'compliance' | 'revenue' | 'onboarding') => {
    switch (actionType) {
      case 'staffing':
        setActiveDrawer('staffing');
        break;
      case 'compliance':
        setActiveDrawer('expired-credentials');
        break;
      case 'revenue':
        setActiveDrawer('kpi-authorizations');
        break;
      case 'onboarding':
        setActiveDrawer('stuck-households');
        break;
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-150">
      {/* 1. GREETING & UNIFIED CONTROLS */}
      <DashboardControls
        branchData={branchData}
        currentBranch={currentBranch}
        onSelectBranch={handleSelectBranch}
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        onOpenAIBriefing={() => setIsAIBriefingOpen(true)}
      />

      {/* ========================================================================= */}
      {/* SECTION 1: EXECUTIVE OVERVIEW                                             */}
      {/* ========================================================================= */}
      <section id="section-executive" className="scroll-mt-6 space-y-4">
        {/* Section Title Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#3e6b2b]/10 text-[#3e6b2b] flex items-center justify-center font-bold shadow-2xs">
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Executive Overview
              </h2>
              <p className="text-xs text-slate-500">
                Agency census, critical attention items, and organizational health
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Overview
          </span>
        </div>

        {/* 5 Executive KPI Cards */}
        <KpiCards
          branchData={branchData}
          domain="executive"
          onOpenKpiDrawer={handleOpenKpiDrawer}
        />

        {/* Needs your attention (7 priority items) */}
        <NeedsAttentionSection
          branchData={branchData}
          onOpenAttentionDrawer={handleOpenAttentionDrawer}
          onViewAllTasks={() => setActiveDrawer('all-notifications')}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: ONBOARDING & INTAKE PIPELINE                                   */}
      {/* ========================================================================= */}
      <section id="section-onboarding" className="scroll-mt-6 space-y-4">
        {/* Section Title Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#3e6b2b]/10 text-[#3e6b2b] flex items-center justify-center font-bold shadow-2xs">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Onboarding &amp; Intake Pipeline
              </h2>
              <p className="text-xs text-slate-500">
                Caregiver activation velocity, document verification, and client referrals
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80">
            Onboarding Hub
          </span>
        </div>

        {/* 5 Onboarding KPI Cards */}
        <KpiCards
          branchData={branchData}
          domain="onboarding"
          onOpenKpiDrawer={handleOpenKpiDrawer}
        />

        {/* 2-Column Funnel & Pipeline Cards */}
        <FunnelAndPipelineSection
          branchData={branchData}
          onViewAllFunnel={() => setActiveDrawer('kpi-caregivers')}
          onViewAllPipeline={() => setActiveDrawer('kpi-clients')}
          onOpenStageDetails={(type) => {
            if (type === 'funnel') setActiveDrawer('kpi-caregivers');
            else setActiveDrawer('kpi-clients');
          }}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: COMPLIANCE & CLINICAL QA                                       */}
      {/* ========================================================================= */}
      <section id="section-compliance" className="scroll-mt-6 space-y-4">
        {/* Section Title Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#3e6b2b]/10 text-[#3e6b2b] flex items-center justify-center font-bold shadow-2xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Compliance &amp; Clinical Oversight
              </h2>
              <p className="text-xs text-slate-500">
                State Medicaid licenses, background check re-screenings, and nurse supervisory visits
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
            State QA &amp; Audits
          </span>
        </div>

        {/* 5 Compliance KPI Cards */}
        <KpiCards
          branchData={branchData}
          domain="compliance"
          onOpenKpiDrawer={handleOpenKpiDrawer}
        />

        {/* 2-Column Credentials & Supervisory Cards */}
        <ComplianceSectionCards
          branchData={branchData}
          onViewAllCompliance={() => setActiveDrawer('expired-credentials')}
          onOpenComplianceDetail={(item) => {
            setActiveDrawer('expired-credentials');
            setDrawerData(item);
          }}
          onViewAllVisits={() => setActiveDrawer('supervisory-visits')}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: BILLING & REVENUE CYCLE                                        */}
      {/* ========================================================================= */}
      <section id="section-billing" className="scroll-mt-6 space-y-4">
        {/* Section Title Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#3e6b2b]/10 text-[#3e6b2b] flex items-center justify-center font-bold shadow-2xs">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Billing &amp; Revenue Cycle
              </h2>
              <p className="text-xs text-slate-500">
                Claims submission, prior authorizations, commercial denial letters, and ADP payroll
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#3e6b2b] border border-emerald-200/80">
            Revenue Cycle
          </span>
        </div>

        {/* 5 Billing KPI Cards */}
        <KpiCards
          branchData={branchData}
          domain="billing"
          onOpenKpiDrawer={handleOpenKpiDrawer}
        />

        {/* 4-Card 2x2 Billing Grid */}
        <BillingSectionCards
          branchData={branchData}
          onViewAllBilling={() => setActiveDrawer('kpi-authorizations')}
          onSendFollowUp={(record) => {
            setActiveDrawer('kpi-authorizations');
            setDrawerData(record);
          }}
          onExportPayroll={() => notify('ADP Export Generated', 'Successfully generated payroll batch export file.', 'success')}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: SCHEDULER & EVV TELEMETRY                                      */}
      {/* ========================================================================= */}
      <section id="section-scheduler" className="scroll-mt-6 space-y-4">
        {/* Section Title Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#3e6b2b]/10 text-[#3e6b2b] flex items-center justify-center font-bold shadow-2xs">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Scheduler &amp; EVV Telemetry
              </h2>
              <p className="text-xs text-slate-500">
                Shift allocation, Sandata Colorado GPS compliance, unverified hours, and regional overtime
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200/80">
            Live EVV Hub
          </span>
        </div>

        {/* 5 Scheduler KPI Cards */}
        <KpiCards
          branchData={branchData}
          domain="scheduler"
          onOpenKpiDrawer={handleOpenKpiDrawer}
        />

        {/* 4-Card 2x2 Scheduler Grid */}
        <SchedulerSectionCards
          branchData={branchData}
          onViewAllScheduler={() => setActiveDrawer('evv-exceptions')}
          onOpenShiftDetail={() => setActiveDrawer('staffing')}
          onOpenEvvDetail={() => setActiveDrawer('evv-exceptions')}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: INSIGHTS & LIVE ACTIVITY                                       */}
      {/* ========================================================================= */}
      <InsightsAndActivitySection
        branchData={branchData}
        onInsightAction={handleInsightAction}
        onViewAll={() => setActiveDrawer('all-notifications')}
      />

      {/* ========================================================================= */}
      {/* SECTION 7: BOTTOM AUTOMATION SUMMARY BANNER                               */}
      {/* ========================================================================= */}
      <AutomationBanner
        branchData={branchData}
        onOpenAutomationRules={() => setActiveDrawer('automation-rules')}
      />

      {/* AI Briefing Drawer */}
      <AIBriefingDrawer
        isOpen={isAIBriefingOpen}
        onClose={() => setIsAIBriefingOpen(false)}
        branchData={branchData}
        onTriggerAction={handleAIBriefingAction}
      />

      {/* Contextual Inspection Drawers & Confirmation Modals */}
      <DashboardDrawers
        activeDrawer={activeDrawer}
        drawerData={drawerData}
        onClose={() => {
          setActiveDrawer(null);
          setDrawerData(null);
        }}
        branchData={branchData}
        onNotify={notify}
      />
    </div>
  );
}

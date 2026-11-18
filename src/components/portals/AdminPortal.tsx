'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { DashboardControls } from '../dashboard/DashboardControls';
import { KpiCards } from '../dashboard/KpiCards';
import { VisitsAndSatisfactionSection } from '../dashboard/VisitsAndSatisfactionSection';
import { EVVAndWastedHoursSection } from '../dashboard/EVVAndWastedHoursSection';
import { FinancialAndAuthSection } from '../dashboard/FinancialAndAuthSection';
import { IncidentsAndPerformanceSection } from '../dashboard/IncidentsAndPerformanceSection';
import { InsightsAndFeedSection } from '../dashboard/InsightsAndFeedSection';
import { AutomationBanner } from '../dashboard/AutomationBanner';
import { AIBriefingDrawer } from '../dashboard/AIBriefingDrawer';
import { DashboardDrawers } from '../dashboard/DashboardDrawers';
import {
  BranchId,
  BRANCH_DATA,
  SearchItem,
} from '../dashboard/dashboard-data';
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
        setActiveDrawer('kpi-caregivers');
      } else if (item.id === 'page-4') {
        setActiveDrawer('kpi-authorizations');
      } else if (item.id === 'page-5') {
        setActiveDrawer('expired-credentials');
      } else if (item.id === 'page-3') {
        setActiveView('evv-aggregator');
      } else if (item.id === 'page-7') {
        setActiveDrawer('kpi-authorizations');
      } else if (item.id === 'page-8') {
        setActiveView('data-migration');
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
      case 'kpi-clients':
        setActiveDrawer('kpi-clients');
        break;
      case 'caregivers':
      case 'kpi-caregivers':
        setActiveDrawer('kpi-caregivers');
        break;
      case 'authorizations':
      case 'kpi-authorizations':
        setActiveDrawer('kpi-authorizations');
        break;
      case 'compliance':
      case 'expired-credentials':
        setActiveDrawer('expired-credentials');
        break;
      case 'evv-exceptions':
        setActiveDrawer('evv-exceptions');
        break;
      case 'staffing':
        setActiveDrawer('staffing');
        break;
      case 'households':
      case 'kpi-households':
        setActiveDrawer('kpi-households');
        break;
      default:
        setActiveDrawer('all-notifications');
    }
  };

  // Handler for Insights action
  const handleInsightAction = (actionType: 'staffing' | 'compliance' | 'revenue' | 'onboarding' | string) => {
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
      case 'risk':
        setActiveDrawer('stuck-households');
        break;
      default:
        setActiveDrawer('all-notifications');
    }
  };

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 w-full animate-in fade-in duration-150">
      {/* 1. GREETING & EHR CONTROLS (Single-Page Header, No In-Page Tabs) */}
      <DashboardControls
        branchData={branchData}
        currentBranch={currentBranch}
        onSelectBranch={handleSelectBranch}
        onOpenAIBriefing={() => setIsAIBriefingOpen(true)}
      />

      {/* 2. TOP KPI SUMMARY SECTION (7 Compact Cards in Clean Single Row) */}
      <KpiCards
        branchData={branchData}
        domain="top-summary"
        onOpenKpiDrawer={handleOpenKpiDrawer}
      />

      {/* 3. ROW 2: VISITS THIS WEEK (Bar Chart) & PATIENT SATISFACTION (Radial Gauge) */}
      <VisitsAndSatisfactionSection
        branchData={branchData}
        onViewAllSatisfaction={() => setActiveDrawer('all-notifications')}
        onViewVisitsDetail={() => setActiveDrawer('evv-exceptions')}
      />

      {/* 4. ROW 3: EVV COMPLIANCE (Donut Ring & Risk Card) & WASTED HOURS (Schedule vs Actual Breakdown) */}
      <EVVAndWastedHoursSection
        branchData={branchData}
        onOpenEvvExceptions={() => setActiveDrawer('evv-exceptions')}
        onOpenWastedTime={() => setActiveDrawer('evv-exceptions')}
      />

      {/* 5. ROW 4: FINANCIAL HEALTH (Donut & AR Aging), AUTHORIZATION UTILIZATION (Bars), CAREGIVER OVERTIME */}
      <FinancialAndAuthSection
        branchData={branchData}
        onOpenFinancialDetails={() => setActiveDrawer('kpi-authorizations')}
        onOpenAuthReport={() => setActiveDrawer('kpi-authorizations')}
        onOpenOvertimeSchedule={() => setActiveDrawer('staffing')}
      />

      {/* 6. ROW 5: RECENT INCIDENTS, TOP PERFORMING CAREGIVERS, TRAINING EXPIRY */}
      <IncidentsAndPerformanceSection
        branchData={branchData}
        onViewAllIncidents={() => setActiveDrawer('all-notifications')}
        onViewFullRanking={() => setActiveDrawer('kpi-caregivers')}
        onManageTraining={() => setActiveDrawer('expired-credentials')}
        onSelectIncident={(inc) => {
          setActiveDrawer('all-notifications');
          setDrawerData(inc);
        }}
      />

      {/* 7. ROW 6: AT A GLANCE (Mini Gauges), ALL INSIGHTS (Sidekick AI), LIVE VISIT FEED */}
      <InsightsAndFeedSection
        branchData={branchData}
        onOpenLiveFeed={() => setActiveDrawer('evv-exceptions')}
        onTriggerInsight={handleInsightAction}
        onSelectVisit={(visit) => {
          setActiveDrawer('evv-exceptions');
          setDrawerData(visit);
        }}
      />

      {/* 8. BOTTOM AUTOMATION SUMMARY BANNER */}
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

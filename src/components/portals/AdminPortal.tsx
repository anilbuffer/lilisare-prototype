'use client';

import React, { useState } from 'react';
import { usePortal } from '@/lib/store/portal-context';
import { DashboardControls, DashboardTabs } from '../dashboard/DashboardControls';
import { KpiCards } from '../dashboard/KpiCards';
import { NeedsAttentionSection } from '../dashboard/NeedsAttentionSection';
import { FunnelAndPipelineSection } from '../dashboard/FunnelAndPipelineSection';
import { AuthorizationsAndComplianceSection } from '../dashboard/AuthorizationsAndComplianceSection';
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
import { Filter } from 'lucide-react';
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

  // Dashboard Tabs State: Default 'executive'
  const [activeTab, setActiveTab] = useState<DashboardTabId>('executive');

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
        setActiveTab('onboarding');
      } else if (item.id === 'page-4') {
        setActiveDrawer('kpi-authorizations');
      } else if (item.id === 'page-5') {
        setActiveDrawer('expired-credentials');
      } else if (item.id === 'page-3') {
        setActiveView('evv-aggregator');
      } else if (item.id === 'page-7') {
        setActiveTab('billing');
      } else if (item.id === 'page-8') {
        setActiveView('data-migration');
      } else {
        setActiveTab('executive');
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
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-150">
      {/* 1. GREETING & HEADER CONTROLS */}
      <DashboardControls
        branchData={branchData}
        currentBranch={currentBranch}
        onSelectBranch={handleSelectBranch}
        onOpenAIBriefing={() => setIsAIBriefingOpen(true)}
        onTrackCaregivers={() => {
          notify('Caregiver Telemetry', 'Opening live map tracking for active caregivers.', 'info');
          setActiveDrawer('staffing');
        }}
      />

      {/* 3. TOP KPI CARDS (ACTIVE CLIENTS: 487 • ACTIVE CAREGIVERS: 902 • PENDING AUTHORIZATIONS: 23 • CREDENTIALS EXPIRING: 41 • HOUSEHOLDS STUCK: 11) */}
      <KpiCards
        branchData={branchData}
        onOpenKpiDrawer={handleOpenKpiDrawer}
      />

      {/* 4. DASHBOARD VIEW TABS (JUST BELOW STATS ROW) */}
      <DashboardTabs
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Tab Context Banner when filtered */}
      {activeTab !== 'executive' && (
        <div className="p-3 bg-white border border-[#3e6b2b]/30 rounded-2xl flex items-center justify-between text-xs text-slate-700 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-[#3e6b2b]/10 text-[#3e6b2b]">
              <Filter className="w-3.5 h-3.5" />
            </span>
            <span>
              Dashboard filtered to <strong className="capitalize text-slate-900">{activeTab}</strong> perspective for <strong>{branchData.name}</strong>.
            </span>
          </div>
          <button
            onClick={() => setActiveTab('executive')}
            className="text-[11px] font-bold text-[#3e6b2b] hover:underline cursor-pointer"
          >
            Reset to Executive Overview &times;
          </button>
        </div>
      )}

      {/* 5. NEEDS YOUR ATTENTION (6 PRIORITY ITEMS) */}
      {(activeTab === 'executive' || activeTab === 'compliance' || activeTab === 'billing') && (
        <NeedsAttentionSection
          branchData={branchData}
          onOpenAttentionDrawer={handleOpenAttentionDrawer}
          onViewAllTasks={() => setActiveDrawer('all-notifications')}
        />
      )}

      {/* 6. ONBOARDING FUNNEL & INTAKE PIPELINE */}
      {(activeTab === 'executive' || activeTab === 'onboarding') && (
        <FunnelAndPipelineSection
          branchData={branchData}
          onViewAllFunnel={() => setActiveDrawer('kpi-caregivers')}
          onViewAllPipeline={() => setActiveDrawer('kpi-clients')}
          onOpenStageDetails={(type, stageName) => {
            if (type === 'funnel') setActiveDrawer('kpi-caregivers');
            else setActiveDrawer('kpi-clients');
          }}
        />
      )}

      {/* 7. AUTHORIZATIONS & COMPLIANCE */}
      {(activeTab === 'executive' || activeTab === 'compliance' || activeTab === 'billing') && (
        <AuthorizationsAndComplianceSection
          branchData={branchData}
          onViewAllAuthorizations={() => setActiveDrawer('kpi-authorizations')}
          onViewAllCompliance={() => setActiveDrawer('expired-credentials')}
          onOpenAuthDetail={(record) => {
            setActiveDrawer('kpi-authorizations');
            setDrawerData(record);
          }}
          onSendFollowUp={(record) => {
            setActiveDrawer('kpi-authorizations');
            setDrawerData(record);
          }}
          onOpenComplianceDetail={(item) => {
            setActiveDrawer('expired-credentials');
            setDrawerData(item);
          }}
        />
      )}

      {/* Scheduler Tab Specialized View when selected */}
      {activeTab === 'scheduler' && (
        <div className="p-5 bg-white border border-slate-200/90 rounded-2xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Scheduler Overview — {branchData.name}
              </h3>
              <p className="text-xs text-slate-500">
                Shift allocations, EVV geofence verification and staffing coverage
              </p>
            </div>
            <button
              onClick={() => setActiveDrawer('staffing')}
              className="px-3.5 py-1.5 bg-[#3e6b2b] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#345c24] cursor-pointer"
            >
              Open Douglas County Coverage
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-bold">Today's Scheduled Shifts</span>
              <p className="text-2xl font-black text-slate-900 mt-1">214</p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">198 shifts currently checked in</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-bold">Unassigned Shift Requests</span>
              <p className="text-2xl font-black text-[#ff6900] mt-1">3</p>
              <p className="text-[11px] text-slate-500 mt-1">Douglas County (Parker &amp; Castle Rock)</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-bold">EVV Geofence Match Rate</span>
              <p className="text-2xl font-black text-[#00d084] mt-1">99.1%</p>
              <p className="text-[11px] text-slate-500 mt-1">Self-correction resolved 96% misses</p>
            </div>
          </div>
        </div>
      )}

      {/* 8. INSIGHTS & LIVE ACTIVITY */}
      <InsightsAndActivitySection
        branchData={branchData}
        onInsightAction={handleInsightAction}
        onViewAll={() => setActiveDrawer('all-notifications')}
      />

      {/* 9. BOTTOM AUTOMATION SUMMARY BANNER */}
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

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  UserRole,
  RoleConfig,
  Lead,
  Caregiver,
  Client,
  EVVRecord,
  ComplianceVisit,
  BillingClaim,
  RegistrationApplication,
  StepReviewStatus,
} from '../types';
import {
  SYSTEM_ROLES,
  MOCK_LEADS,
  MOCK_CAREGIVERS,
  MOCK_CLIENTS,
  MOCK_EVV_RECORDS,
  MOCK_COMPLIANCE_VISITS,
  MOCK_BILLING_CLAIMS,
  MOCK_REGISTRATION_APPLICATIONS,
} from '../mock-data';

interface NotificationToast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
}

export type ActiveAppView =
  | 'login'
  | 'landing'
  | 'wizard'
  | 'portal'
  | 'caregiver-flow'
  | 'patient-flow'
  | 'evv-aggregator'
  | 'data-migration';

interface PortalContextType {
  activeView: ActiveAppView;
  setActiveView: (view: ActiveAppView) => void;
  currentRole: UserRole;
  currentRoleConfig: RoleConfig;
  switchRole: (role: UserRole) => void;
  roles: RoleConfig[];
  
  // Leads / Intake
  leads: Lead[];
  updateLeadStatus: (leadId: string, status: Lead['status']) => void;
  addLead: (lead: Omit<Lead, 'id' | 'communicationCount' | 'lastContactDate' | 'createdAt'>) => void;
  
  // Caregivers & Onboarding
  caregivers: Caregiver[];
  updateCaregiverDocStatus: (caregiverId: string, docId: string, status: 'Verified' | 'Rejected') => void;
  runBackgroundCheck: (caregiverId: string, checkId: string) => void;
  activateCaregiver: (caregiverId: string) => void;
  
  // Registration Applications & Agency Verification
  applications: RegistrationApplication[];
  submitRegistrationApplication: (appData: {
    type: 'Caregiver' | 'Patient';
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    linkedEntityName: string;
    serviceOrClassification: string;
    payload: Record<string, any>;
    customSteps?: RegistrationApplication['steps'];
  }) => string;
  updateApplicationStepStatus: (appId: string, stepId: string, status: StepReviewStatus, notes?: string) => void;
  approveApplication: (appId: string, decisionNotes?: string) => void;
  declineApplication: (appId: string, reason: string) => void;
  reopenApplication: (appId: string) => void;

  // Clients
  clients: Client[];
  
  // EVV & Shifts
  evvRecords: EVVRecord[];
  submitClockIn: (caregiverId: string, clientId: string) => void;
  submitClockOut: (recordId: string, notes: string) => void;
  submitSelfCorrection: (recordId: string, correctedTime: string, reason: string) => void;
  approveSelfCorrection: (recordId: string) => void;
  
  // Compliance & Clinical
  complianceVisits: ComplianceVisit[];
  markVisitCompleted: (visitId: string, notes?: string) => void;
  
  // Billing
  billingClaims: BillingClaim[];
  batchSubmitClaims: (claimIds: string[]) => void;
  
  // Feedback / Toasts
  notifications: NotificationToast[];
  dismissNotification: (id: string) => void;
  notify: (title: string, message: string, type?: NotificationToast['type']) => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export function PortalProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<ActiveAppView>('login');
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [caregivers, setCaregivers] = useState<Caregiver[]>(MOCK_CAREGIVERS);
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [evvRecords, setEvvRecords] = useState<EVVRecord[]>(MOCK_EVV_RECORDS);
  const [complianceVisits, setComplianceVisits] = useState<ComplianceVisit[]>(MOCK_COMPLIANCE_VISITS);
  const [billingClaims, setBillingClaims] = useState<BillingClaim[]>(MOCK_BILLING_CLAIMS);
  const [applications, setApplications] = useState<RegistrationApplication[]>(MOCK_REGISTRATION_APPLICATIONS);
  const [notifications, setNotifications] = useState<NotificationToast[]>([]);

  const currentRoleConfig = SYSTEM_ROLES.find((r) => r.id === currentRole) || SYSTEM_ROLES[0];

  const notify = (title: string, message: string, type: NotificationToast['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: NotificationToast = {
      id,
      title,
      message,
      type,
      timestamp: 'Just now',
    };
    setNotifications((prev) => [newToast, ...prev.slice(0, 4)]);
    setTimeout(() => {
      dismissNotification(id);
    }, 4500);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    const target = SYSTEM_ROLES.find((r) => r.id === role);
    notify('Role Switched', `Now operating as: ${target?.label} (${target?.department})`, 'info');
  };

  const updateLeadStatus = (leadId: string, status: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status, lastContactDate: '2026-11-17' } : l))
    );
    notify('Lead Pipeline Updated', `Lead status progressed to "${status}"`, 'success');
  };

  const addLead = (newLeadData: Omit<Lead, 'id' | 'communicationCount' | 'lastContactDate' | 'createdAt'>) => {
    const id = `lead-${Date.now()}`;
    const newLead: Lead = {
      ...newLeadData,
      id,
      communicationCount: 1,
      lastContactDate: '2026-11-17',
      createdAt: '2026-11-17',
    };
    setLeads((prev) => [newLead, ...prev]);
    notify('Inquiry Registered', `New lead for ${newLead.clientName} created successfully`, 'success');
  };

  const updateCaregiverDocStatus = (caregiverId: string, docId: string, status: 'Verified' | 'Rejected') => {
    setCaregivers((prev) =>
      prev.map((cg) => {
        if (cg.id !== caregiverId) return cg;
        const updatedDocs = cg.documents.map((d) =>
          d.id === docId
            ? { ...d, status, verifiedAt: status === 'Verified' ? '2026-11-17' : undefined }
            : d
        );
        const verifiedCount = updatedDocs.filter((d) => d.status === 'Verified').length;
        const progress = Math.round((verifiedCount / Math.max(updatedDocs.length, 1)) * 100);
        return {
          ...cg,
          documents: updatedDocs,
          onboardingProgress: progress,
        };
      })
    );
    notify('Document Verified', `Document marked as ${status}. Onboarding readiness recalculated.`, 'success');
  };

  const runBackgroundCheck = (caregiverId: string, checkId: string) => {
    setCaregivers((prev) =>
      prev.map((cg) => {
        if (cg.id !== caregiverId) return cg;
        const updatedChecks = cg.backgroundChecks.map((bg) =>
          bg.id === checkId
            ? { ...bg, status: 'Passed' as const, completedDate: '2026-11-17' }
            : bg
        );
        return { ...cg, backgroundChecks: updatedChecks };
      })
    );
    notify('CBI Screening Completed', 'State verification returned: No Disqualifying Records Found.', 'success');
  };

  const activateCaregiver = (caregiverId: string) => {
    setCaregivers((prev) =>
      prev.map((cg) => {
        if (cg.id !== caregiverId) return cg;
        return {
          ...cg,
          onboardingStage: 'Active & Activated',
          onboardingProgress: 100,
          adpStatus: 'Active Direct Deposit',
          activatedAt: '2026-11-17',
        };
      })
    );
    notify('Caregiver Activated', 'Caregiver is now certified for authorized shift scheduling and EVV clock-in.', 'success');
  };

  const submitRegistrationApplication = (appData: {
    type: 'Caregiver' | 'Patient';
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    linkedEntityName: string;
    serviceOrClassification: string;
    payload: Record<string, any>;
    customSteps?: RegistrationApplication['steps'];
  }): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const prefix = appData.type === 'Caregiver' ? 'LS-CG' : 'LS-PT';
    const appNumber = `${prefix}-2026-${randomNum}`;
    const id = `app-${Date.now()}`;

    const defaultSteps: RegistrationApplication['steps'] = appData.type === 'Caregiver' ? [
      {
        id: 'step-1',
        name: 'Personal Profile & Colorado Residency',
        category: 'Identity',
        status: 'Verified',
        details: `${appData.city}, ${appData.state} address confirmed. Phone: ${appData.phone}.`,
        verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verifiedBy: 'System Auto-Check',
      },
      {
        id: 'step-2',
        name: 'Classification & Position Selection',
        category: 'Payroll & Consent',
        status: 'Verified',
        details: `Classification: ${appData.serviceOrClassification}. Linked: ${appData.linkedEntityName}.`,
        verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verifiedBy: 'System Auto-Check',
      },
      {
        id: 'step-3',
        name: 'Identification & Form I-9 Document Verification',
        category: 'Documentation',
        status: 'Pending',
        details: 'State Driver License and Social Security Card uploaded. Awaiting visual audit by Agency Admin.',
      },
      {
        id: 'step-4',
        name: 'Colorado CBI Criminal History & CAPS Clearance',
        category: 'Compliance & Background',
        status: 'Pending',
        details: 'Automated CBI fingerprint request queued with Colorado Department of Public Safety.',
      },
      {
        id: 'step-5',
        name: 'Orientation Attestation & Direct Deposit Setup',
        category: 'Payroll & Consent',
        status: 'Pending',
        details: 'Attestation of family care policies and banking details submitted.',
      },
    ] : [
      {
        id: 'step-1',
        name: 'Client Demographics & Guardianship',
        category: 'Identity',
        status: 'Verified',
        details: `Residence: ${appData.address}, ${appData.city}, CO. Primary Contact / Guardian: ${appData.linkedEntityName}.`,
        verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verifiedBy: 'System Auto-Check',
      },
      {
        id: 'step-2',
        name: 'Colorado Medicaid Waiver & Eligibility',
        category: 'Documentation',
        status: 'Pending',
        details: `Program: ${appData.serviceOrClassification}. Medicaid ID verification against Colorado HCPF portal pending.`,
      },
      {
        id: 'step-3',
        name: 'Primary Family Caregiver Assignment',
        category: 'Compliance & Background',
        status: 'Verified',
        details: `Designated caregiver: ${appData.linkedEntityName}. Family attestation verified.`,
        verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verifiedBy: 'System Auto-Check',
      },
      {
        id: 'step-4',
        name: 'Case Management Agency (CMA) Alignment',
        category: 'Waiver & Clinical',
        status: 'Pending',
        details: 'Communication open with designated Colorado Case Management Agency.',
      },
      {
        id: 'step-5',
        name: 'Service Plan & Prior Authorization (PAR)',
        category: 'Waiver & Clinical',
        status: 'Pending',
        details: 'Awaiting clinical supervisor sign-off on authorized hours & care tasks.',
      },
    ];

    const newApp: RegistrationApplication = {
      id,
      applicationNumber: appNumber,
      type: appData.type,
      fullName: appData.fullName,
      email: appData.email,
      phone: appData.phone,
      address: appData.address,
      city: appData.city,
      state: appData.state,
      zip: appData.zip,
      submittedAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Pending Review',
      linkedEntityName: appData.linkedEntityName,
      serviceOrClassification: appData.serviceOrClassification,
      steps: appData.customSteps || defaultSteps,
      payload: appData.payload,
    };

    setApplications((prev) => [newApp, ...prev]);

    notify(
      'Application Submitted to Agency',
      `${appData.fullName}'s registration (${appNumber}) is now pending Agency Admin verification.`,
      'info'
    );

    return appNumber;
  };

  const updateApplicationStepStatus = (
    appId: string,
    stepId: string,
    status: StepReviewStatus,
    notes?: string
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        const updatedSteps = app.steps.map((st) => {
          if (st.id !== stepId) return st;
          return {
            ...st,
            status,
            notes: notes !== undefined ? notes : st.notes,
            verifiedAt: status === 'Verified' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
            verifiedBy: status === 'Verified' ? 'Danielle M. (Agency Intake Director)' : undefined,
          };
        });

        // Compute updated application overall status
        const allVerified = updatedSteps.every((s) => s.status === 'Verified');
        let newAppStatus = app.status;
        if (app.status !== 'Approved' && app.status !== 'Declined') {
          if (allVerified) {
            newAppStatus = 'In Verification';
          } else {
            newAppStatus = 'Pending Review';
          }
        }

        return {
          ...app,
          status: newAppStatus,
          steps: updatedSteps,
        };
      })
    );

    notify(
      'Step Verification Updated',
      `Verification item marked as "${status}".`,
      status === 'Verified' ? 'success' : status === 'Flagged' ? 'warning' : 'info'
    );
  };

  const approveApplication = (appId: string, decisionNotes?: string) => {
    const reviewer = 'Danielle M. (Agency Intake Director)';
    const reviewTime = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let targetApp: RegistrationApplication | undefined;

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        targetApp = app;
        const allVerifiedSteps = app.steps.map((st) => ({
          ...st,
          status: 'Verified' as StepReviewStatus,
          verifiedAt: st.verifiedAt || reviewTime,
          verifiedBy: st.verifiedBy || reviewer,
        }));
        return {
          ...app,
          status: 'Approved',
          reviewedAt: reviewTime,
          reviewedBy: reviewer,
          decisionReason: decisionNotes || 'All identity credentials, documents, state waiver criteria, and background checks cleared and approved by Agency Admin.',
          steps: allVerifiedSteps,
        };
      })
    );

    if (targetApp) {
      notify(
        'Application Approved! 🎉',
        `${(targetApp as RegistrationApplication).fullName}'s ${(targetApp as RegistrationApplication).type} registration has been approved and activated.`,
        'success'
      );
    }
  };

  const declineApplication = (appId: string, reason: string) => {
    const reviewer = 'Danielle M. (Agency Intake Director)';
    const reviewTime = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let targetApp: RegistrationApplication | undefined;

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        targetApp = app;
        return {
          ...app,
          status: 'Declined',
          reviewedAt: reviewTime,
          reviewedBy: reviewer,
          decisionReason: reason || 'Application requires document correction or failed state compliance criteria.',
        };
      })
    );

    if (targetApp) {
      notify(
        'Application Declined / Action Required',
        `Registration for ${(targetApp as RegistrationApplication).fullName} marked as declined. Reason logged.`,
        'error'
      );
    }
  };

  const reopenApplication = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        return {
          ...app,
          status: 'Pending Review',
          decisionReason: undefined,
          reviewedAt: undefined,
          reviewedBy: undefined,
        };
      })
    );
    notify('Application Reopened', 'Status reset to Pending Review for re-evaluation.', 'info');
  };

  const submitClockIn = (caregiverId: string, clientId: string) => {
    const newRecord: EVVRecord = {
      id: `evv-${Date.now()}`,
      caregiverId,
      caregiverName: 'Elena Morales',
      clientId,
      clientName: 'Mateo Morales',
      serviceType: 'IHSS',
      date: '2026-11-17',
      scheduledStartTime: '08:00 AM',
      scheduledEndTime: '12:00 PM',
      actualClockIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      gpsVerified: true,
      evvStateStatus: 'Validated & Matched',
      caregiverNotes: '',
      aiDocumentationCheck: {
        score: 0,
        verifiedKeyActivities: [],
        medicaidComplianceMet: false,
      },
    };
    setEvvRecords((prev) => [newRecord, ...prev]);
    notify('EVV Clock-In Recorded', 'GPS Geofence Verified at Denver Residence (4820 W 38th Ave).', 'success');
  };

  const submitClockOut = (recordId: string, notes: string) => {
    setEvvRecords((prev) =>
      prev.map((r) => {
        if (r.id !== recordId) return r;
        return {
          ...r,
          actualClockOut: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          caregiverNotes: notes,
          aiDocumentationCheck: {
            score: 98,
            verifiedKeyActivities: ['Mobility Support', 'Nutritional Monitoring', 'ADL Hygiene'],
            medicaidComplianceMet: true,
          },
        };
      })
    );
    notify('Shift Clock-Out Stored', 'AI note evaluated: 98% Medicaid compliance accuracy achieved.', 'success');
  };

  const submitSelfCorrection = (recordId: string, requestedTime: string, reason: string) => {
    setEvvRecords((prev) =>
      prev.map((r) => {
        if (r.id !== recordId) return r;
        return {
          ...r,
          caregiverSelfCorrection: {
            originalMissedTime: 'Missed Clock-Out',
            requestedTime,
            reason,
            submittedAt: '2026-11-17 03:30 PM',
            status: 'Pending Approval',
          },
        };
      })
    );
    notify('Time Correction Submitted', 'Routed to Care Coordination team for Colorado EVV audit review.', 'info');
  };

  const approveSelfCorrection = (recordId: string) => {
    setEvvRecords((prev) =>
      prev.map((r) => {
        if (r.id !== recordId || !r.caregiverSelfCorrection) return r;
        return {
          ...r,
          actualClockOut: r.caregiverSelfCorrection.requestedTime,
          evvStateStatus: 'Adjusted by Caregiver',
          caregiverSelfCorrection: {
            ...r.caregiverSelfCorrection,
            status: 'Approved',
            reviewedBy: 'Danielle Brooks (Onboarding / QA)',
          },
        };
      })
    );
    notify('Correction Approved', 'Adjusted shift reconciled for Medicaid claim and ADP payroll batches.', 'success');
  };

  const markVisitCompleted = (visitId: string, notes?: string) => {
    setComplianceVisits((prev) =>
      prev.map((v) => (v.id === visitId ? { ...v, status: 'Completed', completedDate: '2026-11-17', notes: notes || v.notes } : v))
    );
    notify('Supervisory Visit Logged', 'Clinical supervisory record updated and archived for state audit trail.', 'success');
  };

  const batchSubmitClaims = (claimIds: string[]) => {
    setBillingClaims((prev) =>
      prev.map((c) =>
        claimIds.includes(c.id) ? { ...c, status: 'Transmitted to State', submissionDate: '2026-11-17' } : c
      )
    );
    notify('Medicaid Batch Transmitted', `${claimIds.length} verified claims transmitted under respective NPIs.`, 'success');
  };

  return (
    <PortalContext.Provider
      value={{
        activeView,
        setActiveView,
        currentRole,
        currentRoleConfig,
        switchRole,
        roles: SYSTEM_ROLES,
        leads,
        updateLeadStatus,
        addLead,
        caregivers,
        updateCaregiverDocStatus,
        runBackgroundCheck,
        activateCaregiver,
        applications,
        submitRegistrationApplication,
        updateApplicationStepStatus,
        approveApplication,
        declineApplication,
        reopenApplication,
        clients,
        evvRecords,
        submitClockIn,
        submitClockOut,
        submitSelfCorrection,
        approveSelfCorrection,
        complianceVisits,
        markVisitCompleted,
        billingClaims,
        batchSubmitClaims,
        notifications,
        dismissNotification,
        notify,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
}

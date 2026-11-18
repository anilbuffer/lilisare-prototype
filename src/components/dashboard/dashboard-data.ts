export type BranchId = 'mountain-lane' | 'colorado-home-health' | 'frisco';

export type DashboardTabId = 'executive' | 'onboarding' | 'compliance' | 'billing' | 'scheduler';

export interface WeeklyVisitsData {
  completionRate: number;
  days: {
    day: string;
    scheduled: number;
    completed: number;
  }[];
}

export interface PatientSatisfactionData {
  score: number;
  total: number;
  stars: number;
  breakdown: {
    punctuality: number;
    careQuality: number;
    communication: number;
  };
}

export interface EvvSummaryData {
  complianceRate: number;
  atRiskVisits: number;
  atRiskMessage: string;
  exceptions: {
    type: string;
    count: number;
  }[];
}

export interface WastedHoursData {
  totalHours: number;
  costImpact: number;
  lateClockIns: number;
  earlyClockOuts: number;
  lateClockOuts: number;
  offenders: {
    name: string;
    scheduled: string;
    actual: string;
    diff: string;
  }[];
}

export interface FinancialHealthData {
  totalRevenue: string;
  payers: {
    name: string;
    percentage: number;
    color: string;
  }[];
  unbilled: string;
  deniedClaims: string;
  arAging: {
    days0_30: number;
    days31_60: number;
    days60Plus: number;
  };
}

export interface AuthUtilizationData {
  atRisk: { count: number; percentage: number; label: string };
  approaching: { count: number; percentage: number; label: string };
  onTrack: { count: number; percentage: number; label: string };
  stats: {
    active: number;
    expiringSoon: number;
    expired: number;
  };
}

export interface CaregiverOvertimeData {
  under40HoursRate: number;
  totalOtHours: number;
  estOtCost: number;
  approachingOt: number;
  flaggedStaff: {
    name: string;
    initials: string;
    hours: string;
    otHours: string;
  }[];
}

export interface IncidentItem {
  id: string;
  title: string;
  caregiver: string;
  patient: string;
  status: string;
  variant: 'critical' | 'warning' | 'verified';
}

export interface TopCaregiverItem {
  rank: number;
  name: string;
  role: string;
  rating: number;
  score: number;
}

export interface TrainingExpiryItem {
  id: string;
  name: string;
  initials: string;
  cert: string;
  daysLeft: string;
  variant: 'critical' | 'warning' | 'verified';
}

export interface AtAGlanceData {
  retention: { rate: number; target: number };
  complianceAlerts: { total: number; requireReview: number };
  avgCompletion: { rate: number; change: string };
  unbilledVisits: { count: number; atRiskAmount: string };
}

export interface LiveFeedItem {
  id: string;
  time: string;
  initials: string;
  name: string;
  address: string;
  status: string;
  variant: 'verified' | 'info' | 'pending';
}

export interface BranchData {
  id: BranchId;
  name: string;
  code: string;
  region: string;
  kpis: {
    activeClients: { value: number; change: string; label: string };
    activeCaregivers: { value: number; subtext: string; label: string };
    pendingAuthorizations: { value: number; subtext: string; label: string };
    credentialsExpiring: { value: number; subtext: string; label: string };
    householdsStuck: { value: number; subtext: string; label: string };
  };
  executiveMetrics: {
    activePatients: { value: number; change: string; label: string };
    activeCaregivers: { value: number; subtext: string; label: string };
    todaysVisits: { value: number; subtext: string; label: string };
    evvCompliance: { value: string; subtext: string; label: string };
    openUnfilledShifts: { value: number; subtext: string; label: string };
    openIncidents: { value: number; subtext: string; label: string };
    monthlyRevenue: { value: string; change: string; label: string };
  };
  weeklyVisits: WeeklyVisitsData;
  patientSatisfaction: PatientSatisfactionData;
  evvSummary: EvvSummaryData;
  wastedHours: WastedHoursData;
  financialHealth: FinancialHealthData;
  authUtilization: AuthUtilizationData;
  caregiverOvertime: CaregiverOvertimeData;
  recentIncidents: IncidentItem[];
  topCaregivers: TopCaregiverItem[];
  trainingExpiry: TrainingExpiryItem[];
  atAGlance: AtAGlanceData;
  liveVisitFeed: LiveFeedItem[];
  funnel: {
    avgDaysToActivate: number;
    targetDays: number;
    stages: { name: string; count: number; percentage: number; tooltip: string }[];
  };
  pipeline: {
    activeInquiries: number;
    converted: number;
    conversionRate: number;
    stages: { name: string; count: number; percentage: number; tooltip: string }[];
  };
  authorizations: {
    overdueCount: number;
    breakdown: {
      approved: { count: number; percentage: number };
      awaitingState: { count: number; percentage: number };
      overdue: { count: number; percentage: number };
    };
    roundingNotice: string;
    overdueList: {
      id: string;
      clientName: string;
      clientId: string;
      caseManager: string;
      cmAgency: string;
      daysOverdue: number;
      serviceType: string;
      waiver: string;
      requestedHours: number;
      effectiveDate: string;
      status: string;
    }[];
  };
  compliance: {
    expiredCount: number;
    subheading: string;
    items: {
      id: string;
      caregiverName: string;
      caregiverId: string;
      credential: string;
      status: 'Expired' | 'Expired 21d' | '12d left' | 'Verified';
      badgeType: 'critical' | 'warning' | 'verified';
      expirationDate: string;
      category: string;
    }[];
  };
  needsAttention: {
    id: string;
    description: string;
    status: 'Immediate' | 'Action required' | 'Overdue' | 'At risk' | 'Pending' | 'Delayed';
    badgeVariant: 'immediate' | 'warning' | 'overdue' | 'at-risk' | 'pending' | 'delayed';
    actionLabel: string;
    recordCount?: number;
    category: 'billing' | 'screening' | 'compliance' | 'evv' | 'clinical' | 'onboarding';
    contextType: 'unapproved-shifts' | 'screening-flags' | 'expired-credentials' | 'evv-exceptions' | 'care-notes' | 'stuck-households';
  }[];
  insights: {
    id: string;
    department: 'STAFFING' | 'COMPLIANCE' | 'REVENUE' | 'ONBOARDING';
    message: string;
    actionLabel: string;
    targetAction: 'staffing' | 'compliance' | 'revenue' | 'onboarding';
  }[];
  liveActivity: {
    id: string;
    iconType: 'document' | 'screening' | 'casemanager' | 'training' | 'reminder' | 'evv' | 'carenote' | 'client';
    description: string;
    recordId: string;
    actor: string;
    timestamp: string;
    category: 'Onboarding' | 'Compliance' | 'Billing' | 'EVV' | 'Clinical';
  }[];
  automation: {
    tasksAutomated: number;
    remindersSent: number;
    hoursSaved: number;
  };
}

export const BRANCH_DATA: Record<BranchId, BranchData> = {
  'mountain-lane': {
    id: 'mountain-lane',
    name: 'Mountain Lane',
    code: 'ML-DENVER',
    region: 'Denver Metro, Jefferson & Douglas Counties',
    kpis: {
      activeClients: { value: 487, change: '+12 this month', label: 'Active Clients' },
      activeCaregivers: { value: 902, subtext: '38 in onboarding', label: 'Active Caregivers' },
      pendingAuthorizations: { value: 23, subtext: '4 overdue', label: 'Pending Authorizations' },
      credentialsExpiring: { value: 41, subtext: '8 expired', label: 'Credentials Expiring' },
      householdsStuck: { value: 11, subtext: '> 5 days delayed', label: 'Households Stuck' },
    },
    executiveMetrics: {
      activePatients: { value: 247, change: '+12 this month', label: 'Active Patients' },
      activeCaregivers: { value: 84, subtext: '1 onboarding', label: 'Active Caregivers' },
      todaysVisits: { value: 142, subtext: '58 completed · 44 upcoming', label: "Today's Visits" },
      evvCompliance: { value: '96.4%', subtext: '4 exceptions today', label: 'EVV Compliance' },
      openUnfilledShifts: { value: 8, subtext: '3 urgent (within 4 hrs)', label: 'Open Unfilled Shifts' },
      openIncidents: { value: 3, subtext: '1 in compliance review', label: 'Open Incidents' },
      monthlyRevenue: { value: '$486k', change: '+4.4% vs last month', label: 'Monthly Revenue' },
    },
    weeklyVisits: {
      completionRate: 86,
      days: [
        { day: 'Mon', scheduled: 100, completed: 86 },
        { day: 'Tue', scheduled: 120, completed: 105 },
        { day: 'Wed', scheduled: 115, completed: 102 },
        { day: 'Thu', scheduled: 120, completed: 108 },
        { day: 'Fri', scheduled: 125, completed: 108 },
        { day: 'Sat', scheduled: 75, completed: 58 },
        { day: 'Sun', scheduled: 70, completed: 54 },
      ],
    },
    patientSatisfaction: {
      score: 4.8,
      total: 5.0,
      stars: 5,
      breakdown: {
        punctuality: 4.9,
        careQuality: 4.8,
        communication: 4.6,
      },
    },
    evvSummary: {
      complianceRate: 98.2,
      atRiskVisits: 14,
      atRiskMessage: 'Missing EVV data may block billing.',
      exceptions: [
        { type: 'Missing Location', count: 8 },
        { type: 'Late Clock-out', count: 4 },
        { type: 'No Signature', count: 2 },
      ],
    },
    wastedHours: {
      totalHours: 14.6,
      costImpact: 467,
      lateClockIns: 9.2,
      earlyClockOuts: 3.1,
      lateClockOuts: 2.3,
      offenders: [
        { name: 'Carlos Mendez', scheduled: '08:00 - 12:00', actual: '08:24 - 11:45', diff: '-39m' },
        { name: 'Rachel Kim', scheduled: '08:30 - 13:00', actual: '09:08 - 12:52', diff: '-38m' },
      ],
    },
    financialHealth: {
      totalRevenue: '$1.2M',
      payers: [
        { name: 'Medicare', percentage: 65, color: '#3e6b2b' },
        { name: 'Medicaid', percentage: 20, color: '#00d084' },
        { name: 'Private Pay', percentage: 10, color: '#F2B632' },
        { name: 'Commercial', percentage: 5, color: '#38bdf8' },
      ],
      unbilled: '$42,500',
      deniedClaims: '$8,240',
      arAging: { days0_30: 72, days31_60: 20, days60Plus: 8 },
    },
    authUtilization: {
      atRisk: { count: 12, percentage: 90, label: 'At Risk (>90%)' },
      approaching: { count: 28, percentage: 75, label: 'Approaching (75-90%)' },
      onTrack: { count: 845, percentage: 60, label: 'On Track (<75%)' },
      stats: { active: 885, expiringSoon: 14, expired: 3 },
    },
    caregiverOvertime: {
      under40HoursRate: 98,
      totalOtHours: 14.5,
      estOtCost: 543.75,
      approachingOt: 5,
      flaggedStaff: [
        { name: 'Jessica Miller', initials: 'JM', hours: '42.5 hrs', otHours: '2.5 hrs OT' },
        { name: 'Thomas Wright', initials: 'TW', hours: '41.0 hrs', otHours: '1.0 hr OT' },
      ],
    },
    recentIncidents: [
      { id: 'inc-1', title: 'Missed Clock-in', caregiver: 'Marcus T.', patient: 'Helen S.', status: 'Unresolved', variant: 'critical' },
      { id: 'inc-2', title: 'Medication Refusal', caregiver: 'Emily R.', patient: 'Arthur D.', status: 'In review', variant: 'warning' },
      { id: 'inc-3', title: 'Fall Incident', caregiver: 'Sarah J.', patient: 'Robert M.', status: 'Resolved', variant: 'verified' },
    ],
    topCaregivers: [
      { rank: 1, name: 'Emily R.', role: 'RN', rating: 4.9, score: 98 },
      { rank: 2, name: 'Sarah J.', role: 'HHA', rating: 4.8, score: 96 },
      { rank: 3, name: 'Marcus T.', role: 'CNA', rating: 4.7, score: 94 },
      { rank: 4, name: 'David K.', role: 'PT', rating: 4.6, score: 91 },
    ],
    trainingExpiry: [
      { id: 'te-1', name: 'David K.', initials: 'DK', cert: 'CPR & First Aid', daysLeft: '3 days', variant: 'critical' },
      { id: 'te-2', name: 'Sarah J.', initials: 'SJ', cert: 'HHA License', daysLeft: '12 days', variant: 'warning' },
      { id: 'te-3', name: 'Marcus T.', initials: 'MT', cert: 'TB Test', daysLeft: '20 days', variant: 'warning' },
      { id: 'te-4', name: 'Emily R.', initials: 'ER', cert: 'RN License', daysLeft: '45 days', variant: 'verified' },
    ],
    atAGlance: {
      retention: { rate: 87, target: 85 },
      complianceAlerts: { total: 7, requireReview: 3 },
      avgCompletion: { rate: 98.2, change: '+1.2%' },
      unbilledVisits: { count: 23, atRiskAmount: '$4,100 at risk' },
    },
    liveVisitFeed: [
      { id: 'lv-1', time: '08:00 AM', initials: 'MC', name: 'Margaret Chen', address: '1285 Sunset Blvd', status: 'Completed', variant: 'verified' },
      { id: 'lv-2', time: '09:00 AM', initials: 'RA', name: 'Robert Alvarez', address: '44 Cedar Ave', status: 'In progress', variant: 'info' },
      { id: 'lv-3', time: '09:30 AM', initials: 'AT', name: 'Aika Tanaka', address: '23 Fillmore St', status: 'Scheduled', variant: 'pending' },
      { id: 'lv-4', time: '10:00 AM', initials: 'TB', name: 'Thomas Becker', address: '1651 Camino', status: 'Scheduled', variant: 'pending' },
      { id: 'lv-5', time: '10:00 AM', initials: 'MC', name: 'Margaret Chen', address: '1285 Sunset Blvd', status: 'Scheduled', variant: 'pending' },
    ],
    funnel: {
      avgDaysToActivate: 14,
      targetDays: 11,
      stages: [
        { name: 'Applied', count: 142, percentage: 100, tooltip: '142 applicants in candidate intake queue' },
        { name: 'Documents', count: 74, percentage: 52, tooltip: '74 applicants uploading 15-20 packet documents' },
        { name: 'Screening & Training', count: 44, percentage: 31, tooltip: '44 completed CBI check & LearnWorlds modules' },
        { name: 'Authorized', count: 38, percentage: 27, tooltip: '38 prior authorizations verified with HCPF state portal' },
        { name: 'Active', count: 34, percentage: 24, tooltip: '34 fully activated family caregivers logging EVV shifts' },
      ],
    },
    pipeline: {
      activeInquiries: 79,
      converted: 16,
      conversionRate: 20,
      stages: [
        { name: 'New Lead', count: 24, percentage: 30, tooltip: '24 newly received inbound family & CMA referrals' },
        { name: 'Contacted', count: 18, percentage: 23, tooltip: '18 initial intake consultations conducted' },
        { name: 'In Assessment', count: 12, percentage: 15, tooltip: '12 clinical functional assessments in progress' },
        { name: 'CM Coordination', count: 9, percentage: 11, tooltip: '9 cases actively synchronizing with state Case Managers' },
        { name: 'Converted', count: 16, percentage: 20, tooltip: '16 admitted clients now receiving family care' },
      ],
    },
    authorizations: {
      overdueCount: 4,
      breakdown: {
        approved: { count: 184, percentage: 86 },
        awaitingState: { count: 23, percentage: 11 },
        overdue: { count: 4, percentage: 4 },
      },
      roundingNotice: 'Source-provided figures total 101% due to sample rounding (86% + 11% + 4%). Preserved verbatim per specification.',
      overdueList: [
        {
          id: 'auth-101',
          clientName: 'Marisol Vega',
          clientId: 'PT-1042',
          caseManager: 'Dana Whitfield',
          cmAgency: 'Rocky Mountain Human Services',
          daysOverdue: 14,
          serviceType: 'IHSS',
          waiver: 'HCBS-EBD',
          requestedHours: 28.5,
          effectiveDate: '2026-11-03',
          status: '14d overdue',
        },
        {
          id: 'auth-102',
          clientName: 'Harper Nguyen',
          clientId: 'PT-1088',
          caseManager: 'Dana Whitfield',
          cmAgency: 'Rocky Mountain Human Services',
          daysOverdue: 9,
          serviceType: 'CNA',
          waiver: 'Children HCBS',
          requestedHours: 20.0,
          effectiveDate: '2026-11-08',
          status: '9d overdue',
        },
        {
          id: 'auth-103',
          clientName: 'Desmond Clarke',
          clientId: 'PT-1102',
          caseManager: 'Priya Shah',
          cmAgency: 'Developmental Pathways',
          daysOverdue: 7,
          serviceType: 'Personal Care',
          waiver: 'Supported Living',
          requestedHours: 18.0,
          effectiveDate: '2026-11-10',
          status: '7d overdue',
        },
      ],
    },
    compliance: {
      expiredCount: 8,
      subheading: 'Caregivers with urgent credential renewal deadlines',
      items: [
        {
          id: 'comp-201',
          caregiverName: 'Rosa Vega',
          caregiverId: 'CG-0741',
          credential: 'CPR / First aid',
          status: 'Expired',
          badgeType: 'critical',
          expirationDate: '2026-11-10',
          category: 'Clinical Training',
        },
        {
          id: 'comp-202',
          caregiverName: 'Luis Ruiz',
          caregiverId: 'CG-0812',
          credential: 'Driving record',
          status: 'Expired 21d',
          badgeType: 'critical',
          expirationDate: '2026-10-27',
          category: 'Regulatory Verification',
        },
        {
          id: 'comp-203',
          caregiverName: 'Grace Park',
          caregiverId: 'CG-0935',
          credential: 'TB test',
          status: '12d left',
          badgeType: 'warning',
          expirationDate: '2026-11-29',
          category: 'Medical Clearance',
        },
      ],
    },
    needsAttention: [
      {
        id: 'att-1',
        description: '6 caregivers working without approval - payment at risk',
        status: 'Immediate',
        badgeVariant: 'immediate',
        actionLabel: 'Send follow-ups',
        recordCount: 6,
        category: 'billing',
        contextType: 'unapproved-shifts',
      },
      {
        id: 'att-2',
        description: '3 screening results flagged for internal review',
        status: 'Action required',
        badgeVariant: 'warning',
        actionLabel: 'Review',
        recordCount: 3,
        category: 'screening',
        contextType: 'screening-flags',
      },
      {
        id: 'att-3',
        description: '8 caregiver credentials expired',
        status: 'Overdue',
        badgeVariant: 'overdue',
        actionLabel: 'Review',
        recordCount: 8,
        category: 'compliance',
        contextType: 'expired-credentials',
      },
      {
        id: 'att-4',
        description: '14 EVV visits at risk - missing clock-out or GPS',
        status: 'At risk',
        badgeVariant: 'at-risk',
        actionLabel: 'Review',
        recordCount: 14,
        category: 'evv',
        contextType: 'evv-exceptions',
      },
      {
        id: 'att-5',
        description: '24 care notes awaiting audit - AI wording ready',
        status: 'Pending',
        badgeVariant: 'pending',
        actionLabel: 'Open queue',
        recordCount: 24,
        category: 'clinical',
        contextType: 'care-notes',
      },
      {
        id: 'att-6',
        description: '11 households stuck in onboarding > 5 days',
        status: 'Delayed',
        badgeVariant: 'delayed',
        actionLabel: 'View',
        recordCount: 11,
        category: 'onboarding',
        contextType: 'stuck-households',
      },
    ],
    insights: [
      {
        id: 'ins-1',
        department: 'STAFFING',
        message: '3 caregivers needed in Douglas County by Thursday, 4 intakes pending.',
        actionLabel: 'Find cover',
        targetAction: 'staffing',
      },
      {
        id: 'ins-2',
        department: 'COMPLIANCE',
        message: '2 CPR certifications expire in 14 days, auto-reminders queued.',
        actionLabel: 'View credentials',
        targetAction: 'compliance',
      },
      {
        id: 'ins-3',
        department: 'REVENUE',
        message: 'Authorization for Marisol Vega pending 14 days, payment at risk.',
        actionLabel: 'Nudge CM',
        targetAction: 'revenue',
      },
      {
        id: 'ins-4',
        department: 'ONBOARDING',
        message: 'Document packet missing for 4 HHSC households, reminder #2 sent.',
        actionLabel: 'View households',
        targetAction: 'onboarding',
      },
    ],
    liveActivity: [
      {
        id: 'act-1',
        iconType: 'document',
        description: 'Caregiver document submitted (CPR Certification upload)',
        recordId: 'CG-0921',
        actor: 'Elena Morales',
        timestamp: '4m ago',
        category: 'Compliance',
      },
      {
        id: 'act-2',
        iconType: 'screening',
        description: 'Background-screening result received (CBI check cleared)',
        recordId: 'CG-1104',
        actor: 'Colorado CBI Gateway',
        timestamp: '18m ago',
        category: 'Compliance',
      },
      {
        id: 'act-3',
        iconType: 'casemanager',
        description: 'Case-manager follow-up recorded (PAR re-authorization note)',
        recordId: 'PT-1042',
        actor: 'Dana Whitfield (RMHS)',
        timestamp: '35m ago',
        category: 'Onboarding',
      },
      {
        id: 'act-4',
        iconType: 'training',
        description: 'Caregiver training completed (IHSS Attendant Core Competencies)',
        recordId: 'CG-0882',
        actor: 'LearnWorlds Sync',
        timestamp: '1h ago',
        category: 'Onboarding',
      },
      {
        id: 'act-5',
        iconType: 'reminder',
        description: 'Credential expiry reminder queued (30-day notice for CPR)',
        recordId: 'CG-0741',
        actor: 'Automated Bot',
        timestamp: '2h ago',
        category: 'Compliance',
      },
      {
        id: 'act-6',
        iconType: 'evv',
        description: 'EVV visit exception created (Missing clock-out flagged for review)',
        recordId: 'VIS-2048',
        actor: 'State Aggregator',
        timestamp: '2h ago',
        category: 'EVV',
      },
      {
        id: 'act-7',
        iconType: 'carenote',
        description: 'Care note submitted for review (AI formatting draft ready)',
        recordId: 'VIS-3104',
        actor: 'Elena Morales',
        timestamp: '3h ago',
        category: 'Clinical',
      },
      {
        id: 'act-8',
        iconType: 'client',
        description: 'Client onboarding record updated (Physician order attached)',
        recordId: 'PT-1088',
        actor: 'Danielle Brooks',
        timestamp: '4h ago',
        category: 'Onboarding',
      },
    ],
    automation: {
      tasksAutomated: 1284,
      remindersSent: 362,
      hoursSaved: 94,
    },
  },
  'colorado-home-health': {
    id: 'colorado-home-health',
    name: 'Colorado Home Health',
    code: 'CHH-SPRINGS',
    region: 'El Paso County, Pueblo & Southern Colorado',
    kpis: {
      activeClients: { value: 326, change: '+8 this month', label: 'Active Clients' },
      activeCaregivers: { value: 584, subtext: '24 in onboarding', label: 'Active Caregivers' },
      pendingAuthorizations: { value: 16, subtext: '2 overdue', label: 'Pending Authorizations' },
      credentialsExpiring: { value: 28, subtext: '5 expired', label: 'Credentials Expiring' },
      householdsStuck: { value: 7, subtext: '> 5 days delayed', label: 'Households Stuck' },
    },
    executiveMetrics: {
      activePatients: { value: 182, change: '+8 this month', label: 'Active Patients' },
      activeCaregivers: { value: 62, subtext: '3 onboarding', label: 'Active Caregivers' },
      todaysVisits: { value: 104, subtext: '72 completed • 32 upcoming', label: "Today's Visits" },
      evvCompliance: { value: '97.9%', subtext: '2 exceptions today', label: 'EVV Compliance' },
      openUnfilledShifts: { value: 4, subtext: '2 urgent (within 4 hrs)', label: 'Open Unfilled Shifts' },
      openIncidents: { value: 1, subtext: '0 in compliance review', label: 'Open Incidents' },
      monthlyRevenue: { value: '$342k', change: '+3.8% vs last month', label: 'Monthly Revenue' },
    },
    weeklyVisits: {
      completionRate: 92,
      days: [
        { day: 'Mon', scheduled: 60, completed: 56 },
        { day: 'Tue', scheduled: 70, completed: 66 },
        { day: 'Wed', scheduled: 75, completed: 70 },
        { day: 'Thu', scheduled: 80, completed: 74 },
        { day: 'Fri', scheduled: 85, completed: 80 },
        { day: 'Sat', scheduled: 50, completed: 46 },
        { day: 'Sun', scheduled: 45, completed: 42 },
      ],
    },
    patientSatisfaction: {
      score: 4.9,
      total: 5.0,
      stars: 5,
      breakdown: {
        punctuality: 4.9,
        careQuality: 4.9,
        communication: 4.8,
      },
    },
    evvSummary: {
      complianceRate: 97.9,
      atRiskVisits: 8,
      atRiskMessage: 'Missing EVV data may block billing',
      exceptions: [
        { type: 'Missing Location', count: 5 },
        { type: 'Late Clock-out', count: 2 },
        { type: 'No Signature', count: 1 },
      ],
    },
    wastedHours: {
      totalHours: 9.8,
      costImpact: 314,
      lateClockIns: 5.4,
      earlyClockOuts: 2.3,
      lateClockOuts: 2.1,
      offenders: [
        { name: 'Maria Santos', scheduled: '08:30 - 12:30', actual: '09:10 - 12:20', diff: '-40m' },
        { name: 'Devon Lee', scheduled: '10:00 - 14:00', actual: '10:15 - 13:55', diff: '-20m' },
      ],
    },
    financialHealth: {
      totalRevenue: '$860K',
      payers: [
        { name: 'Medicare', percentage: 60, color: '#3e6b2b' },
        { name: 'Medicaid', percentage: 25, color: '#00d084' },
        { name: 'Private Pay', percentage: 10, color: '#F2B632' },
        { name: 'Commercial', percentage: 5, color: '#38bdf8' },
      ],
      unbilled: '$28,400',
      deniedClaims: '$4,120',
      arAging: { days0_30: 78, days31_60: 16, days60Plus: 6 },
    },
    authUtilization: {
      atRisk: { count: 6, percentage: 91, label: 'At Risk (90%+)' },
      approaching: { count: 22, percentage: 82, label: 'Approaching (75-90%)' },
      onTrack: { count: 380, percentage: 58, label: 'On Track (<75%)' },
      stats: { active: 620, expiringSoon: 9, expired: 1 },
    },
    caregiverOvertime: {
      under40HoursRate: 99,
      totalOtHours: 8.2,
      estOtCost: 307.5,
      approachingOt: 2,
      flaggedStaff: [
        { name: 'Chloe Bennett', initials: 'CB', hours: '43.2 hrs', otHours: '3.2 hrs OT' },
      ],
    },
    recentIncidents: [
      { id: 'inc-chh-1', title: 'Late Clock-in Resolution', caregiver: 'Maria Santos', patient: 'Julian Alvarez', status: 'In review', variant: 'warning' },
    ],
    topCaregivers: [
      { rank: 1, name: 'Chloe B.', role: 'CNA', rating: 4.9, score: 99 },
      { rank: 2, name: 'Devon L.', role: 'RN', rating: 4.8, score: 95 },
      { rank: 3, name: 'Maria S.', role: 'HHA', rating: 4.7, score: 93 },
    ],
    trainingExpiry: [
      { id: 'te-chh-1', name: 'Maria S.', initials: 'MS', cert: 'CPR & First Aid', daysLeft: '8 days', variant: 'warning' },
      { id: 'te-chh-2', name: 'Devon L.', initials: 'DL', cert: 'RN License', daysLeft: '60 days', variant: 'verified' },
    ],
    atAGlance: {
      retention: { rate: 89, target: 85 },
      complianceAlerts: { total: 4, requireReview: 1 },
      avgCompletion: { rate: 97.9, change: '+0.8%' },
      unbilledVisits: { count: 14, atRiskAmount: '$2,600' },
    },
    liveVisitFeed: [
      { id: 'lv-chh-1', time: '09:15 AM', initials: 'CB', name: 'Chloe Bennett', address: '104 N Tejon St', status: 'Completed', variant: 'verified' },
      { id: 'lv-chh-2', time: '08:45 AM', initials: 'MS', name: 'Maria Santos', address: '412 E Pikes Peak', status: 'In progress', variant: 'info' },
    ],
    funnel: {
      avgDaysToActivate: 12,
      targetDays: 11,
      stages: [
        { name: 'Applied', count: 94, percentage: 100, tooltip: '94 applicants in southern regional pipeline' },
        { name: 'Documents', count: 48, percentage: 51, tooltip: '48 caregivers in document submission' },
        { name: 'Screening & Training', count: 31, percentage: 33, tooltip: '31 in background screening' },
        { name: 'Authorized', count: 24, percentage: 26, tooltip: '24 state authorization confirmed' },
        { name: 'Active', count: 22, percentage: 23, tooltip: '22 activated caregivers logging shifts' },
      ],
    },
    pipeline: {
      activeInquiries: 57,
      converted: 11,
      conversionRate: 19,
      stages: [
        { name: 'New Lead', count: 18, percentage: 31, tooltip: '18 leads from The Resource Exchange (TRE)' },
        { name: 'Contacted', count: 14, percentage: 25, tooltip: '14 family outreach calls completed' },
        { name: 'In Assessment', count: 8, percentage: 14, tooltip: '8 RN evaluations scheduled' },
        { name: 'CM Coordination', count: 6, percentage: 11, tooltip: '6 with county case managers' },
        { name: 'Converted', count: 11, percentage: 19, tooltip: '11 newly admitted home-care clients' },
      ],
    },
    authorizations: {
      overdueCount: 2,
      breakdown: {
        approved: { count: 132, percentage: 87 },
        awaitingState: { count: 16, percentage: 11 },
        overdue: { count: 2, percentage: 2 },
      },
      roundingNotice: 'Figures reflect active Colorado Home Health branch prior authorizations.',
      overdueList: [
        {
          id: 'auth-201',
          clientName: 'Julian Alvarez',
          clientId: 'PT-2031',
          caseManager: 'Gregory Sterling',
          cmAgency: 'The Resource Exchange',
          daysOverdue: 8,
          serviceType: 'IHSS',
          waiver: 'HCBS-CES',
          requestedHours: 32.0,
          effectiveDate: '2026-11-09',
          status: '8d overdue',
        },
        {
          id: 'auth-202',
          clientName: 'Chloe Bennett',
          clientId: 'PT-2055',
          caseManager: 'Sarah Higgins',
          cmAgency: 'The Resource Exchange',
          daysOverdue: 6,
          serviceType: 'HMA',
          waiver: 'Children HCBS',
          requestedHours: 24.0,
          effectiveDate: '2026-11-11',
          status: '6d overdue',
        },
      ],
    },
    compliance: {
      expiredCount: 5,
      subheading: 'Caregivers with urgent credential renewal deadlines (Colorado Springs)',
      items: [
        {
          id: 'comp-301',
          caregiverName: 'Mateo Ortiz',
          caregiverId: 'CG-1044',
          credential: 'CPR / First aid',
          status: 'Expired',
          badgeType: 'critical',
          expirationDate: '2026-11-12',
          category: 'Clinical Training',
        },
        {
          id: 'comp-302',
          caregiverName: 'Amber Lin',
          caregiverId: 'CG-1090',
          credential: 'TB test',
          status: '12d left',
          badgeType: 'warning',
          expirationDate: '2026-11-29',
          category: 'Medical Clearance',
        },
      ],
    },
    needsAttention: [
      {
        id: 'att-chh-1',
        description: '3 caregivers working without approval - payment at risk',
        status: 'Immediate',
        badgeVariant: 'immediate',
        actionLabel: 'Send follow-ups',
        recordCount: 3,
        category: 'billing',
        contextType: 'unapproved-shifts',
      },
      {
        id: 'att-chh-2',
        description: '2 screening results flagged for internal review',
        status: 'Action required',
        badgeVariant: 'warning',
        actionLabel: 'Review',
        recordCount: 2,
        category: 'screening',
        contextType: 'screening-flags',
      },
      {
        id: 'att-chh-3',
        description: '5 caregiver credentials expired',
        status: 'Overdue',
        badgeVariant: 'overdue',
        actionLabel: 'Review',
        recordCount: 5,
        category: 'compliance',
        contextType: 'expired-credentials',
      },
      {
        id: 'att-chh-4',
        description: '8 EVV visits at risk - missing clock-out or GPS',
        status: 'At risk',
        badgeVariant: 'at-risk',
        actionLabel: 'Review',
        recordCount: 8,
        category: 'evv',
        contextType: 'evv-exceptions',
      },
    ],
    insights: [
      {
        id: 'ins-chh-1',
        department: 'STAFFING',
        message: '2 bilingual caregivers needed in Pueblo by Friday, 3 intakes pending.',
        actionLabel: 'Find cover',
        targetAction: 'staffing',
      },
      {
        id: 'ins-chh-2',
        department: 'COMPLIANCE',
        message: '3 TB tests expiring in El Paso county within 10 days.',
        actionLabel: 'View credentials',
        targetAction: 'compliance',
      },
    ],
    liveActivity: [
      {
        id: 'act-chh-1',
        iconType: 'document',
        description: 'Caregiver W-4 verified in ADP Run',
        recordId: 'CG-1044',
        actor: 'Rachel Bennett',
        timestamp: '12m ago',
        category: 'Onboarding',
      },
      {
        id: 'act-chh-2',
        iconType: 'evv',
        description: 'EVV Geofence matched at Colorado Springs residence',
        recordId: 'VIS-4012',
        actor: 'Mobile Caregiver App',
        timestamp: '44m ago',
        category: 'EVV',
      },
    ],
    automation: {
      tasksAutomated: 890,
      remindersSent: 214,
      hoursSaved: 31,
    },
  },
  'frisco': {
    id: 'frisco',
    name: 'Frisco',
    code: 'FRS-SUMMIT',
    region: 'Summit County, Eagle County & Mountain Corridor',
    kpis: {
      activeClients: { value: 142, change: '+4 this month', label: 'Active Clients' },
      activeCaregivers: { value: 218, subtext: '11 in onboarding', label: 'Active Caregivers' },
      pendingAuthorizations: { value: 8, subtext: '1 overdue', label: 'Pending Authorizations' },
      credentialsExpiring: { value: 14, subtext: '2 expired', label: 'Credentials Expiring' },
      householdsStuck: { value: 3, subtext: '> 5 days delayed', label: 'Households Stuck' },
    },
    executiveMetrics: {
      activePatients: { value: 94, change: '+4 this month', label: 'Active Patients' },
      activeCaregivers: { value: 38, subtext: '2 onboarding', label: 'Active Caregivers' },
      todaysVisits: { value: 52, subtext: '38 completed • 14 upcoming', label: "Today's Visits" },
      evvCompliance: { value: '98.8%', subtext: '1 exception today', label: 'EVV Compliance' },
      openUnfilledShifts: { value: 2, subtext: '1 urgent (within 4 hrs)', label: 'Open Unfilled Shifts' },
      openIncidents: { value: 1, subtext: '1 in compliance review', label: 'Open Incidents' },
      monthlyRevenue: { value: '$198k', change: '+5.1% vs last month', label: 'Monthly Revenue' },
    },
    weeklyVisits: {
      completionRate: 94,
      days: [
        { day: 'Mon', scheduled: 32, completed: 30 },
        { day: 'Tue', scheduled: 38, completed: 36 },
        { day: 'Wed', scheduled: 40, completed: 38 },
        { day: 'Thu', scheduled: 42, completed: 40 },
        { day: 'Fri', scheduled: 45, completed: 42 },
        { day: 'Sat', scheduled: 28, completed: 26 },
        { day: 'Sun', scheduled: 24, completed: 22 },
      ],
    },
    patientSatisfaction: {
      score: 4.9,
      total: 5.0,
      stars: 5,
      breakdown: {
        punctuality: 4.8,
        careQuality: 5.0,
        communication: 4.9,
      },
    },
    evvSummary: {
      complianceRate: 98.8,
      atRiskVisits: 3,
      atRiskMessage: 'Missing EVV data may block billing',
      exceptions: [
        { type: 'Missing Location', count: 2 },
        { type: 'Late Clock-out', count: 1 },
      ],
    },
    wastedHours: {
      totalHours: 4.2,
      costImpact: 135,
      lateClockIns: 2.1,
      earlyClockOuts: 1.1,
      lateClockOuts: 1.0,
      offenders: [
        { name: 'Donald Vance', scheduled: '09:00 - 13:00', actual: '09:30 - 12:55', diff: '-35m' },
      ],
    },
    financialHealth: {
      totalRevenue: '$420K',
      payers: [
        { name: 'Medicare', percentage: 55, color: '#3e6b2b' },
        { name: 'Medicaid', percentage: 30, color: '#00d084' },
        { name: 'Private Pay', percentage: 10, color: '#F2B632' },
        { name: 'Commercial', percentage: 5, color: '#38bdf8' },
      ],
      unbilled: '$14,200',
      deniedClaims: '$1,850',
      arAging: { days0_30: 84, days31_60: 12, days60Plus: 4 },
    },
    authUtilization: {
      atRisk: { count: 3, percentage: 90, label: 'At Risk (90%+)' },
      approaching: { count: 8, percentage: 78, label: 'Approaching (75-90%)' },
      onTrack: { count: 160, percentage: 60, label: 'On Track (<75%)' },
      stats: { active: 280, expiringSoon: 4, expired: 1 },
    },
    caregiverOvertime: {
      under40HoursRate: 100,
      totalOtHours: 2.0,
      estOtCost: 75.0,
      approachingOt: 1,
      flaggedStaff: [
        { name: 'Arthur Vance', initials: 'AV', hours: '41.0 hrs', otHours: '1.0 hr OT' },
      ],
    },
    recentIncidents: [
      { id: 'inc-frs-1', title: 'Mountain Route Delay', caregiver: 'Arthur Vance', patient: 'Donald Vance', status: 'Resolved', variant: 'verified' },
    ],
    topCaregivers: [
      { rank: 1, name: 'Arthur V.', role: 'CNA', rating: 4.9, score: 97 },
      { rank: 2, name: 'Sarah H.', role: 'RN', rating: 4.8, score: 95 },
    ],
    trainingExpiry: [
      { id: 'te-frs-1', name: 'Arthur V.', initials: 'AV', cert: 'CPR & First Aid', daysLeft: '4 days', variant: 'critical' },
    ],
    atAGlance: {
      retention: { rate: 92, target: 85 },
      complianceAlerts: { total: 2, requireReview: 0 },
      avgCompletion: { rate: 98.8, change: '+1.5%' },
      unbilledVisits: { count: 6, atRiskAmount: '$1,100' },
    },
    liveVisitFeed: [
      { id: 'lv-frs-1', time: '09:00 AM', initials: 'AV', name: 'Donald Vance', address: '204 Main St, Frisco', status: 'Completed', variant: 'verified' },
    ],
    funnel: {
      avgDaysToActivate: 10,
      targetDays: 11,
      stages: [
        { name: 'Applied', count: 46, percentage: 100, tooltip: '46 high-country applicants' },
        { name: 'Documents', count: 22, percentage: 48, tooltip: '22 submitted packets' },
        { name: 'Screening & Training', count: 15, percentage: 33, tooltip: '15 in training' },
        { name: 'Authorized', count: 11, percentage: 24, tooltip: '11 PAR confirmed' },
        { name: 'Active', count: 9, percentage: 20, tooltip: '9 active caregivers' },
      ],
    },
    pipeline: {
      activeInquiries: 28,
      converted: 5,
      conversionRate: 18,
      stages: [
        { name: 'New Lead', count: 9, percentage: 32, tooltip: '9 mountain community referrals' },
        { name: 'Contacted', count: 7, percentage: 25, tooltip: '7 intake calls conducted' },
        { name: 'In Assessment', count: 4, percentage: 14, tooltip: '4 assessments scheduled' },
        { name: 'CM Coordination', count: 3, percentage: 11, tooltip: '3 CMA syncs' },
        { name: 'Converted', count: 5, percentage: 18, tooltip: '5 converted families' },
      ],
    },
    authorizations: {
      overdueCount: 1,
      breakdown: {
        approved: { count: 58, percentage: 88 },
        awaitingState: { count: 8, percentage: 10 },
        overdue: { count: 1, percentage: 2 },
      },
      roundingNotice: 'High-country mountain branch metrics.',
      overdueList: [
        {
          id: 'auth-301',
          clientName: 'Donald Vance',
          clientId: 'PT-3004',
          caseManager: 'Sarah Higgins',
          cmAgency: 'Imagine! Colorado',
          daysOverdue: 11,
          serviceType: 'Personal Care',
          waiver: 'HCBS-EBD',
          requestedHours: 18.0,
          effectiveDate: '2026-11-06',
          status: '11d overdue',
        },
      ],
    },
    compliance: {
      expiredCount: 2,
      subheading: 'Caregivers with urgent credential renewal deadlines (Frisco / Summit)',
      items: [
        {
          id: 'comp-401',
          caregiverName: 'Arthur Vance',
          caregiverId: 'CG-1201',
          credential: 'CPR / First aid',
          status: 'Expired',
          badgeType: 'critical',
          expirationDate: '2026-11-05',
          category: 'Clinical Training',
        },
      ],
    },
    needsAttention: [
      {
        id: 'att-frs-1',
        description: '1 caregiver working without approval - payment at risk',
        status: 'Immediate',
        badgeVariant: 'immediate',
        actionLabel: 'Send follow-ups',
        recordCount: 1,
        category: 'billing',
        contextType: 'unapproved-shifts',
      },
      {
        id: 'att-frs-2',
        description: '2 caregiver credentials expired',
        status: 'Overdue',
        badgeVariant: 'overdue',
        actionLabel: 'Review',
        recordCount: 2,
        category: 'compliance',
        contextType: 'expired-credentials',
      },
    ],
    insights: [
      {
        id: 'ins-frs-1',
        department: 'STAFFING',
        message: 'Winter transport backup needed for 2 Frisco mountain routes.',
        actionLabel: 'Find cover',
        targetAction: 'staffing',
      },
    ],
    liveActivity: [
      {
        id: 'act-frs-1',
        iconType: 'casemanager',
        description: 'Case manager consultation completed for Arthur Vance',
        recordId: 'PT-3004',
        actor: 'Danielle Brooks',
        timestamp: '1h ago',
        category: 'Onboarding',
      },
    ],
    automation: {
      tasksAutomated: 412,
      remindersSent: 98,
      hoursSaved: 15,
    },
  },
};

// Global search dataset across all entities
export interface SearchItem {
  id: string;
  type: 'client' | 'caregiver' | 'page' | 'medication' | 'chronology' | 'compliance' | 'assessment';
  title: string;
  subtitle: string;
  tag: string;
  meta: string;
}

export const GLOBAL_SEARCH_ITEMS: SearchItem[] = [
  // Patients / Clients
  { id: 'client-1', type: 'client', title: 'Mateo Morales', subtitle: 'Medicaid #CO-984421008 • Denver', tag: 'IHSS Active', meta: 'Patient' },
  { id: 'client-2', type: 'client', title: 'Sarah Jenkins', subtitle: 'Medicaid #CO-90214 • IHSS Client • Denver Metro', tag: 'IHSS Active', meta: 'Patient' },
  { id: 'client-3', type: 'client', title: 'Marisol Vega', subtitle: 'Prior Auth 14d Overdue • Lakewood', tag: 'PAR Overdue', meta: 'Patient' },
  { id: 'client-4', type: 'client', title: 'Harper Nguyen', subtitle: 'Prior Auth 9d Overdue • Denver', tag: 'CNA Under Review', meta: 'Patient' },
  { id: 'client-5', type: 'client', title: 'Harold Jenkins', subtitle: 'Medicaid #CO-8831001 • IHSS Patient • Denver', tag: 'Active Patient', meta: 'Patient' },
  { id: 'client-6', type: 'client', title: 'Desmond Clarke', subtitle: 'Prior Auth 7d Overdue • Aurora', tag: 'Personal Care', meta: 'Patient' },
  { id: 'client-7', type: 'client', title: 'Sophia Ramirez', subtitle: 'HCBS-CES Waiver • Aurora', tag: 'Active Client', meta: 'Patient' },
  { id: 'client-8', type: 'client', title: 'Chloe Bennett', subtitle: 'Health Maintenance (HMA) • Springs', tag: 'In Assessment', meta: 'Patient' },

  // Medications
  { id: 'med-1', type: 'medication', title: 'Lisinopril 10mg', subtitle: 'Daily Oral • Harold Jenkins • Prescribed by Dr. Adams', tag: 'Active RX', meta: 'Medication' },
  { id: 'med-2', type: 'medication', title: 'Metformin 500mg', subtitle: 'Twice Daily with meals • Mateo Morales • Active RX', tag: 'Active RX', meta: 'Medication' },
  { id: 'med-3', type: 'medication', title: 'Atorvastatin 20mg', subtitle: 'Daily Bedtime • Marisol Vega • Refill Due in 5 days', tag: 'Refill Due', meta: 'Medication' },
  { id: 'med-4', type: 'medication', title: 'Gabapentin 300mg', subtitle: 'Three times daily • Desmond Clarke • Monitored RX', tag: 'Active RX', meta: 'Medication' },

  // Chronology
  { id: 'chrono-1', type: 'chronology', title: 'Shift EVV Clock-In Verification', subtitle: 'Marcus Jenkins clocked in at Harold Jenkins home • Geofence Validated', tag: '10:14 AM Today', meta: 'Chronology' },
  { id: 'chrono-2', type: 'chronology', title: '60-Day RN Clinical Supervisory Visit', subtitle: 'Supervisory visit completed by Sarah RN • IHSS care plan updated', tag: 'Yesterday', meta: 'Chronology' },
  { id: 'chrono-3', type: 'chronology', title: 'CMA Case Manager Email Exchange', subtitle: 'Anthony Lopez (Rocky Mountain HS) • PAR #8920 renewal approved', tag: '2 days ago', meta: 'Chronology' },

  // Compliance Docs
  { id: 'comp-1', type: 'compliance', title: 'Form I-9 Form (Employment Eligibility)', subtitle: 'U.S. Citizen / Authorized Alien Verification • Elena Morales', tag: 'Verified Active', meta: 'Compliance' },
  { id: 'comp-2', type: 'compliance', title: 'CBI Colorado Bureau of Investigation Check', subtitle: 'Mandatory State Background Check • Derek Miller • Cleared', tag: 'Cleared', meta: 'Compliance' },
  { id: 'comp-3', type: 'compliance', title: 'OIG & SAM Exclusion Screening', subtitle: 'Federal Healthcare Exclusion Monthly Audit • Clean Record', tag: 'Active Pass', meta: 'Compliance' },
  { id: 'comp-4', type: 'compliance', title: 'CPR / First Aid Certification', subtitle: 'American Heart Association • Rosa Vega • Renewal Required', tag: 'Expired', meta: 'Compliance' },

  // Caregivers
  { id: 'cg-1', type: 'caregiver', title: 'Elena Morales', subtitle: 'Mother & Family Caregiver • W-2 Active', tag: '98% Compliance', meta: 'Caregiver' },
  { id: 'cg-2', type: 'caregiver', title: 'Rosa Vega', subtitle: 'CPR / First Aid Expired • Immediate Attention', tag: 'Credential Expired', meta: 'Caregiver' },
  { id: 'cg-3', type: 'caregiver', title: 'Luis Ruiz', subtitle: 'Driving Record Expired 21d • Vehicle Waiver', tag: 'Credential Expired', meta: 'Caregiver' },
  { id: 'cg-4', type: 'caregiver', title: 'Grace Park', subtitle: 'TB Test Expiring in 12 days • Auto-reminder sent', tag: 'Expiring Soon', meta: 'Caregiver' },
  { id: 'cg-5', type: 'caregiver', title: 'Derek Miller', subtitle: 'W-2 Caregiver • 36 hrs/wk logged', tag: 'Active Caregiver', meta: 'Caregiver' },
  { id: 'cg-6', type: 'caregiver', title: 'Clara Miller', subtitle: 'W-2 Caregiver • Initial nurse visit pending', tag: 'Supervision Due', meta: 'Caregiver' },

  // Assessments
  { id: 'assess-1', type: 'assessment', title: 'Fall Risk Assessment Protocol', subtitle: 'Morse Fall Scale Score: 14 (High Risk) • Safety Plan Instituted', tag: 'High Risk', meta: 'Assessment' },
  { id: 'assess-2', type: 'assessment', title: 'IHSS ADL Functional Need Assessment', subtitle: 'Bathing, Dressing, Transfers • 28.5 weekly hours certified', tag: 'IHSS Certified', meta: 'Assessment' },
  { id: 'assess-3', type: 'assessment', title: 'Skin & Wound Clinical Assessment', subtitle: 'Stage 1 Ulcer Monitoring • Bi-weekly Nurse Evaluation Protocol', tag: 'Clinical QA', meta: 'Assessment' },

  // Pages & Operational Modules
  { id: 'page-1', type: 'page', title: 'Executive Overview Dashboard', subtitle: 'Central Agency Admin command center', tag: 'Dashboard', meta: 'Page' },
  { id: 'page-2', type: 'page', title: 'Caregiver Onboarding Queue', subtitle: 'Verify 15-20 document packets & CBI checks', tag: 'Onboarding', meta: 'Page' },
  { id: 'page-3', type: 'page', title: 'Colorado EVV Aggregator Hub', subtitle: 'Live geofence matches & self-correction log', tag: 'EVV Hub', meta: 'Page' },
  { id: 'page-4', type: 'page', title: 'Authorizations Queue', subtitle: 'Track approved, pending state and overdue PARs', tag: 'Authorizations', meta: 'Page' },
  { id: 'page-5', type: 'page', title: 'Compliance & Expirations Monitor', subtitle: 'CPR, CBI and TB credential renewal tracking', tag: 'Compliance', meta: 'Page' },
  { id: 'page-6', type: 'page', title: 'Intake & Referral Pipeline', subtitle: 'Manage leads from Case Management Agencies', tag: 'Intake', meta: 'Page' },
  { id: 'page-7', type: 'page', title: 'Medicaid Billing Claims', subtitle: 'Dual NPI claims, commercial denial letters', tag: 'Billing', meta: 'Page' },
  { id: 'page-8', type: 'page', title: '7-Year Historical Data Vault', subtitle: 'Archived records from KanTime & AxisCare', tag: 'Data Vault', meta: 'Page' },
];

// Contextual detail records for drawers / modals
export const UNAPPROVED_SHIFTS_RECORDS = [
  {
    caregiverId: 'CG-0512',
    caregiverName: 'Marcus Jenkins',
    clientId: 'PT-1002',
    clientName: 'Harold Jenkins',
    shiftDate: 'Nov 14 - Nov 16, 2026',
    hoursLogged: 18.5,
    riskAmount: '$499.50',
    reason: 'PAR renewal pending state approval (verbal authorization from CMA Anthony Lopez)',
    status: 'Action required',
    phone: '(720) 555-0198',
  },
  {
    caregiverId: 'CG-0628',
    caregiverName: 'Derek Miller',
    clientId: 'PT-1005',
    clientName: 'Clara Miller',
    shiftDate: 'Nov 12 - Nov 15, 2026',
    hoursLogged: 24.0,
    riskAmount: '$648.00',
    reason: '60-day RN supervisory visit scheduled but PAR effective date delayed in Bridge portal',
    status: 'Action required',
    phone: '(303) 555-0133',
  },
  {
    caregiverId: 'CG-0741',
    caregiverName: 'Rosa Vega',
    clientId: 'PT-1042',
    clientName: 'Marisol Vega',
    shiftDate: 'Nov 10 - Nov 17, 2026',
    hoursLogged: 32.0,
    riskAmount: '$864.00',
    reason: 'Prior authorization expired 14 days ago; caregiver continued providing daily care',
    status: 'Immediate',
    phone: '(303) 555-0177',
  },
  {
    caregiverId: 'CG-0814',
    caregiverName: 'Samantha Cruz',
    clientId: 'PT-1077',
    clientName: 'Emilio Cruz',
    shiftDate: 'Nov 15 - Nov 16, 2026',
    hoursLogged: 12.0,
    riskAmount: '$324.00',
    reason: 'Service code switch from Homemaker to IHSS awaiting county CM sign-off',
    status: 'Immediate',
    phone: '(720) 555-0164',
  },
  {
    caregiverId: 'CG-0925',
    caregiverName: 'Lucia Ramirez',
    clientId: 'PT-1090',
    clientName: 'Carlos Ramirez',
    shiftDate: 'Nov 13 - Nov 16, 2026',
    hoursLogged: 16.0,
    riskAmount: '$432.00',
    reason: 'Re-assessment packet in queue with Rocky Mountain Human Services',
    status: 'Immediate',
    phone: '(303) 555-0182',
  },
  {
    caregiverId: 'CG-0972',
    caregiverName: 'Arthur Vance',
    clientId: 'PT-3004',
    clientName: 'Donald Vance',
    shiftDate: 'Nov 14 - Nov 17, 2026',
    hoursLogged: 18.0,
    riskAmount: '$486.00',
    reason: 'Annual waiver renewal overdue by 7 days; state CMA case review in progress',
    status: 'Immediate',
    phone: '(970) 555-0177',
  },
];

export const SCREENING_REVIEW_RECORDS = [
  {
    id: 'cbi-1',
    caregiverId: 'CG-1088',
    caregiverName: 'Devon Walker',
    screeningType: 'Colorado CBI Fingerprint & State Repository',
    flagDate: '2026-11-16',
    severity: 'Medium',
    summary: 'Discrepancy in previous residence address during 2021; no criminal offenses recorded.',
    recommendedAction: 'Request proof of Colorado residency (utility bill or lease agreement).',
    status: 'Pending Admin Review',
  },
  {
    id: 'cbi-2',
    caregiverId: 'CG-1102',
    caregiverName: 'Maria Santos',
    screeningType: 'OIG & SAM Federal Exclusion Database',
    flagDate: '2026-11-15',
    severity: 'Low',
    summary: 'Partial name match on national exclusion database; DOB does not match.',
    recommendedAction: 'Verify full legal name and SSN against official Colorado ID to clear false positive.',
    status: 'Ready to Clear',
  },
  {
    id: 'cbi-3',
    caregiverId: 'CG-1115',
    caregiverName: 'Kenneth Howard',
    screeningType: 'Colorado Adult Protective Services (CAPS) Check',
    flagDate: '2026-11-14',
    severity: 'Medium',
    summary: 'Out-of-state verification pending from Wyoming Department of Family Services.',
    recommendedAction: 'Confirm provisional employment agreement under supervisory exemption.',
    status: 'Awaiting State Response',
  },
];

export const EVV_EXCEPTION_RECORDS = [
  {
    id: 'EVV-EX-01',
    caregiverName: 'Elena Morales',
    clientName: 'Mateo Morales',
    date: 'Nov 17, 2026',
    scheduled: '08:00 AM - 12:00 PM',
    actual: '08:02 AM - Missing',
    issue: 'Missing Clock-Out (Shift still active or forgotten)',
    variance: 'Active Shift',
    note: 'Elena assisted Mateo with hospital transport at 11:45 AM. Self-correction pending submission.',
  },
  {
    id: 'EVV-EX-02',
    caregiverName: 'Luis Ruiz',
    clientName: 'Marisol Vega',
    date: 'Nov 16, 2026',
    scheduled: '01:00 PM - 05:00 PM',
    actual: '01:05 PM - 05:00 PM',
    issue: 'GPS Geofence Variance (380m from residence)',
    variance: '380m radius',
    note: 'Visit took place at physical therapy center (11400 E Colfax). Transport authorized in service plan.',
  },
  {
    id: 'EVV-EX-03',
    caregiverName: 'Derek Miller',
    clientName: 'Clara Miller',
    date: 'Nov 16, 2026',
    scheduled: '09:00 AM - 01:00 PM',
    actual: '09:15 AM - Missing',
    issue: 'Cellular dead-zone prevented automated clock-out',
    variance: 'Offline Queue',
    note: 'Caregiver initiated manual sync upon returning to Wi-Fi. Audit log contains valid GPS coordinates.',
  },
  {
    id: 'EVV-EX-04',
    caregiverName: 'Samantha Cruz',
    clientName: 'Emilio Cruz',
    date: 'Nov 15, 2026',
    scheduled: '10:00 AM - 02:00 PM',
    actual: '10:00 AM - 02:45 PM',
    issue: 'Unscheduled Overtime (+45 min)',
    variance: '+45 min',
    note: 'Client experienced mobility distress; caregiver remained until family member arrived.',
  },
];

export const CARE_NOTE_AUDIT_RECORDS = [
  {
    id: 'NOTE-101',
    caregiverName: 'Elena Morales',
    clientName: 'Mateo Morales',
    service: 'IHSS',
    date: '2026-11-17',
    rawNote: 'Helped Mateo get dressed and made him breakfast. Did his stretches and walked him around the living room.',
    aiStructuredSuggestion: 'Provided physical assistance with ADL hygiene and morning dressing. Administered therapeutic range-of-motion stretching protocol and guided 15-minute gait ambulation in residential living area per IHSS care plan.',
    complianceScore: 98,
    status: 'Ready for RN Sign-off',
  },
  {
    id: 'NOTE-102',
    caregiverName: 'Derek Miller',
    clientName: 'Clara Miller',
    service: 'CNA',
    date: '2026-11-16',
    rawNote: 'Gave sponge bath, changed sheets, checked skin on lower back no redness. Gave lunch and meds.',
    aiStructuredSuggestion: 'Conducted complete bed bath and hygienic bedding exchange. Performed skin integrity inspection on lumbar region noting no erythema or pressure ulcer formation. Assisted with nutritional meal intake; verified prescribed medication regimen compliance.',
    complianceScore: 96,
    status: 'Ready for RN Sign-off',
  },
];

export const STUCK_HOUSEHOLDS_RECORDS = [
  {
    id: 'HH-101',
    householdHead: 'Elena Morales & Mateo Morales',
    referralDate: '2026-10-28',
    daysStuck: 20,
    bottleneck: 'State PAR Form delayed at Rocky Mountain Human Services (Dana Whitfield)',
    missingItems: ['Signed PAR form', 'Updated Medicaid eligibility code'],
    contact: '(303) 555-0142',
    assignedCoordinator: 'Danielle Brooks',
  },
  {
    id: 'HH-102',
    householdHead: 'Rachel Bennett & Chloe Bennett',
    referralDate: '2026-11-04',
    daysStuck: 13,
    bottleneck: 'Physician Order & Attestation Statement awaiting Dr. Henderson signature',
    missingItems: ['Form 485 Physician Signature', 'Pediatric G-Tube Attestation'],
    contact: '(719) 555-0181',
    assignedCoordinator: 'Danielle Brooks',
  },
  {
    id: 'HH-103',
    householdHead: 'Arthur Vance & Donald Vance',
    referralDate: '2026-11-06',
    daysStuck: 11,
    bottleneck: 'CBI fingerprint appointment rescheduled by caregiver',
    missingItems: ['CBI LiveScan receipt', 'Direct Deposit Voided Check'],
    contact: '(970) 555-0177',
    assignedCoordinator: 'Danielle Brooks',
  },
  {
    id: 'HH-104',
    householdHead: 'Marcos Ramirez & Sophia Ramirez',
    referralDate: '2026-11-09',
    daysStuck: 8,
    bottleneck: 'State Case Manager change at Developmental Pathways',
    missingItems: ['New CM Assignment Letter', 'Waiver Budget Allocation'],
    contact: '(720) 555-9011',
    assignedCoordinator: 'Danielle Brooks',
  },
  {
    id: 'HH-105',
    householdHead: 'Lucia Alvarez & Julian Alvarez',
    referralDate: '2026-11-11',
    daysStuck: 6,
    bottleneck: 'LearnWorlds online training modules incomplete (4 of 6 done)',
    missingItems: ['IHSS Emergency Preparedness module', 'HIPAA Acknowledgement'],
    contact: '(719) 555-3211',
    assignedCoordinator: 'Danielle Brooks',
  },
];

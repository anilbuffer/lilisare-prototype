export type UserRole =
  | 'enrollment'
  | 'onboarding'
  | 'compliance'
  | 'clinical'
  | 'billing'
  | 'caregiver'
  | 'admin';

export interface RoleConfig {
  id: UserRole;
  label: string;
  department: string;
  avatar: string;
  description: string;
  allowedModules: string[];
}

export type ServiceType =
  | 'CNA'
  | 'IHSS'
  | 'HMA'
  | 'Personal Care'
  | 'Homemaker'
  | 'IRSS / Host Home'
  | 'PDN';

export type CaregiverClassification =
  | 'Employee (W-2)'
  | 'Independent Contractor (1099)'
  | 'Dual (Employee + Contractor)';

export type PatientOnboardingStatus =
  | 'Not Started'
  | 'In Progress'
  | 'Documents Pending'
  | 'Under Review'
  | 'Approval Pending'
  | 'Ready for Service'
  | 'Active'
  | 'On Hold';

export type CaregiverOnboardingStatus =
  | 'Not Started'
  | 'Application Sent'
  | 'Documents Pending'
  | 'Under Review'
  | 'Background Check Pending'
  | 'Training Pending'
  | 'Ready for Activation'
  | 'Active';

export type LeadStatus =
  | 'New Inquiry'
  | 'Contact Pending'
  | 'Contacted'
  | 'Needs Clarification'
  | 'Case Manager Coordination'
  | 'Follow-up Scheduled'
  | 'Converted'
  | 'Closed / Not Proceeding';

export interface Lead {
  id: string;
  clientName: string;
  primaryContactName: string;
  relationship: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  inquirySource: 'Case Management Agency' | 'Direct Referral' | 'Family Inbound Call' | 'Website Inquiry' | 'RFP Process';
  referralAgency: string;
  caseManagerName: string;
  caseManagerPhone: string;
  caseManagerEmail: string;
  requestedService: ServiceType;
  assignedStaff: string;
  status: LeadStatus;
  communicationCount: number;
  lastContactDate: string;
  nextFollowUpDate: string;
  notes: string;
  createdAt: string;
}

export type DocumentStatus = 'Required' | 'Submitted' | 'Verified' | 'Rejected' | 'Expired';

export interface DocumentRecord {
  id: string;
  name: string;
  category: 'Legal' | 'Clinical' | 'Compliance' | 'Identification' | 'Payroll';
  requiredForRole: 'Client' | 'Caregiver';
  serviceType: ServiceType[];
  status: DocumentStatus;
  fileName?: string;
  uploadedAt?: string;
  verifiedAt?: string;
  expirationDate?: string;
  rejectionReason?: string;
}

export interface BackgroundCheck {
  id: string;
  name: string;
  provider: 'Colorado Bureau of Investigation (CBI)' | 'OIG List of Excluded Entities' | 'Colorado Courts Records' | 'Colorado DMV' | 'National Registry';
  status: 'Passed' | 'In Progress' | 'Requires Review' | 'Not Started';
  completedDate?: string;
  expiryDate?: string;
  estimatedCost: string;
}

export interface Caregiver {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  classification: CaregiverClassification;
  relationshipToClient: 'Mother' | 'Father' | 'Spouse' | 'Adult Sibling' | 'Grandparent' | 'Non-Family Caregiver';
  linkedClientId: string;
  linkedClientName: string;
  servicesProvided: ServiceType[];
  onboardingStage: 'Profile & Demographics' | 'Document Submission' | 'Screening & CBI Checks' | 'LearnWorlds Training' | 'RN Clinical Validation' | 'Active & Activated';
  onboardingProgress: number; // 0 - 100
  documents: DocumentRecord[];
  backgroundChecks: BackgroundCheck[];
  trainingStatus: {
    platform: 'LearnWorlds';
    coursesAssigned: number;
    coursesCompleted: number;
    averageQuizScore: number;
    orientationVideoWatched: boolean;
  };
  adpStatus: 'Not Enrolled' | 'Profile Created (ADP Run)' | 'Active Direct Deposit';
  notes: string;
  activatedAt?: string;
}

export interface Client {
  id: string;
  fullName: string;
  dateOfBirth: string;
  medicaidNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  responsiblePartyName: string;
  responsiblePartyRelationship: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  program: 'Colorado HCBS-EBD' | 'HCBS-CES Waiver' | 'CFC Medicaid Program' | 'IHSS Waiver' | 'IRSS Host Home';
  authorizedServices: {
    service: ServiceType;
    authorizedHoursWeekly: number;
    frequency: string;
    supervisionRequirement: string;
  }[];
  assignedCaregiverIds: string[];
  caseManager: {
    name: string;
    agency: string;
    phone: string;
    email: string;
    servicePlanStatus: 'Requested' | 'Pending Review' | 'Approved & Synced';
  };
  onboardingProgress: number;
  documents: DocumentRecord[];
  clinicalStatus: 'Active' | 'Initial Evaluation Due' | 'Annual Re-assessment Scheduled';
  createdDate: string;
}

export interface EVVRecord {
  id: string;
  caregiverId: string;
  caregiverName: string;
  clientId: string;
  clientName: string;
  serviceType: ServiceType;
  date: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  actualClockIn?: string;
  actualClockOut?: string;
  gpsVerified: boolean;
  evvStateStatus: 'Validated & Matched' | 'Exception: Missed Clock-Out' | 'Pending Aggregator Transmission' | 'Adjusted by Caregiver';
  caregiverSelfCorrection?: {
    originalMissedTime: string;
    requestedTime: string;
    reason: string;
    submittedAt: string;
    reviewedBy?: string;
    status: 'Pending Approval' | 'Approved' | 'Rejected';
  };
  caregiverNotes: string;
  aiDocumentationCheck: {
    score: number; // e.g. 96%
    verifiedKeyActivities: string[];
    medicaidComplianceMet: boolean;
  };
}

export interface ComplianceVisit {
  id: string;
  clientId: string;
  clientName: string;
  caregiverId: string;
  caregiverName: string;
  serviceCategory: ServiceType;
  visitType: 'Initial In-Home RN Assessment' | 'Quarterly Virtual RN Review' | 'Annual In-Home Supervisory Check' | 'IHSS Care Oversight';
  assignedSupervisor: string;
  supervisorRole: 'Registered Nurse (RN)' | 'Clinical Care Manager' | 'IHSS Coordinator';
  dueDate: string;
  status: 'Completed' | 'Scheduled' | 'Upcoming' | 'Overdue';
  completedDate?: string;
  notes?: string;
}

export interface BillingClaim {
  id: string;
  claimId: string;
  clientId: string;
  clientName: string;
  billingProviderNPI: string; // e.g. NPI-1 (Mountain Lane) or NPI-2 (Colorado Home Health)
  serviceType: ServiceType;
  billingUnits: number;
  ratePerUnit: number;
  totalBilled: number;
  primaryPayer: 'Health First Colorado (Medicaid)' | 'UnitedHealthcare Community' | 'Kaiser Senior Choice' | 'Anthem BlueCross';
  requiresCommercialDenialFirst: boolean;
  denialLetterAttached?: {
    receivedDate: string;
    denialCode: string;
    letterUrl: string;
  };
  status: 'Ready for Batch' | 'Transmitted to State' | 'Adjudicated - Paid' | 'Commercial Denial Pending' | 'Claim Rejected / Exception';
  submissionDate?: string;
  adjudicationDate?: string;
  notes?: string;
}

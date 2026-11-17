# LiliSphere — Development Phases & Implementation Tasks (TASKS.md)
**Version:** 1.0  
**Project:** LiliSare Platform (Mountain Lane & Colorado Home Health)  
**Status:** In Progress (MVP Foundation Completed)

---

## 1. Project Phase Breakdown

```
[ Phase 0: Discovery & Architecture Validation ]  --> (COMPLETED)
       │
[ Phase 1: Release 1 — Core Operations MVP ]     --> (IN PROGRESS / PROTOTYPE BUILT)
       │
[ Phase 2: Release 2 — Mobile App & EVV Hub ]    --> (PLANNED)
       │
[ Phase 3: Release 3 — RCM & 7-Yr Data Vault ]   --> (PLANNED)
```

---

## 2. Phase 0: Discovery & Technical Validation (Week 1) — COMPLETED

- [x] Analyze source call transcripts, internal notes, and release plan baseline.
- [x] Resolve key open discovery questions:
  - [x] Confirm core flows: **Caregiver Onboarding (15 Steps)** and **Patient Onboarding (11 Steps)**.
  - [x] Confirm Colorado EVV strategy: Standard Colorado HCPF / Sandata open REST approach.
  - [x] Confirm statutory data retention standard: **7-year audit retention** under CDPHE guidelines.
  - [x] Clarify localization: English-first baseline; hold Spanish support for future phase.
- [x] Establish architectural model: Linked Household with strictly isolated client vs. caregiver records.

---

## 3. Phase 1: Release 1 — Core Platform & Onboarding Automation

**Target Scope:** Mountain Lane initial rollout ($15,000 baseline; ~7–8 weeks).

### 3.1 Project Scaffolding & Design System
- [x] Next.js App Router, TypeScript strict mode, and Tailwind CSS initialization.
- [x] Configure brand color tokens:
  - [x] Primary `#3e6b2b`, Secondary `#F2B632`
  - [x] Luminous Orange `#ff6900`, Luminous Amber `#fcb900`
  - [x] Light Green Cyan `#7bdcb5`, Vivid Green Cyan `#00d084`, Cyan Bluish Gray `#abb8c3`
- [x] Inter font family and typography scale implementation.
- [x] Global layout shell with Header, Sidebar, and Toast notification container.

### 3.2 Role-Scoped Portals & Access Control
- [x] Implement interactive Role Switcher supporting all 7 perspectives.
- [x] Build **Agency Onboarding Portal** (Danielle Brooks):
  - [x] Service-to-packet auto-compiler (IHSS, CNA, HMA, Personal Care).
  - [x] Caregiver queue with search and W-2 / 1099 / Dual classification filters.
  - [x] Document verification action buttons.
  - [x] CBI background check trigger and status updater.
  - [x] One-click Caregiver Activation button.
- [x] Build **Unified Intake Portal** (Enrollment Specialist):
  - [x] 6-stage visual inquiry pipeline (Inquiry $\rightarrow$ Converted).
  - [x] State case-management agency tracking (RMHS, Imagine!, TRE).
  - [x] One-click templated case-manager follow-up dispatch.
  - [x] New inquiry registration modal.
- [x] Build **Executive Admin Overview Portal**:
  - [x] Multi-entity scaling metrics (900+ caregivers, 500 clients, 3x target).
  - [x] Quick navigation deck into all department perspectives.

### 3.3 Core Process Journey Visualizers
- [x] Build **Caregiver Onboarding Flow** component (15 steps across 4 phases).
- [x] Build **Patient Onboarding Flow** component (11 state milestones).
- [x] Interactive step inspector, completion toggles, and automation rule explanations.

---

## 4. Phase 2: Release 2 — Caregiver Experience, EVV & AI Notes

### 4.1 Mobile Caregiver Portal
- [x] Build mobile-first caregiver interface (Elena Morales):
  - [x] Shift card with Denver geofenced address.
  - [x] Single-tap EVV Clock In / Clock Out.
  - [x] **Self-Service Missed Clock-Out Resolution** card (input actual time + reason).
  - [x] **AI Care Note Dictation** widget with real-time speech simulation.
  - [x] Automated Medicaid ADL compliance scoring (e.g. 97% confidence score).
  - [x] My Documents checklist and LearnWorlds completion badge.

### 4.2 Colorado EVV Aggregator Prototype
- [x] Build **Colorado EVV Hub** component:
  - [x] Colorado HCPF / Sandata open REST specification payload inspector.
  - [x] Live GPS coordinate matching simulation ($\pm 50$ meter tolerance).
  - [x] Shift exception queue with reviewer approval button.
  - [x] SHA-256 cryptographic audit signing.

### 4.3 Clinical Supervision & Quality Audit
- [x] Build **RN Clinical Supervisory Console** (Rebecca Stern, BSN, RN):
  - [x] Mandatory supervisory visit schedule matrix (60-day in-home CNA, quarterly virtual HMA).
  - [x] Sign and complete nurse visit action with clinical note capture.
  - [x] AI care note audit feed for continuous documentation monitoring.

---

## 5. Phase 3: Release 3 — Revenue Cycle & 7-Year Data Vault

### 5.1 Medicaid Billing & Dual-NPI Claims
- [x] Build **Medicaid Billing Center**:
  - [x] Dual-NPI claim routing (Mountain Lane NPI 1 vs. Colorado Home Health NPI 2).
  - [x] Commercial insurer denial letter management (prerequisite for secondary Medicaid).
  - [x] Batch transmission button for verified EVV claims.
  - [x] EVV verified units vs. billed amount calculations.

### 5.2 7-Year Statutory Data Vault (Vendor Sunset)
- [x] Build **7-Year State Audit Archive Vault** component:
  - [x] AxisCare historical visit migration pipeline.
  - [x] KanTime nursing note & Form 485 ingestion monitor.
  - [x] Frisco 35–45 rural client archive status.
  - [x] AWS KMS AES-256 encryption at rest specification.
  - [x] Read-only state auditor query interface documentation.

---

## 6. Implementation & Quality Assurance Checklist

- [x] **Zero Lorem Ipsum:** All data represents authentic Colorado home-care entities.
- [x] **Zero Broken Buttons:** Every button and interactive element executes state changes with toast feedback.
- [x] **Zero Console Errors:** Verified with strict TypeScript and ESLint compliance.
- [x] **Clean Production Build:** Tested via `npm run build` — passes with code 0.
- [x] **Responsive Architecture:** Verified across desktop split-pane and mobile single-column layouts.
- [x] **Role Security Enforcement:** Modules isolated strictly according to `USER_ROLES.md`.
- [x] **Repository Cleanliness:** Git commit history clean and structured.

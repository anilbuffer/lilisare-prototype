# LiliSphere — Design System & UI/UX Architecture (DESIGN.md)
**Version:** 1.0  
**Design Standard:** Ultra-Premium Healthcare & Operational SaaS  
**Font:** Inter  

---

## 1. Design Philosophy & Guiding Principles

### 1.1 Dual-User Empathy
LiliSphere must simultaneously serve two completely different user personas:
1. **The Overburdened Agency Coordinator (Danielle):** A 2-person team managing 900+ caregivers. Needs **high-information density**, instant keyboard navigability, zero unnecessary clicks, split-pane queue inspection, and prominent exception alerts.
2. **The Family Caregiver (Elena):** A mother caring for a child with special needs. Needs **warmth, clarity, oversized tap targets (min 48px)**, zero bureaucratic jargon, one-tap EVV clock-in, and reassuring visual feedback.

### 1.2 Core Tenets
* **Cleanliness & Information Hierarchy:** Remove every non-essential metric or action. If an element does not advance an onboarding step, log EVV, or satisfy Medicaid compliance, it is omitted.
* **Role-Scoped Views:** Each user only sees modules relevant to their immediate responsibilities.
* **Zero Lorem Ipsum / No Dummy Names:** Every screen uses realistic Colorado home-care entities, actual waiver acronyms (IHSS, CNA, HMA), and real family relationship structures.
* **Resilient Feedback:** Every action (document verification, self-correction submission, CBI check) provides immediate, descriptive toast feedback.

---

## 2. Color Palette & Thematic Tokens

The system utilizes an organic, healthcare-grounded palette balanced by crisp, accessible neutrals:

```
[ Primary: Forest Green ]     #3e6b2b  (Brand authority, verified states, primary CTAs)
[ Secondary: Amber Gold ]     #F2B632  (Warning states, active highlights, badges)
[ Luminous Orange ]           #ff6900  (Overdue deadlines, priority exceptions)
[ Luminous Amber ]            #fcb900  (Expiring credentials, action pending)
[ Light Green Cyan ]          #7bdcb5  (Secondary accents, subtle progress fills)
[ Vivid Green Cyan ]          #00d084  (Confirmed state EVV match, clean audits)
[ Cyan Bluish Gray ]          #abb8c3  (Borders, subtle dividers, muted metadata)
```

### 2.1 Extended Color Swatches

| Token Name | Hex Code | Purpose & Semantic Application |
| :--- | :--- | :--- |
| `primary` (DEFAULT) | `#3e6b2b` | Primary buttons, active navigation, brand identity |
| `primary-50` | `#f4f7f2` | Active row highlight, soft card background |
| `primary-900` | `#2a3d20` | Hero banners, high-contrast modal headers |
| `secondary` (DEFAULT) | `#F2B632` | Secondary accent badges, warning callouts |
| `luminous-orange` | `#ff6900` | Overdue supervisory visit alerts, PAR lapses |
| `luminous-amber` | `#fcb900` | Credential expiring in < 30 days |
| `light-green-cyan` | `#7bdcb5` | Soft progress indicators, secondary badges |
| `vivid-green-cyan` | `#00d084` | Live GPS geofence verified, CBI cleared |
| `cyan-bluish-gray` | `#abb8c3` | Structural borders, card outlines |
| `slate-50` | `#f8fafc` | Global canvas background |
| `slate-900` | `#0f172a` | Primary typography, high-contrast text |

---

## 3. Typography: Inter

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### 3.1 Type Hierarchy Scale

| Level | Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `28px - 32px` | 800 (ExtraBold) | `1.2` | Hero page headers (e.g. Caregiver Onboarding) |
| **Section H2** | `20px - 24px` | 700 (Bold) | `1.3` | Milestone titles, card group headers |
| **Card H3** | `15px - 16px` | 700 (Bold) | `1.4` | Table headers, detail inspector titles |
| **Subheading H4** | `13px - 14px` | 600 (SemiBold) | `1.4` | Input labels, modal section titles |
| **Body (Regular)** | `13px` | 400 (Regular) | `1.5` | Standard narrative text, audit descriptions |
| **Body (Dense)** | `12px` | 500 (Medium) | `1.4` | Queue items, table cells, metadata |
| **Micro Caption** | `10px - 11px` | 600 / 700 (Bold) | `1.2` | Status pill badges, uppercase category tags |
| **Monospace** | `11px - 12px` | 500 (Medium) | `1.4` | NPI numbers, Medicaid IDs, JSON schema |

---

## 4. Layout Architecture & Screen Anatomy

### 4.1 Global Layout Grid
```
+-------------------------------------------------------------------------------+
| HEADER: Brand Logo | Global Flow Tabs | Telemetry Pills | Role Switcher       |
+-------------------+-----------------------------------------------------------+
| SIDEBAR:          | MAIN WORKSPACE:                                           |
| - Role Modules    | [ HERO BANNER: Role Persona / Milestone Progress ]        |
| - 15-Step Flow    |                                                           |
| - 11-Step Flow    | [ SPLIT-PANE WORKSPACE: ]                                 |
| - EVV Hub         | +-----------------------+ +-----------------------------+ |
| - 7-Yr Vault      | | Left: Search & Queue  | | Right: Inspector & Actions  | |
| - Entity Metadata | | - Filter Pills        | | - Document Checklist     | |
|                   | | - Caregiver / Lead    | | - CBI Screening Trigger   | |
|                   | | - Progress Bar        | | - Activation Button       | |
|                   | +-----------------------+ +-----------------------------+ |
+-------------------+-----------------------------------------------------------+
| TOAST NOTIFICATIONS (Fixed Bottom-Right)                                      |
+-------------------------------------------------------------------------------+
```

### 4.2 Split-Pane Design Pattern (Desktop)
* **Left Pane (40–45% width):** Compact list/queue of records (caregivers, leads, visits, claims) with search, classification filter pills, and real-time completion progress meters.
* **Right Pane (55–60% width):** Rich contextual inspector for the selected record. Displays linked household relationships, service-specific document checklist, CBI screening status, and primary action buttons.

### 4.3 Mobile Caregiver Screen Anatomy
* **Single Column (Max-width 480px centered):**
  * Personalized greeting card with child/client photo & authorized weekly hours.
  * Prominent **Shift Action Card** with bold "Clock In" / "Clock Out" button.
  * **Self-Service Exception Card** (highlighted in soft amber) when a missed clock-out occurs.
  * **AI Voice Dictation Card** with live speech-to-text recording indicator and instant compliance score badge.

---

## 5. UI Components & Design Tokens

### 5.1 Status Pill Badges
* **Verified / Cleared:** `bg-emerald-100 text-emerald-800 border border-emerald-200`
* **Pending / In Progress:** `bg-amber-100 text-amber-900 border border-amber-200`
* **Exception / Overdue:** `bg-rose-100 text-rose-800 border border-rose-200`
* **Informational / Dual:** `bg-primary-100 text-primary-900 border border-primary-200`

### 5.2 Buttons & Interactions
* **Primary Action:** `bg-[#3e6b2b] hover:bg-[#2a3d20] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all`
* **Secondary Highlight:** `bg-[#F2B632] hover:bg-[#d99719] text-slate-950 font-bold rounded-xl shadow-sm`
* **Micro-Interactions:** Subtle scale effect on click (`active:scale-[0.98]`), animated chevron rotations on dropdown expansion, and soft pulse on active GPS verification.

### 5.3 HIPAA UI Constraints
* **Masked Identifiers:** Social Security numbers and Tax IDs are masked by default (`***-**-6819`).
* **Session Timeout Warning:** Visual indicator after inactivity to comply with HIPAA workstation use rules.
* **Clean Exports:** Any print or PDF export automatically injects confidential audit headers and timestamps.

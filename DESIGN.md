---
name: Transaction Review Dashboard
description: A calm, evidence-first dashboard for human transaction review and financial crime operations triage.
colors:
  ink-deep: "#102033"
  ink-blue: "#0a2540"
  body-copy: "#45596f"
  muted-copy: "#66788d"
  copy-soft: "#53677c"
  copy-steel: "#52677c"
  slate-strong: "#33475b"
  slate-mid: "#5c7087"
  accent-blue: "#3164d4"
  accent-blue-bright: "#336dff"
  accent-blue-deep: "#1c4fbf"
  accent-blue-action: "#2851b4"
  accent-blue-link: "#2457c5"
  accent-blue-medium: "#2057b4"
  page-bg: "#eef3f8"
  page-bg-start: "#f8fbff"
  page-bg-end: "#e8eef6"
  surface: "#ffffff"
  surface-soft: "#f3f7fb"
  surface-selected: "#f0f6ff"
  surface-field: "#edf3fb"
  border-soft: "#e6edf5"
  border-control: "#ced9e6"
  border-button: "#cbd8e6"
  border-field: "#d5e0ec"
  border-reason: "#dde7f1"
  panel-shadow: "rgba(28, 45, 64, 0.07)"
  input-ink: "#162a3f"
  textarea-ink: "#1e344a"
  danger-bg: "#ffe6e6"
  danger-text: "#a31f1f"
  danger-strong: "#b42318"
  warning-bg: "#fff1dd"
  warning-text: "#9a5200"
  success-bg: "#e8f7ed"
  success-text: "#1a6b39"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif"
    fontSize: "clamp(2rem, 3vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif"
    fontSize: "1.45rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif"
    fontSize: "0.76rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  control: "14px"
  field: "16px"
  evidence: "18px"
  chip: "999px"
  card: "28px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent-blue}"
    rounded: "{rounded.chip}"
    padding: "9px 14px"
  priority-strip:
    backgroundColor: "{colors.page-bg-start}"
    textColor: "{colors.ink-deep}"
    rounded: "{rounded.evidence}"
    padding: "16px 18px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-deep}"
    rounded: "{rounded.card}"
    padding: "24px"
  input-select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-deep}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
  badge-risk-critical:
    backgroundColor: "{colors.danger-bg}"
    textColor: "{colors.danger-text}"
    rounded: "{rounded.chip}"
    padding: "6px 10px"
---

# Design System: Transaction Review Dashboard

## 1. Overview

**Creative North Star: "The Review Ledger"**

This system is a measured operational ledger for human judgment. It uses cool surfaces, disciplined blue accents, compact evidence blocks, and consistent rounded controls to keep reviewers oriented across risk, SLA posture, and transaction rationale. The design should feel calm under pressure: enough hierarchy to make urgent items unmistakable, never enough decoration to compete with the evidence.

The product personality is calm, precise, and accountable. The visual system rejects generic fintech and SaaS-dashboard cliches: navy-and-gold prestige styling, decorative glassy KPI cards, gradient accents, ornamental metrics, and command-center theatrics. Risk belongs in the data and status vocabulary, not in visual drama.

**Key Characteristics:**

- Evidence-first hierarchy with portfolio KPIs, filters, queue, and transaction detail in one coherent workbench.
- Restrained blue accent usage for selection, links, chart bars, and control emphasis.
- Soft cool-neutral surfaces with high readability and clear separation between content layers.
- Rounded, familiar product controls that preserve trust and avoid invented affordances.
- Governance language visible enough to reinforce human review without interrupting the task.

## 2. Colors

The palette is restrained and cool: near-white operational surfaces, blue accents reserved for active meaning, and semantic status colors used only where they clarify risk or workflow state.

### Primary

- **Ledger Blue**: The primary accent used for selected rows, actionable IDs, chart volume, reset actions, and limited section labels. Its job is orientation, not decoration.
- **Deep Review Ink**: The dominant text color for headings, KPI values, table data, and important detail values.

### Secondary

- **Governance Blue**: A brighter blue reserved for exceptional action or visual evidence needs. It should not reintroduce chart gradients or atmospheric page wash.

### Tertiary

- **Risk Amber**, **Critical Red**, and **Cleared Green**: Semantic colors for warning, danger, and success status badges. These must always travel with text labels, never alone.

### Neutral

- **Cool Workbench**: The page background and panel-adjacent neutral field.
- **White Surface**: The main panel, KPI, control, and governance-card surface.
- **Soft Evidence Surface**: The quiet block background for detail-list fields and selected table rows.
- **Soft Rule**: Borders and dividers for tables, cards, reason blocks, and controls.
- **Muted Copy**: Secondary labels, notes, and explanatory text.

### Named Rules

**The Accent Has a Job Rule.** Blue is for active orientation, selection, chart meaning, and interactive affordances. If a blue element does not help the reviewer act or read faster, remove it.

**The Status Text Rule.** Red, amber, and green must always be paired with readable labels or values. Color alone is forbidden for risk, SLA, or workflow state.

## 3. Typography

**Display Font:** Inter with system sans fallbacks  
**Body Font:** Inter with system sans fallbacks  
**Label/Mono Font:** Inter with system sans fallbacks

**Character:** One sans-serif family carries the full product UI. The system earns trust through consistency, dense legibility, and strong weights used for data emphasis rather than brand flourish.

### Hierarchy

- **Display** (800, `clamp(2rem, 3vw, 3.25rem)`, `1`): Used for the single page title only. It stays compact so the review queue and evidence can enter the viewport quickly.
- **Headline** (800, `1.45rem`, tight): Used for panel headings like trend, filters, queue, and transaction detail.
- **Title** (900, `clamp(1.9rem, 3vw, 3rem)`, `1`): Used for KPI values and high-signal numeric summaries.
- **Body** (400-700, `0.9rem` to `1.1rem`, `1.5`): Used for prose, table cells, reason explanations, and workflow guidance.
- **Label** (800-900, `0.76rem`, uppercase, tracked): Used for compact section labels, table headers, badges, and definition labels.

### Named Rules

**The One Family Rule.** Do not introduce display, serif, or mono typefaces for flavor. This product needs data confidence, not typographic personality.

**The Label Scarcity Rule.** Uppercase tracked labels are allowed for compact product scanning, but they must name functional regions. Do not add decorative eyebrows to every future section by reflex.

## 4. Elevation

The current system uses a hybrid of tonal layering and low ambient elevation. Panels, KPI cards, and governance cards sit on opaque white surfaces with a quiet shadow, while dense evidence fields use flat tonal backgrounds. Elevation is structural: it separates the workbench layers and sticky detail panel from the page without decorative glassmorphism.

### Shadow Vocabulary

- **Panel Ambient** (`0 12px 32px rgba(28, 45, 64, 0.07)`): Used only for major containers: panels, KPI cards, and the governance card.
- **Tonal Field** (`background: #f3f7fb` or `#f0f6ff`): Used for detail-list fields and selected table rows where shadow would add noise.

### Named Rules

**The No Decorative Glass Rule.** Opaque surfaces and low shadows are the default. Do not use blur or stack translucent cards inside elevated containers.

## 5. Components

### Buttons

- **Shape:** Fully rounded pill for lightweight actions (`999px` radius).
- **Primary:** No primary action button currently exists. If introduced, use Ledger Blue sparingly with white text, strong focus-visible treatment, and the same pill vocabulary.
- **Hover / Focus:** Hover may deepen border or background; focus must be visible with a clear outline or ring. Do not rely on color shift alone.
- **Ghost:** White background, soft blue-gray border, Ledger Blue text, heavy label weight, compact padding (`9px 14px`).
- **Focus Ring:** Interactive controls use a visible Ledger Blue outline (`3px solid rgba(49, 100, 212, 0.36)`) with offset. Preserve this for keyboard review workflows.

### Chips

- **Style:** Rounded pill badges (`999px`) with semantic tinted backgrounds and dark readable text.
- **State:** Risk chips use critical, high, medium, and low vocabularies. Status chips use neutral blue-gray unless the status itself needs semantic escalation.

### Cards / Containers

- **Corner Style:** Large, soft product radius (`28px`) for panels, KPI cards, and governance cards.
- **Background:** Opaque white surface for top-level containers; soft cool fields for detail cards and selected rows.
- **Shadow Strategy:** Major containers use Panel Ambient; evidence sub-blocks stay flat.
- **Border:** Soft cool-gray border at low opacity for major surfaces; stronger but still quiet borders for reason cards and form controls.
- **Internal Padding:** `22px` for KPI cards, `24px` for panels, `28px` for governance cards.

### Priority Strip

The priority strip is a single task-orientation affordance between KPIs and the workbench. It names the first transaction a reviewer should inspect, pairs the reason with risk/SLA text, and uses a familiar ghost action to move focus to evidence. It should stay lightweight: a soft field surface, 18px radius, no shadow, no decorative alert stripe.

### Inputs / Fields

- **Style:** Native select and textarea controls with white or near-white backgrounds, cool borders, 14-16px radius, and comfortable 12-14px padding.
- **Focus:** Must add a visible outline or ring in future work; current controls should not remain focus-invisible when polished.
- **Error / Disabled:** Error should use a semantic label and border treatment, not only red text. Disabled states should reduce contrast enough to signal state while preserving readability.

### Navigation

No navigation system currently exists. If added, use standard product affordances: compact labels, clear active state, and the same cool neutral surfaces. Do not invent decorative navigation chrome.

### Signature Component: Transaction Detail Panel

The sticky transaction detail panel is the system's accountability anchor. It pairs a risk badge with transaction metadata, reason cards, recommended action, reviewer notes, and governance copy. Preserve its evidence-first order: identity, risk, amount/counterparty/timing, why flagged, then human workflow.

### Signature Component: Flagged Transaction Table

The review queue is a dense operational table with transaction-ID buttons as the selection affordance, compact labels, semantic badges, and horizontal overflow for smaller screens. Keep table affordances familiar and readable; do not replace it with decorative cards unless the screen size forces a deliberate mobile pattern.

## 6. Do's and Don'ts

### Do:

- **Do** keep the surface restrained: cool workbench background, white panels, and blue used only for orientation or action.
- **Do** pair every risk and SLA color with explicit text such as `Critical`, `High`, `Past due`, or `On track`.
- **Do** preserve the evidence path from KPIs to filters to transaction row to risk reasons.
- **Do** use familiar product controls and native affordances before designing custom interactions.
- **Do** make governance boundaries visible when a screen could imply automated decisioning.

### Don't:

- **Don't** use generic fintech and SaaS-dashboard cliches: navy-and-gold prestige styling, decorative glassy KPI cards, gradient accents, ornamental metrics, or command-center drama.
- **Don't** use gradient text, side-stripe borders, or repeated decorative eyebrows as visual scaffolding.
- **Don't** make risk status depend on color alone.
- **Don't** stack nested cards inside already elevated panels.
- **Don't** introduce display fonts, decorative icons, or custom form controls for flavor.

# Transaction Review Dashboard Architecture

## Architecture board summary

The Transaction Review Dashboard provides an executive and compliance view of transactions flagged for human review. The Friday MVP is a static React + TypeScript dashboard using synthetic data. The target-state architecture below shows how the same experience would integrate with enterprise payment, KYC, watchlist, case-management, audit, identity, and governance services.

## Target-state architecture

```mermaid
flowchart LR
  subgraph Users["Users and approval channels"]
    Executive["Leadership users<br/>Exposure, backlog, SLA posture"]
    Reviewer["Compliance reviewers<br/>Triage, notes, actions"]
    Approver["Human approval gates<br/>Requirements, design, release"]
  end

  subgraph Experience["Transaction Review Dashboard"]
    WebApp["React + TypeScript SPA<br/>KPI cards, trends, filters, detail panel"]
    StaticHost["Static hosting<br/>GitHub Pages for demo<br/>Azure Static Web Apps target"]
  end

  subgraph ApiLayer["Transaction Review API layer"]
    Gateway["API gateway<br/>Auth, throttling, request policy"]
    ReviewApi["Review API<br/>Transactions, SLA, status, assignments"]
    ExplanationApi["Explanation API<br/>Risk reasons and recommended next action"]
    CaseApi["Case update API<br/>Reviewer notes and workflow updates"]
  end

  subgraph RiskPlatform["Risk and enrichment platform"]
    Scoring["Risk scoring service<br/>Rules, models, thresholds"]
    Explanation["Risk explanation service<br/>Human-readable indicators"]
    KycEnrichment["KYC enrichment<br/>Customer profile and account context"]
    Watchlist["Watchlist screening<br/>Sanctions and AML list proximity"]
    CorridorRules["Corridor and velocity rules<br/>Jurisdiction, amount, dormant activity"]
  end

  subgraph EnterpriseData["Enterprise data and systems of record"]
    Payments["Payment sources<br/>Wire, ACH, card, core banking"]
    Ingestion["Event and batch ingestion<br/>Streaming plus scheduled extracts"]
    TxStore["Transaction history store<br/>Masked operational data"]
    KycStore["KYC data store<br/>Customer and account profile"]
    CaseMgmt["Case management system<br/>Queue, status, assignment, disposition"]
    AuditStore["Immutable audit log<br/>User, decision, note, and policy events"]
    Reporting["Regulatory and management reporting<br/>Evidence pack extracts"]
  end

  subgraph Controls["Cross-cutting controls"]
    Identity["Identity and RBAC<br/>Reviewer, manager, executive roles"]
    Masking["Data masking and tokenization<br/>No raw account identifiers in UI"]
    Policy["Policy and retention controls<br/>Legal hold, data lifecycle, SLA policy"]
    Observability["Monitoring and alerting<br/>Errors, latency, data freshness"]
    DevSecOps["GitHub delivery pipeline<br/>PR review, checks, approvals, deployment"]
  end

  Payments --> Ingestion
  Ingestion --> TxStore
  Ingestion --> Scoring
  KycStore --> KycEnrichment
  TxStore --> KycEnrichment
  KycEnrichment --> Scoring
  Watchlist --> Scoring
  CorridorRules --> Scoring
  Scoring --> Explanation
  Explanation --> ExplanationApi
  TxStore --> ReviewApi
  CaseMgmt --> ReviewApi
  ReviewApi --> Gateway
  ExplanationApi --> Gateway
  CaseApi --> Gateway
  Gateway --> WebApp
  WebApp --> StaticHost
  Executive --> WebApp
  Reviewer --> WebApp
  Approver --> DevSecOps
  CaseApi --> CaseMgmt
  ReviewApi --> AuditStore
  ExplanationApi --> AuditStore
  CaseApi --> AuditStore
  AuditStore --> Reporting
  Identity -.enforces access.-> Gateway
  Identity -.enforces access.-> WebApp
  Masking -.protects data.-> TxStore
  Masking -.protects data.-> WebApp
  Policy -.governs.-> AuditStore
  Policy -.governs.-> Reporting
  Observability -.monitors.-> Gateway
  Observability -.monitors.-> Scoring
  DevSecOps -.deploys.-> StaticHost
```

## MVP implementation slice

```mermaid
flowchart LR
  Transcript["Meeting transcript<br/>Requirements source"] --> Spec["Approved MVP specification"]
  Spec --> Data["Synthetic local JSON<br/>Masked transactions and risk reasons"]
  Data --> App["React + TypeScript dashboard<br/>KPI, trend, filters, table, detail panel"]
  App --> Tests["Automated checks<br/>Aggregation, filters, rendering"]
  Tests --> Pages["GitHub Pages demo deployment"]
  Pages --> Board["Architecture and leadership review"]
```

## Key design positions

| Area | Position |
| --- | --- |
| MVP boundary | Front-end-only static SPA with synthetic data; no backend, database, auth, or real client data in the prototype. |
| Target integration | Payment sources flow through ingestion, enrichment, risk scoring, explanation, case management, and audit logging. |
| Risk posture | Dashboard supports human review and triage; it must not present transactions as illegal or make automated final decisions. |
| Data protection | Mask identifiers in UI, tokenize sensitive fields, enforce RBAC, and retain only policy-approved review/audit data. |
| Explainability | Every high-risk item should show configured indicators such as watchlist proximity, unusual velocity, high-risk corridor, new beneficiary, dormant reactivation, or threshold exception. |
| Release governance | GitHub PRs, automated checks, environment approvals, and deployment logs provide traceability from requirement to release. |

## Architecture board decisions requested

1. Approve the MVP boundary as a static synthetic-data dashboard for leadership review.
2. Approve the target-state integration pattern: API-mediated access to transaction, risk, case, and audit services.
3. Confirm RBAC, masking, audit logging, retention, and human-in-the-loop review as mandatory production controls.
4. Confirm GitHub Pages for the demo and Azure Static Web Apps as the preferred enterprise hosting target.

import type { Transaction } from "../types";

export const transactions: Transaction[] = [
  {
    id: "TRX-10482",
    amount: 2475000,
    currency: "USD",
    type: "Wire",
    corridor: "North America -> High-risk corridor A",
    originRegion: "North America",
    destinationRegion: "High-risk corridor A",
    riskLevel: "Critical",
    reviewStatus: "Escalated",
    assignedTeam: "Sanctions Review",
    flaggedAt: "2026-06-21T10:20:00Z",
    slaDueAt: "2026-06-22T10:20:00Z",
    riskScore: 94,
    counterpartyAlias: "Counterparty A-204",
    recommendedAction: "Escalate to sanctions team",
    reviewerNotes: "Escalated for specialist review; source documentation pending.",
    riskReasons: [
      {
        code: "SAN-PROX",
        label: "Sanctions proximity",
        explanation: "Beneficiary pattern is near configured sanctions-screening indicators.",
        weight: 35
      },
      {
        code: "NEW-BEN",
        label: "New beneficiary",
        explanation: "Payment is directed to a beneficiary not previously seen in the synthetic profile.",
        weight: 25
      },
      {
        code: "HIGH-COR",
        label: "High-risk corridor",
        explanation: "Destination corridor is configured for enhanced review.",
        weight: 20
      }
    ]
  },
  {
    id: "TRX-10477",
    amount: 880000,
    currency: "USD",
    type: "Wire",
    corridor: "Europe -> High-risk corridor B",
    originRegion: "Europe",
    destinationRegion: "High-risk corridor B",
    riskLevel: "High",
    reviewStatus: "In review",
    assignedTeam: "Financial Crime Ops",
    flaggedAt: "2026-06-21T07:45:00Z",
    slaDueAt: "2026-06-22T19:45:00Z",
    riskScore: 82,
    counterpartyAlias: "Counterparty B-117",
    recommendedAction: "Request source of funds",
    reviewerNotes: "Reviewer validating supporting documents.",
    riskReasons: [
      {
        code: "AMT-THRESH",
        label: "Amount threshold",
        explanation: "Transaction value exceeds configured review threshold for the corridor.",
        weight: 30
      },
      {
        code: "VELOCITY",
        label: "Velocity anomaly",
        explanation: "Recent activity is elevated versus the synthetic historical baseline.",
        weight: 28
      }
    ]
  },
  {
    id: "TRX-10471",
    amount: 640000,
    currency: "USD",
    type: "ACH",
    corridor: "North America -> North America",
    originRegion: "North America",
    destinationRegion: "North America",
    riskLevel: "Medium",
    reviewStatus: "New",
    assignedTeam: "KYC Review",
    flaggedAt: "2026-06-22T08:30:00Z",
    slaDueAt: "2026-06-23T08:30:00Z",
    riskScore: 63,
    counterpartyAlias: "Counterparty C-455",
    recommendedAction: "Review KYC profile",
    reviewerNotes: "Awaiting initial assignment.",
    riskReasons: [
      {
        code: "DORM-ACT",
        label: "Dormant account reactivation",
        explanation: "Synthetic account pattern shows sudden activity after a dormant period.",
        weight: 32
      }
    ]
  },
  {
    id: "TRX-10462",
    amount: 1290000,
    currency: "EUR",
    type: "Wire",
    corridor: "Europe -> High-risk corridor A",
    originRegion: "Europe",
    destinationRegion: "High-risk corridor A",
    riskLevel: "High",
    reviewStatus: "Blocked",
    assignedTeam: "Operations Control",
    flaggedAt: "2026-06-20T16:15:00Z",
    slaDueAt: "2026-06-21T16:15:00Z",
    riskScore: 87,
    counterpartyAlias: "Counterparty D-802",
    recommendedAction: "Hold pending operations review",
    reviewerNotes: "Blocked while operations validates payment instructions.",
    riskReasons: [
      {
        code: "HIGH-COR",
        label: "High-risk corridor",
        explanation: "Configured corridor requires enhanced human review.",
        weight: 30
      },
      {
        code: "NEW-BEN",
        label: "New beneficiary",
        explanation: "Beneficiary is new for this synthetic sender profile.",
        weight: 24
      }
    ]
  },
  {
    id: "TRX-10459",
    amount: 152500,
    currency: "GBP",
    type: "Card",
    corridor: "United Kingdom -> Europe",
    originRegion: "United Kingdom",
    destinationRegion: "Europe",
    riskLevel: "Low",
    reviewStatus: "Cleared",
    assignedTeam: "Compliance Ops",
    flaggedAt: "2026-06-19T13:00:00Z",
    slaDueAt: "2026-06-20T13:00:00Z",
    riskScore: 38,
    counterpartyAlias: "Counterparty E-019",
    recommendedAction: "Clear with reviewer note",
    reviewerNotes: "Cleared after reviewer confirmed expected pattern in synthetic data.",
    riskReasons: [
      {
        code: "VELOCITY",
        label: "Velocity anomaly",
        explanation: "Synthetic activity briefly exceeded configured monitoring threshold.",
        weight: 18
      }
    ]
  },
  {
    id: "TRX-10448",
    amount: 420000,
    currency: "USD",
    type: "Wire",
    corridor: "Asia Pacific -> High-risk corridor B",
    originRegion: "Asia Pacific",
    destinationRegion: "High-risk corridor B",
    riskLevel: "High",
    reviewStatus: "Escalated",
    assignedTeam: "Sanctions Review",
    flaggedAt: "2026-06-18T09:40:00Z",
    slaDueAt: "2026-06-19T09:40:00Z",
    riskScore: 79,
    counterpartyAlias: "Counterparty F-331",
    recommendedAction: "Escalate to sanctions team",
    reviewerNotes: "Specialist team reviewing configured indicator match.",
    riskReasons: [
      {
        code: "SAN-PROX",
        label: "Sanctions proximity",
        explanation: "Pattern matched configured sanctions-proximity indicators.",
        weight: 34
      }
    ]
  },
  {
    id: "TRX-10439",
    amount: 315000,
    currency: "USD",
    type: "ACH",
    corridor: "North America -> Europe",
    originRegion: "North America",
    destinationRegion: "Europe",
    riskLevel: "Medium",
    reviewStatus: "In review",
    assignedTeam: "KYC Review",
    flaggedAt: "2026-06-17T11:25:00Z",
    slaDueAt: "2026-06-23T11:25:00Z",
    riskScore: 58,
    counterpartyAlias: "Counterparty G-640",
    recommendedAction: "Review KYC profile",
    reviewerNotes: "KYC profile refresh in progress.",
    riskReasons: [
      {
        code: "DORM-ACT",
        label: "Dormant account reactivation",
        explanation: "Synthetic sender pattern shows sudden restart after inactivity.",
        weight: 27
      }
    ]
  },
  {
    id: "TRX-10430",
    amount: 735000,
    currency: "USD",
    type: "Wire",
    corridor: "Middle East -> Europe",
    originRegion: "Middle East",
    destinationRegion: "Europe",
    riskLevel: "High",
    reviewStatus: "New",
    assignedTeam: "Financial Crime Ops",
    flaggedAt: "2026-06-16T14:50:00Z",
    slaDueAt: "2026-06-22T20:50:00Z",
    riskScore: 76,
    counterpartyAlias: "Counterparty H-590",
    recommendedAction: "Request source of funds",
    reviewerNotes: "Pending document request.",
    riskReasons: [
      {
        code: "AMT-THRESH",
        label: "Amount threshold",
        explanation: "Transaction value exceeded configured corridor threshold.",
        weight: 26
      },
      {
        code: "NEW-BEN",
        label: "New beneficiary",
        explanation: "Beneficiary is new in the synthetic transaction history.",
        weight: 21
      }
    ]
  },
  {
    id: "TRX-10421",
    amount: 98000,
    currency: "EUR",
    type: "Card",
    corridor: "Europe -> Europe",
    originRegion: "Europe",
    destinationRegion: "Europe",
    riskLevel: "Low",
    reviewStatus: "Cleared",
    assignedTeam: "Compliance Ops",
    flaggedAt: "2026-06-15T15:10:00Z",
    slaDueAt: "2026-06-16T15:10:00Z",
    riskScore: 31,
    counterpartyAlias: "Counterparty I-266",
    recommendedAction: "Clear with reviewer note",
    reviewerNotes: "Cleared with note in synthetic workflow.",
    riskReasons: [
      {
        code: "VELOCITY",
        label: "Velocity anomaly",
        explanation: "Short-lived transaction spike crossed configured indicator threshold.",
        weight: 14
      }
    ]
  },
  {
    id: "TRX-10414",
    amount: 1910000,
    currency: "USD",
    type: "Wire",
    corridor: "North America -> High-risk corridor B",
    originRegion: "North America",
    destinationRegion: "High-risk corridor B",
    riskLevel: "Critical",
    reviewStatus: "Blocked",
    assignedTeam: "Operations Control",
    flaggedAt: "2026-06-14T18:35:00Z",
    slaDueAt: "2026-06-15T18:35:00Z",
    riskScore: 91,
    counterpartyAlias: "Counterparty J-774",
    recommendedAction: "Hold pending operations review",
    reviewerNotes: "Payment held pending operations and risk review.",
    riskReasons: [
      {
        code: "HIGH-COR",
        label: "High-risk corridor",
        explanation: "Destination corridor is configured for heightened review.",
        weight: 28
      },
      {
        code: "AMT-THRESH",
        label: "Amount threshold",
        explanation: "Transaction value is above the configured review threshold.",
        weight: 25
      },
      {
        code: "SAN-PROX",
        label: "Sanctions proximity",
        explanation: "Pattern is near configured sanctions-screening indicators.",
        weight: 24
      }
    ]
  }
];

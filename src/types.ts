export type RiskLevel = "Critical" | "High" | "Elevated" | "Moderate";

export type ReviewStatus = "New" | "In Review" | "Escalated" | "Blocked" | "Cleared";

export type RecommendedAction =
  | "Escalate to sanctions team"
  | "Review KYC profile"
  | "Request source of funds"
  | "Clear with manager note"
  | "Refresh beneficiary evidence";

export type Transaction = {
  id: string;
  corridor: string;
  type: "Outbound wire" | "ACH transfer" | "Card settlement" | "Internal transfer";
  maskedAccount: string;
  maskedBeneficiary: string;
  exposureUsd: number;
  riskScore: number;
  riskLevel: RiskLevel;
  status: ReviewStatus;
  assignedTeam: string;
  slaHoursRemaining: number;
  openedAt: string;
  reasons: string[];
  recommendedAction: RecommendedAction;
  coordinates: {
    x: number;
    y: number;
  };
};
export type TrendPoint = {
  day: string;
  flagged: number;
  highRisk: number;
};

export type SignalCluster = {
  name: string;
  count: number;
  severity: RiskLevel;
  summary: string;
};

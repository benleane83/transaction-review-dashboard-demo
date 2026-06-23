export type TransactionType = "Wire" | "ACH" | "Card";

export type RiskLevel = "Critical" | "High" | "Medium" | "Low";

export type ReviewStatus = "New" | "In review" | "Escalated" | "Cleared" | "Blocked";

export type ReviewAction =
  | "Review KYC profile"
  | "Request source of funds"
  | "Escalate to sanctions team"
  | "Clear with reviewer note"
  | "Hold pending operations review";

export interface RiskReason {
  code: string;
  label: string;
  explanation: string;
  weight: number;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: "USD" | "EUR" | "GBP";
  type: TransactionType;
  corridor: string;
  originRegion: string;
  destinationRegion: string;
  riskLevel: RiskLevel;
  reviewStatus: ReviewStatus;
  assignedTeam: string;
  flaggedAt: string;
  slaDueAt: string;
  riskScore: number;
  counterpartyAlias: string;
  riskReasons: RiskReason[];
  recommendedAction: ReviewAction;
  reviewerNotes: string;
}

export interface TransactionFilters {
  riskLevel: RiskLevel | "All";
  reviewStatus: ReviewStatus | "All";
  corridor: string;
  transactionType: TransactionType | "All";
  assignedTeam: string;
}

import type { ReviewStatus, RiskLevel, Transaction, TransactionFilters, TransactionType } from "../types";

export const SLA_REFERENCE_DATE = new Date("2026-06-22T12:00:00Z");

export interface DashboardKpis {
  totalFlagged: number;
  totalExposure: number;
  highRiskCount: number;
  slaBreachCount: number;
}

export interface TrendPoint {
  date: string;
  label: string;
  count: number;
}

export const defaultFilters: TransactionFilters = {
  riskLevel: "All",
  reviewStatus: "All",
  corridor: "All",
  transactionType: "All",
  assignedTeam: "All"
};

export const riskLevels: Array<RiskLevel | "All"> = ["All", "Critical", "High", "Medium", "Low"];

export const reviewStatuses: Array<ReviewStatus | "All"> = [
  "All",
  "New",
  "In review",
  "Escalated",
  "Cleared",
  "Blocked"
];

export const transactionTypes: Array<TransactionType | "All"> = ["All", "Wire", "ACH", "Card"];

export function isHighRisk(transaction: Transaction): boolean {
  return transaction.riskLevel === "Critical" || transaction.riskLevel === "High";
}

export function isSlaBreached(transaction: Transaction, referenceDate = SLA_REFERENCE_DATE): boolean {
  return transaction.reviewStatus !== "Cleared" && new Date(transaction.slaDueAt) < referenceDate;
}

export function calculateKpis(transactions: Transaction[], referenceDate = SLA_REFERENCE_DATE): DashboardKpis {
  return transactions.reduce<DashboardKpis>(
    (summary, transaction) => ({
      totalFlagged: summary.totalFlagged + 1,
      totalExposure: summary.totalExposure + transaction.amount,
      highRiskCount: summary.highRiskCount + (isHighRisk(transaction) ? 1 : 0),
      slaBreachCount: summary.slaBreachCount + (isSlaBreached(transaction, referenceDate) ? 1 : 0)
    }),
    {
      totalFlagged: 0,
      totalExposure: 0,
      highRiskCount: 0,
      slaBreachCount: 0
    }
  );
}

export function filterTransactions(transactions: Transaction[], filters: TransactionFilters): Transaction[] {
  return transactions.filter((transaction) => {
    const matchesRisk = filters.riskLevel === "All" || transaction.riskLevel === filters.riskLevel;
    const matchesStatus = filters.reviewStatus === "All" || transaction.reviewStatus === filters.reviewStatus;
    const matchesCorridor = filters.corridor === "All" || transaction.corridor === filters.corridor;
    const matchesType = filters.transactionType === "All" || transaction.type === filters.transactionType;
    const matchesTeam = filters.assignedTeam === "All" || transaction.assignedTeam === filters.assignedTeam;

    return matchesRisk && matchesStatus && matchesCorridor && matchesType && matchesTeam;
  });
}

export function aggregateTrend(transactions: Transaction[], days = 7): TrendPoint[] {
  const sortedDates = Array.from(
    new Set(transactions.map((transaction) => transaction.flaggedAt.slice(0, 10)))
  ).sort();
  const selectedDates = sortedDates.slice(Math.max(sortedDates.length - days, 0));

  return selectedDates.map((date) => ({
    date,
    label: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", timeZone: "UTC" }).format(
      new Date(`${date}T00:00:00Z`)
    ),
    count: transactions.filter((transaction) => transaction.flaggedAt.startsWith(date)).length
  }));
}

export function uniqueOptions<T extends keyof Transaction>(transactions: Transaction[], field: T): string[] {
  return ["All", ...Array.from(new Set(transactions.map((transaction) => String(transaction[field])))).sort()];
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC"
  }).format(new Date(value));
}

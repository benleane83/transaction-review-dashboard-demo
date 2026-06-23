import { describe, expect, it } from "vitest";
import { transactions } from "../data/transactions";
import {
  aggregateTrend,
  calculateKpis,
  filterTransactions,
  formatCurrency,
  isSlaBreached
} from "./dashboard";

describe("dashboard utilities", () => {
  it("calculates executive KPI totals", () => {
    expect(calculateKpis(transactions)).toEqual({
      totalFlagged: 10,
      totalExposure: 8915500,
      highRiskCount: 6,
      slaBreachCount: 4
    });
  });

  it("excludes cleared transactions from SLA breach counts", () => {
    const clearedTransaction = transactions.find((transaction) => transaction.reviewStatus === "Cleared");

    expect(clearedTransaction).toBeDefined();
    expect(isSlaBreached(clearedTransaction!)).toBe(false);
  });

  it("filters by prioritized review dimensions", () => {
    const filtered = filterTransactions(transactions, {
      riskLevel: "High",
      reviewStatus: "Escalated",
      corridor: "All",
      transactionType: "All",
      assignedTeam: "Sanctions Review"
    });

    expect(filtered.map((transaction) => transaction.id)).toEqual(["TRX-10448"]);
  });

  it("aggregates recent flagged transaction trend points", () => {
    const trend = aggregateTrend(transactions, 3);

    expect(trend).toEqual([
      { date: "2026-06-20", label: "Jun 20", count: 1 },
      { date: "2026-06-21", label: "Jun 21", count: 2 },
      { date: "2026-06-22", label: "Jun 22", count: 1 }
    ]);
  });

  it("formats exposure values for KPI cards", () => {
    expect(formatCurrency(8915500)).toBe("$8,915,500");
  });
});

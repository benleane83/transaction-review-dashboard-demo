import { useEffect, useMemo, useState } from "react";
import { transactions } from "./data/transactions";
import type { RiskLevel, ReviewStatus, Transaction, TransactionFilters, TransactionType } from "./types";
import {
  aggregateTrend,
  calculateKpis,
  defaultFilters,
  filterTransactions,
  formatCurrency,
  formatDateTime,
  isSlaBreached,
  reviewStatuses,
  riskLevels,
  transactionTypes,
  uniqueOptions
} from "./utils/dashboard";

function updateFilter<K extends keyof TransactionFilters>(
  filters: TransactionFilters,
  key: K,
  value: TransactionFilters[K]
): TransactionFilters {
  return {
    ...filters,
    [key]: value
  };
}

export function App() {
  const [filters, setFilters] = useState<TransactionFilters>(defaultFilters);
  const filteredTransactions = useMemo(() => filterTransactions(transactions, filters), [filters]);
  const [selectedId, setSelectedId] = useState(transactions[0].id);
  const selectedTransaction = filteredTransactions.find((transaction) => transaction.id === selectedId) ?? filteredTransactions[0];
  const kpis = useMemo(() => calculateKpis(filteredTransactions), [filteredTransactions]);
  const trend = useMemo(() => aggregateTrend(transactions, 7), []);
  const corridors = useMemo(() => uniqueOptions(transactions, "corridor"), []);
  const teams = useMemo(() => uniqueOptions(transactions, "assignedTeam"), []);
  const maxTrendCount = Math.max(...trend.map((point) => point.count), 1);
  const activeFilterCount = Object.values(filters).filter((value) => value !== "All").length;
  const trendRange = `${trend[0]?.label ?? "n/a"}-${trend[trend.length - 1]?.label ?? "n/a"}`;
  const peakTrendPoint = trend.reduce((peak, point) => (point.count > peak.count ? point : peak), trend[0]);
  const trendSummary = `${transactions.length} flagged transactions over ${trend.length} days; peak day ${peakTrendPoint?.label ?? "n/a"} with ${peakTrendPoint?.count ?? 0}.`;
  const priorityTransaction =
    filteredTransactions.find((transaction) => isSlaBreached(transaction) && (transaction.riskLevel === "Critical" || transaction.riskLevel === "High")) ??
    filteredTransactions.find((transaction) => transaction.riskLevel === "Critical" || transaction.riskLevel === "High") ??
    filteredTransactions[0];

  useEffect(() => {
    if (filteredTransactions.length > 0 && !filteredTransactions.some((transaction) => transaction.id === selectedId)) {
      setSelectedId(filteredTransactions[0].id);
    }
  }, [filteredTransactions, selectedId]);

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-main">
          <div className="hero-title-row">
            <span className="header-label">Financial crime operations</span>
            <span className="data-freshness">Synthetic review queue</span>
          </div>
          <h1>Transaction Review Dashboard</h1>
          <p className="hero-copy">
            Human-owned triage for flagged transactions, configured risk indicators, SLA posture, and reviewer workflow.
          </p>
        </div>
        <div className="governance-card" aria-label="Governance posture">
          <span>Governance posture</span>
          <strong>No automated decisioning</strong>
          <p>Risk indicators explain why a transaction is flagged; reviewers own the outcome.</p>
        </div>
      </section>

      <section className="kpi-grid" aria-label="Dashboard KPIs">
        <KpiCard label="Flagged transactions" value={kpis.totalFlagged.toString()} detail={`${filteredTransactions.length} in current view`} />
        <KpiCard label="Total exposure" value={formatCurrency(kpis.totalExposure)} detail="Synthetic transaction value" />
        <KpiCard label="High-risk items" value={kpis.highRiskCount.toString()} detail="Critical and high risk" tone="warning" />
        <KpiCard label="SLA breaches" value={kpis.slaBreachCount.toString()} detail="Open items past due" tone="danger" />
      </section>

      {priorityTransaction && (
        <section className="priority-strip" aria-label="Suggested review focus">
          <div>
            <span>Open first</span>
            <strong>{priorityTransaction.id}</strong>
            <p>
              {priorityTransaction.riskLevel} risk · {isSlaBreached(priorityTransaction) ? "Past due" : "On track"} ·{" "}
              {priorityTransaction.recommendedAction}
            </p>
          </div>
          <button className="ghost-button" type="button" onClick={() => setSelectedId(priorityTransaction.id)}>
            View evidence
          </button>
        </section>
      )}

      <section className="dashboard-grid">
        <article className="panel trend-panel">
          <div className="panel-heading">
            <div>
              <h2>Flagged transaction volume</h2>
              <p className="panel-subtitle">{trendRange} window across synthetic alerts</p>
            </div>
            <span className="panel-note">7-day trend</span>
          </div>
          <p className="sr-only">{trendSummary}</p>
          <div className="trend-chart" aria-label={trendSummary}>
            {trend.map((point) => (
              <div className="trend-column" key={point.date}>
                <div className="trend-bar-wrap">
                  <span className="trend-value">{point.count}</span>
                  <div className="trend-bar" style={{ height: `${(point.count / maxTrendCount) * 100}%` }} />
                </div>
                <span className="trend-label">{point.label}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel filters-panel">
          <div className="panel-heading">
            <div>
              <h2>Prioritized filters</h2>
              <p className="panel-subtitle">
                {activeFilterCount === 0 ? "All flagged transactions visible" : `${activeFilterCount} filter${activeFilterCount === 1 ? "" : "s"} active`}
              </p>
            </div>
            <span className="panel-note">5 controls</span>
            <button className="ghost-button" type="button" onClick={() => setFilters(defaultFilters)}>
              Reset
            </button>
          </div>
          <div className="filters-grid">
            <FilterSelect
              label="Risk level"
              value={filters.riskLevel}
              options={riskLevels}
              onChange={(value) => setFilters(updateFilter(filters, "riskLevel", value as RiskLevel | "All"))}
            />
            <FilterSelect
              label="Review status"
              value={filters.reviewStatus}
              options={reviewStatuses}
              onChange={(value) => setFilters(updateFilter(filters, "reviewStatus", value as ReviewStatus | "All"))}
            />
            <FilterSelect
              label="Corridor"
              value={filters.corridor}
              options={corridors}
              onChange={(value) => setFilters(updateFilter(filters, "corridor", value))}
            />
            <FilterSelect
              label="Transaction type"
              value={filters.transactionType}
              options={transactionTypes}
              onChange={(value) => setFilters(updateFilter(filters, "transactionType", value as TransactionType | "All"))}
            />
            <FilterSelect
              label="Assigned team"
              value={filters.assignedTeam}
              options={teams}
              onChange={(value) => setFilters(updateFilter(filters, "assignedTeam", value))}
            />
          </div>
        </article>
      </section>

      <section className="workbench">
        <article className="panel table-panel">
          <div className="panel-heading">
            <div>
              <h2>Flagged transactions</h2>
              <p className="panel-subtitle">Sorted for review by the selected filter set</p>
            </div>
            <span className="panel-note">
              {filteredTransactions.length} results · {kpis.slaBreachCount} past due
            </span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Corridor</th>
                  <th>Risk</th>
                  <th>Status</th>
                  <th>SLA</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr
                    className={transaction.id === selectedTransaction?.id ? "selected-row" : ""}
                    key={transaction.id}
                  >
                    <td>
                      <button
                        className="row-button"
                        type="button"
                        aria-pressed={transaction.id === selectedTransaction?.id}
                        onClick={() => setSelectedId(transaction.id)}
                      >
                        {transaction.id}
                      </button>
                    </td>
                    <td>{formatCurrency(transaction.amount)}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.corridor}</td>
                    <td>
                      <RiskBadge riskLevel={transaction.riskLevel} />
                    </td>
                    <td>
                      <StatusBadge status={transaction.reviewStatus} />
                    </td>
                    <td>{isSlaBreached(transaction) ? <span className="sla-breach">Past due</span> : "On track"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <TransactionDetail transaction={selectedTransaction} />
      </section>
    </main>
  );
}

function KpiCard({
  label,
  value,
  detail,
  tone = "default"
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "warning" | "danger";
}) {
  return (
    <article className={`kpi-card ${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="filter-control">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TransactionDetail({ transaction }: { transaction?: Transaction }) {
  if (!transaction) {
    return (
      <aside className="panel detail-panel">
        <h2>No transaction selected</h2>
        <p>Adjust filters to select a flagged transaction for review.</p>
      </aside>
    );
  }

  return (
    <aside className="panel detail-panel">
      <div className="panel-heading">
        <div>
          <h2>{transaction.id}</h2>
          <p className="panel-subtitle">Human-owned evidence trail</p>
        </div>
        <RiskBadge riskLevel={transaction.riskLevel} />
      </div>

      <dl className="detail-list">
        <div>
          <dt>Amount</dt>
          <dd>{formatCurrency(transaction.amount)}</dd>
        </div>
        <div>
          <dt>Counterparty alias</dt>
          <dd>{transaction.counterpartyAlias}</dd>
        </div>
        <div>
          <dt>Flagged</dt>
          <dd>{formatDateTime(transaction.flaggedAt)}</dd>
        </div>
        <div>
          <dt>SLA due</dt>
          <dd>{formatDateTime(transaction.slaDueAt)}</dd>
        </div>
      </dl>

      <section>
        <h3>Why this was flagged</h3>
        <div className="reason-list">
          {transaction.riskReasons.map((reason) => (
            <article className="reason-card" key={reason.code}>
              <div>
                <strong>{reason.label}</strong>
                <span>{reason.code}</span>
              </div>
              <p>{reason.explanation}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="review-workflow">
        <h3>Human review workflow</h3>
        <p>
          Suggested reviewer next step: <strong>{transaction.recommendedAction}</strong>
        </p>
        <label>
          Reviewer notes
          <textarea value={transaction.reviewerNotes} readOnly rows={4} />
        </label>
        <p className="governance-copy">
          Reviewer owns the outcome. This prototype supports triage; it does not make final compliance determinations or
          automate case outcomes.
        </p>
      </section>
    </aside>
  );
}

function RiskBadge({ riskLevel }: { riskLevel: RiskLevel }) {
  return <span className={`badge risk-${riskLevel.toLowerCase()}`}>{riskLevel}</span>;
}

function StatusBadge({ status }: { status: ReviewStatus }) {
  return <span className="badge status">{status}</span>;
}

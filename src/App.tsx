import { useMemo, useState } from "react";
import { signalClusters, transactions, trend } from "./data";
import type { ReviewStatus, RiskLevel, Transaction } from "./types";

type FilterState = {
  risk: "All" | RiskLevel;
  status: "All" | ReviewStatus;
  corridor: "All" | string;
};

const riskOptions: FilterState["risk"][] = ["All", "Critical", "High", "Elevated", "Moderate"];
const statusOptions: FilterState["status"][] = ["All", "New", "In Review", "Escalated", "Blocked", "Cleared"];
const corridorOptions: FilterState["corridor"][] = [
  "All",
  ...Array.from(new Set(transactions.map((transaction) => transaction.corridor))),
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const fullCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function App() {
  const [filters, setFilters] = useState<FilterState>({
    risk: "All",
    status: "All",
    corridor: "All",
  });
  const [selectedId, setSelectedId] = useState(transactions[0].id);
  const [reviewNote, setReviewNote] = useState(
    "Request source-of-funds documentation and confirm beneficiary ownership before closure.",
  );

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const riskMatch = filters.risk === "All" || transaction.riskLevel === filters.risk;
      const statusMatch = filters.status === "All" || transaction.status === filters.status;
      const corridorMatch = filters.corridor === "All" || transaction.corridor === filters.corridor;
      return riskMatch && statusMatch && corridorMatch;
    });
  }, [filters]);

  const selectedTransaction =
    filteredTransactions.find((transaction) => transaction.id === selectedId) ??
    filteredTransactions[0] ??
    transactions[0];

  const metrics = useMemo(() => {
    const totalExposure = transactions.reduce((sum, transaction) => sum + transaction.exposureUsd, 0);
    const highRisk = transactions.filter(
      (transaction) => transaction.riskLevel === "Critical" || transaction.riskLevel === "High",
    ).length;
    const outsideSla = transactions.filter((transaction) => transaction.slaHoursRemaining < 0).length;

    return {
      flagged: 428,
      exposure: totalExposure,
      highRisk,
      outsideSla,
    };
  }, []);

  function updateFilter<Key extends keyof FilterState>(key: Key, value: FilterState[Key]) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  }

  return (
    <main className="dashboard-shell">
      <Hero metrics={metrics} />

      <section className="dashboard-grid" aria-label="Transaction review dashboard">
        <section className="left-column">
          <RiskRadar
            transactions={filteredTransactions}
            selectedTransaction={selectedTransaction}
            onSelect={setSelectedId}
          />
          <SignalClusters />
          <TransactionTable
            filters={filters}
            transactions={filteredTransactions}
            selectedId={selectedTransaction.id}
            onFilterChange={updateFilter}
            onSelect={setSelectedId}
          />
        </section>

        <aside className="right-column" aria-label="Review context">
          <MetricPanel metrics={metrics} />
          <TrendPanel />
          <DetailPanel
            transaction={selectedTransaction}
            reviewNote={reviewNote}
            onReviewNoteChange={setReviewNote}
          />
          <GovernancePanel />
        </aside>
      </section>
    </main>
  );
}

type Metrics = {
  flagged: number;
  exposure: number;
  highRisk: number;
  outsideSla: number;
};

function Hero({ metrics }: { metrics: Metrics }) {
  return (
    <header className="hero-panel">
      <div>
        <p className="eyebrow">Synthetic transaction review / Human-in-the-loop</p>
        <h1>Risk clusters are forming around new beneficiaries and corridor exceptions.</h1>
      </div>
      <div className="hero-status">
        <span className="status-pill status-amber">7-day anomaly spike</span>
        <span className="hero-time">Updated 16:42 GST</span>
        <span className="hero-summary">
          {metrics.highRisk} high-risk items need reviewer disposition. The dashboard flags configured indicators only.
        </span>
      </div>
    </header>
  );
}

function RiskRadar({
  transactions: filteredTransactions,
  selectedTransaction,
  onSelect,
}: {
  transactions: Transaction[];
  selectedTransaction: Transaction;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="panel radar-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Signal map</p>
          <h2>Live review radar</h2>
        </div>
        <span className="status-pill status-blue">{filteredTransactions.length} visible records</span>
      </div>

      <div className="radar" aria-label="Risk radar with selectable synthetic transactions">
        <div className="radar-axis radar-axis-horizontal" />
        <div className="radar-axis radar-axis-vertical" />
        {filteredTransactions.map((transaction) => (
          <button
            aria-label={`Select ${transaction.id}`}
            className={`radar-blip ${transaction.id === selectedTransaction.id ? "is-selected" : ""} ${severityClass(
              transaction.riskLevel,
            )}`}
            key={transaction.id}
            onClick={() => onSelect(transaction.id)}
            style={{
              left: `${transaction.coordinates.x}%`,
              top: `${transaction.coordinates.y}%`,
            }}
            type="button"
          >
            <span>{transaction.riskScore}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SignalClusters() {
  return (
    <section className="panel cluster-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Configured indicators</p>
          <h2>Signal clusters</h2>
        </div>
      </div>
      <div className="cluster-list">
        {signalClusters.map((cluster) => (
          <article className="cluster-row" key={cluster.name}>
            <div>
              <strong>{cluster.name}</strong>
              <p>{cluster.summary}</p>
            </div>
            <span className={`status-pill ${severityClass(cluster.severity)}`}>{cluster.count}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function TransactionTable({
  filters,
  transactions: filteredTransactions,
  selectedId,
  onFilterChange,
  onSelect,
}: {
  filters: FilterState;
  transactions: Transaction[];
  selectedId: string;
  onFilterChange: <Key extends keyof FilterState>(key: Key, value: FilterState[Key]) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="panel table-panel">
      <div className="panel-heading table-heading">
        <div>
          <p className="eyebrow">Decision trace</p>
          <h2>Transactions requiring review</h2>
        </div>
        <div className="filters" aria-label="Dashboard filters">
          <label>
            Risk
            <select value={filters.risk} onChange={(event) => onFilterChange("risk", event.target.value as FilterState["risk"])}>
              {riskOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Status
            <select
              value={filters.status}
              onChange={(event) => onFilterChange("status", event.target.value as FilterState["status"])}
            >
              {statusOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Corridor
            <select
              value={filters.corridor}
              onChange={(event) => onFilterChange("corridor", event.target.value as FilterState["corridor"])}
            >
              {corridorOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Corridor</th>
              <th>Exposure</th>
              <th>Indicators</th>
              <th>Next action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr
                className={transaction.id === selectedId ? "selected-row" : ""}
                key={transaction.id}
                onClick={() => onSelect(transaction.id)}
              >
                <td>
                  <button className="text-button" type="button">
                    {transaction.id}
                  </button>
                  <span className="subtle">{transaction.maskedAccount}</span>
                </td>
                <td>{transaction.corridor}</td>
                <td>{currency.format(transaction.exposureUsd)}</td>
                <td>{transaction.reasons.slice(0, 2).join("; ")}</td>
                <td>{transaction.recommendedAction}</td>
                <td>
                  <span className={`status-pill ${statusClass(transaction.status)}`}>{transaction.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MetricPanel({ metrics }: { metrics: Metrics }) {
  return (
    <section className="metric-grid" aria-label="Review metrics">
      <Metric label="Flagged" value={String(metrics.flagged)} helper="+34% week over week" />
      <Metric label="Exposure" value={currency.format(metrics.exposure)} helper="Synthetic USD value" />
      <Metric label="High risk" value={String(metrics.highRisk)} helper="Critical or high" />
      <Metric label="SLA breach" value={String(metrics.outsideSla)} helper="Blocked or overdue" critical />
    </section>
  );
}

function Metric({
  label,
  value,
  helper,
  critical = false,
}: {
  label: string;
  value: string;
  helper: string;
  critical?: boolean;
}) {
  return (
    <article className={`metric-card ${critical ? "metric-critical" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{helper}</small>
    </article>
  );
}

function TrendPanel() {
  const maxFlagged = Math.max(...trend.map((point) => point.flagged));

  return (
    <section className="panel trend-panel">
      <div className="panel-heading compact-heading">
        <div>
          <p className="eyebrow">Seven-day pulse</p>
          <h2>Flagged volume</h2>
        </div>
      </div>
      <div className="trend-bars">
        {trend.map((point) => (
          <div className="trend-day" key={point.day}>
            <span className="high-risk-bar" style={{ height: `${(point.highRisk / maxFlagged) * 100}%` }} />
            <span className="flagged-bar" style={{ height: `${(point.flagged / maxFlagged) * 100}%` }} />
            <small>{point.day}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function DetailPanel({
  transaction,
  reviewNote,
  onReviewNoteChange,
}: {
  transaction: Transaction;
  reviewNote: string;
  onReviewNoteChange: (note: string) => void;
}) {
  return (
    <section className="panel detail-panel">
      <div className="panel-heading compact-heading">
        <div>
          <p className="eyebrow">Selected transaction</p>
          <h2>{transaction.id}</h2>
        </div>
        <span className={`status-pill ${severityClass(transaction.riskLevel)}`}>{transaction.riskScore}</span>
      </div>

      <dl className="detail-grid">
        <div>
          <dt>Masked beneficiary</dt>
          <dd>{transaction.maskedBeneficiary}</dd>
        </div>
        <div>
          <dt>Exposure</dt>
          <dd>{fullCurrency.format(transaction.exposureUsd)}</dd>
        </div>
        <div>
          <dt>Assigned team</dt>
          <dd>{transaction.assignedTeam}</dd>
        </div>
        <div>
          <dt>SLA</dt>
          <dd>{transaction.slaHoursRemaining < 0 ? `${Math.abs(transaction.slaHoursRemaining)}h overdue` : `${transaction.slaHoursRemaining}h left`}</dd>
        </div>
      </dl>

      <div className="reason-stack">
        {transaction.reasons.map((reason) => (
          <div className="reason-card" key={reason}>
            {reason}
          </div>
        ))}
      </div>

      <div className="next-action">
        <span>Recommended next action</span>
        <strong>{transaction.recommendedAction}</strong>
      </div>

      <label className="note-field">
        Reviewer note prototype
        <textarea value={reviewNote} onChange={(event) => onReviewNoteChange(event.target.value)} />
      </label>
    </section>
  );
}

function GovernancePanel() {
  return (
    <section className="panel governance-panel">
      <p className="eyebrow">Governance boundary</p>
      <p>
        This prototype uses synthetic, masked records. It supports triage and human review only; production notes and
        workflow updates must route to case management and immutable audit logging.
      </p>
    </section>
  );
}

function severityClass(riskLevel: RiskLevel) {
  switch (riskLevel) {
    case "Critical":
      return "status-red";
    case "High":
      return "status-amber";
    case "Elevated":
      return "status-blue";
    case "Moderate":
      return "status-green";
  }
}

function statusClass(status: ReviewStatus) {
  switch (status) {
    case "Escalated":
    case "Blocked":
      return "status-red";
    case "In Review":
      return "status-amber";
    case "New":
      return "status-blue";
    case "Cleared":
      return "status-green";
  }
}

export default App;

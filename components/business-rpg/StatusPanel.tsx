type Status = {
  name: string;
  value: number;
};

type StatusPanelProps = {
  statuses: Status[];
};

export function StatusPanel({ statuses }: StatusPanelProps) {
  return (
    <section className="panel status-panel" aria-labelledby="status-heading">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">CORE ATTRIBUTES</p>
          <h2 id="status-heading">BASIC STATUS</h2>
        </div>
        <span className="panel-index">01</span>
      </div>

      <div className="status-list">
        {statuses.map((status) => (
          <div className="status-row" key={status.name}>
            <div className="status-meta">
              <span>{status.name}</span>
              <strong>{status.value}</strong>
            </div>
            <div
              className="progress-track status-track"
              role="progressbar"
              aria-label={`${status.name} ${status.value}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={status.value}
            >
              <span className="progress-fill status-fill" style={{ width: `${status.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

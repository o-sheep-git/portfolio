type JobPanelProps = {
  currentJob: {
    name: string;
    level: number;
  };
  targetJob: {
    name: string;
    unlockProgress: number;
  };
};

export function JobPanel({ currentJob, targetJob }: JobPanelProps) {
  return (
    <section className="panel job-panel" aria-labelledby="job-heading">
      <div className="panel-heading compact-heading">
        <div>
          <p className="eyebrow">CAREER PATH</p>
          <h2 id="job-heading">JOB PROGRESSION</h2>
        </div>
        <span className="panel-index">02</span>
      </div>

      <div className="job-path">
        <div className="job-card current-job">
          <p className="job-label">CURRENT JOB</p>
          <div className="job-value">
            <strong>{currentJob.name}</strong>
            <span>Lv.{currentJob.level}</span>
          </div>
          <p className="job-state">CLASS EQUIPPED</p>
        </div>

        <div className="job-connector" aria-hidden="true">
          <span />
        </div>

        <div className="job-card target-job">
          <p className="job-label">NEXT CLASS</p>
          <div className="job-value">
            <strong>{targetJob.name}</strong>
            <span>{targetJob.unlockProgress}%</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label={`${targetJob.name}の解放進捗`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={targetJob.unlockProgress}
          >
            <span
              className="progress-fill job-fill"
              style={{ width: `${targetJob.unlockProgress}%` }}
            />
          </div>
          <p className="job-state">UNLOCK PROGRESS</p>
        </div>
      </div>
    </section>
  );
}

type CharacterCardProps = {
  name: string;
  level: number;
  job: string;
  exp: {
    current: number;
    nextLevel: number;
  };
};

export function CharacterCard({ name, level, job, exp }: CharacterCardProps) {
  const expProgress = Math.round((exp.current / exp.nextLevel) * 100);

  return (
    <section className="panel hero-panel" aria-labelledby="character-heading">
      <div className="character-portrait" aria-hidden="true">
        <div className="portrait-orbit" />
        <span>OH</span>
      </div>

      <div className="character-copy">
        <p className="eyebrow">PLAYER PROFILE</p>
        <h1 id="character-heading">{name}</h1>
        <p className="job-name">{job}</p>

        <div className="level-row">
          <span>LEVEL</span>
          <strong>{level}</strong>
          <span className="rank-badge">ACTIVE</span>
        </div>

        <div className="progress-block">
          <div className="progress-label">
            <span>EXP</span>
            <span>
              {exp.current.toLocaleString()} / {exp.nextLevel.toLocaleString()}
            </span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="次のレベルまでの経験値"
            aria-valuemin={0}
            aria-valuemax={exp.nextLevel}
            aria-valuenow={exp.current}
          >
            <span className="progress-fill exp-fill" style={{ width: `${expProgress}%` }} />
          </div>
          <p className="progress-note">NEXT LEVEL: {exp.nextLevel - exp.current} EXP</p>
        </div>
      </div>
    </section>
  );
}

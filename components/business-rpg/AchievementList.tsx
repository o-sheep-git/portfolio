type Achievement = {
  title: string;
  code: string;
};

type AchievementListProps = {
  achievements: Achievement[];
};

export function AchievementList({ achievements }: AchievementListProps) {
  return (
    <section className="panel achievements-panel" aria-labelledby="achievements-heading">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">UNLOCKED RECORDS</p>
          <h2 id="achievements-heading">ACHIEVEMENTS</h2>
        </div>
        <span className="achievement-count">
          {achievements.length.toString().padStart(2, "0")} UNLOCKED
        </span>
      </div>

      <ul className="achievement-grid">
        {achievements.map((achievement, index) => (
          <li key={achievement.title}>
            <span className="achievement-medal" aria-hidden="true">
              {achievement.code}
            </span>
            <div>
              <span className="achievement-number">
                RECORD {(index + 1).toString().padStart(2, "0")}
              </span>
              <strong>{achievement.title}</strong>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

type QuestPanelProps = {
  quest: {
    title: string;
    category: string;
    reward: string;
  };
};

export function QuestPanel({ quest }: QuestPanelProps) {
  return (
    <section className="panel quest-panel" aria-labelledby="quest-heading">
      <div className="quest-marker" aria-hidden="true">
        !
      </div>
      <div className="quest-content">
        <p className="eyebrow" id="quest-heading">
          CURRENT QUEST
        </p>
        <p className="quest-category">{quest.category}</p>
        <h2>{quest.title}</h2>
        <div className="reward-line">
          <span>REWARD</span>
          <strong>{quest.reward}</strong>
        </div>
      </div>
      <span className="quest-status">IN PROGRESS</span>
    </section>
  );
}

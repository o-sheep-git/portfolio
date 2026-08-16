type SkillCategory = {
  name: string;
  code: string;
  skills: {
    name: string;
    level: number;
  }[];
};

type SkillListProps = {
  categories: SkillCategory[];
};

export function SkillList({ categories }: SkillListProps) {
  return (
    <section className="panel skills-panel" aria-labelledby="skills-heading">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">LEARNED ABILITIES</p>
          <h2 id="skills-heading">SKILLS</h2>
        </div>
        <span className="panel-index">03</span>
      </div>

      <div className="skill-grid">
        {categories.map((category) => (
          <article className="skill-category" key={category.name}>
            <div className="skill-category-heading">
              <span className="skill-code">{category.code}</span>
              <h3>{category.name}</h3>
              <span>{category.skills.length.toString().padStart(2, "0")}</span>
            </div>
            <ul>
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  <span>{skill.name}</span>
                  <span className="skill-level">Lv.{skill.level}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

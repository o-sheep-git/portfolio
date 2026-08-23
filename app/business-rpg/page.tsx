import type { Metadata } from "next";
import { CharacterCard } from "@/components/business-rpg/CharacterCard";
import { StatusPanel } from "@/components/business-rpg/StatusPanel";
import { JobPanel } from "@/components/business-rpg/JobPanel";
import { QuestPanel } from "@/components/business-rpg/QuestPanel";
import { SkillList } from "@/components/business-rpg/SkillList";
import { AchievementList } from "@/components/business-rpg/AchievementList";
import profile from "@/data/profile.json";
import skills from "@/data/skills.json";
import quests from "@/data/quests.json";
import achievements from "@/data/achievements.json";
import styles from "./business-rpg.module.css";

export const metadata: Metadata = {
  title: "Business RPG",
  description: "ビジネススキルと学習状況を冒険者ステータスのように確認できるダッシュボード。",
  robots: { index: false, follow: false },
};

export default function BusinessRpgPage() {
  return (
    <div className={styles.dashboardRoot} data-business-rpg>
      <div className={styles.ambientGlow} aria-hidden="true" />
      <main className={styles.dashboard}>
        <header className={styles.dashboardHeader}>
          <div>
            <p className="eyebrow">CAREER PROGRESSION SYSTEM</p>
            <p className={styles.brand}>BUSINESS RPG</p>
          </div>
          <div className={styles.systemStatus}>
            <span className={styles.statusDot} />
            PROFILE ONLINE
          </div>
        </header>

        <div className={styles.primaryGrid}>
          <CharacterCard
            name={profile.name}
            level={profile.level}
            job={profile.job}
            exp={profile.exp}
          />
          <StatusPanel statuses={profile.statuses} />
        </div>

        <div className={styles.secondaryGrid}>
          <JobPanel currentJob={profile.currentJob} targetJob={profile.targetJob} />
          <QuestPanel quest={quests.current} />
        </div>

        <SkillList categories={skills.categories} />
        <AchievementList achievements={achievements.achievements} />

        <footer className={styles.dashboardFooter}>
          <p>BUSINESS RPG / PLAYER DATA</p>
          <p>
            <span className={styles.statusDot} /> DATA LOADED FROM JSON
          </p>
        </footer>
      </main>
    </div>
  );
}

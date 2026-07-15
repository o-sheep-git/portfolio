import type { Metadata } from "next";
import { RanchGame } from "./ranch-game";

export const metadata: Metadata = {
  title: "もこもこ牧場",
  description:
    "春から秋までの12週間、ひつじを育てて羊毛を売る、小さな牧場経営ゲーム。収穫祭のスコアを目指して、何度でも遊べます。",
  robots: { index: false, follow: false },
};

export default function RanchPage() {
  return <RanchGame />;
}

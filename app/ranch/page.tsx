import type { Metadata } from "next";
import { RanchGame } from "./ranch-game";

export const metadata: Metadata = {
  title: "もこもこ牧場",
  description:
    "はるから あきまでの12週間、ひつじを育てて羊毛を売る、ちいさな牧場経営ゲーム。収穫祭のスコアをめざして、なんどでも遊べます。",
  robots: { index: false, follow: false },
};

export default function RanchPage() {
  return <RanchGame />;
}

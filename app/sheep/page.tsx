import type { Metadata } from "next";
import { SheepCounter } from "./sheep-counter";

export const metadata: Metadata = {
  title: "ひつじカウンター",
  description:
    "ボタンを押すと、ひつじが柵をこえていきます。眠れない夜に、ひつじを数えるためのページです。",
  robots: { index: false, follow: false },
};

export default function SheepPage() {
  return <SheepCounter />;
}

/* もこもこ牧場：ゲームのルールとバランスをまとめた純粋ロジック。
   数値の調整は、なるべくこのファイルの中だけで完結させる */

export const TOTAL_WEEKS = 12;
export const MAX_SHEEP = 20;
export const NAP_MONEY = 2;
export const FESTIVAL_BASE_PRICE = 6;
export const SHEEP_VALUE = 12;
export const PRICE_MIN = 2;
export const PRICE_MAX = 12;

export type FacilityId = "pasture" | "shear" | "fence" | "sign";
export type CardId = FacilityId | "lamb" | "hay" | "treat";
export type EventId = "none" | "wolf" | "rain" | "sunny" | "boom" | "chick";
export type SeasonKey = "spring" | "summer" | "autumn";

export type GameState = {
  week: number;
  money: number;
  grass: number;
  wool: number;
  sheep: number;
  pasture: number;
  shear: number;
  fence: number;
  sign: number;
  price: number;
  priceDelta: number;
  boom: boolean;
  treatReady: boolean;
  event: EventId;
  report: string[];
  offers: CardId[];
};

export function seasonKey(week: number): SeasonKey {
  if (week <= 4) return "spring";
  if (week <= 8) return "summer";
  return "autumn";
}

export function seasonLabel(week: number): string {
  return { spring: "春", summer: "夏", autumn: "秋" }[seasonKey(week)];
}

export function grassGrowth(s: GameState): number {
  return 3 + s.pasture * 2;
}

export function woolPerSheep(s: GameState): number {
  return s.shear;
}

/* 看板とブームをふくめた、今の1個あたりの売値 */
export function sellPrice(s: GameState): number {
  return (s.boom ? s.price * 2 : s.price) + s.sign;
}

/* 秋(9週目〜)はオオカミが手ごわくなる */
export function fenceNeeded(week: number): number {
  return week <= 8 ? 1 : 2;
}

export type Card = {
  name: string;
  detail: (s: GameState) => string;
  cost: (s: GameState) => number;
  maxed: (s: GameState) => boolean;
  /* 効果を適用して、翌週レポートの1行目になる文を返す */
  apply: (s: GameState) => string;
};

export const CARDS: Record<CardId, Card> = {
  lamb: {
    name: "子ひつじを迎える",
    detail: () => "ひつじが1匹増える",
    cost: (s) => 6 + s.sheep * 2,
    maxed: (s) => s.sheep >= MAX_SHEEP,
    apply: (s) => {
      s.sheep += 1;
      return "子ひつじが仲間入り！もこもこが増えた。";
    },
  },
  pasture: {
    name: "牧草地を耕す",
    detail: (s) => `毎週の草 +2（今は +${grassGrowth(s)}）`,
    cost: (s) => 6 + s.pasture * 4,
    maxed: (s) => s.pasture >= 6,
    apply: (s) => {
      s.pasture += 1;
      return "牧草地を耕して広げた。";
    },
  },
  shear: {
    name: "新しいハサミ",
    detail: (s) => `1匹あたりの羊毛 +1（今は${woolPerSheep(s)}個）`,
    cost: (s) => 12 + s.shear * 8,
    maxed: (s) => s.shear >= 4,
    apply: (s) => {
      s.shear += 1;
      return "新しいハサミで毛刈りが上手になった。";
    },
  },
  fence: {
    name: "柵の補強",
    detail: (s) => `オオカミよけ Lv${s.fence}→${s.fence + 1}（秋はLv2必要）`,
    cost: (s) => 5 + s.fence * 4,
    maxed: (s) => s.fence >= 3,
    apply: (s) => {
      s.fence += 1;
      return "柵をがっちり補強した。";
    },
  },
  sign: {
    name: "看板を立てる",
    detail: (s) => `売値がいつも +1G（今は +${s.sign}G）`,
    cost: (s) => 9 + s.sign * 6,
    maxed: (s) => s.sign >= 3,
    apply: (s) => {
      s.sign += 1;
      return "かわいい看板を立てた。評判が上がりそう。";
    },
  },
  hay: {
    name: "干し草を買う",
    detail: () => "すぐに草 +8",
    cost: () => 4,
    maxed: () => false,
    apply: (s) => {
      s.grass += 8;
      return "干し草をどっさり買ってきた。";
    },
  },
  treat: {
    name: "特製おやつ",
    detail: () => "次の毛刈りで羊毛2倍",
    cost: () => 5,
    maxed: () => false,
    apply: (s) => {
      s.treatReady = true;
      return "特製おやつを配った。ひつじたちは大喜び。";
    },
  },
};

export const CARD_ORDER: CardId[] = [
  "lamb",
  "pasture",
  "shear",
  "fence",
  "sign",
  "hay",
  "treat",
];

function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function drawOffers(s: GameState): CardId[] {
  const pool = CARD_ORDER.filter((id) => !CARDS[id].maxed(s));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}

function rollEvent(s: GameState) {
  const r = Math.random();
  let acc = 0;
  if (s.week >= 3 && r < (acc += 0.14)) {
    s.event = "wolf";
    if (s.fence >= fenceNeeded(s.week)) {
      s.report.push("夜中にオオカミが来たけれど、丈夫な柵が守ってくれた！");
    } else if (s.sheep <= 2) {
      s.report.push("遠くでオオカミの遠ぼえ…。ひつじたちは寄りそって無事だった。");
    } else {
      s.sheep -= 1;
      s.report.push("夜中にオオカミが来て、ひつじが1匹連れていかれた…。柵があれば防げる。");
    }
    return;
  }
  if (r < (acc += 0.12)) {
    s.event = "rain";
    s.report.push("今週は雨続き。草の育ちが悪い…。");
    return;
  }
  if (r < (acc += 0.12)) {
    s.event = "sunny";
    s.report.push("ぽかぽか日和！草がぐんぐん育つ。");
    return;
  }
  if (r < (acc += 0.1)) {
    s.event = "boom";
    s.boom = true;
    s.report.push("町は羊毛ブーム！今週だけ売値が2倍！");
    return;
  }
  if (r < (acc += 0.06)) {
    s.event = "chick";
    s.money += 6;
    s.report.push("迷子のひよこが遊びに来た！見に来たお客さんから6G。");
    return;
  }
}

/* 週のはじまりの生産：草が育つ → ひつじが食べる → 毛刈り */
function produce(s: GameState) {
  let growth = grassGrowth(s);
  if (s.event === "rain") growth = Math.floor(growth / 2);
  if (s.event === "sunny") growth *= 2;
  s.grass += growth;
  s.report.push(`草が${growth}束育った。`);

  const fed = Math.min(s.sheep, s.grass);
  s.grass -= fed;
  let gained = fed * woolPerSheep(s);
  if (s.treatReady && fed > 0) {
    gained *= 2;
    s.treatReady = false;
    s.report.push("おやつパワーで毛なみふわっふわ！羊毛2倍！");
  }
  s.wool += gained;
  if (fed > 0) {
    s.report.push(`ひつじ${fed}匹が草を食べて、羊毛が${gained}個とれた。`);
  }
  const hungry = s.sheep - fed;
  if (hungry > 0) {
    s.report.push(`草が足りなくて${hungry}匹はしょんぼり…（羊毛がとれない）`);
  }
}

function advanceWeek(prev: GameState, intro?: string): GameState {
  const s: GameState = {
    ...prev,
    report: intro ? [intro] : [],
    event: "none",
    boom: false,
  };
  s.week += 1;
  const before = s.price;
  s.price = Math.min(PRICE_MAX, Math.max(PRICE_MIN, s.price + randInt(-2, 2)));
  s.priceDelta = s.price - before;
  rollEvent(s);
  produce(s);
  s.offers = s.week < TOTAL_WEEKS ? drawOffers(s) : [];
  return s;
}

export function newGame(): GameState {
  const s: GameState = {
    week: 1,
    money: 12,
    grass: 6,
    wool: 0,
    sheep: 2,
    pasture: 1,
    shear: 1,
    fence: 0,
    sign: 0,
    price: 5,
    priceDelta: 0,
    boom: false,
    treatReady: false,
    event: "none",
    report: ["牧場に春が来た！今年もひつじとがんばろう。"],
    offers: [],
  };
  produce(s);
  s.offers = drawOffers(s);
  return s;
}

export function sellWool(prev: GameState): GameState {
  if (prev.wool <= 0) return prev;
  const s = { ...prev, report: [...prev.report] };
  const earned = s.wool * sellPrice(s);
  s.report.push(`羊毛${s.wool}個を${earned}Gで売った！`);
  s.money += earned;
  s.wool = 0;
  return s;
}

export function pickCard(prev: GameState, id: CardId): GameState {
  const card = CARDS[id];
  if (card.maxed(prev) || prev.money < card.cost(prev)) return prev;
  const s = { ...prev };
  s.money -= card.cost(prev);
  const intro = card.apply(s);
  return advanceWeek(s, intro);
}

export function nap(prev: GameState): GameState {
  const s = { ...prev, money: prev.money + NAP_MONEY };
  return advanceWeek(
    s,
    `のんびり昼寝。見学のお客さんが${NAP_MONEY}Gおいていった。`,
  );
}

export type FinalResult = {
  money: number;
  woolCount: number;
  festivalPrice: number;
  woolIncome: number;
  sheepCount: number;
  sheepValue: number;
  score: number;
  title: string;
  comment: string;
};

export function finalize(s: GameState): FinalResult {
  const festivalPrice = FESTIVAL_BASE_PRICE + s.sign;
  const woolIncome = s.wool * festivalPrice;
  const sheepValue = s.sheep * SHEEP_VALUE;
  const score = s.money + woolIncome + sheepValue;
  const [title, comment] =
    score < 250
      ? ["見習い牧場主", "ひつじたちと仲良くなれた。来年もがんばろう！"]
      : score < 400
        ? ["一人前の牧場主", "村の人たちも認める腕前。"]
        : score < 550
          ? ["腕きき牧場主", "となり町までうわさが届いている。"]
          : score < 700
            ? ["牧場の名人", "収穫祭は歴史に残る大にぎわい！"]
            : ["伝説の牧場主", "夜空のひつじたちも見下ろして歌っている。"];
  return {
    money: s.money,
    woolCount: s.wool,
    festivalPrice,
    woolIncome,
    sheepCount: s.sheep,
    sheepValue,
    score,
    title,
    comment,
  };
}

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
  return { spring: "はる", summer: "なつ", autumn: "あき" }[seasonKey(week)];
}

export function grassGrowth(s: GameState): number {
  return 3 + s.pasture * 2;
}

export function woolPerSheep(s: GameState): number {
  return s.shear;
}

/* かんばんとブームをふくめた、いまの1こあたりの売値 */
export function sellPrice(s: GameState): number {
  return (s.boom ? s.price * 2 : s.price) + s.sign;
}

/* あき(9週め〜)はオオカミが手ごわくなる */
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
    name: "こひつじを むかえる",
    detail: () => "ひつじが 1ぴき ふえる",
    cost: (s) => 6 + s.sheep * 2,
    maxed: (s) => s.sheep >= MAX_SHEEP,
    apply: (s) => {
      s.sheep += 1;
      return "こひつじが なかまいり！ もこもこが ふえた。";
    },
  },
  pasture: {
    name: "ぼくそうちを たがやす",
    detail: (s) => `まいしゅうの くさ +2（いまは +${grassGrowth(s)}）`,
    cost: (s) => 6 + s.pasture * 4,
    maxed: (s) => s.pasture >= 6,
    apply: (s) => {
      s.pasture += 1;
      return "ぼくそうちを たがやして ひろげた。";
    },
  },
  shear: {
    name: "あたらしい ハサミ",
    detail: (s) => `1ぴきの ようもう +1（いまは ${woolPerSheep(s)}こ）`,
    cost: (s) => 12 + s.shear * 8,
    maxed: (s) => s.shear >= 4,
    apply: (s) => {
      s.shear += 1;
      return "あたらしい ハサミで けがりが じょうずに なった。";
    },
  },
  fence: {
    name: "さくの ほきょう",
    detail: (s) => `オオカミよけ Lv${s.fence}→${s.fence + 1}（あきは Lv2 ひつよう）`,
    cost: (s) => 5 + s.fence * 4,
    maxed: (s) => s.fence >= 3,
    apply: (s) => {
      s.fence += 1;
      return "さくを がっちり ほきょうした。";
    },
  },
  sign: {
    name: "かんばんを たてる",
    detail: (s) => `うりねが いつも +1G（いまは +${s.sign}G）`,
    cost: (s) => 9 + s.sign * 6,
    maxed: (s) => s.sign >= 3,
    apply: (s) => {
      s.sign += 1;
      return "かわいい かんばんを たてた。ひょうばんが あがりそう。";
    },
  },
  hay: {
    name: "ほしくさを かう",
    detail: () => "すぐに くさ +8",
    cost: () => 4,
    maxed: () => false,
    apply: (s) => {
      s.grass += 8;
      return "ほしくさを どっさり かってきた。";
    },
  },
  treat: {
    name: "とくせい おやつ",
    detail: () => "つぎの けがりで ようもう 2ばい",
    cost: () => 5,
    maxed: () => false,
    apply: (s) => {
      s.treatReady = true;
      return "とくせいおやつを くばった。ひつじたちは おおよろこび。";
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
      s.report.push("よなかに オオカミが きたけれど、じょうぶな さくが まもってくれた！");
    } else if (s.sheep <= 2) {
      s.report.push("とおくで オオカミの とおぼえ…。ひつじたちは よりそって ぶじだった。");
    } else {
      s.sheep -= 1;
      s.report.push("よなかに オオカミが きて、ひつじが 1ぴき つれていかれた…。さくが あれば ふせげる。");
    }
    return;
  }
  if (r < (acc += 0.12)) {
    s.event = "rain";
    s.report.push("こんしゅうは あめつづき。くさの そだちが わるい…。");
    return;
  }
  if (r < (acc += 0.12)) {
    s.event = "sunny";
    s.report.push("ぽかぽかの ひより！ くさが ぐんぐん そだつ。");
    return;
  }
  if (r < (acc += 0.1)) {
    s.event = "boom";
    s.boom = true;
    s.report.push("まちは ようもうブーム！ こんしゅうだけ うりねが 2ばい！");
    return;
  }
  if (r < (acc += 0.06)) {
    s.event = "chick";
    s.money += 6;
    s.report.push("まいごの ひよこが あそびに きた！ みにきた おきゃくさんから 6G。");
    return;
  }
}

/* 週のはじまりの生産：くさが育つ → ひつじが食べる → けがり */
function produce(s: GameState) {
  let growth = grassGrowth(s);
  if (s.event === "rain") growth = Math.floor(growth / 2);
  if (s.event === "sunny") growth *= 2;
  s.grass += growth;
  s.report.push(`くさが ${growth}たば そだった。`);

  const fed = Math.min(s.sheep, s.grass);
  s.grass -= fed;
  let gained = fed * woolPerSheep(s);
  if (s.treatReady && fed > 0) {
    gained *= 2;
    s.treatReady = false;
    s.report.push("おやつパワーで けなみ ふわっふわ！ ようもう 2ばい！");
  }
  s.wool += gained;
  if (fed > 0) {
    s.report.push(`ひつじ ${fed}ひきが くさを たべて、ようもうが ${gained}こ とれた。`);
  }
  const hungry = s.sheep - fed;
  if (hungry > 0) {
    s.report.push(`くさが たりなくて ${hungry}ひきは しょんぼり…（ようもうが とれない）`);
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
    report: ["ぼくじょうに はるが きた！ ことしも ひつじと がんばろう。"],
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
  s.report.push(`ようもう ${s.wool}こを ${earned}Gで うった！`);
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
    `のんびり ひるね。けんがくの おきゃくさんが ${NAP_MONEY}G おいていった。`,
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
      ? ["みならい ぼくじょうぬし", "ひつじたちと なかよくなれた。らいねんも がんばろう！"]
      : score < 400
        ? ["いちにんまえの ぼくじょうぬし", "むらの ひとたちも みとめる うでまえ。"]
        : score < 550
          ? ["うできき ぼくじょうぬし", "となりまちまで うわさが とどいている。"]
          : score < 700
            ? ["ぼくじょうの めいじん", "しゅうかくさいは れきしに のこる おおにぎわい！"]
            : ["でんせつの ぼくじょうぬし", "よぞらの ひつじたちも みおろして うたっている。"];
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

"use client";

import { useCallback, useState } from "react";
import {
  CARDS,
  FESTIVAL_BASE_PRICE,
  NAP_MONEY,
  SHEEP_VALUE,
  TOTAL_WEEKS,
  finalize,
  nap,
  newGame,
  pickCard,
  seasonKey,
  seasonLabel,
  sellPrice,
  sellWool,
  type CardId,
  type GameState,
  type SeasonKey,
} from "./logic";
import {
  ChickSvg,
  CloudSvg,
  CoinIcon,
  FenceIcon,
  FenceSvg,
  GrassIcon,
  HayIcon,
  HutSvg,
  ScissorsIcon,
  SheepFaceIcon,
  SheepSvg,
  SignIcon,
  SunSvg,
  TreatIcon,
  YarnIcon,
} from "./art";

/* 牧場にひつじを置く場所（さいだい20ぴきぶん） */
const SHEEP_SLOTS = [
  { left: 38, bottom: 26, scale: 1, flip: false },
  { left: 62, bottom: 32, scale: 0.9, flip: true },
  { left: 20, bottom: 34, scale: 0.85, flip: false },
  { left: 76, bottom: 22, scale: 1, flip: false },
  { left: 8, bottom: 24, scale: 0.95, flip: true },
  { left: 48, bottom: 40, scale: 0.75, flip: true },
  { left: 30, bottom: 18, scale: 1.05, flip: true },
  { left: 66, bottom: 44, scale: 0.7, flip: false },
  { left: 14, bottom: 44, scale: 0.7, flip: false },
  { left: 55, bottom: 16, scale: 1.05, flip: false },
  { left: 84, bottom: 36, scale: 0.8, flip: true },
  { left: 4, bottom: 38, scale: 0.75, flip: false },
  { left: 42, bottom: 12, scale: 1.1, flip: true },
  { left: 25, bottom: 48, scale: 0.65, flip: true },
  { left: 70, bottom: 12, scale: 1.1, flip: true },
  { left: 36, bottom: 52, scale: 0.6, flip: false },
  { left: 88, bottom: 20, scale: 0.9, flip: false },
  { left: 12, bottom: 12, scale: 1.1, flip: false },
  { left: 58, bottom: 52, scale: 0.6, flip: true },
  { left: 80, bottom: 50, scale: 0.62, flip: false },
];

const CONFETTI = [
  { left: "6%", color: "#e8a1a1", delay: "0s" },
  { left: "16%", color: "#f0c454", delay: "0.9s" },
  { left: "26%", color: "#9cc57a", delay: "0.3s" },
  { left: "36%", color: "#a3c8e8", delay: "1.5s" },
  { left: "46%", color: "#d98cab", delay: "0.6s" },
  { left: "56%", color: "#f0c454", delay: "1.8s" },
  { left: "66%", color: "#9cc57a", delay: "0.15s" },
  { left: "76%", color: "#e8a1a1", delay: "1.2s" },
  { left: "86%", color: "#a3c8e8", delay: "0.45s" },
  { left: "94%", color: "#d98cab", delay: "2.1s" },
];

function cardIcon(id: CardId) {
  switch (id) {
    case "lamb":
      return <SheepSvg width={30} />;
    case "pasture":
      return <GrassIcon size={22} />;
    case "shear":
      return <ScissorsIcon />;
    case "fence":
      return <FenceIcon />;
    case "sign":
      return <SignIcon />;
    case "hay":
      return <HayIcon />;
    case "treat":
      return <TreatIcon />;
  }
}

function Scene({
  season,
  sheep,
  chick,
}: {
  season: SeasonKey;
  sheep: number;
  chick?: boolean;
}) {
  return (
    <div className="mk-scene" data-season={season}>
      <div className="mk-sun">
        <SunSvg />
      </div>
      <div className="mk-cloud mk-cloud-a">
        <CloudSvg />
      </div>
      <div className="mk-cloud mk-cloud-b">
        <CloudSvg width={84} />
      </div>
      <div className="mk-hill mk-hill-back" />
      <div className="mk-hill mk-hill-front" />
      <div className="mk-hut">
        <HutSvg />
      </div>
      {SHEEP_SLOTS.slice(0, sheep).map((p, i) => (
        <div
          key={i}
          className="mk-sheep"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            zIndex: 10 + (60 - p.bottom),
          }}
        >
          <div className="mk-sheep-bob" style={{ animationDelay: `${(i % 7) * 0.4}s` }}>
            <div
              style={{
                transform: `scale(${p.scale})${p.flip ? " scaleX(-1)" : ""}`,
                transformOrigin: "bottom center",
              }}
            >
              <SheepSvg />
            </div>
          </div>
        </div>
      ))}
      {chick && (
        <div className="mk-sheep" style={{ left: "90%", bottom: "28%", zIndex: 42 }}>
          <div className="mk-sheep-bob">
            <ChickSvg />
          </div>
        </div>
      )}
      <div className="mk-fence-row" aria-hidden="true">
        <FenceSvg />
        <FenceSvg />
        <FenceSvg />
        <FenceSvg />
        <FenceSvg />
      </div>
    </div>
  );
}

export function RanchGame() {
  const [screen, setScreen] = useState<"start" | "play" | "result">("start");
  const [game, setGame] = useState<GameState | null>(null);
  const [busy, setBusy] = useState(false);

  const start = useCallback(() => {
    setGame(newGame());
    setScreen("play");
  }, []);

  const quit = useCallback(() => {
    setGame(null);
    setScreen("start");
  }, []);

  const advanceWith = useCallback((update: (s: GameState) => GameState) => {
    setBusy(true);
    setGame((g) => (g ? update(g) : g));
    setTimeout(() => setBusy(false), 450);
  }, []);

  const handleSell = useCallback(() => {
    setGame((g) => (g ? sellWool(g) : g));
  }, []);

  const handlePick = useCallback(
    (id: CardId) => advanceWith((g) => pickCard(g, id)),
    [advanceWith],
  );

  const handleNap = useCallback(() => advanceWith(nap), [advanceWith]);

  return (
    <div className="mk-stage">
      <div className="mk-screen">
        {screen === "start" && (
          <div className="mk-column">
            <Scene season="spring" sheep={2} />
            <div className="mk-start-body">
              <h1 className="mk-title">もこもこ牧場</h1>
              <p className="mk-tagline">
                はるから あきまで、12しゅうかんの
                <br />
                ちいさな ぼくじょうけいえい
              </p>
              <ul className="mk-howto">
                <li>まいしゅう 3まいの カードから 1まい えらんで、ぼくじょうを そだてよう</li>
                <li>ようもうの うりねは まいしゅう かわる。うりどきを みきわめて</li>
                <li>12しゅうめの しゅうかくさいで、そうしさんを はっぴょう！</li>
              </ul>
              <button type="button" className="mk-primary" onClick={start}>
                ぼくじょうを はじめる
              </button>
              <p className="mk-note">セーブは ありません。1かい 5〜10ぷんで あそべます。</p>
            </div>
          </div>
        )}

        {screen === "play" && game && (
          <div className="mk-column">
            <Scene
              season={seasonKey(game.week)}
              sheep={game.sheep}
              chick={game.event === "chick"}
            />

            <div className="mk-hud">
              <div className="mk-week-row">
                <span className="mk-season-chip" data-season={seasonKey(game.week)}>
                  {seasonLabel(game.week)}
                </span>
                <span className="mk-week-label">
                  {game.week}しゅうめ
                  {game.week === TOTAL_WEEKS
                    ? "・さいごの しゅう！"
                    : `・のこり ${TOTAL_WEEKS - game.week}しゅう`}
                </span>
                <button type="button" className="mk-quit" onClick={quit}>
                  さいしょから
                </button>
              </div>
              <div className="mk-chip-row">
                <span className="mk-chip" aria-label={`おかね ${game.money}ゴールド`}>
                  <CoinIcon />
                  {game.money}
                </span>
                <span className="mk-chip" aria-label={`くさ ${game.grass}たば`}>
                  <GrassIcon />
                  {game.grass}
                </span>
                <span className="mk-chip" aria-label={`ようもう ${game.wool}こ`}>
                  <YarnIcon />
                  {game.wool}
                </span>
                <span className="mk-chip" aria-label={`ひつじ ${game.sheep}ひき`}>
                  <SheepFaceIcon />
                  {game.sheep}
                </span>
              </div>
              <div className="mk-market-row">
                <span className="mk-price">
                  ようもうの うりね <b>{sellPrice(game)}G</b>
                  {game.priceDelta > 0 && (
                    <span className="mk-price-up"> ▲{game.priceDelta}</span>
                  )}
                  {game.priceDelta < 0 && (
                    <span className="mk-price-down"> ▼{-game.priceDelta}</span>
                  )}
                  {game.priceDelta === 0 && <span className="mk-price-flat"> →</span>}
                  {game.boom && <span className="mk-boom">ブーム!</span>}
                </span>
                <button
                  type="button"
                  className="mk-sell"
                  onClick={handleSell}
                  disabled={game.wool === 0 || busy}
                >
                  ぜんぶ うる
                  {game.wool > 0 && ` +${game.wool * sellPrice(game)}G`}
                </button>
              </div>
            </div>

            <div className="mk-report" key={game.week} aria-live="polite">
              {game.report.map((line, i) => (
                <p key={i}>・{line}</p>
              ))}
            </div>

            {game.week < TOTAL_WEEKS ? (
              <div className="mk-actions">
                <p className="mk-actions-title">— こんしゅうの おこないを 1つ えらぶ —</p>
                {game.offers.map((id) => {
                  const card = CARDS[id];
                  const cost = card.cost(game);
                  return (
                    <button
                      type="button"
                      key={id}
                      className="mk-card"
                      onClick={() => handlePick(id)}
                      disabled={busy || game.money < cost}
                      aria-label={`${card.name}（${cost}G）: ${card.detail(game)}`}
                    >
                      <span className="mk-card-icon">{cardIcon(id)}</span>
                      <span className="mk-card-main">
                        <span className="mk-card-name">{card.name}</span>
                        <span className="mk-card-detail">{card.detail(game)}</span>
                      </span>
                      <span className="mk-card-cost">{cost}G</span>
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="mk-nap"
                  onClick={handleNap}
                  disabled={busy}
                >
                  なにもせず ひるねする（+{NAP_MONEY}G で つぎの しゅうへ）
                </button>
              </div>
            ) : (
              <div className="mk-actions">
                <p className="mk-festival-note">
                  いよいよ しゅうかくさい！ うりのこした ようもうは、1こ{" "}
                  {FESTIVAL_BASE_PRICE + game.sign}Gで かいとってもらえる。
                  いま うると 1こ {sellPrice(game)}G。どっちが おとく？
                </p>
                <button
                  type="button"
                  className="mk-primary"
                  onClick={() => setScreen("result")}
                >
                  しゅうかくさいへ！
                </button>
              </div>
            )}
          </div>
        )}

        {screen === "result" && game && (
          <div className="mk-column">
            <Scene season="autumn" sheep={game.sheep} />
            <div className="mk-result-body">
              {(() => {
                const r = finalize(game);
                return (
                  <>
                    <h2 className="mk-result-h">＊ しゅうかくさい ＊</h2>
                    <div className="mk-tally">
                      <div className="mk-tally-row">
                        <span>てもとの おかね</span>
                        <span>{r.money}G</span>
                      </div>
                      <div className="mk-tally-row">
                        <span>
                          ようもう {r.woolCount}こ × {r.festivalPrice}G
                        </span>
                        <span>{r.woolIncome}G</span>
                      </div>
                      <div className="mk-tally-row">
                        <span>
                          ひつじ {r.sheepCount}ひき × {SHEEP_VALUE}G
                        </span>
                        <span>{r.sheepValue}G</span>
                      </div>
                      <div className="mk-tally-row mk-tally-total">
                        <span>ぼくじょうの そうしさん</span>
                        <span>{r.score}G</span>
                      </div>
                    </div>
                    <div className="mk-award">
                      <p className="mk-award-label">あなたに おくられた しょうごう</p>
                      <p className="mk-award-title">{r.title}</p>
                    </div>
                    <p className="mk-comment">{r.comment}</p>
                    <button type="button" className="mk-primary" onClick={start}>
                      もういちど はじめから
                    </button>
                    <button type="button" className="mk-quit mk-quit-center" onClick={quit}>
                      タイトルに もどる
                    </button>
                  </>
                );
              })()}
            </div>
            <div className="mk-confetti" aria-hidden="true">
              {CONFETTI.map((c, i) => (
                <span
                  key={i}
                  style={{ left: c.left, background: c.color, animationDelay: c.delay }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .mk-stage {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          justify-content: center;
          background: #d9e2c8;
        }
        .mk-screen {
          position: relative;
          height: 100%;
          width: 100%;
          max-width: 430px;
          background: #fbf6ea;
          color: #4a3f33;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(90, 80, 60, 0.25);
          user-select: none;
        }
        .mk-column {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* ---- 牧場シーン ---- */
        .mk-scene {
          position: relative;
          flex: 0 0 27%;
          min-height: 150px;
          overflow: hidden;
          --sky-top: #bfe2f2;
          --sky-bottom: #edf5da;
          --hill-back: #a8d191;
          --hill-front: #8fc076;
          background: linear-gradient(var(--sky-top), var(--sky-bottom) 78%);
        }
        .mk-scene[data-season="summer"] {
          --sky-top: #a3d4ef;
          --sky-bottom: #f1f6d0;
          --hill-back: #96c77c;
          --hill-front: #7cb25e;
        }
        .mk-scene[data-season="autumn"] {
          --sky-top: #f3d7a3;
          --sky-bottom: #f9eed6;
          --hill-back: #d3b672;
          --hill-front: #bfa057;
        }
        .mk-sun {
          position: absolute;
          top: 7%;
          right: 6%;
          line-height: 0;
          filter: drop-shadow(0 0 12px rgba(246, 212, 124, 0.55));
        }
        .mk-cloud {
          position: absolute;
          left: -140px;
          line-height: 0;
          animation: mk-drift linear infinite;
        }
        .mk-cloud-a {
          top: 9%;
          animation-duration: 80s;
        }
        .mk-cloud-b {
          top: 30%;
          animation-duration: 115s;
          animation-delay: -45s;
        }
        @keyframes mk-drift {
          to {
            transform: translateX(620px);
          }
        }
        .mk-hill {
          position: absolute;
          left: -20%;
          width: 140%;
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }
        .mk-hill-back {
          bottom: 6%;
          height: 52%;
          background: var(--hill-back);
        }
        .mk-hill-front {
          bottom: -14%;
          height: 52%;
          background: var(--hill-front);
        }
        .mk-hut {
          position: absolute;
          left: 3%;
          bottom: 32%;
          z-index: 9;
          line-height: 0;
        }
        .mk-sheep {
          position: absolute;
          line-height: 0;
          animation: mk-pop 0.45s ease-out backwards;
        }
        .mk-sheep-bob {
          animation: mk-bob 2.8s ease-in-out infinite;
        }
        @keyframes mk-pop {
          from {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.12);
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes mk-bob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        .mk-fence-row {
          position: absolute;
          bottom: -8px;
          left: -6px;
          right: -6px;
          display: flex;
          justify-content: space-between;
          line-height: 0;
          z-index: 45;
        }

        /* ---- HUD ---- */
        .mk-hud {
          padding: 10px 12px 9px;
          border-bottom: 1px solid #eee3cd;
        }
        .mk-week-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mk-season-chip {
          font-size: 0.72rem;
          font-weight: 700;
          color: #fff;
          padding: 3px 10px;
          border-radius: 999px;
          background: #8fb56f;
          letter-spacing: 0.15em;
        }
        .mk-season-chip[data-season="summer"] {
          background: #64aed3;
        }
        .mk-season-chip[data-season="autumn"] {
          background: #d0954e;
        }
        .mk-week-label {
          flex: 1;
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          opacity: 0.85;
        }
        .mk-quit {
          font-size: 0.7rem;
          color: #a5977f;
          text-decoration: underline;
          padding: 4px;
          background: none;
          touch-action: manipulation;
        }
        .mk-quit-center {
          align-self: center;
        }
        .mk-chip-row {
          display: flex;
          gap: 6px;
          margin-top: 8px;
        }
        .mk-chip {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          background: #fff;
          border: 1px solid #eadfc8;
          border-radius: 10px;
          padding: 6px 4px;
          font-size: 0.9rem;
          font-weight: 700;
          line-height: 1;
          box-shadow: 0 1px 3px rgba(120, 100, 70, 0.08);
        }
        .mk-chip svg {
          flex-shrink: 0;
        }
        .mk-market-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }
        .mk-price {
          flex: 1;
          font-size: 0.76rem;
          opacity: 0.95;
        }
        .mk-price b {
          font-size: 1.05rem;
          margin-left: 2px;
        }
        .mk-price-up {
          color: #c25e3a;
          font-weight: 700;
        }
        .mk-price-down {
          color: #5c81c2;
          font-weight: 700;
        }
        .mk-price-flat {
          opacity: 0.5;
        }
        .mk-boom {
          display: inline-block;
          background: #e2574c;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 6px;
          margin-left: 6px;
          animation: mk-bob 1.2s ease-in-out infinite;
        }
        .mk-sell {
          background: #f0c454;
          color: #5a4516;
          font-weight: 700;
          font-size: 0.82rem;
          padding: 10px 13px;
          border-radius: 12px;
          box-shadow: 0 3px 0 #d0a53a;
          touch-action: manipulation;
          white-space: nowrap;
        }
        .mk-sell:active:not(:disabled) {
          transform: translateY(2px);
          box-shadow: 0 1px 0 #d0a53a;
        }
        .mk-sell:disabled {
          opacity: 0.4;
          box-shadow: none;
        }

        /* ---- こんしゅうの できごと ---- */
        .mk-report {
          margin: 8px 12px 0;
          background: #f5eddc;
          border-radius: 12px;
          padding: 9px 12px;
          font-size: 0.78rem;
          line-height: 1.6;
          min-height: 62px;
          max-height: 122px;
          overflow-y: auto;
          animation: mk-slide 0.35s ease-out;
        }
        @keyframes mk-slide {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .mk-report p {
          padding-left: 1em;
          text-indent: -1em;
        }
        .mk-report p + p {
          margin-top: 2px;
        }

        /* ---- アクション ---- */
        .mk-actions {
          flex: 1;
          overflow-y: auto;
          padding: 10px 12px calc(12px + env(safe-area-inset-bottom));
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mk-actions-title {
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          opacity: 0.55;
          text-align: center;
        }
        .mk-card {
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
          background: #fff;
          border: 1.5px solid #e7dcc3;
          border-radius: 14px;
          padding: 10px 12px;
          box-shadow: 0 2px 5px rgba(120, 100, 70, 0.1);
          touch-action: manipulation;
          transition: transform 0.1s ease;
        }
        .mk-card:active:not(:disabled) {
          transform: scale(0.97);
        }
        .mk-card:disabled {
          opacity: 0.45;
        }
        .mk-card-icon {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          background: #f6efe0;
          border-radius: 10px;
          flex-shrink: 0;
        }
        .mk-card-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mk-card-name {
          font-size: 0.9rem;
          font-weight: 700;
        }
        .mk-card-detail {
          font-size: 0.72rem;
          opacity: 0.75;
        }
        .mk-card-cost {
          font-size: 0.9rem;
          font-weight: 700;
          color: #8a6420;
          background: #f6edd3;
          border-radius: 999px;
          padding: 5px 10px;
          flex-shrink: 0;
        }
        .mk-nap {
          margin-top: 2px;
          border: 1.5px dashed #cfc0a4;
          border-radius: 12px;
          padding: 10px;
          font-size: 0.78rem;
          color: #877860;
          background: transparent;
          touch-action: manipulation;
        }
        .mk-nap:disabled {
          opacity: 0.45;
        }
        .mk-festival-note {
          font-size: 0.8rem;
          line-height: 1.7;
          background: #fff;
          border: 1.5px solid #e7dcc3;
          border-radius: 14px;
          padding: 12px 14px;
        }
        .mk-primary {
          background: #5c8d4e;
          color: #fff;
          font-size: 1.02rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 14px;
          border-radius: 999px;
          box-shadow: 0 4px 0 #46703b;
          touch-action: manipulation;
        }
        .mk-primary:active {
          transform: translateY(2px);
          box-shadow: 0 2px 0 #46703b;
        }

        /* ---- スタート画面 ---- */
        .mk-start-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 20px 22px calc(22px + env(safe-area-inset-bottom));
          overflow-y: auto;
        }
        .mk-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          letter-spacing: 0.14em;
        }
        .mk-tagline {
          text-align: center;
          font-size: 0.8rem;
          line-height: 1.7;
          opacity: 0.8;
        }
        .mk-howto {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: #f5eddc;
          padding: 14px 16px;
          border-radius: 14px;
          font-size: 0.78rem;
          line-height: 1.6;
          list-style: none;
        }
        .mk-howto li {
          padding-left: 1em;
          text-indent: -1em;
        }
        .mk-howto li::before {
          content: "・";
        }
        .mk-note {
          text-align: center;
          font-size: 0.7rem;
          opacity: 0.55;
        }

        /* ---- しゅうかくさい ---- */
        .mk-result-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px 22px calc(22px + env(safe-area-inset-bottom));
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mk-result-h {
          text-align: center;
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: 0.24em;
        }
        .mk-tally {
          background: #fff;
          border: 1.5px solid #e7dcc3;
          border-radius: 14px;
          padding: 10px 14px;
          font-size: 0.84rem;
        }
        .mk-tally-row {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
        }
        .mk-tally-total {
          border-top: 2px solid #e7dcc3;
          margin-top: 4px;
          padding-top: 9px;
          font-weight: 700;
          font-size: 1rem;
        }
        .mk-award {
          text-align: center;
          background: #f6edd3;
          border-radius: 14px;
          padding: 12px;
        }
        .mk-award-label {
          font-size: 0.66rem;
          letter-spacing: 0.2em;
          opacity: 0.6;
        }
        .mk-award-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-top: 4px;
          color: #8a6420;
        }
        .mk-comment {
          text-align: center;
          font-size: 0.78rem;
          opacity: 0.8;
        }
        .mk-confetti {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .mk-confetti span {
          position: absolute;
          top: -20px;
          width: 8px;
          height: 12px;
          border-radius: 2px;
          animation: mk-fall 3.4s linear infinite;
        }
        @keyframes mk-fall {
          to {
            transform: translateY(105vh) rotate(560deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mk-cloud,
          .mk-sheep,
          .mk-sheep-bob,
          .mk-boom,
          .mk-report,
          .mk-confetti span {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

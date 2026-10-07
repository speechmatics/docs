import type React from "react";
import { useState } from "react";
import styles from "./SessionGrowthChart.module.css";

// Simulated Pro-plan contract in 10-second steps. Growth is counted from the highest level just before
// each window: limit = min(max open during [t-2m, t-1m] + 100, max open during [t-10m, t-5m] + 200).
const BURST = 100;
const SUSTAINED = 200;
const STEPS_PER_MIN = 6;
const MINUTES = 10;
const N = MINUTES * STEPS_PER_MIN + 1;

const ramp = (t: number, from: number, to: number, size: number) =>
  t < from ? 0 : t >= to ? size : (size * (t - from)) / (to - from);

// Sessions the customer tries to have open at minute t.
const requested = (t: number) =>
  Math.round(
    500 +
      4 * Math.sin(t * 1.7) +
      3 * Math.sin(t * 4.3) +
      ramp(t, 1.5, 2.5, 180) -
      ramp(t, 4, 4.4, 80) +
      ramp(t, 4.6, 5, 80) +
      ramp(t, 5.5, 6, 60),
  );

type Point = { t: number; open: number; limit: number; wanted: number };

// Highest open count over steps [from, to]; steps before t=0 are at the start level.
const peak = (pts: Point[], start: number, from: number, to: number) => {
  let max = from < 0 ? start : Number.NEGATIVE_INFINITY;
  for (let j = Math.max(0, from); j <= to; j++)
    max = Math.max(max, pts[j].open);
  return max;
};

const DATA: Point[] = (() => {
  const out: Point[] = [];
  const start = requested(0);
  for (let i = 0; i < N; i++) {
    const t = i / STEPS_PER_MIN;
    const limit = Math.min(
      peak(out, start, i - 2 * STEPS_PER_MIN, i - STEPS_PER_MIN) + BURST,
      peak(out, start, i - 10 * STEPS_PER_MIN, i - 5 * STEPS_PER_MIN) +
        SUSTAINED,
    );
    const prev = i > 0 ? out[i - 1].open : start;
    const wanted = requested(t);
    // Closing is always allowed; existing sessions are never cut.
    const open =
      wanted <= prev ? wanted : Math.min(wanted, Math.max(prev, limit));
    out.push({ t, open, limit: Math.max(limit, open), wanted });
  }
  return out;
})();

const NOTES = [
  {
    n: 1,
    t: 2.2,
    v: 725,
    text: "Traffic ramps faster than 100 a minute. Some new sessions are rejected and get in on retry seconds later.",
  },
  {
    n: 2,
    t: 3.6,
    v: 745,
    text: "200 sessions added within 5 minutes, so the limit stays at about 700.",
  },
  {
    n: 3,
    t: 4.2,
    v: 565,
    text: "80 sessions end. That frees room for 80 new ones.",
  },
  {
    n: 4,
    t: 4.9,
    v: 745,
    text: "80 new sessions start straight away, despite the 5-minute limit.",
  },
  {
    n: 5,
    t: 6.2,
    v: 785,
    text: "60 more have to wait until about 7:00, when the earlier growth leaves the 5-minute window.",
  },
];

const W = 680;
const H = 320;
const M = { top: 32, right: 16, bottom: 44, left: 48 };
const Y_MIN = 450;
const Y_MAX = 900;
const Y_TICKS = [500, 600, 700, 800, 900];
const X_TICKS = Array.from({ length: MINUTES + 1 }, (_, m) => m);

const x = (t: number) => M.left + (t / MINUTES) * (W - M.left - M.right);
const y = (v: number) =>
  M.top + ((Y_MAX - v) / (Y_MAX - Y_MIN)) * (H - M.top - M.bottom);

const line = (pts: [number, number][]) =>
  pts
    .map(([t, v], i) => `${i ? "L" : "M"}${x(t).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");
const band = (upper: (p: Point) => number) =>
  `${line(DATA.map((p) => [p.t, upper(p)]))} ${line(DATA.map((p): [number, number] => [p.t, p.open]).reverse()).replace("M", "L")} Z`;

const openPath = line(DATA.map((p) => [p.t, p.open]));
const limitPath = line(DATA.map((p) => [p.t, p.limit]));
const roomPath = band((p) => p.limit);
const rejectedPath = band((p) => Math.max(p.wanted, p.open));

const clock = (t: number) => {
  const s = Math.round(t * 60);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export default function SessionGrowthChart(): React.JSX.Element {
  const [hover, setHover] = useState<Point | null>(null);

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const svg = e.currentTarget.ownerSVGElement;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const local = pt.matrixTransform(ctm.inverse());
    const i = Math.round(
      ((local.x - M.left) / (W - M.left - M.right)) * (N - 1),
    );
    setHover(DATA[Math.min(N - 1, Math.max(0, i))]);
  };

  return (
    <figure className={styles.root}>
      <div className={styles.legend}>
        <span>
          <i className={styles.keyOpen} /> Open sessions
        </span>
        <span>
          <i className={styles.keyLimit} /> Limit right now
        </span>
        <span>
          <i className={styles.keyRoom} /> Room to add sessions
        </span>
        <span>
          <i className={styles.keyRejected} /> Rejected, retrying
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Simulated open sessions over 10 minutes on the Pro plan, with the session limit and the room left to add sessions. Numbered events are described below the chart."
      >
        <text className={styles.axisLabel} x={0} y={12}>
          Open sessions
        </text>
        {Y_TICKS.map((v) => (
          <g key={v}>
            <line
              className={styles.grid}
              x1={M.left}
              x2={W - M.right}
              y1={y(v)}
              y2={y(v)}
            />
            <text
              className={styles.tick}
              x={M.left - 8}
              y={y(v)}
              dy="0.32em"
              textAnchor="end"
            >
              {v}
            </text>
          </g>
        ))}
        {X_TICKS.map((m) => (
          <text
            key={m}
            className={styles.tick}
            x={x(m)}
            y={H - M.bottom + 18}
            textAnchor="middle"
          >
            {m}:00
          </text>
        ))}
        <text
          className={styles.axisLabel}
          x={(M.left + W - M.right) / 2}
          y={H - 6}
          textAnchor="middle"
        >
          Time (minutes)
        </text>

        <path className={styles.room} d={roomPath} />
        <path className={styles.rejected} d={rejectedPath} />
        <path className={styles.limit} d={limitPath} />
        <path className={styles.open} d={openPath} />

        {NOTES.map(({ n, t, v }) => (
          <g key={n} className={styles.marker}>
            <circle cx={x(t)} cy={y(v)} r={9} />
            <text x={x(t)} y={y(v)} dy="0.35em" textAnchor="middle">
              {n}
            </text>
          </g>
        ))}

        {hover && (
          <g pointerEvents="none">
            <line
              className={styles.crosshair}
              x1={x(hover.t)}
              x2={x(hover.t)}
              y1={M.top}
              y2={H - M.bottom}
            />
            <circle
              className={styles.dot}
              cx={x(hover.t)}
              cy={y(hover.open)}
              r={4}
            />
          </g>
        )}
        <rect
          x={M.left}
          y={M.top}
          width={W - M.left - M.right}
          height={H - M.top - M.bottom}
          fill="transparent"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        />
      </svg>
      <div className={styles.readout} aria-live="polite">
        {hover
          ? `${clock(hover.t)}: ${hover.open} open, limit ${hover.limit}, room for ${hover.limit - hover.open} more${
              hover.wanted > hover.open
                ? `, ${hover.wanted - hover.open} rejected`
                : ""
            }`
          : "Hover the chart to see the numbers at each moment."}
      </div>
      <figcaption>
        <ol className={styles.notes}>
          {NOTES.map(({ n, text }) => (
            <li key={n}>{text}</li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}

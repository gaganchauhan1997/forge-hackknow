import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const CYCLE_MS = 9000;

const LINES: { w: string; hl?: boolean; delay: number }[] = [
  { w: "42%", delay: 0.9 },
  { w: "70%", delay: 1.3 },
  { w: "62%", delay: 1.7 },
  { w: "78%", hl: true, delay: 2.2 },
  { w: "66%", delay: 2.7 },
  { w: "74%", delay: 3.1 },
  { w: "58%", hl: true, delay: 3.6 },
  { w: "72%", delay: 4.1 },
  { w: "64%", delay: 4.5 },
  { w: "70%", hl: true, delay: 5.0 },
  { w: "48%", delay: 5.4 },
];

const CHECKS = [
  { label: "ATS KEYWORDS MATCHED", delay: 5.9 },
  { label: "ACTION VERBS UPGRADED", delay: 6.4 },
  { label: "METRICS QUANTIFIED", delay: 6.9 },
];

export function HeroAnimation() {
  const [cycle, setCycle] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loop = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(loop);
  }, []);

  useEffect(() => {
    setScore(0);
    const start = window.setTimeout(() => {
      let s = 0;
      const tick = window.setInterval(() => {
        s += 2;
        if (s >= 98) {
          s = 98;
          window.clearInterval(tick);
        }
        setScore(s);
      }, 28);
    }, 5200);
    return () => window.clearTimeout(start);
  }, [cycle]);

  return (
    <div className="relative w-full h-full bg-[#FFFDE0] overflow-hidden flex items-center justify-center">
      {/* Right acid-yellow panel */}
      <div className="absolute inset-y-0 right-0 w-1/3 bg-[#F9FF00]" />
      {/* Decorative squares */}
      <div className="absolute top-[12%] right-[26%] w-10 h-10 bg-[#F9FF00] border-[3px] border-black hero-anim-float" />
      <div className="absolute bottom-[14%] left-[8%] w-7 h-7 bg-[#1a1a1a] hero-anim-float-slow" />
      <div className="absolute top-[22%] left-[10%] w-5 h-5 bg-[#FF0004] border-[3px] border-black hero-anim-float" />

      {/* Resume sheet — re-mounts every cycle to restart animations */}
      <div key={cycle} className="relative">
        <div className="relative w-[300px] sm:w-[340px] md:w-[360px] bg-white border-[3px] border-black shadow-[10px_10px_0_#1a1a1a] p-6 md:p-7 hero-anim-sheet">
          {/* Name + title */}
          <div className="hero-anim-line bg-[#1a1a1a] h-4 mb-2" style={{ ["--w" as string]: "55%", animationDelay: "0.3s" }} />
          <div className="hero-anim-line bg-[#F9FF00] h-3 mb-5 border border-black" style={{ ["--w" as string]: "38%", animationDelay: "0.6s" }} />
          {/* Body lines */}
          {LINES.map((l, i) => (
            <div
              key={i}
              className={`hero-anim-line h-2.5 mb-2.5 ${l.hl ? "bg-[#F9FF00] border border-black" : "bg-[#e2e2e2]"}`}
              style={{ ["--w" as string]: l.w, animationDelay: `${l.delay}s` }}
            />
          ))}
          {/* Typing cursor */}
          <div className="hero-anim-cursor mt-1 h-3 w-[2px] bg-[#1a1a1a]" />

          {/* AI check chips */}
          <div className="absolute -left-6 md:-left-16 top-8 space-y-3">
            {CHECKS.map((c) => (
              <div
                key={c.label}
                className="hero-anim-chip flex items-center gap-1.5 bg-white border-[3px] border-black px-2 py-1 shadow-[4px_4px_0_#1a1a1a]"
                style={{ animationDelay: `${c.delay}s` }}
              >
                <span className="flex items-center justify-center w-4 h-4 bg-[#F9FF00] border border-black">
                  <Check size={10} strokeWidth={4} />
                </span>
                <span className="font-oswald text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ATS score badge */}
        <div className="hero-anim-badge absolute -bottom-8 -right-6 md:-right-14 bg-[#1a1a1a] border-[3px] border-black p-4 shadow-[6px_6px_0_#F9FF00]" style={{ animationDelay: "5s" }}>
          <div className="font-inter text-[9px] uppercase tracking-[0.2em] text-white/60 mb-1">ATS Score</div>
          <div className="font-oswald text-3xl font-bold text-white leading-none">
            {score}
            <span className="text-base text-white/60">/100</span>
          </div>
          <div className="mt-2 h-1.5 w-24 bg-white/20">
            <div className="h-full bg-[#F9FF00] transition-all duration-100" style={{ width: `${score}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

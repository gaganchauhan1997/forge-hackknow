import { useState } from "react";
import { CheckCircle2, Circle, Star, StarHalf } from "lucide-react";

// Dummy seed reviews until 200 real reviews are collected — after that,
// ratings switch to real user reviews automatically.
const REAL_REVIEW_THRESHOLD = 200;

// Tokens the logged-in user has left (from configured API keys).
// After login this comes from the user's key usage; default demo balance.
function getTokensLeft(): number {
  const stored = localStorage.getItem("forge_tokens_left");
  return stored ? parseInt(stored) : 50000;
}

type Module = {
  id: number;
  name: string;
  features: string[];
  purpose: string;
  tokenCost: number; // tokens needed per run — high-cost tools go Busy first
  dummyRatings: number[]; // seed ratings; averaged for display
  realRatings: number[];
};

const modules: Module[] = [
  { id: 1, name: "AI RESUME BUILDER", features: ["ATS", "PDF", "Templates"], purpose: "Create professional ATS-friendly resumes", tokenCost: 8000, dummyRatings: [5, 5, 5, 5, 5], realRatings: [] },
  { id: 2, name: "BULLET POINT UPGRADER", features: ["STAR", "Metrics", "Action Verbs"], purpose: "Transform weak bullets into impactful achievements", tokenCost: 2000, dummyRatings: [5, 5, 5, 4, 5], realRatings: [] },
  { id: 3, name: "PORTFOLIO GENERATOR", features: ["Responsive", "React", "Export"], purpose: "Build a professional portfolio website", tokenCost: 12000, dummyRatings: [5, 5, 5, 4, 5], realRatings: [] },
  { id: 4, name: "CAREER GAP FRAMER", features: ["Honest", "ATS", "Narrative"], purpose: "Explain employment gaps professionally", tokenCost: 3000, dummyRatings: [5, 5, 4, 5, 4.5], realRatings: [] },
  { id: 5, name: "ACHIEVEMENT FORGE", features: ["Quantification", "Impact", "Results"], purpose: "Generate measurable achievement statements", tokenCost: 3000, dummyRatings: [5, 5, 5, 5, 5], realRatings: [] },
  { id: 6, name: "ATS CAREER INTELLIGENCE", features: ["ATS Score", "Keywords", "Parsing"], purpose: "Analyze resume ATS compatibility", tokenCost: 6000, dummyRatings: [5, 5, 5, 5, 4.5], realRatings: [] },
  { id: 7, name: "6-SECOND RECRUITER SCAN", features: ["Recruiter View", "Highlights", "First Impression"], purpose: "Simulate a 6-second resume review", tokenCost: 4000, dummyRatings: [5, 5, 5, 5, 4.5], realRatings: [] },
  { id: 8, name: "RESUME ROAST", features: ["Expert Feedback", "Weaknesses", "Suggestions"], purpose: "Get brutally honest resume feedback", tokenCost: 60000, dummyRatings: [5, 5, 5, 4, 5], realRatings: [] },
  { id: 9, name: "JOB TAILORING ENGINE", features: ["JD Match", "ATS", "Optimization"], purpose: "Customize resume for specific job descriptions", tokenCost: 9000, dummyRatings: [5, 5, 5, 5, 5], realRatings: [] },
  { id: 10, name: "TRUTH-LOCK TAILOR", features: ["Fact Check", "Authentic", "Verification"], purpose: "Ensure resume content stays truthful & credible", tokenCost: 5000, dummyRatings: [5, 5, 5, 4, 5], realRatings: [] },
  { id: 11, name: "COMPANY TAILOR", features: ["Company Tone", "Keywords", "Personalization"], purpose: "Adapt resume for target companies", tokenCost: 7000, dummyRatings: [5, 5, 5, 5, 4.5], realRatings: [] },
  { id: 12, name: "COVER LETTER", features: ["Personalized", "ATS", "Professional"], purpose: "Generate tailored cover letters", tokenCost: 4000, dummyRatings: [5, 5, 5, 4, 5], realRatings: [] },
  { id: 13, name: "RECRUITER HOOK", features: ["LinkedIn", "Email", "Outreach"], purpose: "Create recruiter outreach messages", tokenCost: 55000, dummyRatings: [5, 5, 4, 5, 4.5], realRatings: [] },
  { id: 14, name: "APPLICATION PACK", features: ["Resume", "Cover Letter", "Portfolio"], purpose: "Generate a complete job application package", tokenCost: 15000, dummyRatings: [5, 5, 5, 5, 5], realRatings: [] },
  { id: 15, name: "ROLE FIT FINDER", features: ["Skill Match", "Analysis", "Compatibility"], purpose: "Identify the best-fit roles from your profile", tokenCost: 6000, dummyRatings: [5, 5, 5, 5, 4.5], realRatings: [] },
  { id: 16, name: "APPLICATION OPTIMIZER", features: ["ATS", "Quality", "Readiness"], purpose: "Optimize applications before submission", tokenCost: 5000, dummyRatings: [5, 5, 5, 4, 5], realRatings: [] },
  { id: 17, name: "INTERVIEW PREP PACK", features: ["Mock Interviews", "Q&A", "Strategy"], purpose: "Prepare confidently for interviews", tokenCost: 10000, dummyRatings: [5, 5, 5, 5, 5], realRatings: [] },
];

function getRating(m: Module): number {
  const ratings =
    m.realRatings.length >= REAL_REVIEW_THRESHOLD ? m.realRatings : m.dummyRatings;
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  return Math.round(avg * 10) / 10;
}

function isAvailable(m: Module, tokensLeft: number): boolean {
  return tokensLeft >= m.tokenCost;
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.85;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) {
          return <Star key={i} size={14} className="fill-[#F5B800] text-[#F5B800]" />;
        }
        if (i === full && half) {
          return (
            <span key={i} className="relative inline-flex">
              <Star size={14} className="text-[#F5B800]" />
              <StarHalf size={14} className="absolute inset-0 fill-[#F5B800] text-[#F5B800]" />
            </span>
          );
        }
        return <Star key={i} size={14} className="text-[#F5B800]" />;
      })}
    </div>
  );
}

export function Roster() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const tokensLeft = getTokensLeft();

  return (
    <section id="roster" className="py-16 md:py-24 border-b-[3px] border-black">
      <div className="px-6 md:px-12 lg:px-16 mb-12">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-[#FF0004] block mb-2">
              Forge Yahavi
            </span>
            <h2 className="font-oswald text-4xl md:text-6xl font-bold uppercase tracking-[-0.03em]">
              MODULE
              <br />
              <span className="font-inter font-semibold tracking-normal text-2xl md:text-4xl">
                LIST
              </span>
            </h2>
          </div>
          <span className="hidden md:block font-oswald text-sm uppercase tracking-widest">
            17 MODULES
          </span>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-16 overflow-x-auto">
        <div className="border-[3px] border-black min-w-[1000px]">
          {/* Table Header */}
          <div className="grid grid-cols-12 border-b-[3px] border-black bg-[#1a1a1a] text-white">
            <div className="col-span-3 px-4 py-3 font-oswald text-xs font-bold uppercase tracking-widest">
              Module
            </div>
            <div className="col-span-3 px-4 py-3 font-oswald text-xs font-bold uppercase tracking-widest border-l-[3px] border-white/20">
              Features
            </div>
            <div className="col-span-2 px-4 py-3 font-oswald text-xs font-bold uppercase tracking-widest border-l-[3px] border-white/20">
              Community Score
            </div>
            <div className="col-span-2 px-4 py-3 font-oswald text-xs font-bold uppercase tracking-widest border-l-[3px] border-white/20">
              Purpose
            </div>
            <div className="col-span-2 px-4 py-3 font-oswald text-xs font-bold uppercase tracking-widest border-l-[3px] border-white/20">
              Availability
            </div>
          </div>

          {/* Table Rows */}
          {modules.map((m, i) => {
            const rating = getRating(m);
            const available = isAvailable(m, tokensLeft);
            return (
              <div
                key={m.id}
                className={`grid grid-cols-12 border-b-[3px] border-black last:border-b-0 transition-colors cursor-pointer ${
                  hoveredRow === m.id
                    ? "bg-[#F9FF00]"
                    : i % 2 === 0
                    ? "bg-white"
                    : "bg-[#fafafa]"
                }`}
                onMouseEnter={() => setHoveredRow(m.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <div className="col-span-3 px-4 py-4 flex items-center">
                  <span className="font-oswald text-base md:text-lg font-bold uppercase tracking-tight">
                    {m.name}
                  </span>
                </div>
                <div className="col-span-3 px-4 py-4 border-l-[3px] border-black flex items-center flex-wrap gap-1">
                  {m.features.map((f, j) => (
                    <span
                      key={j}
                      className="font-inter text-[10px] uppercase tracking-wider border border-black px-2 py-0.5 bg-white"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="col-span-2 px-4 py-4 border-l-[3px] border-black flex items-center gap-2">
                  <Stars rating={rating} />
                  <span className="font-inter text-sm font-medium">
                    {rating.toFixed(1)}/5
                  </span>
                </div>
                <div className="col-span-2 px-4 py-4 border-l-[3px] border-black flex items-center">
                  <span className="font-inter text-xs leading-snug">{m.purpose}</span>
                </div>
                <div className="col-span-2 px-4 py-4 border-l-[3px] border-black flex items-center">
                  <span
                    className={`flex items-center gap-2 font-inter text-sm font-medium px-2 py-1 ${
                      available ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    {available ? (
                      <CheckCircle2 size={16} className="text-green-600" />
                    ) : (
                      <Circle size={16} className="text-[#FF0004]" />
                    )}
                    {available ? "Available" : "Busy"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

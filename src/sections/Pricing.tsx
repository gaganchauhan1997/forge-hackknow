import { Check } from "lucide-react";

const FREE_TOOLS = [
  "AI Resume Builder",
  "Bullet Point Upgrader",
  "Portfolio Generator",
  "Career Gap Framer",
  "Achievement Forge",
];

const PRO_TOOLS = [
  "ATS Career Intelligence",
  "6-Second Recruiter Scan",
  "Resume Roast",
  "Job Tailoring Engine",
  "Truth-Lock Tailor",
  "Company Tailor",
  "Cover Letter",
];

const PREMIUM_TOOLS = [
  "Recruiter Hook",
  "Application Pack",
  "Role Fit Finder",
  "Application Optimizer",
  "Interview Prep Pack",
];

export function Pricing() {
  return (
    <section id="pricing" className="border-b-[3px] border-black">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-16 pt-16 pb-8 border-b-[3px] border-black">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-oswald text-sm font-bold text-[#FF0004]">04</span>
            <h2 className="font-oswald text-4xl md:text-6xl font-bold uppercase tracking-[-0.03em]">
              PRICING
            </h2>
          </div>
          <p className="font-oswald text-sm md:text-base uppercase tracking-[0.15em] text-[#1a1a1a]/70">
            Honest. Pick what fits.
          </p>
        </div>
        <div className="h-[3px] bg-black mt-6" />
      </div>

      {/* Plans — Desktop: 4 columns, Mobile: stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {/* FREE PLAN */}
        <div className="border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black p-6 md:p-8 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-oswald text-xs font-bold uppercase tracking-[0.15em] mb-2">
                Free Plan
              </h3>
              <div className="font-oswald text-4xl md:text-5xl font-bold">₹0</div>
            </div>
            <span className="font-oswald text-[10px] font-bold uppercase border-[2px] border-black rounded-full px-3 py-1 tracking-wider">
              5 Modules
            </span>
          </div>
          <div className="h-[2px] bg-black/20 my-4" />
          <p className="font-inter text-xs text-[#1a1a1a]/60 mb-4">
            Basic access to get you started • With watermark
          </p>
          <div className="font-oswald text-[10px] font-bold uppercase tracking-[0.15em] border-[2px] border-black inline-block px-3 py-1 mb-4">
            Tools Included
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {FREE_TOOLS.map((tool, i) => (
              <div key={tool} className="flex items-start gap-2">
                <span className="font-oswald text-xs font-bold text-[#1a1a1a]/50 min-w-[16px]">
                  {i + 1}.
                </span>
                <span className="font-inter text-xs font-medium uppercase">{tool}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PRO PLAN */}
        <div className="border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black p-6 md:p-8 bg-[#D4FF00]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-oswald text-xs font-bold uppercase tracking-[0.15em] mb-2">
                Pro Plan
              </h3>
              <div className="font-oswald text-4xl md:text-5xl font-bold">
                ₹199<span className="text-lg font-medium">/mo</span>
              </div>
            </div>
            <span className="font-oswald text-[10px] font-bold uppercase border-[2px] border-black rounded-full px-3 py-1 tracking-wider">
              12 Modules
            </span>
          </div>
          <div className="h-[2px] bg-black/20 my-4" />
          <p className="font-inter text-xs font-semibold text-[#1a1a1a] mb-4">
            Includes everything in Free, plus:
          </p>
          <div className="font-oswald text-[10px] font-bold uppercase tracking-[0.15em] border-[2px] border-black inline-block px-3 py-1 mb-4">
            Tools Included
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {PRO_TOOLS.map((tool, i) => (
              <div key={tool} className="flex items-start gap-2">
                <Check size={14} className="mt-0.5 shrink-0" />
                <span className="font-inter text-xs font-medium uppercase">
                  {i + 6}. {tool}
                </span>
              </div>
            ))}
          </div>
          <p className="font-inter text-xs text-[#1a1a1a]/60 mt-4">
            Advanced tools to build, tailor &amp; stand out.
          </p>
        </div>

        {/* PREMIUM PLAN */}
        <div className="border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black p-6 md:p-8 bg-[#F9FF00] relative">
          <div className="absolute top-4 right-4 bg-[#FF0004] text-white font-oswald text-[10px] font-bold uppercase tracking-wider px-3 py-1">
            Most Popular
          </div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-oswald text-xs font-bold uppercase tracking-[0.15em] mb-2">
                Premium Plan
              </h3>
              <div className="font-oswald text-4xl md:text-5xl font-bold">
                ₹599<span className="text-lg font-medium">/mo</span>
              </div>
            </div>
            <span className="font-oswald text-[10px] font-bold uppercase border-[2px] border-black rounded-full px-3 py-1 tracking-wider mt-8">
              17 Modules
            </span>
          </div>
          <div className="h-[2px] bg-black/20 my-4" />
          <p className="font-inter text-xs font-semibold text-[#1a1a1a] mb-4">
            Includes all Pro features, plus:
          </p>
          <div className="font-oswald text-[10px] font-bold uppercase tracking-[0.15em] border-[2px] border-black inline-block px-3 py-1 mb-4">
            Tools Included
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {PREMIUM_TOOLS.map((tool, i) => (
              <div key={tool} className="flex items-start gap-2">
                <Check size={14} className="mt-0.5 shrink-0" />
                <span className="font-inter text-xs font-medium uppercase">
                  {i + 13}. {tool}
                </span>
              </div>
            ))}
          </div>
          <p className="font-inter text-xs text-[#1a1a1a]/60 mt-4">
            Unlock every tool. Build better. Apply smarter.
          </p>
        </div>

        {/* DAY PASS */}
        <div className="p-6 md:p-8 bg-[#1a1a1a] text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-oswald text-xs font-bold uppercase tracking-[0.15em] mb-2 text-white/80">
                Day Pass
              </h3>
              <div className="font-oswald text-4xl md:text-5xl font-bold">₹49</div>
            </div>
            <span className="font-oswald text-[10px] font-bold uppercase border-[2px] border-white rounded-full px-3 py-1 tracking-wider text-white">
              All 17 Tools
            </span>
          </div>
          <div className="h-[2px] bg-white/20 my-4" />
          <p className="font-inter text-xs text-white/70 mb-4">
            All tools • 24 hours access • No watermark<br />
            (Access for 1 day)
          </p>
          <div className="font-oswald text-[10px] font-bold uppercase tracking-[0.15em] border-[2px] border-white inline-block px-3 py-1 mb-4 text-white">
            Tools Included
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {[...FREE_TOOLS, ...PRO_TOOLS, ...PREMIUM_TOOLS].map((tool, i) => (
              <div key={tool} className="flex items-start gap-2">
                <span className="font-oswald text-xs font-bold text-[#F9FF00] min-w-[16px]">
                  {i + 1}
                </span>
                <span className="font-inter text-[10px] font-medium uppercase text-white/90">
                  {tool}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

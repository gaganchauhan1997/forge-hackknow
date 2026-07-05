import { useState } from "react";
import { loadUser, saveUser } from "@/lib/store";
import { PLAN_TOOLS } from "@/lib/tools-config";
import { Check, Crown } from "lucide-react";

const PLANS = [
  {
    id: "free" as const,
    label: "FREE FOREVER",
    price: "₹0",
    period: "",
    sub: "Builder only · watermarked PDF · 1 export/day",
    tools: 5,
    features: [
      "AI Resume Builder",
      "Bullet Point Upgrader",
      "Portfolio Generator",
      "Career Gap Framer",
      "Achievement Forge",
    ],
  },
  {
    id: "pro" as const,
    label: "PRO",
    price: "₹199",
    period: "/month",
    sub: "12 tools · no watermark · unlimited exports",
    tools: 12,
    featured: true,
    features: [
      "Everything in Free",
      "ATS Career Intelligence",
      "6-Second Recruiter Scan",
      "Resume Roast",
      "Job Tailoring Engine",
      "Truth-Lock Tailor",
      "Company Tailor",
      "Cover Letter Generator",
    ],
  },
  {
    id: "premium" as const,
    label: "PREMIUM",
    price: "₹599",
    period: "/month",
    sub: "All 17 tools · priority AI · cloud sync",
    tools: 17,
    features: [
      "Everything in Pro",
      "Recruiter Hook",
      "Application Pack",
      "Role Fit Finder",
      "Application Optimizer",
      "Interview Prep Pack",
      "Priority AI processing",
    ],
  },
  {
    id: "daypass" as const,
    label: "DAY PASS",
    price: "₹49",
    period: "/24h",
    sub: "All 17 tools · no watermark · unlimited exports",
    tools: 17,
    features: [
      "All 17 tools for 24 hours",
      "No watermark",
      "Unlimited exports",
      "Full access",
    ],
  },
];

export default function AppPlan() {
  const [user, setUser] = useState(loadUser());
  const currentPlan = user.plan || "free";

  const handleSelectPlan = (planId: "free" | "pro" | "premium" | "daypass") => {
    saveUser({ plan: planId });
    setUser({ ...user, plan: planId });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="text-center mb-8">
        <h1 className="font-oswald text-2xl md:text-3xl font-bold text-[#1a1a1a] uppercase">Choose Your Plan</h1>
        <p className="font-inter text-sm text-[#1a1a1a]/60 mt-2">
          BYOK (Bring Your Own Key) — only pay for the tool subscription, not AI usage.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white border-2 flex flex-col ${
              plan.featured
                ? "border-[#1a1a1a] shadow-[4px_4px_0_#F9FF00]"
                : "border-[#1a1a1a]"
            } ${currentPlan === plan.id ? "ring-2 ring-[#F9FF00]" : ""}`}
          >
            {plan.featured && (
              <div className="bg-[#F9FF00] text-[#1a1a1a] text-center py-1 font-oswald text-[10px] font-bold uppercase tracking-wider border-b-2 border-[#1a1a1a]">
                Most Popular
              </div>
            )}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-oswald text-sm font-bold uppercase text-[#1a1a1a]">{plan.label}</h3>
              <div className="mt-2 mb-3">
                <span className="font-oswald text-3xl font-bold text-[#1a1a1a]">{plan.price}</span>
                {plan.period && (
                  <span className="font-inter text-xs text-[#1a1a1a]/50">{plan.period}</span>
                )}
              </div>
              <p className="font-inter text-[10px] text-[#1a1a1a]/60 mb-4">{plan.sub}</p>

              <div className="flex-1 space-y-2 mb-4">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <Check size={12} className="text-[#1a1a1a] mt-0.5 shrink-0" />
                    <span className="font-inter text-[11px] text-[#1a1a1a]">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={currentPlan === plan.id}
                className={`w-full py-2.5 font-oswald font-bold uppercase text-xs border-2 border-[#1a1a1a] transition-colors ${
                  currentPlan === plan.id
                    ? "bg-[#1a1a1a] text-[#F9FF00] cursor-default"
                    : plan.featured
                    ? "bg-[#F9FF00] text-[#1a1a1a] hover:bg-[#e6e600]"
                    : "bg-white text-[#1a1a1a] hover:bg-[#F9FF00]"
                }`}
              >
                {currentPlan === plan.id ? (
                  <span className="flex items-center justify-center gap-1">
                    <Crown size={12} /> Current Plan
                  </span>
                ) : (
                  `Select ${plan.label}`
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

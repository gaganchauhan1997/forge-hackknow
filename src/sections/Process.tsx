import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "WHY BYOK?",
    desc: "BYOK (Bring Your Own Key) means you use free API keys from AI providers. This is why Yahavi Forge can be so affordable.",
    status: "BYOK TUTORIAL",
    color: "yellow",
    details: [
      "We don't pay for your AI usage — you use free tiers directly",
      "Your keys stay in your browser — complete privacy",
      "No monthly AI fees — just the tool subscription",
      "Switch providers anytime — never locked in",
    ],
  },
  {
    num: "02",
    title: "GET A GROQ KEY",
    desc: "Groq is the fastest AI inference provider. Their free tier gives you 1,444,444 tokens per day. (Recommended)",
    status: "RECOMMENDED",
    color: "red",
    details: [
      "Go to console.groq.com/keys",
      "Sign up with your email (no credit card required)",
      'Click "Create API Key"',
      "Copy the key starting with gsk_...",
    ],
  },
  {
    num: "03",
    title: "GET A GEMINI KEY",
    desc: "Google Gemini offers the largest context window (1 million tokens) and is great for long resumes and JDs.",
    status: "1M CONTEXT",
    color: "yellow",
    details: [
      "Go to aistudio.google.com",
      "Sign in with your Google account",
      'Click "Create API Key"',
      "Copy the key starting with AIza...",
    ],
  },
  {
    num: "04",
    title: "PASTE & ACTIVATE",
    desc: "Once you have your key(s), paste them into the Forge. Pro tip: add all 3 providers (Groq + Gemini + OpenRouter) — when one hits a rate limit, Forge automatically switches to another.",
    status: "FINAL STEP",
    color: "red",
    details: [
      "Click the KEYS button in the top nav or sidebar",
      "Paste your key into the corresponding provider field",
      "The status will change from EMPTY to CONFIGURED",
      "Add multiple keys for automatic fallback!",
    ],
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-step") || "0");
            setActiveStep(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    const cards = sectionRef.current?.querySelectorAll("[data-step]");
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="border-b-[3px] border-black"
    >
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Sticky Left Column */}
        <div className="md:col-span-4 lg:col-span-3 border-r-[3px] border-black md:sticky md:top-0 md:h-screen flex flex-col justify-center px-6 md:px-10 py-12 md:py-0 bg-white">
          <span className="font-oswald text-xs font-bold uppercase tracking-[0.2em] text-[#FF0004] block mb-4">
            How Tools Work
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold uppercase tracking-[-0.03em] leading-[0.95] mb-6">
            OUR
            <br />
            APPROACH
          </h2>
          <p className="font-inter text-sm leading-relaxed text-[#1a1a1a]/70 mb-8">
            A structured three-phase workflow designed to deliver exceptional
            editorial illustration with zero friction.
          </p>
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-3 flex-1 border-[3px] border-black transition-colors ${
                  i === activeStep ? "bg-[#F9FF00]" : "bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Steps */}
        <div className="md:col-span-8 lg:col-span-9">
          {steps.map((step, i) => (
            <div
              key={i}
              data-step={i}
              className="border-b-[3px] border-black px-6 md:px-12 py-12 md:py-16 min-h-[60vh] flex flex-col justify-center hover:bg-[#F9FF00]/20 transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-oswald text-6xl md:text-8xl font-bold text-[#1a1a1a]/10 leading-none">
                      {step.num}
                    </span>
                    <span
                      className={`font-oswald text-xs font-bold uppercase tracking-widest px-3 py-1 border-[3px] border-black ${
                        step.color === "yellow"
                          ? "bg-[#F9FF00]"
                          : "bg-[#FF0004] text-white"
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <h3 className="font-oswald text-3xl md:text-4xl font-bold uppercase tracking-[-0.02em] mb-4">
                    {step.title}
                  </h3>
                  <p className="font-inter text-sm leading-relaxed text-[#1a1a1a]/70 max-w-md">
                    {step.desc}
                  </p>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="border-[3px] border-black">
                    {step.details.map((detail, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-4 px-4 py-3 border-b-[3px] border-black last:border-b-0 hover:bg-[#F9FF00] transition-colors"
                      >
                        <span className="font-oswald text-xs font-bold text-[#FF0004]">
                          {step.num}.{j + 1}
                        </span>
                        <span className="font-inter text-sm font-medium uppercase tracking-wide">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

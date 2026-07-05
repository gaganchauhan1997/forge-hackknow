export interface ToolInput {
  id: string;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  type?: "text" | "select";
  options?: { value: string; label: string }[];
}

export interface ChipConfig {
  key: string;
  prefKey: string;
  options: { value: string; label: string }[];
}

export interface ToolConfig {
  title: string;
  subtitle: string;
  category: string;
  num: string;
  icon: string;
  chips?: ChipConfig;
  inputs: ToolInput[];
  systemPrompt: (chip?: string) => string;
  userPrompt: (inputs: Record<string, string>, chip?: string) => string;
  temperature?: number;
  maxTokens?: number;
  portfolioOutput?: boolean;
  kind?: string;
}

export const TOOLS: Record<string, ToolConfig> = {
  builder: {
    title: "AI Resume Builder",
    subtitle: "Raw experience → STAR-method achievement bullets",
    category: "build",
    num: "01",
    icon: "✦",
    chips: {
      key: "tone",
      prefKey: "tone",
      options: [
        { value: "corporate", label: "CORPORATE" },
        { value: "startup", label: "STARTUP" },
        { value: "faang", label: "FAANG" },
        { value: "creative", label: "CREATIVE" },
        { value: "executive", label: "EXECUTIVE" },
      ],
    },
    inputs: [
      { id: "role", label: "Target Role", placeholder: "e.g. AI Full Stack Developer at a Series-B startup" },
      {
        id: "experience",
        label: "Raw Experience / What You Did",
        placeholder: "Paste a job description, bullet list, or just write what you did in plain language...",
        rows: 14,
        required: true,
      },
    ],
    systemPrompt: (chip) =>
      `You are Yahavi Forge — an elite resume engineer. Tone: **${chip || "corporate"}**.\n\nRewrite the user's raw experience into achievement-grade resume bullets using the STAR method.\n\nRules:\n- Start every bullet with a strong action verb.\n- Quantify results (%, $, users, time saved).\n- ATS-friendly plain text.\n- NEVER fabricate experience.\n- One line per bullet, 18–26 words.\n- Bold the most important metric using **text**.`,
    userPrompt: (i, chip) =>
      `TARGET ROLE: ${i.role || "Not specified"}\nTONE: ${chip || "corporate"}\n\nRAW EXPERIENCE:\n${i.experience}\n\nRewrite this now.`,
    temperature: 0.7,
    maxTokens: 2500,
  },
  "bullet-upgrader": {
    title: "Bullet Point Upgrader",
    subtitle: "Make bullets clearer and more results-focused",
    category: "build",
    num: "02",
    icon: "✎",
    inputs: [
      {
        id: "bullets",
        label: "Your Bullet Points",
        placeholder: "Paste resume bullets, one per line...",
        rows: 12,
        required: true,
      },
    ],
    systemPrompt: () =>
      `You are a resume bullet optimization engine. Rewrite each bullet to be:\n- Clearer and results-focused\n- Starting with a strong action verb\n- Quantified where realistic\n- Under 2 lines each\n\nFormat: Original → Rewritten (with explanation).`,
    userPrompt: (i) => `BULLETS TO UPGRADE:\n${i.bullets}\n\nUpgrade each now.`,
    temperature: 0.8,
    maxTokens: 1500,
  },
  portfolio: {
    title: "Portfolio Generator",
    subtitle: "Resume → standalone HTML portfolio page · 5 themes",
    category: "build",
    num: "03",
    icon: "◆",
    portfolioOutput: true,
    inputs: [
      { id: "name", label: "Your Name", placeholder: "e.g. Gagan Chauhan" },
      { id: "headline", label: "Headline / Title", placeholder: "e.g. AI Full Stack Developer" },
      { id: "links", label: "Links (one per line)", placeholder: "GitHub: github.com/yourname\nLinkedIn: linkedin.com/in/yourname", rows: 4 },
      {
        id: "style",
        label: "Design Theme",
        type: "select",
        options: [
          { value: "editorial", label: "EDITORIAL — Magazine-style serif" },
          { value: "brutalist", label: "BRUTALIST — Bold yellow + hard shadows" },
          { value: "minimal", label: "MINIMAL — Swiss whitespace" },
          { value: "terminal", label: "TERMINAL — Dark dev aesthetic" },
          { value: "luxury", label: "LUXURY — Fashion house, gold" },
        ],
      },
      { id: "resume", label: "Full Resume Content", placeholder: "Paste your full resume...", rows: 12, required: true },
    ],
    systemPrompt: () =>
      `You are an elite portfolio webpage generator. Produce a COMPLETE standalone HTML document using only <style> tags, no JavaScript, no external images. Output ONLY the complete <!DOCTYPE html>...</html>.`,
    userPrompt: (i) =>
      `NAME: ${i.name || "—"}\nHEADLINE: ${i.headline || "—"}\nLINKS:\n${i.links || "—"}\nTHEME: ${i.style || "brutalist"}\n\nRESUME CONTENT:\n${i.resume}\n\nGenerate the complete standalone HTML portfolio page now.`,
    temperature: 0.7,
    maxTokens: 4000,
  },
  gap: {
    title: "Career Gap Framer",
    subtitle: "Turn gaps, switches, freelance into compelling narrative",
    category: "build",
    num: "04",
    icon: "↻",
    chips: {
      key: "gapTone",
      prefKey: "gapTone",
      options: [
        { value: "confident-honest", label: "CONFIDENT & HONEST" },
        { value: "growth-oriented", label: "GROWTH-ORIENTED" },
        { value: "entrepreneurial", label: "ENTREPRENEURIAL" },
        { value: "academic", label: "ACADEMIC" },
      ],
    },
    inputs: [
      {
        id: "input",
        label: "Describe the Gap / Transition",
        placeholder: "e.g. I took 14 months off after my pharmacy job to study data analytics...",
        rows: 8,
        required: true,
      },
    ],
    systemPrompt: (chip) =>
      `You are a narrative coach for career gaps. Tone: **${chip || "confident-honest"}**.\n\nReframe into THREE outputs:\n## RESUME LINE\n## LINKEDIN ABOUT (3-4 sentences)\n## INTERVIEW ANSWER (60 seconds)\n\nNo apologies. Show learning + agency.`,
    userPrompt: (i, chip) => `TONE: ${chip || "confident-honest"}\n\nGAP / TRANSITION:\n${i.input}\n\nReframe now.`,
    temperature: 0.75,
    maxTokens: 1200,
  },
  "quick-achievement": {
    title: "Achievement Forge",
    subtitle: "Weak line → 3 quantified, action-led bullets",
    category: "build",
    num: "05",
    icon: "⚡",
    inputs: [
      {
        id: "input",
        label: "Weak Statement to Transform",
        placeholder: 'e.g. "I made reports in Excel for the operations team"',
        rows: 5,
        required: true,
      },
    ],
    systemPrompt: () =>
      `You are an achievement forge. Output THREE distinct bullets:\n## VARIANT A — IMPACT\n## VARIANT B — SCOPE\n## VARIANT C — INNOVATION\n\nEach ≤ 25 words, action verb start, quantified.`,
    userPrompt: (i) => `WEAK STATEMENT:\n${i.input}\n\nForge 3 variants now.`,
    temperature: 0.85,
    maxTokens: 800,
  },
  ats: {
    title: "ATS Career Intelligence",
    subtitle: "ATS score · keyword gap · recruiter perception · rewrite engine",
    category: "analyze",
    num: "06",
    icon: "◎",
    kind: "ats",
    inputs: [
      { id: "resume", label: "Your Resume", placeholder: "Paste your full resume text here...", rows: 14, required: true },
      { id: "jd", label: "Job Description", placeholder: "Paste the JD you're applying for...", rows: 14, required: true },
    ],
    systemPrompt: () =>
      `You are an ATS expert. Analyze the resume against the JD and provide:\n## ATS SCORE (0-100)\n## KEYWORD ANALYSIS\n## MISSING KEYWORDS\n## REWRITE SUGGESTIONS\n## OVERALL ASSESSMENT`,
    userPrompt: (i) => `RESUME:\n${i.resume}\n\nJOB DESCRIPTION:\n${i.jd}\n\nAnalyze now.`,
    temperature: 0.5,
    maxTokens: 2500,
  },
  "scan-6sec": {
    title: "6-Second Recruiter Scan",
    subtitle: "What a senior recruiter sees in the first 6 seconds",
    category: "analyze",
    num: "07",
    icon: "◉",
    inputs: [
      { id: "resume", label: "Your Resume", placeholder: "Paste your resume.", rows: 16, required: true },
    ],
    systemPrompt: () =>
      `You are a senior recruiter. Simulate what you see in the FIRST 6 SECONDS.\n\n## FIRST IMPRESSION\n## WHAT STANDS OUT\n## WHAT LOOKS RISKY\n## WHAT FEELS WEAK\n## VERDICT: PASS / MAYBE / INTERVIEW\n\nBe brutally honest.`,
    userPrompt: (i) => `RESUME:\n${i.resume}\n\nGive your 6-second scan now.`,
    temperature: 0.6,
    maxTokens: 1000,
  },
  roast: {
    title: "Resume Roast",
    subtitle: "Brutal honesty · funny · always useful",
    category: "analyze",
    num: "08",
    icon: "🔥",
    chips: {
      key: "roastPersona",
      prefKey: "roastPersona",
      options: [
        { value: "recruiter", label: "HONEST RECRUITER" },
        { value: "faang", label: "FAANG RECRUITER" },
        { value: "hr", label: "SARCASTIC HR" },
        { value: "founder", label: "STARTUP FOUNDER" },
      ],
    },
    inputs: [
      { id: "resume", label: "Feed the Fire", placeholder: "Paste your resume. Don't hold back.", rows: 16, required: true },
    ],
    systemPrompt: (chip) => {
      const personas: Record<string, string> = {
        recruiter: "You're a brutally honest senior recruiter. Tough love.",
        faang: "You're a FAANG recruiter who screens 500+ resumes per week.",
        hr: "You're a sarcastic, slightly tired HR generalist.",
        founder: "You're a startup founder who hates buzzword bingo.",
      };
      return `${personas[chip || "recruiter"]}\n\n## THE ROAST (3-5 paragraphs)\n## WHAT'S ACTUALLY GOOD\n## THE FIX LIST (3-5 items)\n\nStay funny. Stay useful.`;
    },
    userPrompt: (i) => `RESUME:\n${i.resume}\n\nLight it up.`,
    temperature: 0.9,
    maxTokens: 1800,
  },
  "tailor-jd": {
    title: "Job Tailoring Engine",
    subtitle: "100% truthful · zero invention · maximum match",
    category: "tailor",
    num: "09",
    icon: "⤲",
    inputs: [
      { id: "resume", label: "Original Resume", placeholder: "Paste your current resume.", rows: 14, required: true },
      { id: "jd", label: "Target JD", placeholder: "Paste the job description.", rows: 14, required: true },
    ],
    systemPrompt: () =>
      `Expert resume tailor. Produce:\n## SUMMARY OF CHANGES\n## TAILORED RESUME\n## MATCH SCORE\nBEFORE [%] → AFTER [%]. No fabrication.`,
    userPrompt: (i) => `RESUME:\n${i.resume}\n\nJOB DESCRIPTION:\n${i.jd}\n\nTailor it now.`,
    temperature: 0.5,
    maxTokens: 2800,
  },
  "truth-lock": {
    title: "Truth-Lock Tailor",
    subtitle: "JD match WITHOUT fabrication — gaps tagged honestly",
    category: "tailor",
    num: "10",
    icon: "🔒",
    inputs: [
      { id: "resume", label: "Your Resume", placeholder: "Paste your resume.", rows: 12, required: true },
      { id: "jd", label: "Job Description", placeholder: "Paste the JD.", rows: 12, required: true },
    ],
    systemPrompt: () =>
      `Truth-locked tailoring engine. NEVER fabricate. Tag gaps as [NEEDS EVIDENCE].\n\n## TAILORED RESUME (truth-locked)\n## TAGGED GAPS\n## SUGGESTIONS`,
    userPrompt: (i) => `RESUME:\n${i.resume}\n\nJOB DESCRIPTION:\n${i.jd}\n\nTailor with truth-lock.`,
    temperature: 0.4,
    maxTokens: 3000,
  },
  "company-tailor": {
    title: "Company Tailor",
    subtitle: "Per-company deep tailoring with culture + ICP context",
    category: "tailor",
    num: "11",
    icon: "🏢",
    inputs: [
      { id: "company", label: "Company Name", placeholder: "e.g. Stripe" },
      { id: "role", label: "Target Role Title", placeholder: "e.g. Senior Frontend Engineer" },
      { id: "jd", label: "Job Description", placeholder: "Paste the full JD.", rows: 10, required: true },
      { id: "resume", label: "Your Resume", placeholder: "Paste your resume.", rows: 10, required: true },
    ],
    systemPrompt: () =>
      `Company-specific resume tailoring engine.\n\n## COMPANY ANGLE (3 bullets)\n## TAILORED RESUME\n## INTERVIEW HOOK (2 sentences)\n## RISK FLAGS`,
    userPrompt: (i) =>
      `COMPANY: ${i.company || "—"}\nROLE: ${i.role || "—"}\n\nJD:\n${i.jd}\n\nRESUME:\n${i.resume}\n\nTailor for this company.`,
    temperature: 0.6,
    maxTokens: 3200,
  },
  "cover-letter": {
    title: "Cover Letter",
    subtitle: "Human, confident, specific — not generic",
    category: "outreach",
    num: "12",
    icon: "✉",
    inputs: [
      { id: "jd", label: "Job Description", placeholder: "Paste the JD.", rows: 10, required: true },
      { id: "resume", label: "Your Resume (optional)", placeholder: "Paste your resume.", rows: 8 },
    ],
    systemPrompt: () =>
      `Write a short, tailored cover letter. Sound HUMAN. Under 300 words. End with confident CTA.`,
    userPrompt: (i) =>
      `JOB DESCRIPTION:\n${i.jd}\n\n${i.resume ? `MY BACKGROUND:\n${i.resume}\n\n` : ""}Write the cover letter now.`,
    temperature: 0.8,
    maxTokens: 900,
  },
  "recruiter-hook": {
    title: "Recruiter Hook",
    subtitle: "LinkedIn/email outreach that gets replies",
    category: "outreach",
    num: "13",
    icon: "✉↗",
    inputs: [
      { id: "jd", label: "Job Post / Role", placeholder: "Paste the job post or describe the role.", rows: 8, required: true },
      { id: "background", label: "Your 1-Line Pitch (optional)", placeholder: 'e.g. "AI Full Stack dev with 5 years..."' },
    ],
    systemPrompt: () =>
      `Write a concise LinkedIn/email message to a recruiter. Under 150 words. Lead with value. No emojis. Output ONLY the message.`,
    userPrompt: (i) =>
      `ROLE:\n${i.jd}\n\nMY BACKGROUND: ${i.background || "See above"}\n\nWrite the recruiter message now.`,
    temperature: 0.8,
    maxTokens: 600,
  },
  "app-pack": {
    title: "Application Pack",
    subtitle: "Full kit: tailored resume + cover + outreach + follow-ups",
    category: "outreach",
    num: "14",
    icon: "📦",
    inputs: [
      { id: "resume", label: "Your Resume", placeholder: "Paste your resume.", rows: 10, required: true },
      { id: "jd", label: "Job Description", placeholder: "Paste the JD.", rows: 10, required: true },
    ],
    systemPrompt: () =>
      `Generate a COMPLETE application pack:\n## TAILORED RESUME\n## COVER LETTER (≤300 words)\n## RECRUITER OUTREACH (≤150 words)\n## FOLLOW-UP MESSAGES (Day 5 + Day 12)\n## "WHY YOU / WHY THIS COMPANY" SCRIPT`,
    userPrompt: (i) =>
      `RESUME:\n${i.resume}\n\nJOB DESCRIPTION:\n${i.jd}\n\nGenerate the full pack now.`,
    temperature: 0.7,
    maxTokens: 3500,
  },
  "role-finder": {
    title: "Role Fit Finder",
    subtitle: "10 roles you might be overlooking",
    category: "strategy",
    num: "15",
    icon: "🎯",
    inputs: [
      { id: "experience", label: "Your Experience & Skills", placeholder: "Paste your resume or describe your background.", rows: 14, required: true },
    ],
    systemPrompt: () =>
      `Career strategist. List 10 overlooked roles with:\n1. Role title\n2. Why they qualify\n3. Hiring demand: HIGH/MEDIUM/LOW\n4. Response likelihood\n5. Positioning tip`,
    userPrompt: (i) => `MY BACKGROUND:\n${i.experience}\n\nList 10 roles now.`,
    temperature: 0.7,
    maxTokens: 2200,
  },
  "app-optimizer": {
    title: "Application Optimizer",
    subtitle: "Smarter job-search strategy (weekly plan)",
    category: "strategy",
    num: "16",
    icon: "📈",
    inputs: [
      { id: "background", label: "Your Background & Target Roles", placeholder: "Describe your background.", rows: 8, required: true },
      { id: "goals", label: "Goals (optional)", placeholder: 'e.g. "Switch to AI/ML roles within 3 months"', rows: 2 },
    ],
    systemPrompt: () =>
      `Job-search strategist. Output:\n## WEEKLY TARGETS\n## CUSTOMIZATION STRATEGY\n## FOLLOW-UP PLAN\n## CHANNEL MIX\n## WEEK-BY-WEEK PLAN`,
    userPrompt: (i) =>
      `BACKGROUND:\n${i.background}\n\n${i.goals ? `GOALS:\n${i.goals}\n\n` : ""}Build my strategy now.`,
    temperature: 0.7,
    maxTokens: 2000,
  },
  prep: {
    title: "Interview Prep Pack",
    subtitle: "12 predicted Qs · STAR answers · power closing questions",
    category: "strategy",
    num: "17",
    icon: "🎤",
    inputs: [
      { id: "company", label: "Company Name (optional)", placeholder: "e.g. Stripe" },
      { id: "jd", label: "Job Description", placeholder: "Paste the JD.", rows: 10, required: true },
      { id: "resume", label: "Resume (optional)", placeholder: "Paste your resume.", rows: 8 },
    ],
    systemPrompt: () =>
      `Build a complete interview prep pack:\n## 12 PREDICTED QUESTIONS\n## SAMPLE STAR ANSWER FOR TOP 5\n## POWER CLOSING QUESTIONS (5)\n## 7-ITEM PREP CHECKLIST`,
    userPrompt: (i) =>
      `${i.company ? `COMPANY: ${i.company}\n` : ""}JOB DESCRIPTION:\n${i.jd}\n\n${i.resume ? `RESUME:\n${i.resume}\n\n` : ""}Build my prep pack now.`,
    temperature: 0.6,
    maxTokens: 3000,
  },
};

export const CATEGORIES = [
  { id: "build", label: "BUILD", num: "1", subtitle: "Create strong foundation", icon: "≡" },
  { id: "analyze", label: "ANALYZE", num: "2", subtitle: "Analyze & improve", icon: "◎" },
  { id: "tailor", label: "TAILOR", num: "3", subtitle: "Tailor for every job", icon: "⊕" },
  { id: "outreach", label: "OUTREACH", num: "4", subtitle: "Stand out to recruiters", icon: "✉" },
  { id: "strategy", label: "STRATEGY", num: "5", subtitle: "Plan & prepare smartly", icon: "✧" },
];

export const PLAN_TOOLS = {
  free: ["builder", "bullet-upgrader", "portfolio", "gap", "quick-achievement", "ats"],
  pro: [
    "builder", "bullet-upgrader", "portfolio", "gap", "quick-achievement",
    "ats", "scan-6sec", "roast", "tailor-jd", "truth-lock", "company-tailor", "cover-letter",
  ],
  premium: Object.keys(TOOLS),
  daypass: Object.keys(TOOLS),
};

export function getToolsByCategory(category: string): ToolConfig[] {
  return Object.values(TOOLS).filter((t) => t.category === category);
}

export function getToolId(tool: ToolConfig): string {
  return Object.entries(TOOLS).find(([, v]) => v === tool)?.[0] || "";
}

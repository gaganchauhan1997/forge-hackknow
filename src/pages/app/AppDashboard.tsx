import { Link } from "react-router";
import { TOOLS, CATEGORIES, PLAN_TOOLS } from "@/lib/tools-config";
import { loadUser, loadResumes } from "@/lib/store";
import { ArrowRight, MoreVertical } from "lucide-react";

const SIDEBAR_TOOL_ICONS: Record<string, string> = {
  builder: "📝", "bullet-upgrader": "✏️", portfolio: "🖼️", gap: "🔄",
  "quick-achievement": "🏆", ats: "📊", "scan-6sec": "⏱️", roast: "🔥",
  "tailor-jd": "🎯", "truth-lock": "🔒", "company-tailor": "🏢",
  "cover-letter": "✉️", "recruiter-hook": "🪝", "app-pack": "📦",
  "role-finder": "🧭", "app-optimizer": "📈", prep: "🎤",
};

const DEMO_RESUMES = [
  { id: "1", title: "Google - SDE Resume", company: "Google", icon: "G", atsScore: 87, editedAt: "2 hours ago", color: "#4285F4" },
  { id: "2", title: "Amazon - PM Resume", company: "Amazon", icon: "a", atsScore: 82, editedAt: "1 day ago", color: "#FF9900" },
  { id: "3", title: "TCS - Developer Resume", company: "TCS", icon: "tcs", atsScore: 75, editedAt: "3 days ago", color: "#0052CC" },
  { id: "4", title: "Marketing Manager Resume", company: "Marketing", icon: "▶", atsScore: 70, editedAt: "5 days ago", color: "#333" },
];

export default function AppDashboard() {
  const user = loadUser();
  const savedResumes = loadResumes();
  const resumes = savedResumes.length > 0 ? savedResumes : DEMO_RESUMES;
  const plan = user.plan || "free";
  const allowedTools = PLAN_TOOLS[plan] || PLAN_TOOLS.free;
  const completedModules = Math.min(allowedTools.length, Object.keys(TOOLS).length);
  const totalModules = Object.keys(TOOLS).length;
  const progressPercent = Math.round((completedModules / totalModules) * 100);
  const resumeScore = plan === "free" ? 78 : plan === "pro" ? 82 : 92;

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="font-oswald text-2xl md:text-3xl font-bold text-white">
          Hi, {user.name || "User"} 👋
        </h1>
        <p className="font-inter text-sm text-white/50 mt-1">
          Let's build your best career version
        </p>
      </div>

      {/* Score + Next Step + Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Resume Score */}
        <div className="bg-[#2a2a2a] border border-white/10 p-5 flex items-center gap-4">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#333" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="#F9FF00"
                strokeWidth="8"
                strokeDasharray={`${resumeScore * 2.64} 264`}
                strokeLinecap="butt"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-oswald text-2xl font-bold text-white">{resumeScore}</span>
              <span className="text-[9px] text-white/40">/100</span>
            </div>
          </div>
          <div>
            <h3 className="font-oswald text-sm font-bold uppercase text-white">Your Resume Score</h3>
            <p className="font-inter text-xs text-white/50 mt-1">
              {resumeScore >= 80 ? "Great! You're ahead of 82% users." : "Good start! Let's make it outstanding."}
            </p>
            <Link to="/app/tool/ats" className="inline-flex items-center gap-1 mt-2 font-oswald text-xs font-bold text-[#1a1a1a] bg-[#F9FF00] px-3 py-1 hover:bg-[#e6e600] transition-colors">
              Improve Score <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Next Recommended Step */}
        <div className="bg-[#2a2a2a] border border-white/10 p-5 flex items-center gap-4">
          <div className="w-16 h-16 bg-[#F9FF00]/10 flex items-center justify-center text-3xl shrink-0">
            📊
          </div>
          <div>
            <p className="text-[10px] text-white/30 font-inter uppercase tracking-wider">Next Recommended Step</p>
            <h3 className="font-oswald text-sm font-bold mt-1 text-white">ATS Career Intelligence</h3>
            <p className="font-inter text-xs text-white/50 mt-0.5">
              {plan === "free"
                ? "Optimize your resume for ATS and get a higher score."
                : "Find missing keywords and improve your ATS score."}
            </p>
            <Link to="/app/tool/ats" className="inline-flex items-center gap-1 mt-2 font-oswald text-xs font-bold text-[#F9FF00] hover:text-white transition-colors">
              Start Now <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Your Progress */}
        <div className="bg-[#2a2a2a] border border-white/10 p-5">
          <h3 className="font-oswald text-sm font-bold uppercase text-white">Your Progress</h3>
          <p className="font-inter text-xs text-white/50 mt-1">
            {completedModules}/{totalModules} Modules Completed
          </p>
          <div className="mt-3 w-full h-3 bg-[#333]">
            <div
              className="h-full bg-[#F9FF00] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="font-inter text-[10px] text-white/40 mt-2">{progressPercent}%</p>
          {progressPercent === 100 && (
            <p className="font-inter text-xs text-[#F9FF00] mt-1">Great job! Keep it up 🚀</p>
          )}
        </div>
      </div>

      {/* All Tools Grid */}
      <div className="mb-8">
        <h2 className="font-oswald text-xl font-bold mb-1 text-white">
          {plan === "pro" ? "Your Pro Tools" : "All Tools"}
        </h2>
        <p className="font-inter text-xs text-white/50 mb-4">
          {plan === "pro"
            ? `${allowedTools.length} powerful tools to build, analyze & tailor your resume`
            : "Choose a category to get started"}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => {
            const toolsInCat = Object.entries(TOOLS).filter(([, t]) => t.category === cat.id);
            return (
              <div key={cat.id} className="bg-[#2a2a2a] border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-[#F9FF00] text-[#1a1a1a] text-xs font-bold shrink-0" style={{ borderRadius: "50%" }}>
                    {cat.num}
                  </span>
                  <div>
                    <h3 className="font-oswald text-xs font-bold uppercase text-white">{cat.label}</h3>
                    <p className="font-inter text-[9px] text-white/40">{cat.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {toolsInCat.map(([id, tool]) => {
                    const locked = !allowedTools.includes(id);
                    return (
                      <Link
                        key={id}
                        to={locked ? "/app/plan" : `/app/tool/${id}`}
                        className={`flex items-center gap-2 text-xs py-1 transition-colors ${
                          locked
                            ? "text-white/20 cursor-not-allowed"
                            : "text-white/70 hover:text-[#F9FF00]"
                        }`}
                      >
                        <span className="text-sm">{SIDEBAR_TOOL_ICONS[id] || tool.icon}</span>
                        <span className="font-inter">{tool.title}</span>
                        {id === "ats" && (
                          <span className="text-[8px] bg-[#F9FF00] text-[#1a1a1a] px-1 font-bold">Free</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Resumes + AI Yahavi */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Recent Resumes */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-oswald text-lg font-bold text-white">Recent Resumes</h2>
            <Link to="/app/resumes" className="font-inter text-xs text-white/50 hover:text-[#F9FF00] flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {resumes.slice(0, 4).map((resume) => (
              <div key={resume.id} className="bg-[#2a2a2a] border border-white/10 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white font-oswald font-bold text-sm"
                    style={{ backgroundColor: ("color" in resume ? (resume as Record<string, string>).color : "#333") || "#333" }}
                  >
                    {("icon" in resume ? (resume as Record<string, string>).icon : resume.company?.[0]) || "R"}
                  </div>
                  <button className="text-white/30 hover:text-white">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <h3 className="font-oswald text-xs font-bold text-white">{resume.title}</h3>
                <p className="font-inter text-[10px] text-white/40 mt-0.5">
                  Edited {("editedAt" in resume ? (resume as Record<string, string>).editedAt : "recently") || "recently"}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-7 h-7 flex items-center justify-center bg-[#F9FF00]/10 text-[10px] font-bold text-[#F9FF00]" style={{ borderRadius: "50%" }}>
                    {resume.atsScore}
                  </div>
                  <div>
                    <span className="font-oswald text-xs font-bold text-white">{resume.atsScore}%</span>
                    <span className="font-inter text-[10px] text-white/40 ml-1">ATS Score</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Yahavi Widget */}
        <div className="bg-[#2a2a2a] border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#F9FF00] flex items-center justify-center text-lg text-[#1a1a1a]" style={{ borderRadius: "50%" }}>
              🤖
            </div>
            <div>
              <h3 className="font-oswald text-sm font-bold text-white">AI Yahavi</h3>
              <p className="text-[9px] text-green-400 font-inter">● Always here to help</p>
            </div>
          </div>

          {!user.loggedIn && (
            <p className="font-inter text-xs text-white/50 mb-3">
              Hi {user.name || "there"}! What would you like to do today?
            </p>
          )}

          <div className="space-y-2">
            {[
              { icon: "✏️", label: "Improve my resume", to: "/app/tool/builder" },
              { icon: "🔍", label: "Analyze my resume", to: "/app/tool/ats" },
              { icon: "🎯", label: "Tailor for a job role", to: "/app/tool/tailor-jd" },
              { icon: "✉️", label: "Write a cover letter", to: "/app/tool/cover-letter" },
              { icon: "🎤", label: "Prepare for interview", to: "/app/tool/prep" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-2 text-xs font-inter py-1.5 text-white/60 hover:text-[#F9FF00] transition-colors"
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            to="/app/yahavi"
            className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 text-xs font-oswald font-bold text-[#F9FF00] hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              🤖 Chat with AI Yahavi
            </span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

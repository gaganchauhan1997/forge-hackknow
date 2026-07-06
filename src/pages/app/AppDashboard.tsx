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
  { id: "4", title: "Marketing Manager Resume", company: "Marketing", icon: "▶", atsScore: 70, editedAt: "5 days ago", color: "#000000" },
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
      <div className="mb-8 border-b-[3px] border-[#000000] pb-6">
        <h1 className="font-oswald text-4xl md:text-6xl font-bold text-[#000000] uppercase tracking-[-0.04em]">
          Hi, {user.name || "User"}
        </h1>
        <p className="font-inter text-xs font-bold uppercase tracking-[0.18em] text-[#000000] mt-3">
          Let's build your best career version
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#F5F0E8] border-2 border-[#000000] p-7 flex items-center gap-5">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#000000" strokeWidth="4" />
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="#D4FF3D"
                strokeWidth="8"
                strokeDasharray={`${resumeScore * 2.64} 264`}
                strokeLinecap="butt"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-oswald text-2xl font-bold text-[#000000]">{resumeScore}</span>
              <span className="text-[9px] font-bold text-[#000000]">/100</span>
            </div>
          </div>
          <div>
            <h3 className="font-oswald text-sm font-bold uppercase text-[#000000]">Your Resume Score</h3>
            <p className="font-inter text-xs text-[#000000] mt-2 leading-relaxed">
              {resumeScore >= 80 ? "Great! You're ahead of 82% users." : "Good start! Let's make it outstanding."}
            </p>
            <Link to="/app/tool/ats" className="inline-flex items-center gap-1 mt-3 font-oswald text-xs font-bold uppercase text-[#000000] bg-[#D4FF3D] px-4 py-2 border-2 border-[#000000] hover:bg-[#BFFF00] transition-colors">
              Improve Score <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        <div className="bg-[#F5F0E8] border-2 border-[#000000] p-7 flex items-center gap-5">
          <div className="w-16 h-16 bg-[#D4FF3D] flex items-center justify-center text-3xl shrink-0 border-2 border-[#000000]">
            📊
          </div>
          <div>
            <p className="text-[10px] text-[#000000] font-inter font-bold uppercase tracking-wider">Next Recommended Step</p>
            <h3 className="font-oswald text-sm font-bold mt-1 text-[#000000]">ATS Career Intelligence</h3>
            <p className="font-inter text-xs text-[#000000] mt-1 leading-relaxed">
              {plan === "free"
                ? "Optimize your resume for ATS and get a higher score."
                : "Find missing keywords and improve your ATS score."}
            </p>
            <Link to="/app/tool/ats" className="inline-flex items-center gap-1 mt-3 font-oswald text-xs font-bold uppercase text-[#000000] hover:text-[#FF0000] transition-colors">
              Start Now <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        <div className="bg-[#F5F0E8] border-2 border-[#000000] p-7">
          <h3 className="font-oswald text-sm font-bold uppercase text-[#000000]">Your Progress</h3>
          <p className="font-inter text-xs font-bold uppercase tracking-wide text-[#000000] mt-2">
            {completedModules}/{totalModules} Modules Completed
          </p>
          <div className="mt-3 w-full h-3 bg-[#000000]/10 border border-[#000000]">
            <div
              className="h-full bg-[#D4FF3D] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="font-inter text-[10px] text-[#000000]/50 mt-2">{progressPercent}%</p>
        </div>
      </div>

      <div className="mb-8 border-t-[3px] border-[#000000] pt-6">
        <h2 className="font-oswald text-3xl md:text-4xl font-bold mb-2 text-[#000000] uppercase tracking-[-0.04em]">
          {plan === "pro" ? "Your Pro Tools" : "All Tools"}
        </h2>
        <p className="font-inter text-xs font-bold uppercase tracking-[0.14em] text-[#000000] mb-5">
          {plan === "pro"
            ? `${allowedTools.length} powerful tools to build, analyze & tailor your resume`
            : "Choose a category to get started"}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => {
            const toolsInCat = Object.entries(TOOLS).filter(([, t]) => t.category === cat.id);
            return (
              <div key={cat.id} className="bg-[#F5F0E8] border-2 border-[#000000] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-[#D4FF3D] text-[#000000] text-xs font-bold shrink-0 border border-[#000000]">
                    {cat.num}
                  </span>
                  <div>
                    <h3 className="font-oswald text-xs font-bold uppercase text-[#000000]">{cat.label}</h3>
                    <p className="font-inter text-[9px] text-[#000000]/50">{cat.subtitle}</p>
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
                            ? "text-[#000000]/30 cursor-not-allowed"
                            : "text-[#000000] hover:text-[#FF0000]"
                        }`}
                      >
                        <span className="text-sm">{SIDEBAR_TOOL_ICONS[id] || tool.icon}</span>
                        <span className="font-inter">{tool.title}</span>
                        {id === "ats" && (
                          <span className="text-[8px] bg-[#D4FF3D] text-[#000000] px-1 font-bold border border-[#000000]">Free</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 border-t-[3px] border-[#000000] pt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-oswald text-3xl font-bold text-[#000000] uppercase tracking-[-0.04em]">Recent Resumes</h2>
            <Link to="/app/resumes" className="font-inter text-xs font-bold uppercase text-[#000000] hover:text-[#FF0000] flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {resumes.slice(0, 4).map((resume) => (
              <div key={resume.id} className="bg-[#F5F0E8] border-2 border-[#000000] p-6">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white font-oswald font-bold text-sm border-2 border-[#000000]"
                    style={{ backgroundColor: resume.color || "#000000" }}
                  >
                    {resume.icon || resume.company?.[0] || "R"}
                  </div>
                  <button className="text-[#000000]/30 hover:text-[#000000]">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <h3 className="font-oswald text-xs font-bold text-[#000000]">{resume.title}</h3>
                <p className="font-inter text-[10px] text-[#000000]/50 mt-0.5">
                  Edited {resume.editedAt || "recently"}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-7 h-7 flex items-center justify-center bg-[#D4FF3D] text-[10px] font-bold text-[#000000] border border-[#000000]">
                    {resume.atsScore}
                  </div>
                  <div>
                    <span className="font-oswald text-xs font-bold text-[#000000]">{resume.atsScore}%</span>
                    <span className="font-inter text-[10px] text-[#000000]/50 ml-1">ATS Score</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#000000] border-2 border-[#000000] p-4 text-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#D4FF3D] flex items-center justify-center text-lg text-[#000000]">
              🤖
            </div>
            <div>
              <h3 className="font-oswald text-sm font-bold">AI Yahavi</h3>
              <p className="text-[9px] text-green-400 font-inter">● Always here to help</p>
            </div>
          </div>

          {!user.loggedIn && (
            <p className="font-inter text-xs text-white/60 mb-3">
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
                className="flex items-center gap-2 text-xs font-inter py-1.5 text-white/70 hover:text-[#D4FF3D] transition-colors"
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            to="/app/yahavi"
            className="flex items-center justify-between mt-4 pt-3 border-t border-white/20 text-xs font-oswald font-bold text-[#D4FF3D] hover:text-white transition-colors"
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

import { useState } from "react";
import { Link } from "react-router";
import { loadResumes } from "@/lib/store";
import { FileText, Plus, MoreVertical } from "lucide-react";

const DEMO_RESUMES = [
  { id: "1", title: "Google - SDE Resume", company: "Google", icon: "G", atsScore: 87, editedAt: "2 hours ago", color: "#4285F4", content: "" },
  { id: "2", title: "Amazon - PM Resume", company: "Amazon", icon: "a", atsScore: 82, editedAt: "1 day ago", color: "#FF9900", content: "" },
  { id: "3", title: "TCS - Developer Resume", company: "TCS", icon: "tcs", atsScore: 75, editedAt: "3 days ago", color: "#0052CC", content: "" },
  { id: "4", title: "Marketing Manager Resume", company: "Marketing", icon: "▶", atsScore: 70, editedAt: "5 days ago", color: "#1a1a1a", content: "" },
];

export default function AppResumes() {
  const saved = loadResumes();
  const resumes = saved.length > 0 ? saved : DEMO_RESUMES;

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-oswald text-2xl font-bold">My Resumes</h1>
          <p className="font-inter text-sm text-[#1a1a1a]/60 mt-1">
            {resumes.length} resume{resumes.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        <Link
          to="/app/tool/builder"
          className="flex items-center gap-2 bg-[#F9FF00] text-[#1a1a1a] px-4 py-2 font-oswald text-xs font-bold uppercase hover:bg-[#e6e600] transition-colors"
        >
          <Plus size={14} /> New Resume
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {resumes.map((resume) => (
          <div key={resume.id} className="bg-white border-2 border-[#1a1a1a]/10 p-4 hover:border-[#F9FF00] transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 flex items-center justify-center text-white font-oswald font-bold"
                style={{ backgroundColor: ("color" in resume ? (resume as Record<string, string>).color : "#1a1a1a") || "#1a1a1a" }}
              >
                {("icon" in resume ? (resume as Record<string, string>).icon : resume.company?.[0]) || "R"}
              </div>
              <button className="text-[#1a1a1a]/30 hover:text-[#1a1a1a]">
                <MoreVertical size={16} />
              </button>
            </div>
            <h3 className="font-oswald text-sm font-bold">{resume.title}</h3>
            <p className="font-inter text-[10px] text-[#1a1a1a]/50 mt-1">
              Edited {("editedAt" in resume ? (resume as Record<string, string>).editedAt : "recently") || "recently"}
            </p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1a1a1a]/5">
              <div
                className="w-8 h-8 flex items-center justify-center text-[10px] font-bold"
                style={{
                  borderRadius: "50%",
                  backgroundColor:
                    resume.atsScore >= 80 ? "#F9FF0030" : resume.atsScore >= 60 ? "#FFA50030" : "#FF000430",
                }}
              >
                {resume.atsScore}
              </div>
              <div>
                <span className="font-oswald text-xs font-bold">{resume.atsScore}%</span>
                <span className="font-inter text-[10px] text-[#1a1a1a]/50 ml-1">ATS Score</span>
              </div>
            </div>
          </div>
        ))}

        {/* Add new card */}
        <Link
          to="/app/tool/builder"
          className="border-2 border-dashed border-[#1a1a1a]/20 p-8 flex flex-col items-center justify-center text-center hover:border-[#F9FF00] transition-colors min-h-[180px]"
        >
          <Plus size={24} className="text-[#1a1a1a]/20 mb-2" />
          <span className="font-oswald text-xs font-bold uppercase text-[#1a1a1a]/40">
            Create New Resume
          </span>
        </Link>
      </div>
    </div>
  );
}

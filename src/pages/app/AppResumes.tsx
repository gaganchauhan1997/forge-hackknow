import { Link } from "react-router";
import { loadResumes } from "@/lib/store";
import { Plus, MoreVertical } from "lucide-react";

const DEMO_RESUMES = [
  { id: "1", title: "Google - SDE Resume", company: "Google", icon: "G", atsScore: 87, editedAt: "2 hours ago", color: "#4285F4", content: "" },
  { id: "2", title: "Amazon - PM Resume", company: "Amazon", icon: "a", atsScore: 82, editedAt: "1 day ago", color: "#FF9900", content: "" },
  { id: "3", title: "TCS - Developer Resume", company: "TCS", icon: "tcs", atsScore: 75, editedAt: "3 days ago", color: "#0052CC", content: "" },
  { id: "4", title: "Marketing Manager Resume", company: "Marketing", icon: "▶", atsScore: 70, editedAt: "5 days ago", color: "#000000", content: "" },
];

export default function AppResumes() {
  const saved = loadResumes();
  const resumes = saved.length > 0 ? saved : DEMO_RESUMES;

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-oswald text-2xl font-bold text-[#000000] uppercase">My Resumes</h1>
          <p className="font-inter text-sm text-[#000000]/60 mt-1">
            {resumes.length} resume{resumes.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        <Link
          to="/app/tool/builder"
          className="flex items-center gap-2 bg-[#D4FF3D] text-[#000000] px-4 py-2 font-oswald text-xs font-bold uppercase border-2 border-[#000000] hover:bg-[#BFFF00] transition-colors"
        >
          <Plus size={14} /> New Resume
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {resumes.map((resume) => (
          <div key={resume.id} className="bg-[#F5F0E8] border-2 border-[#000000] p-4 hover:border-[#D4FF3D] transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 flex items-center justify-center text-white font-oswald font-bold border-2 border-[#000000]"
                style={{ backgroundColor: resume.color || "#000000" }}
              >
                {resume.icon || resume.company?.[0] || "R"}
              </div>
              <button className="text-[#000000]/30 hover:text-[#000000]">
                <MoreVertical size={16} />
              </button>
            </div>
            <h3 className="font-oswald text-sm font-bold text-[#000000]">{resume.title}</h3>
            <p className="font-inter text-[10px] text-[#000000]/50 mt-1">
              Edited {resume.editedAt || "recently"}
            </p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t-2 border-[#000000]/10">
              <div
                className="w-8 h-8 flex items-center justify-center text-[10px] font-bold text-[#000000] bg-[#D4FF3D] border border-[#000000]"
               
              >
                {resume.atsScore}
              </div>
              <div>
                <span className="font-oswald text-xs font-bold text-[#000000]">{resume.atsScore}%</span>
                <span className="font-inter text-[10px] text-[#000000]/50 ml-1">ATS Score</span>
              </div>
            </div>
          </div>
        ))}

        <Link
          to="/app/tool/builder"
          className="border-2 border-dashed border-[#000000]/30 p-8 flex flex-col items-center justify-center text-center hover:border-[#D4FF3D] transition-colors min-h-[180px]"
        >
          <Plus size={24} className="text-[#000000]/20 mb-2" />
          <span className="font-oswald text-xs font-bold uppercase text-[#000000]/40">
            Create New Resume
          </span>
        </Link>
      </div>
    </div>
  );
}

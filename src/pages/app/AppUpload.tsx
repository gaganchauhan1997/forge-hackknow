import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, FileText } from "lucide-react";

export default function AppUpload() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-24 md:pb-8 max-w-2xl mx-auto">
      <h1 className="font-oswald text-2xl font-bold mb-2 text-white">Upload Resume</h1>
      <p className="font-inter text-sm text-white/50 mb-6">
        Paste your resume text below, then use any tool to enhance it.
      </p>

      <div className="bg-[#2a2a2a] border border-white/10 p-6">
        <div className="border border-dashed border-white/20 p-8 text-center mb-4 hover:border-[#F9FF00] transition-colors cursor-pointer">
          <Upload size={32} className="mx-auto text-white/20 mb-3" />
          <p className="font-oswald text-sm font-bold uppercase mb-1 text-white">
            Drag & drop your resume
          </p>
          <p className="font-inter text-[10px] text-white/30">
            PDF, DOCX, or TXT · Or paste text below
          </p>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Or paste your resume text here..."
          rows={12}
          className="w-full border border-white/20 bg-[#1a1a1a] text-white px-3 py-2 font-inter text-sm resize-vertical focus:border-[#F9FF00] outline-none placeholder:text-white/30"
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigate("/app/tool/builder")}
            className="flex items-center gap-2 bg-[#F9FF00] text-[#1a1a1a] px-4 py-2 font-oswald text-xs font-bold uppercase hover:bg-[#e6e600] transition-colors"
          >
            <FileText size={14} /> Build Resume
          </button>
          <button
            onClick={() => navigate("/app/tool/ats")}
            className="flex items-center gap-2 border border-white/20 text-white/60 px-4 py-2 font-oswald text-xs font-bold uppercase hover:border-[#F9FF00] hover:text-[#F9FF00] transition-colors"
          >
            Analyze ATS Score
          </button>
        </div>
      </div>
    </div>
  );
}

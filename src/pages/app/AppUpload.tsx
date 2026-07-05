import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, FileText } from "lucide-react";

export default function AppUpload() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-24 md:pb-8 max-w-2xl mx-auto">
      <h1 className="font-oswald text-2xl font-bold mb-2">Upload Resume</h1>
      <p className="font-inter text-sm text-[#1a1a1a]/60 mb-6">
        Paste your resume text below, then use any tool to enhance it.
      </p>

      <div className="bg-white border-2 border-[#1a1a1a]/10 p-6">
        <div className="border-2 border-dashed border-[#1a1a1a]/20 p-8 text-center mb-4 hover:border-[#F9FF00] transition-colors cursor-pointer">
          <Upload size={32} className="mx-auto text-[#1a1a1a]/20 mb-3" />
          <p className="font-oswald text-sm font-bold uppercase mb-1">
            Drag & drop your resume
          </p>
          <p className="font-inter text-[10px] text-[#1a1a1a]/40">
            PDF, DOCX, or TXT · Or paste text below
          </p>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Or paste your resume text here..."
          rows={12}
          className="w-full border-2 border-[#1a1a1a]/20 px-3 py-2 font-inter text-sm resize-vertical focus:border-[#F9FF00] outline-none"
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
            className="flex items-center gap-2 border-2 border-[#1a1a1a]/20 px-4 py-2 font-oswald text-xs font-bold uppercase hover:border-[#F9FF00] transition-colors"
          >
            Analyze ATS Score
          </button>
        </div>
      </div>
    </div>
  );
}

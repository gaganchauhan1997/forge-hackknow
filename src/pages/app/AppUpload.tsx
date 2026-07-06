import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, FileText } from "lucide-react";

export default function AppUpload() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 lg:p-8 pb-24 md:pb-8 max-w-2xl mx-auto">
      <h1 className="font-oswald text-2xl font-bold mb-2 text-[#000000] uppercase">Upload Resume</h1>
      <p className="font-inter text-sm text-[#000000]/60 mb-6">
        Paste your resume text below, then use any tool to enhance it.
      </p>

      <div className="bg-[#F5F0E8] border-2 border-[#000000] p-6">
        <div className="border-2 border-dashed border-[#000000]/30 p-8 text-center mb-4 hover:border-[#D4FF3D] transition-colors cursor-pointer">
          <Upload size={32} className="mx-auto text-[#000000]/20 mb-3" />
          <p className="font-oswald text-sm font-bold uppercase mb-1 text-[#000000]">
            Drag & drop your resume
          </p>
          <p className="font-inter text-[10px] text-[#000000]/40">
            PDF, DOCX, or TXT · Or paste text below
          </p>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Or paste your resume text here..."
          rows={12}
          className="w-full border-2 border-[#000000] px-3 py-2 font-inter text-sm resize-vertical focus:border-[#D4FF3D] outline-none placeholder:text-[#000000]/30"
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigate("/app/tool/builder")}
            className="flex items-center gap-2 bg-[#D4FF3D] text-[#000000] px-4 py-2 font-oswald text-xs font-bold uppercase border-2 border-[#000000] hover:bg-[#BFFF00] transition-colors"
          >
            <FileText size={14} /> Build Resume
          </button>
          <button
            onClick={() => navigate("/app/tool/ats")}
            className="flex items-center gap-2 border-2 border-[#000000] text-[#000000] px-4 py-2 font-oswald text-xs font-bold uppercase hover:bg-[#D4FF3D] transition-colors"
          >
            Analyze ATS Score
          </button>
        </div>
      </div>
    </div>
  );
}

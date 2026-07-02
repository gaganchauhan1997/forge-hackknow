import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const scrollToInquiry = () => {
    const el = document.getElementById("inquiry");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 border-b-[3px] border-black pt-16 md:pt-0">
      {/* Left Column - Text */}
      <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 md:py-0 border-r-[3px] border-black">
        <div className="max-w-xl">
          <div className="mb-6">
            <span className="inline-block bg-[#F9FF00] px-3 py-1 font-oswald text-xs font-bold uppercase tracking-widest border-[3px] border-black">
              AI Resume Builder & Career Toolkit
            </span>
          </div>
          <h1 className="font-oswald text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-[0.95] tracking-[-0.03em] mb-8 text-[#1a1a1a]">
            LAND YOUR DREAM JOB WITH AI-POWERED RESUME BUILDING
          </h1>
          <p className="font-inter text-sm md:text-base leading-relaxed mb-8 text-[#1a1a1a]/80 max-w-md">
            Build beautiful, ATS-optimized resumes, cover letters, and
            portfolios using AI. Export instantly in professional formats
            trusted by recruiters.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToInquiry}
              className="btn-brutal btn-brutal-yellow flex items-center gap-2 group"
            >
              CREATE RESUME
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("portfolio");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-brutal btn-brutal-black flex items-center gap-2"
            >
              VIEW TEMPLATES
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-0 mt-12 border-[3px] border-black">
            <div className="border-r-[3px] border-black px-4 py-4 text-center">
              <div className="font-oswald text-2xl md:text-3xl font-bold">20+</div>
              <div className="font-inter text-[10px] uppercase tracking-widest mt-1">Resume Templates</div>
            </div>
            <div className="border-r-[3px] border-black px-4 py-4 text-center">
              <div className="font-oswald text-2xl md:text-3xl font-bold">ATS</div>
              <div className="font-inter text-[10px] uppercase tracking-widest mt-1">Optimized</div>
            </div>
            <div className="px-4 py-4 text-center">
              <div className="font-oswald text-2xl md:text-3xl font-bold">AI</div>
              <div className="font-inter text-[10px] uppercase tracking-widest mt-1">Powered</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-0 mt-[-3px] border-[3px] border-black">
            <div className="border-r-[3px] border-black px-4 py-4 text-center">
              <div className="font-oswald text-2xl md:text-3xl font-bold">17+</div>
              <div className="font-inter text-[10px] uppercase tracking-widest mt-1">AI Tools</div>
            </div>
            <div className="border-r-[3px] border-black px-4 py-4 text-center">
              <div className="font-oswald text-2xl md:text-3xl font-bold">5</div>
              <div className="font-inter text-[10px] uppercase tracking-widest mt-1">Categories</div>
            </div>
            <div className="px-4 py-4 text-center">
              <div className="font-oswald text-2xl md:text-3xl font-bold">&lt;2min</div>
              <div className="font-inter text-[10px] uppercase tracking-widest mt-1">Build Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Video */}
      <div className="relative min-h-[50vh] md:min-h-screen bg-[#1a1a1a] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={import.meta.env.BASE_URL + "hero-video.mp4"}
          muted
          loop
          playsInline
          autoPlay
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="bg-[#F9FF00] border-[3px] border-black p-4 inline-block">
            <span className="font-oswald text-sm font-bold uppercase tracking-widest">
              NOW ACCEPTING COMMISSIONS — Q2 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

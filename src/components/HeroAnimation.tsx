import { useEffect, useRef, useState } from "react";

export function HeroAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = () => {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked — poster stays visible
      });
    };

    // Start video after page becomes interactive
    if (document.readyState === "complete") {
      startPlayback();
    } else {
      window.addEventListener("load", startPlayback, { once: true });
      return () => window.removeEventListener("load", startPlayback);
    }
  }, []);

  return (
    <div className="relative w-full h-full min-h-[50vh] md:min-h-0 overflow-hidden">
      {/* Poster shown immediately — no layout shift */}
      <img
        src={`${import.meta.env.BASE_URL}forge-hero-poster.webp`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "translateZ(0)" }}
      />
      {/* Video fades in over poster */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full"
        muted
        loop
        playsInline
        preload="metadata"
        poster={`${import.meta.env.BASE_URL}forge-hero-poster.webp`}
        style={{
          objectFit: "cover",
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          opacity: isPlaying ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <source src={`${import.meta.env.BASE_URL}forge-hero.webm`} type="video/webm" />
        <source src={`${import.meta.env.BASE_URL}forge-hero.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}

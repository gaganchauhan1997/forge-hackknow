export function HeroAnimation() {
  return (
    <div className="relative w-full h-full min-h-[50vh] md:min-h-0 bg-[#1a1a1a] overflow-hidden flex items-center justify-center">
      <video
        className="w-full h-full object-contain md:object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={`${import.meta.env.BASE_URL}forge-hero-poster.jpg`}
      >
        <source src={`${import.meta.env.BASE_URL}forge-hero.webm`} type="video/webm" />
        <source src={`${import.meta.env.BASE_URL}forge-hero.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}

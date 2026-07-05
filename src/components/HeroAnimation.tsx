export function HeroAnimation() {
  return (
    <div className="relative w-full h-full min-h-[50vh] md:min-h-0 bg-[#FFFDE0] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,255,0,0.22),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(255,0,4,0.1),transparent_28%)]" />
      <div className="relative w-full h-full aspect-video md:aspect-auto md:min-h-full">
        <video
          className="absolute inset-0 h-full w-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={`${import.meta.env.BASE_URL}forge-hero.webm`} type="video/webm" />
          <source src={`${import.meta.env.BASE_URL}forge-hero.mp4`} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

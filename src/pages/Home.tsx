import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { Portfolio } from "@/sections/Portfolio";
import { Process } from "@/sections/Process";
import { Roster } from "@/sections/Roster";
import { Pricing } from "@/sections/Pricing";
import { InquiryForm } from "@/sections/InquiryForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Portfolio />
      <Process />
      <Roster />
      <Pricing />
      <InquiryForm />

      <Footer />
    </div>
  );
}

import { Benefits } from "@/components/home/Benefits";
import { CTA } from "@/components/home/CTA";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StatsBand } from "@/components/home/StatsBand";
import { SupportedCrops } from "@/components/home/SupportedCrops";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <StatsBand />
      <Features />
      <HowItWorks />
      <SupportedCrops />
      <Benefits />
      <CTA />
    </div>
  );
}

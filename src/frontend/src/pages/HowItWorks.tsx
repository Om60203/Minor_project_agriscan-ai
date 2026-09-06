import { FeatureCard } from "@/components/info/FeatureCard";
import { PageHero } from "@/components/info/PageHero";
import {
  StepTimeline,
  type TimelineStep,
} from "@/components/info/StepTimeline";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Camera,
  Cpu,
  ScanSearch,
  Sparkles,
  Stethoscope,
  Timer,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const STEPS: TimelineStep[] = [
  {
    step: "01",
    title: "Upload or Capture",
    description:
      "Take a clear photo of the affected leaf with your phone camera, or upload an image from your gallery. Make sure the leaf fills the frame and is well lit for the best result.",
    icon: Camera,
    accent: "primary",
  },
  {
    step: "02",
    title: "AI Analyzes",
    description:
      "Our AI model examines the leaf in seconds, looking for visual signs of disease across dozens of crops. No waiting, no lab visits — the analysis happens instantly.",
    icon: Cpu,
    accent: "primary",
  },
  {
    step: "03",
    title: "Disease Detected",
    description:
      "AgriScan AI identifies the disease with a confidence score and explains what it found in simple, easy-to-understand language — in Hindi or English.",
    icon: ScanSearch,
    accent: "accent",
  },
  {
    step: "04",
    title: "Get Treatment",
    description:
      "Receive clear, practical treatment recommendations — from organic remedies to the right fungicides — so you can act fast and protect your harvest.",
    icon: Stethoscope,
    accent: "accent",
  },
];

const HIGHLIGHTS = [
  {
    icon: Timer,
    title: "Results in seconds",
    description:
      "Skip the wait. Get an accurate diagnosis in under 30 seconds, right from your field.",
  },
  {
    icon: Zap,
    title: "Easy for every farmer",
    description:
      "No technical knowledge needed. Just point, shoot, and read the answer in your own language.",
  },
  {
    icon: Sparkles,
    title: "Actionable advice",
    description:
      "Every diagnosis comes with clear next steps so you know exactly what to do next.",
  },
];

export default function HowItWorks() {
  return (
    <div>
      <PageHero
        eyebrow="How It Works"
        title={
          <>
            From leaf photo to treatment in{" "}
            <span className="text-gradient">four simple steps</span>
          </>
        }
        description="AgriScan AI makes crop disease detection fast, accurate, and effortless. Here's exactly how it works — no training, no jargon, just results."
      >
        <Link to="/scan">
          <Button
            className="bg-gradient-primary rounded-full px-6 shadow-subtle transition-smooth hover:shadow-elevated"
            data-ocid="howitworks.scan_cta"
          >
            <Camera className="size-4" />
            Scan a Leaf
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </PageHero>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold">
            The Process
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Four steps to a healthier crop
          </h2>
          <p className="mt-4 text-muted-foreground">
            A simple, guided flow that turns a single photo into a confident
            diagnosis and a clear treatment plan.
          </p>
        </motion.div>

        <StepTimeline steps={STEPS} />
      </section>

      {/* Highlights */}
      <section className="bg-gradient-subtle">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Why farmers love AgriScan AI
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built around the real needs of farmers, so the technology works
              for you — not the other way around.
            </p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HIGHLIGHTS.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass glow-primary relative overflow-hidden rounded-3xl p-10 text-center sm:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full bg-accent/20 blur-3xl"
          />
          <h2 className="font-display relative text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to protect your harvest?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
            Scan your first leaf today and see how fast, accurate, and easy crop
            disease detection can be.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/scan">
              <Button
                className="bg-gradient-primary rounded-full px-6 shadow-subtle transition-smooth hover:shadow-elevated"
                data-ocid="howitworks.cta_scan"
              >
                <Camera className="size-4" />
                Scan Now
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                className="rounded-full px-6"
                data-ocid="howitworks.cta_about"
              >
                Learn About Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

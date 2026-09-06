import { FeatureCard } from "@/components/info/FeatureCard";
import { PageHero } from "@/components/info/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  Camera,
  Eye,
  Globe2,
  HeartHandshake,
  Leaf,
  LineChart,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Making crop disease detection faster, smarter, and accessible for every farmer using AI.",
    accent: "primary" as const,
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "A world where no harvest is lost to a preventable disease — where every farmer has a smart assistant in their pocket.",
    accent: "accent" as const,
  },
];

const TECH = [
  {
    icon: BrainCircuit,
    title: "AI-powered detection",
    description:
      "Advanced computer-vision models trained on thousands of crop images to spot disease signs accurately.",
  },
  {
    icon: Camera,
    title: "Instant photo analysis",
    description:
      "Just snap a leaf photo and get a diagnosis in seconds — no lab, no waiting, no guesswork.",
  },
  {
    icon: Globe2,
    title: "Built for local farmers",
    description:
      "Answers in Hindi and English, designed for the way farmers actually work in the field.",
  },
  {
    icon: ShieldCheck,
    title: "Trustworthy guidance",
    description:
      "Every recommendation is grounded in plant science and clearly explained, so you can act with confidence.",
  },
];

const BENEFITS = [
  {
    icon: LineChart,
    title: "Save your harvest",
    description:
      "Catch diseases early and act before they spread across your field.",
  },
  {
    icon: HeartHandshake,
    title: "Save time & money",
    description:
      "Avoid costly crop loss and unnecessary pesticide use with precise, targeted advice.",
  },
  {
    icon: Sparkles,
    title: "Grow with confidence",
    description:
      "Learn what's affecting your plants and how to treat it — in language you understand.",
  },
  {
    icon: Leaf,
    title: "Sustainable farming",
    description:
      "Use the right treatment at the right time, protecting your soil and the environment.",
  },
];

export default function About() {
  return (
    <div>
      <PageHero
        eyebrow="About AgriScan AI"
        title={
          <>
            Empowering every farmer with{" "}
            <span className="text-gradient">the power of AI</span>
          </>
        }
        description="We're on a mission to make crop disease detection faster, smarter, and accessible for every farmer — using the latest in artificial intelligence."
      >
        <Link to="/scan">
          <Button
            className="bg-gradient-primary rounded-full px-6 shadow-subtle transition-smooth hover:shadow-elevated"
            data-ocid="about.scan_cta"
          >
            <Camera className="size-4" />
            Try It Free
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </PageHero>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {VALUES.map((value) => (
            <FeatureCard key={value.title} {...value} />
          ))}
        </div>
      </section>

      {/* Technology */}
      <section className="bg-gradient-subtle">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold">
              The Technology
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Cutting-edge AI, made simple
            </h2>
            <p className="mt-4 text-muted-foreground">
              Behind the simple interface is powerful technology that works hard
              so you don't have to.
            </p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TECH.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What you gain
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real, practical benefits that make a difference in your field and
            your pocket.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
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
            Join us in protecting our farms
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
            Start scanning today and see how AI can help you grow healthier,
            stronger crops.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/scan">
              <Button
                className="bg-gradient-primary rounded-full px-6 shadow-subtle transition-smooth hover:shadow-elevated"
                data-ocid="about.cta_scan"
              >
                <Camera className="size-4" />
                Scan a Leaf
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button
                variant="outline"
                className="rounded-full px-6"
                data-ocid="about.cta_how"
              >
                See How It Works
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

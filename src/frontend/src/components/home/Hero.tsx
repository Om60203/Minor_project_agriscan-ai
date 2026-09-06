import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ScanLine, Upload } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="bg-ambient relative overflow-hidden">
      {/* Ambient background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-gradient-primary absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]" />
        <div className="absolute right-[-10%] top-1/3 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
        {/* Drifting leaf glow orbs */}
        <div className="animate-drift absolute left-[6%] top-24 h-40 w-40 rounded-full bg-primary/15 blur-[80px]" />
        <div
          className="animate-drift absolute bottom-16 right-[8%] h-52 w-52 rounded-full bg-accent/15 blur-[90px]"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left"
        >
          <span className="glass-strong inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-primary shadow-subtle">
            <span className="animate-pulse-ring size-2 rounded-full bg-primary" />
            AI-Powered Crop Care
          </span>

          <h1 className="font-display mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Detect Crop Diseases with the{" "}
            <span className="text-gradient">Power of AI</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0">
            Upload a photo of a leaf and get an instant, accurate diagnosis in
            seconds. Protect your harvest with personalized treatment guidance —
            in your language, made for farmers.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link to="/scan" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-gradient-primary w-full rounded-full px-7 shadow-subtle transition-smooth hover:shadow-elevated-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
                data-ocid="home.upload_button"
              >
                <Upload className="size-4" />
                Upload Leaf Image
              </Button>
            </Link>
            <Link to="/scan" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="glass w-full rounded-full px-7 transition-smooth hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
                data-ocid="home.scan_button"
              >
                <ScanLine className="size-4" />
                Scan Now
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Free to start · No sign-up needed · Works in Hindi &amp; English
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="animate-float relative">
            <div className="glow-leaf overflow-hidden rounded-[2rem]">
              <img
                src="/assets/generated/hero-leaf-scan.dim_800x800.png"
                alt="A vibrant green leaf centered in a glowing neon-green AI scanning interface with data readouts, set against a dark forest background"
                className="h-auto w-full object-cover"
                loading="eager"
              />
            </div>
            {/* Floating scan progress chip */}
            <div className="glass-strong absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3 shadow-elevated-lg">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-primary" />
              </span>
              <div className="text-left">
                <p className="font-display text-sm font-semibold">
                  Analyzing leaf…
                </p>
                <p className="text-xs text-muted-foreground">
                  Disease detected in 2.4s
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

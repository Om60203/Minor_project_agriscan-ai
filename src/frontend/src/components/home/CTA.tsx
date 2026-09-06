import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ScanLine } from "lucide-react";
import { motion } from "motion/react";

export function CTA() {
  return (
    <section className="bg-ambient relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-forest relative overflow-hidden rounded-[2rem] px-6 py-16 text-center shadow-elevated-lg glow-leaf sm:px-12 lg:py-20"
          data-ocid="home.cta"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-white/20 blur-[100px]"
          />
          <div
            aria-hidden
            className="animate-drift pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-accent/20 blur-[90px]"
          />
          <div
            aria-hidden
            className="animate-drift pointer-events-none absolute -right-10 top-8 h-48 w-48 rounded-full bg-primary/25 blur-[80px]"
            style={{ animationDelay: "-7s" }}
          />
          <div className="relative">
            <h2 className="font-display mx-auto max-w-2xl text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              Ready to protect your harvest?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
              Scan your first leaf today and see the power of AI crop care for
              yourself. It's fast, free, and easy.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/scan" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full rounded-full bg-primary-foreground px-8 text-primary shadow-subtle transition-smooth hover:shadow-elevated-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
                  data-ocid="home.cta.scan_button"
                >
                  <ScanLine className="size-4" />
                  Scan Now
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-5 text-sm text-primary-foreground/75">
              No sign-up required · Works on any phone
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "primary" | "accent";
}

interface StepTimelineProps {
  steps: TimelineStep[];
}

export function StepTimeline({ steps }: StepTimelineProps) {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Connecting line (desktop vertical) */}
      <div
        aria-hidden
        className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-primary/40 via-border to-accent/40 md:left-1/2 md:block"
      />
      <ol className="space-y-10 md:space-y-16">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLeft = index % 2 === 0;
          return (
            <motion.li
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative md:grid md:grid-cols-2 md:gap-16"
            >
              {/* Node */}
              <div
                aria-hidden
                className="absolute left-6 top-2 z-10 -translate-x-1/2 md:left-1/2"
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-2xl shadow-elevated ring-4 ring-background",
                    step.accent === "primary"
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground",
                  )}
                >
                  <Icon className="size-6" />
                </span>
              </div>

              {/* Card */}
              <div
                className={cn(
                  "ml-16 md:ml-0",
                  isLeft ? "md:col-start-1 md:pr-4" : "md:col-start-2 md:pl-4",
                )}
              >
                <div className="glass rounded-2xl p-6 shadow-subtle transition-smooth hover:shadow-elevated">
                  <span
                    className={cn(
                      "font-mono text-xs font-semibold uppercase tracking-widest",
                      step.accent === "primary"
                        ? "text-primary"
                        : "text-accent",
                    )}
                  >
                    Step {step.step}
                  </span>
                  <h3 className="font-display mt-2 text-xl font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

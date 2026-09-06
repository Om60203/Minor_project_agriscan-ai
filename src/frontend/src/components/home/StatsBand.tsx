import { motion } from "motion/react";

const STATS = [
  { value: "1M+", label: "Scans Completed" },
  { value: "50+", label: "Crops Covered" },
  { value: "97.8%", label: "Diagnosis Accuracy" },
] as const;

export function StatsBand() {
  return (
    <section className="relative py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong grid grid-cols-1 gap-px overflow-hidden rounded-3xl shadow-elevated-lg"
        >
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="animate-card-swipe flex flex-col items-center gap-1 px-6 py-8 text-center"
              style={{ animationDelay: `${index * 0.12}s` }}
              data-ocid={`home.stat.${stat.label.toLowerCase().replace(/\s+/g, "_")}`}
            >
              <span className="font-display text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

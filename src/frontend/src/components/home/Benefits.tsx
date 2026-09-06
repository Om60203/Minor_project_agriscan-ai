import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const BENEFITS = [
  {
    title: "Save time & money",
    description:
      "Catch diseases early before they spread and destroy your entire crop — reducing losses and input costs.",
  },
  {
    title: "No expert needed",
    description:
      "Get professional-grade advice instantly, even in remote areas with no access to agricultural experts.",
  },
  {
    title: "Works in your language",
    description:
      "Clear guidance in Hindi and Hinglish, so every farmer can understand and act with confidence.",
  },
  {
    title: "Always improving",
    description:
      "Our AI learns from every scan, getting smarter and more accurate with each diagnosis.",
  },
] as const;

export function Benefits() {
  return (
    <section className="bg-ambient-dark relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-[110px]"
        style={{ animationDelay: "-2s" }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why Farmers Choose Us
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Real benefits for real harvests
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              AgriScan AI puts the power of a crop specialist in your pocket —
              accessible, affordable, and always available.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.08,
                }}
                className="glass-strong animate-card-swipe rounded-3xl p-6 shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated-lg focus-within:ring-2 focus-within:ring-ring"
                style={{ animationDelay: `${index * 0.08}s` }}
                data-ocid={`home.benefit.${index + 1}`}
              >
                <CheckCircle2 className="size-7 text-primary" />
                <h3 className="font-display mt-4 text-lg font-semibold tracking-tight">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

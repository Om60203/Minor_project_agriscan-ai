import { BrainCircuit, Mic, Sprout } from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "Instant AI Diagnosis",
    description:
      "Snap a photo of any leaf and get a precise disease identification in seconds, with confidence scores and clear explanations.",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    description:
      "Just talk to the app in Hindi or Hinglish. Ask about your crops and get spoken, easy-to-understand answers — no typing needed.",
    accent: "from-accent/20 to-accent/5",
  },
  {
    icon: Sprout,
    title: "Personalized Treatment Guidance",
    description:
      "Receive step-by-step treatment plans tailored to your crop, your region, and the specific disease affecting your harvest.",
    accent: "from-chart-4/20 to-chart-4/5",
  },
] as const;

export function Features() {
  return (
    <section className="bg-ambient relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Why AgriScan AI
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to protect your harvest
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Powerful AI tools designed for real farmers — simple to use, built
            for the field.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1,
              }}
              className="glass-strong group relative overflow-hidden rounded-3xl p-8 shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated-lg focus-within:ring-2 focus-within:ring-ring"
              data-ocid={`home.feature.${index + 1}`}
            >
              <div
                aria-hidden
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${feature.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <span className="bg-gradient-primary inline-flex size-14 items-center justify-center rounded-2xl shadow-subtle transition-smooth group-hover:scale-110">
                <feature.icon className="size-7 text-primary-foreground" />
              </span>
              <h3 className="font-display mt-6 text-xl font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

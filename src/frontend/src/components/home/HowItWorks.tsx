import { Camera, MessageSquareText, ScanSearch, Sprout } from "lucide-react";
import { motion } from "motion/react";

const STEPS = [
  {
    icon: Camera,
    step: "01",
    title: "Upload a photo",
    description:
      "Take a clear photo of the affected leaf with your phone camera and upload it.",
  },
  {
    icon: ScanSearch,
    step: "02",
    title: "AI analyzes it",
    description:
      "Our AI instantly scans the leaf and identifies the disease with high accuracy.",
  },
  {
    icon: MessageSquareText,
    step: "03",
    title: "Get your diagnosis",
    description:
      "Receive a clear, easy-to-understand result with confidence score and details.",
  },
  {
    icon: Sprout,
    step: "04",
    title: "Treat & protect",
    description:
      "Follow the personalized treatment plan to save your crop and prevent spread.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="bg-ambient-dark relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-accent/10 blur-[110px]"
        style={{ animationDelay: "-4s" }}
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
            How It Works
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From photo to protection in 4 simple steps
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            No complicated setup. Just scan, learn, and act.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1,
              }}
              className="glass-strong animate-card-swipe relative rounded-3xl p-7 shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated-lg focus-within:ring-2 focus-within:ring-ring"
              style={{ animationDelay: `${index * 0.12}s` }}
              data-ocid={`home.step.${index + 1}`}
            >
              <span className="font-display absolute right-6 top-6 text-4xl font-bold text-primary/15">
                {step.step}
              </span>
              <span className="bg-gradient-primary inline-flex size-12 items-center justify-center rounded-2xl shadow-subtle transition-smooth group-hover:scale-110">
                <step.icon className="size-6 text-primary-foreground" />
              </span>
              <h3 className="font-display mt-5 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

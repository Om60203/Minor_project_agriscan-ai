import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: "primary" | "accent";
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  accent = "primary",
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass group rounded-2xl p-6 shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated"
    >
      <span
        className={cn(
          "mb-4 flex size-12 items-center justify-center rounded-xl transition-smooth group-hover:scale-110",
          accent === "primary"
            ? "bg-gradient-primary text-primary-foreground"
            : "bg-accent text-accent-foreground",
        )}
      >
        <Icon className="size-6" />
      </span>
      <h3 className="font-display text-lg font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

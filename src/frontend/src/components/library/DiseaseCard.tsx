import type { DiseaseEntry, ExternalBlob } from "@/types";
import { AlertTriangle, Bug, Leaf, ShieldCheck, Sprout } from "lucide-react";
import { useState } from "react";

interface DiseaseCardProps {
  disease: DiseaseEntry;
  index: number;
}

function hasUsableImage(blob: ExternalBlob): boolean {
  const bytes = blob._blob;
  // Seeded entries carry empty blobs (Array.toBlob([])) — treat them as missing.
  if (bytes && bytes.length > 0) return true;
  // No in-memory bytes: only trust the direct URL when it actually points at data.
  return Boolean(blob.directURL) && !bytes;
}

function DiseaseImage({ disease }: { disease: DiseaseEntry }) {
  const [failed, setFailed] = useState(false);
  const showFallback = failed || !hasUsableImage(disease.imageUrl);

  return (
    <div className="relative aspect-[16/9] overflow-hidden">
      {showFallback ? (
        <div className="bg-gradient-primary absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="glass flex size-20 items-center justify-center rounded-3xl">
            <Leaf className="size-10 text-primary" />
          </div>
          <span className="font-display text-lg font-bold text-primary-foreground">
            {disease.crop}
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-primary-foreground/70">
            Disease Library
          </span>
        </div>
      ) : (
        <img
          src={disease.imageUrl.getDirectURL()}
          alt={`${disease.name} on ${disease.crop}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur">
          <Sprout className="size-3.5" />
          {disease.crop}
        </span>
        <h3 className="font-display mt-2 text-2xl font-bold text-white">
          {disease.name}
        </h3>
      </div>
    </div>
  );
}

function DetailList({
  icon,
  title,
  items,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  tone: "symptom" | "cause" | "treatment" | "prevention";
}) {
  const toneClasses: Record<typeof tone, string> = {
    symptom: "border-warning/30 bg-warning/5",
    cause: "border-destructive/25 bg-destructive/5",
    treatment: "border-primary/25 bg-primary/5",
    prevention: "border-accent/25 bg-accent/5",
  };
  const iconClasses: Record<typeof tone, string> = {
    symptom: "text-warning",
    cause: "text-destructive",
    treatment: "text-primary",
    prevention: "text-accent",
  };

  return (
    <div className={`rounded-2xl border p-4 ${toneClasses[tone]}`}>
      <div className="flex items-center gap-2">
        <span className={`${iconClasses[tone]}`}>{icon}</span>
        <h4 className="font-display text-sm font-semibold tracking-wide">
          {title}
        </h4>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-current opacity-60" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DiseaseCard({ disease, index }: DiseaseCardProps) {
  return (
    <article
      className="group animate-card-swipe overflow-hidden rounded-3xl border bg-card shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated-lg"
      style={{ animationDelay: `${index * 0.08}s` }}
      data-ocid={`library.disease_card.${index}`}
    >
      <DiseaseImage disease={disease} />

      <div className="space-y-4 p-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {disease.symptoms[0] ?? `A common ${disease.crop} disease.`}
        </p>

        <DetailList
          icon={<AlertTriangle className="size-4" />}
          title="Symptoms"
          items={disease.symptoms}
          tone="symptom"
        />
        <DetailList
          icon={<Bug className="size-4" />}
          title="Causes"
          items={disease.causes}
          tone="cause"
        />
        <DetailList
          icon={<Leaf className="size-4" />}
          title="Treatment"
          items={disease.treatment}
          tone="treatment"
        />
        <DetailList
          icon={<ShieldCheck className="size-4" />}
          title="Prevention"
          items={disease.prevention}
          tone="prevention"
        />
      </div>
    </article>
  );
}

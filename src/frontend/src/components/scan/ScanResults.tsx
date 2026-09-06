import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ScanRecord } from "@/types";
import {
  AlertTriangle,
  Bug,
  FlaskConical,
  HeartPulse,
  Leaf,
  MessageCircleQuestion,
  ShieldCheck,
  Sprout,
  Stethoscope,
} from "lucide-react";

interface ScanResultsProps {
  scan: ScanRecord;
  imageUrl: string;
}

function ConfidenceRing({ value }: { value: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color =
    value >= 85
      ? "oklch(var(--success))"
      : value >= 60
        ? "oklch(var(--warning))"
        : "oklch(var(--destructive))";

  return (
    <div className="relative flex size-36 items-center justify-center">
      <svg
        viewBox="0 0 128 128"
        className="size-36 -rotate-90"
        role="img"
        aria-label={`${Math.round(value)}% confidence`}
      >
        <title>{`${Math.round(value)}% confidence`}</title>
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="oklch(var(--muted))"
          strokeWidth="10"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-3xl font-bold" style={{ color }}>
          {Math.round(value)}%
        </span>
        <span className="text-xs text-muted-foreground">confidence</span>
      </div>
    </div>
  );
}

function severityVariant(
  severity: string,
): "destructive" | "default" | "secondary" {
  const s = severity.toLowerCase();
  if (s.includes("high") || s.includes("severe") || s.includes("critical")) {
    return "destructive";
  }
  if (s.includes("moderate") || s.includes("medium")) {
    return "default";
  }
  return "secondary";
}

function ListCard({
  icon,
  title,
  items,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  accent: string;
}) {
  return (
    <Card className="animate-reveal h-full border shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <span
          className={`flex size-10 items-center justify-center rounded-xl ${accent}`}
        >
          {icon}
        </span>
        <CardTitle className="font-display text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function ScanResults({ scan, imageUrl }: ScanResultsProps) {
  return (
    <div className="space-y-8" data-ocid="scan.success_state">
      <div className="glass-strong animate-card-swipe overflow-hidden rounded-3xl shadow-elevated-lg">
        <div className="grid gap-0 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col justify-center gap-4 p-8">
            <Badge
              variant={severityVariant(scan.severity)}
              className="w-fit rounded-full px-3 py-1"
              data-ocid="scan.severity_badge"
            >
              <AlertTriangle className="size-3" />
              {scan.severity} severity
            </Badge>
            <div>
              <p className="text-sm uppercase tracking-wider text-muted-foreground">
                Detected disease
              </p>
              <h2 className="font-display mt-1 text-3xl font-bold md:text-4xl">
                {scan.diseaseName}
              </h2>
            </div>
            <p className="max-w-xl text-sm text-muted-foreground md:text-base">
              {scan.description}
            </p>
          </div>
          <div className="flex items-center justify-center border-t bg-card/40 p-8 md:border-l md:border-t-0">
            <ConfidenceRing value={scan.confidence} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="animate-reveal overflow-hidden rounded-3xl border bg-card shadow-elevated">
          <img
            src={imageUrl}
            alt={`Uploaded leaf diagnosed with ${scan.diseaseName}`}
            className="h-64 w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <ListCard
            icon={<Bug className="size-5 text-primary-foreground" />}
            title="Symptoms"
            items={scan.symptoms}
            accent="bg-gradient-primary"
          />
          <ListCard
            icon={<FlaskConical className="size-5 text-accent-foreground" />}
            title="Treatment"
            items={scan.treatment}
            accent="bg-accent"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ListCard
          icon={<ShieldCheck className="size-5 text-primary-foreground" />}
          title="Prevention"
          items={scan.prevention}
          accent="bg-gradient-primary"
        />
        <ListCard
          icon={<Sprout className="size-5 text-accent-foreground" />}
          title="Organic Suggestions"
          items={scan.organicSuggestions}
          accent="bg-accent"
        />
      </div>

      <Card className="animate-reveal border shadow-subtle transition-smooth hover:shadow-elevated">
        <CardHeader className="flex flex-row items-center gap-3">
          <span className="bg-gradient-primary flex size-10 items-center justify-center rounded-xl">
            <Stethoscope className="size-5 text-primary-foreground" />
          </span>
          <CardTitle className="font-display text-base">
            When to Contact an Expert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="flex gap-2 text-sm text-muted-foreground">
            <HeartPulse className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{scan.expertAdvice}</span>
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
        <MessageCircleQuestion className="size-4 shrink-0 text-primary" />
        <span>
          Have more questions? Ask our AI assistant in the chat panel for
          personalized guidance about {scan.diseaseName}.
        </span>
      </div>
    </div>
  );
}

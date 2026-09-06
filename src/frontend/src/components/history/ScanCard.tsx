import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { timestampToDate } from "@/hooks/useQueries";
import type { ScanRecord } from "@/types";
import { CalendarDays, FileText, Leaf, ScanLine } from "lucide-react";

interface ScanCardProps {
  scan: ScanRecord;
  index: number;
  onViewReport: (scan: ScanRecord) => void;
}

function formatDate(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  if (!date) return "Date unavailable";
  return date.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function severityTone(severity: string): string {
  const s = severity.toLowerCase();
  if (s.includes("high") || s.includes("severe") || s.includes("critical")) {
    return "bg-destructive/15 text-destructive border-destructive/30";
  }
  if (s.includes("moderate") || s.includes("medium")) {
    return "bg-warning/15 text-warning border-warning/30";
  }
  return "bg-success/15 text-success border-success/30";
}

export function ScanCard({ scan, index, onViewReport }: ScanCardProps) {
  const confidence = Math.round(scan.confidence);

  return (
    <article
      data-ocid={`history.card.${index}`}
      style={{ animationDelay: `${index * 0.08}s` }}
      className="animate-card-swipe group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-subtle transition-smooth hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={scan.imageUrl.getDirectURL()}
          alt={`Scan of ${scan.diseaseName}`}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge
            className={`border backdrop-blur-md ${severityTone(scan.severity)}`}
          >
            <Leaf className="size-3" />
            {scan.severity}
          </Badge>
        </div>
        <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          <ScanLine className="size-3.5" />
          {confidence}% confidence
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-tight">
            {scan.diseaseName}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="size-4" />
          <time dateTime={timestampToDate(scan.timestamp)?.toISOString()}>
            {formatDate(scan.timestamp)}
          </time>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {scan.description}
        </p>

        <div className="mt-auto pt-2">
          <Button
            data-ocid={`history.view_report.${index}`}
            variant="outline"
            className="w-full rounded-full transition-smooth hover:border-primary hover:bg-primary/5 hover:text-primary"
            onClick={() => onViewReport(scan)}
          >
            <FileText className="size-4" />
            View Full Report
          </Button>
        </div>
      </div>
    </article>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timestampToDate } from "@/hooks/useQueries";
import type { ScanRecord } from "@/types";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  FlaskConical,
  Leaf,
  ShieldCheck,
  Sprout,
  Stethoscope,
} from "lucide-react";

interface ScanReportDialogProps {
  scan: ScanRecord | null;
  onClose: () => void;
}

function formatDate(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  if (!date) return "Date unavailable";
  return date.toLocaleString(undefined, {
    day: "numeric",
    month: "long",
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

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-strong rounded-xl p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="bg-gradient-primary flex size-8 items-center justify-center rounded-lg text-primary-foreground">
          {icon}
        </span>
        <h4 className="font-display text-sm font-semibold">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function ListItems({ items }: { items: string[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No details available.</p>
    );
  }
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ScanReportDialog({ scan, onClose }: ScanReportDialogProps) {
  if (!scan) return null;
  const confidence = Math.round(scan.confidence);

  return (
    <Dialog open={!!scan} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="history.report_modal"
        className="max-h-[90vh] max-w-3xl gap-0 overflow-hidden p-0 sm:max-w-3xl"
      >
        <ScrollArea className="max-h-[90vh]">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
            <img
              src={scan.imageUrl.getDirectURL()}
              alt={`Scan of ${scan.diseaseName}`}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute right-4 bottom-4 left-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  className={`border backdrop-blur-md ${severityTone(scan.severity)}`}
                >
                  <AlertTriangle className="size-3" />
                  {scan.severity} severity
                </Badge>
                <Badge className="border bg-black/45 text-white backdrop-blur-md">
                  {confidence}% confidence
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-6">
            <DialogHeader className="mb-5 text-left">
              <DialogTitle className="font-display text-2xl font-bold">
                {scan.diseaseName}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                Scanned on {formatDate(scan.timestamp)}
              </DialogDescription>
            </DialogHeader>

            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">AI Confidence</span>
                <span className="font-display font-semibold text-primary">
                  {confidence}%
                </span>
              </div>
              <Progress value={confidence} className="h-2.5" />
            </div>

            <div className="space-y-4">
              <Section
                icon={<Stethoscope className="size-4" />}
                title="Overview"
              >
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {scan.description}
                </p>
              </Section>

              <Section
                icon={<AlertTriangle className="size-4" />}
                title="Symptoms"
              >
                <ListItems items={scan.symptoms} />
              </Section>

              <Section
                icon={<FlaskConical className="size-4" />}
                title="Treatment"
              >
                <ListItems items={scan.treatment} />
              </Section>

              <Section
                icon={<ShieldCheck className="size-4" />}
                title="Prevention"
              >
                <ListItems items={scan.prevention} />
              </Section>

              <Section
                icon={<Sprout className="size-4" />}
                title="Organic Suggestions"
              >
                <ListItems items={scan.organicSuggestions} />
              </Section>

              <Section icon={<Leaf className="size-4" />} title="Expert Advice">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {scan.expertAdvice}
                </p>
              </Section>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                data-ocid="history.report_close"
                variant="outline"
                className="rounded-full"
                onClick={onClose}
              >
                Close Report
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

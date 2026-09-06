import { HistoryEmptyState } from "@/components/history/HistoryEmptyState";
import { ScanCard } from "@/components/history/ScanCard";
import { ScanReportDialog } from "@/components/history/ScanReportDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useScans } from "@/hooks/useQueries";
import type { ScanRecord } from "@/types";
import { History, Leaf } from "lucide-react";
import { useState } from "react";

function HistorySkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map((key) => (
        <div
          key={key}
          className="overflow-hidden rounded-2xl border bg-card shadow-subtle"
        >
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-9 w-full rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HistoryPage() {
  const { data: scans, isLoading } = useScans();
  const [selectedScan, setSelectedScan] = useState<ScanRecord | null>(null);

  return (
    <section className="texture-leaf relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="animate-reveal mb-12 max-w-2xl">
          <span className="bg-gradient-primary mb-5 inline-flex size-14 items-center justify-center rounded-2xl shadow-subtle glow-leaf">
            <History className="size-7 text-primary-foreground" />
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Scan History
          </h1>
          <p className="mt-4 text-base text-muted-foreground lg:text-lg">
            Review your past scans and track the health of your crops over time.
            Tap any report for the full diagnosis.
          </p>
        </div>

        {isLoading ? (
          <HistorySkeleton />
        ) : !scans || scans.length === 0 ? (
          <HistoryEmptyState />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {scans.map((scan, index) => (
              <ScanCard
                key={scan.id.toString()}
                scan={scan}
                index={index}
                onViewReport={setSelectedScan}
              />
            ))}
          </div>
        )}

        {scans && scans.length > 0 && (
          <p className="animate-reveal mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Leaf className="size-4 text-primary" />
            {scans.length} scan{scans.length === 1 ? "" : "s"} recorded
          </p>
        )}
      </div>

      <ScanReportDialog
        scan={selectedScan}
        onClose={() => setSelectedScan(null)}
      />
    </section>
  );
}

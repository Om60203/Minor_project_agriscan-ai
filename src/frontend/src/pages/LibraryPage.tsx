import { CropTabs } from "@/components/library/CropTabs";
import { DiseaseCard } from "@/components/library/DiseaseCard";
import { LibraryEmptyState } from "@/components/library/LibraryEmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDiseases,
  useDiseasesByCrop,
  useSearchDiseases,
} from "@/hooks/useQueries";
import { BookOpen, Search, X } from "lucide-react";
import { useState } from "react";

function DiseaseGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((n) => (
        <div
          key={`skeleton-${n}`}
          className="overflow-hidden rounded-3xl border bg-card"
          data-ocid="library.loading_state"
        >
          <Skeleton className="aspect-[16/9] w-full rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LibraryPage() {
  const [activeCrop, setActiveCrop] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const searching = searchTerm.trim().length > 0;
  const diseasesQuery = useDiseases();
  const byCropQuery = useDiseasesByCrop(activeCrop);
  const searchQuery = useSearchDiseases(searchTerm);

  const isLoading =
    diseasesQuery.isLoading || byCropQuery.isLoading || searchQuery.isLoading;

  const diseases = searching
    ? (searchQuery.data ?? [])
    : activeCrop
      ? (byCropQuery.data ?? [])
      : (diseasesQuery.data ?? []);

  return (
    <div className="bg-ambient texture-leaf">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-primary/10 blur-3xl animate-drift" />
        <div className="pointer-events-none absolute -bottom-24 left-0 size-96 rounded-full bg-accent/10 blur-3xl animate-drift" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="animate-reveal mx-auto max-w-3xl text-center">
            <span className="bg-gradient-primary mb-6 inline-flex size-14 items-center justify-center rounded-2xl shadow-subtle glow-leaf">
              <BookOpen className="size-7 text-primary-foreground" />
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Crops &amp; Disease <span className="text-gradient">Library</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground lg:text-lg">
              Explore a searchable knowledge base of common crop diseases —
              their symptoms, causes, treatments, and prevention tips to keep
              your harvest healthy.
            </p>

            <div className="relative mx-auto mt-8 max-w-xl">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by disease name or symptom…"
                className="glass-strong h-12 rounded-full py-3.5 pr-12 pl-12 shadow-subtle focus-visible:ring-primary"
                data-ocid="library.search_input"
                aria-label="Search diseases"
              />
              {searching && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchTerm("")}
                  className="absolute top-1/2 right-2 size-8 -translate-y-1/2 rounded-full"
                  aria-label="Clear search"
                  data-ocid="library.search_clear"
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Crop categories */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="animate-reveal" style={{ animationDelay: "0.1s" }}>
          <CropTabs activeCrop={activeCrop} onSelect={setActiveCrop} />
        </div>

        {/* Results header */}
        <div
          className="animate-reveal mt-10 mb-6 flex items-center justify-between"
          style={{ animationDelay: "0.15s" }}
        >
          <h2 className="font-display text-xl font-bold">
            {searching
              ? `Results for "${searchTerm.trim()}"`
              : activeCrop
                ? `${activeCrop} Diseases`
                : "All Diseases"}
          </h2>
          <span className="text-sm text-muted-foreground">
            {diseases.length} {diseases.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {isLoading ? (
          <DiseaseGridSkeleton />
        ) : diseases.length === 0 ? (
          <LibraryEmptyState
            searching={searching}
            onClear={() => setSearchTerm("")}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {diseases.map((disease, index) => (
              <DiseaseCard
                key={`${disease.crop}-${disease.name}`}
                disease={disease}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

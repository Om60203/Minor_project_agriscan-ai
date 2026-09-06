import { Button } from "@/components/ui/button";
import { SearchX, Sprout } from "lucide-react";

interface LibraryEmptyStateProps {
  searching: boolean;
  onClear: () => void;
}

export function LibraryEmptyState({
  searching,
  onClear,
}: LibraryEmptyStateProps) {
  return (
    <div
      className="glass-strong animate-reveal flex flex-col items-center justify-center rounded-3xl border border-dashed px-6 py-20 text-center"
      data-ocid="library.empty_state"
    >
      <span className="bg-gradient-primary mb-6 flex size-16 items-center justify-center rounded-2xl shadow-subtle">
        {searching ? (
          <SearchX className="size-8 text-primary-foreground" />
        ) : (
          <Sprout className="size-8 text-primary-foreground" />
        )}
      </span>
      <h3 className="font-display text-2xl font-bold">
        {searching ? "No diseases found" : "Library is empty"}
      </h3>
      <p className="mt-3 max-w-md text-muted-foreground">
        {searching
          ? "We couldn't find any diseases matching your search. Try a different keyword or browse by crop."
          : "The disease library has no entries yet. Check back soon as we add crop disease guides."}
      </p>
      {searching && (
        <Button
          variant="outline"
          onClick={onClear}
          className="mt-6 rounded-full"
          data-ocid="library.empty_state.clear_button"
        >
          Clear search
        </Button>
      )}
    </div>
  );
}

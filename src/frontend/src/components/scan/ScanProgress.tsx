import { Progress } from "@/components/ui/progress";
import { BrainCircuit, Leaf, ScanLine, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const STEPS = [
  "Uploading leaf image…",
  "Analyzing leaf patterns…",
  "Detecting disease markers…",
  "Generating treatment plan…",
];

interface ScanProgressProps {
  progress: number;
}

export function ScanProgress({ progress }: ScanProgressProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const idx = Math.min(
      STEPS.length - 1,
      Math.floor((progress / 100) * STEPS.length),
    );
    setStepIndex(idx);
  }, [progress]);

  return (
    <div
      className="glass-strong animate-card-swipe relative overflow-hidden rounded-3xl p-8 shadow-elevated-lg"
      data-ocid="scan.loading_state"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-scan-progress absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <div className="bg-gradient-primary animate-pulse-ring flex size-20 items-center justify-center rounded-3xl shadow-subtle">
            <ScanLine className="size-10 text-primary-foreground" />
          </div>
          <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Sparkles className="size-3.5" />
          </span>
        </div>

        <div>
          <h3 className="font-display text-xl font-bold">
            AI is scanning your leaf
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Analyzing with our crop disease model
          </p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <Progress value={progress} className="h-2.5" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BrainCircuit className="size-3.5" />
              {STEPS[stepIndex]}
            </span>
            <span className="font-mono font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Leaf className="size-3.5 text-primary" />
          <span>Usually takes a few seconds</span>
        </div>
      </div>
    </div>
  );
}

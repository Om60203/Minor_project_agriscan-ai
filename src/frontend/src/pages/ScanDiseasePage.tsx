import { ScanProgress } from "@/components/scan/ScanProgress";
import { ScanResults } from "@/components/scan/ScanResults";
import { UploadDropzone } from "@/components/scan/UploadDropzone";
import { Button } from "@/components/ui/button";
import { useCreateScan } from "@/hooks/useQueries";
import type { ScanRecord } from "@/types";
import { ExternalBlob } from "@caffeineai/object-storage";
import { Leaf, ScanLine, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Phase = "upload" | "scanning" | "results";

export default function ScanDiseasePage() {
  const [image, setImage] = useState<File | null>(null);
  const [phase, setPhase] = useState<Phase>("upload");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ScanRecord | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const createScan = useCreateScan();
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const canAnalyze = !!image && !createScan.isPending;

  const handleAnalyze = async () => {
    if (!image) return;
    setPhase("scanning");
    setProgress(0);
    setError(null);

    // Simulate the AI scanning progress while the backend processes the image.
    progressTimer.current = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 14;
        return next >= 92 ? 92 : next;
      });
    }, 350);

    try {
      const imageBytes = new Uint8Array(await image.arrayBuffer());
      const imageBlob = ExternalBlob.fromBytes(
        imageBytes,
        image.type,
        image.name,
      );

      const scan = await createScan.mutateAsync({ image: imageBlob });

      if (progressTimer.current) clearInterval(progressTimer.current);
      setProgress(100);

      // Guard against an empty diagnosis so we never show a blank result.
      if (!scan || !scan.diseaseName || !scan.diseaseName.trim()) {
        setPhase("upload");
        setProgress(0);
        setError(
          "We couldn't identify a disease from this image. Try a clearer, well-lit photo of the leaf.",
        );
        toast.error("No disease detected. Please try another photo.");
        return;
      }

      setResult(scan);
      setResultImageUrl(imageBlob.getDirectURL());
      setPhase("results");
      toast.success("Scan complete! Disease detected.");
    } catch (err) {
      if (progressTimer.current) clearInterval(progressTimer.current);
      setPhase("upload");
      setProgress(0);
      setError(
        err instanceof Error
          ? err.message
          : "Analysis failed. Please try again.",
      );
      toast.error(
        err instanceof Error
          ? err.message
          : "Analysis failed. Please try again.",
      );
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setResultImageUrl("");
    setProgress(0);
    setError(null);
    setPhase("upload");
  };

  useEffect(() => {
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  return (
    <section className="bg-ambient texture-leaf relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="bg-gradient-primary animate-float mb-5 inline-flex size-14 items-center justify-center rounded-2xl shadow-subtle">
            <ScanLine className="size-7 text-primary-foreground" />
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Detect Crop Diseases with <span className="text-gradient">AI</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
            Upload a photo of a leaf or capture one with your camera. Our AI
            instantly identifies the disease and gives you a complete treatment
            plan.
          </p>
        </motion.div>

        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10"
        >
          {phase === "upload" && (
            <div className="space-y-6">
              <UploadDropzone image={image} onImageChange={setImage} />

              {error && (
                <div
                  role="alert"
                  data-ocid="scan.error_state"
                  className="glass-strong animate-card-swipe mx-auto flex max-w-xl items-start gap-3 rounded-2xl border-destructive/30 p-4"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive">
                    <Leaf className="size-4" />
                  </span>
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">
                      Analysis didn't work
                    </p>
                    <p className="mt-1 text-muted-foreground">{error}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center gap-3">
                <Button
                  size="lg"
                  disabled={!canAnalyze}
                  onClick={handleAnalyze}
                  className="bg-gradient-primary w-full max-w-sm rounded-full px-8 py-6 text-base shadow-subtle transition-smooth hover:shadow-elevated sm:w-auto"
                  data-ocid="scan.analyze_button"
                >
                  <Sparkles className="size-5" />
                  Analyze Disease
                </Button>
                {!image && (
                  <p className="text-sm text-muted-foreground">
                    Upload a leaf image to start the analysis
                  </p>
                )}
              </div>
            </div>
          )}

          {phase === "scanning" && (
            <div className="mx-auto max-w-xl">
              <ScanProgress progress={progress} />
            </div>
          )}

          {phase === "results" && result && (
            <div className="space-y-6">
              <ScanResults scan={result} imageUrl={resultImageUrl} />
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="rounded-full px-6"
                  data-ocid="scan.scan_again_button"
                >
                  <ScanLine className="size-4" />
                  Scan Another Leaf
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

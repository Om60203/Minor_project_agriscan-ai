import { CameraCapture } from "@/components/scan/CameraCapture";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Camera, ImagePlus, Leaf, RefreshCw, X } from "lucide-react";
import { useRef, useState } from "react";

interface UploadDropzoneProps {
  image: File | null;
  onImageChange: (file: File | null) => void;
}

export function UploadDropzone({ image, onImageChange }: UploadDropzoneProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleImageFile = (file: File | undefined | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    onImageChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const img = files.find((f) => f.type.startsWith("image/"));
    if (img) handleImageFile(img);
  };

  const imagePreview = image ? URL.createObjectURL(image) : null;

  return (
    <div className="space-y-4">
      <button
        type="button"
        aria-label="Upload a leaf image by dragging, dropping, or browsing"
        onClick={() => imageInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "group relative flex min-h-[240px] w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed p-8 text-center transition-smooth focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          isDragging
            ? "border-primary bg-primary/10 glow-primary"
            : "glass-strong border-border/70 hover:border-primary/60 hover:bg-card",
        )}
        data-ocid="scan.dropzone"
      >
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleImageFile(e.target.files?.[0]);
            e.target.value = "";
          }}
          data-ocid="scan.image_input"
        />

        <span className="bg-gradient-primary animate-float flex size-16 items-center justify-center rounded-2xl shadow-subtle">
          <Leaf className="size-8 text-primary-foreground" />
        </span>

        <span>
          <span className="font-display block text-lg font-semibold">
            {image ? "Leaf image ready" : "Drag & drop a leaf image"}
          </span>
          <span className="mt-1 block text-sm text-muted-foreground">
            or click to browse from your device
          </span>
        </span>
      </button>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="rounded-full"
          onClick={() => imageInputRef.current?.click()}
          data-ocid="scan.browse_button"
        >
          <ImagePlus className="size-4" />
          Browse
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="rounded-full"
          onClick={() => setCameraOpen(true)}
          data-ocid="scan.camera_button"
        >
          <Camera className="size-4" />
          Camera
        </Button>
      </div>

      {imagePreview && (
        <div className="animate-card-swipe relative overflow-hidden rounded-3xl border bg-card shadow-elevated">
          <img
            src={imagePreview}
            alt="Uploaded leaf preview"
            className="h-56 w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3">
            <span className="truncate text-sm font-medium text-white">
              {image?.name}
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                onClick={() => imageInputRef.current?.click()}
                aria-label="Replace image"
                data-ocid="scan.replace_image"
              >
                <RefreshCw className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                onClick={() => onImageChange(null)}
                aria-label="Remove image"
                data-ocid="scan.remove_image"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <CameraCapture
        open={cameraOpen}
        onOpenChange={setCameraOpen}
        onCapture={handleImageFile}
      />
    </div>
  );
}

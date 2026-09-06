import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Camera,
  CameraOff,
  Loader2,
  RefreshCw,
  SwitchCamera,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface CameraCaptureProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCapture: (file: File) => void;
}

export function CameraCapture({
  open,
  onOpenChange,
  onCapture,
}: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  );

  const stopCamera = useCallback(() => {
    for (const track of streamRef.current?.getTracks() ?? []) {
      track.stop();
    }
    streamRef.current = null;
    setIsActive(false);
  }, []);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera is not supported in this browser");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsActive(true);
    } catch (err) {
      const message =
        err instanceof DOMException && err.name === "NotAllowedError"
          ? "Camera permission was denied. Please allow camera access and try again."
          : "Unable to access the camera. Please check your device and try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [facingMode]);

  const switchCamera = useCallback(async () => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    stopCamera();
    // Wait a tick for the stream to release before restarting
    setTimeout(() => {
      void startCamera();
    }, 150);
  }, [facingMode, startCamera, stopCamera]);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isActive) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `leaf-capture-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        onCapture(file);
        stopCamera();
        onOpenChange(false);
      },
      "image/jpeg",
      0.92,
    );
  }, [isActive, onCapture, onOpenChange, stopCamera]);

  useEffect(() => {
    if (open) {
      void startCamera();
    } else {
      stopCamera();
      setError(null);
    }
    return () => stopCamera();
  }, [open, startCamera, stopCamera]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Capture Leaf Photo</DialogTitle>
          <DialogDescription>
            Point your camera at the leaf and take a clear photo for analysis.
          </DialogDescription>
        </DialogHeader>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-muted">
          <video
            ref={videoRef}
            playsInline
            muted
            className="h-full w-full object-cover"
            aria-label="Camera preview"
          />
          {!isActive && !isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <CameraOff className="size-8" />
              <p className="px-6 text-center text-sm">
                {error ?? "Camera preview is off"}
              </p>
            </div>
          )}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          )}
        </div>

        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={switchCamera}
            disabled={isLoading || !isActive}
            aria-label="Switch camera"
            data-ocid="scan.camera_switch"
          >
            <SwitchCamera className="size-4" />
            Switch
          </Button>
          <Button
            onClick={capturePhoto}
            disabled={!isActive || isLoading}
            className="bg-gradient-primary rounded-full px-6"
            data-ocid="scan.camera_capture"
          >
            <Camera className="size-4" />
            Capture
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              stopCamera();
              onOpenChange(false);
            }}
            disabled={isLoading}
            data-ocid="scan.camera_close"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

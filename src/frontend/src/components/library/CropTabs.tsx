import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const CROPS = [
  { name: "Tomato", image: "/assets/generated/crop-tomato.dim_600x400.jpg" },
  { name: "Potato", image: "/assets/generated/crop-potato.dim_600x400.jpg" },
  { name: "Corn", image: "/assets/generated/crop-corn.dim_600x400.jpg" },
  { name: "Apple", image: "/assets/generated/crop-apple.dim_600x400.jpg" },
  { name: "Pepper", image: "/assets/generated/crop-pepper.dim_600x400.jpg" },
  { name: "Grape", image: "/assets/generated/crop-grape.dim_600x400.jpg" },
] as const;

interface CropTabsProps {
  activeCrop: string | null;
  onSelect: (crop: string | null) => void;
}

export function CropTabs({ activeCrop, onSelect }: CropTabsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          "group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border p-4 text-center transition-smooth focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          activeCrop === null
            ? "border-primary bg-primary/10 shadow-subtle"
            : "glass-strong border-border hover:border-primary/40 hover:shadow-subtle",
        )}
        data-ocid="library.crop.all"
        aria-pressed={activeCrop === null}
      >
        <span className="bg-gradient-primary flex size-12 items-center justify-center rounded-xl text-xl text-primary-foreground shadow-subtle">
          🌾
        </span>
        <span className="font-display text-sm font-semibold">All Crops</span>
      </button>

      {CROPS.map((crop) => {
        const active = activeCrop === crop.name;
        return (
          <button
            key={crop.name}
            type="button"
            onClick={() => onSelect(active ? null : crop.name)}
            className={cn(
              "group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border p-3 text-center transition-smooth focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              active
                ? "border-primary shadow-subtle"
                : "glass-strong border-border hover:border-primary/40 hover:shadow-subtle",
            )}
            data-ocid={`library.crop.${crop.name.toLowerCase()}`}
            aria-pressed={active}
          >
            <div className="relative size-16 overflow-hidden rounded-xl">
              <img
                src={crop.image}
                alt={crop.name}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {active && (
                <motion.div
                  layoutId="crop-active-ring"
                  className="absolute inset-0 ring-2 ring-primary ring-inset"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
            <span
              className={cn(
                "font-display text-sm font-semibold",
                active && "text-primary",
              )}
            >
              {crop.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

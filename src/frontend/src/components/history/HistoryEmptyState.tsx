import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ScanLine } from "lucide-react";
import { motion } from "motion/react";

export function HistoryEmptyState() {
  return (
    <motion.div
      data-ocid="history.empty_state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong mx-auto flex max-w-xl flex-col items-center rounded-3xl px-6 py-16 text-center shadow-elevated"
    >
      <div className="animate-float relative mb-6">
        <span className="bg-gradient-primary flex size-20 items-center justify-center rounded-3xl shadow-elevated">
          <ScanLine className="size-9 text-primary-foreground" />
        </span>
        <span className="animate-pulse-ring absolute inset-0 rounded-3xl" />
      </div>
      <h2 className="font-display text-2xl font-bold tracking-tight">
        No scans yet
      </h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        Your scan history will appear here. Upload a photo of your crop to get
        an instant AI diagnosis and start tracking plant health over time.
      </p>
      <Link to="/scan" className="mt-8">
        <Button
          data-ocid="history.empty_scan_button"
          className="bg-gradient-primary rounded-full px-6 shadow-subtle transition-smooth hover:shadow-elevated"
        >
          Scan Your First Crop
          <ArrowRight className="size-4" />
        </Button>
      </Link>
    </motion.div>
  );
}

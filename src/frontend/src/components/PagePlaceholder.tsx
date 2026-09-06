import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface PagePlaceholderProps {
  title: string;
  description: string;
  ctaTo?: string;
  ctaLabel?: string;
}

export function PagePlaceholder({
  title,
  description,
  ctaTo,
  ctaLabel,
}: PagePlaceholderProps) {
  return (
    <section className="bg-gradient-subtle">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <span className="bg-gradient-primary mb-6 flex size-14 items-center justify-center rounded-2xl shadow-subtle">
          <span className="text-2xl text-primary-foreground">🌿</span>
        </span>
        <h1 className="font-display max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground lg:text-lg">
          {description}
        </p>
        {ctaTo && ctaLabel && (
          <Link to={ctaTo} className="mt-8">
            <Button className="bg-gradient-primary rounded-full px-6 shadow-subtle transition-smooth hover:shadow-elevated">
              {ctaLabel}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}

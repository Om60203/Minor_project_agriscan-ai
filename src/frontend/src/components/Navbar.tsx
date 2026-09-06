import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Leaf, Menu, Moon, ScanLine, Sun, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/scan", label: "Scan Disease" },
  { to: "/library", label: "Disease Library" },
  { to: "/history", label: "Scan History" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="glass-strong sticky top-0 z-40 border-b">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          data-ocid="nav.logo"
        >
          <span className="bg-gradient-primary flex size-9 items-center justify-center rounded-xl shadow-subtle">
            <Leaf className="size-5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            AgriScan <span className="text-gradient">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-smooth hover:bg-accent/60 hover:text-accent-foreground",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              )}
              activeProps={{
                className:
                  "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
              }}
              data-ocid={`nav.link.${link.to.replace("/", "") || "home"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className="rounded-full"
            data-ocid="nav.theme_toggle"
          >
            {theme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>

          <Link to="/scan" className="hidden sm:block">
            <Button
              className="bg-gradient-primary rounded-full px-4 shadow-subtle transition-smooth hover:shadow-elevated"
              data-ocid="nav.scan_cta"
            >
              <ScanLine className="size-4" />
              Scan Now
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            data-ocid="nav.menu_button"
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t bg-card/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth hover:bg-accent/60 hover:text-accent-foreground"
                activeProps={{
                  className: "bg-primary/10 text-primary",
                }}
                data-ocid={`nav.mobile.link.${link.to.replace("/", "") || "home"}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/scan"
              onClick={() => setMobileOpen(false)}
              className="mt-2"
            >
              <Button className="bg-gradient-primary w-full rounded-full">
                <ScanLine className="size-4" />
                Scan Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

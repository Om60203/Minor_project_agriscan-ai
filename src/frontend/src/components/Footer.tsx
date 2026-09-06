import { Link } from "@tanstack/react-router";
import { Leaf, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const CONTACT = {
  email: "omawasthi379@gmail.com",
  phone: "+91 80810 24044",
  phoneHref: "tel:+918081024044",
  location: "New Delhi, India",
  linkedin: "https://www.linkedin.com/in/om-awasthi",
  linkedinLabel: "Om Awasthi",
} as const;

const QUICK_LINKS = [
  { to: "/scan", label: "Scan Disease" },
  { to: "/library", label: "Disease Library" },
  { to: "/history", label: "Scan History" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
] as const;

const SOCIALS = [
  { label: "X (Twitter)", icon: FaXTwitter, href: "#" },
  { label: "Facebook", icon: FaFacebookF, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    href: CONTACT.linkedin,
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2.5"
              data-ocid="footer.logo"
            >
              <span className="bg-gradient-primary flex size-9 items-center justify-center rounded-xl">
                <Leaf className="size-5 text-primary-foreground" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                AgriScan <span className="text-gradient">AI</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Detect crop diseases with the power of AI. Scan a leaf, get an
              instant diagnosis, and protect your harvest — in your language.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-smooth hover:bg-primary hover:text-primary-foreground"
                  data-ocid={`footer.social.${social.label.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold tracking-widest uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-smooth hover:text-primary"
                    data-ocid={`footer.link.${link.to.replace("/", "")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold tracking-widest uppercase">
              Technology
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>AI-powered leaf analysis</li>
              <li>97.8% detection accuracy</li>
              <li>50+ supported crops</li>
              <li>Voice &amp; text assistant</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold tracking-widest uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-smooth hover:text-primary"
                  data-ocid="footer.contact.email"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <a
                  href={CONTACT.phoneHref}
                  className="transition-smooth hover:text-primary"
                  data-ocid="footer.contact.phone"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Linkedin className="mt-0.5 size-4 shrink-0 text-primary" />
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-smooth hover:text-primary"
                  data-ocid="footer.contact.linkedin"
                >
                  {CONTACT.linkedinLabel}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{CONTACT.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} AgriScan AI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

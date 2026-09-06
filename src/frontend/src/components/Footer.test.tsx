import { Footer } from "@/components/Footer";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    ...props
  }: {
    to: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("Footer", () => {
  it("renders the brand, quick links, and contact section", () => {
    render(<Footer />);
    expect(screen.getByText(/AgriScan AI/i)).toBeInTheDocument();
    expect(screen.getByText(/Quick Links/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it("renders the primary navigation quick links", () => {
    render(<Footer />);
    for (const label of [
      "Scan Disease",
      "Disease Library",
      "Scan History",
      "How It Works",
      "About",
    ]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("renders the social media links", () => {
    render(<Footer />);
    for (const label of ["X (Twitter)", "Facebook", "Instagram", "LinkedIn"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("renders the copyright line with the current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${year} AgriScan AI`)),
    ).toBeInTheDocument();
  });

  it("shows the owner's contact details with working links", () => {
    render(<Footer />);

    const email = screen.getByRole("link", {
      name: "omawasthi379@gmail.com",
    });
    expect(email).toHaveAttribute("href", "mailto:omawasthi379@gmail.com");

    const phone = screen.getByRole("link", { name: /80810 24044/i });
    expect(phone).toHaveAttribute("href", "tel:+918081024044");

    const linkedin = screen.getByRole("link", { name: "Om Awasthi" });
    expect(linkedin).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/om-awasthi",
    );
    expect(linkedin).toHaveAttribute("target", "_blank");
  });
});

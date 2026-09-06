import Home from "@/pages/Home";
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

describe("Home page", () => {
  it("renders the hero headline and CTA buttons", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        name: /Detect Crop Diseases with the Power of AI/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Upload Leaf Image/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /Scan Now/i }).length,
    ).toBeGreaterThan(0);
  });

  it("renders an agriculture image with a descriptive alt", () => {
    render(<Home />);
    const image = screen.getByAltText(/green leaf/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("hero-leaf-scan"),
    );
  });

  it("renders the stats band, features, and supported crops sections", () => {
    render(<Home />);
    expect(screen.getByText(/Supported Crops/i)).toBeInTheDocument();
    expect(screen.getByText(/How It Works/i)).toBeInTheDocument();
  });

  it("renders the feature cards for diagnosis and treatment guidance", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /Instant AI Diagnosis/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Personalized Treatment Guidance/i,
      }),
    ).toBeInTheDocument();
  });
});

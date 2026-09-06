import HistoryPage from "@/pages/HistoryPage";
import type { ScanRecord } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockListScans = vi.fn();

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({
    actor: { listScans: mockListScans },
    isFetching: false,
  }),
}));

vi.mock("@caffeineai/object-storage", () => ({
  ExternalBlob: {
    fromBytes: () => ({ getDirectURL: () => "blob:scan" }),
  },
}));

// HistoryEmptyState renders a router Link; render it as a plain anchor in tests.
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    ...props
  }: { to: string; children: React.ReactNode }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

const mockScan: ScanRecord = {
  id: 7n,
  diseaseName: "Late Blight",
  confidence: 88,
  severity: "high",
  description: "A destructive fungal disease.",
  symptoms: ["Water-soaked spots"],
  treatment: ["Remove infected plants"],
  prevention: ["Plant resistant varieties"],
  organicSuggestions: ["Copper spray"],
  expertAdvice: "Contact an expert immediately.",
  imageUrl: { getDirectURL: () => "blob:scan" } as never,
  timestamp: 1700000000000000000n,
};

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <HistoryPage />
    </QueryClientProvider>,
  );
}

describe("HistoryPage", () => {
  it("shows an empty state when there are no scans", async () => {
    mockListScans.mockResolvedValue([]);
    renderPage();
    expect(await screen.findByText(/No scans yet/i)).toBeInTheDocument();
  });

  it("lists completed scans with thumbnail, disease name, confidence, and date", async () => {
    mockListScans.mockResolvedValue([mockScan]);
    renderPage();
    expect(
      await screen.findByRole("heading", { name: /Late Blight/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/88% confidence/i)).toBeInTheDocument();
    expect(screen.getByText(/high/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /View Full Report/i }),
    ).toBeInTheDocument();
    // The scan thumbnail is rendered from the stored image blob.
    expect(screen.getByAltText(/Scan of Late Blight/i)).toBeInTheDocument();
    // The scan card shows a formatted date derived from the timestamp.
    expect(screen.getByRole("time")).toBeInTheDocument();
  });
});

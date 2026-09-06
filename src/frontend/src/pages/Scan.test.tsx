import ScanDiseasePage from "@/pages/ScanDiseasePage";
import type { ScanRecord } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockCreateScan = vi.fn();

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({
    actor: {
      createScan: mockCreateScan,
    },
    isFetching: false,
  }),
}));

vi.mock("@caffeineai/object-storage", () => ({
  ExternalBlob: {
    fromBytes: () => ({ getDirectURL: () => "blob:image" }),
  },
}));

const mockScan: ScanRecord = {
  id: 1n,
  diseaseName: "Early Blight",
  confidence: 92,
  severity: "medium",
  description: "A fungal disease affecting tomato leaves.",
  symptoms: ["Dark brown spots", "Yellowing leaves"],
  treatment: ["Apply copper fungicide", "Remove infected leaves"],
  prevention: ["Rotate crops", "Water at the base"],
  organicSuggestions: ["Neem oil spray"],
  expertAdvice: "Contact an expert if the disease spreads rapidly.",
  imageUrl: { getDirectURL: () => "blob:image" } as never,
  timestamp: 1700000000000000000n,
};

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <ScanDiseasePage />
    </QueryClientProvider>,
  );
}

describe("ScanDiseasePage", () => {
  beforeEach(() => {
    mockCreateScan.mockResolvedValue(mockScan);
    globalThis.URL.createObjectURL = vi.fn(() => "blob:preview");
    globalThis.URL.revokeObjectURL = vi.fn();
    // jsdom's Blob.arrayBuffer is not implemented; provide it for the upload flow.
    File.prototype.arrayBuffer = vi.fn(async () => new ArrayBuffer(0));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the upload dropzone and a disabled analyze button before an image is chosen", () => {
    renderPage();
    expect(screen.getByText(/Drag & drop a leaf image/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Analyze Disease/i }),
    ).toBeDisabled();
  });

  it("uploads an image and runs the analysis to show a structured diagnosis", async () => {
    renderPage();

    const file = new File(["leaf"], "leaf.png", { type: "image/png" });
    const input = screen.getByTestId("scan.image_input");
    fireEvent.change(input, { target: { files: [file] } });

    const analyze = screen.getByRole("button", { name: /Analyze Disease/i });
    expect(analyze).toBeEnabled();
    fireEvent.click(analyze);

    await waitFor(() => {
      expect(mockCreateScan).toHaveBeenCalled();
    });

    expect(
      await screen.findByRole("heading", { name: /Early Blight/i }),
    ).toBeInTheDocument();
    // "92%" appears in both the circular confidence score and the results
    // card, so query the confidence ring specifically via its accessible name.
    expect(
      screen.getByRole("img", { name: /92% confidence/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/medium severity/i)).toBeInTheDocument();
    expect(screen.getByText(/Symptoms/i)).toBeInTheDocument();
    // "Treatment" also appears in the hero paragraph ("...complete treatment
    // plan."), so scope the query to the results card title.
    expect(
      screen.getByText("Treatment", { selector: '[data-slot="card-title"]' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Prevention/i)).toBeInTheDocument();
    expect(screen.getByText(/When to Contact an Expert/i)).toBeInTheDocument();
  });

  it("shows a clear error and returns to upload when the diagnosis is empty", async () => {
    // The backend can return a scan with no disease name; the page must never
    // show a blank result, so it falls back to the upload phase with an error.
    mockCreateScan.mockResolvedValue({ ...mockScan, diseaseName: "" });

    renderPage();

    const file = new File(["leaf"], "leaf.png", { type: "image/png" });
    const input = screen.getByTestId("scan.image_input");
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByRole("button", { name: /Analyze Disease/i }));

    expect(
      await screen.findByText(
        /We couldn't identify a disease from this image/i,
      ),
    ).toBeInTheDocument();
    // The page returns to the upload dropzone (not the results) so the farmer
    // can retry; the image is kept, so the analyze button stays enabled.
    expect(screen.getByTestId("scan.image_input")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Analyze Disease/i }),
    ).toBeEnabled();
  });
});

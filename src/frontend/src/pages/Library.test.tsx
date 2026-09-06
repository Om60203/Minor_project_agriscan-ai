import LibraryPage from "@/pages/LibraryPage";
import type { DiseaseEntry } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockGetDiseases = vi.fn();
const mockGetDiseasesByCrop = vi.fn();
const mockSearchDiseases = vi.fn();

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({
    actor: {
      getDiseases: mockGetDiseases,
      getDiseasesByCrop: mockGetDiseasesByCrop,
      searchDiseases: mockSearchDiseases,
    },
    isFetching: false,
  }),
}));

vi.mock("@caffeineai/object-storage", () => ({
  ExternalBlob: {
    fromBytes: () => ({ getDirectURL: () => "blob:img" }),
  },
}));

const tomatoBlight: DiseaseEntry = {
  crop: "Tomato",
  name: "Early Blight",
  imageUrl: {
    getDirectURL: () => "blob:img",
    _blob: new Uint8Array([1]),
  } as never,
  symptoms: ["Dark brown spots"],
  causes: ["Fungus Alternaria solani"],
  treatment: ["Apply copper fungicide"],
  prevention: ["Rotate crops"],
};

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <LibraryPage />
    </QueryClientProvider>,
  );
}

describe("LibraryPage", () => {
  it("shows an empty state when the library has no data", async () => {
    mockGetDiseases.mockResolvedValue([]);
    mockGetDiseasesByCrop.mockResolvedValue([]);
    mockSearchDiseases.mockResolvedValue([]);
    renderPage();
    expect(await screen.findByText(/Library is empty/i)).toBeInTheDocument();
  });

  it("searches for a crop category and returns disease entries with symptoms, causes, treatment, and prevention", async () => {
    mockGetDiseases.mockResolvedValue([tomatoBlight]);
    mockGetDiseasesByCrop.mockResolvedValue([]);
    mockSearchDiseases.mockResolvedValue([tomatoBlight]);

    renderPage();

    const search = screen.getByRole("textbox", { name: /Search diseases/i });
    fireEvent.change(search, { target: { value: "Tomato" } });

    await waitFor(() => {
      expect(mockSearchDiseases).toHaveBeenCalledWith("Tomato");
    });

    expect(
      await screen.findByRole("heading", { name: /Early Blight/i }),
    ).toBeInTheDocument();
    // The hero paragraph also mentions "symptoms", so scope to the card headings.
    expect(
      screen.getByRole("heading", { name: /Symptoms/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Causes/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Treatment/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Prevention/i }),
    ).toBeInTheDocument();
  });
});

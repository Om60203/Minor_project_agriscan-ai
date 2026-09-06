import { ChatAssistant } from "@/components/ChatAssistant";
import { type ChatMessage, ChatRole } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockGetChatHistory = vi.fn();
const mockSendChatMessage = vi.fn();

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({
    actor: {
      getChatHistory: mockGetChatHistory,
      sendChatMessage: mockSendChatMessage,
    },
    isFetching: false,
  }),
}));

vi.mock("@caffeineai/object-storage", () => ({
  ExternalBlob: {
    fromBytes: () => ({ getDirectURL: () => "blob:chat" }),
  },
}));

const assistantReply: ChatMessage = {
  role: ChatRole.assistant,
  content: "Aapke tomato ke patte pe brown dhabbe Early Blight ho sakte hain.",
  timestamp: 1700000000000000000n,
};

function renderAssistant() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <ChatAssistant />
    </QueryClientProvider>,
  );
}

describe("ChatAssistant", () => {
  it("opens the panel and answers a typed plant question with a real AI response", async () => {
    // The assistant reply is persisted to the backend; after sendChatMessage
    // succeeds the chatHistory query is invalidated and refetched, so the
    // mock history must include the reply once the message has been sent.
    mockGetChatHistory.mockImplementation(async () => {
      return mockSendChatMessage.mock.calls.length > 0 ? [assistantReply] : [];
    });
    mockSendChatMessage.mockResolvedValue(assistantReply);

    renderAssistant();
    fireEvent.click(screen.getByRole("button", { name: /Open AI assistant/i }));

    const input = screen.getByRole("textbox", {
      name: /Ask the AI assistant/i,
    });
    fireEvent.change(input, {
      target: { value: "Mere tomato ke patte pe brown dhabbe kyun hain?" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send message/i }));

    await waitFor(() => {
      expect(mockSendChatMessage).toHaveBeenCalledWith(
        "Mere tomato ke patte pe brown dhabbe kyun hain?",
      );
    });

    expect(
      await screen.findByText(/Early Blight ho sakte hain/i),
    ).toBeInTheDocument();
  });

  it("shows a clear error message when the AI response fails", async () => {
    mockGetChatHistory.mockResolvedValue([]);
    mockSendChatMessage.mockRejectedValue(new Error("network"));

    renderAssistant();
    fireEvent.click(screen.getByRole("button", { name: /Open AI assistant/i }));

    const input = screen.getByRole("textbox", {
      name: /Ask the AI assistant/i,
    });
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.click(screen.getByRole("button", { name: /Send message/i }));

    expect(
      await screen.findByText(/Could not send your message/i),
    ).toBeInTheDocument();
  });

  it("provides a mic button for voice input", () => {
    mockGetChatHistory.mockResolvedValue([]);
    renderAssistant();
    fireEvent.click(screen.getByRole("button", { name: /Open AI assistant/i }));
    expect(
      screen.getByRole("button", { name: /Start voice input/i }),
    ).toBeInTheDocument();
  });
});

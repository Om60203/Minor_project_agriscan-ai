import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  timestampToDate,
  useChatHistory,
  useSendChatMessage,
} from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";
import { Bot, Mic, Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult:
    | ((event: {
        results: ArrayLike<ArrayLike<{ transcript: string }>>;
      }) => void)
    | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}

function getSpeechRecognition(): SpeechRecognitionLike | null {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
}

function formatTime(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  if (!date) return "";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: history = [], isLoading } = useChatHistory();
  const sendMessage = useSendChatMessage();

  useEffect(() => {
    if (open && scrollRef.current && history.length > 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, history.length]);

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = getSpeechRecognition();
    if (!recognition) {
      setDraft((current) =>
        current
          ? current
          : "Voice input is not supported in this browser. Please type your question.",
      );
      return;
    }

    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ");
      setDraft((current) =>
        current ? `${current} ${transcript}` : transcript,
      );
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const handleSubmit = () => {
    const message = draft.trim();
    if (!message || sendMessage.isPending) return;
    setDraft("");
    sendMessage.mutate(message);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-4 bottom-20 z-50 flex h-[min(70vh,560px)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border bg-card shadow-elevated sm:right-6 sm:bottom-24"
            role="complementary"
            aria-label="AI assistant chat"
            data-ocid="chat.panel"
          >
            <div className="bg-gradient-primary flex items-center gap-3 px-4 py-3.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-white/20">
                <Bot className="size-5 text-primary-foreground" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold text-primary-foreground">
                  AgriScan Assistant
                </p>
                <p className="flex items-center gap-1.5 text-xs text-primary-foreground/80">
                  <span className="size-1.5 rounded-full bg-emerald-300" />
                  Online · Ask about your crops
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="rounded-full text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
                data-ocid="chat.close_button"
              >
                <X className="size-5" />
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div
                ref={scrollRef}
                className="flex flex-col gap-3 overflow-y-auto p-4"
              >
                {isLoading ? (
                  <div className="space-y-3" data-ocid="chat.loading_state">
                    <div className="h-10 w-3/4 animate-pulse rounded-xl bg-muted" />
                    <div className="h-10 w-1/2 animate-pulse rounded-xl bg-muted" />
                  </div>
                ) : history.length === 0 ? (
                  <div
                    className="flex flex-col items-center gap-2 py-8 text-center"
                    data-ocid="chat.empty_state"
                  >
                    <Sparkles className="size-8 text-accent" />
                    <p className="text-sm font-medium">
                      Ask me anything about your crops
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Try: "Mere tomato ke patte pe brown dhabbe kyun hain?"
                    </p>
                  </div>
                ) : (
                  history.map((message: ChatMessage, index: number) => (
                    <div
                      key={message.timestamp.toString()}
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-subtle",
                        message.role === "user"
                          ? "bg-gradient-primary self-end rounded-br-sm text-primary-foreground"
                          : "self-start rounded-bl-sm border bg-muted/60",
                      )}
                      data-ocid={`chat.message.${index + 1}`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p
                        className={cn(
                          "mt-1 text-[10px]",
                          message.role === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  ))
                )}
                {sendMessage.isPending && (
                  <div
                    className="flex items-center gap-1.5 self-start rounded-2xl border bg-muted/60 px-3.5 py-2.5"
                    data-ocid="chat.typing_state"
                  >
                    <span className="size-1.5 animate-bounce rounded-full bg-primary" />
                    <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.15s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.3s]" />
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t p-3">
              <div className="flex items-end gap-2">
                <Textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="Type your question…"
                  rows={1}
                  className="min-h-10 max-h-28 flex-1 resize-none rounded-xl"
                  aria-label="Ask the AI assistant a question"
                  data-ocid="chat.input"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleListening}
                  aria-label={
                    listening ? "Stop voice input" : "Start voice input"
                  }
                  className={cn(
                    "shrink-0 rounded-full",
                    listening &&
                      "animate-pulse-ring bg-accent text-accent-foreground",
                  )}
                  data-ocid="chat.mic_button"
                >
                  <Mic className="size-5" />
                </Button>
                <Button
                  size="icon"
                  onClick={handleSubmit}
                  disabled={!draft.trim() || sendMessage.isPending}
                  aria-label="Send message"
                  className="bg-gradient-primary shrink-0 rounded-full"
                  data-ocid="chat.send_button"
                >
                  <Send className="size-4" />
                </Button>
              </div>
              {sendMessage.isError && (
                <p
                  className="mt-2 text-xs text-destructive"
                  data-ocid="chat.error_state"
                >
                  Could not send your message. Please try again.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="bg-gradient-primary fixed right-4 bottom-4 z-50 size-14 rounded-full shadow-elevated transition-smooth hover:scale-105 sm:right-6 sm:bottom-6"
        data-ocid="chat.open_button"
      >
        {open ? <X className="size-6" /> : <Bot className="size-6" />}
      </Button>
    </>
  );
}

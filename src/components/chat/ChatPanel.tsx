import { Bot, MessageSquareText, SendHorizonal, X } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  meta: string;
};

const starterMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    text: "Welcome to Volt concierge. Tell me your budget, charging priority, or preferred body style and I’ll guide you.",
    meta: "Live showroom help",
  },
];

const quickActions = [
  "Compare premium EVs",
  "Show fast charging options",
  "Help me book a drive",
];

function replyFor(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("compare")) {
    return "Start with two models and I’ll help you weigh range, charging speed, and overall value.";
  }

  if (normalized.includes("charge") || normalized.includes("charging") || normalized.includes("fast")) {
    return "If charging speed matters most, look at the higher-voltage premium trims. Tell me your budget and I’ll narrow the shortlist.";
  }

  if (normalized.includes("book") || normalized.includes("drive")) {
    return "You can use the booking page for a full request, or tell me the model and city you want and I’ll point you in the right direction.";
  }

  if (normalized.includes("price") || normalized.includes("budget") || normalized.includes("cost")) {
    return "Give me your target budget and whether you care more about luxury, range, or performance. That will narrow the options quickly.";
  }

  return "Tell me what matters most: price, range, charging, or design. I’ll keep the shortlist focused.";
}

export function ChatPanel() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(starterMessages);
  const [isTyping, setIsTyping] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  const sendMessage = (text = draft) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: "user",
        text: trimmed,
        meta: "You",
      },
    ]);
    setDraft("");
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: replyFor(trimmed),
          meta: "Volt concierge",
        },
      ]);
      setIsTyping(false);
    }, 650);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div ref={panelRef} className="pointer-events-none fixed inset-x-4 bottom-4 z-40 md:inset-x-auto md:bottom-6 md:right-6">
      {isOpen ? (
        <aside
          className={`pointer-events-auto ml-auto overflow-hidden rounded-[1.75rem] border border-line/70 bg-[linear-gradient(180deg,hsl(var(--card)/0.96),hsl(var(--secondary)/0.9))] shadow-[0_30px_80px_-34px_hsl(var(--foreground)/0.42)] backdrop-blur-xl ${
            isMobile ? "w-full" : "w-[390px]"
          }`}
        >
          <div className="relative overflow-hidden border-b border-line/60 px-5 pb-4 pt-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--hero)/0.38),transparent_36%),radial-gradient(circle_at_bottom_left,hsl(var(--accent)/0.18),transparent_30%)]" />
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,hsl(var(--foreground))_0%,hsl(var(--primary))_60%,hsl(var(--hero))_100%)] text-primary-foreground shadow-soft">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg leading-none">Volt Concierge</p>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                      Online
                    </span>
                  </div>
                  <p className="mt-2 max-w-[18rem] text-sm text-muted-foreground">
                    Short, showroom-focused help for comparing models, pricing, and bookings.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-line/70 bg-background/75 p-2 text-muted-foreground transition hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-2xl border border-white/40 bg-white/45 px-3 py-2 backdrop-blur-sm dark:bg-white/5">
                <p className="text-sm font-semibold">Range</p>
                <p className="text-[11px] text-muted-foreground">Model guidance</p>
              </div>
              <div className="rounded-2xl border border-white/40 bg-white/45 px-3 py-2 backdrop-blur-sm dark:bg-white/5">
                <p className="text-sm font-semibold">Price</p>
                <p className="text-[11px] text-muted-foreground">Budget fit</p>
              </div>
              <div className="rounded-2xl border border-white/40 bg-white/45 px-3 py-2 backdrop-blur-sm dark:bg-white/5">
                <p className="text-sm font-semibold">Drive</p>
                <p className="text-[11px] text-muted-foreground">Booking help</p>
              </div>
            </div>
          </div>

          <div className="border-b border-line/60 px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => sendMessage(action)}
                  className="rounded-full border border-line/70 bg-background/80 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[320px] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" ? (
                  <div className="max-w-[85%] rounded-[1.4rem] rounded-bl-md border border-line/70 bg-card/85 px-4 py-3 shadow-soft">
                    <p className="text-sm leading-relaxed text-foreground">{message.text}</p>
                    <span className="mt-2 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{message.meta}</span>
                  </div>
                ) : (
                  <div className="max-w-[82%] rounded-[1.4rem] rounded-br-md bg-[linear-gradient(135deg,hsl(var(--foreground))_0%,hsl(var(--primary))_92%)] px-4 py-3 text-primary-foreground shadow-soft">
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span className="mt-2 block text-[11px] uppercase tracking-[0.16em] text-primary-foreground/70">{message.meta}</span>
                  </div>
                )}
              </div>
            ))}
            {isTyping ? (
              <div className="flex justify-start">
                <div className="rounded-[1.4rem] rounded-bl-md border border-line/70 bg-card/85 px-4 py-4 shadow-soft">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary/75 [animation-delay:-0.1s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary/55" />
                  </div>
                </div>
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="border-t border-line/60 px-4 pb-4 pt-3">
            <div className="flex items-end gap-3 rounded-[1.5rem] border border-line/70 bg-background/85 p-3">
              <textarea
                rows={1}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about pricing, charging, or bookings..."
                className="min-h-10 flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!draft.trim()}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,hsl(var(--foreground))_0%,hsl(var(--primary))_90%)] text-primary-foreground transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Send message"
              >
                <SendHorizonal className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 px-1 text-[11px] text-muted-foreground">Enter sends. Shift + Enter adds a line.</p>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto ml-auto relative flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-[linear-gradient(135deg,hsl(var(--foreground))_0%,hsl(var(--primary))_75%,hsl(var(--hero))_100%)] text-primary-foreground shadow-[0_24px_60px_-24px_hsl(var(--foreground)/0.5)] transition hover:scale-[1.04]"
          aria-label="Open chat"
          title="Open chat"
        >
          <MessageSquareText className="h-6 w-6" />
          <span className="absolute right-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-400" />
        </button>
      )}
    </div>
  );
}

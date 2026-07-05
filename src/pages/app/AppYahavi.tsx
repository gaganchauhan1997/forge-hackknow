import { useState } from "react";
import { Link } from "react-router";
import { aiCall } from "@/lib/providers";
import { loadUser, activeKeyCount } from "@/lib/store";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AppYahavi() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const user = loadUser();
  const hasKeys = activeKeyCount() > 0;

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const { result } = await aiCall(
        [
          {
            role: "system",
            content:
              "You are Yahavi AI — a friendly, expert career coach built into Forge Yahavi. Help with resumes, job search, career strategy, interview prep. Be concise, actionable, and warm. Suggest specific Forge tools when relevant.",
          },
          ...newMessages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
        ],
        { temperature: 0.7, max_tokens: 1000 }
      );
      setMessages([...newMessages, { role: "assistant", content: result }]);
    } catch (e: unknown) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `Error: ${(e as Error).message}\n\nMake sure you have API keys configured in Settings → API Keys.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#111]">
        <div className="w-10 h-10 bg-[#F9FF00] flex items-center justify-center text-xl text-[#1a1a1a]" style={{ borderRadius: "50%" }}>
          🤖
        </div>
        <div>
          <h1 className="font-oswald text-lg font-bold text-white">AI Yahavi</h1>
          <p className="font-inter text-[10px] text-green-400">● Always here to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 md:pb-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🤖</div>
            <h2 className="font-oswald text-lg font-bold mb-2 text-white">Hi{user.name ? `, ${user.name}` : ""}! I'm Yahavi AI</h2>
            <p className="font-inter text-sm text-white/50 mb-6">
              Your AI career assistant. Ask me anything about resumes, jobs, or career strategy.
            </p>

            {!hasKeys && (
              <div className="bg-[#F9FF00]/10 border border-[#F9FF00]/30 p-4 max-w-md mx-auto mb-6">
                <p className="font-inter text-xs text-white/60">
                  ⚠️ No API keys configured. Add at least one key in{" "}
                  <Link to="/app/settings" className="text-[#F9FF00] underline">
                    Settings → API Keys
                  </Link>{" "}
                  to chat.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto">
              {[
                "How do I improve my resume for tech roles?",
                "What's the best way to tailor for a specific job?",
                "Help me write a cover letter",
                "How to negotiate a salary offer?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                  }}
                  className="text-left p-3 border border-white/10 hover:border-[#F9FF00] transition-colors font-inter text-xs text-white/60 bg-[#2a2a2a]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 bg-[#F9FF00] flex items-center justify-center shrink-0 mt-1 text-[#1a1a1a]" style={{ borderRadius: "50%" }}>
                <Bot size={16} />
              </div>
            )}
            <div
              className={`max-w-[75%] p-3 font-inter text-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[#F9FF00] text-[#1a1a1a]"
                  : "bg-[#2a2a2a] border border-white/10 text-white/90"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 bg-[#F9FF00] text-[#1a1a1a] flex items-center justify-center shrink-0 mt-1" style={{ borderRadius: "50%" }}>
                <User size={14} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-[#F9FF00] flex items-center justify-center shrink-0 text-[#1a1a1a]" style={{ borderRadius: "50%" }}>
              <Bot size={16} />
            </div>
            <div className="bg-[#2a2a2a] border border-white/10 p-3">
              <Loader2 size={16} className="animate-spin text-[#F9FF00]" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-16 md:bottom-0 bg-[#111] border-t border-white/10 p-3">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Yahavi AI anything..."
            className="flex-1 border border-white/20 bg-[#2a2a2a] text-white px-3 py-2 font-inter text-sm focus:border-[#F9FF00] outline-none placeholder:text-white/30"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="bg-[#F9FF00] text-[#1a1a1a] px-4 py-2 hover:bg-[#e6e600] transition-colors disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

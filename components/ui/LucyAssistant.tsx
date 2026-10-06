"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, X, Send, RefreshCw } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

interface Message {
  id: string;
  sender: "user" | "lucy";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { label: "🚀 Current Work", text: "What is Venkateshwaran working on?" },
  { label: "💡 Projects", text: "Show me his key projects" },
  { label: "⚡ Skills", text: "What are his top skills?" },
  { label: "📬 Contact", text: "How can I contact him?" },
];

export default function LucyAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "lucy",
      text: "Hi there! I am L.U.C.Y, Venkateshwaran's AI Portfolio Assistant. Ask me anything about his projects, skills, or experience!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [githubSynced, setGithubSynced] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check GitHub Pulse
    fetch("https://api.github.com/users/Venkateshwaran-0a7i/repos?sort=updated")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGithubSynced(true);
        }
      })
      .catch(() => setGithubSynced(false));
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput("");
    setIsLoading(true);

    // Formulate response based on portfolio context
    setTimeout(() => {
      let botAnswer = "";
      const lower = textToSend.toLowerCase();

      if (lower.includes("current work") || lower.includes("working on")) {
        botAnswer = `Venkateshwaran is currently working as an AI R&D Engineer at Cavin Infotech in Chennai, researching and developing Generative AI applications, AI Agents, and Retrieval-Augmented Generation (RAG) architectures!`;
      } else if (lower.includes("project") || lower.includes("portfolio")) {
        botAnswer = `His top featured projects include:
1. Power BI Reporting Automation (eliminated 30% of manual reporting effort with live DAX tracking).
2. Automating Customer Operations (AI-powered conversational chatbot with NLP & Docker containerization).`;
      } else if (lower.includes("skill") || lower.includes("tech")) {
        botAnswer = `Venkateshwaran specializes in Artificial Intelligence & ML (90%), Programming & APIs (Python, FastAPI, SQL - 95%), Data Analytics & BI (Power BI, DAX - 92%), Deep Learning & NLP (85%), and Data Engineering (88%).`;
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) {
        botAnswer = `You can reach Venkateshwaran directly via email at ${PORTFOLIO_DATA.personal.email} or on LinkedIn at ${PORTFOLIO_DATA.personal.linkedin}.`;
      } else {
        botAnswer = `Venkateshwaran M is an AI R&D Engineer specializing in Generative AI, AI Agents, LLMs, and RAG architectures. He has demonstrated a 30% reduction in reporting time and 20% improvement in ML model accuracy across industry projects!`;
      }

      const lucyMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "lucy",
        text: botAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, lucyMsg]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Avatar Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 group border border-white/20"
        aria-label="Open L.U.C.Y AI Assistant"
      >
        <div className="relative">
          <Bot className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
        </div>
        <span className="hidden sm:inline-block font-bold text-sm font-heading tracking-wide pr-1">
          L.U.C.Y
        </span>
      </button>

      {/* Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[520px] glass-panel rounded-3xl shadow-2xl border border-white/15 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="p-4 bg-slate-950/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold font-heading text-white text-base">L.U.C.Y</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Gemini AI
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
                  <span className={`w-2 h-2 rounded-full ${githubSynced ? "bg-emerald-400" : "bg-amber-400"}`} />
                  <span>{githubSynced ? "GitHub Live Pulse Synced" : "Portfolio Agent"}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gemini Gradient Strip */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400" />

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none shadow-md"
                      : "bg-slate-800/90 text-slate-200 border border-white/10 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                <span>L.U.C.Y is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-slate-950/60 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((qp) => (
              <button
                key={qp.label}
                onClick={() => handleSend(qp.text)}
                className="px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 rounded-full border border-white/10 whitespace-nowrap transition"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-950 border-t border-white/10 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about Venkat..."
              className="flex-1 bg-slate-900 text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}

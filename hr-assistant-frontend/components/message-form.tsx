"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { saveMessage } from "@/lib/message-storage";

type HRMessage = {
  email: string;
  message: string;
};

export default function MessageForm({
  email,
  onLogout,
}: {
  email: string;
  onLogout: () => void;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<HRMessage[]>([]);

  // 🔹 GET messages from backend
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages");
    }
  };

  // Load messages on mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSend = async () => {
    const payload = { email, message };

    // keep localStorage logic (unchanged)
    saveMessage(payload);
    setMessage("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "Failed to send message");
        return;
      }

      // 🔹 Re-fetch messages after POST
      fetchMessages();
    } catch {
      alert("Network error");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#f5f6f8]">
      {/* Top bar */}
      <div className="h-[64px] w-full bg-white border-b flex items-center justify-end px-6 gap-3">
        <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
          AF
        </div>

        <Button
          variant="destructive"
          className="h-9 rounded-full px-5"
          onClick={() => {
            localStorage.clear();
            onLogout();
          }}
        >
          Logout
        </Button>
      </div>

      {/* Chat body */}
      <div className="flex-1 overflow-y-auto px-6 py-8 w-full">
        <div className="flex flex-col gap-6 w-full">
          {messages.length === 0 && (
            <div className="text-center text-sm text-muted-foreground mt-32">
              👋 Ask your first question to HR
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className="flex justify-end w-full">
              <div className="relative max-w-[35%] rounded-2xl bg-white px-6 py-4 text-sm shadow-md border">
                <p className="text-gray-800 leading-relaxed">
                  {msg.message}
                </p>
                <span className="absolute -bottom-4 right-3 text-[10px] text-gray-400">
                  You
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t bg-white px-6 py-4">
        <div className="flex items-end gap-4 w-full max-w-4xl mx-auto">
          <Textarea
            placeholder="Type your question here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            className="w-full resize-none rounded-2xl px-6 py-4 text-sm shadow-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            className="rounded-2xl px-8 py-4 shadow-md"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

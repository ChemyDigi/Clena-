"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { saveMessage } from "@/lib/message-storage";
import { ArrowUp } from "lucide-react";

type HRMessage = {
  message: string;
  email?: string;
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

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch {
      console.error("Failed to fetch messages");
    }
  };

  useEffect(() => {
    fetchMessages(); // initial load

    const interval = setInterval(() => {
      fetchMessages();
    }, 2000); // ⏱ every 2 seconds

    return () => clearInterval(interval);
  }, []);


  const handleSend = async () => {
    const payload = { email, message };
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

      fetchMessages();
    } catch {
      alert("Network error");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#212121] text-gray-100 font-sans">
      {/* Top bar */}
      <div className="h-[64px] w-full bg-[#212121] flex items-center justify-between px-6 gap-3">
         <div className="flex items-center">
            <Image 
              src="/AlchemyLogo.png" 
              alt="Alchemy Logo" 
              width={100} 
              height={32} 
              className="object-contain"
              priority
            />
         </div>
         <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-600 flex items-center justify-center text-sm font-medium text-white">
              AF
            </div>
              <Button
                variant="ghost"
                className="h-9 px-3 text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={async () => {
                  try {
                    await fetch("/api/messages/clear", { method: "POST" });
                  } catch {
                    console.error("Failed to clear messages");
                  }
    
                  localStorage.clear();
                  onLogout();
                }}
              >
                Logout
              </Button>
         </div>
      </div>

      {/* Chat body */}
      <div className="flex-1 overflow-y-auto px-6 py-8 w-full flex justify-center">
        <div className="flex flex-col gap-6 w-full max-w-3xl">
          {messages.length === 0 && (
            <div className="text-center text-2xl font-semibold text-white mt-32">
              What can I help with?
            </div>
          )}

          {messages.map((msg, index) => {
            const isUser = !!msg.email;

            return (
              <div
                key={index}
                className={`flex w-full ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div 
                  className={`relative max-w-[80%] px-5 py-3 text-[15px] leading-7 ${
                     isUser ? "bg-[#2F2F2F] rounded-[26px] text-white" : "text-gray-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input bar */}
      <div className="bg-[#212121] px-6 pb-6 pt-2">
        <div className="w-full max-w-3xl mx-auto relative bg-[#2F2F2F] rounded-[26px]">
          <Textarea
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            className="w-full resize-none border-0 bg-transparent px-5 py-4 text-white text-[16px] placeholder:text-gray-400 focus-visible:ring-0 min-h-[52px] max-h-[200px] overflow-y-auto pr-12"
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
            size="icon"
            className={`absolute right-2 bottom-2 h-8 w-8 rounded-full transition-colors ${
              message.trim() 
                ? "bg-white hover:bg-gray-200 text-black" 
                : "bg-transparent text-gray-500 cursor-not-allowed"
            }`}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { LoginForm } from "@/components/login-form";
import MessageForm from "@/components/message-form";
import LeaveForm from "@/components/LeaveForm";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [view, setView] = useState<"home" | "chat" | "leave">("home");

  const handleLogout = () => {
    setEmail(null);
    setView("home");
  };

  // 🔹 Not logged in → show login
  if (!email) {
    return <LoginForm onSuccess={(e) => setEmail(e)} />;
  }

  // 🔹 After login → show selection screen
  if (view === "home") {
    return (
      <div className="min-h-screen bg-[#212121] text-white flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-semibold">Welcome</h1>

        <div className="flex gap-6">
          <Button onClick={() => setView("chat")}>
            Open Chatbot
          </Button>

          <Button onClick={() => setView("leave")}>
            Apply Leave
          </Button>
        </div>

        <Button
          variant="ghost"
          className="mt-6"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    );
  }

  // 🔹 Chat view
  if (view === "chat") {
    return (
      <MessageForm
        email={email}
        onLogout={handleLogout}
        onBack={() => setView("home")}
      />
    );
  }

  // 🔹 Leave view
  if (view === "leave") {
    return (
      <LeaveForm
        email={email}
        onBack={() => setView("home")}
      />
    );
  }

  return null;
}
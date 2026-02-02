"use client";

import { useState } from "react";
import MessageForm from "@/components/message-form";
import { LoginForm } from "@/components/login-form";

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);

  if (!email) {
    return <LoginForm onSuccess={setEmail} />;
  }

  return (
    <MessageForm
      email={email}
      onLogout={() => setEmail(null)} // ✅ LOGOUT WORKS
    />
  );
}

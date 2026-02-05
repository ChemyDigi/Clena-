"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const HARDCODED_USER = {
  email: "test@alchemy.lk",
  password: "123456",
};

export function LoginForm({
  className,
  onSuccess,
}: {
  className?: string;
  onSuccess: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      email === HARDCODED_USER.email &&
      password === HARDCODED_USER.password
    ) {
      onSuccess(email);
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen w-full flex items-center justify-center bg-[#212121] text-gray-100 font-sans p-4",
        className
      )}
    >
      <Card className="w-full max-w-md bg-[#2F2F2F] border-0 shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Image 
              src="/AlchemyLogo.png" 
              alt="Alchemy Logo" 
              width={120} 
              height={40} 
              className="object-contain"
              priority
            />
          </div>
          <CardTitle className="text-2xl font-semibold text-white">Welcome Back</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your email and password to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Email</label>
              <Input
                type="email"
                placeholder="hr@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#383838] border-0 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-gray-500 h-12"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#383838] border-0 text-white focus-visible:ring-1 focus-visible:ring-gray-500 h-12"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-white text-black hover:bg-gray-200 h-12 font-medium text-base rounded-md"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

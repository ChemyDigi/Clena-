"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LeaveForm({
  email,
  onBack,
}: {
  email: string;
  onBack: () => void;
}) {
  const [name, setName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!name || !fromDate || !toDate) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("fromDate", fromDate);
    formData.append("toDate", toDate);

    if (file) {
      formData.append("document", file);
    }

    try {
      await fetch("/api/leave", {
        method: "POST",
        body: formData,
      });

      alert("Leave request submitted successfully");
      onBack();
    } catch {
      alert("Failed to submit leave");
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-semibold">Leave Request Form</h1>

      <div className="w-full max-w-md space-y-5 bg-[#2F2F2F] p-6 rounded-xl shadow-md">

  {/* Name */}
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-300">
      Full Name
    </label>
    <Input
      placeholder="Enter your full name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="bg-[#383838] border-0 text-white placeholder:text-gray-500"
    />
  </div>

        {/* From Date */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
            Leave Start Date
            </label>
            <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-[#383838] border-0 text-white"
            />
        </div>

        {/* To Date */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
            Leave End Date
            </label>
            <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-[#383838] border-0 text-white"
            />
        </div>

        {/* Document Upload */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
            Supporting Document (Optional)
            </label>
            <Input
            type="file"
            onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
            }
            className="bg-[#383838] border-0 text-gray-400 file:text-white"
            />
            <p className="text-xs text-gray-500">
            Upload medical certificate or any supporting file (PDF, JPG, PNG)
            </p>
        </div>

        {/* Buttons */}
        <div className="pt-4 space-y-3">
            <Button onClick={handleSubmit} className="w-full">
            Submit Leave Request
            </Button>

            <Button variant="ghost" onClick={onBack} className="w-full">
            Back to Home
            </Button>
        </div>
        </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!prompt) return;

    setLoading(true);

    // Simulating async API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const dummyResponse = {
      roadmap:
        "Step 1: Market Research\nStep 2: Build MVP\nStep 3: Launch Beta\nStep 4: Scale Business",
      skills:
        "React.js, Next.js, AI Integration, Marketing Strategy, Financial Planning",
      budget: "₹5,00,000 Estimated Total Budget",
    };

    setLoading(false);

    // Pass data to result page
    router.push(
      `/result?roadmap=${encodeURIComponent(
        dummyResponse.roadmap
      )}&skills=${encodeURIComponent(
        dummyResponse.skills
      )}&budget=${encodeURIComponent(dummyResponse.budget)}`
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      
  {/* Gradient Glow Effects */}
  <div className="absolute -top-25 -left-25 w-100 h-100 bg-blue-500 rounded-full blur-[150px] opacity-30"></div>
  <div className="absolute -bottom-25 -right-25 w-100 h-100 bg-purple-500 rounded-full blur-[150px] opacity-30"></div>

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          AI Startup Management Dashboard
        </h1>

        <input
          type="text"
          placeholder="Enter your startup idea..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className= "w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none mb-4 border border-white/20 focus:ring-2 focus:ring-blue-400"
        />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-xl flex items-center justify-center"
      >
        {loading ? (
          <div className="flex items-center justify-center w-full">
            <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          "Generate Plan"
        )}
      </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  // ---------------- AUTH CHECK ----------------
  useEffect(() => {
    const verifyUser = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/protected", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUsername(data.username);
        setAuthLoading(false);

        // prevent back after logout
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
          router.push("/login");
        };

      } catch {
        sessionStorage.removeItem("token");
        router.push("/login");
      }
    };

    verifyUser();
  }, []);

  // ---------------- GENERATE PLAN ----------------
  const handleSubmit = async () => {
    if (!prompt) return;

    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch("http://localhost:8000/generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setLoading(false);

      router.push(
        `/result?roadmap=${encodeURIComponent(data.roadmap)}&skills=${encodeURIComponent(data.skills)}&budget=${encodeURIComponent(data.budget)}&prompt=${encodeURIComponent(prompt)}`
      );

    } catch {
      setLoading(false);
      alert("Something went wrong");
    }
  };

  // ---------------- PAGE LOADER ----------------
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ---------------- UI ----------------
  return (
    <div className="relative min-h-screen bg-[#0b0f19] overflow-hidden text-white">

      {/* BACKGROUND LIGHT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_85%_75%,rgba(168,85,247,0.18),transparent_40%)]"></div>

      {/* NAVBAR */}
      <div className="absolute top-0 left-0 w-full px-8 py-5 flex items-center backdrop-blur-md bg-white/5 border-b border-white/10">

        <div className="w-1/3"></div>

        <div className="w-1/3 text-center">
          <h1 className="text-lg font-semibold tracking-wide">
            AI Startup Manager
          </h1>
        </div>

        <div className="w-1/3 flex justify-end items-center gap-4 text-sm">
          <span className="opacity-80">
            Welcome, <span className="font-medium">{username}</span>
          </span>

          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-red-500/80 transition px-3 py-1.5 rounded-lg text-xs font-medium"
          >
            Logout
          </button>
        </div>

      </div>

      {/* GLOW EFFECTS */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-blue-500/30 rounded-full blur-[160px]"></div>
      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] bg-purple-500/30 rounded-full blur-[160px]"></div>

      {/* CENTER CARD */}
      <div className="min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.4)] w-full max-w-2xl text-center">

          <h1 className="text-3xl font-semibold mb-6 tracking-wide">
            AI Startup Management Dashboard
          </h1>

          <input
            type="text"
            placeholder="Enter your startup idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none mb-5 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600/90 hover:bg-blue-600 active:scale-[0.99] transition-all duration-200 py-3 rounded-xl flex items-center justify-center font-medium shadow-lg shadow-blue-600/20"
          >
            {loading ? (
              <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Generate Plan"
            )}
          </button>

        </div>
      </div>
    </div>
  );
}

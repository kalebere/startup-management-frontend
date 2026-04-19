"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // save token
      sessionStorage.setItem("token", data.token);

      // redirect
      router.push("/dashboard");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(/startup-bg.png)" }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-indigo-900/70 to-purple-700/60 backdrop-blur-sm" />

      <form
        onSubmit={handleLogin}
        className="relative w-90 p-8 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl text-white shadow-2xl text-center"
      >
        <h2 className="text-2xl font-semibold mb-6 tracking-wide">
          AI Startup Manager
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-3 mb-4 rounded-full bg-white/20 placeholder-white/80 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 mb-3 rounded-full bg-white/20 placeholder-white/80 outline-none"
        />

        <div className="flex justify-between text-sm mb-4 opacity-90">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Remember me
          </label>
          <span className="cursor-pointer">Forgot Password?</span>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-300 text-sm mb-3">{error}</p>
        )}

        {/* BUTTON / SPINNER */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-white text-indigo-600 font-semibold hover:scale-105 transition flex items-center justify-center"
        >
          {loading ? (
            <div className="h-5 w-5 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>

        <p className="mt-4 text-sm opacity-90">
          Don't have an account?{" "}
          <span className="font-semibold cursor-pointer">Register</span>
        </p>
      </form>
    </div>
  );
}

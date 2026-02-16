import React from "react";
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" // import your image at top: import bg from './startup-bg.png';
    style={{backgroundImage: 'url(/startup-bg.png)'}}>
      <div className="absolute inset-0 bg-linear-to-br from-indigo-900/70 to-purple-700/60 backdrop-blur-sm" />

      <div className="relative w-90 p-8 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl text-white shadow-2xl text-center">
        <h2 className="text-2xl font-semibold mb-6 tracking-wide">AI Startup Manager</h2>

        <input
          type="email"
          placeholder="Email ID"
          className="w-full px-4 py-3 mb-4 rounded-full bg-white/20 placeholder-white/80 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 mb-3 rounded-full bg-white/20 placeholder-white/80 outline-none"
        />

        <div className="flex justify-between text-sm mb-4 opacity-90">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Remember me
          </label>
          <span className="cursor-pointer">Forgot Password?</span>
        </div>

        <button className="w-full py-3 rounded-full bg-white text-indigo-600 font-semibold hover:scale-105 transition">
          Login
        </button>

        <p className="mt-4 text-sm opacity-90">
          Don't have an account? <span className="font-semibold cursor-pointer">Register</span>
        </p>
      </div>
    </div>
  );
}

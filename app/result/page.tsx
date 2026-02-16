"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const roadmap = searchParams.get("roadmap");
  const skills = searchParams.get("skills");
  const budget = searchParams.get("budget");

  return (
    <div
      className="min-h-screen bg-cover bg-center p-10"
      style={{ backgroundImage: "url('/startup-bg.png')" }}
    >
      <button
        onClick={() => router.back()}
        className="mb-6 bg-gray-800 text-white px-4 py-2 rounded-lg"
      >
        ← Go Back
      </button>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Roadmap Card */}
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-white">
          <h2 className="text-xl font-bold mb-4">Startup Roadmap</h2>
          <p className="whitespace-pre-line">{roadmap}</p>
        </div>

        {/* Skills Card */}
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-white">
          <h2 className="text-xl font-bold mb-4">Required Skills</h2>
          <p>{skills}</p>
        </div>

        {/* Budget Card */}
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-white">
          <h2 className="text-xl font-bold mb-4">Timing & Budget Prediction</h2>
          <p className="text-lg font-semibold">{budget}</p>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import ThreeBackground from "../components/ThreeBackground";
import logo_img from "../assets/logo.png";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  return (
    <div
      className="
        relative min-h-screen flex overflow-hidden
        text-gray-900 dark:text-gray-100
        bg-linear-to-br
        from-pink-50 via-purple-50 to-blue-50
        dark:from-[#0f172a] dark:via-[#020617] dark:to-black
        transition-colors duration-300
      "
    >
      {/* 🌌 Three.js Background */}
      <ThreeBackground />

      {/* 🌫 Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06] z-1"
        style={{
          backgroundImage: `url(${logo_img})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
        // style={{
        //   backgroundImage:
        //     "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.4\"/></svg>')",
        // }}
      />

      {/* 🧱 App Content */}
      <div className="relative z-2 flex w-full">{children}</div>
      {showDisclaimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/20 dark:bg-gray-900/60 rounded-xl p-8 max-w-md w-[90%] text-center shadow-lg border border-white/30">
            <h2 className="text-2xl font-bold mb-4">
              🔐 Welcome to EncodeX Fun!
            </h2>
            <p className="mb-6 text-sm sm:text-base">
              Encode your secrets, decode the mysteries, and have fun exploring
              strings in Base64! 🚀 Let's get started!
            </p>
            <button
              onClick={() => setShowDisclaimer(false)}
              className="px-6 py-2 rounded-lg bg-linear-to-r from-green-400 via-blue-400 to-purple-400 text-white font-semibold hover:scale-105 transition-transform"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

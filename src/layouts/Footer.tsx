import { useEffect, useState } from "react";

export default function Footer() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  // Detect PWA installation
  useEffect(() => {
    const checkInstalled = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone;
      setIsInstalled(standalone);
    };

    checkInstalled();

    // Listen for beforeinstallprompt
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Handle Install PWA
  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      console.log("PWA installed");
      setShowInstall(false);
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  // Handle Open in App
  const handleOpenApp = () => {
    window.focus(); // brings the app window to front
    alert("You are already in the app!"); // optional feedback
  };

  return (
    <footer className="h-12 border-t border-border/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between text-xs text-white-500">
        <span>© Kusal {new Date().getFullYear()} EncodeX</span>

        {/* Show Install or Open button based on state */}
        {isInstalled ? (
          <button
            onClick={handleOpenApp}
            className="
              px-4 py-1 rounded-xl
              bg-white/20 backdrop-blur-md
              border border-white/30
              text-white font-semibold text-xs
              shadow-lg
              hover:bg-white/30 hover:scale-105
              transition-all duration-200
              relative overflow-hidden
            "
          >
            <span className="relative z-10">Open in App</span>
          </button>
        ) : showInstall ? (
          <button
            onClick={handleInstall}
            className="
              px-4 py-1 rounded-xl
              bg-white/20 backdrop-blur-md
              border border-white/30
              text-white font-semibold text-xs
              shadow-lg
              hover:bg-white/30 hover:scale-105
              transition-all duration-200
              relative overflow-hidden
            "
          >
            <span className="relative z-10">Install App</span>
            <span className="
              absolute inset-0 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400
              opacity-30 blur-xl animate-pulse
              rounded-xl
            "></span>
          </button>
        ) : null}
      </div>
    </footer>
  );
}

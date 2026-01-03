import { useState, useEffect } from "react";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import InputCard from "./layouts/InputCard";
import MainLayout from "./layouts/MainLayout";
import OutputCard from "./layouts/OutputCard";
import Sidebar from "./layouts/Sidebar";
import ModeToggle from "./layouts/ModeToggle";
import { decodeText, encodeText } from "./utils/Encoding";

export type HistoryItem = {
  id: string;
  input: string;
  output: string;
  mode: "encode" | "decode";
  timestamp: number;
};

export default function App() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState("");

  // History state (persistent in localStorage)
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  // Reset input/output whenever mode changes
  useEffect(() => {
    setInputText("");
    setOutputText("");
    setError("");
  }, [mode]);

  // Real-time encoding/decoding with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!inputText) {
        setOutputText("");
        setError("");
        return;
      }

      try {
        if (mode === "encode") {
          const encoded = encodeText(inputText);
          setOutputText(encoded);
          setError("");
        } else {
          const decoded = decodeText(inputText);
          setOutputText(decoded);
          setError(decoded === "Invalid input for decoding!" ? decoded : "");
        }
      } catch {
        setOutputText("");
        setError("An unexpected error occurred.");
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [inputText, mode]);

  // Add item to history (keep last 20 entries)
  const addHistory = (input: string, output: string, mode: "encode" | "decode") => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      input,
      output,
      mode,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev.filter((h) => h.input !== input)].slice(0, 20);
      localStorage.setItem("history", JSON.stringify(updated));
      return updated;
    });
  };

  // Delete a single history item
  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((h) => h.id !== id);
      localStorage.setItem("history", JSON.stringify(updated));
      return updated;
    });
  };

  // Clear all history with confirmation
  const handleClearAllHistory = () => {
    if (history.length === 0) return;
    const confirmed = window.confirm("Are you sure you want to clear all history?");
    if (!confirmed) return;

    setHistory([]);
    localStorage.removeItem("history");
  };

  // Handlers
  const handleClearInput = () => setInputText("");
  const handleClearOutput = () => setOutputText("");
  const handleCopyOutput = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      alert("Copied to clipboard!");
    }
  };

  // Select history item (restore input & mode)
  const handleSelectHistory = (item: HistoryItem) => {
    setInputText(item.input);
    setMode(item.mode);
  };

  return (
    <MainLayout>
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
          {/* Centered Mode Toggle */}
          <div className="flex justify-between items-center mb-6 max-w-md mx-auto">
            <ModeToggle mode={mode} setMode={setMode} />

            <button
              onClick={() => {
                if (!outputText || error) return;
                addHistory(inputText, outputText, mode);
                handleClearInput();
                handleClearOutput();
              }}
              className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow"
              disabled={!outputText || error !== ""}
            >
              Save to History
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InputCard
              mode={mode}
              value={inputText}
              onChange={setInputText}
              onClear={handleClearInput}
              onFileImport={({ name, type, content }) => {
                if (type.startsWith("text/") || type === "application/json") {
                  setInputText(content); // Show text or JSON
                } else {
                  setInputText(`[File: ${name}]`); // Placeholder for images/other files
                }
              }}
            />

            <OutputCard
              mode={mode}
              value={outputText}
              error={error}
              onClear={handleClearOutput}
              onCopy={handleCopyOutput}
            />
          </div>
        </main>

        <Footer />
      </div>

      {/* Sidebar with history */}
      <Sidebar
        history={history}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteHistory}
        onClearAll={handleClearAllHistory}
      />
    </MainLayout>
  );
}

import { FiTrash2 } from "react-icons/fi";
import type { HistoryItem } from "../App";
import { useState } from "react";

type SidebarProps = {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
};

export default function Sidebar({ history, onSelect, onDelete, onClearAll }: SidebarProps) {
  const [filter, setFilter] = useState<"all" | "encode" | "decode">("all");

  // Filtered history based on toggle
  const filteredHistory =
    filter === "all" ? history : history.filter((h) => h.mode === filter);

  return (
    <aside className="hidden lg:flex w-80 border-l border-border bg-surface/80 backdrop-blur-xl flex-col p-4">
      <h2 className="text-sm font-medium text-muted mb-4 tracking-wide uppercase">History</h2>

      {/* Filter toggle */}
      <div className="flex gap-2 mb-4">
        {(["all", "encode", "decode"] as const).map((f) => (
          <button
            key={f}
            className={`px-2 py-1 rounded-lg text-xs font-medium transition ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setFilter(f)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Clear All button */}
      {history.length > 0 && (
       <button
  onClick={onClearAll}
  className="mb-2 px-2 py-1 text-xs text-red-600 hover:text-red-700 hover:underline self-start flex items-center gap-1 transition"
>
  <FiTrash2 className="text-sm" />
  <span>Clear All</span>
</button>

      )}

      <div className="flex-1 space-y-2 overflow-y-auto scroll-smooth">
        {filteredHistory.length === 0 ? (
          <div className="p-3 rounded-xl bg-surface/50 border border-border text-sm text-muted">
            No history yet
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-surface/30 border border-border text-sm text-muted flex flex-col gap-1 hover:bg-surface/50 transition relative"
            >
              {/* Delete icon */}
              <button
                onClick={() => onDelete(item.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg"
                title="Delete"
              >
                 <FiTrash2 />
              </button>

              <div
                className="font-medium cursor-pointer"
                onClick={() => onSelect(item)}
              >
                {item.mode.toUpperCase()}
              </div>

              <div
                className="truncate cursor-pointer"
                onClick={() => onSelect(item)}
              >
                {item.input}
              </div>

              <div className="text-xs text-gray-400">
                {new Date(item.timestamp).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

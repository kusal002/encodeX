import { useRef } from "react";
import { FiTrash2 } from "react-icons/fi";

type Mode = "encode" | "decode";

type InputCardProps = {
  mode: Mode;
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  onFileImport?: (fileData: {
    name: string;
    type: string;
    content: string;
  }) => void;
};

export default function InputCard({
  mode,
  value,
  onChange,
  onClear,
  onFileImport,
}: InputCardProps) {
  const bgClass =
    mode === "encode"
      ? "bg-gradient-to-br from-blue-200/20 via-blue-100/20 to-white/10"
      : "bg-gradient-to-br from-green-200/20 via-green-100/20 to-white/10";

  const dropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  // Handle file
  const handleFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result as string;

      if (file.type.startsWith("text/") || file.type === "application/json") {
        onChange(content);
      } else {
        const displayContent = `[File: ${file.name}]`;
        onChange(displayContent);
      }

      onFileImport?.({ name: file.name, type: file.type, content });
    };

    if (file.type.startsWith("text/") || file.type === "application/json") {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      ref={dropRef}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`rounded-2xl ${bgClass} backdrop-blur-lg p-4 flex flex-col shadow-md transition-all duration-300 hover:brightness-110`}
    >
      <h3
        className={`text-lg font-semibold mb-2 ${
          mode === "encode" ? "text-blue-400" : "text-green-400"
        }`}
      >
        Input
      </h3>

      <div className="flex-1 min-h-50 max-h-125 mb-2">
        <textarea
          className={`
    w-full h-full resize-none rounded-xl border border-gray-300/30 p-3
    bg-white/20 text-gray-900 placeholder-gray-400
    focus:outline-none focus:bg-white/30 focus:text-gray-900

    dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-500
    dark:focus:bg-gray-700/30 dark:focus:text-gray-100
  `}
          placeholder="Type your text here or drag & drop a file..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div className="flex gap-2 mt-4 justify-end">
        {/* Import Button */}
        <button
          onClick={handleImportClick}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
                     text-gray-700 dark:text-gray-200 active:scale-95 transition flex items-center gap-2"
        >
          <span className="text-lg">📂</span>
          <span className="text-sm font-medium">Import</span>
        </button>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        />

        {/* Clear Button */}
        <button
          onClick={onClear}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
                     text-gray-700 dark:text-gray-200 active:scale-95 transition flex items-center gap-2"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
}

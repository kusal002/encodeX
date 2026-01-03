import { FiCopy, FiDownload, FiTrash2 } from "react-icons/fi";

type Mode = "encode" | "decode";

type OutputCardProps = {
  mode: Mode;
  value: string;
  error?: string;
  onClear: () => void;
  onCopy: () => void;
};

const isBase64Image = (str: string) =>
  str.startsWith("iVBORw0KGgo") || // PNG
  str.startsWith("/9j/") ||        // JPG
  str.startsWith("R0lGOD") ||      // GIF
  str.startsWith("UklGR");         // WEBP

export default function OutputCard({
  mode,
  value,
  error,
  onClear,
  onCopy,
}: OutputCardProps) {
  const bgClass =
    mode === "encode"
      ? "bg-gradient-to-br from-green-200/20 via-green-100/20 to-white/10"
      : "bg-gradient-to-br from-blue-200/20 via-blue-100/20 to-white/10";

  const handleExport = () => {
    if (!value || error || mode !== "decode") return;

    let blob: Blob;
    let filename = "decoded-output.txt";

    // 🖼 Base64 Image
    if (isBase64Image(value)) {
      const byteChars = atob(value);
      const byteNumbers = Array.from(byteChars, (c) => c.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);

      let mime = "image/png";
      if (value.startsWith("/9j/")) mime = "image/jpeg";
      if (value.startsWith("R0lGOD")) mime = "image/gif";
      if (value.startsWith("UklGR")) mime = "image/webp";

      blob = new Blob([byteArray], { type: mime });
      filename = `decoded-image.${mime.split("/")[1]}`;
    }

    // 📄 JSON
    else if (value.trim().startsWith("{") || value.trim().startsWith("[")) {
      blob = new Blob([value], { type: "application/json" });
      filename = "decoded-data.json";
    }

    // 📄 Plain text
    else {
      blob = new Blob([value], { type: "text/plain" });
      filename = "decoded-text.txt";
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`rounded-2xl ${bgClass} backdrop-blur-lg p-4 flex flex-col shadow-md transition-all duration-300 hover:brightness-110`}
    >
      <h3
        className={`text-lg font-semibold mb-2 ${
          mode === "encode" ? "text-green-400" : "text-blue-400"
        }`}
      >
        Output
      </h3>

      {/* Image Preview */}
      {!error && isBase64Image(value) && (
        <img
          src={`data:image/png;base64,${value}`}
          alt="Decoded preview"
          className="max-h-40 mb-3 rounded-lg border border-gray-300/30 self-start"
        />
      )}

      {/* Output */}
      <div
        className="
          flex-1
          min-h-50
          max-h-125
          overflow-y-auto
          overflow-x-hidden
          rounded-xl
          bg-white/20
          dark:bg-gray-800/30
          border border-gray-300/30
          p-3
          text-gray-800
          dark:text-gray-100
          whitespace-pre-wrap
          wrap-break-word
        "
      >
        {error ? (
          <span className="text-red-600 dark:text-red-400">{error}</span>
        ) : (
          value || "Output will appear here"
        )}
      </div>

      {/* Action Bar */}
      <div className="flex gap-2 mt-4 justify-end">
        {/* Export */}
        <button
          onClick={handleExport}
          disabled={!value || !!error || mode !== "decode"}
          title="Export decoded file"
          className="
            px-4 py-2
            rounded-lg
            bg-blue-500
            hover:bg-blue-600
            disabled:opacity-50
            text-white
            flex
            items-center
            gap-2
            transition
          "
        >
          <FiDownload />
          Export
        </button>

        {/* Copy */}
        <button
          onClick={onCopy}
          disabled={!value || !!error}
          title="Copy output"
          className="
            px-3 py-2
            rounded-lg
            bg-gray-100
            dark:bg-gray-700
            hover:bg-gray-200
            dark:hover:bg-gray-600
            active:scale-95
            transition
            flex
            items-center
            justify-center
          "
        >
          <FiCopy size={18} />
        </button>

        {/* Clear */}
        <button
          onClick={onClear}
          disabled={!value}
          title="Clear output"
          className="
            px-3 py-2
            rounded-lg
            bg-gray-100
            dark:bg-gray-700
            hover:bg-gray-200
            dark:hover:bg-gray-600
            active:scale-95
            transition
            flex
            items-center
            justify-center
          "
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
}

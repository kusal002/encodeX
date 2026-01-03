import React from "react";

type Mode = "encode" | "decode";

type ModeToggleProps = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  return (
    <div className="flex items-center bg-gray-200/30 rounded-full p-1 w-max">
      <button
        onClick={() => setMode("encode")}
        className={`px-4 py-1 rounded-full transition-colors duration-200 font-medium ${mode === "encode"
            ? "bg-blue-500 text-white shadow"
            : "text-white-500 hover:bg-blue-200/50"
          }`}
      >
        Encode
      </button>
      <button
        onClick={() => setMode("decode")}
        className={`px-4 py-1 rounded-full transition-colors duration-200 font-medium ${mode === "decode"
            ? "bg-green-500 text-white shadow"
            : "text-white-700 hover:bg-green-200/50"
          }`}
      >
        Decode
      </button>
    </div>
  );
};

export default ModeToggle;

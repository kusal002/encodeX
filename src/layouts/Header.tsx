import { FiMenu } from "react-icons/fi";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
        aria-label="Open sidebar"
      >
        <FiMenu size={22} />
      </button>

      {/* App title */}
      <h1 className="text-xl font-semibold tracking-tight">
        EncodeX
      </h1>

      {/* Right side */}
      <span className="text-sm text-gray-500 hidden sm:block">
        Local · Secure
      </span>
    </header>
  );
}

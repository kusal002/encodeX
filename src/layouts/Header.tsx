

export default function Header() {
  // const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between">
      {/* App Title */}
      <h1 className="text-xl font-semibold tracking-tight">
         EncodeX
      </h1>

      {/* Theme Toggle */}
       <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Local · Secure</span>
           {/* <button
        onClick={toggleTheme}
        title="Toggle theme"
        className="
          p-2 rounded-full
          bg-white/30 dark:bg-white/10
          backdrop-blur-md
          hover:scale-105 active:scale-95
          transition
        "
      >
        {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
      </button> */}
        </div>
     
    </header>
  );
}

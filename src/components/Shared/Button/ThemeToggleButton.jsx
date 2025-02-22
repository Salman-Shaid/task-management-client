import { useTheme } from '../../../providers/ThemeContext'; // Import useTheme hook
import { BsMoon, BsSun } from "react-icons/bs"; // Importing moon and sun icons
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 sm:p-2 md:px-3 lg:px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-full transition-all"
    >
      {theme === "light" ? <BsMoon size={20} /> : <BsSun size={22} />}
      <span className="hidden sm:inline">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
};

export default ThemeToggleButton;

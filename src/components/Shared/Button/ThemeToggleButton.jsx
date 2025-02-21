import { useTheme } from '../../../providers/ThemeContext'; // Import useTheme hook

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-slate-800 dark:bg-slate-700 text-white rounded-md"
    >
      {theme === 'light' ? '🌙 Dark Mode' : '🌞 Light Mode'}
    </button>
  );
};

export default ThemeToggleButton;

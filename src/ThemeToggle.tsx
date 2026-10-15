import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'светлую' : 'тёмную';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Переключить на ${nextTheme} тему`}
      title={`Переключить на ${nextTheme} тему`}
      className="theme-toggle group"
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === 'dark'
          ? <Sun size={19} className="transition-transform duration-300 group-hover:rotate-45 group-active:scale-75" />
          : <Moon size={19} className="transition-transform duration-300 group-hover:-rotate-12 group-active:scale-75" />}
      </span>
    </button>
  );
}

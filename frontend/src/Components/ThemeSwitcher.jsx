import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'white' ? 'dark' : 'white');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="theme-button"
    >
      {theme === 'white' ? (
        <Moon className="w-4 h-4 mr-2" />
      ) : (
        <Sun className="w-4 h-4 mr-2" />
      )}
      {theme === 'white' ? 'Dark' : 'Light'}
    </Button>
  );
};

export default ThemeSwitcher;

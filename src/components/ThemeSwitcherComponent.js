import React, { useEffect } from 'react';

export function ThemeSwitcherComponent() {
  const [currentTheme, setCurrentTheme] = React.useState('light');

  useEffect(() => {
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', '');
    }
  }, [currentTheme]);

  return(
    <button
      className="theme-switcher"
      onClick={() => currentTheme === 'light' ? setCurrentTheme('dark'): setCurrentTheme('light')}
    >
      <span className="visually-hidden">Switch to {currentTheme === 'light' ? 'dark': 'light'} mode</span>
    </button>
  );
}
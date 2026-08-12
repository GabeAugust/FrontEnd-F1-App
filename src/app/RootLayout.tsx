import { useState } from "react";
import { Outlet } from "react-router";

import Header from "../components/Header";

const RootLayout = () => {
  const [isDark, setIsDark] = useState(true);

  function toggleTheme() {
    setIsDark((currentTheme) => !currentTheme);
  }

  return (
    <main className={`app ${isDark ? "dark-theme" : "light-theme"}`}>
      <Header isDark={isDark} onToggleTheme={toggleTheme} />
      <Outlet />
    </main>
  );
};

export default RootLayout;

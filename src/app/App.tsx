import Header from "../components/Header.tsx"
import React, { useState } from 'react';

const App = () => {
  const [isDark, setIsDark] = useState(true);

  function toggleTheme() {
    setIsDark((currentTheme) => !currentTheme);
  }

  return (

    <main className={`app ${isDark ? "dark-theme" : "light-theme"}`}>
      <Header isDark={isDark} onToggleTheme={toggleTheme} />

      <section className="hero">
        {/* seu conteúdo */}

        <div className="hero-bottom-fade" />
      </section>

      <section className="page-section">
      </section>
    </main>
  );
}

export default App; 

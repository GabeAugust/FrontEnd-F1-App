import { Sun, Search, Users, Moon } from "lucide-react";
import React, { useState, useEffect } from 'react';

type HeaderProps = {
  isDark: boolean;
  onToggleTheme: () => void;
}
const Header = ({
  isDark,
  onToggleTheme
}: HeaderProps) => {

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={scrolled ? "header-scrolled" : "header"}>
      <img src="../src/assets/f1.png" className="header-logo" alt="Fórmula 1" />

      <ul className="header-menu">
        <li><a className="button-menu">Home</a></li>
        <li><a className="button-menu">Pilotos</a></li>
        <li><a className="button-menu">Equipes</a></li>
        <li><a className="button-menu">Circuitos</a></li>
        <li><a className="button-menu">Temporadas</a></li>
        <li><a className="button-menu">Resultados</a></li>
      </ul>

      <div className="header-actions">
        <button className="search-button" type="button" aria-label="Pesquisar">
          <Search />
          <p>Pesquisar</p>
        </button>
        <button
          type="button"
          onClick={onToggleTheme}
          className="theme-toggle"
          aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}>
          {isDark
            ? <Sun className="header-action-icon" />
            : <Moon className="header-action-icon" />
          }
        </button>

        <button className="user-button" type="button" aria-label="Abrir perfil">
          <Users />
        </button>
      </div>
    </header>
  );
}

export default Header

import { Moon, Search, Sun, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import f1Logo from "../assets/f1.png";

type HeaderProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

const menuItems = [
  { label: "Home", to: "/", end: true },
  { label: "Pilotos", to: "/pilotos" },
  { label: "Equipes", to: "/equipes" },
  { label: "Circuitos", to: "/circuitos" },
  { label: "Temporadas", to: "/temporadas" },
  { label: "Resultados", to: "/resultados" },
];

const Header = ({ isDark, onToggleTheme }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolled ? "header-scrolled" : "header"}>
      <NavLink to="/" aria-label="Ir para a página inicial">
        <img src={f1Logo} className="header-logo" alt="Fórmula 1" />
      </NavLink>

      <nav aria-label="Navegação principal">
        <ul className="header-menu">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive
                    ? "button-menu button-menu-active"
                    : "button-menu"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header-actions">
        <button className="search-button" type="button" aria-label="Pesquisar">
          <Search />
          <p>Pesquisar</p>
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          className="theme-toggle"
          aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
        >
          {isDark ? (
            <Sun className="header-action-icon" />
          ) : (
            <Moon className="header-action-icon" />
          )}
        </button>

        <button className="user-button" type="button" aria-label="Abrir perfil">
          <Users />
        </button>
      </div>
    </header>
  );
};

export default Header;

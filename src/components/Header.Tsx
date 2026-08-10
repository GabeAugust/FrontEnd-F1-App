import { Sun, Search, Users } from "lucide-react";

const Header = () => {
  return (
    <div className="header items-center flex flex-row justify-between px-6 fixed z-50">
      <img src="../src/assets/f1.png" className="w-10 pl-2" />
      <ul className="flex flex-row gap-4 ">
        <li><a className="button-menu">Home</a></li>
        <li><a className="button-menu">Pilotos</a></li>
        <li><a className="button-menu">Equipes</a></li>
        <li><a className="button-menu">Circuitos</a></li>
        <li><a className="button-menu">Temporadas</a></li>
        <li><a className="button-menu">Resultados</a></li>
      </ul>

      <div className="flex flex-row items-center gap-4">
        <button className="flex flex-row gap-3 px-2 py-3 w-30 items-center border-none rounded-sm cursor-pointer hover:bg-active">
          <Search className="size-4 text-muted" />
          <p className="text-[14px] text-muted">Pesquisar</p>
        </button>
        <Sun className="size-4 text-muted" />
        <Users className="size-4 text-muted" />
      </div>
     

    </div>
  );
}

export default Header
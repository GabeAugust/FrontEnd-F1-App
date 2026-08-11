import { Sun, Search, Users, Moon } from "lucide-react";
import React, {useState} from 'react';

const Header = () => {
 
  const [theme, setTheme] = useState(true)
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
        <button className="group flex flex-row gap-3 px-2 py-3 w-30 items-center border-none rounded-sm cursor-pointer hover:bg-active transition-all duration-400 ease-in-out">
          <Search className="size-3.5 text-muted group-hover:text-white " />
          <p className="text-[12px] text-muted group-hover:text-white">Pesquisar</p>
        </button>
        <button onClick={() => setTheme(!theme)} className="group w-7 h-7 rounded-md hover:bg-active flex items-center justify-center cursor-pointer transition-all duration-400 ease-in-out">
          { theme 
           ? <Sun className="size-3.5 text-muted  group-hover:text-white "/> 
           : <Moon className="size-3.5 text-muted  group-hover:text-white "/>
           }
        </button>

        <button className="group w-7 h-7 rounded-md hover:bg-active flex items-center justify-center cursor-pointer transition-all duration-400 ease-in-out">
          <Users className="size-3.5 text-muted  group-hover:text-white" />
        </button>
        
        
      </div>
     

    </div>
  );
}

export default Header
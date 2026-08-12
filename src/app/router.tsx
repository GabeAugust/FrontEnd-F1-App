import { Route, Routes } from "react-router";

import Circuits from "../features/circuits/Circuits";
import DriverDetails from "../features/drivers/DriverDetails";
import Drivers from "../features/drivers/Drivers";
import Home from "../features/home/Home";
import News from "../features/news/Noticias";
import NotFound from "../features/not-found/NotFound";
import Results from "../features/results/Results";
import Seasons from "../features/seasons/Seasons";
import Teams from "../features/teams/Teams";
import RootLayout from "./RootLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="pilotos" element={<Drivers />} />
        <Route path="pilotos/:driverId" element={<DriverDetails />} />
        <Route path="equipes" element={<Teams />} />
        <Route path="circuitos" element={<Circuits />} />
        <Route path="temporadas" element={<Seasons />} />
        <Route path="resultados" element={<Results />} />
        <Route path="noticias" element={<News />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

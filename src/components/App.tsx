import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useAppSelector } from "../app/hooks";
import Battle from "../pages/Battle";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import PokemonInfo from "../pages/pokedex/[id]";
import Shop from "../pages/Shop";
import Team from "../pages/Team";
import Navigation from "./Navigation";
import 'react-toastify/dist/ReactToastify.css';
import { AlertProps } from "../models/alert";
import Alert from "./shared/Alert";
import { LoadingState } from "../models/loading";

export const App = () => {
  const status = useAppSelector<LoadingState>(state => state.pokemon.status)
  const alerts = useAppSelector<AlertProps[]>(state => state.pokemon.alerts)

  useEffect(() => {
    alerts.forEach((alert: AlertProps, i: number) => {
      if (alert.pokemonSprite === null) {
        toast.error(<Alert {...alert} />, {
          theme: "dark",
        })  
      } else {
        toast.success(<Alert {...alert} />, {
          theme: "dark",
        })
      }
    })
  }, [alerts])

  return (
    <div className='bg-gray-800 min-h-screen'>
      <HashRouter>
        {status === LoadingState.Idle && <Navigation />}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-team" element={<Team />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/pokedex/:id" element={<PokemonInfo />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

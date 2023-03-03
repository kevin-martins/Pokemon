import { HashRouter, Routes, Route } from "react-router-dom";
import Battle from "../pages/Battle";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import PokemonInfo from "../pages/pokemon/[id]";
import Shop from "../pages/Shop";
import Team from "../pages/Team";
import Navigation from "./Navigation";
import Alert from "./shared/Alert";

export const App = () => {
  return (
    <div className='bg-gray-800 min-h-screen'>
      <HashRouter>
        <Navigation />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-team" element={<Team />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/pokemon/:id" element={<PokemonInfo />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

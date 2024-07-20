import ToDo from "./pages/ToDo";
import Clock from "./pages/Clock";
import Cronometro from "./pages/Cronometro";
import "./App.scss";
import { NavLink, Route, Routes } from "react-router-dom";

function App() {

  const activeStyle = {
    textDecoration: "underline"
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className="link-style" style={({isActive}) => isActive ? activeStyle : {}}>Lista de Tarefas</NavLink>
          </li>
          <li>
            <NavLink to="/clock" className="link-style" style={({isActive}) => isActive ? activeStyle : {}}>Relógio</NavLink>
          </li>
          <li>
            <NavLink to="/cronometro" className="link-style" style={({isActive}) => isActive ? activeStyle : {}}>Cronômetro</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/cronometro" element={<Cronometro/>} />
      </Routes>
    </>
  );
}

export default App;

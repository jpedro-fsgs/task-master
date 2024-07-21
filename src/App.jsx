import ToDo from "./pages/ToDo";
import Clock from "./pages/Clock";
import Cronometro from "./pages/Cronometro";
import "./App.scss";
import { NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Timer from "./pages/Timer";

function App() {
  const activeStyle = {
    textDecoration: "underline",
  };

  //atributos cronômetro
  const [cronometro, setCronometro] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);
  const [lapsList, setLapsList] = useState([]);

  useEffect(() => {
    if(isRunning){
        intervalIdRef.current = setInterval(() => {
            setCronometro(Date.now() - startTimeRef.current);
        },1)
    }
  }, [isRunning]);

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className="link-style"
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              Lista de Tarefas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clock"
              className="link-style"
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              Relógio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cronometro"
              className="link-style"
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              Cronômetro
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/timer"
              className="link-style"
              style={({ isActive }) => (isActive ? activeStyle : {})}
            >
              Timer
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/clock" element={<Clock />} />
        <Route
          path="/cronometro"
          element={
            <Cronometro
              cronometro={cronometro}
              setCronometro={setCronometro}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              intervalIdRef={intervalIdRef}
              startTimeRef={startTimeRef}
              lapsList={lapsList}
              setLapsList={setLapsList}
            />
          }
        />
        <Route path="/timer" element={<Timer/>}/>
      </Routes>
    </>
  );
}

export default App;

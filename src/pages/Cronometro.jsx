import { useEffect, useState, useRef } from "react";
import { BsPause, BsPlay, BsStop } from "react-icons/bs"
import "./Cronometro.scss";

function Cronometro() {
  const [cronometro, setCronometro] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef(null)
  const startTimeRef = useRef(0);

  useEffect(() => {
    if(isRunning){
        intervalIdRef.current = setInterval(() => {
            setCronometro(Date.now() - startTimeRef.current);
        },10)
    }
  }, [isRunning]);

  function handlePlay() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - cronometro;
  }
  function handlePause() {
    setIsRunning(false);
    clearInterval(intervalIdRef.current);
  }

  function handleStop() {
      setIsRunning(false);
      clearInterval(intervalIdRef.current);
      setCronometro(0);
  }

  function formatMilliseconds(ms) {
    let milliseconds = ms % 1000;
    let seconds = Math.floor(ms / 1000) % 60;
    let minutes = Math.floor(ms / 60000);
    return `${minutes}:${String(seconds).padStart(2, "0")}:${String(
      milliseconds
    ).padStart(3, "0")}`;
  }

  return (
    <>
      <div className="cronometro">
        <h1 className="time">{formatMilliseconds(cronometro)}</h1>
        <span>
          <button className="cronometro-btn" onClick={handlePlay}>
            {<BsPlay size={60}/>}
          </button>
          <button className="cronometro-btn" onClick={handlePause}>
          {<BsPause size={60}/>}
          </button>
          <button className="cronometro-btn" onClick={handleStop}>
          {<BsStop size={60}/>}
          </button>
        </span>
      </div>
    </>
  );
}

export default Cronometro;

import { useEffect, useState, useRef } from "react";
import {
  BsPause,
  BsPlay,
  BsStop,
  BsStopwatch,
  BsStopwatchFill,
} from "react-icons/bs";
import "./Cronometro.scss";

function Cronometro(props) {
  // const [cronometro, setCronometro] = useState(0);
  // const [isRunning, setIsRunning] = useState(false);
  // const intervalIdRef = useRef(null)
  // const startTimeRef = useRef(0);
  const {
    cronometro,
    setCronometro,
    isRunning,
    setIsRunning,
    intervalIdRef,
    startTimeRef,
    lapsList,
    setLapsList
  } = props;

  // useEffect(() => {
  //   if(isRunning){
  //       intervalIdRef.current = setInterval(() => {
  //           setCronometro(Date.now() - startTimeRef.current);
  //       },10)
  //   }
  // }, [isRunning]);


  // const [lapsList, setLapsList] = useState(
  //   JSON.parse(localStorage.getItem("lapsList")) || []
  // );

  // useEffect(() => {
  //   localStorage.setItem("lapsList", JSON.stringify(lapsList));
  // }, [lapsList]);

  function handlePlay() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - cronometro;
  }

  function handleSplit() {
    if (!isRunning) return;
    setLapsList((l) => [...l, cronometro]);
  }

  function handlePause() {
    setIsRunning(false);
    clearInterval(intervalIdRef.current);
  }

  function handleStop() {
    setIsRunning(false);
    clearInterval(intervalIdRef.current);
    setCronometro(0);
    setLapsList([]);
  }

  function formatMilliseconds(ms) {
    let milliseconds = ms % 1000;
    let seconds = Math.floor(ms / 1000) % 60;
    let minutes = Math.floor(ms / 60000);
    return `${minutes}:${String(seconds).padStart(2, "0")}:${String(
      milliseconds
    ).padStart(3, "0")}`;
  }

  const scrollRef = useRef(null);
  
  useEffect(() => {
    scrollRef.current.scrollTo({top: scrollRef.current.scrollHeight, behavior: "smooth"});
  }, [lapsList]);

  return (
    <>
      <div className="cronometro">
        <h1 className="time">{formatMilliseconds(cronometro)}</h1>
        <span>
          <button className="cronometro-btn" onClick={handlePlay}>
            {<BsPlay />}
          </button>
          <button className="cronometro-btn" onClick={handlePause}>
            {<BsPause />}
          </button>
          <button className="cronometro-btn" onClick={handleStop}>
            {<BsStop />}
          </button>
          <button className="cronometro-btn" onClick={handleSplit}>
            {<BsStopwatch />}
          </button>
        </span>
        <div className="laps-list" ref={scrollRef}>
          {lapsList.map((lap, index) => (
            <div className="lap-card" key={index}><p>{formatMilliseconds(lap)}</p></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cronometro;

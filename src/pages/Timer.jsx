import { BsPause, BsPlay, BsStop } from "react-icons/bs";
import "./Timer.scss";
import { useEffect, useRef, useState } from "react";

function formatMinutes(time) {
  time = parseInt(time);
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}


function Timer() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const inputMinutesRef = useRef(null);
  const inputSecondsRef = useRef(null);
  const inputRef = useRef(null);
  const timerDisplayRef = useRef(null);

  useEffect(() => {
    inputSecondsRef.current.value = inputSecondsRef.current.value.padStart(2, "0");
    inputMinutesRef.current.value = inputMinutesRef.current.value.padStart(1, "0");
  }, [inputMinutesRef, inputSecondsRef]);

  useEffect(() => {
    
    const alarmSound = new Audio("./src/assets/beep.mp3");
    
    function alarm() {
      setIsRunning(false);
      clearInterval(intervalRef.current);
      setTimer(0);
      inputMinutesRef.current.value = "0";
      inputSecondsRef.current.value = "00";
      alarmSound.play();
    }
    
    if (isRunning) {
      timerDisplayRef.current.style.display = "block";
      inputRef.current.style.display = "none";
      intervalRef.current = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            alarm();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      timerDisplayRef.current.style.display = "none";

      inputRef.current.style.display = "block";

    }
  }, [isRunning]);

  function handlePlay() {
    const value = Number(inputMinutesRef.current.value) * 60 + Number(inputSecondsRef.current.value);
    if (value < 1) return;
    setTimer(value);
    setIsRunning(true);
  }
  function handlePause() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    inputMinutesRef.current.value = String(Math.floor(timer/60)).padStart(1, "0");
    inputSecondsRef.current.value = String(timer % 60).padStart(2, "0");

  }
  function handleStop() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTimer(0);
    inputMinutesRef.current.value = "0";
    inputSecondsRef.current.value = "00";
  }

  return (
    <>
      <div className="timer">
        {/* <input
          onChange={event => {
            event.target.value = formatMinutes(event.target.value);
          }}
          ref={inputTimerRef}
          type="text"
          min="0"
          className="time-input"
        /> */}
        <h1 className="time-timer" ref={timerDisplayRef}>{formatMinutes(timer)}</h1>
        <span className="time-input" ref={inputRef}>
          <input className="minutes" ref={inputMinutesRef} type="number" min="0"></input>:
          <input className="seconds" ref={inputSecondsRef} type="number" min="0" max="59"></input>
        </span>
        <span>
          <button className="timer-btn" onClick={handlePlay}>
            {<BsPlay />}
          </button>
          <button className="timer-btn" onClick={handlePause}>
            {<BsPause />}
          </button>
          <button className="timer-btn" onClick={handleStop}>
            {<BsStop />}
          </button>
        </span>
      </div>
    </>
  );
}

export default Timer;

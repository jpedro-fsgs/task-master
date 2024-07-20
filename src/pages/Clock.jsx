import { useEffect, useState } from "react";
import "./Clock.scss";


function Clock() {
  const timezone = moment.tz.guess();
  const dadosLocal = String(moment.tz(timezone)._d);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="container-horas">
      <h1 className="horario">{time.toLocaleTimeString()}</h1>
      <h2 className="data">{time.toLocaleDateString('pt-BR', {day: "numeric", month: "long", year: "numeric"})}</h2>
      <h2 className="dados">{dadosLocal.slice(dadosLocal.indexOf("GMT"))}</h2>
    </div>
  );
}

export default Clock;

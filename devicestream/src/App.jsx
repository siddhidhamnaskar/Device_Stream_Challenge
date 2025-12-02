import { useEffect, useState } from "react";
import { loadJsonl } from "./hooks/useJsonLoader"

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadJsonl().then(setData);
  }, []);

  const chartData = data.map(d => ({
  time: new Date(d.ts).toLocaleTimeString(), // convert ISO timestamp to time string
  temp: d.temp_c,
  voltage_r: d.vr,
  voltage_y: d.vy,
  voltage_b: d.vb,
  current_r: d.ir,
  current_y: d.iy,
  current_b: d.ib,
  power_kw: d.kw,
  kwh_total: d.kwh_total,
  pf: d.pf,
  count: d.count_total
}));


  return (
    <div>
      <h1>Device Dashboard</h1>
      <p>Total Records: {data.length}</p>
    </div>
  );
}

export default App;

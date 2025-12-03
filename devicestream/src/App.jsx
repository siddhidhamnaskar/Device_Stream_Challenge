import { useEffect, useState } from "react";
import KPICard from "./components/KPIcard";
import LineChartComponent from "./components/linearChart";
import Insights from "./components/insights";
import { loadJsonl } from "./hooks/useJsonlLoader";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadJsonl().then(setData);
  }, []);

  if (data.length === 0) return <p className="p-4">Loading...</p>;

  const chartData = data.map(d => ({
    time: d.ts.toLocaleTimeString(),
    temp: d.temp,
    kw: d.kw,
    vr: d.vr
  }));

  const maxTemp = Math.max(...data.map(d => d.temp)).toFixed(1);
  const avgKW = (data.reduce((a,b) => a + b.kw, 0) / data.length).toFixed(2);
  const energyUsed = (data[data.length - 1].kwh_total - data[0].kwh_total).toFixed(3);
  const totalProduction = data[data.length - 1].count - data[0].count;
  const avgVoltage = (
    data.reduce((acc, d) => acc + (d.vr + d.vy + d.vb) / 3, 0) / data.length
  ).toFixed(1);

  const insights = [
    `Temperature increased from ${data[0].temp}°C to ${data[data.length - 1].temp}°C.`,
    `Energy consumed: ${energyUsed} kWh.`,
    `Production increased by ${totalProduction} units.`
  ];

  return (
    <div className="container py-4 ">
      <h2 className="mb-4">Machine Dashboard</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <KPICard title="Max Temperature" value={maxTemp + "°C"} />
        </div>
        <div className="col-md-3">
          <KPICard title="Avg Power (kW)" value={avgKW} />
        </div>
        <div className="col-md-3">
          <KPICard title="Energy Used (kWh)" value={energyUsed} />
        </div>
        <div className="col-md-3">
          <KPICard title="Production Δ" value={totalProduction} />
        </div>
      </div>

      <div className="mb-4">
        <LineChartComponent data={chartData} dataKey="temp" />
      </div>

      <div className="mb-4">
        <LineChartComponent data={chartData} dataKey="kw" />
      </div>

      <div className="mb-4">
        <LineChartComponent data={chartData} dataKey="vr" />
      </div>

      <Insights insights={insights} />
    </div>
  );
}

export default App;

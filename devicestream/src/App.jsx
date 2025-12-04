import React, { useEffect, useState, useMemo } from "react";
import { loadJsonl } from "./hooks/useJsonlLoader";

import KPICard from "./components/KPIcard";
import LineChartComponent from "./components/linearChart";
import Insights from "./components/insights";

import {
  computeUptimePercents,
  avgKW,
  energyKWh,
  avgPF,
  throughput,
  phaseImbalancePercent,
} from "./components/metrices";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadJsonl().then(setData);
  }, []);

  const chartData = data.map((d) => ({
    time: d.ts.toLocaleTimeString(),
    kw: d.kw,
    temp: d.temp_c,
    vr: d.vr,
    ir: d.ir,
  }));

  const uptime = computeUptimePercents(data);
  const avgKwVal = avgKW(data);
  const energyVal = energyKWh(data);
  const pfVal = avgPF(data);
  const throughputVal = throughput(data);
  const imbalanceVal = phaseImbalancePercent(data);

  const insights = [
    `Peak power reached ${Math.max(...data.map((d) => d.kw))} kW`,
    `Phase imbalance: ${imbalanceVal.toFixed(2)}%`,
    `Average PF: ${pfVal.toFixed(2)}`,
  ];

  return (
    <div className="w-full ">
      <h2>Machine Dashboard</h2>

     <div className="d-flex gap-3 flex-wrap">

  {/* GRID SECTION (CSS GRID) */}
  <div
    style={{
      display: "grid",
       gridTemplateColumns: "repeat(3, 1fr)",   
      gap: "6px",
      flexGrow: 2
    }}
  >
    <KPICard title="Uptime %" value={`${uptime.RUN.toFixed(1)}%`} />
    <KPICard title="Avg kW" value={avgKwVal.toFixed(2)} />
    <KPICard title="Energy" value={`${energyVal.toFixed(2)} kWh`} />
    <KPICard title="Throughput" value={throughputVal.toFixed(2)} />
    <KPICard title="PF" value={pfVal.toFixed(2)} />
    <KPICard title="Imbalance" value={`${imbalanceVal.toFixed(1)}%`} />
  </div>

  {/* INSIGHTS */}
  <div style={{ width: "280px" }}>
    <Insights insights={insights} />
  </div>

</div>




     <div className="d-flex flex-wrap mt-4 w-100 gap-0.1">
  {/* LEFT COLUMN */}
  <div className="w-50">
    <LineChartComponent
      data={chartData}
      lines={[{ key: "kw", color: "#0d6efd" }]}
    />
    </div>
   <div className="w-50">
    <LineChartComponent
      data={chartData}
      lines={[
        { key: "ir", color: "red" },
        { key: "vr", color: "green" },
      ]}
    />
  </div>

  {/* RIGHT COLUMN (if any) */}
  <div style={{ flex: "0 0 280px" }}>
    {/* You can put Insights or any sidebar here */}
  </div>
</div>

    </div>
  );
}

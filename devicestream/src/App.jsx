import React, { useEffect, useState, useMemo, Suspense, lazy } from "react";
import { loadJsonl } from "./hooks/useJsonlLoader";

import KPICard from "./components/KPIcard";
import Insights from "./components/insights";
import StateBand from "./components/stateBand";
import { exportToCSV } from "./utils/exportCSV";
import './App.css'

// Lazy load heavy components
const LineChartComponent = lazy(() => import("./components/linearChart"));
const Sparkline = lazy(() => import("./components/sparkline"));


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
  const [windowSize, setWindowSize] = useState(5); // default 15 min
  const [useSSE, setUseSSE] = useState(true);
  const [lastMessageTime, setLastMessageTime] = useState(null);
  const [gapDetected, setGapDetected] = useState(false);
  // const lastRender = useRef(Date.now());



  useEffect(() => {
    loadJsonl().then(setData);
  }, []);

  const now = data[data.length - 1]?.ts;
const windowData = data.filter(
  d => (now - d.ts) / 1000 <= windowSize * 60
);

useEffect(() => {
  const interval = setInterval(() => {
    if (!lastMessageTime) return;

    const secondsSinceLast = (Date.now() - lastMessageTime.getTime()) / 1000;

    if (secondsSinceLast > 10) {
      setGapDetected(true);
    } else {
      setGapDetected(false);
    }
  }, 1000);

  return () => clearInterval(interval);
}, [lastMessageTime]);



  useEffect(() => {
  if (!useSSE) return; // if not SSE mode, don't run this

  const evt = new EventSource("http://localhost:8080/stream");

  let updateTimeout;

  evt.onmessage = (e) => {
    try {
      const obj = JSON.parse(e.data);
      obj.ts = new Date(obj.ts);

      // Debounce updates to reduce re-renders
      clearTimeout(updateTimeout);
      updateTimeout = setTimeout(() => {
        setData(prev => {
          const updated = [...prev, obj];
          // Keep only last 500 points to prevent memory issues
          return updated.slice(-500);
        });
      }, 100); // Update every 100ms max

      // Update last message time (for gap detector)
      setLastMessageTime(new Date());
    } catch (err) {
      console.error("SSE parse error:", err);
    }
  };

  evt.onerror = () => {
    console.error("SSE connection lost");
  };

  return () => {
    evt.close();
    clearTimeout(updateTimeout);
  };
}, [useSSE]);



  const chartData = useMemo(() => windowData.slice(-100).map((d) => ({
    time: d.ts.toLocaleTimeString(),
    kw: d.kw,
    temp: d.temp_c,
    vr: d.vr,
    ir: d.ir,
  })), [windowData]);

  const uptime = useMemo(() => computeUptimePercents(windowData), [windowData]);
const avgKwVal = useMemo(() => avgKW(windowData), [windowData]);
const energyVal = useMemo(() => energyKWh(windowData), [windowData]);
const pfVal = useMemo(() => avgPF(windowData), [windowData]);
const throughputVal = useMemo(() => throughput(windowData), [windowData]);
const imbalanceVal = useMemo(() => phaseImbalancePercent(windowData), [windowData]);


  const throughputData = useMemo(() => windowData.slice(-100).map((d, i) => {
  if (i < 60) return { time: d.ts, rate: 0 };

  const delta = d.count_total - data[i - 60]?.count_total || 0;
  const unitsPerMin = delta; // because 60 sec window

  return {
    time: d.ts.toLocaleTimeString(),
    rate: unitsPerMin
  };
}), [windowData, data]);




  const insights = [
    `Peak power reached ${Math.max(...windowData.map((d) => d.kw))} kW`,
    `Phase imbalance: ${imbalanceVal.toFixed(2)}%`,
    `Average PF: ${pfVal.toFixed(2)}`,
  ];

//   const stateBandData = data.map((d, i) => {
//   return {
//     time: d.ts.toLocaleTimeString(),
//     state: d.state
//   };
// });
const stateColor = {
  RUN: "#28a745",     // green
  IDLE: "#f0ad4e",    // yellow
  OFF: "#6c757d"      // gray
};

const stateBandData = useMemo(() => {
  const result = [];
  for (let i = 0; i < windowData.length - 1; i++) {
    const start = windowData[i].ts;
    const end = windowData[i + 1].ts;
    const durationSec = (end - start) / 1000;

    result.push({
      state: windowData[i].state,
      duration: durationSec
    });
  }
  return result;
}, [windowData]);







  return (
    <main className="w-full ">
      <header className="d-flex justify-content-between align-items-center p-2 bg-dark text-white rounded">
      <h3 className="m-0">Device Dashboard</h3>
      <span className="badge bg-success">Live SSE</span>
      {gapDetected && (
  <div
    style={{
      backgroundColor: "red",
      color: "white",
      padding: "8px 16px",
      textAlign: "center",
      fontWeight: "bold",
      borderRadius: "6px",
      marginBottom: "10px"
    }}
  >
    🚨 No data &gt; 10 seconds
  </div>
)}
    </header>
<div className="d-flex flex-wrap mt-4 w-100 gap-0.1">
      <select
  value={windowSize}
  onChange={(e) => setWindowSize(Number(e.target.value))}
  className="form-select w-auto"
>
  <option value={5}>Last 5 min</option>
  <option value={15}>Last 15 min</option>
  <option value={30}>Last 30 min</option>
</select>

  <button
  className="btn btn-primary"
  onClick={() => {
    const filename = `window_${windowSize}min_${Date.now()}.csv`;
    exportToCSV(windowData, filename);
  }}
>
  Export CSV
</button>

</div>




     <div className="d-flex gap-3 flex-wrap">

  {/* GRID SECTION (CSS GRID) */}
  <div className="grid-section">
    <KPICard title="Uptime %" value={`${uptime.RUN.toFixed(1)}%`} />
    <KPICard title="Avg kW" value={avgKwVal.toFixed(2)} />
    <KPICard title="Energy" value={`${energyVal.toFixed(2)} kWh`} />
    <KPICard title="Throughput" value={throughputVal.toFixed(2)} />
    <KPICard title="PF" value={pfVal.toFixed(2)} />
    <KPICard title="Imbalance" value={`${imbalanceVal.toFixed(1)}%`} />
  </div>

  {/* INSIGHTS */}
  <div className="insights-width">
    <Insights insights={insights} />
  </div>

</div>




     <div className="d-flex flex-wrap mt-4 w-100 gap-0.1">
  {/* LEFT COLUMN */}
  <div className="w-50">
    <Suspense fallback={<div>Loading chart...</div>}>
      <LineChartComponent
        data={chartData}
        lines={[{ key: "kw", color: "#0d6efd" }]}
      />
    </Suspense>
    <StateBand
  data={stateBandData}
  stateColor={stateColor}

/>

    </div>
   <div className="w-50">
    <Suspense fallback={<div>Loading chart...</div>}>
      <LineChartComponent
        data={chartData}
        lines={[
          { key: "ir", color: "red" },
          { key: "vr", color: "green" },
        ]}
      />
    </Suspense>
    <Suspense fallback={<div>Loading sparkline...</div>}>
      <Sparkline data={throughputData} />
    </Suspense>

  </div>
  




  {/* RIGHT COLUMN (if any) */}
  <div className="right-column">
    {/* You can put Insights or any sidebar here */}
  </div>
</div>

    </main>
  );
}

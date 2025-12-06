export function secondsBetween(a, b) {
  return Math.abs((b - a) / 1000);
}

export function computeUptimePercents(data) {
  let run = 0, idle = 0, off = 0;

  for (let i = 0; i < data.length - 1; i++) {
    const dt = secondsBetween(data[i].ts, data[i + 1].ts);
    if (data[i].state === "RUN") run += dt;
    if (data[i].state === "IDLE") idle += dt;
    if (data[i].state === "OFF") off += dt;
  }

  const total = run + idle + off || 1;

  return {
    RUN: (run / total) * 100,
    IDLE: (idle / total) * 100,
    OFF: (off / total) * 100,
  };
}

export function avgKW(data) {
  if (!data.length) return 0;
  return data.reduce((a, b) => a + b.kw, 0) / data.length;
}

export function energyKWh(data) {
  if (!data.length) return 0;
  return data[data.length - 1].kwh_total - data[0].kwh_total;
}

export function avgPF(data) {
  const samples = data.filter((d) => d.state !== "OFF");
  if (!samples.length) return 0;
  return samples.reduce((s, d) => s + d.pf, 0) / samples.length;
}

export function throughput(data) {
  // console.log(data);
  if (!data.length) return 0;
  const diff = data[data.length - 1].count_total - data[0].count_total;
  const minutes = (data[data.length - 1].ts - data[0].ts) / 60000;
  return diff / minutes;
}

export function phaseImbalancePercent(data) {
  if (!data.length) return 0;

  const avgIr = data.reduce((s, d) => s + d.ir, 0) / data.length;
  const avgIy = data.reduce((s, d) => s + d.iy, 0) / data.length;
  const avgIb = data.reduce((s, d) => s + d.ib, 0) / data.length;

  const avgAll = (avgIr + avgIy + avgIb) / 3;

  return ((Math.max(avgIr, avgIy, avgIb) - Math.min(avgIr, avgIy, avgIb)) / avgAll) * 100;
}

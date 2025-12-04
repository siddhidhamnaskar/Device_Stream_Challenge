// export async function loadJsonl() {
//   const res = await fetch('/device_stream.jsonl');
//   const text = await res.text();
//   const lines = text.trim().split('\n');
//   const data = lines.map(line => JSON.parse(line));
//   return data;
// }
export async function loadJsonl() {
  const res = await fetch('/device_stream_20min.jsonl'); 
  const text = await res.text();
  const lines = text.trim().split('\n');
  
  return lines.map(line => {
    const d = JSON.parse(line);
    return {
      ts: new Date(d.ts),     // convert to JS Date
      vr: d.vr,
      vy: d.vy,
      vb: d.vb,
      ir: d.ir,
      iy: d.iy,
      ib: d.ib,
      kw: d.kw,
      kwh_total: d.kwh_total,
      pf: d.pf,
      temp: d.temp_c,
      count_total: d.count_total,
      state: d.state,
      status: d.status,
      alarm: d.alarm_code
    };
  });
}

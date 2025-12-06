import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function LineChartComponent({ data, lines }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart  data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            {lines.map((l, i) => (
              <Line key={i} dataKey={l.key} stroke={l.color} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default React.memo(LineChartComponent);




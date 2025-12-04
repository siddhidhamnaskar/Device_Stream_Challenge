import React from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

export default function Sparkline({ data }) {
  return (
    <div className="card mb-3">
      <div className="card-body py-2">
        <h6 className="text-muted mb-2">Units/min (Sparkline)</h6>

        <ResponsiveContainer width="100%" height={60}>
          <AreaChart data={data}>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#0d6efd"
              fill="#bcd4ff"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

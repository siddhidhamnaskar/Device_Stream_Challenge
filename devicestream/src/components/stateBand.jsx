import React from 'react';

const StateBand = React.memo(({ data, stateColor }) => {
  return (
    <div className="state-band-container">
      <h6 className="text-muted mb-2">State Timeline</h6>
      <div className="state-band">
        {data.map((segment, idx) => (
          <div
            key={idx}
            className="state-segment"
            style={{
              backgroundColor: stateColor[segment.state] || "#ccc",
              width: `${(segment.duration / 300) * 100}%`, // Assuming 5 min window
              minWidth: "2px",
            }}
            title={`${segment.state}: ${segment.duration.toFixed(1)}s`}
          />
        ))}
      </div>
    </div>
  );
});

StateBand.displayName = 'StateBand';

export default StateBand;

export default function StateBand({ data, stateColor }) {
  if (!data.length) return null;

  const height = 22;

  return (
    <div className="card mb-3">
      <div className="card-body py-2">
        <h6 className="text-muted mb-2">Machine State</h6>

        <div style={{ width: "100%", height }}>
          <svg width="100%" height={height}>
            {data.map((d, i) => {
              const blockWidth = 100 / data.length; // equal width segments

              return (
                <rect
                  key={i}
                  x={(i * blockWidth) + "%"}
                  y={0}
                  width={blockWidth + "%"}
                  height={height}
                  fill={stateColor[d.state]}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}



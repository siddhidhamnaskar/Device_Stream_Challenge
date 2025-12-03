export default function Insights({ insights }) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">Insights</h5>
        <ul className="list-group">
          {insights.map((i, idx) => (
            <li className="list-group-item" key={idx}>{i}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

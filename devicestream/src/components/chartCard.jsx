export default function ChartCard({ title, children }) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">{title}</h5>
        {children}
      </div>
    </div>
  );
}

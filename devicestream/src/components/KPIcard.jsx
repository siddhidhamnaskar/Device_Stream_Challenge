export default function KPICard({ title, value }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <h6 className="text-muted">{title}</h6>
        <h3 className="fw-bold">{value}</h3>
      </div>
    </div>
  );
}

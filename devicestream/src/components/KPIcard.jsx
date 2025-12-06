export default function KPICard({ title, value }) {
  return (
   <div className="card shadow-sm" style={{ maxHeight: "99px" }}>
  <div
    className="card-body text-center"
    style={{
      padding: "1px",                  // reduce height
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",        // center text vertically
    }}
  >
    <h6 className="text-muted mb-1" style={{ fontSize: "1rem" }}>
      {title}
    </h6>
    <h3 className="fw-bold mb-0" style={{ fontSize: "1.5rem" }}>
      {value}
    </h3>
  </div>
</div>


  );
}

 

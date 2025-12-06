import React from 'react';

const KPICard = ({ title, value }) => {
  return (
   <div className="card shadow-sm kpi-card">
  <div className="card-body text-center kpi-card-body">
    <h6 className="text-muted mb-1 kpi-title">
      {title}
    </h6>
    <h3 className="fw-bold mb-0 kpi-value">
      {value}
    </h3>
  </div>
</div>


  );
};

export default KPICard;

 

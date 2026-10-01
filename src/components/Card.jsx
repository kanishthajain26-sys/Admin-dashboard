function Card({ title, value, icon, change }) {
  return (
    <div className="dashboard-card">

      <div className="card-top">
        <div>
          <p>{title}</p>
          <h2>{value}</h2>
        </div>

        <div className="card-icon">
          {icon}
        </div>
      </div>

      <div className="card-change">
        {change}
      </div>

    </div>
  );
}

export default Card;
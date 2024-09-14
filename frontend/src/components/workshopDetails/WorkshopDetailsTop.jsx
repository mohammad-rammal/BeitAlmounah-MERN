import React from "react";

const WorkshopDetailsTop = ({ workshop, color }) => {
  return (
    <div className="workshopdetails-top">
      <div className="workshopdetails-background" style={{ backgroundImage: `url(${workshop.headImage})` }}></div>
      <div className="workshopdetails-content">
        <div className="text-container">
          <h2>{workshop.name} Workshop </h2>
          <h3>Price: {workshop.price} $</h3>
          <button className="learnMore-btn" style={{ backgroundColor: color }}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetailsTop;
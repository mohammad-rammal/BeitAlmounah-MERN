import React from 'react';

const WorkshopDetailsMiddle = ({ workshop }) => {
  return (
    <div className="workshop-details-middle">
            <div className="btn-container">
                <button className="workshop-details-middle-btn">What Will You Learn?</button>
            </div>
        <div className="image-container-one">
        <img className="image-container-one-image1" src={workshop.image1} alt="Workshop Image 1" />
        <hr className="line" />
        <h2 className="workshop-details-middle-desc1">1. {workshop.desc1}</h2>
      </div>
      <div className="image-container-two">
      <h2 className="workshop-details-middle-desc2">2. {workshop.desc2}</h2>
      <hr className="line2" />
        <img className="image-container-one-image2" src={workshop.image2} alt="Workshop Image 2" />
      </div>
      <div>
      </div>
    </div>
  );
};

export default WorkshopDetailsMiddle;

import "./slider.css";
import { useState } from "react";
import Arrow from "./Arrow";

const Slider = () => {
 
  const [slideIndex, setSlideIndex] = useState(0);

  // Handle Click
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };
  return (
    <div className="slider-container">
      {slideIndex !== 0 && (
        <Arrow
          handleClick={() => handleClick("left")}
          className="bi bi-chevron-double-left arrow-left"
        />
      )}
      <div
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
        className="slider-wrapper"
      >
        <div className="slide first-slide">
          <div className="slide-image-wrapper">
          </div>
          <div className="slide-info-wrapper">
            <h1 className="slide-info-title">Made With Love</h1>
            <p className="slide-info-desc">
              All of our products are homemade.
            </p>
          </div>
        </div>
        <div className="slide second-slide">
          <div className="slide-image-wrapper">
          </div>
          <div className="slide-info-wrapper">
            <h1 className="slide-info-title">Cooking Workshops</h1>
            <p className="slide-info-desc">
              You can join our workshops now !
            </p>
          </div>
        </div>
        <div className="slide third-slide">
          <div className="slide-image-wrapper">
          </div>
          <div className="slide-info-wrapper">
            <h1 className="slide-info-title">Sewing Workshops</h1>
            <p className="slide-info-desc">
              Learn the magic of sewing easily !
            </p>
          </div>
        </div>
      </div>
      {slideIndex !== 2 && (
        <Arrow
          handleClick={() => handleClick("right")}
          className="bi bi-chevron-double-right arrow-right"
        />
      )}
    </div>
  );
};

export default Slider;

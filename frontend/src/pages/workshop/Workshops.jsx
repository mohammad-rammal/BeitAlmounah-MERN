
import React, { Fragment } from "react";
import HeroSection from "../../components/workshop/firstSection";
import AboutUs from "../../components/workshop/aboutWorkshop";
import Courses from "../../components/workshop/courses";

const Workshops = () => {
  return (
    <Fragment>
      <HeroSection /> 
      <AboutUs />
      <Courses />
    </Fragment>
  );
};

export default Workshops;

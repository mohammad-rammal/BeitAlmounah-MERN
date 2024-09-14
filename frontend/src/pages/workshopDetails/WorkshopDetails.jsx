import React from "react";
import { useParams } from "react-router-dom";
import { workshops } from "../../data/workshops";
import { reviews } from "../../data/reviews";
import WorkshopDetailsTop from "../../components/workshopDetails/WorkshopDetailsTop"; 
import "./workshopDetails.css";
import WorkshopDetailsMiddle from "../../components/workshopDetails/WorkshopDetailsMiddle";
import WorkshopDetailsReviews from "../../components/workshopDetails/WorkshopDetailsReviews";

const WorkshopDetails = () => {
  const { workshopId, reviewId } = useParams();
  const workshop = workshops.find((a) => a.id === parseInt(workshopId, 10));

  if (!workshop) {
    return <div>Workshop not found</div>;
  }

  const filteredReviews = reviews.filter((review) => review.workshop_id === parseInt(workshopId, 10));

  return (
    <>
    <WorkshopDetailsTop workshop={workshop} />
    <WorkshopDetailsMiddle workshop={workshop} />
    <WorkshopDetailsReviews workshop={workshop} reviews={filteredReviews} />
    </>
  );
};

export default WorkshopDetails;

import React from 'react';

const WorkshopDetailsReviews = ({ workshop, reviews }) => {
  return (
    <>
    <div className="workshop-details-reviews">
      <div className="btn-container2">
        <button className="workshop-details-reviews-btn">Reviews</button>
      </div>
      {reviews && reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.review_id}>
            <div className="workshop-review-container">
                <div className="workshop-review-box">
                <img className="review-image" src={review.image} alt="Commenter Image 1" />
                <div className="workshop-review-text">{review.comment}</div>
                <div className="workshop-review-author">-{review.username}</div>
                </div>
            </div>
          </div>
        ))
      ) : (
        <div>No reviews available</div>
      )}
    </div>
    <div><img className="image-container-foot" src={workshop.image3} alt="Workshop Image 1" /></div>
    </>
  );
};

export default WorkshopDetailsReviews;

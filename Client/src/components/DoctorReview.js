import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa"; // For star ratings
import { format } from "date-fns"; // For formatting dates
import "./DoctorReview.scss";

const DoctorReview = ({ doctorName }) => {
  const [reviews, setReviews] = useState([]); 
  const [data, setData] = useState({
    title: "",
    context: "",
    toName: doctorName,
    rate: 0,
  });

  // Fetch existing reviews for the doctor
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("/postreview");
        setReviews(data.filter((review) => review.toName === doctorName)); 
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [doctorName]);

  return (
    <div className="doctor-review-section">
      <h2>Reviews for {doctorName}</h2>

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to leave a review!</p>
        )}
      </div>
    </div>
  );
};


const ReviewCard = ({ review }) => {
  const formattedDate = review.date
    ? format(new Date(review.date), "PPP")
    : "Invalid Date";

  return (
    <div className="review-item">
      <strong>{review.title}</strong>
      <p>{review.context}</p>
      <strong>Rating:</strong> {review.rate} / 5
      <p>Date: {formattedDate}</p>
    </div>
  );
};

export default DoctorReview;

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "./Button";
import { UserContext } from "../context/userContext";

export default function FeedbackFormPopup({ setShow,doctorName }) {
    const User = useContext(UserContext);
    const [reviews, setReviews] = useState([]);
    const [data, setData] = useState({
        title: "",
        context: "",
        toName: doctorName,
        rate: 0,
    });

    // Fetch existing reviews for the recipient (toName)
    useEffect(() => {
        if (data.toName) {
            const fetchReviews = async () => {
                try {
                    const { data: reviewsData } = await axios.get("/postreview");
                    setReviews(reviewsData.filter((review) => review.toName === data.toName));
                } catch (error) {
                    console.error("Error fetching reviews:", error);
                }
            };
            fetchReviews();
        }
    }, [doctorName]);

    // Handles review submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { title, context, fromName, toName, rate } = data;
            const { data: newReview } = await axios.post('/postreview', {
                title, context, fromName, toName, rate
            });

            if (newReview.error) {
                toast.error(newReview.error);
            } else {
                if (newReview.token) {
                    localStorage.setItem('authToken', newReview.token);
                }

                setData({ title: '', context: '', fromName, toName: '', rate: 0 });
                setShow(false);
            }

            // Immediately updates the UI with the new review
            setReviews((prevReviews) => [...prevReviews, newReview]);
            console.log({ title, context, fromName, toName, rate });

        } catch (error) {
            console.error("Error posting feedback:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-white md:bg-black md:bg-opacity-80 flex md:item-center">
            <div className="w-full">
                <div className="bg-white md:max-w-2xl md:mx-auto md:rounded overflow-hidden">
                    <button onClick={() => setShow(false)} className="text-right">CLOSE</button>
                    <h2 className="py-4 text-center border-b">Make suggestion</h2>

                    <form className="p-8" onSubmit={handleSubmit}>
                        <input
                            className="w-full border p-2 rounded"
                            type="text"
                            placeholder="A short, descriptive title"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            required
                        />

                        <label className="block mt-4 mb-2">Details</label>
                        <textarea
                            className="w-full border p-2 rounded"
                            placeholder="Please include details"
                            name="context"
                            value={data.context}
                            onChange={(e) => setData({ ...data, context: e.target.value })}
                            required
                        ></textarea>



                        <label className="block mt-4 mb-2">Rating</label>
                        <input
                            className="w-full border p-2 rounded"
                            type="number"
                            placeholder="Rate out of 5"
                            name="rate"
                            value={data.rate}
                            onChange={(e) => setData({ ...data, rate: e.target.value })}
                            min="0"
                            max="5"
                            required
                        />

                        <div className="flex gap-2 mt-4">
                            <Button primary type="submit">
                                Submit Feedback
                            </Button>
                            <Button onClick={() => setShow(false)}>Cancel</Button>
                        </div>
                    </form>

                    <div className="reviews-list p-8">
                        <h3 className="text-xl">Reviews for {data.toName}</h3>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review._id} className="review-item mt-4">
                                    <strong>{review.title}</strong>
                                    <p>{review.context}</p>
                                    <strong>Rating:</strong> {review.rate} / 5
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet. Be the first to leave a review!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ProtectRoute } from "../../components/protectRoute";
import DoctorReview from "../../components/DoctorReview";
import { UserContext } from "../../context/userContext";


export const DoctorDash = () => {
  const {user} = useContext(UserContext);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews,setReview] = useState([]);
  const [error, setError] = useState("");

  const doctorName = "Dr. John Doe"; 

  useEffect(() => {
    const fetchReviews = async () =>{
      try{
        if(user?.name){
          const{data} = await axios.get("/postreview");
          setReview(data.filter(reviews=>reviews.toName===user.name));
        }
      }catch(error){

        console.error("Error Fetching Reviews",error)
      }
    }

    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/appointments');
        setTodaysAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments. Please try again.");
        setLoading(false);
      }
    };

    fetchAppointments();
    fetchReviews();
  }, [user?.name]);


  return (
    <div>
    <header>
      <h1>Doctor Dashboard</h1>
      <h1>Welcome, {user?.name}</h1>

    </header>
    <main>
      <section>
        <h2>Today's Appointments</h2>
        {loading ? (
          <p>Loading appointments...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : todaysAppointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Patient Name</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todaysAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.patientName || "N/A"}</td>
                <td>{appointment.reason ||  "General Checkup"}</td>
                <td>
                  <button>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
          <p>No appointments scheduled for today.</p>
        )}
      </section>
    </main>

    <div>
      <h1>Doctor Reviews</h1>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review-item mt-4">
            <strong>{review.title}</strong>
            <p>{review.context}</p>
            <strong>Rating:</strong> {review.rate} / 5
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  </div>
  );
};

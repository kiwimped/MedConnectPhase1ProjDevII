import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

export const DoctorProfile = () =>{
  const {user} = useContext(UserContext);
    const { id } = useParams();  // Get the doctor ID from the URL
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews,setReview] = useState([]);
  
    useEffect(()=>{
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
        const fetchDoctorProfile = async () => {
            try {
                const response = await axios.get(`/doctor/${id}`);
                setDoctor(response.data);
              } catch (error) {
                setError('Error fetching doctor details');
              } finally {
                setLoading(false);
              }
        }
        fetchDoctorProfile();
        fetchReviews();
    },[id],[user?.name])

    if (loading) return <div>Loading doctor profile...</div>;
    if (error) return <div>{error}</div>;
    return(
        <div>
              <h1>{doctor.name}</h1>
      <p>Specialty: {doctor.specialty}</p>
      <p>Email: {doctor.email}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Location: {doctor.location}</p>
      <h1>Wanna book an appointment with {doctor.name}</h1>
      <button
          onClick={() => navigation.navigate("/appointments")} // Navigate to appointments page
          style={{ backgroundColor: "#841584", color: "white", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
        >
          Book Appointment
        </button>
        <h1>Reviews on {doctor.name}</h1>
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
      {/* Add more details as necessary */}
        </div>
    )
}
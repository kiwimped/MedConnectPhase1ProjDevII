import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const DoctorProfile = () =>{
    const { id } = useParams();  // Get the doctor ID from the URL
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(()=>{
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
    },[id])

    if (loading) return <div>Loading doctor profile...</div>;
    if (error) return <div>{error}</div>;
    return(
        <div>
              <h1>{doctor.name}</h1>
      <p>Specialty: {doctor.specialty}</p>
      <p>Email: {doctor.email}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Location: {doctor.location}</p>
      {/* Add more details as necessary */}
        </div>
    )
}
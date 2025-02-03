import { useState } from 'react';
import axios from 'axios';
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const handleSearch = async () => {
    setLoading(true);  // Set loading to true when starting the search
    setError(null);  // Reset any previous error
    try {
      // Fetch doctors whose isDoctor is true
      const response = await axios.get(`/search?query=${searchTerm}&isDoctor=true`);
      setDoctors(response.data);  // Store the doctor results in state
    } catch (error) {
      setError('Error searching doctors');  // Set error if request fails
      console.error('Error searching doctors:', error);
    } finally {
      setLoading(false);  // Reset loading state after the request finishes
    }
  };

  if (!user) {
    return <div>Loading...</div>;  // Show loading if user data is not fetched yet
  }

  return (
    <div>
      <h2>Search for Doctors</h2>
      <input
        type="text"
        placeholder="Search by name or specialty"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}  // Update search term
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}  {/* Show loading message while fetching */}
      {error && <p>{error}</p>}  {/* Show error message if any */}
      
      {doctors.length > 0 ? (
        <div>
          {doctors.map((doctor) => (
            <div key={doctor._id}>
                <h3>
                <Link to={`/doctor/${doctor._id}`}>{doctor.name}</Link> {/* Link to profile page */}
              </h3>
              <p>{doctor.specialty}</p>
              <p>{doctor.email}</p>
              {/* You can add more fields such as location, experience, etc. */}
            </div>
          ))}
        </div>
      ) : (
        <p>No doctors found</p>
      )}
    </div>
  );
};

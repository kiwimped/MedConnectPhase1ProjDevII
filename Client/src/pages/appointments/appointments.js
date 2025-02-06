import "./appointments.scss";
import React, { useState,useEffect } from "react"; // Import React and the useState hook
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from 'react-router-dom'
import { Navigate } from "react-router-dom";

import { StyleSheet, Button, View, Text, Alert } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export const Appointments = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  // State variables
  const [userType, setUserType] = useState(""); // Tracks whether the user is a Doctor or Patient
  const [provider, setProvider] = useState(""); // Tracks the selected health care provider
  const [date, setDate] = useState(""); // Tracks the selected date for the appointment
  const [time, setTime] = useState(""); // Tracks the selected time for the appointment
  const [confirmation, setConfirmation] = useState(""); // Stores the confirmation message after booking
  const [doctors, setDoctors] = useState([]); // Store doctors

// Fetch list of doctors when the component mounts
useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:8000/doctors");
      const data = await response.json();
      setDoctors(data); // Update state with doctors
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  
  fetchDoctors();
}, []);
  // Handles appointment booking for patients
  const handleBooking = async() => {
    if (provider && date && time) {
      // If all fields are filled, display a confirmation message
      try{
        const response = await fetch('http://localhost:8000/send-appointment-email',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, provider, date, time }),
       
        })
        const result = await response.json();
        if (response.ok) {
          setConfirmation(`Appointment booked with ${provider} on ${date} at ${time}. Email confirmation sent!`);
        } else {
          setConfirmation(`Error: ${result.error}`);
        }
        setConfirmation(
          `Appointment booked with ${provider} on ${date} at ${time}.`
        );
      }catch(error){
        console.error('Error:', error);
        setConfirmation('An error occurred while booking the appointment.');
   
      }
      
    } else {
      // Display an error message if any fields are missing
      setConfirmation("Please fill out all fields.");
    }
  };
  
  /*if (!user){
    return navigate('/login')
  }*/
  if (!user) {
    return (
      <div className="appointment">
        <div className="card">
          <h1>Health Care App</h1>
          <div className="right">
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment">
      <div className="card">
        <div className="left">
          <h1>Health Care App</h1>
          <span>Book your appointment now</span>
        </div>

        <div className="right">
          <h1>Manage Appointments</h1>
          <div className="form-container">
            <label htmlFor="userType">Are you a Doctor or a Patient? </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>

            {userType === "patient" && (
              <>
                <h2>Book an Appointment</h2>
                <label htmlFor="provider">Health Care Provider: </label>
                <select
                  id="provider"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                >
                  <option value="">Select a provider</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor.name}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>

                <label htmlFor="date">Date: </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                <label htmlFor="time">Time: </label>
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />

                <button onClick={handleBooking}>Book Appointment</button>
              </>
            )}

            {userType === "doctor" && (
              <>
                <h2>Doctor Dashboard</h2>
                <p>Welcome, Doctor! Here you can view and manage your schedule.</p>
              </>
            )}

            {confirmation && <p className="confirmation">{confirmation}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Appointments; // Export the component for use in other parts of the app
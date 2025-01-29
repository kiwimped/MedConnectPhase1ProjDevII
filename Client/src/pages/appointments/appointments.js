import "./appointments.scss";
import React, { useState } from "react"; // Import React and the useState hook
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

  // List of health care providers (could be fetched from a backend in a real-world app)
  const providers = ["Dr. Alice Smith", "Dr. John Doe", "Dr. Emma White"];

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
  if (!user) {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => navigation.navigate("/login")} // Replace 'AnotherPage' with your desired route
          title="Login"
          color="#841584"
          accessibilityLabel="Go to login page"
        />
      </View>
    )
  }
  if (user)
    return (


      <div className="appointment">
        <div className="card">
        <h1>Health Care App</h1> {/* App Title */}

        {/* Dropdown to select user type: Doctor or Patient */}
        <div className="right">
          <label htmlFor="userType">Are you a Doctor or a Patient? </label>
          <select
            id="userType"
            value={userType} // Binds the value to the userType state
            onChange={(e) => setUserType(e.target.value)} // Updates userType on change
          >
            <option value="">Select an option</option> {/* Default option */}
            <option value="doctor">Doctor</option> {/* Doctor option */}
            <option value="patient">Patient</option> {/* Patient option */}
          </select>
        </div>

        {/* Patient-specific view */}
        {userType === "patient" && (
          <>
            <h2>Book an Appointment</h2> {/* Section title */}
            <div>
              <label htmlFor="provider">Health Care Provider: </label>
              <select
                id="provider"
                value={provider} // Binds the value to the provider state
                onChange={(e) => setProvider(e.target.value)} // Updates provider on change
              >
                <option value="">Select a provider</option> {/* Default option */}
                {providers.map((prov, index) => (
                  // Maps through the providers array to create dropdown options
                  <option key={index} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>

            {/* Input for selecting appointment date */}
            <div>
              <label htmlFor="date">Date: </label>
              <input
                type="date"
                id="date"
                value={date} // Binds the value to the date state
                onChange={(e) => setDate(e.target.value)} // Updates date on change
              />
            </div>

            {/* Input for selecting appointment time */}
            <div>
              <label htmlFor="time">Time: </label>
              <input
                type="time"
                id="time"
                value={time} // Binds the value to the time state
                onChange={(e) => setTime(e.target.value)} // Updates time on change
              />
            </div>

            {/* Button to book the appointment */}
            <button onClick={handleBooking}>Book Appointment</button>
          </>
        )}

        {/* Doctor-specific view */}
        {userType === "doctor" && (
          <>
            <h2>Doctor Dashboard</h2> {/* Section title for doctors */}
            <p>Welcome, Doctor! Here you can view and manage your schedule.</p>
            {/* Placeholder for future features like viewing appointments */}
          </>
        )}

        {/* Confirmation message */}
        {confirmation && <p className="confirmation">{confirmation}</p>}
      </div>
      </div>
    );
};

export default Appointments; // Export the component for use in other parts of the app
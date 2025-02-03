import { StyleSheet, Button, View, Text, Alert } from "react-native";
import React, { Component, useState, useEffect } from "react";
import { MDBNotification } from "mdbreact";
import { ArrowsOut, Robot, FirstAid } from "phosphor-react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import FeedbackFormPopup from "../../components/FeedbackFormPopup";
import Dashboard from "./dashboard";
import './home.scss';


export default function Home() {

  const { user } = useContext(UserContext)
  const [showPopup, setShowPopup] = useState(false)
  function openPopup() {
    setShowPopup(true)
  }
  if (user) {
    return (
      <div className="home"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="card">
        <div className="review">
  
          <Dashboard/>
        
        {showPopup && (
          <FeedbackFormPopup setShow={setShowPopup}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              backgroundColor: "rgba(0, 0, 0, 0.5)",  // Optional: makes the background dim
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "#fff",
            }}
          />
        )}

        </div>
        </div>
        <h1>Welcome           {!!user && (<h1>Hi {user.name}!</h1>)}</h1>

        <h1>Do you want to book an appointment?</h1>

        <button
          onClick={() => navigation.navigate("/appointments")} // Navigate to appointments page
          style={{ backgroundColor: "#841584", color: "white", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
        >
          I wanna book an appointment
        </button>

        <h1>Do you want a diagnosis without an appointment?</h1>
        <button
          onClick={() => navigation.navigate("/AI")} // Navigate to AI diagnosis page
          style={{ backgroundColor: "#841584", color: "white", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
        >
          Click Here for AI diagnosis
        </button>

      </div>
      
    )
  }
  if (!user) {
    return (
      <div>

        <div className="home"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="card">
            <div className="left">
          <h1>Do you want to book an appointment?</h1>

          <Button
            onPress={() => navigation.navigate("/appointments")} // Replace 'AnotherPage' with your desired route
            title="I wanna book an appointment"
            color="#841584"
            accessibilityLabel="Go to another page"
          />
</div>
<div className="right">
          <h1>Do you want a diagnosis without an appoinment?</h1>

          <Button
            onPress={() => navigation.navigate("/AI")} // Replace 'AnotherPage' with your desired route
            title="Click Here for AI diagonois"
            color="#841584"
            accessibilityLabel="Go to another page"
          />
</div>
</div>


      </div>
      </div>
    );
  }
};

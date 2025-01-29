import "./notification.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

export const Notification = () => {
  const { user } = useContext(UserContext);
  const [notification, setNotification] = useState([]);

  if(!user){
    return(
      <Navigate to="/login" />
    )
  }
  useEffect(() => {
    const fetchNotif = async () => {
      if (user && user._id) {
        try {
          const response = await fetch(`http://localhost:8000/notifications?userId=${user._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Fetched Notifications:", data);  // Debugging log
            setNotification(data);
          } else {
            console.error("ERROR FETCHING NOTIFICATION");
          }
        } catch (err) {
          console.error("FAIL TO FETCH NOTIFICATION", err);
        }
      }
    };
    fetchNotif();
  }, [user]);

  return (
    <div className="notification">
      
      <h2>Notifications</h2>
      {notification.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notification.map((notif, index) => (
             <div className="card">
            <li key={index}>
              
              {notif.message} (Read: {notif.isRead ? 'Yes' : 'No'}) 
              
            </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

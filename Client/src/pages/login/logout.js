import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await fetch('http://localhost:8000/logout', {
            method: 'POST',
            credentials: 'include', // To send cookies
        });

        if (response.ok) {
            setUser(null); // Clear the user context
            navigate('/');
            alert('Logged out successfully');
        }
    };

    return (
        <div>
            <h1>ACCOUNT</h1>
            {!!user && user.name && <h2>HI {user.name}!</h2>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

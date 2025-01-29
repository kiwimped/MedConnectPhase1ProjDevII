import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate, useNavigate } from "react-router-dom";
import "./resetpassword.scss";

export default function ResetPassword() {
    const { user, setUser } = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [success,setSuccess] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenValue = params.get("token");
        if (tokenValue) {
            setToken(tokenValue);
        } else {
            setError("Invalid or missing reset token");
        }
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setError("Invalid reset link.");
            return;
        }
        const data = { password };

        // Send the updated data to the backend
        const response = await fetch(`http://localhost:8000/resetpassword/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include', // To send the token in cookies
        });

        const result = await response.json();
        if (result.error) {
            setError(result.error);
        } else {
            setUser(result); // Update the user context
            setSuccess("Password Reset Successfully!");

            alert('User updated successfully');
            navigate('/login');
        }
    };


    return (
        <div className="resetpassword">
            <div className="card">
                <div className="right">
            <h1>Reset Password</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Password</button>
            </form>
            </div>
            </div>
        </div>
    );
}


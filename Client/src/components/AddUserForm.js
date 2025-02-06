import React, { useState } from "react";
import axios from "axios";

const AddUserForm = ({ fetchUsers }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/admin/users", { username, email });
            setUsername("");
            setEmail("");
            fetchUsers(); // Refresh users list
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Add User</button>
        </form>
    );
};

export default AddUserForm;
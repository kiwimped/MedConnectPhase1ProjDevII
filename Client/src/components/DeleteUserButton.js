import React from "react";
import axios from "axios";

const DeleteUserButton = ({ userId, fetchUsers }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/admin/users/${userId}`);
            fetchUsers(); // Refresh users list
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteUserButton;
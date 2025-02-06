import React from "react";
import DeleteUserButton from "./DeleteUserButton";

const AdminTable = ({ users, fetchUsers }) => {
    return (
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <DeleteUserButton userId={user._id} fetchUsers={fetchUsers} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AdminTable;
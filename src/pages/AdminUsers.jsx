import { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get("http://localhost:8080/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (userId) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:8080/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div>
            <h2>Manage Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} <button onClick={() => deleteUser(user.id)}>❌ Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminUsers;

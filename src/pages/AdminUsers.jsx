import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorized: Please log in.");
            navigate("/login");
            return;
        }

        // Check role before fetching users
        axios.get("http://localhost:8080/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            if (res.data.role !== "ROLE_ADMIN") {
                alert("Access Denied: You are not an admin.");
                navigate("/");
            } else {
                setRole(res.data.role);
                fetchUsers(token);
            }
        }).catch(() => {
            alert("Error fetching user role. Please log in again.");
            navigate("/login");
        });
    }, [navigate]);

    const fetchUsers = async (token) => {
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
            fetchUsers(token);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (role !== "ROLE_ADMIN") return null; // Hide content if not an admin

    return (
        <div>
            <h2>Manage Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminUsers;

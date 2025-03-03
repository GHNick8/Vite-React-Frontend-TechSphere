import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPanel = () => {
    const [role, setRole] = useState(null);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Unauthorized: Please log in.");
            navigate("/login");
            return;
        }

        axios.get("http://localhost:8080/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setRole(res.data.role.trim());
            if (res.data.role !== "ROLE_ADMIN") {
                alert("Access Denied: You are not an admin.");
                navigate("/");
            } else {
                fetchPosts(token);
                fetchUsers(token);
            }
        }).catch((err) => {
            console.error("Error fetching user role:", err);
            alert("Authentication error. Please log in again.");
            navigate("/login");
        });

    }, [navigate]);

    const fetchPosts = async (token) => {
        try {
            const response = await axios.get("http://localhost:8080/admin/posts", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

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

    const deletePost = async (postId) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:8080/admin/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const deleteUser = async (userId) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:8080/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (role !== "ROLE_ADMIN") {
        return null;
    }

    return (
        <div>
            <h2>Admin Panel</h2>
            <p>Welcome, Admin! You can manage users and posts here.</p>

            <h3>Posts</h3>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title}{" "}
                        <button style={{ color: "red" }} onClick={() => deletePost(post.id)}>❌ Delete</button>
                    </li>
                ))}
            </ul>

            <h3>Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username}{" "}
                        <button style={{ color: "red" }} onClick={() => deleteUser(user.id)}>❌ Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;

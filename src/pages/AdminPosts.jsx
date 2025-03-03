import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminPosts() {
    const [posts, setPosts] = useState([]);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorized: Please log in.");
            navigate("/login");
            return;
        }

        // Check role before fetching posts
        axios.get("http://localhost:8080/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            if (res.data.role !== "ROLE_ADMIN") {
                alert("Access Denied: You are not an admin.");
                navigate("/");
            } else {
                setRole(res.data.role);
                fetchPosts(token);
            }
        }).catch(() => {
            alert("Error fetching user role. Please log in again.");
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

    const deletePost = async (postId) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:8080/admin/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchPosts(token);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (role !== "ROLE_ADMIN") return null; // Hide content if not an admin

    return (
        <div>
            <h2>Manage Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title} <button onClick={() => deletePost(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPosts;

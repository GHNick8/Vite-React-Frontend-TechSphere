import { useEffect, useState } from "react";
import axios from "axios";

function AdminPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get("http://127.0.0.1:8080/admin/posts", {
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
            fetchPosts(); // Refresh post list
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div>
            <h2>Manage Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title} <button onClick={() => deletePost(post.id)}>❌ Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPosts;

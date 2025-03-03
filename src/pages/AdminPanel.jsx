import { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchPosts();
    }, []);

    const token = localStorage.getItem("token");

    // Fetch Users
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Fetch Posts
    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/admin/posts", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // Promote User to ADMIN
    const promoteUser = async (userId) => {
        try {
            await axios.put(`http://localhost:8080/admin/users/${userId}/promote`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error("Error promoting user:", error);
        }
    };

    // Delete User
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Delete Post
    const deletePost = async (postId) => {
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
        <div className="admin-panel">
            <h2>Admin Panel</h2>

            {/* Users Table */}
            <h3>Users</h3>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.role !== "ADMIN" && (
                                    <button className="promote-btn" onClick={() => promoteUser(user.id)}>Promote</button>
                                )}
                                <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Posts Table */}
            <h3>Posts</h3>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.author.username}</td>
                            <td>
                                <button className="delete-btn" onClick={() => deletePost(post.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPanel;

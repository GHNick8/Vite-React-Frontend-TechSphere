import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Send token only if available
                
                const response = await axios.get("http://localhost:8080/posts", { headers });
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Recent Posts</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>By: {post.author?.username || "Unknown"}</p> {/* Prevents crash if author is missing */}
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
}

export default Home;

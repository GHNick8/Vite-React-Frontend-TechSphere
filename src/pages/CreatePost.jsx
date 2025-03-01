import { useState } from "react";
import axios from "axios";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("You must be logged in to create a post.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/posts",
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage("Post created successfully!");
            setTitle("");
            setContent("");
        } catch (error) {
            setMessage("Failed to create post.");
        }
    };

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
                <button type="submit">Create Post</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default CreatePost;
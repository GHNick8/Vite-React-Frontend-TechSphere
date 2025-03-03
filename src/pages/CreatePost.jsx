import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorized: Please log in.");
            return;
        }

        try {
            await axios.post("http://localhost:8080/posts", {
                title,
                content
            }, {
                headers: { Authorization: `Bearer ${token}` } 
            });

            alert("Post created successfully!");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Error: You may not have permission to create posts.");
        }
    };

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;

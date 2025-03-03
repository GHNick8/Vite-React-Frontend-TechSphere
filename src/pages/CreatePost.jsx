import { useState } from "react";
import axios from "axios";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem("token"); 

        if (!token) {
            alert("You are not logged in!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/posts", 
                { title, content }, 
                {
                    headers: { 
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log("Post created successfully:", response.data);
            setTitle("");
            setContent("");
        } catch (error) {
            console.error("Error creating post:", error.response ? error.response.data : error.message);
            alert("Failed to create post. Make sure you're logged in!");
        }
    };

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Post Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Write your post..." 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required 
                />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePost;

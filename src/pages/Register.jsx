import { useState } from "react";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
        await axios.post("http://localhost:8080/auth/register", { username, password });
        setMessage("Registration successful! You can now login.");
        } catch (error) {
        setMessage("Registration failed");
        }
    };

    return (
        <div>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Register</button>
        </form>
        <p>{message}</p>
        </div>
    );
}

export default Register;
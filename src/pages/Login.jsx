import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8080/auth/login", {
                username,
                password
            });

            const token = res.data.token;
            if (token) {
                localStorage.setItem("token", token);

                // Fetch user details immediately after login
                const userRes = await axios.get("http://localhost:8080/auth/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const userRole = userRes.data.role.trim(); // Fix role formatting issues
                localStorage.setItem("role", userRole);
                window.dispatchEvent(new Event("storage")); // Force navbar update
                navigate("/");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Invalid credentials");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

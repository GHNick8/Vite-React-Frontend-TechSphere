import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const [role, setRole] = useState(localStorage.getItem("role"));
    const navigate = useNavigate();

    useEffect(() => {
        const updateRole = async () => {
            const storedRole = localStorage.getItem("role");
            const token = localStorage.getItem("token");

            if (storedRole) {
                setRole(storedRole.trim());
            } else if (token) {
                try {
                    const res = await axios.get("http://localhost:8080/auth/me", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    localStorage.setItem("role", res.data.role.trim());
                    setRole(res.data.role.trim());
                } catch (err) {
                    console.error("Error fetching role:", err);
                    localStorage.removeItem("role");
                }
            }
        };

        updateRole();

        const handleStorageChange = () => {
            setRole(localStorage.getItem("role")?.trim() || null);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setRole(null);
        navigate("/login");
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>

                {!role && <li><Link to="/login">Login</Link></li>}
                {!role && <li><Link to="/register">Register</Link></li>}

                {(role && (role.includes("ROLE_USER") || role.includes("ROLE_ADMIN"))) && (
                    <li><Link to="/create-post">Create Post</Link></li>
                )}

                {(role && role.includes("ROLE_ADMIN")) && (
                    <li><Link to="/admin">Admin Panel</Link></li>
                )}

                {role && <li><button onClick={handleLogout}>Logout</button></li>}
            </ul>
        </nav>
    );
};

export default Navbar;

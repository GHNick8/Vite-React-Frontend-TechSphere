import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/create-post">Create Post</Link></li>
                <li><Link to="/admin">Admin Panel</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;

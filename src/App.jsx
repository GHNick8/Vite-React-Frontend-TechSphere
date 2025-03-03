import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import AdminPanel from "./pages/AdminPanel";
import AdminUsers from "./pages/AdminUsers";  
import AdminPosts from "./pages/AdminPosts";  
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-post" element={<CreatePost />} /> 
        
        {/* Admin Panel with Nested Routes */}
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="posts" element={<AdminPosts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
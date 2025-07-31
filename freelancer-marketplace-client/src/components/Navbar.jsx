import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  {user?.role === "admin" && (
  <><Link to="/admin" className="text-blue-600">Admin Panel</Link>
  <Link to="/applied-jobs" className="hover:underline">Applied Jobs</Link></>
  
)}

  useEffect(() => {
    const auth = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!auth);
  }, [localStorage.getItem("isLoggedIn")]); // triggers re-check on login

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">
        Freelance<span className="text-gray-700">Hub</span>
      </h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600 font-medium">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

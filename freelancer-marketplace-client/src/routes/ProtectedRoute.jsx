import { Navigate } from "react-router-dom";

// Dummy login check for now
const isLoggedIn = localStorage.getItem("isLoggedIn");

function ProtectedRoute({ children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;

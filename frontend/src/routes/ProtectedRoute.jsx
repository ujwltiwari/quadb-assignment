import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = useSelector((state) => state.user.user);
  console.log(adminOnly, user);
  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    // Redirect to home if user is not an admin
    return <Navigate to="/" replace />;
  }

  // Render the protected component if conditions are met
  return children;
};

export default ProtectedRoute;

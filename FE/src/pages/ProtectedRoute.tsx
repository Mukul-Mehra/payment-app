import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    // if no token → send back to signup/login
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

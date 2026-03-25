import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const token = localStorage.getItem("hasToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

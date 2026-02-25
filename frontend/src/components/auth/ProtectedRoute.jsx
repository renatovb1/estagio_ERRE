import { Navigate, Outlet } from "react-router-dom";
import { getToken, getRole } from "../../utils/auth.js";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const token = getToken();
  const role = getRole();

  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/projects" replace />; // ou "/"
  }

  return <Outlet />;
}

import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const nick = localStorage.getItem("nick");

  if (!nick) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

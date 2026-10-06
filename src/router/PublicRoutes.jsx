import { Navigate, Outlet } from "react-router";

export default function PublicRoutes() {
  const isLogged = localStorage.getItem("isLogged");

  if (isLogged !== "true") {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}
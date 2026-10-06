import { Navigate, Outlet } from "react-router";
import Navbar from "./components/Navbar.jsx";

export default function PrivateRoutes() {
  const isLogged = localStorage.getItem("isLogged");

  if (isLogged === "true") {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }

  return <Navigate to="/login" />;
}

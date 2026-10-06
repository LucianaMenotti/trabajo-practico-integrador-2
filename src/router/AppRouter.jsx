import { Routes, Route, Navigate } from "react-router";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export default function AppRouter() {
  const isLogged = localStorage.getItem("isLogged");

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={isLogged === "true" ? "/" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

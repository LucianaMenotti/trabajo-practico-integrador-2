import { Link, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem("isLogged");
      navigate("/login");
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold">
        Home
      </Link>

      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
      >
        Logout
      </button>
    </nav>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

export default function LoginPage() {
  const { formState, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("isLogged", "true");
        navigate("/");
      } else if (data.errors) {
        setError(data.errors[0].msg);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err);
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />

        <label className="block mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>
      </form>

      <p className="mt-4 text-center">
        ¿No tenés cuenta?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Registrate
        </Link>
      </p>
    </div>
  );
}

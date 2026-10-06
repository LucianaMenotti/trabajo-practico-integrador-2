import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

export default function RegisterPage() {
  const { formState, handleInputChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        handleReset();
        navigate("/login");
      } else if (data.errors) {
        setErrors(data.errors);
      } else {
        setErrors([{ msg: data.message }]);
      }
    } catch (err) {
      console.log(err);
      setErrors([{ msg: "No se pudo conectar con el servidor" }]);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>

      <form onSubmit={handleSubmit}>
        <label className="block mb-1">Usuario</label>
        <input
          type="text"
          name="username"
          value={formState.username}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />

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

        <label className="block mb-1">Nombre</label>
        <input
          type="text"
          name="first_name"
          value={formState.first_name}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />

        <label className="block mb-1">Apellido</label>
        <input
          type="text"
          name="last_name"
          value={formState.last_name}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />

        {errors.length > 0 && (
          <ul className="text-red-600 mb-3 list-disc pl-5">
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Registrarme
        </button>
      </form>

      <p className="mt-4 text-center">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Iniciá sesión
        </Link>
      </p>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { FcGoogle } from "react-icons/fc";
import Divider from "@mui/material/Divider";
import InputField from "../InputField/InputField";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMyContext } from "../../store/ContextApi";

const Signup = () => {
  const apiUrl = process.env.REACT_APP_API_URL; // URL base para la API
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const { token } = useMyContext(); // Obtener token del contexto
  const navigate = useNavigate();

  // Inicialización de React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  // Manejo del envío del formulario
  const onSubmitHandler = async (data) => {
    const { username, email, password } = data;
    const sendData = {
      username,
      email,
      password,
      role: ["ROLE_USER"], // Asignamos el rol directamente
    };

    try {
      setLoading(true); // Activar estado de carga
      const response = await api.post("/api/auth/public/signup", sendData); // Asegúrate de usar el prefijo correcto de tu API
      toast.success("Registro exitoso");
      reset(); // Limpiar el formulario
      if (response.data) {
        navigate("/login"); // Redirigir al login después de registrarse
      }
    } catch (error) {
      // Manejo de errores específicos
      if (
        error?.response?.data?.message === "Error: Username is already taken!"
      ) {
        setError("username", { message: "El nombre de usuario ya está en uso" });
      } else if (
        error?.response?.data?.message === "Error: Email is already in use!"
      ) {
        setError("email", { message: "El correo electrónico ya está en uso" });
      } else {
        toast.error("Error en el registro. Inténtalo nuevamente.");
      }
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);

  return (
    <div className="min-h-[calc(100vh-74px)] flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="sm:w-[450px] w-[360px] bg-white shadow-lg rounded-lg py-6 sm:px-8 px-4"
      >
        <div className="text-center">
          <h1 className="font-montserrat font-bold text-2xl text-green-700 mb-2">
            Crea tu cuenta
          </h1>
          <p className="text-gray-600 mb-4">
            Regístrate para comenzar a explorar <strong>FruitCommerce</strong>
          </p>
          <a
            href={`${apiUrl}/oauth2/authorization/google`}
            className="flex gap-2 items-center justify-center w-full border p-2 shadow-sm rounded-md hover:bg-green-100 transition-all duration-300 mb-4"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-medium text-gray-700">
              Registrarse con Google
            </span>
          </a>
          <Divider className="font-semibold text-gray-500">O</Divider>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <InputField
            label="Nombre de usuario"
            required
            id="username"
            type="text"
            message="*El nombre de usuario es obligatorio"
            placeholder="Ingresa tu nombre de usuario"
            register={register}
            errors={errors}
          />
          <InputField
            label="Correo electrónico"
            required
            id="email"
            type="email"
            message="*El correo electrónico es obligatorio"
            placeholder="Ingresa tu correo electrónico"
            register={register}
            errors={errors}
          />
          <InputField
            label="Contraseña"
            required
            id="password"
            type="password"
            message="*La contraseña es obligatoria"
            placeholder="Ingresa tu contraseña"
            register={register}
            errors={errors}
            min={6}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white font-semibold w-full py-2 rounded-md mt-4 hover:bg-green-700 transition-all duration-300"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

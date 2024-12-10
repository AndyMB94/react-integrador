import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Divider from "@mui/material/Divider";
import toast from "react-hot-toast";
import { useMyContext } from "../../store/ContextApi";
import InputField from "../InputField/InputField";
import api from "../../services/api";

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setToken, setRole, token } = useMyContext(); // Manejo de token y rol en el contexto
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
  });

  // Manejo del login con Google
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      window.location.href = `${apiUrl}/oauth2/authorization/google`;
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      toast.error("Error al iniciar sesión con Google. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Manejo del login con credenciales
  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/api/auth/public/signin", data);

      if (response?.data?.jwtToken) {
        const { jwtToken, roles } = response.data;

        // Guardar token y determinar flujo
        setToken(jwtToken);

        if (!roles || roles.length === 0) {
          // Si no hay roles asignados, redirigir a selección de rol
          navigate("/select-role");
        } else {
          // Si hay roles, determinar perfil correspondiente
          const userRole = roles.includes("ROLE_PRODUCTOR")
            ? "Proveedor"
            : "Comprador";

          setRole(userRole);
          navigate(userRole === "Proveedor" ? "/dashboard" : "/home");
        }

        toast.success("Inicio de sesión exitoso.");
        reset();
      } else {
        toast.error("Credenciales incorrectas. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión con credenciales:", error);
      toast.error("Error al iniciar sesión. Verifica tus datos.");
    } finally {
      setLoading(false);
    }
  };

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50">
      <div className="sm:w-[450px] w-[360px] bg-white shadow-xl rounded-lg py-8 sm:px-8 px-4">
        <h1 className="font-montserrat text-center font-bold text-3xl text-blue-700">
          Iniciar Sesión
        </h1>
        <p className="text-slate-600 text-center mt-2">
          Accede a tu cuenta para continuar con <strong>FruitCommerce</strong>
        </p>
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={handleGoogleLogin}
            className={`flex gap-2 items-center justify-center w-full bg-blue-50 border border-blue-200 p-3 rounded-lg shadow-md hover:bg-blue-100 hover:shadow-lg transition-all duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            <FcGoogle className="text-2xl" />
            <span className="font-semibold text-blue-700">
              {loading ? "Redirigiendo..." : "Iniciar sesión con Google"}
            </span>
          </button>
        </div>
        <Divider className="font-semibold text-gray-500 my-6">O</Divider>
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
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
            label="Contraseña"
            required
            id="password"
            type="password"
            message="*La contraseña es obligatoria"
            placeholder="Ingresa tu contraseña"
            register={register}
            errors={errors}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-semibold w-full py-2 rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        <p className="text-center text-sm text-slate-700 mt-4">
          ¿No tienes una cuenta?{" "}
          <Link
            className="font-semibold underline text-blue-600 hover:text-blue-800"
            to="/signup"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

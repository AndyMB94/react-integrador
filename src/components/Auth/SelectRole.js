// SelectRole.js
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useMyContext } from "../../store/ContextApi";
import toast from "react-hot-toast";

const SelectRole = () => {
  const navigate = useNavigate();
  const { token, setRole } = useMyContext();

  const handleRoleSelection = async (role) => {
    if (!token) {
      toast.error("Token de acceso no encontrado. Por favor, inicia sesión.");
      navigate("/login");
      return;
    }

    try {
      const response = await api.put(
        `/api/roles/elegir_rol?roleName=${role}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const selectedRole = role === "ROLE_PRODUCTOR" ? "Proveedor" : "Comprador";
        setRole(selectedRole);
        toast.success(`Rol ${selectedRole} asignado correctamente.`);
        navigate(selectedRole === "Proveedor" ? "/dashboard" : "/home");
      }
    } catch (error) {
      console.error("Error al establecer el rol:", error);

      if (error.response?.status === 403) {
        toast.error("Permiso denegado. Verifica tu rol actual o inicia sesión nuevamente.");
      } else if (error.response?.status === 401) {
        toast.error("Token de acceso expirado. Por favor, inicia sesión.");
        navigate("/login");
      } else {
        toast.error("Error al establecer el rol. Intenta nuevamente.");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-74px)] flex flex-col justify-center items-center gap-6 bg-gradient-to-r from-green-100 via-blue-100 to-green-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Selecciona tu Rol</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Por favor, elige tu rol para continuar.
      </p>
      <div className="flex gap-8">
        <button
          onClick={() => handleRoleSelection("ROLE_PRODUCTOR")}
          className="transition-all duration-300 bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg hover:-translate-y-1 focus:ring-2 focus:ring-blue-300"
        >
          Soy Proveedor
        </button>
        <button
          onClick={() => handleRoleSelection("ROLE_CLIENTE")}
          className="transition-all duration-300 bg-green-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg hover:-translate-y-1 focus:ring-2 focus:ring-green-300"
        >
          Soy Comprador
        </button>
      </div>
    </div>
  );
};

export default SelectRole;

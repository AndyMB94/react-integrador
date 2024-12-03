// SelectRole.js
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Buttons from "../../utils/Buttons";
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
    <div className="min-h-[calc(100vh-74px)] flex flex-col justify-center items-center gap-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-slate-800">Selecciona tu Rol</h1>
      <p className="text-gray-600 mb-4">Por favor, elige tu rol para continuar.</p>
      <div className="flex gap-4">
        <Buttons
          onClickhandler={() => handleRoleSelection("ROLE_PRODUCTOR")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Soy Proveedor
        </Buttons>
        <Buttons
          onClickhandler={() => handleRoleSelection("ROLE_CLIENTE")}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Soy Comprador
        </Buttons>
      </div>
    </div>
  );
};

export default SelectRole;

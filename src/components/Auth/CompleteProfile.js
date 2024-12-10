import React, { useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useMyContext } from "../../store/ContextApi";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const { currentUser, role } = useMyContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreEmpresa: "",
    telefono: "",
    direccion: "",
    ruc: "",
    ubicacion: "",
    horariosAtencion: "",
    nombres: "",
    apellidos: "",
    dni: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        direccion: currentUser.direccion || "",
        telefono: currentUser.telefono || "",
        ruc: currentUser.ruc || "",
        nombres: role === "Comprador" ? currentUser.nombres || "" : "",
        apellidos: role === "Comprador" ? currentUser.apellidos || "" : "",
        dni: role === "Comprador" ? currentUser.dni || "" : "",
        nombreEmpresa: role === "Proveedor" ? currentUser.nombreEmpresa || "" : "",
        ubicacion: role === "Proveedor" ? currentUser.ubicacion || "" : "",
        horariosAtencion: role === "Proveedor" ? currentUser.horariosAtencion || "" : "",
      }));
    }
  }, [currentUser, role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de campos obligatorios según el rol
    const isFormValid =
      role === "Proveedor"
        ? formData.nombreEmpresa &&
          formData.telefono &&
          formData.direccion &&
          formData.ruc &&
          formData.ubicacion &&
          formData.horariosAtencion
        : formData.nombres &&
          formData.apellidos &&
          formData.dni &&
          formData.telefono &&
          formData.direccion;

    if (!isFormValid) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const endpoint =
        role === "Proveedor"
          ? "/api/proveedores/update"
          : "/api/compradores/update";

      await api.put(endpoint, formData);
      toast.success("Perfil actualizado exitosamente.");
      navigate("/profile");
    } catch (error) {
      console.error("Error actualizando el perfil:", error);
      toast.error("Error al actualizar el perfil.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Completar Registro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {role === "Proveedor" ? (
          <>
            <div>
              <label className="block text-sm font-medium" htmlFor="nombreEmpresa">
                Nombre de la Empresa:
              </label>
              <input
                type="text"
                id="nombreEmpresa"
                name="nombreEmpresa"
                value={formData.nombreEmpresa}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="telefono">
                Teléfono:
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="direccion">
                Dirección:
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="ruc">
                RUC:
              </label>
              <input
                type="text"
                id="ruc"
                name="ruc"
                value={formData.ruc}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="ubicacion">
                Ubicación:
              </label>
              <input
                type="text"
                id="ubicacion"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="horariosAtencion">
                Horarios de Atención:
              </label>
              <input
                type="text"
                id="horariosAtencion"
                name="horariosAtencion"
                value={formData.horariosAtencion}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium" htmlFor="nombres">
                Nombres:
              </label>
              <input
                type="text"
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="apellidos">
                Apellidos:
              </label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="dni">
                DNI:
              </label>
              <input
                type="text"
                id="dni"
                name="dni"
                value={formData.dni}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="telefono">
                Teléfono:
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="direccion">
                Dirección:
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="ruc">
                RUC (opcional):
              </label>
              <input
                type="text"
                id="ruc"
                name="ruc"
                value={formData.ruc}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;

import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import { useMyContext } from "../../store/ContextApi";
import Avatar from "@mui/material/Avatar";
import InputField from "../InputField/InputField";
import Buttons from "../../utils/Buttons";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { currentUser, token, role } = useMyContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(currentUser || {});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombres: "",
      apellidos: "",
      dni: "",
      ruc: "",
      direccion: "",
      telefono: "",
      nombreEmpresa: "",
      ubicacion: "",
      horariosAtencion: "",
    },
    mode: "onTouched",
  });

  // Función para cargar el perfil
  const fetchUserProfile = useCallback(async () => {
    try {
      const endpoint =
        role === "Proveedor"
          ? "/api/proveedores/profile"
          : "/api/compradores/profile";
      const response = await api.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(response.data);

      // Ajustar los valores según los datos devueltos por el backend
      setValue("nombres", response.data.nombres || "");
      setValue("apellidos", response.data.apellidos || "");
      setValue("dni", response.data.dni || "");
      setValue("ruc", response.data.ruc || "");
      setValue("direccion", response.data.direccion || "");
      setValue("telefono", response.data.telefono || "");
      if (role === "Proveedor") {
        setValue("nombreEmpresa", response.data.nombreEmpresa || "");
        setValue("ubicacion", response.data.ubicacion || "");
        setValue("horariosAtencion", response.data.horariosAtencion || "");
      }
    } catch (error) {
      console.error("Error al cargar el perfil del usuario:", error);
      toast.error("Error al cargar la información del perfil.");
    }
  }, [role, token, setValue]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleUpdateProfile = async (data) => {
    try {
      setLoading(true);
      const endpoint =
        role === "Proveedor"
          ? "/api/proveedores/update"
          : "/api/compradores/update";

      await api.put(endpoint, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Información actualizada con éxito.");

      // Refrescar el perfil después de guardar los cambios
      await fetchUserProfile();
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("No se pudo actualizar la información. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = () => {
    navigate("/complete-profile");
  };

  const isProfileIncomplete = useCallback(() => {
    if (role === "Proveedor") {
      return (
        !userData.nombreEmpresa ||
        !userData.ruc ||
        !userData.direccion ||
        !userData.telefono ||
        !userData.ubicacion ||
        !userData.horariosAtencion
      );
    }
    return (
      !userData.nombres ||
      !userData.apellidos ||
      !userData.dni ||
      !userData.telefono ||
      !userData.direccion
    );
  }, [role, userData]);

  return (
    <div className="min-h-[calc(100vh-74px)] py-10">
      <div className="xl:w-[70%] lg:w-[80%] sm:w-[90%] w-full sm:mx-auto sm:px-0 px-4 flex flex-col lg:flex-row gap-6">
        {/* Columna del formulario */}
        <div className="lg:w-1/2 w-full">
          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="flex flex-col gap-4 shadow-lg p-6 rounded-md bg-white"
          >
            <h2 className="font-semibold text-xl mb-4">Actualizar Información</h2>
            {role === "Comprador" && (
              <>
                <InputField
                  label="Nombres"
                  required
                  id="nombres"
                  className="text-sm"
                  type="text"
                  message="*Este campo es obligatorio"
                  placeholder="Ingrese sus nombres"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Apellidos"
                  required
                  id="apellidos"
                  className="text-sm"
                  type="text"
                  message="*Este campo es obligatorio"
                  placeholder="Ingrese sus apellidos"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="DNI"
                  required
                  id="dni"
                  className="text-sm"
                  type="text"
                  message="*Este campo es obligatorio"
                  placeholder="Ingrese su DNI"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="RUC (opcional)"
                  id="ruc"
                  className="text-sm"
                  type="text"
                  placeholder="Ingrese su RUC"
                  register={register}
                  errors={errors}
                />
              </>
            )}
            <InputField
              label="Dirección"
              required
              id="direccion"
              className="text-sm"
              type="text"
              message="*Este campo es obligatorio"
              placeholder="Ingrese su dirección"
              register={register}
              errors={errors}
            />
            <InputField
              label="Teléfono"
              required
              id="telefono"
              className="text-sm"
              type="text"
              message="*Este campo es obligatorio"
              placeholder="Ingrese su número de teléfono"
              register={register}
              errors={errors}
            />
            {role === "Proveedor" && (
              <>
                <InputField
                  label="Nombre del Negocio"
                  required
                  id="nombreEmpresa"
                  className="text-sm"
                  type="text"
                  message="*Este campo es obligatorio"
                  placeholder="Ingrese el nombre de su negocio"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Ubicación"
                  required
                  id="ubicacion"
                  className="text-sm"
                  type="text"
                  message="*Este campo es obligatorio"
                  placeholder="Ingrese la ubicación de su negocio"
                  register={register}
                  errors={errors}
                />
                <InputField
                  label="Horarios de Atención"
                  required
                  id="horariosAtencion"
                  className="text-sm"
                  type="text"
                  message="*Este campo es obligatorio"
                  placeholder="Ingrese los horarios de atención"
                  register={register}
                  errors={errors}
                />
              </>
            )}
            <Buttons
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              type="submit"
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Buttons>
          </form>
        </div>

        {/* Columna de información */}
        <div className="lg:w-1/2 w-full shadow-lg p-6 rounded-md bg-white">
          <h2 className="font-semibold text-xl mb-4">Información del Perfil</h2>
          <div className="flex flex-col items-center gap-4">
            <Avatar alt={userData?.username} src="/static/images/avatar/1.jpg" />
            <h3 className="font-semibold text-2xl">{userData?.username}</h3>
            <p className="text-gray-600">
              {role === "Proveedor" ? "Proveedor" : "Comprador"}
            </p>
          </div>
          <div className="mt-6">
            {role === "Comprador" && (
              <>
                <p>
                  <strong>Nombres:</strong> {userData.nombres || "N/A"}
                </p>
                <p>
                  <strong>Apellidos:</strong> {userData.apellidos || "N/A"}
                </p>
                <p>
                  <strong>DNI:</strong> {userData.dni || "N/A"}
                </p>
                <p>
                  <strong>RUC:</strong> {userData.ruc || "N/A"}
                </p>
              </>
            )}
            <p>
              <strong>Dirección:</strong> {userData.direccion || "N/A"}
            </p>
            <p>
              <strong>Teléfono:</strong> {userData.telefono || "N/A"}
            </p>
            {role === "Proveedor" && (
              <>
                <p>
                  <strong>Nombre del Negocio:</strong> {userData.nombreEmpresa || "N/A"}
                </p>
                <p>
                  <strong>Ubicación:</strong> {userData.ubicacion || "N/A"}
                </p>
                <p>
                  <strong>Horarios de Atención:</strong>{" "}
                  {userData.horariosAtencion || "N/A"}
                </p>
              </>
            )}
          </div>
          {isProfileIncomplete() && (
            <Buttons
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-4"
              onClickhandler={handleCompleteProfile}
            >
              Completar Registro
            </Buttons>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

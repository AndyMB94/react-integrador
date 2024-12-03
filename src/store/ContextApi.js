import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const getToken = localStorage.getItem("JWT_TOKEN") || null;
  const isAdminStored = localStorage.getItem("IS_ADMIN") ? JSON.parse(localStorage.getItem("IS_ADMIN")) : false;

  const [token, setToken] = useState(getToken);
  const [currentUser, setCurrentUser] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(true);
  const [isAdmin, setIsAdmin] = useState(isAdminStored);
  const [hasRole, setHasRole] = useState(false);
  const [role, setRole] = useState(null);

  const clearSession = () => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("IS_ADMIN");
    localStorage.removeItem("CSRF_TOKEN");
    setToken(null);
    setCurrentUser(null);
    setRole(null);
    setHasRole(false);
    setIsAdmin(false);
  };

  // Función para obtener el token CSRF
  const fetchCsrfToken = useCallback(async () => {
    try {
      const response = await api.get("/api/csrf-token", { withCredentials: true });
      const csrfToken = response.data.token;
      localStorage.setItem("CSRF_TOKEN", csrfToken);
    } catch (error) {
      console.error("Failed to fetch CSRF token", error);
      toast.error("Error fetching CSRF token");
    }
  }, []);

  // Función para obtener los datos del usuario
  const fetchUser = useCallback(async () => {
    try {
      await fetchCsrfToken(); // Aseguramos el token CSRF antes de obtener el usuario
      const { data } = await api.get(`/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const roles = data.roles;

      if (roles.includes("ROLE_CLIENTE")) {
        setCurrentUser(data);
        setRole("Comprador");
        setHasRole(true);
      } else if (roles.includes("ROLE_PRODUCTOR")) {
        setCurrentUser(data);
        setRole("Proveedor");
        setHasRole(true);
      } else {
        setHasRole(false);
      }

      if (roles.includes("ROLE_ADMIN")) {
        localStorage.setItem("IS_ADMIN", JSON.stringify(true));
        setIsAdmin(true);
      } else {
        localStorage.removeItem("IS_ADMIN");
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error fetching current user", error);

      // Si obtenemos un error 401 o un error de red, limpiamos la sesión
      if (error.response?.status === 401 || error.code === "ERR_NETWORK") {
        clearSession();
        toast.error("Session expired, please log in again.");
      } else {
        toast.error("Error fetching current user");
      }
    }
  }, [token, fetchCsrfToken]);

  // Ejecutamos fetchUser solo cuando hay un token
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token, fetchUser]);

  return (
    <ContextApi.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser,
        openSidebar,
        setOpenSidebar,
        isAdmin,
        setIsAdmin,
        hasRole,
        role,
        setRole,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(ContextApi);
  return context;
};

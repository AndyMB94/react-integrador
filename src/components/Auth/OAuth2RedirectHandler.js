// OAuth2RedirectHandler.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useMyContext } from "../../store/ContextApi";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, setCurrentUser, setRole, setIsAdmin } = useMyContext();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    console.log("OAuth2RedirectHandler: Token:", token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("JWT_TOKEN", token);

        const user = {
          username: decodedToken.sub,
          roles: decodedToken.roles.split(","),
        };
        localStorage.setItem("USER", JSON.stringify(user));

        // Actualizar el estado del contexto
        setToken(token);
        setCurrentUser(user);
        setIsAdmin(user.roles.includes("ROLE_ADMIN"));

        // Redirigir según el rol del usuario
        if (user.roles.includes("ROLE_PRODUCTOR")) {
          setRole("Proveedor");
          navigate("/dashboard");
        } else if (user.roles.includes("ROLE_CLIENTE")) {
          setRole("Comprador");
          navigate("/home");
        } else {
          navigate("/select-role");
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [location, navigate, setToken, setCurrentUser, setRole, setIsAdmin]);

  return <div>Redirigiendo...</div>;
};

export default OAuth2RedirectHandler;

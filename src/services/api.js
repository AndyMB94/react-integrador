import axios from "axios";

// Mostrar la URL base de la API en la consola para verificar configuraciones
console.log("API URL:", process.env.REACT_APP_API_URL);

// Crear una instancia de Axios con configuración inicial
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Base URL para la API
  headers: {
    "Content-Type": "application/json", // Configuración de encabezados predeterminada
    Accept: "application/json",
  },
  withCredentials: true, // Incluir cookies en las solicitudes
});

// Interceptor para manejar JWT y CSRF tokens en cada solicitud
api.interceptors.request.use(
  async (config) => {
    // Añadir el token JWT desde el almacenamiento local
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Manejo del token CSRF
    let csrfToken = localStorage.getItem("CSRF_TOKEN");
    if (!csrfToken) {
      try {
        // Obtener un nuevo token CSRF si no existe
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/csrf-token`,
          { withCredentials: true }
        );
        csrfToken = response.data.token;
        localStorage.setItem("CSRF_TOKEN", csrfToken); // Guardar el token en el almacenamiento local
      } catch (error) {
        console.error("No se pudo obtener el token CSRF", error);
      }
    }

    // Añadir el token CSRF a los encabezados de la solicitud si está disponible
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }

    console.log("X-XSRF-TOKEN:", csrfToken); // Mostrar el token CSRF en la consola para depuración
    return config;
  },
  (error) => {
    // Manejo de errores en la configuración de la solicitud
    return Promise.reject(error);
  }
);

export default api;

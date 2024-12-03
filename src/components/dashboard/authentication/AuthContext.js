import React, { createContext, useContext, useState, useEffect } from "react";
import CustomToast from "./Toast"; // Asegúrate de que la ruta sea correcta

const AuthContext = createContext();
const ToastContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    // Cargar datos de localStorage al iniciar de manera segura
    const savedUserData = localStorage.getItem("userData");

    try {
      // Intentar parsear el valor de localStorage si existe
      return savedUserData ? JSON.parse(savedUserData) : null;
    } catch (e) {
      // Si ocurre un error, lo logueamos y devolvemos null
      console.error("Error parsing userData from localStorage", e);
      return null;
    }
  });

  const [toastData, setToastData] = useState({
    show: false,
    message: "",
    title: "",
  });
  
  // Estado para manejar el tema
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";  // Predeterminado a 'light' si no existe en localStorage
  });

  // Efecto para guardar userData en localStorage cada vez que cambia
  useEffect(() => {
    if (userData) {
      try {
        localStorage.setItem("userData", JSON.stringify(userData)); // Guardar datos en localStorage
      } catch (e) {
        console.error("Error saving userData to localStorage", e); // Manejar errores al guardar
      }
    } else {
      localStorage.removeItem("userData"); // Limpiar localStorage si no hay userData
    }
  }, [userData]);

  // Efecto para guardar el tema en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("theme", theme); // Guarda el tema actual en localStorage
    document.querySelector("html").setAttribute("data-theme", theme); // Cambia el atributo data-theme en el html
  }, [theme]);

  const logout = () => {
    setUserData(null); // Limpia el estado de usuario
    localStorage.removeItem("token"); // Limpia el token de localStorage
    showToast("Sesión cerrada", "Has cerrado sesión correctamente.");

    // Logout de Google API (si estás usando gapi)
    if (window.gapi) {
      gapi.auth2.getAuthInstance().signOut().then(() => {
        console.log("Deslogueado de Google");
      });
    }

    // Redirigir a login usando window.location.href
    window.location.href = "/"; // Redirige a la página de login
  };

  const showToast = (title, message) => {
    setToastData({ show: true, title, message });
    setTimeout(() => {
      setToastData({ ...toastData, show: false });
    }, 3000); // Desaparece después de 3 segundos
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, logout, theme, setTheme }}>
      <CustomToast
        show={toastData.show}
        onClose={() => setToastData({ ...toastData, show: false })}
        message={toastData.message}
        title={toastData.title}
      />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

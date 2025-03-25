const API_URL = process.env.REACT_APP_API_URL;

const login = async (credentials) => {
  try {
    // Construimos la URL con el parámetro `func=login`
    const loginUrl = `${API_URL}?func=login`;

    const response = await fetch(loginUrl, {
      method: "POST",
    
      body: JSON.stringify({
        usuario: credentials.usuario,
        contraseña: credentials.contraseña,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error del servidor:", data.error);
      throw new Error(data.message || "Error en la autenticación");
    }

    console.log("Datos recibidos del servidor:", data);

    // Guarda la información necesaria en localStorage
    localStorage.setItem("userData", JSON.stringify(data.user)); // Ajusta según la estructura de tu respuesta
    localStorage.setItem("token", data.token); // Suponiendo que también recibes un token

    return data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error("Error en el login:", error);
    throw error; // Propaga el error
  }
};

export default { login };
const API_URL =
  "https://script.google.com/macros/s/AKfycbzMtfpBMeA-suybFvBj3ueI59yVJhGKx0pSb9tHG0VakZO0aWrZBoipTiMiXYGRCRt8/exec?func=login";

const login = async (credentials) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
 
      body: JSON.stringify({
        usuario: credentials.usuario,
        contraseña: credentials.contraseña,
      }),
    });

    const data = await response.json();

    // Verifica si la respuesta indica éxito
    if (!response.ok) {
      console.error("Error del servidor:", data.error);
      throw new Error(data.message || "Error en la autenticación");
    }

    console.log('Datos recibidos del servidor:', data); // Log de la respuesta del servidor

    // Guarda la información necesaria en localStorage
    localStorage.setItem('userData', JSON.stringify(data.user)); // Ajusta según la estructura de tu respuesta
    localStorage.setItem('token', data.token); // Suponiendo que también recibes un token

    return data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error("Error en el login:", error);
    throw error; // Propaga el error
  }
};

export default { login };

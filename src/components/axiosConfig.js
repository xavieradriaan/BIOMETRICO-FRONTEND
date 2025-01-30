import axios from 'axios';

// Crear una instancia de Axios
const axiosInstance = axios.create();

// Función para convertir a mayúsculas los valores de un objeto
function convertToUpperCase(obj) {
  if (typeof obj === 'string') {
    return obj.toUpperCase();
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      obj[key] = convertToUpperCase(obj[key]);
    }
  }
  return obj;
}

// Agregar un interceptor de respuesta
axiosInstance.interceptors.response.use(response => {
  response.data = convertToUpperCase(response.data);
  return response;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
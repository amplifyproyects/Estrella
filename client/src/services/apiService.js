// src/services/apiService.js

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Helper base para manejar encabezados, JSON y errores de fetch
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición al servidor');
  }

  return data;
};

// Servicios Autenticación / Usuarios
export const authService = {
  // POST /usuario/registro
  registro: (datosUsuario) =>
    request('/usuario/registro', {
      method: 'POST',
      body: JSON.stringify(datosUsuario),
    }),

  // POST /auth/login
  login: async (credenciales) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });

    if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
    }

    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },
};

// Servicios Solicitudes
export const solicitudesService = {
  // POST /solicitudes
  crearSolicitud: (datosSolicitud) =>
    request('/solicitudes', {
      method: 'POST',
      body: JSON.stringify(datosSolicitud),
    }),
};
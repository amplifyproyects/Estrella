import type {
  LoginRequest,
  LoginResponse,
  SolicitudRequest,
  SolicitudResponse,
  RegistroRequest,
  RegistroResponse,
} from '../types/api';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('token');

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  /*
   * Si enviamos FormData NO debemos colocar Content-Type manualmente.
   * El navegador agregará automáticamente: multipart/form-data; boundary=...
   * Si no es FormData, usamos JSON.
   */
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición');
  }

  return data as T;
};

/* =====================================================
   AUTH
   ===================================================== */

export const authService = {
  login: async (credenciales: LoginRequest): Promise<LoginResponse> => {
    const data = await request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });

    const tokenRecibido = data.accessToken || (data as any).access_token;

    if (tokenRecibido) {
      localStorage.setItem('token', tokenRecibido);
      if (data.usuario) {
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
      }
    }

    return data;
  },

  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },

  registro: async (datos: RegistroRequest): Promise<RegistroResponse> => {
    return request<RegistroResponse>('/usuario/registro', {
      method: 'POST',
      body: JSON.stringify(datos),
    });
  },
};

/* =====================================================
   SOLICITUDES
   ===================================================== */

export const solicitudesService = {
  /*
   * Crear solicitud (Envía metadatos y el archivo de video)
   */
  crearSolicitud: async (datos: SolicitudRequest): Promise<SolicitudResponse> => {
    const formData = new FormData();
    //const token = localStorage.getItem('token');

    formData.append('nombreCompleto', datos.nombreCompleto);
    formData.append('documentoIdentidad', datos.documentoIdentidad);
    formData.append('institucionEducativa', datos.institucionEducativa);
    formData.append('programaAcademico', datos.programaAcademico);
    formData.append('montoSolicitado', datos.montoSolicitado.toString());
    formData.append('video', datos.video);

    return request<SolicitudResponse>('/solicitudes', {
      method: 'POST',
      body: formData,
    });
  },

  /*
   * Obtener una solicitud por ID
   */
  obtenerSolicitud: async (id: number): Promise<SolicitudResponse> => {
    return request<SolicitudResponse>(`/solicitudes/${id}`, {
      method: 'GET',
    });
  },

  /*
   * Obtener todas las solicitudes del usuario autenticado
   */
  listarSolicitudes: async (): Promise<SolicitudResponse[]> => {
    return request<SolicitudResponse[]>('/solicitudes', {
      method: 'GET',
    });
  },

  /*
   * Obtener el video protegido mediante Blob URL
   */
  obtenerVideo: async (solicitudId: number): Promise<string> => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/solicitudes/${solicitudId}/video`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let mensaje = 'No se pudo obtener el video.';
      try {
        const data = await response.json();
        mensaje = data.message || mensaje;
      } catch {
        // La respuesta no era JSON
      }
      throw new Error(mensaje);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  },
};

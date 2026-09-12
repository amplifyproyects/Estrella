import { useState } from 'react';

import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';
import { CrearSolicitudPage } from './pages/CrearSolicitudPage';
import { EstadoSolicitudPage } from './pages/EstadoSolicitudPage';
import { SolicitudesPage } from './pages/SolicitudesPage';

import { authService } from './services/apiService';

import type {
  Usuario,
  SolicitudResponse,
} from './types/api';

import './App.css';

type Vista = 'solicitudes' | 'crear' | 'estado';

function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');

    if (!token || !usuarioGuardado) return null;

    try {
      return JSON.parse(usuarioGuardado);
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      return null;
    }
  });

  const [vistaAuth, setVistaAuth] = useState<'login' | 'registro'>('login');
  const [vista, setVista] = useState<Vista>('solicitudes');

  const [solicitudActual, setSolicitudActual] =
    useState<SolicitudResponse | null>(null);

  const handleLoginSuccess = (usuarioLogueado: Usuario) => {
    setUsuario(usuarioLogueado);
    setVista('solicitudes');
    setSolicitudActual(null);
  };

  const handleLogout = () => {
    authService.logout();
    setUsuario(null);
    setSolicitudActual(null);
    setVista('solicitudes');
    setVistaAuth('login');
  };

  // Usuario NO autenticado
  if (!usuario) {
    return (
      <main className="app">
        {vistaAuth === 'login' ? (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onIrARegistro={() => setVistaAuth('registro')}
          />
        ) : (
          <RegistroPage
            onIrALogin={() => setVistaAuth('login')}
          />
        )}
      </main>
    );
  }

  // Usuario autenticado
  return (
    <main className="app">
      <header className="app-header">
        <span>
          Hola, <strong>{usuario.nombreCompleto}</strong>
        </span>

        <button onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </header>

      {vista === 'solicitudes' && (
        <SolicitudesPage
          onCrearSolicitud={() => setVista('crear')}
          onVerSolicitud={(solicitud) => {
            setSolicitudActual(solicitud);
            setVista('estado');
          }}
        />
      )}

      {vista === 'crear' && (
        <CrearSolicitudPage
          onSolicitudCreada={(solicitud) => {
            setSolicitudActual(solicitud);
            setVista('estado');
          }}
        />
      )}

      {vista === 'estado' && solicitudActual && (
        <EstadoSolicitudPage
          solicitud={solicitudActual}
          onNuevaSolicitud={() => {
            setSolicitudActual(null);
            setVista('solicitudes');
          }}
        />
      )}
    </main>
  );
}

export default App;

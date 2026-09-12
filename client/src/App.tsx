import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';
import { CrearSolicitudPage } from './pages/CrearSolicitudPage';
import { EstadoSolicitudPage } from './pages/EstadoSolicitudPage';
import { authService } from './services/apiService';
import type { Usuario, SolicitudResponse } from './types/api';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const userStored = localStorage.getItem('usuario');
    return userStored ? JSON.parse(userStored) : null;
  });

  // Estado para alternar entre vistas de login y registro
  const [vistaAuth, setVistaAuth] = useState<'login' | 'registro'>('login');
  
  const [solicitudActual, setSolicitudActual] = useState<SolicitudResponse | null>(null);

  const handleLogout = () => {
    authService.logout();
    setUsuario(null);
    setSolicitudActual(null);
    setVistaAuth('login');
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      {usuario && (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <span>Hola, <strong>{usuario.nombreCompleto}</strong></span>
          <button onClick={handleLogout} style={{ padding: '6px 12px', cursor: 'pointer' }}>Cerrar Sesión</button>
        </header>
      )}

      {!usuario ? (
        vistaAuth === 'login' ? (
          <LoginPage 
            onLoginSuccess={(u) => setUsuario(u)} 
            onIrARegistro={() => setVistaAuth('registro')} 
          />
        ) : (
          <RegistroPage 
            onIrALogin={() => setVistaAuth('login')} 
          />
        )
      ) : solicitudActual ? (
        <EstadoSolicitudPage 
          solicitud={solicitudActual} 
          onNuevaSolicitud={() => setSolicitudActual(null)} 
        />
      ) : (
        <CrearSolicitudPage 
          onSolicitudCreada={(sol) => setSolicitudActual(sol)} 
        />
      )}
    </main>
  );
}

export default App;
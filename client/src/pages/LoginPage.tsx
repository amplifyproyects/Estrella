
import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { authService } from '../services/apiService';
import type { LoginRequest, Usuario } from '../types/api';


interface Props {
  onLoginSuccess: (user: Usuario) => void;
  onIrARegistro: () => void;
}

export const LoginPage: React.FC<Props> = ({ onLoginSuccess,onIrARegistro }) => {
  const [credenciales, setCredenciales] = useState<LoginRequest>({ correo: '', contraseña: '' });
  const [error, setError] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const res = await authService.login(credenciales);
      onLoginSuccess(res.usuario);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>Correo:</label>
          <input type="email" name="correo" value={credenciales.correo} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block' }}>Contraseña:</label>
          <input type="password" name="contraseña" value={credenciales.contraseña} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" disabled={cargando} style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          {cargando ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>

      {/* Opción para cambiar a Registro */}
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <p style={{ margin: 0 }}>
          ¿No tienes una cuenta?{' '}
          <button 
            type="button" 
            onClick={onIrARegistro} 
            style={{ background: 'none', border: 'none', color: '#0066cc', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
          >
            Registrarse aquí
          </button>
        </p>
      </div>
    </div>
  );
};
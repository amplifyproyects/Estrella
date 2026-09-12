import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { authService } from '../services/apiService';
import type { RegistroRequest } from '../types/api';

interface RegistroPageProps {
  onIrALogin: () => void;
  onRegistroExitoso?: () => void; // Con ? por si es opcional
}

export const RegistroPage: React.FC<RegistroPageProps> = ({ 
  onIrALogin, 
  onRegistroExitoso 
}) => {
  const [formData, setFormData] = useState<RegistroRequest>({
    nombreCompleto: '',
    correo: '',
    contraseña: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      await authService.registro(formData);
      alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
      
      if (onRegistroExitoso) {
        onRegistroExitoso();
      } else {
        onIrALogin(); // Redirige al login tras un registro exitoso
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error al registrar la cuenta.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="registro-container">
      <h2>Crear Cuenta</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombreCompleto">Nombre Completo:</label>
          <input
            type="text"
            id="nombreCompleto"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      {/* Botón para volver a Iniciar Sesión */}
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <p style={{ margin: 0 }}>
          ¿Ya tienes cuenta?{' '}
          <button 
            type="button" 
            onClick={onIrALogin} 
            style={{ background: 'none', border: 'none', color: '#0066cc', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
          >
            Iniciar sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
};
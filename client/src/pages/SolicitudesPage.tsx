import React, {
  useEffect,
  useState,
} from 'react';

import { solicitudesService } from '../services/apiService';

import type {
  SolicitudResponse,
} from '../types/api';

interface Props {
  onCrearSolicitud: () => void;
  onVerSolicitud: (
    solicitud: SolicitudResponse,
  ) => void;
}

export const SolicitudesPage: React.FC<Props> = ({
  onCrearSolicitud,
  onVerSolicitud,
}) => {
  const [
    solicitudes,
    setSolicitudes,
  ] = useState<SolicitudResponse[]>([]);

  const [
    cargando,
    setCargando,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState('');

  useEffect(() => {
    const cargarSolicitudes =
      async () => {
        try {
          setCargando(true);
          setError('');

          const data =
            await solicitudesService.listarSolicitudes();

          setSolicitudes(data);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : 'Error al cargar las solicitudes',
          );
        } finally {
          setCargando(false);
        }
      };

    cargarSolicitudes();
  }, []);

  if (cargando) {
    return (
      <div>
        <h2>
          Mis Solicitudes
        </h2>

        <p>
          Cargando solicitudes...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '40px auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2>
          Mis Solicitudes
        </h2>

        <button
          onClick={onCrearSolicitud}
          style={{
            padding: '10px 16px',
            cursor: 'pointer',
          }}
        >
          Nueva Solicitud
        </button>
      </div>

      {error && (
        <p
          style={{
            color: 'red',
          }}
        >
          {error}
        </p>
      )}

      {!error &&
        solicitudes.length === 0 && (
          <div>
            <p>
              No tienes solicitudes
              registradas.
            </p>

            <button
              onClick={onCrearSolicitud}
            >
              Crear mi primera solicitud
            </button>
          </div>
        )}

      {solicitudes.length > 0 && (
        <div>
          {solicitudes.map(
            (solicitud) => (
              <div
                key={solicitud.id}
                style={{
                  border:
                    '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px',
                }}
              >
                <h3>
                  Solicitud #
                  {solicitud.id}
                </h3>

                <p>
                  <strong>
                    Programa:
                  </strong>{' '}
                  {
                    solicitud.programaAcademico
                  }
                </p>

                <p>
                  <strong>
                    Institución:
                  </strong>{' '}
                  {
                    solicitud.institucionEducativa
                  }
                </p>

                <p>
                  <strong>
                    Monto:
                  </strong>{' '}
                  $
                  {Number(
                    solicitud.montoSolicitado,
                  ).toLocaleString(
                    'es-CO',
                  )}
                </p>

                <p>
                  <strong>
                    Estado:
                  </strong>{' '}
                  {solicitud.estado}
                </p>

                <button
                  onClick={() =>
                    onVerSolicitud(
                      solicitud,
                    )
                  }
                  style={{
                    padding:
                      '8px 12px',
                    cursor:
                      'pointer',
                  }}
                >
                  Ver solicitud
                </button>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

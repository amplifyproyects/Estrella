import React, {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import { solicitudesService } from '../services/apiService';

import type {
  SolicitudRequest,
  SolicitudResponse,
} from '../types/api';

interface Props {
  onSolicitudCreada: (
    solicitud: SolicitudResponse,
  ) => void;
}

const MAX_VIDEO_SIZE =
  200 * 1024 * 1024; // 200 MB

const TIPOS_VIDEO_PERMITIDOS = [
  'video/mp4',
  'video/webm',
];

export const CrearSolicitudPage: React.FC<Props> = ({
  onSolicitudCreada,
}) => {
  const [formData, setFormData] =
    useState<
      Omit<SolicitudRequest, 'video'>
    >({
      nombreCompleto: '',
      documentoIdentidad: '',
      institucionEducativa: '',
      programaAcademico: '',
      montoSolicitado: 0,
    });

  const [video, setVideo] =
    useState<File | null>(null);

  const [error, setError] =
    useState<string>('');

  const [cargando, setCargando] =
    useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === 'montoSolicitado'
          ? value
            ? Number(value)
            : 0
          : value,
    });
  };

  const handleVideoChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setError('');

    const archivo =
      e.target.files?.[0];

    if (!archivo) {
      setVideo(null);
      return;
    }

    // Validar tipo
    if (
      !TIPOS_VIDEO_PERMITIDOS.includes(
        archivo.type,
      )
    ) {
      setVideo(null);

      e.target.value = '';

      setError(
        'El video debe estar en formato MP4 o WebM.',
      );

      return;
    }

    // Validar tamaño
    if (
      archivo.size > MAX_VIDEO_SIZE
    ) {
      setVideo(null);

      e.target.value = '';

      setError(
        'El video no puede superar los 200 MB.',
      );

      return;
    }

    setVideo(archivo);
  };

  const handleSubmit = async (
    e: FormEvent,
  ) => {
    e.preventDefault();

    setError('');

    // El video es obligatorio
    if (!video) {
      setError(
        'El video de la entrevista es obligatorio.',
      );

      return;
    }

    setCargando(true);

    try {
      const solicitud: SolicitudRequest = {
        ...formData,
        video,
      };

      const res =
        await solicitudesService.crearSolicitud(
          solicitud,
        );

      onSolicitudCreada(res);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al enviar solicitud',
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <h2>Crear Solicitud</h2>

      {error && (
        <p
          style={{
            color: 'red',
            backgroundColor: '#ffe5e5',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div
          style={{
            marginBottom: '10px',
          }}
        >
          <label
            style={{
              display: 'block',
            }}
          >
            Nombre Completo:
          </label>

          <input
            type="text"
            name="nombreCompleto"
            value={
              formData.nombreCompleto
            }
            onChange={handleChange}
            required
            maxLength={100}
            disabled={cargando}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Documento */}
        <div
          style={{
            marginBottom: '10px',
          }}
        >
          <label
            style={{
              display: 'block',
            }}
          >
            Documento de Identidad:
          </label>

          <input
            type="text"
            name="documentoIdentidad"
            value={
              formData.documentoIdentidad
            }
            onChange={handleChange}
            required
            maxLength={100}
            disabled={cargando}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Institución */}
        <div
          style={{
            marginBottom: '10px',
          }}
        >
          <label
            style={{
              display: 'block',
            }}
          >
            Institución Educativa:
          </label>

          <input
            type="text"
            name="institucionEducativa"
            value={
              formData.institucionEducativa
            }
            onChange={handleChange}
            required
            maxLength={255}
            disabled={cargando}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Programa */}
        <div
          style={{
            marginBottom: '10px',
          }}
        >
          <label
            style={{
              display: 'block',
            }}
          >
            Programa Académico:
          </label>

          <input
            type="text"
            name="programaAcademico"
            value={
              formData.programaAcademico
            }
            onChange={handleChange}
            required
            maxLength={255}
            disabled={cargando}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Monto */}
        <div
          style={{
            marginBottom: '15px',
          }}
        >
          <label
            style={{
              display: 'block',
            }}
          >
            Monto Solicitado:
          </label>

          <input
            type="number"
            name="montoSolicitado"
            value={
              formData.montoSolicitado ||
              ''
            }
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            disabled={cargando}
            style={{
              width: '100%',
              padding: '8px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Video */}
        <div
          style={{
            marginBottom: '20px',
          }}
        >
          <label
            htmlFor="video"
            style={{
              display: 'block',
              marginBottom: '6px',
              fontWeight: 'bold',
            }}
          >
            Video de la entrevista *
          </label>

          <input
            type="file"
            id="video"
            name="video"
            accept="video/mp4,video/webm,.mp4,.webm"
            onChange={handleVideoChange}
            required
            disabled={cargando}
            style={{
              width: '100%',
            }}
          />

          <small
            style={{
              display: 'block',
              marginTop: '6px',
              color: '#666',
            }}
          >
            Formatos permitidos: MP4 o WebM.
            Tamaño máximo: 200 MB.
          </small>

          {video && (
            <div
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '5px',
              }}
            >
              <strong>
                Video seleccionado:
              </strong>

              <div>
                {video.name}
              </div>

              <div
                style={{
                  color: '#666',
                  fontSize: '14px',
                }}
              >
                {(
                  video.size /
                  (1024 * 1024)
                ).toFixed(2)}{' '}
                MB
              </div>
            </div>
          )}
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={cargando}
          style={{
            width: '100%',
            padding: '10px',
            cursor: cargando
              ? 'not-allowed'
              : 'pointer',
          }}
        >
          {cargando
            ? 'Subiendo video...'
            : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  );
};

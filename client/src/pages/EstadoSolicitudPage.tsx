import React from 'react';
import type { SolicitudResponse } from '../types/api';

interface Props {
  solicitud: SolicitudResponse;
  onNuevaSolicitud: () => void;
}

export const EstadoSolicitudPage: React.FC<Props> = ({ solicitud, onNuevaSolicitud }) => {
  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h2>Detalle de la Solicitud #{solicitud.id}</h2>

      <div style={{ marginBottom: '15px' }}>
        <strong>Estado:</strong>{' '}
        <span style={{ padding: '4px 8px', backgroundColor: solicitud.estado === 'PENDIENTE' ? '#fff3cd' : '#d4edda', color: solicitud.estado === 'PENDIENTE' ? '#856404' : '#155724', borderRadius: '4px' }}>
          {solicitud.estado}
        </span>
      </div>

      <p><strong>Solicitante:</strong> {solicitud.nombreCompleto}</p>
      <p><strong>Documento:</strong> {solicitud.documentoIdentidad}</p>
      <p><strong>Institución:</strong> {solicitud.institucionEducativa}</p>
      <p><strong>Programa:</strong> {solicitud.programaAcademico}</p>
      <p><strong>Monto:</strong> ${solicitud.montoSolicitado.toLocaleString()}</p>
      <p><strong>Fecha:</strong> {new Date(solicitud.createdAt).toLocaleString()}</p>

      <button onClick={onNuevaSolicitud} style={{ marginTop: '15px', padding: '10px 15px', cursor: 'pointer' }}>
        Crear otra solicitud
      </button>
    </div>
  );
};
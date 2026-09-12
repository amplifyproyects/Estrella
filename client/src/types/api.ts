// src/types/api.ts

export interface Usuario {
  id: number;
  correo: string;
  nombreCompleto: string;
}

export interface LoginRequest {
  correo: string;
  contraseña: string;
}

export interface LoginResponse {
  accessToken: string;
  usuario: Usuario;
}

export interface RegistroRequest {
  correo: string;
  contraseña: string;
  nombreCompleto: string;
}

export interface RegistroResponse {
  id: number;
  correo: string;
  nombreCompleto: string;
  createdAt: string;
}

export interface SolicitudRequest {
  nombreCompleto: string;
  documentoIdentidad: string;
  institucionEducativa: string;
  programaAcademico: string;
  montoSolicitado: number;
  video: File;
}

export interface SolicitudResponse extends SolicitudRequest {
  id: number;
  usuarioId: number;
  createdAt: string;
  estado: string;
}
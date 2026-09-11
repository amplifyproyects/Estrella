import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

import { Usuario } from '../usuarios/usuario.model';

export enum EstadoSolicitud {
  PENDIENTE = 'PENDIENTE',
  EN_REVISION = 'EN_REVISION',
  APROBADA = 'APROBADA',
  RECHAZADA = 'RECHAZADA',
}

interface SolicitudAttributes {
  id?: number;
  usuarioId: number;
  nombreCompleto: string;
  documentoIdentidad: string;
  institucionEducativa: string;
  programaAcademico: string;
  montoSolicitado: number;
  videoUrl?: string | null;
  estado?: EstadoSolicitud;
  createdAt?: Date;
  updatedAt?: Date;
}



@Table({
  tableName: 'solicitudes',
  timestamps: true,
})
export class Solicitud extends Model<SolicitudAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Usuario)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare usuarioId: number;

  @BelongsTo(() => Usuario)
  declare usuario: Usuario;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare nombreCompleto: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare documentoIdentidad: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare institucionEducativa: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare programaAcademico: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(15, 2))
  declare montoSolicitado: number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(500),
    allowNull: true,
  })
  declare videoUrl: string | null;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(EstadoSolicitud)),
    defaultValue: EstadoSolicitud.PENDIENTE,
  })
  declare estado: EstadoSolicitud;
  
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  AllowNull,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

import { Usuario } from '../usuarios/usuario.model';

@Table({
  tableName: 'solicitudes',
  timestamps: true,
})
export class Solicitud extends Model<Solicitud> {
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

  @AllowNull(false)
  @Column(DataType.STRING(500))
  declare videoUrl: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare videoKey: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  declare videoMimeType: string;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  declare videoSize: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  AllowNull,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

interface UsuarioAttributes {
  id?: number;
  correo: string;
  contraseña: string;
  nombreCompleto: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  tableName: 'usuarios',
  timestamps: true,
})
export class Usuario extends Model<UsuarioAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare correo: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare contraseña: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare nombreCompleto: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

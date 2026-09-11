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

@Table({
  tableName: 'usuarios',
  timestamps: true,
})
export class Usuario extends Model<Usuario> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  declare correo: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  declare contraseña: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare nombreCompleto: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}

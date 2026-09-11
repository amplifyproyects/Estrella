import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import * as bcrypt from 'bcrypt';

import { Usuario } from './usuario.model';
import { CrearUsuarioDto } from './create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario)
    private readonly usuarioModel: typeof Usuario,
  ) {}

  async crear(dto: CrearUsuarioDto) {
    const correo = dto.correo
      .trim()
      .toLowerCase();

    const usuarioExistente =
      await this.usuarioModel.findOne({
        where: {
          correo,
        },
      });

    if (usuarioExistente) {
      throw new ConflictException(
        'El correo electrónico ya está registrado',
      );
    }

    const contraseñaHash = await bcrypt.hash(
      dto.contraseña,
      12,
    );

    const usuario =
      await this.usuarioModel.create({
        correo,
        contraseña: contraseñaHash,
        nombreCompleto: dto.nombreCompleto.trim(),
      });

    return {
      id: usuario.id,
      correo: usuario.correo,
      nombreCompleto: usuario.nombreCompleto,
      createdAt: usuario.createdAt,
    };
  }

  async buscarPorCorreo(correo: string) {
    return this.usuarioModel.findOne({
      where: {
        correo: correo.trim().toLowerCase(),
      },
    });
  }

  async buscarPorId(id: number) {
    return this.usuarioModel.findByPk(id);
  }
}

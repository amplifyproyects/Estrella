import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const correo = dto.correo
      .trim()
      .toLowerCase();

    const usuario =
      await this.usuarioService.buscarPorCorreo(
        correo,
      );

    if (!usuario) {
      throw new UnauthorizedException(
        'Correo o contraseña incorrectos',
      );
    }

    const contraseñaValida =
      await bcrypt.compare(
        dto.contraseña,
        usuario.contraseña,
      );

    if (!contraseñaValida) {
      throw new UnauthorizedException(
        'Correo o contraseña incorrectos',
      );
    }

    const payload = {
      sub: usuario.id,
      correo: usuario.correo,
    };

    const accessToken =
      await this.jwtService.signAsync(payload);

    return {
      accessToken,
      usuario: {
        id: usuario.id,
        correo: usuario.correo,
        nombreCompleto:
          usuario.nombreCompleto,
      },
    };
  }
}

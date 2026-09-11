import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './create-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuariosService,
  ) {}

  @Post('registro')
  @HttpCode(HttpStatus.CREATED)
  async registrar(
    @Body() dto: CrearUsuarioDto,
  ) {
    return this.usuarioService.crear(dto);
  }
}

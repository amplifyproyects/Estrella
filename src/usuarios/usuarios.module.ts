import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Usuario } from './usuario.model';
import { UsuarioController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Usuario,
    ]),
  ],

  controllers: [
    UsuarioController,
  ],

  providers: [
    UsuariosService,
  ],

  exports: [
    UsuariosService,
  ],
})

export class UsuariosModule {}



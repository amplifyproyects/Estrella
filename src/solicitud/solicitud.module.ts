import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Solicitud } from './solicitud.model';
import { SolicitudController } from './solicitud.controller';
import { SolicitudService } from './solicitud.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Solicitud,
    ]),
  ],

  controllers: [
    SolicitudController,
  ],

  providers: [
    SolicitudService,
  ],

  exports: [
    SolicitudService,
  ],
})
export class SolicitudModule {}

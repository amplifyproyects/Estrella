import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Solicitud } from './solicitud.model';
import { SolicitudController } from './solicitud.controller';
import { SolicitudService } from './solicitud.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Solicitud,
    ]),
    AuthModule, // Trae el soporte de JwtAuthGuard desde AuthModule
  ],
  controllers: [
    SolicitudController,
  ],
  providers: [
    SolicitudService,
  ],
  exports: [
    SolicitudService, // Únicamente exporta tu propio servicio
  ],
})
export class SolicitudModule {}
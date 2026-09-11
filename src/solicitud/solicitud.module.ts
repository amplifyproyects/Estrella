import { Module } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { SolicitudController } from './solicitud.controller';

@Module({
  providers: [SolicitudService],
  controllers: [SolicitudController]
})
export class SolicitudModule {}

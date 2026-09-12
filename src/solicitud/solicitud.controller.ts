import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { SolicitudService } from './solicitud.service';
import { CrearSolicitudDto } from './crear-solicitud.dto';

@Controller('solicitudes')
export class SolicitudController {
  constructor(
    private readonly solicitudService: SolicitudService,
  ) {}

  @Post()
  async crear(
    @Body() dto: CrearSolicitudDto,
  ) {
    return this.solicitudService.crear(1, dto);
  }
  
}

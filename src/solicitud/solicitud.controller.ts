import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  Body
} from '@nestjs/common';

import { SolicitudService } from './solicitud.service';
import { CrearSolicitudDto } from './crear-solicitud.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';

@Controller('solicitudes')
export class SolicitudController {
  constructor(
    private readonly solicitudService: SolicitudService,
  ) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './uploads/videos',

        filename: (_req, file, callback) => {
          const extension = extname(file.originalname).toLowerCase();

          callback(
            null,
            `${randomUUID()}${extension}`,
          );
        },
      }),

      limits: {
        fileSize: 200 * 1024 * 1024, // 200 MB
      },

      fileFilter: (_req, file, callback) => {
        const extensionesPermitidas = [
          '.mp4',
          '.webm',
        ];

        const extension = extname(
          file.originalname,
        ).toLowerCase();

        const tiposPermitidos = [
          'video/mp4',
          'video/webm',
        ];

        if (
          !extensionesPermitidas.includes(extension) ||
          !tiposPermitidos.includes(file.mimetype)
        ) {
          return callback(
            new BadRequestException(
              'El video debe estar en formato MP4 o WebM',
            ),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  @Post()
  async crear(
    @Body() dto: CrearSolicitudDto,

    @UploadedFile()
    video: Express.Multer.File,
  ) {
    if (!video) {
      throw new BadRequestException(
        'El video de la entrevista es obligatorio',
      );
    }

    return this.solicitudService.crear(
      1,
      dto,
      video,
    );
  }
  
}

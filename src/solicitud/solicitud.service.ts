import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectConnection, InjectModel } from '@nestjs/sequelize';

import { Sequelize } from 'sequelize-typescript';

import { Solicitud } from './solicitud.model';
import { CrearSolicitudDto } from './crear-solicitud.dto';

@Injectable()
export class SolicitudService {
  constructor(
    @InjectModel(Solicitud)
    private readonly solicitudModel: typeof Solicitud,

    @InjectConnection()
    private readonly sequelize: Sequelize,
  ) {}

  async crear(
    usuarioId: number,
    dto: CrearSolicitudDto,
      video: Express.Multer.File,
  ) {
    const transaction =
      await this.sequelize.transaction();

    try {
      const solicitud =
        await this.solicitudModel.create(
          {
            usuarioId,

            nombreCompleto:
              dto.nombreCompleto.trim(),

            documentoIdentidad:
              dto.documentoIdentidad.trim(),

            institucionEducativa:
              dto.institucionEducativa.trim(),

            programaAcademico:
              dto.programaAcademico.trim(),

            montoSolicitado:
              dto.montoSolicitado,

            videoUrl: video.filename,
          },
          {
            transaction,
          },
        );

      await transaction.commit();

      return {
        id: solicitud.id,
        usuarioId: solicitud.usuarioId,
        nombreCompleto:
          solicitud.nombreCompleto,
        documentoIdentidad:
          solicitud.documentoIdentidad,
        institucionEducativa:
          solicitud.institucionEducativa,
        programaAcademico:
          solicitud.programaAcademico,
        montoSolicitado:
          solicitud.montoSolicitado,
        videoUrl: `/solicitudes/${solicitud.id}/video`,
        createdAt: solicitud.createdAt,
        estado: solicitud.estado
      };
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  async buscarPorId(
    id: number,
    usuarioId: number,
  ) {
    const solicitud =
      await this.solicitudModel.findOne({
        where: {
          id,
          usuarioId,
        },
      });

    if (!solicitud) {
      throw new NotFoundException(
        'Solicitud no encontrada',
      );
    }

    return solicitud;
  }

  async listarPorUsuario(
    usuarioId: number,
  ) {
    return this.solicitudModel.findAll({
      where: {
        usuarioId,
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  }
}

import { Type } from 'class-transformer';

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CrearSolicitudDto {
  @IsString({
    message: 'El nombre completo debe ser texto',
  })
  @IsNotEmpty({
    message: 'El nombre completo es obligatorio',
  })
  @MaxLength(100, {
    message:
      'El nombre completo no puede superar los 100 caracteres',
  })
  nombreCompleto: string;

  @IsString({
    message:
      'El documento de identidad debe ser texto',
  })
  @IsNotEmpty({
    message:
      'El documento de identidad es obligatorio',
  })
  @MaxLength(100, {
    message:
      'El documento de identidad no puede superar los 100 caracteres',
  })
  documentoIdentidad: string;

  @IsString({
    message:
      'La institución educativa debe ser texto',
  })
  @IsNotEmpty({
    message:
      'La institución educativa es obligatoria',
  })
  @MaxLength(255, {
    message:
      'La institución educativa no puede superar los 255 caracteres',
  })
  institucionEducativa: string;

  @IsString({
    message:
      'El programa académico debe ser texto',
  })
  @IsNotEmpty({
    message:
      'El programa académico es obligatorio',
  })
  @MaxLength(255, {
    message:
      'El programa académico no puede superar los 255 caracteres',
  })
  programaAcademico: string;

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        'El monto solicitado debe ser un número válido',
    },
  )
  @Min(0.01, {
    message:
      'El monto solicitado debe ser mayor a 0',
  })
  @Max(999999999999.99, {
    message:
      'El monto solicitado supera el máximo permitido',
  })
  montoSolicitado: number;
}

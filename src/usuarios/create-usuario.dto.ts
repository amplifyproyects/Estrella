import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CrearUsuarioDto {
  @IsEmail({}, {
    message: 'El correo electrónico no es válido',
  })
  @IsNotEmpty({
    message: 'El correo es obligatorio',
  })
  @MaxLength(255, {
    message: 'El correo no puede superar los 255 caracteres',
  })
  correo: string;

  @IsString({
    message: 'La contraseña debe ser texto',
  })
  @IsNotEmpty({
    message: 'La contraseña es obligatoria',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
    {
      message:
        'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
    },
  )
  contraseña: string;

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
}

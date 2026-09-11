import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsEmail({}, {
    message: 'El correo electrónico no es válido',
  })
  @IsNotEmpty({
    message: 'El correo es obligatorio',
  })
  correo: string;

  @IsString({
    message: 'La contraseña debe ser texto',
  })
  @IsNotEmpty({
    message: 'La contraseña es obligatoria',
  })
  contraseña: string;
}

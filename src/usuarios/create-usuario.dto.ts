import { IsEmail, IsNotEmpty, IsString, Matches,MaxLength } from 'class-validator';

export class RegistroUsuarioDto {
  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
    },
  )
  contraseña: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombreCompleto: string;
}

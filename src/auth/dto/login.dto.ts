import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  contrasena: string;
}

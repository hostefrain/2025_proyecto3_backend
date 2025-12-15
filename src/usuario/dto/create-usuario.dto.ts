import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @MinLength(6)
  contrasena: string;

  @IsMongoId()
  rolId: string;

  @IsMongoId()
  areaId: string;
}

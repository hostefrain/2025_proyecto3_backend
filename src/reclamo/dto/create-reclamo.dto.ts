import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateReclamoDto {

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsMongoId()
  @IsNotEmpty()
  proyectoId: string;

  @IsMongoId()
  @IsNotEmpty()
  tipoReclamoId: string;

  @IsMongoId()
  @IsNotEmpty()
  prioridadId: string;

  @IsMongoId()
  @IsNotEmpty()
  areaId: string;

  @IsMongoId()
  @IsNotEmpty()
  nivelCriticidadId: string;

  @IsMongoId()
  @IsNotEmpty()
  estadoId: string;
}

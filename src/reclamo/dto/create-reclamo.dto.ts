import {
  IsMongoId,
  IsOptional,
  IsArray,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class CreateReclamoDto {
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsMongoId()
    proyectoId: string;

    @IsMongoId()
    tipoReclamoId: string;

    @IsMongoId()
    prioridadId: string;

    @IsMongoId()
    nivelCriticidadId: string;

    @IsMongoId()
    estadoId: string;

    @IsOptional()
    @IsArray()
    archivos?: string[];
}

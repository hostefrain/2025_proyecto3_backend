import { PartialType } from '@nestjs/mapped-types';
import { CreateAccionDto } from './create-accion.dto';
import { IsMongoId, IsOptional } from 'class-validator';

export class UpdateAccionDto extends PartialType(CreateAccionDto) {

  @IsOptional()
  @IsMongoId()
  areaOrigenId?: string;

  @IsOptional()
  @IsMongoId()
  estadoActualId?: string;

}

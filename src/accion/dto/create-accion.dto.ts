import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateAccionDto {

  @ApiProperty({
    description: 'ID del reclamo asociado',
    example: '692f36d669d6715d5158304a',
  })
  @IsMongoId()
  @IsNotEmpty()
  reclamoId: string;

  @ApiProperty({
    description: 'Area destino de la accion',
    example: '692e48bed1ca8e0a2c49c350',
  })
  @IsMongoId()
  @IsNotEmpty()
  areaDestinoId: string;

  @ApiProperty({
    description: 'Usuario responsable de la accion',
    example: '692e48bed1ca8e0a2c49c351',
  })
  @IsMongoId()
  @IsNotEmpty()
  responsableId: string;

  @ApiProperty({
    description: 'Nuevo estado del reclamo',
    example: '692e48bed1ca8e0a2c49c352',
  })
  @IsMongoId()
  @IsNotEmpty()
  estadoNuevoId: string;

  @ApiProperty({
    description: 'Descripcion de la accion realizada',
    example: 'Se deriva el reclamo al area de mantenimiento',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;
}

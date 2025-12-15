import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolDto {

  @ApiProperty({
    example: 'ADMIN',
    description: 'Nombre del rol',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;
}

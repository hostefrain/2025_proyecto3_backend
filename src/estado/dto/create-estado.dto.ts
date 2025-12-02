import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEstadoDto {
    @Transform(({ value }) => value.trim().toLowCase())
    @IsString()
    @IsNotEmpty({message: 'El nombre no debe estar vacío'})
    nombre: string;
}

import { Transform } from 'class-transformer';
import classValidator, { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoReclamoDto {

    @Transform(({ value }) => value.trim().toLowCase())
    @IsString()
    @IsNotEmpty({message: 'El nombre no debe estar vacío'})
    nombre: string;
}

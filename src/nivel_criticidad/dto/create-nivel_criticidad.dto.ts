import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNivelCriticidadDto {
    @Transform(({ value }) => value.trim().toLowerCase())
    @IsString()
    @IsNotEmpty({message: 'El nombre no debe estar vacío'})
    nombre: string;
}

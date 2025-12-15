import { IsString, IsNotEmpty, MaxLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';


export class CreateAreaDto {

    @Transform(({ value }) => value?.trim().toLowerCase())
    @IsString({ message: 'La prioridad debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La prioridad no puede estar vacía.' })
    @MaxLength(255, { message: 'La prioridad no puede superar los 255 caracteres.' })
    @Matches(/^[A-Za-z0-9 áéíóúÁÉÍÓÚñÑ]+$/, {
        message: 'La prioridad solo puede contener letras, números y espacios.',
    })
    nombre: string;   
}

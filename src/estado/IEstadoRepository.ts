import { CreateEstadoDto } from "./dto/create-estado.dto";
import { UpdateEstadoDto } from "./dto/update-estado.dto";
import { Estado } from "./schemas/estado.schema";

export interface IEstadoRepository {
    create(data: CreateEstadoDto) : Promise<Estado>;
    findById(id: string) : Promise<Estado | null>;
    findByName (nombre: string) : Promise<Estado | null>;
    findAll() : Promise<Estado[]>;
    update(id: string, data: UpdateEstadoDto) : Promise<Estado | null>;
    remove(id: string) : Promise<void>;
}
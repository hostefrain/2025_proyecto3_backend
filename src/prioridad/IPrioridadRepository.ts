import { CreatePrioridadDto } from "./dto/create-prioridad.dto";
import { UpdatePrioridadDto } from "./dto/update-prioridad.dto";
import { Prioridad } from "./schemas/prioridad.schema";

export interface IPrioridadRepository {
    create(data: CreatePrioridadDto) : Promise<Prioridad>;
    findOne(id: string) : Promise<Prioridad | null>;
    findByName(nombre: string): Promise<Prioridad | null>;
    findAll() : Promise<Prioridad[]>;
    update(id: string, data: UpdatePrioridadDto) : Promise<Prioridad | null>;
    remove(id: string) : Promise<void>;
}
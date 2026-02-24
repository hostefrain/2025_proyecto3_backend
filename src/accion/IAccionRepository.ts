import { AccionCreate } from './types/accion.types';
import { UpdateAccionDto } from "./dto/update-accion.dto";
import { Accion } from "./schemas/accion.schema";

export interface IAccionRepository {
    create(data: AccionCreate): Promise<Accion>;
    findOne(id: string): Promise<Accion | null>;
    findAll(): Promise<Accion[]>;
    update(id: string, data: UpdateAccionDto): Promise<Accion | null>;
    remove(id: string): Promise<void>;
    findByReclamo(reclamoId: string): Promise<any[]>;
}


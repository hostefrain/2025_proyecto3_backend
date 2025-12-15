import { CreateAccionDto } from "./dto/create-accion.dto";
import { UpdateAccionDto } from "./dto/update-accion.dto";
import { Accion } from "./schemas/accion.schema";

export interface IAccionRepository {
    create(data: CreateAccionDto, estadoActualId: string, areaOrigenId: string) : Promise<Accion>;
    findOne(id: string) : Promise<Accion | null>;
    findAll() : Promise<Accion[]>;
    update(id: string, data: UpdateAccionDto, estadoActualId: string, areaOrigenId: string) : Promise<Accion | null>;
    remove(id: string) : Promise<void>;
}


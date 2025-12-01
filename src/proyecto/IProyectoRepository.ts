import { CreateProyectoDto } from "./dto/create-proyecto.dto";
import { UpdateProyectoDto } from "./dto/update-proyecto.dto";
import { Proyecto } from "./schema/proyecto.schema";

export interface IProyectoRepository {
    create(data: CreateProyectoDto) : Promise<Proyecto>;
    findOne(id: string) : Promise<Proyecto | null>;
    findAll() : Promise<Proyecto[]>;
    update(id: string, data: UpdateProyectoDto) : Promise<Proyecto | null>;
    remove(id: string) : Promise<void>;
}

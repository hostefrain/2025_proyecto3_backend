import { CreateTipoProyectoDto } from "./dto/create-tipo_proyecto.dto";
import { UpdateTipoProyectoDto } from "./dto/update-tipo_proyecto.dto";
import { TipoProyecto } from "./schema/tipo_proyecto.schema";

export interface ITipo_proyectoRepository {
    create(data: CreateTipoProyectoDto) : Promise<TipoProyecto>;
    findOne(id: string) : Promise<TipoProyecto | null>;
    findAll() : Promise<TipoProyecto[]>;
    update(id: string, data: UpdateTipoProyectoDto) : Promise<TipoProyecto | null>;
    remove(id: string) : Promise<void>;
}
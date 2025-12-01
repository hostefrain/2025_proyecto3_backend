import { CreateTipoReclamoDto } from "./dto/create-tipo_reclamo.dto";
import { UpdateTipoReclamoDto } from "./dto/update-tipo_reclamo.dto";
import { TipoReclamo } from "./schema/tipo_reclamo.schema";

export interface ITipoReclamoRepository {
    create (data: CreateTipoReclamoDto) : Promise<TipoReclamo>;
    findOne (id: string) : Promise<TipoReclamo | null>;
    findAll () : Promise<TipoReclamo[]>;
    update (id: string, data: UpdateTipoReclamoDto) : Promise<TipoReclamo | null>;
    remove (id: string) : Promise<void>;
}
import { CreateNivelCriticidadDto } from "./dto/create-nivel_criticidad.dto";
import { UpdateNivelCriticidadDto } from "./dto/update-nivel_criticidad.dto";
import { NivelCriticidad } from "./schemas/nivel_criticidad.schema";

export interface INivelCriticidadRepository {
    create(data: CreateNivelCriticidadDto) : Promise<NivelCriticidad>;
    findOne(id: string) : Promise<NivelCriticidad | null>;
    findAll() : Promise<NivelCriticidad[]>;
    update(id:string, data: UpdateNivelCriticidadDto) : Promise<NivelCriticidad | null>;
    remove(id: string) : Promise<void>;
}
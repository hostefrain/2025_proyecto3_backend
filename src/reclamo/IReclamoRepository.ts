import { CreateReclamoDto } from "./dto/create-reclamo.dto";
import { UpdateReclamoDto } from "./dto/update-reclamo.dto";
import { Reclamo } from "./schemas/reclamo.schema";

export interface IReclamoRepository {
    create(data: CreateReclamoDto) : Promise<Reclamo>;
    findOne(id: string) : Promise<Reclamo | null>;
    findAll() : Promise<Reclamo[]>;
    update(id: string, data: UpdateReclamoDto) : Promise<Reclamo | null>;
    remove(id: string) : Promise<void>;
}
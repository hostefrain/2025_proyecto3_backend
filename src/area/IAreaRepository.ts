import { CreateAreaDto } from "./dto/create-area.dto";
import { UpdateAreaDto } from "./dto/update-area.dto";
import { Area } from "./schemas/area.schema";

export interface IAreaRepository {
    create(data: CreateAreaDto) : Promise<Area>;
    findOne(id: string) : Promise<Area | null>;
    findByName(nombre: string) : Promise<Area | null>;
    findAll() : Promise<Area[]>;
    update(id: string, data: UpdateAreaDto) : Promise<Area | null>;
    remove(id: string) : Promise<void>;
}
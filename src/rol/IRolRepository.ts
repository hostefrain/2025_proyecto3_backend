import { CreateRolDto } from "./dto/create-rol.dto";
import { UpdateRolDto } from "./dto/update-rol.dto";
import { Rol } from "./schema/rol.schema";

export interface IRolRepository{
    create(data: CreateRolDto) : Promise<Rol>;
    findOne(id: string) : Promise<Rol | null>;
    findAll() : Promise<Rol[]>;
    update(id: string, data: UpdateRolDto) : Promise<Rol | null>;
    remove(id: string) : Promise<void>;
}
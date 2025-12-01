import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { Usuario } from "./schema/usuario.schema";

export interface IUsuarioRepository {
    create(data: CreateUsuarioDto) : Promise<Usuario>;
    findOne(id: string) : Promise<Usuario | null>;
    findAll() : Promise<Usuario[]>;
    update(id: string, data: UpdateUsuarioDto) : Promise<Usuario | null>;
    remove(id: string) : Promise<void>;
}
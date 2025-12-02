import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { Cliente } from "./schemas/cliente.schema";

export interface IClienteRepository {
    create(data: CreateClienteDto) : Promise<Cliente>;
    findById(id: string) : Promise<Cliente | null>;
    findByName(nombre: string) : Promise <Cliente | null>
    findAll() : Promise<Cliente[]>;
    update(id: string, data: UpdateClienteDto) : Promise<Cliente | null>;
    remove(id: string) : Promise<void>;
}
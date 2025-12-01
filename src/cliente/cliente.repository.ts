import { Injectable, Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { Cliente, ClienteDocument } from "./schemas/cliente.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { IClienteRepository } from "./IClienteRepository";

@Injectable()
export class ClienteRepository implements IClienteRepository {
    private readonly logger = new Logger(ClienteRepository.name);
    private readonly ENTITY_NAME = 'Cliente';

    constructor(
        @InjectModel(Cliente.name)
        private readonly clienteModel: Model<ClienteDocument>,
    ) {}

    async create(data: CreateClienteDto): Promise<Cliente> {
        const createdCliente = new this.clienteModel(data);
        return createdCliente.save();
    }

    async findOne(id: string): Promise<Cliente | null> {
        return this.clienteModel.findById(id).exec();
    }

    async findAll(): Promise<Cliente[]> {
        return this.clienteModel.find().exec();
    }

    async update(id: string, data: Partial<UpdateClienteDto>): Promise<Cliente | null> {
        return this.clienteModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.clienteModel.findByIdAndDelete(id).exec();
    }   

}


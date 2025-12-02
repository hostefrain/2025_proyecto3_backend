import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
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
        try {
            const createdCliente = new this.clienteModel(data);
            return createdCliente.save();          
        } catch(error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
            throw new InternalServerErrorException('Error al crear el Cliente')
        }
    }

    async findById(id: string): Promise<Cliente | null> {
        try {
            return this.clienteModel.findById(id).exec();
        } catch(error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con id ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el Proyecto');
        }
    }

    async findByName(nombre: string): Promise<Cliente | null> {
        try {
            return this.clienteModel.findOne({ nombre }).exec();
        } catch(error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con nombre ${nombre}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el Proyecto');
        }
    }
        
    async findAll(): Promise<Cliente[]> {
        try {
            return this.clienteModel.find().exec();
        } catch(error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME}s: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar los Clientes');
        }
    }

    async update(id: string, data: Partial<UpdateClienteDto>): Promise<Cliente | null> {
        try {
            return this.clienteModel.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch(error) {
            this.logger.error(`Error al actualizar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al actualizar el Cliente');
        }
    }   

    async remove(id: string): Promise<void> {
        try {
            await this.clienteModel.findByIdAndDelete(id).exec();
        } catch(error) {
            this.logger.error(`Error al eliminar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al eliminar el Proyecto');
        }
    }   

}


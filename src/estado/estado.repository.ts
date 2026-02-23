import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Estado, EstadoDocument } from "./schemas/estado.schema";
import { Model } from "mongoose";
import { IEstadoRepository } from "./IEstadoRepository";
import { CreateEstadoDto } from "./dto/create-estado.dto";

@Injectable()
export class EstadoRepository implements IEstadoRepository {
    private readonly logger = new Logger(EstadoRepository.name);
    private readonly ENTITY_NAME = 'Estado';

    constructor(
        @InjectModel(Estado.name)
        private readonly estadoModel: Model<EstadoDocument>,
    ) {}

    async create(data: CreateEstadoDto): Promise<Estado> {
        try {
            const createdEstado = new this.estadoModel(data);
            return await createdEstado.save();
        } catch (error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
            throw new InternalServerErrorException('Error al crear el Estado');
        }
    }
    
    async findByName(nombre: string): Promise<Estado | null> {
        try {
            return await this.estadoModel.findOne({ nombre }).exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con nombre ${nombre}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el Estado');
        }
    }

    async findById(id: string): Promise<Estado | null> {
        try {
            return await this.estadoModel.findById(id).exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con id ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el Estado');
        }
    }

    async findAll(): Promise<Estado[]> {
        try {
            return await this.estadoModel.find().exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME}s: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar los Estados');
        }
    }

    async update(id: string, data: Partial<Estado>): Promise<Estado | null> {
        try {
            return await this.estadoModel.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch (error) {
            this.logger.error(`Error al actualizar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al actualizar el Estado');
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await this.estadoModel.findByIdAndDelete(id).exec();
        } catch (error) {
            this.logger.error(`Error al eliminar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al eliminar el Estado');
        }
    }

}
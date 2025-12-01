import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { NivelCriticidad, NivelCriticidadDocument } from "./schemas/nivel_criticidad.schema";
import { Model } from "mongoose";

@Injectable()
export class NivelCriticidadRepository {
    private readonly logger = new Logger(NivelCriticidadRepository.name);
    private readonly ENTITY_NAME = 'NivelCriticidad';

    constructor(
        @InjectModel(NivelCriticidad.name)
        private readonly nivelCriticidadModel: Model<NivelCriticidadDocument>,
    ) {}

    async create(data: any): Promise<NivelCriticidad> {
        try {
            const createdNivelCriticidad = new this.nivelCriticidadModel(data);
            return createdNivelCriticidad.save();
        } catch (error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
            throw new InternalServerErrorException('Error al crear el NivelCriticidad');
        }
    }

    async findOne(id: string): Promise<NivelCriticidad | null> {
        try {
            return this.nivelCriticidadModel.findById(id).exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con id ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el NivelCriticidad');
        }
        
    }

    async findByName(nombre: string): Promise<NivelCriticidad | null> {
        try {
            return this.nivelCriticidadModel.findOne({ nombre }).exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con nombre ${nombre}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el NivelCriticidad');
        }
    }

    async findAll(): Promise<NivelCriticidad[]> {
        try {
            return this.nivelCriticidadModel.find().exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME}s: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar los NivelCriticidad');
        }
    }

    async update(id: string, data: any): Promise<NivelCriticidad | null> {
        try {
            return this.nivelCriticidadModel.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch (error) {
            this.logger.error(`Error al actualizar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al actualizar el NivelCriticidad');
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await this.nivelCriticidadModel.findByIdAndDelete(id).exec();
        } catch (error) {
            this.logger.error(`Error al eliminar ${this.ENTITY_NAME} con id ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al eliminar el NivelCriticidad');
        }
    }
}
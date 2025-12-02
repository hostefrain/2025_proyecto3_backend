import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { IReclamoRepository } from "./IReclamoRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Reclamo } from "./schemas/reclamo.schema";
import { Model } from "mongoose";
import { CreateReclamoDto } from "./dto/create-reclamo.dto";

@Injectable()
export class ReclamoRepository implements IReclamoRepository{
    private readonly ENTITY_NAME = 'Reclamo';
    private readonly logger = new Logger(ReclamoRepository.name);

    constructor(
        @InjectModel(Reclamo.name)
        private readonly reclamoModel: Model<Reclamo>,
    ) {}
    
    async create(data: CreateReclamoDto): Promise<Reclamo> {
        try {
            const createdReclamo = new this.reclamoModel(data);
            return createdReclamo.save();
        } catch (error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
            throw new InternalServerErrorException('Error al crear el Reclamo');
        }
    }

    async findOne(id: string): Promise<Reclamo | null> {
        try {
            return this.reclamoModel.findById(id).exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con id ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el Reclamo');
        }
    }

    async findByName(nombre: string): Promise<Reclamo | null> {
        try {
            return this.reclamoModel.findOne({ nombre }).exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con nombre ${nombre}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el Reclamo');
        }
    }

    async findAll(): Promise<Reclamo[]> {
        try {
            return this.reclamoModel.find().exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME}s: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar los Reclamos');
        }
    }

    async update(id: string, data: CreateReclamoDto): Promise<Reclamo | null> {
        try {
            return this.reclamoModel.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch (error) {
            this.logger.error(`Error al actualizar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al actualizar el Reclamo');
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await this.reclamoModel.findByIdAndDelete(id).exec();
        } catch (error) {
            this.logger.error(`Error al eliminar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al eliminar el Reclamo');
        }
    }
}
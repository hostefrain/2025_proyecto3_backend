import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { IAreaRepository } from "./IAreaRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Area, AreaDocument } from "./schemas/area.schema";
import { Model } from "mongoose";
import { UpdateAreaDto } from "./dto/update-area.dto";
import { CreateAreaDto } from "./dto/create-area.dto";

@Injectable()
export class AreaRepository implements IAreaRepository{
    private readonly logger = new Logger(AreaRepository.name);
    private readonly ENTITY_NAME = 'Area';

    constructor(
        @InjectModel(Area.name)
        private readonly areaModel: Model<AreaDocument>,
    ) {}

    async create(data: CreateAreaDto): Promise<Area> {
        try {
            const createdArea = new this.areaModel(data);
            return createdArea.save();
        } catch (error) {
            this.logger.error(`Error creando area: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error al crear area');
        }
    }

    async findOne(id: string): Promise<Area | null> {
        try {
            return this.areaModel.findById(id).exec();
        } catch (error) {
            this.logger.error(`Error buscando area con id ${id}: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error al buscar area');
        }
    }

    async findByName(nombre: string): Promise<Area | null> {
        try {
            return this.areaModel.findOne({ nombre }).exec();
        } catch (error) {
            this.logger.error(`Error buscando area con nombre ${nombre}: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error al buscar area');
        }
    }

    async findAll(): Promise<Area[]> {
        try {
            return this.areaModel.find().exec();
        } catch (error) {
            this.logger.error(`Error buscando areas: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error al buscar areas');
        }
    }

    async update(id: string, data: UpdateAreaDto): Promise<Area | null> {
        try {
            return this.areaModel.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch (error) {
            this.logger.error(`Error actualizando area con id ${id}: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error al actualizar area');
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await this.areaModel.findByIdAndDelete(id).exec();
        } catch (error) {
            this.logger.error(`Error eliminando area con id ${id}: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error al eliminar area');
        }
    }
}
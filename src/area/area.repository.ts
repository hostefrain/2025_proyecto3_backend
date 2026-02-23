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
            return await createdArea.save();
        } catch (error) {
            this.logger.error(`Error creando area: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error al crear Area');
        }
    }

    async findOne(id: string): Promise<Area | null> {
        try {
            return await this.areaModel.findById(id).exec();
        } catch (error) {
            this.logger.error(`Error buscando area con id ${id}: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error al buscar Area');
        }
    }

    async findByName(nombre: string): Promise<Area | null> {
        try {
            return await this.areaModel.findOne({ nombre }).exec();
        } catch (error) {
            this.logger.error(`Error buscando Area con nombre ${nombre}: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error al buscar Area');
        }
    }

    async findAll(): Promise<Area[]> {
        try {
            return await this.areaModel.find().exec();
        } catch (error) {
            this.logger.error(`Error buscando Areas: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error al buscar Areas');
        }
    }

    async update(id: string, data: UpdateAreaDto): Promise<Area | null> {
        try {
            return await this.areaModel.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch (error) {
            this.logger.error(`Error actualizando Area con id ${id}: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error al actualizar Area');
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await this.areaModel.findByIdAndDelete(id).exec();
        } catch (error) {
            this.logger.error(`Error eliminando area con id ${id}: ${error.message}`, error.stack);
            throw new InternalServerErrorException('Error al eliminar Area');
        }
    }
}
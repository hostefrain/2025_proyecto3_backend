import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ITipo_proyectoRepository } from "./ITipo_proyectoRepository";
import { InjectModel } from "@nestjs/mongoose";
import { TipoProyecto, TipoProyectoDocument } from "./schema/tipo_proyecto.schema";
import { Model } from "mongoose";
import { CreateTipoProyectoDto } from "./dto/create-tipo_proyecto.dto";

@Injectable()
export class TipoProyectoRepository implements ITipo_proyectoRepository{
    private readonly ENTITY_NAME = 'TipoProyecto';
    private readonly logger = new Logger(TipoProyectoRepository.name);

    constructor(
        @InjectModel(TipoProyecto.name)
        private readonly tipoProyectoModel: Model<TipoProyectoDocument>,
    ) {}

    async create(data: CreateTipoProyectoDto): Promise<TipoProyecto> {
        try {
            const createdTipoProyecto = new this.tipoProyectoModel(data);
            return createdTipoProyecto.save();
        } catch (error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
            throw new InternalServerErrorException('Error al crear el TipoProyecto');
        }
    }

    async findByName(nombre: string): Promise<TipoProyecto | null> {
        try {
            return this.tipoProyectoModel.findOne({ nombre }).exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con nombre ${nombre}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el TipoProyecto');
        }
    }

    async findByID(id: string): Promise<TipoProyecto | null> {
        try {
            return this.tipoProyectoModel.findById(id).exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con id ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el TipoProyecto');
        }
    }

    async findAll(): Promise<TipoProyecto[]> {
        try {
            return this.tipoProyectoModel.find().exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME}s: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar los TipoProyectos');
        }
    }

    async update(id: string, data: CreateTipoProyectoDto): Promise<TipoProyecto | null> {
        try {
            return this.tipoProyectoModel.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch (error) {
            this.logger.error(`Error al actualizar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al actualizar el TipoProyecto');
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await this.tipoProyectoModel.findByIdAndDelete(id).exec();
        } catch (error) {
            this.logger.error(`Error al eliminar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al eliminar el TipoProyecto');
        }
    }
}

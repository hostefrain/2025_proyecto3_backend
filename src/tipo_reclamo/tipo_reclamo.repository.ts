import { InternalServerErrorException, Logger } from "@nestjs/common";
import { ITipoReclamoRepository } from "./ITipo_reclamoRepository";
import { CreateTipoReclamoDto } from "./dto/create-tipo_reclamo.dto";
import { TipoReclamo, TipoReclamoDocument } from "./schema/tipo_reclamo.schema";
import { UpdateTipoReclamoDto } from "./dto/update-tipo_reclamo.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class TipoReclamoRepository implements ITipoReclamoRepository{
    private readonly ENTITY_NAME = 'TipoReclamo';
    private readonly logger = new Logger(TipoReclamoRepository.name);

    constructor(
        @InjectModel(TipoReclamo.name)
        private readonly tipoReclamoModel: Model<TipoReclamoDocument>,
    ) {}

    async create(data: CreateTipoReclamoDto): Promise<TipoReclamo> {
        try {
            const nueva = new this.tipoReclamoModel(data);
            return await nueva.save();
        } catch (error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
            throw new InternalServerErrorException('Error al crear el TipoReclamo');
        }
    }


    async findByName(nombre: string): Promise<TipoReclamo | null> {
        try {
            return this.tipoReclamoModel.findOne({ nombre }).exec();
        }catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con nombre ${nombre}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el TipoReclamo');
        }
    }

    async findById(id: string): Promise<TipoReclamo | null> {
        try {
            return this.tipoReclamoModel.findOne({ id }).exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con id ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el TipoReclamo');
        }
    }

    async findAll(): Promise<TipoReclamo[]> {
        try {
            return this.tipoReclamoModel.find().exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME}s: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar los TipoReclamos');
        }
    }

    async update(id: string, data: UpdateTipoReclamoDto): Promise<TipoReclamo | null> {
        try {
            return this.tipoReclamoModel.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch (error) {
        this.logger.error(`Error al actualizar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
        throw new InternalServerErrorException('Error al actualizar el TipoReclamo');
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await this.tipoReclamoModel.findOneAndDelete({ _id: id }).exec();
        } catch (error) {
            this.logger.error(`Error al eliminar ${this.ENTITY_NAME} con id ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al eliminar el TipoReclamo');
        }
    }

}
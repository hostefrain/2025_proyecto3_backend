import { Inject, Logger } from "@nestjs/common";
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
        const createdTipoReclamo = new this.tipoReclamoModel(data);
        return createdTipoReclamo.save();
    }

    async findOne(id: string): Promise<TipoReclamo | null> {
        return this.tipoReclamoModel.findById(id).exec();
    }

    async findAll(): Promise<TipoReclamo[]> {
        return this.tipoReclamoModel.find().exec();
    }

    async update(id: string, data: UpdateTipoReclamoDto): Promise<TipoReclamo | null> {
        return this.tipoReclamoModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.tipoReclamoModel.findByIdAndDelete(id).exec();
    }
}
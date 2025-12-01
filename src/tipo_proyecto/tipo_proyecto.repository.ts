import { Injectable, Logger } from "@nestjs/common";
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
        const createdTipoProyecto = new this.tipoProyectoModel(data);
        return createdTipoProyecto.save();
    }

    async findOne(id: string): Promise<TipoProyecto | null> {
        return this.tipoProyectoModel.findById(id).exec();
    }

    async findAll(): Promise<TipoProyecto[]> {
        return this.tipoProyectoModel.find().exec();
    }

    async update(id: string, data: CreateTipoProyectoDto): Promise<TipoProyecto | null> {
        return this.tipoProyectoModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.tipoProyectoModel.findByIdAndDelete(id).exec();
    }
}

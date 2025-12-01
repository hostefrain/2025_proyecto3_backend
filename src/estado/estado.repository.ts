import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Estado, EstadoDocument } from "./schemas/estado.schema";
import { Model } from "mongoose";
import { IEstadoRepository } from "./IEstadoRepository";

@Injectable()
export class EstadoRepository implements IEstadoRepository {
    private readonly logger = new Logger(EstadoRepository.name);
    private readonly ENTITY_NAME = 'Estado';

    constructor(
        @InjectModel(Estado.name)
        private readonly estadoModel: Model<EstadoDocument>,
    ) {}

    async create(data: Partial<Estado>): Promise<Estado> {
        const createdEstado = new this.estadoModel(data);
        return createdEstado.save();
    }

    async findOne(id: string): Promise<Estado | null> {
        return this.estadoModel.findById(id).exec();
    }

    async findAll(): Promise<Estado[]> {
        return this.estadoModel.find().exec();
    }

    async update(id: string, data: Partial<Estado>): Promise<Estado | null> {
        return this.estadoModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.estadoModel.findByIdAndDelete(id).exec();
    }

}
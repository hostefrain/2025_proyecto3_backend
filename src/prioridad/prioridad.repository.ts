import { Inject, Injectable, Logger } from "@nestjs/common";
import { Prioridad, PrioridadDocument } from "./schemas/prioridad.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PrioridadRepository {
    private readonly logger = new Logger(PrioridadRepository.name);
    private readonly ENTITY_NAME = 'Prioridad';

    constructor(
        @InjectModel(Prioridad.name)
        private readonly prioridadModel: Model<PrioridadDocument>,
    ) { }

    async create(data: any): Promise<Prioridad> {
        const createdPrioridad = new this.prioridadModel(data);
        return createdPrioridad.save();
    }

    async findOne(id: string): Promise<Prioridad | null> {
        return this.prioridadModel.findById(id).exec();
    }

    async findAll(): Promise<Prioridad[]> {
        return this.prioridadModel.find().exec();
    }

    async update(id: string, data: any): Promise<Prioridad | null> {
        return this.prioridadModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.prioridadModel.findByIdAndDelete(id).exec();
    }   
}
import { Injectable, Logger } from "@nestjs/common";
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
        const createdNivelCriticidad = new this.nivelCriticidadModel(data);
        return createdNivelCriticidad.save();
    }

    async findOne(id: string): Promise<NivelCriticidad | null> {
        return this.nivelCriticidadModel.findById(id).exec();
    }

    async findAll(): Promise<NivelCriticidad[]> {
        return this.nivelCriticidadModel.find().exec();
    }

    async update(id: string, data: any): Promise<NivelCriticidad | null> {
        return this.nivelCriticidadModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.nivelCriticidadModel.findByIdAndDelete(id).exec();
    }
}
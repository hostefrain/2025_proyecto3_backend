import { Injectable, Logger } from "@nestjs/common";
import { Accion, AccionDocument } from "./schemas/accion.schema";
import { InjectModel } from "@nestjs/mongoose";
import { IAccionRepository } from "./IAccionRepository";
import { Model } from "mongoose";
import { UpdateAccionDto } from "./dto/update-accion.dto";
import { CreateAccionDto } from "./dto/create-accion.dto";

@Injectable()
export class AccionRepository implements IAccionRepository {
    private readonly logger = new Logger(AccionRepository.name);
    private readonly ENTITY_NAME = 'Accion';

    constructor(
        @InjectModel(Accion.name)
        private readonly accionModel: Model<AccionDocument>,
    ) {}

    async create(data: CreateAccionDto): Promise<Accion> {
        const createdAccion = new this.accionModel(data);
        return createdAccion.save();
    }

    async findOne(id: string): Promise<Accion | null> {
        return this.accionModel.findById(id).exec();
    }

    async findAll(): Promise<Accion[]> {
        return this.accionModel.find().exec();
    }

    async update(id: string, data: UpdateAccionDto): Promise<Accion | null> {
        return this.accionModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.accionModel.findByIdAndDelete(id).exec();
    }
}


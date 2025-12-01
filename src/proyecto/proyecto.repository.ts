import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Proyecto, ProyectoDocument } from "./schema/proyecto.schema";
import { Model } from "mongoose";
import { CreateProyectoDto } from "./dto/create-proyecto.dto";
import { UpdateProyectoDto } from "./dto/update-proyecto.dto";
import { IProyectoRepository } from "./IProyectoRepository";

@Injectable()
export class ProyectoRepository implements IProyectoRepository {
    private readonly logger = new Logger(ProyectoRepository.name);
    private readonly ENTITY_NAME = 'Proyecto';

    constructor(
        @InjectModel(Proyecto.name)
        private readonly proyectoModel: Model<ProyectoDocument>,
    ) {}

    async create(data: CreateProyectoDto): Promise<Proyecto> {
        const createdProyecto = new this.proyectoModel(data);
        return createdProyecto.save();
    }

    async findOne(id: string): Promise<Proyecto | null> {
        return this.proyectoModel.findById(id).exec();
    }

    async findAll(): Promise<Proyecto[]> {
        return this.proyectoModel.find().exec();
    }

    async update(id: string, data: UpdateProyectoDto): Promise<Proyecto | null> {
        return this.proyectoModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.proyectoModel.findByIdAndDelete(id).exec();
    }

}
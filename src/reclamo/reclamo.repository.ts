import { Injectable, Logger } from "@nestjs/common";
import { IReclamoRepository } from "./IReclamoRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Reclamo } from "./schemas/reclamo.schema";
import { Model } from "mongoose";
import { CreateReclamoDto } from "./dto/create-reclamo.dto";

@Injectable()
export class ReclamoRepository implements IReclamoRepository{
    private readonly ENTITY_NAME = 'Reclamo';
    private readonly logger = new Logger(ReclamoRepository.name);

    constructor(
        @InjectModel(Reclamo.name)
        private readonly reclamoModel: Model<Reclamo>,
    ) {}
    
    async create(data: CreateReclamoDto): Promise<Reclamo> {
        const createdReclamo = new this.reclamoModel(data);
        return createdReclamo.save();
    }

    async findOne(id: string): Promise<Reclamo | null> {
        return this.reclamoModel.findById(id).exec();
    }

    async findAll(): Promise<Reclamo[]> {
        return this.reclamoModel.find().exec();
    }

    async update(id: string, data: CreateReclamoDto): Promise<Reclamo | null> {
        return this.reclamoModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.reclamoModel.findByIdAndDelete(id).exec();
    }
}
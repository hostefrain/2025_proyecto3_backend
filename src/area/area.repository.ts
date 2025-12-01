import { Injectable, Logger } from "@nestjs/common";
import { IAreaRepository } from "./IAreaRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Area, AreaDocument } from "./schemas/area.schema";
import { Model } from "mongoose";
import { CreateAccionDto } from "src/accion/dto/create-accion.dto";
import { UpdateAreaDto } from "./dto/update-area.dto";

@Injectable()
export class AreaRepository implements IAreaRepository{
    private readonly logger = new Logger(AreaRepository.name);
    private readonly ENTITY_NAME = 'Area';

    constructor(
        @InjectModel(Area.name)
        private readonly areaModel: Model<AreaDocument>,
    ) {}

    async create(data: CreateAccionDto): Promise<Area> {
        const createdArea = new this.areaModel(data);
        return createdArea.save();
    }

    async findOne(id: string): Promise<Area | null> {
        return this.areaModel.findById(id).exec();
    }

    async findAll(): Promise<Area[]> {
        return this.areaModel.find().exec();
    }

    async update(id: string, data: Partial<UpdateAreaDto>): Promise<Area | null> {
        return this.areaModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.areaModel.findByIdAndDelete(id).exec();
    }
}
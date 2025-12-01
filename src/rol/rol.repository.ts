import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Rol, RolDocument } from "./schema/rol.schema";
import { Model } from "mongoose";
import { CreateRolDto } from "./dto/create-rol.dto";

@Injectable()
export class RolRepository {
    private readonly logger = new Logger(RolRepository.name);
    private readonly ENTITY_NAME = 'Rol';

    constructor(
        @InjectModel(Rol.name)
        private readonly rolModel: Model<RolDocument>,
    ) {}

    async create(data: CreateRolDto): Promise<Rol> {
        const createdRol = new this.rolModel(data);
        return createdRol.save();
    }

    async findOne(id: string): Promise<Rol | null> {
        return this.rolModel.findById(id).exec();
    }

    async findAll(): Promise<Rol[]> {
        return this.rolModel.find().exec();
    }

    async update(id: string, data: Partial<CreateRolDto>): Promise<Rol | null> {
        return this.rolModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.rolModel.findByIdAndDelete(id).exec();
    }
}
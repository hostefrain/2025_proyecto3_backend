import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
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
        try {
            const createdRol = new this.rolModel(data);
            return createdRol.save()
        } catch (error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
            throw new InternalServerErrorException('Error al crear Rol');
        }
    }

    async findOne(id: string): Promise<Rol | null> {
        try {
            return this.rolModel.findById(id).exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con id ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar Rol');
        }
    }

    async findByName(nombre: string): Promise <Rol | null> {
        try {
            return this.rolModel.findOne({ nombre }).exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con nombre ${nombre}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el Rol');
        }
    }

    async findAll(): Promise<Rol[]> {
        try {
            return this.rolModel.find().exec();
        } catch (error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME}s: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar los Estados');
        }
    }

    async update(id: string, data: Partial<CreateRolDto>): Promise<Rol | null> {
        try {
            return this.rolModel.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch (error) {
            this.logger.error(`Error al actualizar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al actualizar el Estado');
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await this.rolModel.findByIdAndDelete(id).exec();
        } catch (error) {
            this.logger.error(`Error al eliminar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al eliminar el Estado');
        }
    }
}
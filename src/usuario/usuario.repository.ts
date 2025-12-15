import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { IUsuarioRepository } from "./IUsuarioRepository";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { Usuario, UsuarioDocument } from "./schema/usuario.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
    private readonly ENTITY_NAME = 'Usuario';
    private readonly logger = new Logger(UsuarioRepository.name);

    constructor(
        @InjectModel(Usuario.name)
        private readonly usuarioModel: Model<UsuarioDocument>,
    ) {}

    async create(data: CreateUsuarioDto): Promise<Usuario> {
        try {
            const createdUsuario = new this.usuarioModel(data);
            return createdUsuario.save();
        } catch(error) {
            this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
            throw new InternalServerErrorException('Error al crear Usuario');
        }
    }

    async findOne(id: string): Promise<UsuarioDocument | null> {
        try {
            return this.usuarioModel.findById(id).exec();
        } catch(error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con id ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar Usuario');
        }
    }

    async findByName(nombre: string): Promise<UsuarioDocument | null> {
        try {
            return this.usuarioModel.findOne({ nombre }).exec();
        } catch(error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME} con nombre ${nombre}: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar el Nombre');
        }
    }

    async findAll(): Promise<Usuario[]> {
        try {
            return this.usuarioModel.find().exec();
        } catch(error) {
            this.logger.error(`Error al buscar ${this.ENTITY_NAME}s: ${error.message}`);
            throw new InternalServerErrorException('Error al buscar Usuarios');
        }
        
    }

    async update(id: string, data: CreateUsuarioDto): Promise<Usuario | null> {
        try {
            return this.usuarioModel.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch(error) {
            this.logger.error(`Error al actualizar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al actualizar el Usuario');
        }
        
    }

    async remove(id: string): Promise<void> {
        try {
            await this.usuarioModel.findByIdAndDelete(id).exec();
        } catch(error) {
            this.logger.error(`Error al eliminar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`);
            throw new InternalServerErrorException('Error al eliminar el Usuario');
        }
    }
}


import { Injectable, Logger } from "@nestjs/common";
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
        const createdUsuario = new this.usuarioModel(data);
        return createdUsuario.save();
    }

    async findOne(id: string): Promise<Usuario | null> {
        return this.usuarioModel.findById(id).exec();
    }

    async findAll(): Promise<Usuario[]> {
        return this.usuarioModel.find().exec();
    }

    async update(id: string, data: CreateUsuarioDto): Promise<Usuario | null> {
        return this.usuarioModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.usuarioModel.findByIdAndDelete(id).exec();
    }
}


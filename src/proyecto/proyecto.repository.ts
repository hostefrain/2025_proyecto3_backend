import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Proyecto, ProyectoDocument } from "./schema/proyecto.schema";
import { Model, Types } from "mongoose";
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
    try {
      const createdProyecto = new this.proyectoModel({
        nombre: data.nombre,
        clienteId: new Types.ObjectId(data.clienteId),
        tipoProyectoId: new Types.ObjectId(data.tipoProyectoId),
      });

      return await createdProyecto.save();
    } catch (error) {
      this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
      throw new InternalServerErrorException('Error al crear el Proyecto');
    }
  }

  async findOne(id: string): Promise<Proyecto | null> {
    try {
      return this.proyectoModel.findById(id).exec();
    } catch (error) {
      this.logger.error(
        `Error al buscar ${this.ENTITY_NAME} con id ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al buscar el Proyecto');
    }
  }

  async findByName(nombre: string): Promise<Proyecto | null> {
    try {
      return this.proyectoModel.findOne({ nombre }).exec();
    } catch (error) {
      this.logger.error(
        `Error al buscar ${this.ENTITY_NAME} con nombre ${nombre}: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al buscar el Proyecto');
    }
  }

  async findAll(): Promise<Proyecto[]> {
    try {
      return this.proyectoModel.find().exec();
    } catch (error) {
      this.logger.error(
        `Error al buscar ${this.ENTITY_NAME}s: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al buscar los Proyectos');
    }
  }

  async update(
    id: string,
    data: UpdateProyectoDto,
  ): Promise<Proyecto | null> {
    try {
      const payload: any = {
        ...data,
      };

      if (data.clienteId) {
        payload.clienteId = new Types.ObjectId(data.clienteId);
      }

      if (data.tipoProyectoId) {
        payload.tipoProyectoId = new Types.ObjectId(data.tipoProyectoId);
      }

      return await this.proyectoModel
        .findByIdAndUpdate(id, payload, { new: true })
        .exec();
    } catch (error) {
      this.logger.error(
        `Error al actualizar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al actualizar el Proyecto');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.proyectoModel.findByIdAndDelete(id).exec();
    } catch (error) {
      this.logger.error(
        `Error al eliminar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al eliminar el Proyecto');
    }
  }
}

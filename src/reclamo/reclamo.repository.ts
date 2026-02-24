import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { IReclamoRepository } from "./IReclamoRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Reclamo } from "./schemas/reclamo.schema";
import { Model, Types } from "mongoose";
import { CreateReclamoDto } from "./dto/create-reclamo.dto";
import { UpdateReclamoDto } from "./dto/update-reclamo.dto";

@Injectable()
export class ReclamoRepository implements IReclamoRepository {
  private readonly ENTITY_NAME = 'Reclamo';
  private readonly logger = new Logger(ReclamoRepository.name);

  constructor(
    @InjectModel(Reclamo.name)
    private readonly reclamoModel: Model<Reclamo>,
  ) {}

  async create(
    data: CreateReclamoDto,
    archivos: string[],
    imagenes: string[],
  ): Promise<Reclamo> {
    try {
      const createdReclamo = new this.reclamoModel({
        descripcion: data.descripcion,
        proyectoId: new Types.ObjectId(data.proyectoId),
        tipoReclamoId: new Types.ObjectId(data.tipoReclamoId),
        prioridadId: new Types.ObjectId(data.prioridadId),
        nivelCriticidadId: new Types.ObjectId(data.nivelCriticidadId),
        estadoId: new Types.ObjectId(data.estadoId),
        areaId: new Types.ObjectId(data.areaId),
        archivos,
        imagenes,
      });

      return await createdReclamo.save();
    } catch (error) {
      this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
      throw new InternalServerErrorException('Error al crear el Reclamo');
    }
  }

  async findOne(id: string): Promise<Reclamo | null> {
    try {
      return this.reclamoModel
      .findById(id)
      .populate('proyectoId')
      .populate('estadoId')
      .exec();
    } catch (error) {
      this.logger.error(
        `Error al buscar ${this.ENTITY_NAME} con id ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al buscar el Reclamo');
    }
  }

  // Para eliminar el uso del metodo que trae populate
  async findOneRaw(id: string): Promise<Reclamo | null> {
    try {
      return this.reclamoModel.findById(id).exec();
    } catch (error) {
      this.logger.error(
        `Error al buscar ${this.ENTITY_NAME} con id ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al buscar el Reclamo');
    }
  }

  async findAll(): Promise<Reclamo[]> {
    try {
      return this.reclamoModel
      .find()
      .populate('proyectoId')
      .populate('estadoId')
      .exec();
    } catch (error) {
      this.logger.error(
        `Error al buscar ${this.ENTITY_NAME}s: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al buscar los Reclamos');
    }
  }

  async update(
    id: string,
    data: UpdateReclamoDto,
    archivos: string[],
    imagenes: string[],
  ): Promise<Reclamo | null> {
    try {
      const updateData: any = {
        ...data,
      };

      if (data.proyectoId)
        updateData.proyectoId = new Types.ObjectId(data.proyectoId);

      if (data.tipoReclamoId)
        updateData.tipoReclamoId = new Types.ObjectId(data.tipoReclamoId);

      if (data.prioridadId)
        updateData.prioridadId = new Types.ObjectId(data.prioridadId);

      if (data.nivelCriticidadId)
        updateData.nivelCriticidadId = new Types.ObjectId(data.nivelCriticidadId);

      if (data.estadoId)
        updateData.estadoId = new Types.ObjectId(data.estadoId);

      if (data.areaId)
        updateData.areaId = new Types.ObjectId(data.areaId);

      if (archivos.length > 0) updateData.archivos = archivos;
      if (imagenes.length > 0) updateData.imagenes = imagenes;

      return await this.reclamoModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .exec();
    } catch (error) {
      this.logger.error(
        `Error al actualizar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al actualizar el Reclamo');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.reclamoModel.findByIdAndDelete(id).exec();
    } catch (error) {
      this.logger.error(
        `Error al eliminar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al eliminar el Reclamo');
    }
  }
}

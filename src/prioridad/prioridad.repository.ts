import { Injectable, Logger, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { Prioridad, PrioridadDocument } from "./schemas/prioridad.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPrioridadRepository } from "./IPrioridadRepository";
import { CreatePrioridadDto } from "./dto/create-prioridad.dto";
import { UpdatePrioridadDto } from "./dto/update-prioridad.dto";

@Injectable()
export class PrioridadRepository implements IPrioridadRepository {
  private readonly logger = new Logger(PrioridadRepository.name);

  constructor(
    @InjectModel(Prioridad.name)
    private readonly prioridadModel: Model<PrioridadDocument>,
  ) {}

  async create(data: CreatePrioridadDto): Promise<Prioridad> {
    try {
      const createdPrioridad = new this.prioridadModel(data);
      return await createdPrioridad.save();
    } catch (error) {
      this.logger.error(`Error creando prioridad: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al crear la prioridad');
    }
  }

  async findOne(id: string): Promise<Prioridad | null> {
    try {
      const prioridad = await this.prioridadModel.findById(id).exec();
      
      if (!prioridad) {
        throw new NotFoundException(`Prioridad con ID ${id} no encontrada`);
      }
      
      return prioridad;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error finding prioridad with id ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al buscar la prioridad');
    }
  }

    async findByName(nombre: string): Promise<Prioridad | null> {
    try {
      const prioridad = await this.prioridadModel.findOne( { nombre }).exec();
      
      if (!prioridad) {
        throw new NotFoundException(`Prioridad con Nombre ${nombre} no encontrada`);
      }
      
      return prioridad;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error buscando prioridad con nombre ${nombre}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al buscar la prioridad');
    }
  }

  async findAll(): Promise<Prioridad[]> {
    try {
      return await this.prioridadModel.find().exec();
    } catch (error) {
      this.logger.error(`Error finding all prioridades: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al obtener las prioridades');
    }
  }

  async update(id: string, data: UpdatePrioridadDto): Promise<Prioridad | null> {
    try {
      const updatedPrioridad = await this.prioridadModel
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      
      if (!updatedPrioridad) {
        throw new NotFoundException(`Prioridad con ID ${id} no encontrada`);
      }
      
      return updatedPrioridad;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error updating prioridad with id ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al actualizar la prioridad');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.prioridadModel.findByIdAndDelete(id).exec();
      
      if (!result) {
        throw new NotFoundException(`Prioridad con ID ${id} no encontrada`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Error removing prioridad with id ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al eliminar la prioridad');
    }
  }
}
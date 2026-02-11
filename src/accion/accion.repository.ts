import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Accion, AccionDocument } from "./schemas/accion.schema";
import { InjectModel } from "@nestjs/mongoose";
import { IAccionRepository } from "./IAccionRepository";
import { Model, Types } from "mongoose";
import { UpdateAccionDto } from "./dto/update-accion.dto";
import { CreateAccionDto } from "./dto/create-accion.dto";

@Injectable()
export class AccionRepository implements IAccionRepository {
  private readonly logger = new Logger(AccionRepository.name);
  private readonly ENTITY_NAME = 'Accion';

  constructor(
    @InjectModel(Accion.name)
    private readonly accionModel: Model<AccionDocument>,
  ) {}

  async create(
    data: CreateAccionDto,
    areaOrigenId: string,
    estadoActualId: string,
  ): Promise<Accion> {
    try {
      const createdAccion = new this.accionModel({
        ...data,
        areaOrigenId: new Types.ObjectId(areaOrigenId),
        estadoActualId: new Types.ObjectId(estadoActualId),
      });

      return await createdAccion.save();
    } catch (error) {
      this.logger.error(`Error al crear ${this.ENTITY_NAME}: ${error.message}`);
      throw new InternalServerErrorException('Error al crear la Acción');
    }
  }

  async findOne(id: string): Promise<Accion | null> {
    try {
      return this.accionModel.findById(id).exec();
    } catch (error) {
      this.logger.error(
        `Error al buscar ${this.ENTITY_NAME} con id ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al buscar la Acción');
    }
  }

  async findAll(): Promise<Accion[]> {
    try {
      return this.accionModel.find().exec();
    } catch (error) {
      this.logger.error(
        `Error al buscar ${this.ENTITY_NAME}s: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al buscar las Acciones');
    }
  }

  async update(id: string, data: UpdateAccionDto): Promise<Accion | null> {
    try {
      const payload: any = { ...data };

      if (data.areaOrigenId) {
        payload.areaOrigenId = new Types.ObjectId(data.areaOrigenId);
      }

      if (data.estadoActualId) {
        payload.estadoActualId = new Types.ObjectId(data.estadoActualId);
      }

      return await this.accionModel
        .findByIdAndUpdate(id, payload, { new: true })
        .exec();
    } catch (error) {
      this.logger.error(
        `Error al actualizar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al actualizar la Acción');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.accionModel.findByIdAndDelete(id).exec();
    } catch (error) {
      this.logger.error(
        `Error al eliminar ${this.ENTITY_NAME} con id: ${id}: ${error.message}`,
      );
      throw new InternalServerErrorException('Error al eliminar la Acción');
    }
  }
}

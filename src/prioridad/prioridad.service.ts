import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreatePrioridadDto } from './dto/create-prioridad.dto';
import { UpdatePrioridadDto } from './dto/update-prioridad.dto';
import type { IPrioridadRepository } from './IPrioridadRepository';
import { normalize } from 'path';

@Injectable()
export class PrioridadService {
  private readonly logger = new Logger(PrioridadService.name);
  private readonly ENTITY_NAME = 'Prioridad';

  constructor(
    @Inject('IPrioridadRepository')
    private readonly prioridadRepository: IPrioridadRepository,
  ) {}

  async create(createPrioridadDto: CreatePrioridadDto) {
    this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con nombre: ${createPrioridadDto.nombre}`, );

    this.verificarExistenciaNombre(createPrioridadDto.nombre);

    return this.prioridadRepository.create(createPrioridadDto);
  }

  async findAll() {
    this.logger.log(`Buscando ${this.ENTITY_NAME}s`, );
    return this.prioridadRepository.findAll();
  }

  async findOne(id: string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con ID: ${id} `,)
    return this.prioridadRepository.findOne(id);
  }

  async findByName(nombre : string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con Nombre: ${nombre} `,)
    return this.prioridadRepository.findByName(nombre);

  }

  async update(id: string, updatePrioridadDto: UpdatePrioridadDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id: ${id}`, );
    this.verificarExistenciaPrioridad(id);
    return this.prioridadRepository.update(id, updatePrioridadDto);
  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`, );
    this.verificarExistenciaPrioridad(id);
    return this.prioridadRepository.remove(id);
  }

  private async verificarExistenciaNombre(nombre: string): Promise<void> {
    const existingPrioridad = await this.prioridadRepository.findByName(nombre);
    if (existingPrioridad) {
      this.logger.error(`El nombre ${nombre} ya existe en ${this.ENTITY_NAME}`);
      throw new NotFoundException(`El nombre ${nombre} ya existe.`);
    }
  }

  private async verificarExistenciaPrioridad(idPrioridad: string) : Promise<any> {
    const prioridad = await this.prioridadRepository.findOne(idPrioridad);
    if (!prioridad) {
      this.logger.error(`El id ${idPrioridad} no existe en ${this.ENTITY_NAME}`);
      throw new NotFoundException(`El id ${idPrioridad} no existe.`);
    }
    return prioridad;
  }
}

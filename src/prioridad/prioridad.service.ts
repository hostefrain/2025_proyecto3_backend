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

    const prioridad = await this.findByName(createPrioridadDto.nombre)

    if (prioridad) {
      this.logger.error(`Prioridad con nombre ${createPrioridadDto.nombre} ya existe`);
      throw new InternalServerErrorException(`Prioridad con nombre ${createPrioridadDto.nombre} ya existe`);
    }
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
    return this.prioridadRepository.update(id, updatePrioridadDto);
  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`, );
    return this.prioridadRepository.remove(id);
  }
}

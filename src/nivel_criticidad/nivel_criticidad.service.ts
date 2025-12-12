import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateNivelCriticidadDto } from './dto/create-nivel_criticidad.dto';
import { UpdateNivelCriticidadDto } from './dto/update-nivel_criticidad.dto';
import type { INivelCriticidadRepository } from './INivel_criticidadRepository';

@Injectable()
export class NivelCriticidadService {
  private readonly logger = new Logger(NivelCriticidadService.name);
  private readonly ENTITY_NAME = 'NivelCriticidad';

  constructor(
    @Inject('INivelCriticidadRepository') 
    private readonly nivelCriticidadRepository: INivelCriticidadRepository,
  ) {}
  
  async create(createNivelCriticidadDto: CreateNivelCriticidadDto) {
    this.logger.log(`Creando un nuevo ${createNivelCriticidadDto.nombre} con nombre: ${createNivelCriticidadDto.nombre}`, );
    await this.validarExisteNombre (createNivelCriticidadDto.nombre);
    const entity = await this.nivelCriticidadRepository.create(createNivelCriticidadDto);
    return entity
  }

  async findAll() {
    this.logger.log(`Buscando ${this.ENTITY_NAME}s`, );
    return this.nivelCriticidadRepository.findAll();
  }

  async findOne(id: string) {
    this.logger.log(`Buscando ${this.ENTITY_NAME} con ID: ${id} `,)

    const nivel_criticidad = await this.nivelCriticidadRepository.findOne(id);

    if (!nivel_criticidad) {
      throw new NotFoundException(`No existe un Nivel de Criticidad con id: ${id}`);
    }

    return nivel_criticidad;
  }

  async update(id: string, updateNivelCriticidadDto: UpdateNivelCriticidadDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id: ${id}`, );
    await this.nivelCriticidadRepository.findOne(id);
    const entity = await this.nivelCriticidadRepository.update(id, updateNivelCriticidadDto);
    return entity;
  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`, );
    return this.nivelCriticidadRepository.remove(id);
  }

  private async validarExisteNombre(nombre: string): Promise<void> {
    const existingTipoReclamo = await this.nivelCriticidadRepository.findByName(nombre);
    if (existingTipoReclamo) {
      this.logger.warn(`El nombre ${nombre} ya existe en ${this.ENTITY_NAME}`);
      throw new Error(`El nombre ${nombre} ya existe.`);
    }
  }
}

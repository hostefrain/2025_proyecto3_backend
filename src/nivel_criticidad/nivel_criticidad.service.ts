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
    this.logger.log(`Creando un nuevo ${this.ENTITY_NAME} con nombre: ${createNivelCriticidadDto.nombre}`, );
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
    
    const nivel_criticidad = await this.validarExisteId(id);

    return nivel_criticidad;
  }

  async update(id: string, updateNivelCriticidadDto: UpdateNivelCriticidadDto) {
    this.logger.log(`Actualizando ${this.ENTITY_NAME} con id: ${id}`, );
    await this.validarExisteId(id);

    const entity = await this.nivelCriticidadRepository.update(id, updateNivelCriticidadDto);
    return entity;
  }

  async remove(id: string) {
    this.logger.log(`Eliminando ${this.ENTITY_NAME} con id ${id}`, );
    await this.validarExisteId(id);
    return this.nivelCriticidadRepository.remove(id);
  }

  private async validarExisteNombre(nombre: string): Promise<void> {
    const existingTipoReclamo = await this.nivelCriticidadRepository.findByName(nombre);
    if (existingTipoReclamo) {
      this.logger.warn(`El nombre ${nombre} ya existe en ${this.ENTITY_NAME}`);
      throw new Error(`El nombre ${nombre} ya existe.`);
    }
  }

  private async validarExisteId(idNivelCriticidad: string) : Promise<any> {
    const nivel_criticidad = await this.nivelCriticidadRepository.findOne(idNivelCriticidad);
    if (!nivel_criticidad) {
      this.logger.warn(`El id ${idNivelCriticidad} no existe en ${this.ENTITY_NAME}`);
      throw new NotFoundException(`El id ${idNivelCriticidad} no existe.`);
    }
    return nivel_criticidad;
  }
}
